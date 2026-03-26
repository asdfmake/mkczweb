import { getTranslations } from "next-intl/server";
import OrganiSavezaPageContent from "@/components/OrganiSaveza/OrganiSavezaContent";

interface Member {
  name: string;
  picture: string;
  category: string;
  descriptionKey: string;
}

/**
 * Members organized by category.
 * Each member has a name and picture file name.
 * Descriptions are fetched from locale translations using the descriptionKey.
 * Picture file names will be properly URL-encoded when used.
 */
const membersData: Record<string, Member[]> = {
  uprava: [
    { name: "prof.dr Svetlana Petronijević", picture: "Светлана Вишњић Петронијевић.jpg", category: "uprava", descriptionKey: "svetlana" },
    { name: "Zoran Timić", picture: "Зоран Тимић.jpg", category: "uprava", descriptionKey: "zoran" },
    { name: "Dragan Makević", picture: "Драган Макевић.jpg", category: "uprava", descriptionKey: "dragan" },
    { name: "Marija Djukic", picture: "mirjana djukic.JPG", category: "uprava", descriptionKey: "marija" },
    { name: "Dalibor Arbutina", picture: "Dalibor Arbutina.jpg", category: "uprava", descriptionKey: "dalibor" },
    { name: "Lazar Mirčeta", picture: "Лазар Мирчета.jpg", category: "uprava", descriptionKey: "lazar" },
  ],
  treneri: [
    { name: "Alim Kadirov", picture: "Алим Кадиров.jpg", category: "treneri", descriptionKey: "alim" },
    { name: "Ivica Subić", picture: "Ивица Субић.jpg", category: "treneri", descriptionKey: "ivica" },
    { name: "Nemanja Đurđić", picture: "Немања Ђурђић.jpg", category: "treneri", descriptionKey: "nemanja" },
    { name: "Petar Volkonski", picture: "Петар Волконски.jpg", category: "treneri", descriptionKey: "petar" },
    { name: "Stepan Koliesov", picture: "Степан Колиесов.jpg", category: "treneri", descriptionKey: "stepan" },
    { name: "Veljko Ćuk", picture: "Veljko Cuk.jpg", category: "treneri", descriptionKey: "veljko" },
    { name: "Petar Kostadinović", picture: "Petar Kostadinovic.jpg", category: "fie sudije", descriptionKey: "petar_k" },
  ],
  "fie sudije": [
    { name: "Ana Kovrlija", picture: "Ана Коврлија.jpg", category: "fie sudije", descriptionKey: "ana" },
    { name: "Marija Kovačević", picture: "Марија Ковачевић.jpg", category: "fie sudije", descriptionKey: "marija" },
    { name: "Petar Kostadinović", picture: "Petar Kostadinovic.jpg", category: "fie sudije", descriptionKey: "petar_k" },
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
  
  // Build members with properly URL-encoded picture paths and translated descriptions
  const members = Object.fromEntries(
    Object.entries(membersData).map(([category, categoryMembers]) => [
      category,
      categoryMembers.map(({ descriptionKey, ...member }) => ({
        ...member,
        picture: getPictureUrl(member.category, member.picture),
        description: t(`descriptions.${category}.${descriptionKey}`)
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