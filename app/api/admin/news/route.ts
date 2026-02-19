import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function GET() {
  try {
    const articles = await prisma.newsArticle.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const header = formData.get("header") as string;
    const text = formData.get("text") as string;
    const date = formData.get("date") as string;
    const featured = formData.get("featured") === "true";

    if (!header || !text || !date) {
      return NextResponse.json(
        { error: "Header, text, and date are required" },
        { status: 400 }
      );
    }

    // Handle image uploads
    const imageFiles = formData.getAll("images") as File[];
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Ensure upload directory exists
    await mkdir(uploadDir, { recursive: true });

    const imageFilenames: string[] = [];

    for (const file of imageFiles) {
      if (file.size === 0) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = path.extname(file.name) || ".jpg";
      const filename = `${crypto.randomUUID()}${ext}`;
      const filepath = path.join(uploadDir, filename);

      await writeFile(filepath, buffer);
      imageFilenames.push(filename);
    }

    // Create article with images in a transaction
    const article = await prisma.newsArticle.create({
      data: {
        header,
        text,
        date,
        featured,
        images: {
          create: imageFilenames.map((filename) => ({ filename })),
        },
      },
      include: { images: true },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}
