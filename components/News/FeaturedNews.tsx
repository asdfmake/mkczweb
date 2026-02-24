import { getLatestFeaturedArticle } from "@/lib/posts";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

/**
 * Render a featured news hero card linking to the latest featured article.
 *
 * Renders a section with a label, hero image (or red fallback), gradient overlay,
 * article date and title, and a "read more" affordance; returns `null` when no featured article exists.
 *
 * @returns The component's React node, or `null` if no featured article is available.
 */
export default async function FeaturedNews() {
  const article = await getLatestFeaturedArticle();
  const t = await getTranslations("Weapons");

  if (!article) return null;

  const heroImage = article.images?.[0]?.name;

  return (
    <section className="px-6 py-8 md:px-16 lg:px-[264px]">
      <h2 className="text-sm font-heading uppercase tracking-widest text-red mb-4">
        {t("featured_article")}
      </h2>
      <Link
        href={`/vesti/${article.newsId}`}
        className="group block relative rounded-2xl overflow-hidden h-[280px] md:h-[360px]"
      >
        {heroImage ? (
          <Image
            src={`/uploads/${heroImage}`}
            alt={article.newsHeader}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        ) : (
          <div className="absolute inset-0 bg-red" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex items-end justify-between">
          <div>
            <p className="text-white/70 font-body text-sm mb-2">
              {article.date}
            </p>
            <h3 className="text-2xl md:text-4xl font-heading text-white uppercase font-medium text-balance max-w-2xl">
              {article.newsHeader}
            </h3>
          </div>
          <div className="hidden md:flex items-center gap-2 text-white font-body shrink-0 ml-8 group-hover:gap-3 transition-all">
            {t("read_more")}
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </Link>
    </section>
  );
}
