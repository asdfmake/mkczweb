import Hero from "@/components/Hero/Hero";
import HomeInfo from "@/components/HomeInfo";
import HomeWeapons from "@/components/HomeWeapons/HomeWeapons";
import HomeNews from "@/components/News/HomeNews";

export default function Home() {
  return (
    <main>
      <Hero />
      <HomeNews />
      <HomeInfo />
      <HomeWeapons />
    </main>
  );
}
