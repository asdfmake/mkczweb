import React from "react";

const figures = [
  {
    name: "Vera Jeftimijades",
    role: "Legenda kluba",
    description:
      "Vera Jeftimijades stigla je iz ugašenog ОМК Jugoslavija i od 1960. predvodila ženska ekipu do dominacije u floretu na državnim prvenstava tokom čitave decenije.",
    highlight: true,
  },
];

function ONamaFigures() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-16 xl:px-72 bg-background">
      <p className="font-heading text-[#D50000] text-[13px] uppercase tracking-widest mb-3">
        Značajne ličnosti
      </p>
      <h2 className="font-heading text-[36px] md:text-[52px] uppercase font-semibold text-foreground mb-12 text-balance">
        Istaknute ličnosti
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {figures.map((figure) => (
          <div
            key={figure.name}
            className={`rounded-lg overflow-hidden border ${
              figure.highlight
                ? "border-[#D50000]/40 shadow-lg"
                : "border-border"
            }`}
          >
            {/* Photo placeholder */}
            <div className="h-56 bg-muted flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>

            <div className="p-6">
              {figure.highlight && (
                <span className="inline-block bg-[#D50000] text-white font-heading text-[11px] uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                  Legenda
                </span>
              )}
              <h3 className="font-heading text-[22px] uppercase font-semibold text-foreground mb-1">
                {figure.name}
              </h3>
              <p className="font-body text-[#D50000] text-[13px] uppercase tracking-wide mb-4">
                {figure.role}
              </p>
              <p className="font-body text-foreground/70 text-[15px] leading-relaxed">
                {figure.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ONamaFigures;
