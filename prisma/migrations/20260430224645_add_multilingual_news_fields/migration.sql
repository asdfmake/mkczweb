-- AlterTable - Add multilingual columns to NewsArticle
ALTER TABLE "NewsArticle" ADD COLUMN "header_sr" TEXT;
ALTER TABLE "NewsArticle" ADD COLUMN "header_en" TEXT;
ALTER TABLE "NewsArticle" ADD COLUMN "header_ru" TEXT;
ALTER TABLE "NewsArticle" ADD COLUMN "text_sr" TEXT;
ALTER TABLE "NewsArticle" ADD COLUMN "text_en" TEXT;
ALTER TABLE "NewsArticle" ADD COLUMN "text_ru" TEXT;

-- CreateTable - NewsImage (if not exists)
CREATE TABLE IF NOT EXISTS "NewsImage" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "articleId" INTEGER NOT NULL,

    CONSTRAINT "NewsImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey - if constraint doesn't exist, add it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'NewsImage_articleId_fkey'
    ) THEN
        ALTER TABLE "NewsImage" ADD CONSTRAINT "NewsImage_articleId_fkey" 
        FOREIGN KEY ("articleId") REFERENCES "NewsArticle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;
