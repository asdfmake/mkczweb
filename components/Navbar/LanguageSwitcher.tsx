"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import React, { useTransition } from "react";

function LanguageSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onLocaleChange(locale: string) {
    startTransition(() => {
      router.replace({ pathname }, { locale: locale });
    });
  }

  return (
    <div className=" border-t-[1px] border-red-600 pl-8 h-[70px] flex items-center text-red-600 sm:border-0 sm:pl-0 sm:h-auto sm:block sm:text-white font-medium cursor-default">
      <span
        onClick={() => {
          onLocaleChange("sr");
        }}
        className={`cursor-pointer underline-effect ${
          params.locale === "sr" ? "font-bold" : ""
        }`}
      >
        SR
      </span>{" "}
      /{" "}
      <span
        onClick={() => {
          onLocaleChange("en");
        }}
        className={`cursor-pointer underline-effect ${
          params.locale === "en" ? "font-bold" : ""
        }`}
      >
        EN
      </span>{" "}
      /{" "}
      <span
        onClick={() => {
          onLocaleChange("ru");
        }}
        className={`cursor-pointer underline-effect ${
          params.locale === "ru" ? "font-bold" : ""
        }`}
      >
        RU
      </span>
    </div>
  );
}

export default LanguageSwitcher;
