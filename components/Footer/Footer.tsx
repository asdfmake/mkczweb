import Image from "next/image";
import React from "react";
import NavbarItem from "../Navbar/NavbarItem";
import { NavLinksFooter } from "@/constants/Footer";
import { useTranslations } from "next-intl";
import Link from "next/link";

function Footer() {
  const t = useTranslations("Footer");
  return (
    <div className="bg-red w-full flex flex-col">
      <div className="w-full flex flex-col sm:flex  justify-between sm:items-center sm:flex-row sm:my-[25px] sm:px-[40px]">
        <Image alt="logo" src="/logowithtext.svg" width={160} height={115} />
        <div
          className=" flex flex-col w-full sm:w-auto text-white sm:text-sm  md:text-lg  lg:text-xl font-heading font-bold sm:flex-row sm:font-[500] sm:font-body sm:gap-[15px] md:gap-[40px] 
        "
        >
          {NavLinksFooter.map((link) => {
            return (
              <NavbarItem
                icon={link.icon}
                text={link.text ? t(link.text) : undefined}
                link={link.link}
                key={link.text}
              />
            );
          })}
        </div>
      </div>
      <div className="w-full px-[40px] flex gap-[25px] pb-[25px] justify-center">
        {" "}
        <Link href="http://facebook.com">
          <Image alt="facebook" src="/facebook.svg" width={24} height={24} />
        </Link>
        <Link href="http://youtube.com">
          <Image alt="youtube" src="/youtube.svg" width={24} height={24} />
        </Link>
        <Link href="http://instagram.com">
          <Image alt="instagram" src="/instagram.svg" width={24} height={24} />
        </Link>
      </div>
      <div className="bg-darkred w-full text-center text-red py-2 px-3 text-sm">
        {t("copyright")}
      </div>
    </div>
  );
}

export default Footer;
