import React from "react";
import { Link } from "@/i18n/routing";
import Button from "@/components/Button";

function ONamaHero() {
  return (
    <div className="relative overflow-hidden h-[620px] md:h-[720px] flex items-end">
      {/* Hero image */}
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mk-crvena-zvezda-KW52pGDumTDpu9yQUpZcx1G0rjQwz3.jpg"
        alt="Mačevalački klub Crvena Zvezda - ekipna fotografija"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-16 xl:px-72 pb-14 md:pb-20">
        <p className="font-heading text-[#D50000] text-[14px] md:text-[16px] uppercase tracking-widest mb-3">
          Beograd · Od 1946. godine
        </p>
        <h1 className="font-heading text-white text-[40px] md:text-[64px] uppercase font-semibold leading-tight text-balance mb-4">
          Mačevalački klub
          <br />
          Crvena zvezda
        </h1>
        <p className="font-body text-white/80 text-[16px] md:text-[20px] mb-8">
          Tradicija šampiona od 1946. godine
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/kontakt">
            <Button text="Postani član" className="bg-[#D50000] hover:bg-[#AF0000]" />
          </Link>
          <Link href="/vesti">
            <Button
              text="Pogledaj treninge"
              className="bg-transparent border-2 border-white hover:bg-white/10"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ONamaHero;
