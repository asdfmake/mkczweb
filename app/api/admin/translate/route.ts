import { NextRequest, NextResponse } from "next/server";

/**
 * Translation API endpoint that uses Google Translate API or a free translation service.
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

    // Map language codes to Google Translate codes
    const languageMap: Record<string, string> = {
      sr: "sr", // Serbian
      en: "en", // English
      ru: "ru", // Russian
    };

    const sourceLang = languageMap[sourceLanguage] || "sr";
    const targetLang = languageMap[targetLanguage] || "en";

    // Use Google Translate API if key is available, otherwise use free service
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

    if (apiKey) {
      // Use official Google Translate API
      return await translateWithGoogleAPI(text, sourceLang, targetLang, apiKey);
    } else {
      // Use free translation service (MyMemory)
      return await translateWithFreeService(text, sourceLang, targetLang);
    }
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: "Translation failed" },
      { status: 500 }
    );
  }
}

async function translateWithGoogleAPI(
  text: string,
  sourceLang: string,
  targetLang: string,
  apiKey: string
): Promise<NextResponse> {
  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          source_language: sourceLang,
          target_language: targetLang,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Google Translate API error");
    }

    const data = await response.json();
    const translatedText = data.data.translations[0].translatedText;

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error("Google Translate error:", error);
    throw error;
  }
}

async function translateWithFreeService(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<NextResponse> {
  try {
    // Using MyMemory free translation API
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
    console.error("Free translation service error:", error);
    throw error;
  }
}
