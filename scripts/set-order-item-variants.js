#!/usr/bin/env node

const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

function parseMappings(args) {
  return args
    .map((value) => value.trim())
    .filter(Boolean)
    .map((pair) => {
      const [orderItemIdRaw, variantIdRaw] = pair.split(":");
      const orderItemId = parseInt(orderItemIdRaw, 10);
      const variantId = parseInt(variantIdRaw, 10);

      if (
        !Number.isInteger(orderItemId) ||
        orderItemId <= 0 ||
        !Number.isInteger(variantId) ||
        variantId <= 0
      ) {
        throw new Error(
          `Invalid mapping '${pair}'. Expected format: orderItemId:variantId`,
        );
      }

      return { orderItemId, variantId };
    });
}

async function validateMapping(orderItemId, variantId) {
  const orderItem = await prisma.orderItem.findUnique({
    where: { id: orderItemId },
    select: { id: true, productId: true, variantId: true },
  });

  if (!orderItem) {
    throw new Error(`orderItem ${orderItemId} not found`);
  }

  const variant = await prisma.productVariant.findUnique({
    where: { id: variantId },
    select: { id: true, productId: true, size: true, sku: true },
  });

  if (!variant) {
    throw new Error(`variant ${variantId} not found`);
  }

  if (variant.productId !== orderItem.productId) {
    throw new Error(
      `variant ${variantId} belongs to product ${variant.productId}, but orderItem ${orderItemId} belongs to product ${orderItem.productId}`,
    );
  }

  return { orderItem, variant };
}

async function main() {
  const args = process.argv.slice(2);
  const apply = args.includes("--apply");
  const mappingsRaw = args.filter((arg) => arg !== "--apply");

  if (mappingsRaw.length === 0) {
    console.error("Usage:");
    console.error(
      "  node scripts/set-order-item-variants.js <orderItemId:variantId> [more mappings] [--apply]",
    );
    console.error("Example:");
    console.error(
      "  node scripts/set-order-item-variants.js 23:269 25:251 --apply",
    );
    process.exit(1);
  }

  try {
    const mappings = parseMappings(mappingsRaw);

    console.log(
      apply ? "Mode: APPLY" : "Mode: DRY RUN (add --apply to write changes)",
    );

    for (const mapping of mappings) {
      const { orderItem, variant } = await validateMapping(
        mapping.orderItemId,
        mapping.variantId,
      );

      console.log(
        `[OK] orderItem=${orderItem.id} product=${orderItem.productId} -> variant=${variant.id} size='${variant.size}' sku='${variant.sku || "-"}'`,
      );

      if (apply) {
        await prisma.orderItem.update({
          where: { id: orderItem.id },
          data: { variantId: variant.id },
        });
      }
    }

    console.log(apply ? "Update completed." : "No changes written.");
  } catch (error) {
    console.error("Failed:", error.message || error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
