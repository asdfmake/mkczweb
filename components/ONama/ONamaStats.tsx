"use client";

import React from "react";
import { useTranslations } from "next-intl";

const statsKeys = [
  { valueKey: "stats_70", labelKey: "stats_tradition" },
  { valueKey: "stats_1946", labelKey: "stats_founded" },
  { valueKey: "stats_3", labelKey: "stats_disciplines" },
  { valueKey: "stats_100", labelKey: "stats_athletes" },
];

function ONamaStats() {
  const t = useTranslations("ONama");
  return (
    <section className="bg-[#D50000] py-16 md:py-20 px-6 md:px-16 xl:px-72">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
        {statsKeys.map((stat) => (
          <div key={stat.labelKey} className="text-center">
            <p className="font-heading text-white text-[52px] md:text-[64px] font-semibold leading-none mb-2">
              {t(stat.valueKey)}
            </p>
            <p className="font-body text-white/80 text-[14px] md:text-[16px] uppercase tracking-wide">
              {t(stat.labelKey)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ONamaStats;
