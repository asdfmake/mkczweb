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
import { getFeaturedNews } from "@/lib/posts";

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

async function HomeNews() {
  const featuredNews = await getFeaturedNews();

  if (!featuredNews || featuredNews.length === 0) return <div></div>;

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
          {featuredNews.map((news) => {
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

          {featuredNews.length === 0 && (
            <CarouselItem className="pl-5" key="no-news">
              <p className="text-white">No featured news available.</p>
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
