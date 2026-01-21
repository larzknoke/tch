import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, items, shippingAddress, billingAddress } = req.body;

      if (!email || !items || items.length === 0) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Calculate total
      let total = 0;
      const orderItems = [];

      for (const item of items) {
        const product = await prisma.product.findUnique({
          where: { id: parseInt(item.productId) },
        });

        if (!product) {
          return res
            .status(404)
            .json({ error: `Product ${item.productId} not found` });
        }

        if (product.stock < item.quantity) {
          return res
            .status(400)
            .json({ error: `Insufficient stock for ${product.name}` });
        }

        const itemTotal = parseFloat(product.price) * item.quantity;
        total += itemTotal;

        orderItems.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
        });
      }

      // Create order
      const order = await prisma.order.create({
        data: {
          email,
          total,
          shippingAddress: shippingAddress || null,
          billingAddress: billingAddress || null,
          status: "pending",
          items: {
            create: orderItems,
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      // Update stock
      for (const item of items) {
        await prisma.product.update({
          where: { id: parseInt(item.productId) },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return res.status(201).json(order);
    } catch (error) {
      console.error("API error:", error);
      return res.status(500).json({ error: "Failed to create order" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
