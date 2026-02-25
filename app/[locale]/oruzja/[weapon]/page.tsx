import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";

const VALID_WEAPONS = ["saber", "epee", "foil"] as const;
type WeaponSlug = (typeof VALID_WEAPONS)[number];

const weaponData: Record<WeaponSlug, { image: string }> = {
  saber: { image: "/weapons/saber.jpg" },
  epee: { image: "/weapons/epee.jpg" },
  foil: { image: "/weapons/foil.jpg" },
};

/**
 * Renders the weapon detail page for a given weapon slug, including hero image, description, target area, rules, and links to other weapons.
 *
 * Triggers a 404 response when the provided weapon slug is not one of the valid weapons.
 *
 * @param params - A promise that resolves to route parameters containing `weapon` (the weapon slug) and `locale`.
 * @returns The JSX element for the weapon detail page.
 */
export default async function WeaponPage({
  params,
}: {
  params: Promise<{ weapon: string; locale: string }>;
}) {
  const { weapon } = await params;

  if (!VALID_WEAPONS.includes(weapon as WeaponSlug)) {
    notFound();
  }

  const slug = weapon as WeaponSlug;
  const data = weaponData[slug];
  const t = await getTranslations("Weapons");

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={data.image}
          alt={t(slug)}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:px-[264px]">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4 font-body text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("back_home")}
          </Link>
          <h1 className="text-5xl md:text-7xl font-heading text-white uppercase font-medium">
            {t(slug)}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-8 md:px-16 lg:px-[264px] py-12 md:py-16">
        <div className="max-w-3xl">
          <p className="text-lg md:text-xl leading-relaxed text-foreground/80 font-body mb-12">
            {t(`${slug}_description`)}
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Target Area Card */}
            <div className="bg-red rounded-2xl p-8">
              <h2 className="text-2xl font-heading text-white uppercase mb-4">
                {t("target_area")}
              </h2>
              <p className="text-white/90 font-body leading-relaxed">
                {t(`${slug}_target`)}
              </p>
            </div>

            {/* Rules Card */}
            <div className="bg-foreground/5 dark:bg-foreground/10 rounded-2xl p-8">
              <h2 className="text-2xl font-heading text-foreground uppercase mb-4">
                {t("rules")}
              </h2>
              <p className="text-foreground/80 font-body leading-relaxed">
                {t(`${slug}_rules`)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Weapons */}
      <section className="px-8 md:px-16 lg:px-[264px] pb-16">
        <h2 className="text-3xl font-heading text-foreground uppercase mb-8">
          {t("learn_more")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {VALID_WEAPONS.filter((w) => w !== slug).map((w) => (
            <Link
              key={w}
              href={`/oruzja/${w}`}
              className="group relative h-48 rounded-2xl overflow-hidden"
            >
              <Image
                src={weaponData[w].image}
                alt={t(w)}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-heading text-white uppercase">
                  {t(w)}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
