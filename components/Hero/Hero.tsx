import React from "react";
import Button from "../Button";
import { useTranslations } from "next-intl";

function Hero() {
  const t = useTranslations("Homepage");
  return (
    <div
      className="relative overflow-hidden bg-cover bg-bottom bg-no-repeat p-12 text-center h-[846px] grid lg:grid-cols-2  md:px-56 lg:px-72"
      style={{ backgroundImage: "url(/heroimage.png)" }}
    >
      <div className="text-left pt-[200px]">
        <h1 className="text-white text-[48px] text-left font-semibold uppercase font-heading mb-6">
          {t("header")}
        </h1>
        <Button text={t("hero_cta")} />
      </div>
    </div>
  );
}

export default Hero;
