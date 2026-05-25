-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "isGroupOrder" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "groupOrderDeadline" TIMESTAMP(3),
ADD COLUMN     "groupOrderFinalPrice" DECIMAL(10,2),
ADD COLUMN     "groupOrderStatus" TEXT,
ADD COLUMN     "isGroupOrder" BOOLEAN NOT NULL DEFAULT false;
