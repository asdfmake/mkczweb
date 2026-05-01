import NewsCard from "@/components/News/NewsCard";
import { Link } from "@/i18n/routing";
import { getNewsPaginated } from "@/lib/posts";
import { getTranslations } from "next-intl/server";

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
  params: Promise<{
    locale: string;
  }>;
}

export default async function BlogPage({ searchParams, params }: BlogPageProps) {
  const { locale } = await params;
  const t = await getTranslations("Homepage");
  let { page } = await searchParams;
  if (page === undefined) page = "1";
  if (parseInt(page) < 1) page = "1";
  const pageNum = parseInt(page) - 1;

  const { data, metadata } = await getNewsPaginated(pageNum, 12, locale);

  return (
    <main>
      <div className="h-[140px] bg-red"></div>
      <div className="py-[32px] px-10 md:px-[70px] bg-white">
        <h2 className="font-heading text-[48px] uppercase text-red font-[500] mb-[24px]">
          {t("news")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((news) => (
            <NewsCard
              key={news.newsId}
              className=" max-w-[480px] mb-2"
              date={news.date}
              title={news.newsHeader}
              bodySr={news.newsText}
              img={news.images[0]?.name}
              id={news.newsId}
            />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          {Array.from({ length: metadata.totalPages }, (_, index) => (
            <Link key={index} href={`?page=${index + 1}`}>
              <button
                className={`mx-1 px-4 py-2 rounded ${
                  metadata.currentPage === index
                    ? "bg-red text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
