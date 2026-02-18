import React from "react";
import NavbarItem from "./NavbarItem";
import { NavLinksLeft, NavLinksRight } from "@/constants/Navbar";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import NavbarMobile from "./NavbarMobile";
import { useTranslations } from "next-intl";

function Navbar() {
  const t = useTranslations("Navbar");
  return (
    <>
      <nav className="h-[139px] hidden absolute top-0 left-0 right-0 sm:grid px-[33px] sm:px-0 grid-cols-[76px_1fr_76px] sm:grid-cols-[1fr_64px_1fr] md:grid-cols-[1fr_94px_1fr] items-center lg:gap-[50px] md:gap-[3-px] z-50 font-body lg:text-[20px] md:text-[16px] sm:text-[14px]">
        <div className="hidden sm:flex gap-[40px] justify-end">
          {NavLinksLeft.map((link) => {
            return (
              <NavbarItem
                icon={link.icon}
                text={!!link.text ? t(link.text) : ""}
                link={link.link}
                key={link.text}
              />
            );
          })}
        </div>
        <Link href={"/"}>
          <Image alt="logo" src="/logo.svg" width={94} height={94} />
        </Link>
        <div className="sm:hidden"></div>
        <div className="sm:hidden flex justify-end items-center">
          <Image alt="logo" src="/bars.svg" width={45} height={45} />
        </div>
        <div className="hidden sm:flex gap-[40px]">
          {NavLinksRight.map((link) => {
            return (
              <NavbarItem
                icon={link.icon}
                text={!!link.text ? t(link.text) : ""}
                link={link.link}
                key={link.text}
              />
            );
          })}
        </div>
      </nav>
      <NavbarMobile />
    </>
  );
}

export default Navbar;
