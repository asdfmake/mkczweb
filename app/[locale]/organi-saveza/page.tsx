import { getTranslations } from "next-intl/server";
import OrganiSavezaPageContent from "@/components/OrganiSaveza/OrganiSavezaContent";

interface Member {
  name: string;
  nameSr?: string;
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
    { name: "prof.dr Svetlana Petronijević", nameSr: "проф.др Светлана Петронијевић", picture: "Светлана Вишњић Петронијевић.jpg", category: "uprava", descriptionKey: "svetlana" },
    { name: "Zoran Timić", nameSr: "Зоран Тимић", picture: "Зоран Тимић.jpg", category: "uprava", descriptionKey: "zoran" },
    { name: "Dragan Makević", nameSr: "Драган Макевић", picture: "Драган Макевић.jpg", category: "uprava", descriptionKey: "dragan" },
    { name: "Mirjana Djukić", nameSr: "Мирјана Ђукић", picture: "mirjana djukic.JPG", category: "uprava", descriptionKey: "marija" },
    { name: "Dalibor Arbutina", nameSr: "Далибор Арбутина", picture: "Dalibor Arbutina.jpg", category: "uprava", descriptionKey: "dalibor" },
    { name: "Lazar Mičeta", nameSr: "Лазар Мичета", picture: "Лазар Мирчета.jpg", category: "uprava", descriptionKey: "lazar" },
  ],
  treneri: [
    { name: "Alim Kadirov", nameSr: "Алим Кадиров", picture: "Алим Кадиров.jpg", category: "treneri", descriptionKey: "alim" },
    { name: "Ivica Subić", nameSr: "Ивица Субић", picture: "Ивица Субић.jpg", category: "treneri", descriptionKey: "ivica" },
    { name: "Nemanja Đurđić", nameSr: "Немања Ђурђић", picture: "Немања Ђурђић.jpg", category: "treneri", descriptionKey: "nemanja" },
    { name: "Petar Volkonski", nameSr: "Петар Волконски", picture: "Петар Волконски.jpg", category: "treneri", descriptionKey: "petar" },
    { name: "Stepan Koliesov", nameSr: "Степан Колиесов", picture: "Степан Колиесов.jpg", category: "treneri", descriptionKey: "stepan" },
    { name: "Veljko Ćuk", nameSr: "Вељко Ћук", picture: "Veljko Cuk.jpg", category: "treneri", descriptionKey: "veljko" },
    { name: "Petar Kostadinović", nameSr: "Петар Костадиновић", picture: "Petar Kostadinovic trener.jpg", category: "fie sudije", descriptionKey: "petar_k" },
  ],
  "fie sudije": [
    { name: "Ana Kovrlija", nameSr: "Ана Коврлија", picture: "Ана Коврлија.jpg", category: "fie sudije", descriptionKey: "ana" },
    { name: "Marija Kovačević", nameSr: "Марија Ковачевић", picture: "Марија Ковачевић.jpg", category: "fie sudije", descriptionKey: "marija" },
    { name: "Petar Kostadinović", nameSr: "Петар Костадиновић", picture: "Petar Kostadinovic.jpg", category: "fie sudije", descriptionKey: "petar_k" },
  ],
  "governing_officials": [
    { name: "Ana Kovrlija", nameSr: "Ана Коврлија", picture: "Ана Коврлија.jpg", category: "governing_officials", descriptionKey: "ana_k" },
    { name: "Lazar Mičeta", nameSr: "Лазар Мичета", picture: "Лазар Мичета.jpg", category: "governing_officials", descriptionKey: "lazar_m" },
    { name: "Daniela Ćosić", nameSr: "Данијела Ћосић", picture: "Danijela Ćosić.png", category: "governing_officials", descriptionKey: "daniela" },
    { name: "Petar Kostadinović", nameSr: "Петар Костадиновић", picture: "Petar Kostadinovic.jpg", category: "governing_officials", descriptionKey: "petar_gov" },
    { name: "Alim Kadirov", nameSr: "Алим Кадиров", picture: "Алим Кадиров.jpg", category: "governing_officials", descriptionKey: "alim_sel" },
    { name: "Teodora Višnjić", nameSr: "Теодора Вишњић", picture: "Teodora Višnjić.jpeg", category: "governing_officials", descriptionKey: "teodora" },
  ]
};

/**
 * Helper function to build URL-encoded picture path
 */
function getPictureUrl(category: string, fileName: string): string {
  return `/organi_saveza/${encodeURIComponent(fileName)}`;
}

const categoryTitles: Record<string, { en: string; sr: string }> = {
  uprava: { en: "Management", sr: "Управа" },
  treneri: { en: "Coaches", sr: "Тренери" },
  "fie sudije": { en: "FIE Referees", sr: "Фие судије" },
  "governing_officials": { en: "Officials - MSS, MSB and FIE", sr: "Функционери МСС, МСБ и ФИЕ" },
};

const categoryOrder = ["uprava", "treneri", "fie sudije", "governing_officials"];

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
      categoryMembers.map(({ descriptionKey, nameSr, ...member }) => ({
        ...member,
        name: locale === "sr" && nameSr ? nameSr : member.name,
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