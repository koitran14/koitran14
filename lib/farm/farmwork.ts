// Phase 2 farm work (spec 4.4, 4.4b): beds Khôi sows, waters and harvests, crops ripening in real time; a watering can
// filled at the well; hens fed at the trough and laying eggs by day. Pure state; the browser saves it (spec 6, phase 2).
import { walkable } from "./nav";
import type { Season } from "./time";

export const BED_COUNT = 15;
/** Each bed row grows the season's crop for that row (as the island is built: cozy_farm.py PAL.crops). */
const ROW_CROPS: Record<Season, (string | null)[]> = {
  xuan: ["carrot", "radish", "strawberry"], ha: ["tomato", "corn", "melon"],
  thu: ["pumpkin", "potato", "cabbage"], dong: [null, "spinach", null],   // winter: only spinach outdoors
};
/** Real hours from watering to ripe (spec 4.4b); spinach is not in the spec, it takes as long as cabbage. */
export const CROP_HOURS: Record<string, number> = {
  carrot: 4, radish: 6, strawberry: 12, tomato: 4, corn: 8, melon: 24, pumpkin: 12, potato: 8, cabbage: 6, spinach: 6,
};
const H = 3600e3;
const CAN = 3;                      // waterings per can
const MAX_EGGS = 3;
const EGG_EVERY = 40 * 60e3;        // one egg every 40 minutes of daylight
const COOP_DOOR: [number, number] = [158, 94];

type Stage = "empty" | "seeded" | "growing" | "ripe";
export type Bed = { stage: Exclude<Stage, "ripe">; at: number };
export type Egg = { id: number; x: number; z: number };
export type Farm = { v: 1; beds: Bed[]; water: number; eggs: Egg[]; nextEggAt: number; eggId: number; inv: Record<string, number>; unlocked: string[] };
export type Target = { kind: "bed"; bed: number } | { kind: "well" } | { kind: "trough" } | { kind: "egg"; id: number };
export type Job = "plant" | "water" | "harvest" | "well" | "feed" | "egg";
export type Why = "no-water" | "growing" | "frozen" | "can-full" | "night" | "gone";

export function newFarm(now: number): Farm {
  // a new player starts from nothing: bare beds, an empty can, no produce
  return { v: 1, beds: Array.from({ length: BED_COUNT }, () => ({ stage: "empty", at: now })), water: 0, eggs: [], nextEggAt: now, eggId: 0, inv: {}, unlocked: [] };
}

export function cropFor(bed: number, season: Season): string | null {
  const row = Math.floor(bed / 3);
  return ROW_CROPS[season][row % 3];
}

export function stageOf(f: Farm, bed: number, now: number, season: Season): Stage {
  const b = f.beds[bed], crop = cropFor(bed, season);
  if (b.stage === "growing" && crop && now - b.at >= CROP_HOURS[crop] * H) return "ripe";
  return b.stage;
}

/** What clicking a target makes Khôi do now, or why he can't. */
export function jobFor(f: Farm, t: Target, now: number, season: Season, night: boolean): { job: Job | null; reason?: Why } {
  switch (t.kind) {
    case "bed": {
      if (!cropFor(t.bed, season)) return { job: null, reason: "frozen" };
      const s = stageOf(f, t.bed, now, season);
      if (s === "empty") return { job: "plant" };
      if (s === "seeded") return f.water > 0 ? { job: "water" } : { job: null, reason: "no-water" };
      if (s === "growing") return { job: null, reason: "growing" };
      return { job: "harvest" };
    }
    case "well": return f.water < CAN ? { job: "well" } : { job: null, reason: "can-full" };
    case "trough": return night ? { job: null, reason: "night" } : { job: "feed" };
    case "egg": return f.eggs.some((e) => e.id === t.id) ? { job: "egg" } : { job: null, reason: "gone" };
  }
}

/** The result of a finished job (after its animation). */
export function finish(f: Farm, job: Job, t: Target, now: number, season: Season): Farm {
  // the farm may have changed since the click (another tab, an egg already taken): only pay out if the job still applies
  if (job !== "feed" && jobFor(f, t, now, season, false).job !== job) return f;
  const beds = f.beds.map((b) => ({ ...b }));
  const inv = { ...f.inv };
  if (t.kind === "bed") {
    const crop = cropFor(t.bed, season);
    if (job === "plant") beds[t.bed] = { stage: "seeded", at: now };
    if (job === "water") { beds[t.bed] = { stage: "growing", at: now }; return { ...f, beds, water: Math.max(0, f.water - 1) }; }
    if (job === "harvest" && crop) { beds[t.bed] = { stage: "empty", at: now }; inv[crop] = (inv[crop] ?? 0) + 2 + Math.round(CROP_HOURS[crop] / 4); }   // longer crops give more
    return { ...f, beds, inv };
  }
  if (job === "well") return { ...f, water: CAN };
  if (job === "egg" && t.kind === "egg") return { ...f, eggs: f.eggs.filter((e) => e.id !== t.id), inv: { ...inv, egg: (inv.egg ?? 0) + 1 } };
  return f;
}

