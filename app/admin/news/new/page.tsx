import AdminHeader from "@/components/admin/AdminHeader";
import NewsForm from "@/components/admin/NewsForm";

export default function NewArticlePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">
            Create New Article
          </h1>
          <p className="text-neutral-500 mt-1">
            Fill in the details below to create a new news article.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <NewsForm mode="create" />
        </div>
      </main>
    </div>
  );
}
