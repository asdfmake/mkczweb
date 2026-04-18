import { prisma } from "@/lib/prisma";
import AdminHeader from "@/components/admin/AdminHeader";
import Link from "next/link";
import Image from "next/image";
import DeleteArticleButton from "@/components/admin/DeleteArticleButton";

export const dynamic = "force-dynamic";

/**
 * Renders the admin dashboard for managing news articles.
 *
 * Displays a header, article count, a "New Article" action, and either an empty-state prompt
 * or a table listing articles with their image, title, date, featured status, image count,
 * and edit/delete actions.
 *
 * @returns The React element for the admin news articles dashboard.
 */
export default async function AdminDashboard() {
  const articles = await prisma.newsArticle.findMany({
    include: { images: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">
              News Articles
            </h1>
            <p className="text-neutral-500 mt-1">
              {articles.length} article{articles.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <Link
            href="/admin/news/new"
            className="px-5 py-2.5 bg-green-600 font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            New Article
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
            <p className="text-neutral-500 text-lg">No articles yet.</p>
            <p className="text-neutral-400 mt-1">
              Create your first article to get started.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">
                    Image
                  </th>
                  <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">
                    Title
                  </th>
                  <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">
                    Date
                  </th>
                  <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">
                    Featured
                  </th>
                  <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">
                    Images
                  </th>
                  <th className="text-right text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    className="hover:bg-neutral-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {article.images[0] ? (
                        <Image
                          src={encodeURI(`/uploads/${article.images[0].filename}`)}
                          alt=""
                          width={64}
                          height={44}
                          className="w-16 h-11 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-11 bg-neutral-100 rounded flex items-center justify-center">
                          <span className="text-neutral-400 text-xs">
                            No img
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-neutral-900 line-clamp-1">
                        {article.header}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500">
                      {article.date}
                    </td>
                    <td className="px-6 py-4">
                      {article.featured ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          Yes
                        </span>
                      ) : (
                        <span className="text-xs text-neutral-400">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500">
                      {article.images.length}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/news/${article.id}/edit`}
                          className="px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 transition-colors"
                        >
                          Edit
                        </Link>
                        <DeleteArticleButton articleId={article.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
