import { NextRequest, NextResponse } from "next/server";

/**
 * Translation API endpoint that uses the MyMemory free translation service.
 * 
 * Accepts POST requests with:
 * - text: string to translate
 * - targetLanguage: target language code (en, sr, ru)
 * - sourceLanguage: source language code (defaults to "sr" for Serbian)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, targetLanguage, sourceLanguage = "sr" } = body;

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: "Missing required fields: text and targetLanguage" },
        { status: 400 }
      );
    }

    // Map language codes
    const languageMap: Record<string, string> = {
      sr: "sr", // Serbian
      en: "en", // English
      ru: "ru", // Russian
    };

    const sourceLang = languageMap[sourceLanguage] || "sr";
    const targetLang = languageMap[targetLanguage] || "en";

    // Use MyMemory free translation service
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=${sourceLang}|${targetLang}`
    );

    if (!response.ok) {
      throw new Error("MyMemory translation error");
    }

    const data = await response.json();

    if (data.responseStatus !== 200) {
      throw new Error("Translation service error");
    }

    const translatedText = data.responseData.translatedText;

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: "Translation failed" },
      { status: 500 }
    );
  }
}
