import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/render";
import AdminNotifyOrderEmail from "@/email/adminNotifyOrderEmail";

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

      // Calculate total — group order items have price 0 until finalised
      let total = 0;
      const orderItems = [];
      let isGroupOrder = false;

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

        const itemIsGroupOrder = product.isGroupOrder;
        if (itemIsGroupOrder) {
          isGroupOrder = true;
        }

        // Group order items skip stock check — no stock is reserved until fulfilled
        if (!itemIsGroupOrder) {
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
        }

        // Group order: price=0 until admin sets final price
        const itemPrice = itemIsGroupOrder ? 0 : parseFloat(product.price);
        console.log(
          `Item price for ${product.name}: ${itemPrice} € (group order: ${itemIsGroupOrder})`,
        );
        const itemTotal = itemPrice * item.quantity;
        total += itemTotal;
        console.log("Total so far:", total);

        orderItems.push({
          productId: product.id,
          variantId: item.variantId ? parseInt(item.variantId) : null,
          quantity: item.quantity,
          price: itemPrice,
        });
      }

      // Create order
      const order = await prisma.order.create({
        data: {
          email,
          total,
          payment: payment || "Barzahlung",
          isGroupOrder,
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
              variant: true,
            },
          },
        },
      });

      // Update stock — group orders don't reduce stock until fulfilled
      for (const item of items) {
        const product = await prisma.product.findUnique({
          where: { id: parseInt(item.productId) },
          select: { isGroupOrder: true },
        });

        if (product?.isGroupOrder) {
          continue;
        }

        if (item.variantId) {
          await prisma.productVariant.update({
            where: { id: parseInt(item.variantId) },
            data: { stock: { decrement: item.quantity } },
          });
        } else {
          await prisma.product.update({
            where: { id: parseInt(item.productId) },
            data: { stock: { decrement: item.quantity } },
          });
        }
      }
      // Send admin notification email
      try {
        await sendEmail({
          to: "info@larsknoke.com",
          subject: `Neue Bestellung #${order.id} - TC Holzminden von 1928 e.V.`,
          html: await render(<AdminNotifyOrderEmail order={order} />),
        });
      } catch (emailError) {
        console.log("Failed to send admin notification email:", emailError);
        // Don't fail the request if email fails
      }

      return res.status(201).json(order);
    } catch (error) {
      console.error("API error:", error);
      return res.status(500).json({ error: "Failed to create order" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
