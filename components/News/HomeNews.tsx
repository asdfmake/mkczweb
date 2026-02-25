import React from "react";
import NewsCard from "./NewsCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Link } from "@/i18n/routing";
import { getLatestNews } from "@/lib/posts";

export interface News {
  newsId: number;
  newsHeader: string;
  newsText: string;
  date: string;
  images: Image[];
}

export interface Image {
  name: string;
}

/**
 * Render a carousel section showing the latest news for the home page.
 *
 * Fetches up to 10 most recent news items and displays each as a NewsCard inside a Carousel.
 * If no news are available, renders an empty div.
 *
 * @returns A JSX element containing the news section with a carousel, or an empty `div` when there are no news items.
 */
async function HomeNews() {
  const latestNews = await getLatestNews(10);

  if (!latestNews || latestNews.length === 0) return <div></div>;

  return (
    <div className="py-[32px] px-[24px] bg-red">
      <div className="w-full flex justify-between items-center mb-4 xl:px-[264px]">
        <h2 className="text-[48px] font-[500] font-heading text-white uppercase">
          Vesti
        </h2>
        <Link
          href="/vesti"
          className="text-white text-[20px] font-body font-bold underline-effect"
        >
          Pogledaj sve vesti
          {"  "}→
        </Link>
      </div>
      <Carousel>
        <CarouselContent>
          {latestNews.map((news) => {
            let src = news.images[0]?.name;
            return (
              <CarouselItem className="pl-5" key={news.newsId}>
                <NewsCard
                  id={news.newsId}
                  title={news.newsHeader}
                  bodySr={news.newsText}
                  date={news.date}
                  img={src ?? ""}
                />
              </CarouselItem>
            );
          })}

          {latestNews.length === 0 && (
            <CarouselItem className="pl-5" key="no-news">
              <p className="text-white">No news available.</p>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious className="left-5 lg:hidden" />
        <CarouselNext className="right-5 lg:hidden" />
      </Carousel>
    </div>
  );
}

export default HomeNews;
