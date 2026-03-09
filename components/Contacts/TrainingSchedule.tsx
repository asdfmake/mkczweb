import React from "react";

const days = ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub"];

const schedule = [
  {
    group: "Pioniri (8–12 god.)",
    slots: {
      Pon: "16:00–17:30",
      Uto: null,
      Sre: "16:00–17:30",
      Čet: null,
      Pet: "16:00–17:30",
      Sub: null,
    },
  },
  {
    group: "Kadeti (13–16 god.)",
    slots: {
      Pon: null,
      Uto: "17:30–19:00",
      Sre: null,
      Čet: "17:30–19:00",
      Pet: null,
      Sub: "10:00–12:00",
    },
  },
  {
    group: "Juniori & Seniori",
    slots: {
      Pon: "19:00–21:00",
      Uto: "19:00–21:00",
      Sre: "19:00–21:00",
      Čet: "19:00–21:00",
      Pet: "19:00–21:00",
      Sub: "12:00–14:00",
    },
  },
];

function TrainingSchedule() {
  return (
    <section className="mx-auto px-6 md:px-10 max-w-[1250px] mb-14">
      <p className="font-heading text-red text-[13px] uppercase tracking-widest mb-3">
        Raspored
      </p>
      <h2 className="font-heading text-[42px] md:text-[56px] uppercase text-foreground font-semibold mb-10 text-balance">
        Raspored treninga
      </h2>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto border border-border">
        <table className="w-full border-collapse font-body text-[14px]">
          <thead>
            <tr className="bg-red text-white">
              <th className="text-left px-6 py-4 font-heading text-[13px] uppercase tracking-widest font-semibold w-[220px]">
                Grupa
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="px-4 py-4 font-heading text-[13px] uppercase tracking-widest font-semibold text-center"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedule.map((row, i) => (
              <tr
                key={row.group}
                className={`border-b border-border ${
                  i % 2 === 0 ? "bg-background" : "bg-muted/40"
                }`}
              >
                <td className="px-6 py-4 font-semibold text-foreground">
                  {row.group}
                </td>
                {days.map((day) => {
                  const slot = row.slots[day as keyof typeof row.slots];
                  return (
                    <td key={day} className="px-4 py-4 text-center">
                      {slot ? (
                        <span className="inline-block bg-red/10 text-red font-semibold rounded px-2 py-1 text-[13px] whitespace-nowrap">
                          {slot}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-[18px]">
                          —
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-6">
        {schedule.map((row) => (
          <div key={row.group} className="border border-border">
            <div className="bg-red px-5 py-3">
              <h3 className="font-heading text-white text-[15px] uppercase tracking-widest font-semibold">
                {row.group}
              </h3>
            </div>
            <div className="divide-y divide-border">
              {days.map((day) => {
                const slot = row.slots[day as keyof typeof row.slots];
                return (
                  <div
                    key={day}
                    className="flex items-center justify-between px-5 py-3"
                  >
                    <span className="font-heading text-[13px] uppercase tracking-wider text-muted-foreground">
                      {day}
                    </span>
                    {slot ? (
                      <span className="bg-red/10 text-red font-semibold rounded px-2 py-1 text-[13px]">
                        {slot}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="font-body text-[13px] text-muted-foreground mt-4">
        * Raspored je podložan izmjenama. Kontaktirajte nas za najnovije
        informacije.
      </p>
    </section>
  );
}

export default TrainingSchedule;
