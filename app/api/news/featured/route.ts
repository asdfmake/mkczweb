import { getLatestFeaturedArticle } from "@/lib/posts";
import { NextResponse, NextRequest } from "next/server";

/**
 * Handle GET requests for the featured article endpoint.
 *
 * Fetches the latest featured article and returns it as JSON. Accepts an optional
 * `locale` query parameter (en, sr, ru). Responds with a 404 JSON payload when 
 * no featured article exists, and a 500 JSON payload when an unexpected error occurs.
 *
 * @param request - The request object, may contain ?locale=en/sr/ru query parameter
 * @returns `NextResponse` containing the featured article as JSON on success; a 404 JSON payload `{ message: "No featured article found" }` if no article exists; or a 500 JSON payload `{ message: "Internal server error" }` on failure.
 */
export async function GET(request: NextRequest) {
  try {
    const locale = request.nextUrl.searchParams.get("locale") || "sr";
    const article = await getLatestFeaturedArticle(locale);

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
