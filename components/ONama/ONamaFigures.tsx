"use client";

import React from "react";
import { useTranslations } from "next-intl";

const valueKeys = [
  {
    titleKey: "value_discipline",
    descKey: "value_discipline_desc",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" />
        <line x1="12" y1="2.5" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="21.5" />
        <line x1="2.5" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="21.5" y2="12" />
      </svg>
    ),
  },
  {
    titleKey: "value_spirit",
    descKey: "value_spirit_desc",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3l7 3v5c0 5-3.1 8.1-7 10-3.9-1.9-7-5-7-10V6l7-3z" />
        <polyline points="9 12 11.3 14.3 15.5 10.1" />
      </svg>
    ),
  },
  {
    titleKey: "value_dedication",
    descKey: "value_dedication_desc",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="16" rx="2" ry="2" />
        <line x1="8" y1="3" x2="8" y2="7" />
        <line x1="16" y1="3" x2="16" y2="7" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <polyline points="9 15 11 17 15 13" />
      </svg>
    ),
  },
  {
    titleKey: "value_champions",
    descKey: "value_champions_desc",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8 4h8v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4V4z" />
        <path d="M16 6h3a2 2 0 0 1-2 2h-1" />
        <path d="M8 6H5a2 2 0 0 0 2 2h1" />
        <line x1="12" y1="10" x2="12" y2="16" />
        <rect x="9" y="16" width="6" height="2" rx="1" />
        <line x1="7" y1="20" x2="17" y2="20" />
      </svg>
    ),
  },
];

function ONamaFigures() {
  const t = useTranslations("ONama");
  return (
    <section className="py-16 md:py-24 px-6 md:px-16 xl:px-72 bg-background">
      <p className="font-heading text-[#D50000] text-[13px] uppercase tracking-widest mb-3">
        {t("values_title")}
      </p>
      <h2 className="font-heading text-[36px] md:text-[52px] uppercase font-semibold text-foreground mb-4 text-balance">
        {t("values_subtitle")}
      </h2>
      <p className="font-body text-foreground/60 text-[16px] md:text-[18px] leading-relaxed mb-14 max-w-2xl">
        {t("values_description")}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {valueKeys.map((val) => (
          <div
            key={val.titleKey}
            className="group border border-border rounded-lg p-8 flex flex-col gap-5 transition-all duration-300 hover:border-[#D50000]/50 hover:shadow-lg hover:-translate-y-1 bg-background"
          >
            <span className="text-[#D50000] transition-transform duration-300 group-hover:scale-110 w-fit">
              {val.icon}
            </span>
            <h3 className="font-heading text-[20px] uppercase font-semibold text-foreground">
              {t(val.titleKey)}
            </h3>
            <p className="font-body text-foreground/65 text-[15px] leading-relaxed">
              {t(val.descKey)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ONamaFigures;
