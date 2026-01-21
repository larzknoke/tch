import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const products = await prisma.product.findMany({
        where: {
          active: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return res.status(200).json(products);
    } catch (error) {
      console.error("API error:", error);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
