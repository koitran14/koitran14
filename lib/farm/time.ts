// Real-world time for the farm: the season comes from the calendar month, light from the hour.

export type Season = "xuan" | "ha" | "thu" | "dong";

export const SEASON_NAME: Record<Season, string> = { xuan: "Xuân", ha: "Hạ", thu: "Thu", dong: "Đông" };

/** Xuân Feb–Apr, Hạ May–Jul, Thu Aug–Oct, Đông Nov–Jan, by the visitor's local date. */
export function seasonOf(d: Date): Season {
  const m = d.getMonth() + 1;
  if (m >= 2 && m <= 4) return "xuan";
  if (m >= 5 && m <= 7) return "ha";
  if (m >= 8 && m <= 10) return "thu";
  return "dong";
}

const ramp = (v: number) => { const t = Math.min(1, Math.max(0, v)); return t * t * (3 - 2 * t); };

/** day: 0..1 sun strength; dusk: 0..1 orange tint around 6:00 and 18:00; glow: 0..1 the low golden sun itself in the
 *  last and first hour it is up (day alone falls to ~0 there, which left the island near black under a bright dusk
 *  sky), fading out a few minutes after it sets; lamps on 18:00–6:00. */
export function daylight(hour: number): { day: number; dusk: number; glow: number; lampsOn: boolean } {
  // full daylight from mid-morning to mid-afternoon; a plain sine left 8:00 looking like evening
  const day = Math.min(1, 1.8 * Math.max(0, Math.sin(((hour - 6) / 12) * Math.PI)));
  const dusk = Math.max(0, 1 - Math.abs(hour - 18) / 1.5, 1 - Math.abs(hour - 6) / 1.5);
  const up = hour < 12 ? ramp((hour - 5.75) / 0.35) : ramp((18.25 - hour) / 0.35);
  return { day: hour >= 6 && hour <= 18 ? day : 0, dusk, glow: dusk * up, lampsOn: hour >= 18 || hour < 6 };
}

// Each season starts on the 1st of its first month (see seasonOf).
const STARTS: [month: number, season: Season][] = [[1, "xuan"], [4, "ha"], [7, "thu"], [10, "dong"]];

/** The coming season and how many calendar days until its first day (local dates, DST-safe). */
export function nextSeason(d: Date): { season: Season; days: number } {
  const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  for (const year of [d.getFullYear(), d.getFullYear() + 1]) {
    for (const [month, season] of STARTS) {
      const start = new Date(year, month, 1);
      if (start > today) return { season, days: Math.round((start.getTime() - today.getTime()) / 86_400_000) };
    }
  }
  throw new Error("unreachable");
}

/** How far the sun is across the sky: 0 at 6:00, 1 at 18:00, clamped outside daytime. */
export function dayProgress(hour: number): number {
  return Math.min(1, Math.max(0, (hour - 6) / 12));
}

const mix = (a: string, b: string, t: number) => {
  const ch = (h: string, i: number) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
  return "#" + [0, 1, 2].map((i) => Math.round(ch(a, i) + (ch(b, i) - ch(a, i)) * t).toString(16).padStart(2, "0")).join("");
};

/** Background behind the island: the season's sky, warmed at dusk, navy at night. */
export function skyColor(base: string, hour: number): string {
  const { day, dusk } = daylight(hour);
  // darken toward night first, then lay the dusk glow on top so sunset reads warm, not grey
  return mix(mix(base, "#26304F", 1 - Math.min(1, day + dusk / 2)), "#F7B98A", dusk * 0.5);
}

/** Sky behind the island per season (matches the Blender renders). */
export const WORLD_BG: Record<Season, string> = { xuan: "#FBE9F0", ha: "#E3F4FF", thu: "#FBEBD6", dong: "#DDE7F4" };

/** True when a sky colour is dark enough that text on it must be light (night, late dusk). */
export function skyIsDark(hex: string): boolean {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2] < 0.45;
}

const SEASON_WORD: Record<Season, string> = { xuan: "spring", ha: "summer", thu: "autumn", dong: "snowy winter" };

/** The moment on the farm in a few words, for the welcome: "a snowy winter afternoon". */
export function farmMoment(season: Season, hour: number): string {
  const part = hour < 5 || hour >= 21 ? "night" : hour < 11 ? "morning" : hour < 17 ? "afternoon" : "evening";
  const words = `${SEASON_WORD[season]} ${part}`;
  return `${/^[aeiou]/.test(words) ? "an" : "a"} ${words}`;
}

// Fixed names rather than toLocaleString, which formats differently across browsers.
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const pad = (n: number) => String(n).padStart(2, "0");

export function calendarLines(d: Date): [string, string] {
  return [
    `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}`,
    `${SEASON_NAME[seasonOf(d)]} · ${pad(d.getHours())}:${pad(d.getMinutes())}`,
  ];
}
