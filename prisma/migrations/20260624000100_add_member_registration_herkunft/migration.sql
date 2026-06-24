ALTER TABLE "member_registrations"
ADD COLUMN "herkunft" TEXT;

UPDATE "member_registrations"
SET "herkunft" = 'sonstiges'
WHERE "herkunft" IS NULL;

ALTER TABLE "member_registrations"
ALTER COLUMN "herkunft" SET NOT NULL;
