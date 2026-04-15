"use client";

import type { NewsDetail } from "@/app/[locale]/vesti/[id]/page";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface NewsProps {
  news: NewsDetail;
}

const News = ({ news }: NewsProps) => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const images = news.images ?? [];
  const normalizeImageSrc = (name: string) => {
    if (!name) return "";
    if (/^https?:\/\//i.test(name)) return encodeURI(name);
    if (name.startsWith("/uploads/")) return encodeURI(name);
    if (name.startsWith("uploads/")) return encodeURI(`/${name}`);
    return encodeURI(`/uploads/${name}`);
  };

  useEffect(() => {
    if (!zoomedImage) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setZoomedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [zoomedImage]);

  return (
    <div>
      <div className="w-full h-[300px]"></div>
      <div className="w-full bg-white rounded-lg shadow-lg p-8 mx-auto max-w-[1400px]">
        <div className="mb-6">
          <a
            href="../vesti"
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Pogledaj sve vesti
          </a>
        </div>

        <h1 className="text-4xl font-bold text-red-600 mb-4">{news.newsHeader}</h1>

        <div className="text-gray-600 mb-4">{news.date}</div>

        <div className="flex gap-2 mb-8">
          <button className="bg-orange-400 text-white p-2 rounded">
            <span className="sr-only">Copy link</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" />
            </svg>
          </button>
          <button className="bg-blue-600 text-white p-2 rounded">
            <span className="sr-only">Share on Facebook</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </button>
          <button className="bg-blue-400 text-white p-2 rounded">
            <span className="sr-only">Share on Twitter</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </button>
          <button className="bg-blue-800 text-white p-2 rounded">
            <span className="sr-only">Share on LinkedIn</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 text-gray-700">
          <p>{news.newsText}</p>
        </div>

        {images.length > 0 && (
          <div className="mt-8 px-2 md:px-10">
            <Carousel opts={{ align: "start", loop: images.length > 1 }}>
              <CarouselContent className="xl:justify-start">
                {images.map((image, idx) => {
                  const src = normalizeImageSrc(image.name);

                  return (
                    <CarouselItem
                      key={`${image.name}-${idx}`}
                      className="basis-full min-w-full"
                    >
                      <button
                        type="button"
                        onClick={() => setZoomedImage(src)}
                        className="relative block w-full h-[280px] md:h-[460px] rounded-lg overflow-hidden bg-gray-100"
                        aria-label={`Open image ${idx + 1} in zoom mode`}
                      >
                        <img
                          src={src}
                          alt={`${news.newsHeader} image ${idx + 1}`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </button>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              {images.length > 1 && (
                <>
                  <CarouselPrevious className="left-4 bg-white/90 hover:bg-white border-[#D50000] text-[#D50000]" />
                  <CarouselNext className="right-4 bg-white/90 hover:bg-white border-[#D50000] text-[#D50000]" />
                </>
              )}
            </Carousel>
          </div>
        )}
      </div>

      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4"
          onClick={() => setZoomedImage(null)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[92vh]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
              aria-label="Close zoom"
            >
              <X size={22} />
            </button>
            <img
              src={zoomedImage}
              alt="Zoomed news image"
              className="w-full max-h-[90vh] h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
