import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const products = await prisma.product.findMany({
        where: {
          active: true,
        },
        include: { variants: true },
        orderBy: {
          createdAt: "desc",
        },
      });

      // For group-order products, attach the current total ordered quantity
      const result = await Promise.all(
        products.map(async (product) => {
          if (!product.isGroupOrder) return product;

          const agg = await prisma.orderItem.aggregate({
            where: {
              productId: product.id,
              order: { isGroupOrder: true },
            },
            _sum: { quantity: true },
          });

          return {
            ...product,
            groupOrderCount: agg._sum.quantity || 0,
          };
        }),
      );

      return res.status(200).json(result);
    } catch (error) {
      console.error("API error:", error);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
