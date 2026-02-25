import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import ParalaxImage from "./ParalaxImage";

/**
 * Renders the homepage information section containing a translated title, body text, and a parallax image.
 *
 * Uses the "Homepage" translation namespace for content.
 *
 * @returns The JSX element for the homepage info section with translated title, body text, and a ParalaxImage component.
 */
function HomeInfo() {
  const t = useTranslations("Homepage");
  return (
    <div className="py-[32px] px-[24px] xl:px-72 bg-white dark:bg-background h-[625px] pt-[50px] relative overflow-hidden">
      <h2 className="font-heading text-[48px] uppercase text-red font-[500] mb-[24px]">
        {t("info_title")}
      </h2>
      <div className="font-body text-[20px] max-w-[555px] lg:max-w-[655px] text-foreground">
        {t("info")}
      </div>
      <ParalaxImage />
    </div>
  );
}

export default HomeInfo;
