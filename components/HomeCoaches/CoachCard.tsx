import Image from "next/image";
import React from "react";

export interface CoachCardProps {
  picture: string;
  name: string;
  title: string;
  description: string;
  className?: string;
}

function CoachCard({ picture, name, title, description, className }: CoachCardProps) {
  return (
    <div
      className={`flex flex-col items-center bg-white border border-gray-100 shadow-sm overflow-hidden ${className}`}
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <Image
          src={picture}
          alt={`Fotografija trenera ${name}`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 700px) 80vw, (max-width: 900px) 40vw, 25vw"
        />
      </div>
      <div className="w-full px-5 py-5 bg-white border-t-4 border-red">
        <p className="font-heading text-[22px] font-bold text-red uppercase leading-tight tracking-wide">
          {name}
        </p>
        <p className="font-heading text-[13px] font-medium text-gray-500 uppercase tracking-widest mb-3">
          {title}
        </p>
        <p className="font-body text-[14px] text-gray-700 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default CoachCard;
