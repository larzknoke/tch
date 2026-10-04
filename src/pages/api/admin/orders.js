import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";

async function mapOrderItemsForWrite(items) {
  const mapped = [];

  for (const it of items) {
    const productId = parseInt(it.productId, 10);
    if (!Number.isInteger(productId) || productId <= 0) {
      throw new Error("Invalid productId in order item");
    }

    const quantity = parseInt(it.quantity, 10) || 1;
    const price = it.price != null ? parseFloat(it.price) : 0;

    let variantId = null;
    if (it.variantId != null && it.variantId !== "") {
      const parsedVariantId = parseInt(it.variantId, 10);
      if (Number.isInteger(parsedVariantId) && parsedVariantId > 0) {
        const variant = await prisma.productVariant.findUnique({
          where: { id: parsedVariantId },
          select: { id: true, productId: true },
        });

        if (!variant || variant.productId !== productId) {
          throw new Error(
            `Variant ${parsedVariantId} passt nicht zum Produkt ${productId}`,
          );
        }

        variantId = parsedVariantId;
      }
    }

    mapped.push({
      productId,
      variantId,
      quantity,
      price,
    });
  }

  return mapped;
}

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { method } = req;

  switch (method) {
    case "GET":
      return getOrders(req, res);
    case "POST":
      return createOrder(req, res);
    case "PUT":
      return updateOrder(req, res);
    case "DELETE":
      return deleteOrder(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function getOrders(req, res) {
  try {
    const { id } = req.query;

    if (id) {
      const order = await prisma.order.findUnique({
        where: { id: parseInt(id) },
        include: {
          items: { include: { product: true, variant: true } },
          user: true,
        },
      });

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      return res.status(200).json(order);
    }

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        items: { include: { product: true, variant: true } },
        user: true,
      },
    });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: "Failed to fetch orders" });
  }
}

async function createOrder(req, res) {
  try {
    const {
      userId,
      status,
      total,
      email,
      payment,
      shippingName,
      shippingStreet,
      shippingPlz,
      shippingCity,
      billingName,
      billingStreet,
      billingPlz,
      billingCity,
      items,
    } = req.body;

    if (!email || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Email and items are required" });
    }

    const mappedItems = await mapOrderItemsForWrite(items);

    const order = await prisma.order.create({
      data: {
        userId: userId || null,
        status: status || "ausstehend",
        total: total ? parseFloat(total) : 0,
        email,
        payment: payment || undefined,
        shippingName: shippingName || null,
        shippingStreet: shippingStreet || null,
        shippingPlz: shippingPlz || null,
        shippingCity: shippingCity || null,
        billingName: billingName || null,
        billingStreet: billingStreet || null,
        billingPlz: billingPlz || null,
        billingCity: billingCity || null,
        items: {
          create: mappedItems,
        },
      },
      include: { items: true },
    });

    return res.status(200).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Failed to create order" });
  }
}

async function updateOrder(req, res) {
  try {
    const { id } = req.query;
    const {
      status,
      total,
      email,
      payment,
      shippingName,
      shippingStreet,
      shippingPlz,
      shippingCity,
      billingName,
      billingStreet,
      billingPlz,
      billingCity,
      items,
    } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    // If items supplied, replace existing items
    let mappedItems;
    if (items && Array.isArray(items)) {
      mappedItems = await mapOrderItemsForWrite(items);
    }

    if (items && Array.isArray(items)) {
      await prisma.orderItem.deleteMany({ where: { orderId: parseInt(id) } });
    }

    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: {
        status: status || undefined,
        total: total !== undefined ? parseFloat(total) : undefined,
        email: email || undefined,
        payment: payment || undefined,
        shippingName: shippingName || undefined,
        shippingStreet: shippingStreet || undefined,
        shippingPlz: shippingPlz || undefined,
        shippingCity: shippingCity || undefined,
        billingName: billingName || undefined,
        billingStreet: billingStreet || undefined,
        billingPlz: billingPlz || undefined,
        billingCity: billingCity || undefined,
        items:
          items && Array.isArray(items)
            ? {
                create: mappedItems,
              }
            : undefined,
      },
      include: { items: true },
    });

    return res.status(200).json(order);
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({
      error: error?.message || "Failed to update order",
    });
  }
}

async function deleteOrder(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    await prisma.order.delete({ where: { id: parseInt(id) } });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({ error: "Failed to delete order" });
  }
}
