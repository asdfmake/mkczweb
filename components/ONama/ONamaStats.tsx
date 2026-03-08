import React from "react";

const stats = [
  { value: "70+", label: "godina tradicije" },
  { value: "∞", label: "državnih šampionata" },
  { value: "100+", label: "reprezentativaca Srbije" },
  { value: "4", label: "generacije vrhunskih takmičara" },
];

function ONamaStats() {
  return (
    <section className="bg-[#D50000] py-16 md:py-20 px-6 md:px-16 xl:px-72">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-heading text-white text-[52px] md:text-[64px] font-semibold leading-none mb-2">
              {stat.value}
            </p>
            <p className="font-body text-white/80 text-[14px] md:text-[16px] uppercase tracking-wide">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ONamaStats;
