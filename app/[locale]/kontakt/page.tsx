import ContactsInfo from "@/components/Contacts/ContactsInfo";
import Map from "@/components/Contacts/Map/Map";
import MapSection from "@/components/Contacts/MapSection";
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
import { useTranslations } from "next-intl";

export default function KontaktPage() {
  const t = useTranslations("Kontakt");
  return (
    <main>
      <div className="h-[140px] bg-red"></div>
      <div className="py-[32px]  bg-white">
        <ContactsInfo />
        <MapSection />
      </div>
    </main>
  );
}
