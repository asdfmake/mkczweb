import ContactsInfo from "@/components/Contacts/ContactsInfo";
import Map from "@/components/Contacts/Map/Map";
import MapSection from "@/components/Contacts/MapSection";
import Table from "@/components/Documents/Table";
import Hero from "@/components/Hero/Hero";
import CoachCard from "@/components/HomeCoaches/CoachCard";
import HomeCoaches from "@/components/HomeCoaches/HomeCoaches";
import HomeInfo from "@/components/HomeInfo";
import HomeLocation from "@/components/HomeLocation";
import HomeWeapons from "@/components/HomeWeapons/HomeWeapons";
import ModelCard from "@/components/ModelCard/ModelCard";
import HomeNews from "@/components/News/HomeNews";
import NewsCard from "@/components/News/NewsCard";
import { members } from "@/constants/OrganiSaveza";
import { getDocuments } from "@/lib/documents";
import { useTranslations } from "next-intl";

export default async function DokumentaPage() {
  //   const t = useTranslations("Dokumenta");

  const documents = await getDocuments();
  return (
    <main>
      <div className="h-[90px] sm:h-[140px] bg-red"></div>
      <div className="py-[32px] px-[16px] bg-white max-w-[1600px] m-auto">
        <h2 className="font-heading text-[48px] uppercase text-red font-[500] mb-[24px]">
          Dokumenta
        </h2>
        <h3 className="font-heading text-[35px] uppercase text-btn font-[500] mb-[24px]">
          Statut
        </h3>
        <Table documents={documents ?? []} />
      </div>
    </main>
  );
}
