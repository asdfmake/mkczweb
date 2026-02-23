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
  };
}

export default function NewsForm({
  mode,
  articleId,
  initialData,
}: NewsFormProps) {
  const router = useRouter();
  const [header, setHeader] = useState(initialData?.header || "");
  const [text, setText] = useState(initialData?.text || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("header", header);
      formData.append("text", text);
      formData.append("date", date);
      formData.append("featured", String(featured));

      for (const file of newFiles) {
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

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save article");
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-3xl">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="header"
          className="text-sm font-medium text-neutral-700"
        >
          Title
        </label>
        <input
          id="header"
          type="text"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
          placeholder="Article title"
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          required
        />
      </div>

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

      {/* Text */}
      <div className="flex flex-col gap-2">
        <label htmlFor="text" className="text-sm font-medium text-neutral-700">
          Content
        </label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Article content..."
          rows={12}
          className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-y"
          required
        />
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
