#!/usr/bin/env node

const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

function parseArgs(argv) {
  const args = new Set(argv.slice(2));
  return {
    apply: args.has("--apply"),
    verbose: args.has("--verbose"),
  };
}

async function findBrokenOrderItems() {
  return prisma.orderItem.findMany({
    where: {
      variantId: null,
      product: {
        hasVariants: true,
      },
    },
    include: {
      product: {
        include: {
          variants: true,
        },
      },
      order: {
        select: {
          id: true,
          status: true,
          createdAt: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

function decideVariant(item) {
  const variants = item.product?.variants || [];

  if (variants.length === 1) {
    return {
      action: "fix",
      reason: "only-one-variant",
      variantId: variants[0].id,
    };
  }

  return {
    action: "skip",
    reason: "ambiguous-multiple-variants",
    variantId: null,
  };
}

async function main() {
  const { apply, verbose } = parseArgs(process.argv);

  try {
    const brokenItems = await findBrokenOrderItems();

    if (brokenItems.length === 0) {
      console.log(
        "No broken order items found (variantId is null on variant products).",
      );
      return;
    }

    console.log(`Found ${brokenItems.length} potentially broken order items.`);
    console.log(
      apply ? "Mode: APPLY" : "Mode: DRY RUN (use --apply to write changes)",
    );

    let fixable = 0;
    let fixed = 0;
    let skipped = 0;

    for (const item of brokenItems) {
      const decision = decideVariant(item);

      if (decision.action === "fix") {
        fixable += 1;

        if (apply) {
          await prisma.orderItem.update({
            where: { id: item.id },
            data: { variantId: decision.variantId },
          });
          fixed += 1;
        }

        if (verbose || !apply) {
          console.log(
            `[FIX] orderItem=${item.id} order=${item.orderId} product=${item.productId} -> variant=${decision.variantId} (${decision.reason})`,
          );
        }
      } else {
        skipped += 1;
        if (verbose) {
          const candidates = (item.product.variants || [])
            .map(
              (v) => `{id:${v.id}, size:${v.size || "-"}, sku:${v.sku || "-"}}`,
            )
            .join(", ");
          console.log(
            `[SKIP] orderItem=${item.id} order=${item.orderId} product=${item.productId} variants=${item.product.variants.length} (${decision.reason}) candidates=[${candidates}]`,
          );
        }
      }
    }

    console.log("--- Summary ---");
    console.log(`Fixable: ${fixable}`);
    console.log(`Skipped: ${skipped}`);
    console.log(apply ? `Updated: ${fixed}` : "Updated: 0 (dry run)");

    if (skipped > 0) {
      console.log(
        "Skipped items need manual mapping because products have multiple variants and size info is no longer unambiguous.",
      );
    }
  } catch (error) {
    console.error("Repair failed:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
