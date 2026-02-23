import React from "react";
import { Link } from "@/i18n/routing";
import { getLatestFeaturedArticle } from "@/lib/posts";
import { getTranslations } from "next-intl/server";
import Button from "../Button";

async function Hero() {
  const article = await getLatestFeaturedArticle();
  const t = await getTranslations("Homepage");

  return (
    <div
      className="relative overflow-hidden bg-cover bg-bottom bg-no-repeat p-12 text-center h-[846px] grid lg:grid-cols-2 md:px-56 lg:px-72"
      style={{ backgroundImage: "url(/heroimage.png)" }}
    >
      <div className="text-left pt-[200px]">
        <h1 className="text-white text-[48px] text-left font-semibold uppercase font-heading mb-6">
          {article?.newsHeader || t("header")}
        </h1>
        {article && (
          <Link href={`/vesti/${article.newsId}`}>
            <Button text={t("hero_cta")} />
          </Link>
        )}
        {!article && <Button text={t("hero_cta")} />}
      </div>
    </div>
  );
}

export default Hero;
