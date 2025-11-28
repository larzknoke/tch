-- AlterTable
ALTER TABLE "member_registrations" ALTER COLUMN "sepa_vorname" DROP NOT NULL,
ALTER COLUMN "sepa_name" DROP NOT NULL,
ALTER COLUMN "sepa_strasse" DROP NOT NULL,
ALTER COLUMN "sepa_plz" DROP NOT NULL,
ALTER COLUMN "sepa_ort" DROP NOT NULL,
ALTER COLUMN "sepa_kreditinstitut" DROP NOT NULL,
ALTER COLUMN "sepa_iban" DROP NOT NULL,
ALTER COLUMN "sepa_einzug" DROP NOT NULL,
ALTER COLUMN "sepa_lastschriftmandat" DROP NOT NULL;
