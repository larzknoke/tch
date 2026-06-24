UPDATE "member_registrations"
SET "herkunft" = NULL
WHERE "herkunft" = '';

ALTER TABLE "member_registrations"
ALTER COLUMN "herkunft" DROP NOT NULL;
