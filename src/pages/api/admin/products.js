import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { method } = req;

  switch (method) {
    case "GET":
      return getProducts(req, res);
    case "POST":
      return createProduct(req, res);
    case "PUT":
      return updateProduct(req, res);
    case "DELETE":
      return deleteProduct(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function getProducts(req, res) {
  try {
    const { id } = req.query;

    if (id) {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
        include: { variants: true },
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json(product);
    }

    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { variants: true },
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Failed to fetch products" });
  }
}

async function createProduct(req, res) {
  try {
    const {
      name,
      description,
      price,
      stock,
      active,
      image,
      sku,
      hasVariants,
      variants,
    } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description || null,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        active: active !== undefined ? active : true,
        image: image || null,
        sku: sku || null,
        hasVariants: hasVariants || false,
        variants:
          hasVariants && variants
            ? {
                create: variants.map((v) => ({
                  size: v.size,
                  stock: parseInt(v.stock) || 0,
                  sku: v.sku || null,
                })),
              }
            : undefined,
      },
      include: { variants: true },
    });

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ error: "Failed to create product" });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.query;
    const {
      name,
      description,
      price,
      stock,
      active,
      image,
      sku,
      hasVariants,
      variants,
    } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    // Delete existing variants if hasVariants changed or if updating variants
    if (hasVariants && variants) {
      await prisma.productVariant.deleteMany({
        where: { productId: parseInt(id) },
      });
    }

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description: description || null,
        price: parseFloat(price),
        stock: parseInt(stock),
        active,
        image: image || null,
        sku: sku || null,
        hasVariants: hasVariants || false,
        variants:
          hasVariants && variants
            ? {
                create: variants.map((v) => ({
                  size: v.size,
                  stock: parseInt(v.stock) || 0,
                  sku: v.sku || null,
                })),
              }
            : undefined,
      },
      include: { variants: true },
    });

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ error: "Failed to update product" });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ error: "Failed to delete product" });
  }
}
