import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

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
    const deleteImageIds = formData.getAll("deleteImageIds") as string[];

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
    if (date) updateData.date = date;
    updateData.featured = featured;

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
