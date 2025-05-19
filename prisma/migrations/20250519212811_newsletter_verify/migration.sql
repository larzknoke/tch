/*
  Warnings:

  - A unique constraint covering the columns `[verifyId]` on the table `Newsletter` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Newsletter" ADD COLUMN     "verified" BOOLEAN DEFAULT false,
ADD COLUMN     "verifyId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Newsletter_verifyId_key" ON "Newsletter"("verifyId");
