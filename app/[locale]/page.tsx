import Hero from "@/components/Hero/Hero";
import HomeCoaches from "@/components/HomeCoaches/HomeCoaches";
import HomeInfo from "@/components/HomeInfo";
import HomeWeapons from "@/components/HomeWeapons/HomeWeapons";
import HomeNews from "@/components/News/HomeNews";
import FeaturedNews from "@/components/News/FeaturedNews";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedNews />
      <HomeNews />
      <HomeInfo />
      <HomeWeapons />
      <HomeCoaches />
    </main>
  );
}
