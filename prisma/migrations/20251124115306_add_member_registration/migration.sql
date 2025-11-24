-- CreateTable
CREATE TABLE "member_registrations" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vorname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "strasse" TEXT NOT NULL,
    "plz" TEXT NOT NULL,
    "ort" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefon" TEXT,
    "geburtsdatum" TEXT NOT NULL,
    "mitgliedsart" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "sepa_vorname" TEXT NOT NULL,
    "sepa_name" TEXT NOT NULL,
    "sepa_strasse" TEXT NOT NULL,
    "sepa_plz" TEXT NOT NULL,
    "sepa_ort" TEXT NOT NULL,
    "sepa_kreditinstitut" TEXT NOT NULL,
    "sepa_iban" TEXT NOT NULL,
    "sepa_einzug" TEXT NOT NULL,
    "sepa_lastschriftmandat" BOOLEAN NOT NULL DEFAULT false,
    "datenschutz" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verifyId" TEXT,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,

    CONSTRAINT "member_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "member_registrations_verifyId_key" ON "member_registrations"("verifyId");
