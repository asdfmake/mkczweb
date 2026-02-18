import { useTranslations } from "next-intl";
import React from "react";
import WeaponCardHolder from "./WeaponCardHolder";

function HomeWeapons() {
  const t = useTranslations("Homepage");
  return (
    <div className="py-[32px] px-[24px]  bg-red">
      <div className="w-full flex justify-between items-center mb-4 xl:px-[264px]">
        <h2 className="text-[48px] font-[500] font-heading text-white uppercase">
          {t("explore_weapons")}
        </h2>
      </div>
      <WeaponCardHolder />
    </div>
  );
}

export default HomeWeapons;
