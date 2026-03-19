import { getTranslations } from "next-intl/server";
import OrganiSavezaPageContent from "@/components/OrganiSaveza/OrganiSavezaContent";

interface Member {
  name: string;
  picture: string;
  category: string;
}

/**
 * Members organized by category.
 * Each member has a name and picture file name.
 * Picture file names will be properly URL-encoded when used.
 */
const membersData: Record<string, Member[]> = {
  uprava: [
    { name: "Svetlana Višnjić Petronijević", picture: "Светлана Вишњић Петронијевић.jpg", category: "uprava" },
    { name: "Zoran Timić", picture: "Зоран Тимић.jpg", category: "uprava" },
    { name: "Danijela Ćosić", picture: "Данијела Ћосић.jpg", category: "uprava" },
    { name: "Dragan Makević", picture: "Драган Макевић.jpg", category: "uprava" },
    { name: "Lazar Mirčeta", picture: "Лазар Мирчета.jpg", category: "uprava" },
  ],
  treneri: [
    { name: "Alim Kadirov", picture: "Алим Кадиров.jpg", category: "treneri" },
    { name: "Ivica Subić", picture: "Ивица Субић.jpg", category: "treneri" },
    { name: "Nemanja Đurđić", picture: "Немања Ђурђић.jpg", category: "treneri" },
    { name: "Petar Volkonski", picture: "Петар Волконски.jpg", category: "treneri" },
    { name: "Stepan Koliesov", picture: "Степан Колиесов.jpg", category: "treneri" },
  ],
  "fie sudije": [
    { name: "Ana Kovrlija", picture: "Ана Коврлија.jpg", category: "fie sudije" },
    { name: "Marija Kovačević", picture: "Марија Ковачевић.jpg", category: "fie sudije" },
  ],
};

/**
 * Helper function to build URL-encoded picture path
 */
function getPictureUrl(category: string, fileName: string): string {
  return `/organi_saveza/${encodeURIComponent(category)}/${encodeURIComponent(fileName)}`;
}

const categoryTitles: Record<string, { en: string; sr: string }> = {
  uprava: { en: "Management", sr: "Uprava" },
  treneri: { en: "Coaches", sr: "Treneri" },
  "fie sudije": { en: "FIE Referees", sr: "FIE Sudije" },
};

const categoryOrder = ["uprava", "treneri", "fie sudije"];

export default async function OrganiSavezaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = await getTranslations("Organi");
  const locale = (await params).locale;
  
  // Build members with properly URL-encoded picture paths
  const members = Object.fromEntries(
    Object.entries(membersData).map(([category, categoryMembers]) => [
      category,
      categoryMembers.map(member => ({
        ...member,
        picture: getPictureUrl(member.category, member.picture)
      }))
    ])
  );

  return (
    <OrganiSavezaPageContent
      members={members}
      categoryTitles={categoryTitles}
      categoryOrder={categoryOrder}
      locale={locale}
      bodyTitle={t("bodies")}
      membersSubtitle={t("members")}
    />
  );
}