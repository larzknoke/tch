import { getServerSession } from "next-auth/next";
import { renderToBuffer } from "@react-pdf/renderer";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { OrderProductionSummaryPDF } from "@/pdf/order-production-summary-pdf";

function normalizeType(type) {
  return type || "Ohne Typ";
}

function aggregateProductionItems(orders) {
  const groupedMap = new Map();
  let totalQuantity = 0;

  for (const order of orders) {
    for (const item of order.items || []) {
      const quantity = Number(item.quantity) || 0;
      if (quantity <= 0) {
        continue;
      }

      const type = normalizeType(item.product?.productType);
      const rawSize = item.variant?.size
        ? String(item.variant.size).trim()
        : "";
      const hasVariants = Boolean(item.product?.hasVariants);
      const size = rawSize || (hasVariants ? "Groesse fehlt" : "Ohne Groesse");
      const productName = item.product?.name || `Produkt #${item.productId}`;
      const sku = item.variant?.sku || item.product?.sku || "";
      const unresolvedVariantDiscriminator =
        !rawSize && hasVariants ? `__${order.id}_${item.id}` : "";

      const key = `${type}__${size}__${productName}__${sku}${unresolvedVariantDiscriminator}`;
      const existing = groupedMap.get(key);

      if (existing) {
        existing.quantity += quantity;
      } else {
        groupedMap.set(key, {
          key,
          type,
          size,
          productName,
          sku,
          quantity,
        });
      }

      totalQuantity += quantity;
    }
  }

  const rows = Array.from(groupedMap.values()).sort((a, b) => {
    if (a.type !== b.type) return a.type.localeCompare(b.type, "de");
    if (a.size !== b.size) return a.size.localeCompare(b.size, "de");
    return a.productName.localeCompare(b.productName, "de");
  });

  const typeMap = new Map();

  for (const row of rows) {
    if (!typeMap.has(row.type)) {
      typeMap.set(row.type, {
        type: row.type,
        totalQuantity: 0,
        sizes: new Map(),
      });
    }

    const typeGroup = typeMap.get(row.type);
    typeGroup.totalQuantity += row.quantity;

    if (!typeGroup.sizes.has(row.size)) {
      typeGroup.sizes.set(row.size, {
        size: row.size,
        totalQuantity: 0,
        items: [],
      });
    }

    const sizeGroup = typeGroup.sizes.get(row.size);
    sizeGroup.totalQuantity += row.quantity;
    sizeGroup.items.push(row);
  }

  const grouped = Array.from(typeMap.values()).map((typeGroup) => ({
    type: typeGroup.type,
    totalQuantity: typeGroup.totalQuantity,
    sizes: Array.from(typeGroup.sizes.values()),
  }));

  return { grouped, totalQuantity };
}

function buildOrderDetails(orders) {
  return orders.map((order) => ({
    id: order.id,
    customer:
      order.user?.name || order.shippingName || order.email || "Unbekannt",
    items: (order.items || []).map((item) => ({
      id: item.id,
      productName: item.product?.name || `Produkt #${item.productId}`,
      size: item.variant?.size || (item.product?.hasVariants ? "Groesse fehlt" : "-"),
      sku: item.variant?.sku || item.product?.sku || "-",
      quantity: Number(item.quantity) || 0,
    })),
  }));
}

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const requestedOrderIds = Array.isArray(req.body?.orderIds)
      ? req.body.orderIds
          .map((id) => parseInt(id, 10))
          .filter((id) => Number.isInteger(id) && id > 0)
      : null;

    if (requestedOrderIds && requestedOrderIds.length === 0) {
      return res.status(400).json({
        error: "Es wurden keine gueltigen Bestell-IDs uebergeben.",
      });
    }

    const pendingOrders = await prisma.order.findMany({
      where: {
        status: requestedOrderIds
          ? { in: ["ausstehend", "in Produktion"] }
          : "ausstehend",
        ...(requestedOrderIds ? { id: { in: requestedOrderIds } } : {}),
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                sku: true,
                productType: true,
                hasVariants: true,
              },
            },
            variant: {
              select: {
                size: true,
                sku: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    if (pendingOrders.length === 0) {
      return res.status(400).json({
        error: requestedOrderIds
          ? "Keine passenden ausstehenden Bestellungen fuer die Auswahl vorhanden."
          : "Keine ausstehenden Bestellungen vorhanden.",
      });
    }

    const { grouped, totalQuantity } = aggregateProductionItems(pendingOrders);
  const ordersDetailed = buildOrderDetails(pendingOrders);

    if (totalQuantity === 0) {
      return res.status(400).json({
        error:
          "Keine produzierbaren Positionen in ausstehenden Bestellungen gefunden.",
      });
    }

    const generatedAt = new Date();
    const pdfBuffer = await renderToBuffer(
      <OrderProductionSummaryPDF
        generatedAt={generatedAt}
        orderCount={pendingOrders.length}
        totalQuantity={totalQuantity}
        grouped={grouped}
        ordersDetailed={ordersDetailed}
      />,
    );

    const orderIds = pendingOrders.map((order) => order.id);
    const pendingOrderIds = pendingOrders
      .filter((order) => String(order.status).toLowerCase() === "ausstehend")
      .map((order) => order.id);

    await prisma.order.updateMany({
      where: { id: { in: pendingOrderIds } },
      data: { status: "in Produktion" },
    });

    const filename = `bestellzusammenfassung_produktion_${generatedAt
      .toISOString()
      .slice(0, 10)}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Length", pdfBuffer.length);
    res.setHeader("X-Updated-Orders", String(pendingOrderIds.length));

    return res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error("Error creating production summary PDF:", error);
    return res.status(500).json({
      error: "Fehler beim Erstellen der Bestellzusammenfassung.",
    });
  }
}
