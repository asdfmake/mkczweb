import React from "react";
import Map from "./Map/Map";
import { useTranslations } from "next-intl";

function MapSection() {
  const t = useTranslations("Kontakt");
  return (
    <div>
      <div className="px-2">
        <h2 className="font-heading text-[76px] uppercase text-red font-[500] mb-[24px]">
          {t("lokacija")}
        </h2>
        <div>
          <h3 className="font-heading text-[40px] uppercase text-btn font-[500] mb-[24px]">
            Stadio Rajko Mitic
          </h3>
          <p className="text-black mb-3">
            Treninzi mačevanja održavaju se na lokaciji u tunelu ispod stadiona
            Marakana, gde je smeštena i streljana.{" "}
          </p>
        </div>
      </div>
      <Map />
    </div>
  );
}

export default MapSection;
