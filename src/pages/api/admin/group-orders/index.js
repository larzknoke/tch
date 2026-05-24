import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import GroupOrderPricedEmail from "@/email/groupOrderPricedEmail";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    return getGroupOrders(req, res);
  }

  if (req.method === "POST") {
    return setPrice(req, res);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

async function getGroupOrders(req, res) {
  try {
    const products = await prisma.product.findMany({
      where: { isGroupOrder: true },
      orderBy: { createdAt: "desc" },
      include: {
        orderItems: {
          include: {
            order: {
              select: {
                id: true,
                email: true,
                status: true,
                isGroupOrder: true,
              },
            },
            variant: true,
          },
          where: {
            order: { isGroupOrder: true },
          },
        },
      },
    });

    const result = products.map((p) => ({
      ...p,
      totalOrdered: p.orderItems.reduce((sum, i) => sum + i.quantity, 0),
      participantCount: new Set(p.orderItems.map((i) => i.order.email)).size,
    }));

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching group orders:", error);
    return res.status(500).json({ error: "Failed to fetch group orders" });
  }
}

async function setPrice(req, res) {
  try {
    const { productId, finalPrice } = req.body;

    if (!productId || finalPrice == null) {
      return res
        .status(400)
        .json({ error: "productId and finalPrice are required" });
    }

    const price = parseFloat(finalPrice);
    if (isNaN(price) || price <= 0) {
      return res
        .status(400)
        .json({ error: "finalPrice must be a positive number" });
    }

    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product || !product.isGroupOrder) {
      return res.status(404).json({ error: "Group order product not found" });
    }

    // Update product with final price and status
    await prisma.product.update({
      where: { id: parseInt(productId) },
      data: {
        groupOrderFinalPrice: price,
        groupOrderStatus: "priced",
      },
    });

    // Find all group orders for this product
    const affectedOrders = await prisma.order.findMany({
      where: {
        isGroupOrder: true,
        items: { some: { productId: parseInt(productId) } },
      },
      include: {
        items: {
          where: { productId: parseInt(productId) },
          include: { variant: true },
        },
      },
    });

    // Update each order: set price on items and recalculate total
    for (const order of affectedOrders) {
      const relevantItems = order.items.filter(
        (i) => i.productId === parseInt(productId),
      );
      const orderTotal = relevantItems.reduce(
        (sum, i) => sum + price * i.quantity,
        0,
      );

      await prisma.orderItem.updateMany({
        where: { orderId: order.id, productId: parseInt(productId) },
        data: { price },
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { total: orderTotal },
      });

      // Send notification email
      try {
        await sendEmail({
          to: order.email,
          subject: `Sammelbestellung: Preis für ${product.name} steht fest – TC Holzminden`,
          html: await render(
            <GroupOrderPricedEmail
              order={{ ...order, items: relevantItems }}
              product={product}
              finalPrice={price}
            />,
          ),
        });
      } catch (emailError) {
        console.error(`Failed to send email to ${order.email}:`, emailError);
      }
    }

    return res.status(200).json({
      success: true,
      updatedOrders: affectedOrders.length,
      finalPrice: price,
    });
  } catch (error) {
    console.error("Error setting group order price:", error);
    return res.status(500).json({ error: "Failed to set price" });
  }
}
