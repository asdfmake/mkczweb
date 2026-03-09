import React from "react";

const values = [
  {
    title: "Disciplina",
    description:
      "Mačevanje zahteva koncentraciju, kontrolu i posvećenost. U Crvenoj zvezdi razvijamo disciplinu koja se prenosi i van sporta.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
    ),
  },
  {
    title: "Sportski duh",
    description:
      "Poštovanje protivnika, fer-plej i čast deo su tradicije mačevanja koju negujemo kroz sve generacije.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    title: "Posvećenost",
    description:
      "Kontinuiran rad i trud ključ su napretka svakog takmičara. Naši treninzi grade upornost i mentalnu snagu.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Tradicija šampiona",
    description:
      "Više od sedam decenija klub razvija vrhunske mačevaoce i nastavlja bogatu sportsku istoriju Crvene zvezde.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="8 6 2 12 8 18" />
        <polyline points="16 6 22 12 16 18" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    ),
  },
];

function ONamaFigures() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-16 xl:px-72 bg-background">
      <p className="font-heading text-[#D50000] text-[13px] uppercase tracking-widest mb-3">
        Ko smo mi
      </p>
      <h2 className="font-heading text-[36px] md:text-[52px] uppercase font-semibold text-foreground mb-4 text-balance">
        Tradicija i vrednosti
      </h2>
      <p className="font-body text-foreground/60 text-[16px] md:text-[18px] leading-relaxed mb-14 max-w-2xl">
        Vrednosti koje oblikuju generacije mačevalaca Crvene zvezde.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((val) => (
          <div
            key={val.title}
            className="group border border-border rounded-lg p-8 flex flex-col gap-5 transition-all duration-300 hover:border-[#D50000]/50 hover:shadow-lg hover:-translate-y-1 bg-background"
          >
            <span className="text-[#D50000] transition-transform duration-300 group-hover:scale-110 w-fit">
              {val.icon}
            </span>
            <h3 className="font-heading text-[20px] uppercase font-semibold text-foreground">
              {val.title}
            </h3>
            <p className="font-body text-foreground/65 text-[15px] leading-relaxed">
              {val.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ONamaFigures;
