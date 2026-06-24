-- Add publication date used for chronological sorting.
ALTER TABLE "NewsArticle"
ADD COLUMN IF NOT EXISTS "publishedAt" TIMESTAMP(3);

-- Backfill existing rows from createdAt, then ensure non-null default.
UPDATE "NewsArticle"
SET "publishedAt" = COALESCE("publishedAt", "createdAt", CURRENT_TIMESTAMP);

ALTER TABLE "NewsArticle"
ALTER COLUMN "publishedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "publishedAt" SET NOT NULL;
