import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { publishNewsToInstagram } from "@/lib/instagram";
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
    const postToInstagram = formData.get("postToInstagram") === "true";
    
    // Multilingual fields
    const header_sr = formData.get("header_sr") as string | null;
    const header_en = formData.get("header_en") as string | null;
    const header_ru = formData.get("header_ru") as string | null;
    const text_sr = formData.get("text_sr") as string | null;
    const text_en = formData.get("text_en") as string | null;
    const text_ru = formData.get("text_ru") as string | null;

    if (!header || !text || !date) {
      return NextResponse.json(
        { error: "Header, text, and date are required" },
        { status: 400 }
      );
    }

    // Handle image uploads
    const imageFiles = formData.getAll("images") as File[];
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    console.log(`[NEWS API] Upload directory: ${uploadDir}`);
    console.log(`[NEWS API] Received ${imageFiles.length} image files`);

    // Ensure upload directory exists
    await mkdir(uploadDir, { recursive: true });

    const imageFilenames: string[] = [];

    for (const file of imageFiles) {
      if (file.size === 0) continue;

      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const ext = path.extname(file.name) || ".jpg";
        const filename = `${crypto.randomUUID()}${ext}`;
        const filepath = path.join(uploadDir, filename);

        await writeFile(filepath, buffer);
        console.log(`[NEWS API] Successfully saved image: ${filename}`);
        imageFilenames.push(filename);
      } catch (fileError) {
        console.error(`[NEWS API] Failed to save file ${file.name}:`, fileError);
        throw new Error(`Failed to save image ${file.name}: ${fileError instanceof Error ? fileError.message : String(fileError)}`);
      }
    }

    // Create article with images in a transaction
    const article = await prisma.newsArticle.create({
      data: {
        header,
        text,
        date,
        featured,
        header_sr: header_sr || null,
        header_en: header_en || null,
        header_ru: header_ru || null,
        text_sr: text_sr || null,
        text_en: text_en || null,
        text_ru: text_ru || null,
        images: {
          create: imageFilenames.map((filename) => ({ filename })),
        },
      },
      include: { images: true },
    });

    let instagramPost: Awaited<ReturnType<typeof publishNewsToInstagram>> | null = null;
    let instagramError: string | null = null;

    const baseUrl = process.env.SITE_URL || request.nextUrl.origin;
    if (postToInstagram) {
      try {
        const imageUrls = imageFilenames.map(
          (filename) => `${baseUrl}/uploads/${filename}`
        );
        const caption = `${header}\n\n${text}`;

        if (imageUrls.length > 0) {
          instagramPost = await publishNewsToInstagram(imageUrls, caption, article.id);
        } else {
          instagramError = "Instagram post skipped: at least one image is required.";
        }
      } catch (instagramPublishError) {
        instagramError = instagramPublishError instanceof Error ? instagramPublishError.message : String(instagramPublishError);
        console.error("[NEWS API] Failed to publish article to Instagram:", instagramError);
      }
    }

    console.log(`[NEWS API] Article created successfully with ID: ${article.id}`);
    return NextResponse.json(
      {
        ...article,
        instagramPost,
        instagramError,
      },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[NEWS API] Error creating article:", errorMessage);
    return NextResponse.json(
      { error: errorMessage || "Failed to create article" },
      { status: 500 }
    );
  }
}
