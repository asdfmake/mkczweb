import Hero from "@/components/Hero/Hero";
import HomeCoaches from "@/components/HomeCoaches/HomeCoaches";
import HomeInfo from "@/components/HomeInfo";
import HomeLocation from "@/components/HomeLocation";
import HomeWeapons from "@/components/HomeWeapons/HomeWeapons";
import ModelCard from "@/components/ModelCard/ModelCard";
import HomeNews from "@/components/News/HomeNews";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Homepage");
  console.log(process.env.GOOGLE_MAP_API_KEY);
  return (
    <main>
      {/* {t("Header")} */}

      <Hero />
      <HomeNews />
      <HomeInfo />
      <HomeWeapons />
      <HomeCoaches />
      <HomeLocation />
    </main>
  );
}
