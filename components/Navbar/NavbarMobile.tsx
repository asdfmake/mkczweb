import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import Image from "next/image";
import NavbarItem from "./NavbarItem";
import { NavLinksLeft, NavLinksRight } from "@/constants/Navbar";
import { useTranslations } from "next-intl";

function NavbarMobile() {
  const t = useTranslations("Navbar");
  return (
    <nav className="sm:hidden">
      <Drawer direction="top">
        <DrawerTrigger className="flex justify-between absolute t-0 z-10 w-full items-center pr-4">
          <Image alt="logo" src="/logo.svg" width={94} height={94} />
          <Image alt="logo" src="/bars.svg" width={45} height={45} />
        </DrawerTrigger>
        <DrawerTitle></DrawerTitle>
        <DrawerContent className="flex flex-col pb-3 z-10">
          <div className="h-full">
            <div className="flex justify-between w-full items-center px-3">
              <Image alt="logo" src="/logoRed.svg" width={94} height={94} />
              <DrawerClose>
                <Image alt="logo" src="/cross.svg" width={30} height={30} />
              </DrawerClose>
            </div>
            <div className="h-full flex flex-col  mt-16 text-xl font-heading font-bold text-red">
              {NavLinksLeft.concat(NavLinksRight).map((link) => {
                return (
                  <NavbarItem
                    icon={link.icon}
                    text={link.text ? t(link.text) : ""}
                    link={link.link}
                    key={link.text}
                  />
                );
              })}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </nav>
  );
}

export default NavbarMobile;
