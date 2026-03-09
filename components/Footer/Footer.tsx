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
      {/* Main footer content */}
      <div className="w-full px-8 md:px-16 pt-12 pb-8">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Logo & tagline */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Image
              alt="logo"
              src="/logowithtext.svg"
              width={140}
              height={100}
            />
            <p className="text-white/70 text-sm leading-relaxed">
              Official portal of Red Star Fencing Club
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-2">
              <Link
                href="http://facebook.com"
                className="bg-white/10 hover:bg-white/20 transition-colors rounded-full p-2"
                aria-label="Facebook"
              >
                <Image
                  alt="facebook"
                  src="/facebook.svg"
                  width={18}
                  height={18}
                />
              </Link>
              <Link
                href="http://youtube.com"
                className="bg-white/10 hover:bg-white/20 transition-colors rounded-full p-2"
                aria-label="YouTube"
              >
                <Image
                  alt="youtube"
                  src="/youtube.svg"
                  width={18}
                  height={18}
                />
              </Link>
              <Link
                href="http://instagram.com"
                className="bg-white/10 hover:bg-white/20 transition-colors rounded-full p-2"
                aria-label="Instagram"
              >
                <Image
                  alt="instagram"
                  src="/instagram.svg"
                  width={18}
                  height={18}
                />
              </Link>
            </div>
          </div>

          {/* Navigation links */}
          <div className="flex flex-col gap-2">
            <p className="text-white/50 text-xs font-heading tracking-widest uppercase mb-2">
              Navigation
            </p>
            {NavLinksFooter.map((link) => (
              <Link
                href={link.link ?? "/"}
                key={link.text}
                className="text-white/80 hover:text-white text-sm transition-colors py-1 border-b border-white/10 hover:border-white/30"
              >
                {link.text ? t(link.text) : ""}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-darkred w-full mt-2">
        <div className="w-full px-8 md:px-16 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
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
