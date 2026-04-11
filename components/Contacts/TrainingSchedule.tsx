"use client";

import React from "react";
import { useTranslations } from "next-intl";

const dayKeys = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

// Location types
type Location = "red_star_building" | "belgrade_fair";

interface TimeSlot {
  time: string;
  location: Location;
}

interface ScheduleRow {
  groupKey: string;
  slots: Record<string, TimeSlot | TimeSlot[] | null>;
}

const scheduleKeys: ScheduleRow[] = [
  {
    groupKey: "pioneers",
    slots: {
      monday: [
        { time: "19:30–21:00", location: "red_star_building" },
        { time: "18:00–19:30", location: "belgrade_fair" },
      ],
      tuesday: null,
      wednesday: [
        { time: "19:30–21:00", location: "red_star_building" },
        { time: "18:00–19:30", location: "belgrade_fair" },
      ],
      thursday: null,
      friday: [
        { time: "19:30–21:00", location: "red_star_building" },
        { time: "18:00–19:30", location: "belgrade_fair" },
      ],
      saturday: null,
    },
  },
  {
    groupKey: "foil",
    slots: {
      monday: [{ time: "19:30–22:00", location: "belgrade_fair" }],
      tuesday: [{ time: "19:30–22:00", location: "belgrade_fair" }],
      wednesday: [{ time: "19:30–22:00", location: "belgrade_fair" }],
      thursday: [{ time: "19:30–22:00", location: "belgrade_fair" }],
      friday: [{ time: "19:30–22:00", location: "belgrade_fair" }],
      saturday: null,
    },
  },
  {
    groupKey: "saber",
    slots: {
      monday: [{ time: "20:30–22:30", location: "red_star_building" }],
      tuesday: null,
      wednesday: [{ time: "20:30–22:30", location: "red_star_building" }],
      thursday: null,
      friday: [{ time: "20:30–22:30", location: "red_star_building" }],
      saturday: [{ time: "10:00–12:00", location: "red_star_building" }],
    },
  },
  {
    groupKey: "epee_juniors_seniors",
    slots: {
      monday: [{ time: "20:00–22:00", location: "belgrade_fair" }],
      tuesday: [{ time: "20:00–22:00", location: "belgrade_fair" }],
      wednesday: [{ time: "20:00–22:00", location: "belgrade_fair" }],
      thursday: [{ time: "20:00–22:00", location: "belgrade_fair" }],
      friday: [{ time: "20:00–22:00", location: "belgrade_fair" }],
      saturday: [{ time: "10:00–12:00", location: "belgrade_fair" }],
    },
  },
  {
    groupKey: "epee_cadets",
    slots: {
      monday: null,
      tuesday: [{ time: "20:00–22:00", location: "red_star_building" }],
      wednesday: [{ time: "20:00–22:00", location: "red_star_building" }],
      thursday: null,
      friday: null,
      saturday: [{ time: "10:00–12:00", location: "red_star_building" }],
    },
  },
  {
    groupKey: "epee_recreational",
    slots: {
      monday: null,
      tuesday: [{ time: "18:00–20:00", location: "red_star_building" }],
      wednesday: null,
      thursday: [{ time: "18:00–20:00", location: "red_star_building" }],
      friday: null,
      saturday: [{ time: "10:00–12:00", location: "red_star_building" }],
    },
  },
];

function TrainingSchedule() {
  const t = useTranslations("Kontakt");

  const getSlotColor = (location: Location) => {
    return location === "red_star_building" 
      ? "bg-blue-100 text-blue-900" 
      : "bg-green-100 text-green-900";
  };

  return (
    <section className="mx-auto px-6 md:px-10 max-w-[1250px] mb-14" id="schedule">
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
              <th className="text-left px-6 py-4 font-heading text-[13px] uppercase tracking-widest font-semibold w-[280px]">
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
                <td className="px-6 py-4 font-semibold text-foreground text-[13px]">
                  {t(row.groupKey)}
                </td>
                {dayKeys.map((dayKey) => {
                  const slot = row.slots[dayKey];
                  return (
                    <td key={dayKey} className="px-4 py-4 text-center">
                      {slot ? (
                        <div className="flex flex-col gap-2 items-center">
                          {Array.isArray(slot) ? (
                            slot.map((s, idx) => (
                              <span
                                key={idx}
                                className={`inline-block font-semibold rounded px-2 py-1 text-[13px] whitespace-nowrap ${getSlotColor(s.location)}`}
                              >
                                {s.time}
                              </span>
                            ))
                          ) : (
                            <span className={`inline-block font-semibold rounded px-2 py-1 text-[13px] whitespace-nowrap ${getSlotColor(slot.location)}`}>
                              {slot.time}
                            </span>
                          )}
                        </div>
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
            <tr className="border-t-2 border-border bg-muted/20">
              <td colSpan={7} className="px-6 py-4 font-body text-[13px] text-foreground">
                Индивидуални тренинзи сваки дан пре подне по договору са тренером
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-6">
        {scheduleKeys.map((row) => (
          <div key={row.groupKey} className="border border-border">
            <div className="bg-red px-5 py-3">
              <h3 className="font-heading text-white text-[13px] uppercase tracking-widest font-semibold">
                {t(row.groupKey)}
              </h3>
            </div>
            <div className="divide-y divide-border">
              {dayKeys.map((dayKey) => {
                const slot = row.slots[dayKey];
                return (
                  <div
                    key={dayKey}
                    className="flex items-center justify-between px-5 py-3"
                  >
                    <span className="font-heading text-[13px] uppercase tracking-wider text-muted-foreground">
                      {t(dayKey)}
                    </span>
                    {slot ? (
                      <div className="flex flex-col gap-2">
                        {Array.isArray(slot) ? (
                          slot.map((s, idx) => (
                            <span
                              key={idx}
                              className={`font-semibold rounded px-2 py-1 text-[13px] ${getSlotColor(s.location)}`}
                            >
                              {s.time}
                            </span>
                          ))
                        ) : (
                          <span className={`font-semibold rounded px-2 py-1 text-[13px] ${getSlotColor(slot.location)}`}>
                            {slot.time}
                          </span>
                        )}
                      </div>
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

      {/* Legend */}
      <div className="mt-8 flex flex-col md:flex-row gap-6 md:gap-12 pt-6 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blue-100 border border-blue-300 rounded"></div>
          <span className="font-body text-[13px] text-foreground">
            у згради СД Црвена звезда (Red Star Building)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-green-100 border border-green-300 rounded"></div>
          <span className="font-body text-[13px] text-foreground">
            на београдском сајму (Belgrade Fair)
          </span>
        </div>
      </div>

      <p className="font-body text-[13px] text-muted-foreground mt-6">
        {t("schedule_note")}
      </p>
    </section>
  );
}

export default TrainingSchedule;
