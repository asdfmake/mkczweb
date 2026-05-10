"use client";

import React, { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useTranslations, useLocale } from "next-intl";
import CoachCard from "./CoachCard";

interface Coach {
  name: string;
  nameSr: string;
  nameRu: string;
  title: string;
  descriptionKey: string;
  picture: string;
}

const coachesData: Coach[] = [
  {
    name: "Alim Kadirov",
    nameSr: "Алим Кадиров",
    nameRu: "Алим Кадиров",
    title: "Trener",
    descriptionKey: "Organi.descriptions.treneri.alim",
    picture: encodeURI("/organi_saveza/Алим Кадиров.jpg"),
  },
  {
    name: "Ivica Subić",
    nameSr: "Ивица Субић",
    nameRu: "Ивица Субић",
    title: "Trener",
    descriptionKey: "Organi.descriptions.treneri.ivica",
    picture: encodeURI("/organi_saveza/Ивица Субић.jpg"),
  },
  {
    name: "Nemanja Đurđić",
    nameSr: "Немања Ђурђић",
    nameRu: "Немања Ђурђић",
    title: "Trener",
    descriptionKey: "Organi.descriptions.treneri.nemanja",
    picture: encodeURI("/organi_saveza/Немања Ђурђић.jpg"),
  },
  {
    name: "Petar Volkonski",
    nameSr: "Петар Волконски",
    nameRu: "Петар Волконский",
    title: "Trener",
    descriptionKey: "Organi.descriptions.treneri.petar",
    picture: encodeURI("/organi_saveza/Петар Волконски.jpg"),
  },
  {
    name: "Stepan Koliesov",
    nameSr: "Степан Колиесов",
    nameRu: "Степан Колиесов",
    title: "Trener",
    descriptionKey: "Organi.descriptions.treneri.stepan",
    picture: encodeURI("/organi_saveza/Степан Колиесов.jpg"),
  },
  {
    name: "Veljko Ćuk",
    nameSr: "Вељко Ћук",
    nameRu: "Вельо Чук",
    title: "Trener",
    descriptionKey: "Organi.descriptions.treneri.veljko",
    picture: encodeURI("/organi_saveza/Veljko Cuk.jpg"),
  },
  {
    name: "Petar Kostadinović",
    nameSr: "Петар Костадиновић",
    nameRu: "Петар Костадинович",
    title: "Trener",
    descriptionKey: "Organi.descriptions.treneri.petar_k",
    picture: encodeURI("/organi_saveza/Petar Kostadinovic trener.jpg"),
  }
];

function HomeCoaches() {
  const t = useTranslations("Homepage");
  const locale = useLocale();
  
  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1, dragFree: true },
    [autoplay.current]
  );

  // Get localized coach names
  const getCoachName = (coach: Coach) => {
    if (locale === "sr") return coach.nameSr;
    if (locale === "ru") return coach.nameRu;
    return coach.name;
  };

  // Get localized coach title
  const getCoachTitle = () => {
    if (locale === "sr") return "Тренер";
    if (locale === "ru") return "Тренер";
    return "Trener";
  };

  return (
    <section className="py-16 bg-white">
      <div className="px-6 mb-10">
        <h2 className="font-heading text-[56px] md:text-[80px] font-bold uppercase leading-none text-red">
          {t("coaches")}
        </h2>
        <div className="w-16 h-1 bg-red mt-2" />
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-0">
          {coachesData.map((coach, index) => (
            <div
              key={index}
              className="flex-none w-[80vw] sm:w-[45vw] md:w-[33vw] lg:w-[25vw] px-3"
            >
              <CoachCard
                picture={coach.picture}
                name={getCoachName(coach)}
                title={getCoachTitle()}
                descriptionKey={coach.descriptionKey}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeCoaches;
