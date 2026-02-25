"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Renders a "Delete" control that toggles a confirmation UI and deletes the specified article.
 *
 * The component shows a single "Delete" button which, when clicked, reveals Confirm and Cancel controls.
 * The Confirm control issues an HTTP DELETE to `/api/admin/news/{articleId}` and refreshes the current route on success.
 *
 * @param articleId - The numeric ID of the article to delete.
 * @returns The button UI that manages confirmation and deletion of the article.
 */
export default function DeleteArticleButton({
  articleId,
}: {
  articleId: number;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/news/${articleId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setDeleting(false);
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-3 py-1.5 text-xs font-medium bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
        >
          {deleting ? "..." : "Confirm"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-3 py-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="px-3 py-1.5 text-xs font-medium bg-red-600 border border-red-700 rounded-md hover:bg-red-700 transition-colors"
    >
      Delete
    </button>
  );
}
