import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        email,
        items,
        payment,
        shippingName,
        shippingStreet,
        shippingPlz,
        shippingCity,
        billingName,
        billingStreet,
        billingPlz,
        billingCity,
      } = req.body;

      if (!email || !items || items.length === 0) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Calculate total
      let total = 0;
      const orderItems = [];

      for (const item of items) {
        const product = await prisma.product.findUnique({
          where: { id: parseInt(item.productId) },
          include: {
            variants: true,
          },
        });

        if (!product) {
          return res
            .status(404)
            .json({ error: `Product ${item.productId} not found` });
        }

        // Check stock based on whether variant is selected
        let availableStock = product.stock;
        if (item.variantId) {
          const variant = product.variants.find(
            (v) => v.id === parseInt(item.variantId),
          );
          if (!variant) {
            return res
              .status(404)
              .json({ error: `Variant ${item.variantId} not found` });
          }
          availableStock = variant.stock;
        }

        if (availableStock < item.quantity) {
          return res
            .status(400)
            .json({ error: `Insufficient stock for ${product.name}` });
        }

        const itemTotal = parseFloat(product.price) * item.quantity;
        total += itemTotal;

        orderItems.push({
          productId: product.id,
          variantId: item.variantId ? parseInt(item.variantId) : null,
          quantity: item.quantity,
          price: product.price,
        });
      }

      // Create order
      const order = await prisma.order.create({
        data: {
          email,
          total,
          payment: payment || "Barzahlung",
          shippingName: shippingName || null,
          shippingStreet: shippingStreet || null,
          shippingPlz: shippingPlz || null,
          shippingCity: shippingCity || null,
          billingName: billingName || null,
          billingStreet: billingStreet || null,
          billingPlz: billingPlz || null,
          billingCity: billingCity || null,
          status: "ausstehend",
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
        if (item.variantId) {
          // Update variant stock
          await prisma.productVariant.update({
            where: { id: parseInt(item.variantId) },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          });
        } else {
          // Update product stock
          await prisma.product.update({
            where: { id: parseInt(item.productId) },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          });
        }
      }

      return res.status(201).json(order);
    } catch (error) {
      console.error("API error:", error);
      return res.status(500).json({ error: "Failed to create order" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
