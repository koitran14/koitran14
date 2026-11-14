import { Flower2, Leaf, Moon, Snowflake, Sun } from "lucide-react";
import { calendarLines, daylight, seasonOf, SEASON_NAME, type Season } from "@/lib/farm/time";
import { Card, Chip, gameFont, gloss, TONES } from "./game-ui";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const SEASON: Record<Season, { icon: typeof Sun; tone: (typeof TONES)[keyof typeof TONES] }> = {
  xuan: { icon: Flower2, tone: TONES.berry },
  ha: { icon: Sun, tone: TONES.sun },
  thu: { icon: Leaf, tone: { top: "#FFD3A8", bottom: "#F29A55", lip: "#B8602A", ink: "#4A2208" } },
  dong: { icon: Snowflake, tone: TONES.sky },
};
const pad = (n: number) => String(n).padStart(2, "0");

/** Farm-game clock: a day tab, the big date, a glossy season badge and a sun/moon time pill. */
export default function CalendarHud({ now }: { now: Date }) {
  const season = seasonOf(now);
  const { icon: SeasonIcon, tone } = SEASON[season];
  const night = daylight(now.getHours() + now.getMinutes() / 60).lampsOn;
  const TimeIcon = night ? Moon : Sun;
  return (
    <div className={`${gameFont.className} absolute left-3 top-3 select-none`}>
      <div role="status" aria-live="polite" className="sr-only">{calendarLines(now).join(", ")}</div>
      <Card className="relative w-[156px] px-3 pb-2.5 pt-4">
        {/* weekday tab sitting on the card's top edge */}
        <span aria-hidden className="absolute -top-3 left-3 rounded-full px-3 text-[12px] font-extrabold uppercase leading-6 tracking-widest" style={gloss(tone, 3)}>
          {DAYS[now.getDay()]}
        </span>
        <div aria-hidden className="flex items-center justify-between">
          <div className="flex items-baseline gap-1 leading-none">
            <span className="text-[34px] font-extrabold">{now.getDate()}</span>
            <span className="text-[15px] font-bold opacity-80">{MONTHS[now.getMonth()]}</span>
          </div>
          <Chip tone={tone} size={42}><SeasonIcon className="h-5 w-5" strokeWidth={2.75} /></Chip>
        </div>
        <div aria-hidden className="mt-2 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full py-0.5 pl-1 pr-2.5 text-[16px] font-extrabold tabular-nums" style={gloss(night ? TONES.night : TONES.sky, 2)}>
            <TimeIcon className="h-4 w-4" strokeWidth={2.75} /> {pad(now.getHours())}:{pad(now.getMinutes())}
          </span>
          <span className="text-[14px] font-extrabold">{SEASON_NAME[season]}</span>
        </div>
      </Card>
    </div>
  );
}
