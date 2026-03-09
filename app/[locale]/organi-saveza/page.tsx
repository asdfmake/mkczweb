import { getTranslations } from "next-intl/server";
import OrganiSavezaPageContent from "@/components/OrganiSaveza/OrganiSavezaContent";

interface Member {
  name: string;
  picture: string;
  category: string;
}

/**
 * Members organized by category.
 * Each member has a name and picture URL.
 */
const membersData: Record<string, Member[]> = {
  uprava: [
    { name: "Svetlana Višnjić Petronijević", picture: "/organi_saveza/uprava/Светлана%20Вишњић%20Петронијевић.jpg", category: "uprava" },
    { name: "Zoran Timić", picture: "/organi_saveza/uprava/Зоран%20Тимић.jpg", category: "uprava" },
    { name: "Danijela Ćosić", picture: "/organi_saveza/uprava/Данијела%20Ћосић.jpg", category: "uprava" },
    { name: "Dragan Makević", picture: "/organi_saveza/uprava/Драган%20Макевић.jpg", category: "uprava" },
    { name: "Lazar Mirčeta", picture: "/organi_saveza/uprava/Лазар%20Мирчета.jpg", category: "uprava" },
  ],
  treneri: [
    { name: "Alim Kadirov", picture: "/organi_saveza/treneri/Алим%20Кадиров.jpg", category: "treneri" },
    { name: "Ivica Subić", picture: "/organi_saveza/treneri/Ивица%20Субић.jpg", category: "treneri" },
    { name: "Nemanja Đurđić", picture: "/organi_saveza/treneri/Немања%20Ђурђић.jpg", category: "treneri" },
    { name: "Petar Volkonski", picture: "/organi_saveza/treneri/Петар%20Волконски.jpg", category: "treneri" },
    { name: "Stepan Koliesov", picture: "/organi_saveza/treneri/Степан%20Колиесов.jpg", category: "treneri" },
  ],
  "fie sudije": [
    { name: "Ana Kovrlija", picture: "/organi_saveza/fie%20sudije/Ана%20Коврлија.jpg", category: "fie sudije" },
    { name: "Marija Kovačević", picture: "/organi_saveza/fie%20sudije/Марија%20Ковачевић.jpg", category: "fie sudije" },
  ],
};

function getOrganiSavezaMembers(): Record<string, Member[]> {
  return membersData;
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