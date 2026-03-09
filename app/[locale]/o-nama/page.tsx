import ONamaHero from "@/components/ONama/ONamaHero";
import ONamaIstiorijat from "@/components/ONama/ONamaIstiorijat";
import ONamaStats from "@/components/ONama/ONamaStats";
import ONamaFigures from "@/components/ONama/ONamaFigures";
import ONamaCTA from "@/components/ONama/ONamaCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O Nama | MK Crvena Zvezda",
  description:
    "Мачевалачки клуб Црвена звезда — традиција шампиона од 1946. године. Сазнајте о историји, достигнућима и људима клуба.",
};

export default function ONamaPage() {
  return (
    <main>
      <ONamaHero />
      <ONamaIstiorijat />
      <ONamaStats />
      <ONamaFigures />
      <ONamaCTA />
    </main>
  );
}
