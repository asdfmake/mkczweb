"use client";
import { Link } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import NewsCard from "./News/NewsCard";
import Autoplay from "embla-carousel-autoplay";

function HomeLocation() {
  const t = useTranslations("Homepage");
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <div className="pt-[32px]  bg-white">
      <div className="w-full flex flex-col px-[4px] mb-7 sm:flex-row sm:justify-between sm:align-top">
        <h2 className="text-[40px] font-[700] font-heading text-red uppercase sm:hidden">
          {t("short_name")}
        </h2>
        <h2 className="sm:text-[64px] lg:text-[86px] font-[700] font-heading text-red uppercase hidden sm:block sm:leading-none sm:pt-1 md:pt-5 mr-14">
          {t("full_name")}
        </h2>
        <h2 className="text-[100px] leading-[100px] font-[700] font-heading text-red uppercase md:text-[160px] lg:text-[220px] sm:leading-none">
          {t("coaches")}
        </h2>
      </div>

      <Carousel
        className="w-full"
        opts={{ loop: true }}
        plugins={[plugin.current]}
      >
        <CarouselContent className="!justify-start !ml-0">
          <CarouselItem className="m-1">
            <div className="w-screen h-[500px] bg-blue-500"></div>
          </CarouselItem>
          <CarouselItem className="m-1">
            <div className="w-screen h-[500px] bg-green-500"></div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default HomeLocation;
