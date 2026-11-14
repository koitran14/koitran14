import { Flower2, Leaf, Moon, Snowflake, Sun } from "lucide-react";
import { calendarLines, daylight, seasonOf, SEASON_NAME, type Season } from "@/lib/farm/time";
import { Board, gameFont } from "./game-ui";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const SEASON_ICON: Record<Season, typeof Sun> = { xuan: Flower2, ha: Sun, thu: Leaf, dong: Snowflake };
const SEASON_TINT: Record<Season, string> = { xuan: "#F7A9C6", ha: "#F6C453", thu: "#EE8C4A", dong: "#9CC9EA" };
const pad = (n: number) => String(n).padStart(2, "0");

/** Farm-game calendar sign: weekday and date, the season badge, and a clock with sun or moon. */
export default function CalendarHud({ now }: { now: Date }) {
  const season = seasonOf(now);
  const SeasonIcon = SEASON_ICON[season];
  const night = daylight(now.getHours() + now.getMinutes() / 60).lampsOn;
  const TimeIcon = night ? Moon : Sun;
  return (
    <Board className={`${gameFont.className} absolute left-3 top-3 w-[148px] select-none overflow-hidden`}>
      <div role="status" aria-live="polite" className="sr-only">{calendarLines(now).join(", ")}</div>
      <div aria-hidden className="flex items-center justify-between px-3 pt-2">
        <div className="leading-none">
          <div className="text-[12px] font-bold uppercase tracking-wider opacity-70">{DAYS[now.getDay()]}</div>
          <div className="mt-0.5 flex items-baseline gap-1">
            <span className="text-[30px] font-bold leading-none">{now.getDate()}</span>
            <span className="text-[14px] font-bold">{MONTHS[now.getMonth()]}</span>
          </div>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: SEASON_TINT[season], border: "2px solid #8A5A3C" }}>
          <SeasonIcon className="h-5 w-5" strokeWidth={2.5} />
        </span>
      </div>
      <div aria-hidden className="mt-2 flex items-center justify-between px-3 py-1.5" style={{ background: "#F3E2BD", borderTop: "2px dashed #C9A27A" }}>
        <span className="flex items-center gap-1.5 text-[16px] font-bold tabular-nums">
          <TimeIcon className="h-4 w-4" strokeWidth={2.5} /> {pad(now.getHours())}:{pad(now.getMinutes())}
        </span>
        <span className="text-[13px] font-bold">{SEASON_NAME[season]}</span>
      </div>
    </Board>
  );
}
