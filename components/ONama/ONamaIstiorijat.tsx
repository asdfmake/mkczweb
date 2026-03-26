"use client";

import React from "react";
import { useTranslations } from "next-intl";

const timelineKeys = [
  {
    yearKey: "history_1946",
    textKey: "history_1946_text",
  },
  {
    yearKey: "history_1960s",
    textKey: "history_1960s_text",
  },
  {
    yearKey: "history_1990",
    textKey: "history_1990_text",
  },
];

function ONamaIstiorijat() {
  const t = useTranslations("ONama");
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
          {timelineKeys.map((item) => (
            <div key={item.yearKey} className="relative">
              {/* Dot */}
              <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[#D50000] border-4 border-background" />
              <span className="font-heading text-[#D50000] text-[13px] uppercase tracking-widest mb-2 block">
                {t(item.yearKey)}
              </span>
              <p className="font-body text-foreground text-[16px] leading-relaxed">
                {t(item.textKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ONamaIstiorijat;