/** Hens lay by day near the coop, one egg every 40 minutes, never more than three lying about. */
export function layEggs(f: Farm, now: number, day: boolean, rand: () => number): Farm {
  if (!day || now < f.nextEggAt || f.eggs.length >= MAX_EGGS) return f;
  for (let i = 0; i < 30; i++) {
    const a = rand() * Math.PI * 2, r = 4 + rand() * 12;
    const x = COOP_DOOR[0] + Math.cos(a) * r, z = COOP_DOOR[1] + Math.abs(Math.sin(a)) * r;   // on the lawn side of the coop
    if (walkable(x, z)) return { ...f, eggs: [...f.eggs, { id: f.eggId + 1, x, z }], eggId: f.eggId + 1, nextEggAt: now + EGG_EVERY };
  }
  return { ...f, nextEggAt: now + EGG_EVERY };
}

/** What the island can be extended with (spec 4.4), each model built in place by cozy_farm.py. Paid for in produce. */
export const UNLOCKS = [
  { id: "flowerfence", name: "Flower fence", price: 20 },
  { id: "beehive", name: "Beehives", price: 40 },
  { id: "windmill", name: "Windmill", price: 50 },
  { id: "cow", name: "Dairy cow", price: 60 },
  { id: "greenhouse", name: "Greenhouse", price: 80 },
  { id: "terraces", name: "Rice terraces island", price: 100 },
  { id: "lotus", name: "Lotus pond island", price: 120 },
] as const;
export type UnlockId = (typeof UNLOCKS)[number]["id"];
const EGG_WORTH = 3;   // eggs are scarcer than crops (one per 40 minutes)
const worth = (k: string) => (k === "egg" ? EGG_WORTH : 1);

/** The produce on hand, in unlock points. */
export function wealth(inv: Record<string, number>): number {
  return Object.entries(inv).reduce((a, [k, n]) => a + n * worth(k), 0);
}

/** Buy an unlock: spends crops first, the largest stack first, then eggs. Unchanged farm and ok false when it can't. */
export function buy(f: Farm, id: string): { ok: boolean; farm: Farm } {
  const u = UNLOCKS.find((x) => x.id === id);
  if (!u || f.unlocked.includes(id) || wealth(f.inv) < u.price) return { ok: false, farm: f };
  const inv = { ...f.inv };
  let due = u.price;
  const order = Object.keys(inv).filter((k) => inv[k] > 0).sort((a, b) => worth(a) - worth(b) || inv[b] - inv[a]);
  for (const k of order) {
    if (due <= 0) break;
    const take = Math.min(inv[k], Math.ceil(due / worth(k)));
    inv[k] -= take; due -= take * worth(k);
  }
  return { ok: true, farm: { ...f, inv, unlocked: [...f.unlocked, id] } };
}

export function saveFarm(f: Farm): string { return JSON.stringify(f); }

/** Parse saved progress; anything malformed starts a fresh farm rather than breaking the scene. */
export function loadFarm(text: string | null, now: number): Farm {
  try {
    const o = JSON.parse(text ?? "");
    const num = (v: unknown) => typeof v === "number" && Number.isFinite(v);
    const ok = o && o.v === 1 && Array.isArray(o.beds) && o.beds.length === BED_COUNT
      && o.beds.every((b: Bed) => b && ["empty", "seeded", "growing"].includes(b.stage) && num(b.at))
      && num(o.water) && o.water >= 0 && o.water <= CAN && num(o.nextEggAt) && num(o.eggId)
      && Array.isArray(o.eggs) && o.eggs.length <= MAX_EGGS && o.eggs.every((e: Egg) => e && num(e.id) && num(e.x) && num(e.z))
      && o.inv && typeof o.inv === "object" && Object.values(o.inv).every(num);
    if (!ok) return newFarm(now);
    const ids: string[] = UNLOCKS.map((u) => u.id);   // saves from before unlocks have none; drop anything unknown
    return { ...o, unlocked: Array.isArray(o.unlocked) ? o.unlocked.filter((x: unknown) => typeof x === "string" && ids.includes(x)) : [] } as Farm;
  } catch {
    return newFarm(now);
  }
}
