import Image from "next/image";

import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link, usePathname } from "@/i18n/routing";

export interface NavbarItemProps {
  link?: string;
  text?: string;
  icon?: string;
  type?: "lang";
}

function NavbarItem({ link, text, icon }: NavbarItemProps) {
  if (link)
    return (
      <Link
        href={link}
        className=" text-red-600 sm:text-white font-medium sm:underline-effect border-t-[1px] border-red-600 pl-8 h-[70px] flex items-center sm:border-0 sm:pl-0 sm:h-auto sm:block"
      >
        {icon ? (
          <Image src={icon} alt="missing icon" width={94} height={91} />
        ) : (
          ""
        )}
        {text ? text : ""}
      </Link>
    );
  return <LanguageSwitcher />;
}

export default NavbarItem;
