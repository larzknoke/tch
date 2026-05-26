-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('HOODIE', 'TRIKOT', 'SHIRT', 'HOSE', 'JACKE', 'ACCESSOIRE');

-- CreateEnum
CREATE TYPE "ProductAudience" AS ENUM ('DAMEN', 'HERREN', 'UNISEX', 'JUGEND', 'KINDER');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "audiences" "ProductAudience"[],
ADD COLUMN     "productType" "ProductType";
