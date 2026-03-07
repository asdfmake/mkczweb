import Hero from "@/components/Hero/Hero";
import HomeInfo from "@/components/HomeInfo";
import HomeWeapons from "@/components/HomeWeapons/HomeWeapons";
import HomeNews from "@/components/News/HomeNews";
import HomeCoaches from "@/components/HomeCoaches/HomeCoaches";

/**
 * Render the homepage composed of the Hero, HomeNews, HomeInfo, HomeWeapons, and HomeCoaches sections.
 *
 * @returns The homepage element containing all homepage components.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <HomeNews />
      <HomeInfo />
      <HomeWeapons />
      <HomeCoaches />
    </main>
  );
}
