import CoachCard from "@/components/HomeCoaches/CoachCard";
import { getTranslations } from "next-intl/server";
import fs from "fs";
import path from "path";

interface Member {
  name: string;
  picture: string;
  category: string;
}

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

        {Object.entries(members).map(([categoryKey, categoryMembers]) => {
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
