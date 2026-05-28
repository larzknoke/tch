import prisma from "@/lib/prisma";
import { isValidProductType, isValidAudience } from "@/lib/product-taxonomy";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { productType, audience } = req.query;

      const rawProductTypes = Array.isArray(productType)
        ? productType
        : productType
          ? [productType]
          : [];

      const rawAudiences = Array.isArray(audience)
        ? audience
        : audience
          ? [audience]
          : [];

      const normalizedProductTypes = rawProductTypes.map((value) =>
        String(value).trim().toUpperCase(),
      );

      const normalizedAudiences = rawAudiences.map((value) =>
        String(value).trim().toUpperCase(),
      );

      const hasInvalidProductType = normalizedProductTypes.some(
        (value) => !isValidProductType(value),
      );
      if (hasInvalidProductType) {
        return res.status(400).json({ error: "Invalid productType filter" });
      }

      const hasInvalidAudience = normalizedAudiences.some(
        (value) => !isValidAudience(value),
      );
      if (hasInvalidAudience) {
        return res.status(400).json({ error: "Invalid audience filter" });
      }

      const products = await prisma.product.findMany({
        where: {
          active: true,
          ...(normalizedProductTypes.length > 0
            ? { productType: { in: normalizedProductTypes } }
            : {}),
          ...(normalizedAudiences.length > 0
            ? { audiences: { hasSome: normalizedAudiences } }
            : {}),
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
