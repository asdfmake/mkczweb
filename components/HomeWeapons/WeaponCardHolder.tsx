"use client";
import React, { useState } from "react";
import ModelCard from "../ModelCard/ModelCard";
import WeaponCard from "./WeaponCard";

function WeaponCardHolder() {
  const [activeCard, setActiveCard] = useState(1);

  return (
    <div className=" xl:mx-[264px] flex flex-col justify-between gap-[16px] h-[675px] sm:h-[520px] sm:flex-row">
      <WeaponCard
        item={1}
        active={activeCard === 1}
        setActiveCard={setActiveCard}
      />
      <WeaponCard
        item={2}
        active={activeCard === 2}
        setActiveCard={setActiveCard}
      />
      <WeaponCard
        item={3}
        active={activeCard === 3}
        setActiveCard={setActiveCard}
      />
    </div>
  );
}

export default WeaponCardHolder;
