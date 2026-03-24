"use client";

import React from "react";
import { useTranslations } from "next-intl";

const contactKeys = [
  {
    sectionKey: "sekretarijat",
    phone: "+381 69 690-6969",
    email: "sekretarijat@mkcrvenazvezda.rs",
  },
  {
    sectionKey: "marketing",
    phone: "+381 69 690-6970",
    email: "marketing@mkcrvenazvezda.rs",
  },
  {
    sectionKey: "clanstvo",
    phone: "+381 69 690-6971",
    email: "clanstvo@mkcrvenazvezda.rs",
  },
];

function ContactsInfo() {
  const t = useTranslations("Kontakt");
  return (
    <div className="mx-auto px-6 md:px-10 max-w-[1250px] mb-14">
      <p className="font-heading text-red text-[13px] uppercase tracking-widest mb-3">
        {t("section_title")}
      </p>
      <h2 className="font-heading text-[42px] md:text-[56px] uppercase text-foreground font-semibold mb-10 text-balance">
        {t("head_contact")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
        {contactKeys.map((c, i) => (
          <div
            key={c.sectionKey}
            className={`p-8 flex flex-col gap-6 ${
              i < contactKeys.length - 1
                ? "border-b md:border-b-0 md:border-r border-border"
                : ""
            }`}
          >
            <h3 className="font-heading text-[18px] uppercase font-semibold text-red tracking-widest">
              {t(c.sectionKey)}
            </h3>

            <div className="flex flex-col gap-5">
              {/* Phone */}
              <div className="flex items-start gap-3">
                <span className="mt-[2px] flex-shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.53 2 2 0 0 1 3.59 1.37h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.06 6.06l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div>
                  <p className="font-body text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                    {t("phone")}
                  </p>
                  <a
                    href={`tel:${c.phone.replace(/[\s-]/g, "")}`}
                    className="font-body text-foreground text-[15px] hover:text-red transition-colors"
                  >
                    {c.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <span className="mt-[2px] flex-shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <div>
                  <p className="font-body text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                    {t("email")}
                  </p>
                  <a
                    href={`mailto:${c.email}`}
                    className="font-body text-foreground text-[15px] hover:text-red transition-colors break-all"
                  >
                    {c.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactsInfo;
