import Image from "next/image";
import React from "react";

export interface CoachCardProps {
  text: string;
  picture: string;
  name: string;
  title: string;
  inverted?: boolean;
  className?: string;
}
function CoachCard({
  text,
  picture,
  name,
  title,
  inverted,
  className,
}: CoachCardProps) {
  return (
    <div
      className={`sm:basis-1/3 md:basis-1/4 flex flex-col items-center sm:block max-w-[480px]  ${className}`}
    >
      <div className={`${!inverted ? "bg-red" : "bg-white"} text-right`}>
        <p
          className={`font-heading text-[46px] font-medium ${
            !inverted ? "text-white" : "text-red"
          } [word-spacing:100vw] leading-[50px]`}
        >
          {name}
        </p>
        <p
          className={`${
            !inverted ? "text-white" : "text-red"
          } font-body text-[20px] font-normal pb-[20px]`}
        >
          {title}
        </p>
      </div>
      <Image src={picture} alt="coach photo" width={480} height={590} />
    </div>
  );
}

export default CoachCard;
