import { calendarLines } from "@/lib/farm/time";

/** Small farm-game clock in the corner: date, then season and time. */
export default function CalendarHud({ now }: { now: Date }) {
  const [date, seasonTime] = calendarLines(now);
  return (
    <div aria-live="polite" className="absolute top-3 left-3 rounded-xl bg-white/90 px-3 py-2 text-sm leading-tight text-zinc-800 shadow-sm">
      <div className="font-medium">{date}</div>
      <div className="text-zinc-600">{seasonTime}</div>
    </div>
  );
}
