import { getLatestFeaturedArticle } from "@/lib/posts";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const article = await getLatestFeaturedArticle();

    if (!article) {
      return NextResponse.json(
        { message: "No featured article found" },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error in featured news API:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
