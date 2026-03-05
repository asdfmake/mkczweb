import { notFound } from "next/navigation";
import News from "@/components/News/News";
import HomeNews from "@/components/News/HomeNews";
import { getNewsDetail } from "@/lib/posts";

export interface NewsDetail {
  newsId: number;
  newsHeader: string;
  newsText: string;
  date: string;
  images: { name: string }[];
  message?: string;
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const newsId = parseInt(id);

  if (isNaN(newsId)) {
    notFound();
  }

  const news = await getNewsDetail(newsId);
  if (!news) notFound();

  if (news?.message === "not found") {
    notFound();
  }

  return (
    <>
      <main>
        <div
          className="absolute top-0 left-0 right-0 overflow-hidden bg-cover bg-top bg-no-repeat p-12 text-center h-[846px] grid lg:grid-cols-2 md:px-56 lg:px-72 -z-10"
          style={{
            backgroundImage: news?.images[0]?.name
              ? `url(${encodeURI(`/uploads/${news.images[0].name}`)})`
              : undefined,
          }}
        ></div>

        <News news={news} />

        <div className="py-[32px] px-10 md:px-[70px] bg-white"></div>
        <HomeNews />
      </main>
    </>
  );
}
