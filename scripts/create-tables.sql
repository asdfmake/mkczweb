-- Create NewsArticle table
CREATE TABLE IF NOT EXISTS "NewsArticle" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "NewsArticle_pkey" PRIMARY KEY ("id")
);

-- Create NewsImage table
CREATE TABLE IF NOT EXISTS "NewsImage" (
  "id" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "filename" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  "articleId" TEXT NOT NULL,
  CONSTRAINT "NewsImage_pkey" PRIMARY KEY ("id")
);

-- Add foreign key constraint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'NewsImage_articleId_fkey'
  ) THEN
    ALTER TABLE "NewsImage"
      ADD CONSTRAINT "NewsImage_articleId_fkey"
      FOREIGN KEY ("articleId") REFERENCES "NewsArticle"("id")
      ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- Create index on articleId
CREATE INDEX IF NOT EXISTS "NewsImage_articleId_idx" ON "NewsImage"("articleId");
