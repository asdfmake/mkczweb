"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Button from "@/components/Button";

function ONamaCTA() {
  const t = useTranslations("ONama");
  return (
    <section className="bg-white py-20 md:py-28 px-6 md:px-16 xl:px-72 text-center">
      <h2 className="font-heading text-black text-[36px] md:text-[52px] uppercase font-semibold text-balance mb-6">
        {t("cta_title")}
      </h2>
      <p className="font-body text-black/80 text-[16px] md:text-[20px] max-w-2xl mx-auto mb-10 leading-relaxed">
        {t("cta_description")}
      </p>
      <Link href="/kontakt">
        <Button
          text={t("cta_button")}
          className="bg-white !text-black border-2 border-[#D50000] hover:bg-white/90"
        />
      </Link>
    </section>
  );
}

export default ONamaCTA;
