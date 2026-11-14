import { Flower2, Leaf, Snowflake, Sun } from "lucide-react";
import { FLOCK } from "@/lib/farm/chickens";
import { calendarLines, dayProgress, daylight, nextSeason, seasonOf, SEASON_NAME, type Season } from "@/lib/farm/time";
import { Tile } from "./ui";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const SEASON: Record<Season, { icon: typeof Sun; bg: string; fg: string }> = {
  xuan: { icon: Flower2, bg: "#FFE3EE", fg: "#C2457A" },
  ha: { icon: Sun, bg: "#FFF1C9", fg: "#B7791F" },
  thu: { icon: Leaf, bg: "#FFE6D2", fg: "#C0571B" },
  dong: { icon: Snowflake, bg: "#DFF0FF", fg: "#2F6FB0" },
};
const pad = (n: number) => String(n).padStart(2, "0");

/** Sun arc: a half circle with the sun placed at the day's progress. */
function SunArc({ progress, night }: { progress: number; night: boolean }) {
  const a = Math.PI * (1 - progress);
  const x = 28 + 25 * Math.cos(a), y = 28 - 25 * Math.sin(a);
  return (
    <svg viewBox="0 0 56 31" width="56" height="31" aria-hidden>
      <path d="M3 28 A25 25 0 0 1 53 28" fill="none" stroke="#E6E9F0" strokeWidth="3" strokeLinecap="round" />
      {!night && progress > 0 && <path d={`M3 28 A25 25 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)}`} fill="none" stroke="#F6B23E" strokeWidth="3" strokeLinecap="round" />}
      <circle cx={night ? 28 : x} cy={night ? 12 : y} r="4.5" fill={night ? "#6A78B8" : "#F6B23E"} stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}

/** Bento dashboard of the farm's day: date, season, clock, sun arc, the flock and the next season. */
export default function CalendarHud({ now }: { now: Date }) {
  const season = seasonOf(now);
  const { icon: SeasonIcon, bg, fg } = SEASON[season];
  const hour = now.getHours() + now.getMinutes() / 60;
  const night = daylight(hour).lampsOn;
  const next = nextSeason(now);
  const NextIcon = SEASON[next.season].icon;
  return (
    <div className="absolute left-3 top-3 select-none font-sans">
      {/* read on demand, not announced: it changes every minute */}
      <div className="sr-only">{calendarLines(now).join(", ")}</div>
      <div aria-hidden className="grid grid-cols-[72px_48px_76px] grid-rows-[48px_32px_64px] gap-1.5">
        <Tile className="row-span-2 px-2.5 py-2 leading-none">
          <div className="text-[11px] font-semibold text-zinc-500">{DAYS[now.getDay()]}</div>
          <div className="mt-1 text-[28px] font-bold tracking-tight">{now.getDate()}</div>
          <div className="mt-1 text-[11px] font-semibold text-zinc-500">{MONTHS[now.getMonth()]}</div>
        </Tile>
        <Tile className="grid place-items-center" style={{ background: bg, color: fg }}>
          <SeasonIcon className="h-5 w-5" strokeWidth={2.25} />
        </Tile>
        <Tile className="row-span-2 flex flex-col justify-between px-2 pb-1.5 pt-2">
          <SunArc progress={dayProgress(hour)} night={night} />
          <div className="text-[10px] font-semibold leading-tight text-zinc-500">{night ? "Sunrise 6:00" : "Sunset 18:00"}</div>
        </Tile>
        <div className="grid place-items-center rounded-xl bg-zinc-900 text-[13px] font-semibold tabular-nums text-white" style={{ boxShadow: "0 6px 18px rgba(30,40,60,.12)" }}>
          {pad(now.getHours())}:{pad(now.getMinutes())}
        </div>
        <Tile className="col-span-2 flex items-center gap-2 px-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-50 text-base">🐔</span>
          <div className="whitespace-nowrap leading-tight">
            <div className="text-[12px] font-bold">{night ? "Hens asleep" : `${FLOCK} hens out`}</div>
            <div className="text-[11px] font-semibold text-zinc-500">{night ? "up at 6:00" : "coop at 18:00"}</div>
          </div>
        </Tile>
        <Tile className="flex flex-col justify-center px-2 leading-tight">
          <div className="text-[10px] font-semibold text-zinc-500">Next season</div>
          <div className="flex items-center gap-1 text-[12px] font-bold" style={{ color: SEASON[next.season].fg }}>
            <NextIcon className="h-3.5 w-3.5" strokeWidth={2.5} /> {SEASON_NAME[next.season]}
          </div>
          <div className="text-[10px] font-semibold text-zinc-500">in {next.days} {next.days === 1 ? "day" : "days"}</div>
        </Tile>
      </div>
    </div>
  );
}
