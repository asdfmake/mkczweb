"use client";

import React from "react";
import { useTranslations } from "next-intl";

const dayKeys = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const scheduleKeys = [
  {
    groupKey: "pioneers",
    slots: {
      monday: "16:00–17:30",
      tuesday: null,
      wednesday: "16:00–17:30",
      thursday: null,
      friday: "16:00–17:30",
      saturday: null,
    },
  },
  {
    groupKey: "cadets",
    slots: {
      monday: null,
      tuesday: "17:30–19:00",
      wednesday: null,
      thursday: "17:30–19:00",
      friday: null,
      saturday: "10:00–12:00",
    },
  },
  {
    groupKey: "juniors_seniors",
    slots: {
      monday: "19:00–21:00",
      tuesday: "19:00–21:00",
      wednesday: "19:00–21:00",
      thursday: "19:00–21:00",
      friday: "19:00–21:00",
      saturday: "12:00–14:00",
    },
  },
];

function TrainingSchedule() {
  const t = useTranslations("Kontakt");
  return (
    <section className="mx-auto px-6 md:px-10 max-w-[1250px] mb-14">
      <p className="font-heading text-red text-[13px] uppercase tracking-widest mb-3">
        {t("schedule_title")}
      </p>
      <h2 className="font-heading text-[42px] md:text-[56px] uppercase text-foreground font-semibold mb-10 text-balance">
        {t("schedule_head")}
      </h2>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto border border-border">
        <table className="w-full border-collapse font-body text-[14px]">
          <thead>
            <tr className="bg-red text-white">
              <th className="text-left px-6 py-4 font-heading text-[13px] uppercase tracking-widest font-semibold w-[220px]">
                {t("group")}
              </th>
              {dayKeys.map((dayKey) => (
                <th
                  key={dayKey}
                  className="px-4 py-4 font-heading text-[13px] uppercase tracking-widest font-semibold text-center"
                >
                  {t(dayKey)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scheduleKeys.map((row, i) => (
              <tr
                key={row.groupKey}
                className={`border-b border-border ${
                  i % 2 === 0 ? "bg-background" : "bg-muted/40"
                }`}
              >
                <td className="px-6 py-4 font-semibold text-foreground">
                  {t(row.groupKey)}
                </td>
                {dayKeys.map((dayKey) => {
                  const slot = row.slots[dayKey as keyof typeof row.slots];
                  return (
                    <td key={dayKey} className="px-4 py-4 text-center">
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
        {scheduleKeys.map((row) => (
          <div key={row.groupKey} className="border border-border">
            <div className="bg-red px-5 py-3">
              <h3 className="font-heading text-white text-[15px] uppercase tracking-widest font-semibold">
                {t(row.groupKey)}
              </h3>
            </div>
            <div className="divide-y divide-border">
              {dayKeys.map((dayKey) => {
                const slot = row.slots[dayKey as keyof typeof row.slots];
                return (
                  <div
                    key={dayKey}
                    className="flex items-center justify-between px-5 py-3"
                  >
                    <span className="font-heading text-[13px] uppercase tracking-wider text-muted-foreground">
                      {t(dayKey)}
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
        {t("schedule_note")}
      </p>
    </section>
  );
}

export default TrainingSchedule;
