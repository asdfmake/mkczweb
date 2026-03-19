import React from "react";
import Map from "./Map/Map";

function MapSection() {
  return (
    <section className="mx-auto px-6 md:px-10 max-w-[1250px] mb-14">
      <p className="font-heading text-red text-[13px] uppercase tracking-widest mb-3">
        Lokacija
      </p>
      <h2 className="font-heading text-[42px] md:text-[56px] uppercase text-foreground font-semibold mb-6 text-balance">
        Beograd
      </h2>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Address block */}
        <div className="flex items-start gap-3">
          <span className="mt-[3px] flex-shrink-0">
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
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </span>
          <div>
            <p className="font-body text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
              Adresa
            </p>
            <p className="font-body text-foreground text-[15px] font-semibold">
              Stadion Rajko Mitić (Marakana)
            </p>
            <p className="font-body text-muted-foreground text-[14px]">
              Ljutice Bogdana 1a, Beograd 11000
            </p>
            <p className="font-body text-muted-foreground text-[13px] mt-2 max-w-sm">
              Treninzi mačevanja održavaju se u tunelu ispod stadiona Marakana,
              gde je smeštena i streljana.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden border border-border">
        <Map />
      </div>
    </section>
  );
}

export default MapSection;
