import { Link } from "@/i18n/routing";
import Image from "next/image";
import React from "react";

interface NewsCardProps {
  title: string;
  bodyEng?: string;
  bodySr: string;
  date: string;
  img: string;
  className?: string;
  id: number;
}

/**
 * Render a news item card with image, date, title, and truncated body text.
 *
 * @param className - Optional additional CSS classes applied to the card container
 * @param date - Display date string for the news item
 * @param title - Headline text for the news item
 * @param img - Filename of the image (used as `/uploads/${img}` source)
 * @param bodySr - Body/summary text in Serbian shown with a 3-line clamp
 * @param id - Numeric identifier used to build the news item links (`/vesti/${id}`)
 * @returns A JSX element representing the news card, including linked image and title, date, and truncated body
 */
function NewsCard({ className, date, title, img, bodySr, id }: NewsCardProps) {
  return (
    <div
      className={`rounded-[20px] p-[8px] bg-white dark:bg-card w-[336px] border border-[#CDCDCD] dark:border-border ${className}`}
    >
      <Link href={`/vesti/${id}`} prefetch={true}>
        <div className="h-[300px] w-full overflow-hidden rounded-[12px]">
          <Image
            src={`/uploads/${img}`}
            alt="newsIMG"
            width={480} // Original width (can be adjusted)
            height={300} // Original height (can be adjusted)
            unoptimized
            className="w-full h-full object-cover" // Ensures the image covers the container
          />
        </div>
      </Link>
      <div className="text-[16px] font-body px-[16px] pt-[16px] text-foreground">{date}</div>
      <Link href={`/vesti/${id}`} prefetch={true}>
        <div className="text-[20px] font-bold text-red font-body px-[16px]">
          {title}
        </div>
      </Link>
      <div className="text-[14px] font-body px-[16px] pt-[16px] mb-[16px] line-clamp-3 overflow-hidden text-ellipsis text-foreground/80">
        {bodySr}
      </div>
    </div>
  );
}

export default NewsCard;
