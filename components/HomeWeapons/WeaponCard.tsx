import React from "react";
import ModelCard from "../ModelCard/ModelCard";
import Button from "../Button";

interface WeaponCardProps {
  active: boolean;
  item: number;
  setActiveCard: (card: number) => void;
}
function WeaponCard({ active, item, setActiveCard }: WeaponCardProps) {
  return (
    <div
      className={`bg-slate-400 rounded-[20px] relative transition-all duration-300 ${
        active ? "flex-grow-[2.5]" : "flex-grow"
      }`}
      onClick={() => setActiveCard(item)}
    >
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
          Name
        </h3>
        <Button
          text="saznaj vise"
          className={`${active ? "block" : "hidden"}  self-end sm:self-auto`}
        />
      </div>
    </div>
  );
}

export default WeaponCard;
