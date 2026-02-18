import { Link } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import CoachCard from "./CoachCard";

function HomeCoaches() {
  const t = useTranslations("Homepage");
  return (
    <div className="py-[32px]  bg-red">
      <div className="w-full flex flex-col px-[4px] mb-7 sm:flex-row sm:justify-between sm:align-top">
        <h2 className="text-[40px] font-[700] font-heading text-white uppercase sm:hidden">
          {t("short_name")}
        </h2>
        <h2 className="sm:text-[64px] lg:text-[86px] font-[700] font-heading text-white uppercase hidden sm:block sm:leading-none sm:pt-1 md:pt-5 mr-14">
          {t("full_name")}
        </h2>
        <h2 className="text-[100px] leading-[100px] font-[700] font-heading text-white uppercase md:text-[160px] lg:text-[220px] sm:leading-none">
          {t("coaches")}
        </h2>
      </div>
      <Carousel className="bg-red">
        <CarouselContent>
          <CarouselItem className="pl-0">
            <CoachCard
              text="test"
              picture="/coach.jpg"
              name="Nemanja Vicanovic"
              title="Trener Srbije"
            />
          </CarouselItem>
          <CarouselItem className="pl-0">
            <CoachCard
              text="test"
              picture="/coach.jpg"
              name="Nemanja Vicanovic"
              title="Trener Srbije"
            />
          </CarouselItem>
          <CarouselItem className="pl-0">
            <CoachCard
              text="test"
              picture="/coach.jpg"
              name="Nemanja Vicanovic"
              title="Trener Srbije"
            />
          </CarouselItem>
          <CarouselItem className="pl-0">
            <CoachCard
              text="test"
              picture="/coach.jpg"
              name="Nemanja Vicanovic"
              title="Trener Srbije"
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default HomeCoaches;
