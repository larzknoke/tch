/*
  Warnings:

  - You are about to drop the column `billingAddress` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddress` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "billingAddress",
DROP COLUMN "shippingAddress",
ADD COLUMN     "billingCity" TEXT,
ADD COLUMN     "billingName" TEXT,
ADD COLUMN     "billingPlz" TEXT,
ADD COLUMN     "billingStreet" TEXT,
ADD COLUMN     "shippingCity" TEXT,
ADD COLUMN     "shippingName" TEXT,
ADD COLUMN     "shippingPlz" TEXT,
ADD COLUMN     "shippingStreet" TEXT;
