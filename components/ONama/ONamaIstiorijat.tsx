import React from "react";

const timelineItems = [
  {
    year: "1946",
    text: "Мачевалачка секција Црвене звезде је званично заживела 12. новембра 1946. године, а секција је две године касније прерасла у клуб. Звездини мачеваоци су одмах заслужили наступе за репрезентацију и ревносно пропагирали овај витешки спорт.",
  },
  {
    year: "1960–1970",
    text: "Доласком Вере Јефтимијадес из угашеног ОМК Југославија, од 1960. па наредну деценију женска екипа има примат у флорету на државним првенствима, док је мушка екипа од 1970. године суверен власник титула у дисциплини сабља.",
  },
  {
    year: "1990",
    text: "Клуб је потом бележио и одличне и осредње резултате, а деведесетих се поново успоставља црвено-бела доминација мушкараца у сабљи и мачу, те црвено-белих дама у флорету.",
  },
];

function ONamaIstiorijat() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-16 xl:px-72 bg-background">
      <div className="max-w-3xl">
        <p className="font-heading text-[#D50000] text-[13px] uppercase tracking-widest mb-3">
          Istorijat
        </p>
        <h2 className="font-heading text-[36px] md:text-[52px] uppercase font-semibold text-foreground mb-12 text-balance">
          Istorijat
        </h2>

        {/* Timeline */}
        <div className="relative border-l-2 border-[#D50000]/30 pl-8 flex flex-col gap-12">
          {timelineItems.map((item) => (
            <div key={item.year} className="relative">
              {/* Dot */}
              <span className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[#D50000] border-4 border-background" />
              <span className="font-heading text-[#D50000] text-[13px] uppercase tracking-widest mb-2 block">
                {item.year}
              </span>
              <p className="font-body text-foreground text-[16px] leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ONamaIstiorijat;
