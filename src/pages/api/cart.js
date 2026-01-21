import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { productId, quantity = 1 } = req.body;

      if (!productId) {
        return res.status(400).json({ error: "Product ID required" });
      }

      // For guest users, we'll return the cart data to manage client-side
      // In a real app, you'd use sessions or cookies to persist cart
      const product = await prisma.product.findUnique({
        where: { id: parseInt(productId) },
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (product.stock < quantity) {
        return res.status(400).json({ error: "Insufficient stock" });
      }

      return res.status(200).json({
        success: true,
        product,
        quantity: parseInt(quantity),
      });
    } catch (error) {
      console.error("API error:", error);
      return res.status(500).json({ error: "Failed to add to cart" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
