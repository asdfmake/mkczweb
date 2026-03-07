"use client";

import React, { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import CoachCard from "./CoachCard";

const coaches = [
  {
    name: "Алим Кадиров",
    title: "Trener",
    description: "Opis",
    picture: encodeURI("/organi_saveza/treneri/Алим Кадиров.jpg"),
  },
  {
    name: "Ивица Субић",
    title: "Trener",
    description: "Opis",
    picture: encodeURI("/organi_saveza/treneri/Ивица Субић.jpg"),
  },
  {
    name: "Немања Ђурђић",
    title: "Trener",
    description: "Opis",
    picture: encodeURI("/organi_saveza/treneri/Немања Ђурђић.jpg"),
  },
  {
    name: "Петар Волконски",
    title: "Trener",
    description: "Opis",
    picture: encodeURI("/organi_saveza/treneri/Петар Волконски.jpg"),
  },
  {
    name: "Степан Колиесов",
    title: "Trener",
    description: "Opis",
    picture: encodeURI("/organi_saveza/treneri/Степан Колиесов.jpg"),
  },
];

function HomeCoaches() {
  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1, dragFree: true },
    [autoplay.current]
  );

  return (
    <section className="py-16 bg-white">
      <div className="px-6 mb-10">
        <h2 className="font-heading text-[56px] md:text-[80px] font-bold uppercase leading-none text-red">
          Treneri
        </h2>
        <div className="w-16 h-1 bg-red mt-2" />
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-0">
          {coaches.map((coach, index) => (
            <div
              key={index}
              className="flex-none w-[80vw] sm:w-[45vw] md:w-[33vw] lg:w-[25vw] px-3"
            >
              <CoachCard
                picture={coach.picture}
                name={coach.name}
                title={coach.title}
                description={coach.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeCoaches;
