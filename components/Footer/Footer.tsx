import Image from "next/image";
import React from "react";
import { NavLinksFooter } from "@/constants/Footer";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

/**
 * Renders the site's footer including logo, navigation links, social icons, and translated copyright text.
 *
 * @returns A JSX element representing the footer section.
 */
function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="bg-red w-full flex flex-col font-body">
      {/* Main footer row */}
      <div className="w-full px-8 md:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Image alt="logo" src="/logowithtext.svg" width={120} height={86} />

        {/* Navigation links — horizontal */}
        <nav className="flex flex-row flex-wrap justify-center gap-x-6 gap-y-1">
          {NavLinksFooter.map((link) => (
            <Link
              href={link.link ?? "/"}
              key={link.text}
              className="text-white/80 hover:text-white text-sm font-body transition-colors"
            >
              {link.text ? t(link.text) : ""}
            </Link>
          ))}
        </nav>

        {/* Social icons */}
        <div className="flex gap-3">
          <Link
            href="https://www.facebook.com/macevanjebg/"
            className="bg-white/10 hover:bg-white/20 transition-colors rounded-full p-2"
            aria-label="Facebook"
          >
            <Image alt="facebook" src="/facebook.svg" width={16} height={16} />
          </Link>
          <Link
            href="https://www.instagram.com/mkcrvenazvezda/"
            className="bg-white/10 hover:bg-white/20 transition-colors rounded-full p-2"
            aria-label="Instagram"
          >
            <Image alt="instagram" src="/instagram.svg" width={16} height={16} />
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-darkred w-full">
        <div className="w-full px-8 md:px-16 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-1">
          <p className="text-white/60 text-xs text-center sm:text-left">
            {t("copyright")}
          </p>
          <p className="text-white/60 text-xs text-center sm:text-right">
            Built by{" "}
            <a
              href="https://ajvn.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 underline underline-offset-2 transition-colors"
            >
              Ivan Makević
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
