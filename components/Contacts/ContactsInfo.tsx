import { useTranslations } from "next-intl";
import React from "react";

function ContactsInfo() {
  const t = useTranslations("Kontakt");
  return (
    <div className=" mx-auto px-10 max-w-[1250px] mb-10">
      <h2 className="font-heading text-[48px] uppercase text-red font-[500] mb-[24px]">
        {t("contact")}
      </h2>
      <div className="flex flex-col w-full justify-between font-body text-red">
        <div className="flex flex-col border-b-[1px] border-red mb-3">
          <h3 className="text-[24px] font-bold mb-4">sekreterijat</h3>
          <h5 className="mb-1">Telefon</h5>
          <p className="text-black mb-3">069 6906969</p>
          <h5 className="mb-1">Faks</h5>
          <p className="text-black mb-3">069 6906969</p>
          <h5 className="mb-1">Imejl</h5>
          <p className="text-black mb-3">ovojeimajl@gmail.com</p>
        </div>
        <div className="flex flex-col border-b-[1px] border-red mb-3">
          <h3 className="text-[24px] font-bold mb-4">marketing</h3>
          <h5 className="mb-1">Telefon</h5>
          <p className="text-black mb-3">069 6906969</p>
          <h5 className="mb-1">Faks</h5>
          <p className="text-black mb-3">069 6906969</p>
        </div>
        <div className="flex flex-col border-b-[1px] border-red mb-3">
          <h3 className="text-[24px] font-bold mb-4">clanstvo</h3>
          <h5 className="mb-1">Telefon</h5>
          <p className="text-black mb-3">069 6906969</p>
          <h5 className="mb-1">Faks</h5>
          <p className="text-black mb-3">069 6906969</p>
          <h5 className="mb-1">Imejl</h5>
          <p className="text-black mb-3">ovojeimajl@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default ContactsInfo;
