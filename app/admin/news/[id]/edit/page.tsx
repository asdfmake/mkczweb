import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { publishNewsToInstagram } from "@/lib/instagram";
import AdminHeader from "@/components/admin/AdminHeader";
import NewsForm from "@/components/admin/NewsForm";

export const dynamic = "force-dynamic";

async function verifyAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!token || !adminPassword) {
    throw new Error("Unauthorized: Missing authentication");
  }

  // Verify token matches admin password hash
  const encoder = new TextEncoder();
  const data = encoder.encode(adminPassword);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const expectedToken = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (token !== expectedToken) {
    throw new Error("Unauthorized: Invalid token");
  }
}

async function repostToInstagram(articleId: number) {
  "use server";
  
  try {
    // Verify admin authentication
    await verifyAdminAuth();

    const article = await prisma.newsArticle.findUnique({
      where: { id: articleId },
      include: { images: true },
    });

    if (!article) {
      throw new Error("Article not found");
    }

    if (article.images.length === 0) {
      throw new Error("Article has no images to post");
    }

    const baseUrl = process.env.SITE_URL || "http://localhost:3000";
    const imageUrls = article.images.map(
      (img) => `${baseUrl}/uploads/${img.filename}`
    );
    const caption = `${article.header}\n\n${article.text}`;

    const result = await publishNewsToInstagram(imageUrls, caption, article.id);
    
    return { success: true, result };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[Repost] Error:", errorMessage);
    throw error;
  }
}

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const articleId = parseInt(id);

  if (isNaN(articleId)) {
    notFound();
  }

  const article = await prisma.newsArticle.findUnique({
    where: { id: articleId },
    include: { images: true },
  });

  if (!article) {
    notFound();
  }

  // The 'as' assertion is safe here if we assume publishedAt exists from a migration
  const articleWithPublishedAt = article as typeof article & {
    publishedAt?: Date;
  };
  const initialDateValue = articleWithPublishedAt.publishedAt
    ? articleWithPublishedAt.publishedAt.toISOString().slice(0, 10)
    : article.date;

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">Edit Article</h1>
          <p className="text-neutral-500 mt-1">
            Update the article details below.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <NewsForm
            mode="edit"
            articleId={article.id}
            onRepost={repostToInstagram}
            initialData={{
              header: article.header,
              text: article.text,
              date: initialDateValue,
              featured: article.featured,
              images: article.images.map((img) => ({
                id: img.id,
                filename: img.filename,
              })),
              header_sr: article.header_sr || undefined,
              header_en: article.header_en || undefined,
              header_ru: article.header_ru || undefined,
              text_sr: article.text_sr || undefined,
              text_en: article.text_en || undefined,
              text_ru: article.text_ru || undefined,
            }}
          />
        </div>
      </main>
    </div>
  );
}
