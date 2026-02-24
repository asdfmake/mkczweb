import Hero from "@/components/Hero/Hero";
import HomeInfo from "@/components/HomeInfo";
import HomeWeapons from "@/components/HomeWeapons/HomeWeapons";
import HomeNews from "@/components/News/HomeNews";

/**
 * Render the homepage composed of the Hero, HomeNews, HomeInfo, and HomeWeapons sections.
 *
 * @returns The homepage element containing `Hero`, `HomeNews`, `HomeInfo`, and `HomeWeapons` components.
 */
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
