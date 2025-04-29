-- CreateTable
CREATE TABLE "Worker" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "phone" TEXT,
    "verified" BOOLEAN DEFAULT false,
    "verifyId" TEXT,
    "effortId" INTEGER,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Worker_verifyId_key" ON "Worker"("verifyId");

-- AddForeignKey
ALTER TABLE "Worker" ADD CONSTRAINT "Worker_effortId_fkey" FOREIGN KEY ("effortId") REFERENCES "Effort"("id") ON DELETE SET NULL ON UPDATE CASCADE;
