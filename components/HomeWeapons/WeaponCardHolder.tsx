"use client";
import React, { useState } from "react";
import WeaponCard from "./WeaponCard";
import { useTranslations } from "next-intl";

const weapons = [
  { slug: "saber", image: "/weapons/saber.jpg", translationKey: "saber" },
  { slug: "epee", image: "/weapons/epee.jpg", translationKey: "epee" },
  { slug: "foil", image: "/weapons/foil.jpg", translationKey: "foil" },
] as const;

/**
 * Renders a responsive container of weapon cards and manages which card is active.
 *
 * Tracks the index of the currently active card and passes the active state, its setter,
 * and localized weapon names to each rendered WeaponCard.
 *
 * @returns The JSX element containing the weapon card layout.
 */
function WeaponCardHolder() {
  const [activeCard, setActiveCard] = useState(0);
  const t = useTranslations("Weapons");

  return (
    <div className="xl:mx-[264px] flex flex-col justify-between gap-4 h-[675px] sm:h-[520px] sm:flex-row">
      {weapons.map((weapon, index) => (
        <WeaponCard
          key={weapon.slug}
          item={index}
          active={activeCard === index}
          setActiveCard={setActiveCard}
          name={t(weapon.translationKey)}
          image={weapon.image}
          slug={weapon.slug}
        />
      ))}
    </div>
  );
}

export default WeaponCardHolder;
