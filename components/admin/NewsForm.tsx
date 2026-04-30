"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";

interface ExistingImage {
  id: number;
  filename: string;
}

interface NewsFormProps {
  mode: "create" | "edit";
  articleId?: number;
  initialData?: {
    header: string;
    text: string;
    date: string;
    featured: boolean;
    images: ExistingImage[];
    header_sr?: string;
    header_en?: string;
    header_ru?: string;
    text_sr?: string;
    text_en?: string;
    text_ru?: string;
  };
}

/**
 * Renders a form for creating or editing a news article, including title, date, featured flag, content, image management, and submission handling.
 *
 * @param props.mode - `"create"` to create a new article or `"edit"` to update an existing one
 * @param props.articleId - The ID of the article being edited; required when `mode` is `"edit"`
 * @param props.initialData - Optional initial values (`header`, `text`, `date`, `featured`) and existing images for edit mode
 * @returns The React element for the news article form
 */
export default function NewsForm({
  mode,
  articleId,
  initialData,
}: NewsFormProps) {
  const router = useRouter();
  const [date, setDate] = useState(initialData?.date || "");
  const [featured, setFeatured] = useState(initialData?.featured || false);
  
  // Multilingual fields
  const [headerSr, setHeaderSr] = useState(initialData?.header_sr || initialData?.header || "");
  const [headerEn, setHeaderEn] = useState(initialData?.header_en || "");
  const [headerRu, setHeaderRu] = useState(initialData?.header_ru || "");
  const [textSr, setTextSr] = useState(initialData?.text_sr || initialData?.text || "");
  const [textEn, setTextEn] = useState(initialData?.text_en || "");
  const [textRu, setTextRu] = useState(initialData?.text_ru || "");
  
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [translatingTitles, setTranslatingTitles] = useState(false);
  const [translatingContent, setTranslatingContent] = useState(false);

  function handleFilesAdd(files: File[]) {
    setNewFiles((prev) => [...prev, ...files]);
  }

  function handleFileRemove(index: number) {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function handleExistingImageDelete(id: number) {
    setDeletedImageIds((prev) => [...prev, id]);
  }

  function handleExistingImageRestore(id: number) {
    setDeletedImageIds((prev) => prev.filter((imgId) => imgId !== id));
  }

  async function translateTitles() {
    if (!headerSr.trim()) {
      setError("Please enter a Serbian title before translating");
      return;
    }

    setTranslatingTitles(true);
    setError("");

    try {
      // Translate to English
      const enResponse = await fetch("/api/admin/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: headerSr,
          sourceLanguage: "sr",
          targetLanguage: "en",
        }),
      });

      if (!enResponse.ok) {
        throw new Error("Failed to translate to English");
      }

      const enData = await enResponse.json();
      setHeaderEn(enData.translatedText);

      // Translate to Russian
      const ruResponse = await fetch("/api/admin/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: headerSr,
          sourceLanguage: "sr",
          targetLanguage: "ru",
        }),
      });

      if (!ruResponse.ok) {
        throw new Error("Failed to translate to Russian");
      }

      const ruData = await ruResponse.json();
      setHeaderRu(ruData.translatedText);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Translation failed";
      setError(errorMsg);
      console.error("Translation error:", errorMsg);
    } finally {
      setTranslatingTitles(false);
    }
  }

  async function translateContent() {
    if (!textSr.trim()) {
      setError("Please enter Serbian content before translating");
      return;
    }

    setTranslatingContent(true);
    setError("");

    try {
      // Translate to English
      const enResponse = await fetch("/api/admin/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textSr,
          sourceLanguage: "sr",
          targetLanguage: "en",
        }),
      });

      if (!enResponse.ok) {
        throw new Error("Failed to translate to English");
      }

      const enData = await enResponse.json();
      setTextEn(enData.translatedText);

      // Translate to Russian
      const ruResponse = await fetch("/api/admin/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textSr,
          sourceLanguage: "sr",
          targetLanguage: "ru",
        }),
      });

      if (!ruResponse.ok) {
        throw new Error("Failed to translate to Russian");
      }

      const ruData = await ruResponse.json();
      setTextRu(ruData.translatedText);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Translation failed";
      setError(errorMsg);
      console.error("Translation error:", errorMsg);
    } finally {
      setTranslatingContent(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      // Use Serbian as default for backward compatibility
      formData.append("header", headerSr);
      formData.append("text", textSr);
      formData.append("date", date);
      formData.append("featured", String(featured));
      
      // Add multilingual fields
      formData.append("header_sr", headerSr);
      formData.append("header_en", headerEn);
      formData.append("header_ru", headerRu);
      formData.append("text_sr", textSr);
      formData.append("text_en", textEn);
      formData.append("text_ru", textRu);

      console.log(`[NewsForm] Submitting ${newFiles.length} image files`);
      for (const file of newFiles) {
        console.log(`[NewsForm] Adding file: ${file.name} (${file.size} bytes)`);
        formData.append("images", file);
      }

      if (mode === "edit") {
        for (const id of deletedImageIds) {
          formData.append("deleteImageIds", String(id));
        }
      }

      const url =
        mode === "create"
          ? "/api/admin/news"
          : `/api/admin/news/${articleId}`;
      const method = mode === "create" ? "POST" : "PUT";

      console.log(`[NewsForm] Sending request to ${method} ${url}`);
      const res = await fetch(url, {
        method,
        body: formData,
      });

      const responseData = await res.json();
      console.log(`[NewsForm] Response status: ${res.status}`, responseData);

      if (!res.ok) {
        throw new Error(responseData.error || "Failed to save article");
      }

      console.log(`[NewsForm] Article saved successfully`);
      router.push("/admin");
      router.refresh();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Something went wrong";
      console.error("[NewsForm] Error:", errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-3xl">
      {/* Date */}
      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="text-sm font-medium text-neutral-700">
          Date
        </label>
        <input
          id="date"
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="e.g. 18. Februar 2026."
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          required
        />
      </div>

      {/* Featured */}
      <div className="flex items-center gap-3">
        <input
          id="featured"
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="w-4 h-4 accent-red-600 rounded"
        />
        <label htmlFor="featured" className="text-sm text-neutral-700">
          Featured article (shown on homepage carousel)
        </label>
      </div>

      {/* Titles Section */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-neutral-900">Titles</h3>
          <button
            type="button"
            onClick={translateTitles}
            disabled={translatingTitles || !headerSr.trim()}
            className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {translatingTitles ? "Translating..." : "Translate All"}
          </button>
        </div>
        
        {/* Title - Serbian */}
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm font-medium text-neutral-700">
            Title (Српски - Serbian)
          </label>
          <input
            type="text"
            value={headerSr}
            onChange={(e) => setHeaderSr(e.target.value)}
            placeholder="Article title in Serbian"
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>

        {/* Title - English */}
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm font-medium text-neutral-700">
            Title (English)
          </label>
          <input
            type="text"
            value={headerEn}
            onChange={(e) => setHeaderEn(e.target.value)}
            placeholder="Article title in English"
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Title - Russian */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700">
            Title (Русский - Russian)
          </label>
          <input
            type="text"
            value={headerRu}
            onChange={(e) => setHeaderRu(e.target.value)}
            placeholder="Article title in Russian"
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-neutral-900">Content</h3>
          <button
            type="button"
            onClick={translateContent}
            disabled={translatingContent || !textSr.trim()}
            className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {translatingContent ? "Translating..." : "Translate All"}
          </button>
        </div>
        
        {/* Content - Serbian */}
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm font-medium text-neutral-700">
            Content (Српски - Serbian)
          </label>
          <textarea
            value={textSr}
            onChange={(e) => setTextSr(e.target.value)}
            placeholder="Article content in Serbian"
            rows={10}
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-y"
            required
          />
        </div>

        {/* Content - English */}
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm font-medium text-neutral-700">
            Content (English)
          </label>
          <textarea
            value={textEn}
            onChange={(e) => setTextEn(e.target.value)}
            placeholder="Article content in English"
            rows={10}
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-y"
          />
        </div>

        {/* Content - Russian */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700">
            Content (Русский - Russian)
          </label>
          <textarea
            value={textRu}
            onChange={(e) => setTextRu(e.target.value)}
            placeholder="Article content in Russian"
            rows={10}
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-y"
          />
        </div>
      </div>

      {/* Images */}
      <ImageUpload
        existingImages={initialData?.images}
        newFiles={newFiles}
        deletedImageIds={deletedImageIds}
        onFilesAdd={handleFilesAdd}
        onFileRemove={handleFileRemove}
        onExistingImageDelete={handleExistingImageDelete}
        onExistingImageRestore={handleExistingImageRestore}
      />

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading
            ? "Saving..."
            : mode === "create"
              ? "Create Article"
              : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="px-6 py-3 text-neutral-700 bg-white border border-neutral-300 font-medium rounded-lg hover:bg-neutral-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
