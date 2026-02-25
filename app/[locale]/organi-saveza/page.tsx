import CoachCard from "@/components/HomeCoaches/CoachCard";
import { getTranslations } from "next-intl/server";
import fs from "fs";
import path from "path";

interface Member {
  name: string;
  picture: string;
  category: string;
}

/**
 * Builds a mapping from category folder names to arrays of Member objects by scanning the `public/organi_saveza` directory.
 *
 * Each Member contains `name` (filename without extension), `picture` (URL path under `/organi_saveza/{category}/{file}`), and `category` (the folder name).
 *
 * @returns A record whose keys are category names and whose values are arrays of Member objects. If filesystem read errors occur the function returns whatever was collected (which may be empty).
 */
function getOrganiSavezaMembers(): Record<string, Member[]> {
  const baseDir = path.join(process.cwd(), "public", "organi_saveza");
  const categories: Record<string, Member[]> = {};

  try {
    const categoryFolders = fs.readdirSync(baseDir, { withFileTypes: true });

    categoryFolders.forEach((folder) => {
      if (folder.isDirectory()) {
        const categoryName = folder.name;
        const categoryPath = path.join(baseDir, categoryName);
        const files = fs.readdirSync(categoryPath);

        categories[categoryName] = files
          .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
          .map((file) => {
            const nameWithoutExt = path.parse(file).name;
            return {
              name: nameWithoutExt,
              picture: `/organi_saveza/${categoryName}/${file}`,
              category: categoryName,
            };
          });
      }
    });
  } catch (error) {
    console.error("Error reading organi_saveza directory:", error);
  }

  return categories;
}

const categoryTitles: Record<string, { en: string; sr: string }> = {
  uprava: { en: "Management", sr: "Uprava" },
  treneri: { en: "Coaches", sr: "Treneri" },
  "fie sudije": { en: "FIE Referees", sr: "FIE Sudije" },
};

const categoryOrder = ["uprava", "treneri", "fie sudije"];

/**
 * Render the Organi Saveza page with categorized member cards.
 *
 * The component fetches translations for the "Organi" namespace, loads members
 * grouped by category, and selects localized category titles using the
 * provided locale.
 *
 * @param params - A promise resolving to an object with a `locale` string used to select translations and localized category titles
 * @returns A JSX element representing the Organi Saveza page
 */
export default async function OrganiSavezaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = await getTranslations("Organi");
  const members = getOrganiSavezaMembers();
  const locale = (await params).locale;

  return (
    <main>
      <div className="h-[140px] bg-red"></div>
      <div className="pt-[32px] pb-16 bg-white dark:bg-background">
        <div className="w-full flex flex-col px-6 mb-12 sm:px-16 lg:px-[264px]">
          <h1 className="text-[48px] md:text-[64px] font-[700] font-heading text-red uppercase leading-tight mb-2">
            {t("bodies")}
          </h1>
          <p className="text-[20px] font-body text-foreground/70">
            {t("members")}
          </p>
        </div>

        {Object.entries(members)
          .sort(
            ([keyA], [keyB]) =>
              categoryOrder.indexOf(keyA) - categoryOrder.indexOf(keyB)
          )
          .map(([categoryKey, categoryMembers]) => {
          const categoryTitle =
            categoryTitles[categoryKey]?.[locale as "en" | "sr"] ||
            categoryKey;

          return (
            <div key={categoryKey} className="mb-16 px-6 sm:px-16 lg:px-[264px]">
              <h2 className="text-[32px] md:text-[40px] font-heading font-semibold text-red uppercase mb-8">
                {categoryTitle}
              </h2>
              <div className="flex flex-wrap gap-8">
                {categoryMembers.map((member, index) => (
                  <CoachCard
                    key={`${member.name}-${index}`}
                    text={member.name}
                    name={member.name}
                    title=""
                    picture={member.picture}
                    inverted={true}
                    className="mb-10"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
