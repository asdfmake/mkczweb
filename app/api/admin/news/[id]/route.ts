import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

function parseDateInput(dateInput: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
    return null;
  }

  const parsed = new Date(`${dateInput}T00:00:00.000Z`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDisplayDate(dateInput: string): string {
  const [year, month, day] = dateInput.split("-");
  return `${day}.${month}.${year}.`;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const articleId = parseInt(id);

    if (isNaN(articleId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const article = await prisma.newsArticle.findUnique({
      where: { id: articleId },
      include: { images: true },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const articleId = parseInt(id);

    if (isNaN(articleId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const formData = await request.formData();
    const header = formData.get("header") as string;
    const text = formData.get("text") as string;
    const date = formData.get("date") as string;
    const featured = formData.get("featured") === "true";
    
    // Multilingual fields
    const header_sr = formData.get("header_sr") as string | null;
    const header_en = formData.get("header_en") as string | null;
    const header_ru = formData.get("header_ru") as string | null;
    const text_sr = formData.get("text_sr") as string | null;
    const text_en = formData.get("text_en") as string | null;
    const text_ru = formData.get("text_ru") as string | null;
    
    const deleteImageIds = formData.getAll("deleteImageIds") as string[];

    if (date) {
      const publishedAt = parseDateInput(date);
      if (!publishedAt) {
        return NextResponse.json(
          { error: "Date must be in YYYY-MM-DD format" },
          { status: 400 }
        );
      }
    }

    // Delete specified images
    if (deleteImageIds.length > 0) {
      const imagesToDelete = await prisma.newsImage.findMany({
        where: { id: { in: deleteImageIds.map(Number) } },
      });

      for (const img of imagesToDelete) {
        try {
          const filepath = path.join(
            process.cwd(),
            "public",
            "uploads",
            img.filename
          );
          await unlink(filepath);
        } catch {
          // File might not exist, continue
        }
      }

      await prisma.newsImage.deleteMany({
        where: { id: { in: deleteImageIds.map(Number) } },
      });
    }

    // Handle new image uploads
    const imageFiles = formData.getAll("images") as File[];
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const newImageFilenames: string[] = [];

    for (const file of imageFiles) {
      if (file.size === 0) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = path.extname(file.name) || ".jpg";
      const filename = `${crypto.randomUUID()}${ext}`;
      const filepath = path.join(uploadDir, filename);

      await writeFile(filepath, buffer);
      newImageFilenames.push(filename);
    }

    // Update article
    const updateData: Record<string, unknown> = {};
    if (header) updateData.header = header;
    if (text) updateData.text = text;
    if (date) {
      updateData.date = formatDisplayDate(date);
      updateData.publishedAt = parseDateInput(date);
    }
    updateData.featured = featured;
    
    // Add multilingual fields
    if (header_sr) updateData.header_sr = header_sr;
    if (header_en) updateData.header_en = header_en;
    if (header_ru) updateData.header_ru = header_ru;
    if (text_sr) updateData.text_sr = text_sr;
    if (text_en) updateData.text_en = text_en;
    if (text_ru) updateData.text_ru = text_ru;

    const article = await prisma.newsArticle.update({
      where: { id: articleId },
      data: {
        ...updateData,
        images: {
          create: newImageFilenames.map((filename) => ({ filename })),
        },
      },
      include: { images: true },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const articleId = parseInt(id);

    if (isNaN(articleId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // Get images to delete from filesystem
    const article = await prisma.newsArticle.findUnique({
      where: { id: articleId },
      include: { images: true },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    // Delete image files
    for (const img of article.images) {
      try {
        const filepath = path.join(
          process.cwd(),
          "public",
          "uploads",
          img.filename
        );
        await unlink(filepath);
      } catch {
        // File might not exist, continue
      }
    }

    // Delete article (cascades to images in DB)
    await prisma.newsArticle.delete({
      where: { id: articleId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    );
  }
}
