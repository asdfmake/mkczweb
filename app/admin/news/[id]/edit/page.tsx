import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import NewsForm from "@/components/admin/NewsForm";

export const dynamic = "force-dynamic";

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
            initialData={{
              header: article.header,
              text: article.text,
              date: article.date,
              featured: article.featured,
              images: article.images.map((img) => ({
                id: img.id,
                filename: img.filename,
              })),
            }}
          />
        </div>
      </main>
    </div>
  );
}
