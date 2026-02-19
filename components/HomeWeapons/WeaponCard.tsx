import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import Button from "../Button";
import { useTranslations } from "next-intl";

interface WeaponCardProps {
  active: boolean;
  item: number;
  setActiveCard: (card: number) => void;
  name: string;
  image: string;
  slug: string;
}
function WeaponCard({
  active,
  item,
  setActiveCard,
  name,
  image,
  slug,
}: WeaponCardProps) {
  const t = useTranslations("Homepage");
  return (
    <div
      className={`rounded-[20px] relative overflow-hidden transition-all duration-300 cursor-pointer ${
        active ? "flex-grow-[2.5]" : "flex-grow"
      }`}
      onClick={() => setActiveCard(item)}
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div
        className={`w-full absolute bottom-0 px-[28px] pb-[16px] flex ${
          active ? "justify-between" : "justify-start sm:justify-center"
        } text-center items-center top-0 sm:top-auto`}
      >
        <h3
          className={`${
            active ? "self-start" : "self-auto"
          } text-[40px] font-heading text-white uppercase sm:self-auto`}
        >
          {name}
        </h3>
        <Link href={`/oruzja/${slug}`}>
          <Button
            text={t("hero_cta")}
            className={`${active ? "block" : "hidden"} self-end sm:self-auto`}
          />
        </Link>
      </div>
    </div>
  );
}

export default WeaponCard;
