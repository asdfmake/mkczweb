"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";

export default function NavbarLogo() {
  const pathname = usePathname();
  
  // Check if we're on the root page (just locale, no other path)
  const isRootPage = /^\/(en|sr)\/?$/.test(pathname);
  
  return (
    <Link href={"/"}>
      <Image 
        alt="Red Star Fencing Club logo" 
        src={isRootPage ? "/logoRed.svg" : "/logo.svg"} 
        width={94} 
        height={94} 
      />
    </Link>
  );
}
