"use client"

import { useMemo } from "react"
import {
  getWeekDays, getHours, format,
  dayIndexInWeek, minutesFromStartOfDay
} from "@/lib/dates"

type EventDTO = { id: string; title: string; start: string | Date; end: string | Date; allDay: boolean }

const HOUR_PX = 64;                   // must match the height of each hour row (h-16 = 64px)
const PX_PER_MIN = HOUR_PX / 60;

export default function WeekView({ events, weekStart }: { events: EventDTO[]; weekStart: Date }) {
  const days = useMemo(() => getWeekDays(weekStart), [weekStart])
  const hours = useMemo(() => getHours(), [])

  // group by day index (0..6)
  const grouped = useMemo(() => {
    const buckets = Array.from({ length: 7 }, () => [] as EventDTO[])
    for (const e of events) {
      const idx = dayIndexInWeek(new Date(e.start), weekStart)
      if (idx >= 0 && idx < 7) buckets[idx].push(e)
    }
    return buckets
  }, [events, weekStart])

  return (
    <div className="border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-8 bg-muted text-muted-foreground text-sm">
        <div className="px-3 py-2" />
        {days.map((d, i) => (
          <div key={i} className="px-3 py-2 text-center">
            <div className="font-medium">{format(d, "EEE")}</div>
            <div>{format(d, "MMM d")}</div>
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="grid grid-cols-8 relative">
        {/* Hour labels */}
        <div className="border-r bg-background">
          {hours.map((h, i) => (
            <div key={i} className="h-16 border-b px-2 text-xs text-muted-foreground">
              {format(h, "ha")}
            </div>
          ))}
        </div>

        {/* Day columns */}
        {days.map((_, dayIdx) => (
          <div key={dayIdx} className="border-r relative">
            {/* grid lines */}
            {hours.map((_, row) => <div key={row} className="h-16 border-b" />)}

            {/* events absolutely positioned */}
            <div className="absolute inset-0">
              {grouped[dayIdx].map((ev) => {
                const start = new Date(ev.start)
                const end = new Date(ev.end)
                const top = minutesFromStartOfDay(start) * PX_PER_MIN
                const durMin = Math.max(15, (end.getTime() - start.getTime()) / 60000) // min 15 min block
                const height = durMin * PX_PER_MIN

                return (
                  <div
                    key={ev.id}
                    className="absolute left-1 right-1 rounded-md bg-primary/15 border border-primary/30 px-2 py-1 text-xs overflow-hidden"
                    style={{ top, height }}
                    title={`${format(start, "p")} – ${format(end, "p")}`}
                  >
                    <div className="font-medium truncate">{ev.title}</div>
                    <div className="opacity-70">{format(start, "p")} – {format(end, "p")}</div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
