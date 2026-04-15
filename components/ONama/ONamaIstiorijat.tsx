"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { X } from "lucide-react";

const timelineKeys = [
  {
    yearKey: "history_1946",
    textKey: "history_1946_text",
    images: ["0001.PNG", "1001.jpg"],
  },
  {
    yearKey: "history_1950_section",
    textKey: "history_1950_section_text",
    images: ["1017.jpg"],
  },
  {
    yearKey: "history_1950_championship",
    textKey: "history_1950_championship_text",
    images: ["1005.jpg"],
  },
  {
    yearKey: "history_1952",
    textKey: "history_1952_text",
    images: [],
  },
  {
    yearKey: "history_1955",
    textKey: "history_1955_text",
    images: ["1036.jpg"],
  },
  {
    yearKey: "history_1960",
    textKey: "history_1960_text",
    images: ["1068.jpg"],
  },
  {
    yearKey: "history_1965",
    textKey: "history_1965_text",
    images: [],
  },
  {
    yearKey: "history_1970",
    textKey: "history_1970_text",
    images: ["1071.jpg"],
  },
  {
    yearKey: "history_1976",
    textKey: "history_1976_text",
    images: ["1094.jpg"],
  },
  {
    yearKey: "history_1989",
    textKey: "history_1989_text",
    images: [],
  },
  {
    yearKey: "history_1989_coaching",
    textKey: "history_1989_coaching_text",
    images: [],
  },
  {
    yearKey: "history_1991",
    textKey: "history_1991_text",
    images: ["1120.jpg"],
  },
  {
    yearKey: "history_1997",
    textKey: "history_1997_text",
    images: ["1147.JPG"],
  },
  {
    yearKey: "history_1999",
    textKey: "history_1999_text",
    images: ["1195.JPG"],
  },
  {
    yearKey: "history_2001",
    textKey: "history_2001_text",
    images: ["1128.jpg", "1165.JPG"],
  },
  {
    yearKey: "history_2004",
    textKey: "history_2004_text",
    images: ["1145.JPG"],
  },
  {
    yearKey: "history_2005",
    textKey: "history_2005_text",
    images: ["1177.jpg"],
  },
  {
    yearKey: "history_2008",
    textKey: "history_2008_text",
    images: ["1247.JPG"],
  },
  {
    yearKey: "history_2009",
    textKey: "history_2009_text",
    images: ["1162.JPG", "1192.jpg"],
  },
  {
    yearKey: "history_2013",
    textKey: "history_2013_text",
    images: ["1243.JPG"],
  },
  {
    yearKey: "history_2013_memorial",
    textKey: "history_2013_memorial_text",
    images: [],
  },
  {
    yearKey: "history_2015",
    textKey: "history_2015_text",
    images: ["2880.jpg", "1225.JPG"],
  },
  {
    yearKey: "history_2016",
    textKey: "history_2016_text",
    images: [],
  },
  {
    yearKey: "history_2021",
    textKey: "history_2021_text",
    images: ["2152.jpg"],
  },
  {
    yearKey: "history_2023",
    textKey: "history_2023_text",
    images: ["2921.jpg", "2928.jpg"],
  },
  {
    yearKey: "history_2024_fie",
    textKey: "history_2024_fie_text",
    images: [],
  },
  {
    yearKey: "history_2024_october",
    textKey: "history_2024_october_text",
    images: ["2339.jpg", "2340.jpg"],
  },
  {
    yearKey: "history_2025_november",
    textKey: "history_2025_november_text",
    images: ["2225.jpg", "2235.jpg", "2240.jpg"],
  },
  {
    yearKey: "history_2025_december",
    textKey: "history_2025_december_text",
    images: ["3003.jpg", "3004.jpg"],
  },
  {
    yearKey: "history_2026",
    textKey: "history_2026_text",
    images: ["3000.jpeg", "3001.jpg", "3002.jpg"],
  },
];

function ONamaIstiorijat() {
  const t = useTranslations("ONama");
  const [isExpanded, setIsExpanded] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const displayedItems = isExpanded ? timelineKeys : timelineKeys.slice(0, 3);

  return (
    <section className="py-16 md:py-24 px-6 md:px-16 xl:px-72 bg-background">
      <div className="max-w-3xl">
        <p className="font-heading text-[#D50000] text-[13px] uppercase tracking-widest mb-3">
          {t("history_title")}
        </p>
        <h2 className="font-heading text-[36px] md:text-[52px] uppercase font-semibold text-foreground mb-12 text-balance">
          {t("history_title")}
        </h2>

        {/* Timeline */}
        <div className="relative border-l-2 border-[#D50000]/30 pl-8 flex flex-col gap-12">
          {displayedItems.map((item) => (
            <div key={item.yearKey} className="relative">
              {/* Dot */}
              <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[#D50000] border-4 border-background" />
              <span className="font-heading text-[#D50000] text-[13px] uppercase tracking-widest mb-2 block">
                {t(item.yearKey)}
              </span>
              <p className="font-body text-foreground text-[16px] leading-relaxed mb-4">
                {t(item.textKey)}
              </p>

              {/* Images Gallery */}
              {item.images && item.images.length > 0 && (
                <div
                  className={`grid gap-4 mt-4 ${
                    item.images.length === 1
                      ? "grid-cols-1"
                      : item.images.length === 2
                        ? "grid-cols-2"
                        : "grid-cols-3"
                  }`}
                >
                  {item.images.map((image, idx) => (
                    <div
                      key={idx}
                      className="relative h-48 md:h-56 overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setZoomedImage(image)}
                    >
                      <Image
                        src={`/history/${image}`}
                        alt={`${t(item.yearKey)} - Image ${idx + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* See All Button */}
        {timelineKeys.length > 3 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-12 px-6 py-3 bg-[#D50000] text-white font-heading text-sm uppercase tracking-widest hover:bg-[#B80000] transition-colors"
          >
            {isExpanded ? t("see_less") : t("see_all")}
          </button>
        )}
      </div>

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setZoomedImage(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full bg-white rounded-lg overflow-hidden flex items-center justify-center">
              <button
                onClick={() => setZoomedImage(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                aria-label="Close zoom"
              >
                <X size={24} />
              </button>
              <Image
                src={`/history/${zoomedImage}`}
                alt="Zoomed image"
                width={1200}
                height={800}
                className="w-full max-h-[85vh] h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ONamaIstiorijat;
