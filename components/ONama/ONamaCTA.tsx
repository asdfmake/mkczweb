import React from "react";
import { Link } from "@/i18n/routing";
import Button from "@/components/Button";

function ONamaCTA() {
  return (
    <section className="bg-[#D50000] py-20 md:py-28 px-6 md:px-16 xl:px-72 text-center">
      <h2 className="font-heading text-white text-[36px] md:text-[52px] uppercase font-semibold text-balance mb-6">
        Postani deo tradicije
      </h2>
      <p className="font-body text-white/80 text-[16px] md:text-[20px] max-w-2xl mx-auto mb-10 leading-relaxed">
        Kroz više od sedam decenija Crvena zvezda je dom vrhunskih mačevalaca i
        novih generacija sportista.
      </p>
      <Link href="/kontakt">
        <Button
          text="Pridruži se klubu"
          className="bg-white !text-black hover:bg-white/90"
        />
      </Link>
    </section>
  );
}

export default ONamaCTA;
