// Khôi's work animations: each task a timed pose (part rotations in radians, three.js axes, 0 = standing rest) and the
// tool in his hand. Positive x leans the body/head forward; negative x swings an arm forward and up; z swings an arm out
// to the side (+ for armR, − for armL). `drop` lowers the whole figure (metres) for crouching. Rigid chibi limbs: no knees.
import { BEDS, findPath, walkable } from "./nav";

export type TaskKind = "plant" | "water" | "harvest" | "well" | "feed" | "egg" | "fish" | "transplant" | "wave";
export type Tool = "hoe" | "seedbag" | "can" | "basket" | "bowl" | "rod" | "seedlings" | "egg" | null;
type Rot = { x?: number; z?: number };
export type Pose = { body?: Rot; head?: Rot; armL?: Rot; armR?: Rot; legL?: Rot; legR?: Rot; drop: number; tool: Tool; hand: "L" | "R"; toolX?: number; hideHeld: boolean; fx?: "water" | "grain" | "splash" };

export const TASKS: Record<TaskKind, { seconds: number }> = {
  plant: { seconds: 3.2 }, water: { seconds: 2.4 }, harvest: { seconds: 2.0 }, well: { seconds: 2.6 }, feed: { seconds: 2.4 },
  egg: { seconds: 1.6 }, fish: { seconds: 6.0 }, transplant: { seconds: 4.0 }, wave: { seconds: 2.0 },
};

const ease = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
/** 0→1→0 over [a, b], eased: a lean that settles in and back out. */
const bump = (t: number, a: number, b: number) => { const u = clamp01((t - a) / (b - a)); return ease(u < 0.5 ? u * 2 : (1 - u) * 2); };
const blend = (t: number, d: number) => ease(clamp01(t / 0.3)) * ease(clamp01((d - t) / 0.3));   // in and out of any task

export function pose(kind: TaskKind, t: number): Pose {
  const d = TASKS[kind].seconds, k = blend(t, d), work = { hideHeld: true, drop: 0 };
  switch (kind) {
    case "plant": {
      if (t < 1.8) {   // two hoe strokes: raise high, chop down with the body following
        const ph = (t % 0.9) / 0.9, up = ph < 0.55 ? ease(ph / 0.55) : 1 - ease((ph - 0.55) / 0.45);
        return { ...work, tool: "hoe", hand: "R", armR: { x: k * (-0.5 - 1.9 * up) }, armL: { x: k * (-0.4 - 1.3 * up) }, body: { x: k * (0.35 - 0.25 * up) }, head: { x: k * 0.2 } };
      }
      const s = Math.sin((t - 1.8) * 9);   // crouch and flick seed into the furrow
      return { ...work, tool: "seedbag", hand: "L", drop: 0.05 * k, body: { x: 0.55 * k }, head: { x: 0.25 * k }, armL: { x: -0.7 * k }, armR: { x: k * (-0.9 + 0.25 * s), z: 0.1 * k }, legL: { x: -0.35 * k }, legR: { x: 0.25 * k } };
    }
    case "water": {
      const tilt = bump(t, 0.4, d - 0.2);
      return { ...work, tool: "can", hand: "R", armR: { x: -1.0 * k - 0.15 * Math.sin(t * 5) * tilt }, toolX: 0.9 * tilt, body: { x: 0.2 * k }, head: { x: 0.25 * k }, fx: tilt > 0.5 ? "water" : undefined };
    }
    case "harvest": {
      const pull = t > 1.1 ? ease(clamp01((t - 1.1) / 0.3)) : 0;   // grip low, then a quick tug up
      return { ...work, tool: pull > 0.5 ? "basket" : null, hand: "R", drop: 0.08 * k, body: { x: 0.75 * k - 0.3 * pull }, head: { x: 0.3 * k },
        armR: { x: k * (-1.3 + 1.0 * pull) }, armL: { x: k * (-1.1 + 0.6 * pull) }, legL: { x: -0.45 * k }, legR: { x: 0.35 * k } };
    }
    case "well": {
      const a = (t / 1.1) * Math.PI * 2;   // both hands turning the windlass crank
      return { ...work, tool: null, hand: "R", armR: { x: k * (-1.25 + 0.35 * Math.sin(a)) }, armL: { x: k * (-1.25 + 0.35 * Math.cos(a)) }, body: { x: k * (0.15 + 0.08 * Math.sin(a)) } };
    }
    case "feed": {
      const fling = Math.max(0, Math.sin((t / 0.8) * Math.PI * 2));   // bowl in the left hand, the right hand flings grain out
      return { ...work, tool: "bowl", hand: "L", armL: { x: -0.85 * k }, armR: { x: k * (-0.6 - 0.4 * fling), z: k * 0.9 * fling }, body: { x: 0.12 * k }, fx: fling > 0.6 ? "grain" : undefined };
    }
    case "egg": {
      const reach = bump(t, 0.1, d - 0.1);
      return { ...work, tool: t > d * 0.55 ? "egg" : null, hand: "R", drop: 0.07 * reach, body: { x: 0.85 * reach }, head: { x: 0.3 * reach }, armR: { x: -1.5 * reach }, legL: { x: -0.4 * reach }, legR: { x: 0.3 * reach } };
    }
    case "fish": {
      const cast = t < 1 ? ease(t) : 1, reel = t > 4.8 ? ease(clamp01((t - 4.8) / 0.8)) : 0;   // cast, wait for a bite, strike
      const back = t < 0.4 ? ease(t / 0.4) : 0;
      return { ...work, tool: "rod", hand: "R", armR: { x: k * (-0.9 - 1.7 * back + (cast - 1) * 0.6 - 0.9 * reel) }, armL: { x: -0.5 * k }, body: { x: k * (0.1 - 0.2 * back + 0.15 * reel) },
        fx: t > 1 && t < 1.3 ? "splash" : t > 4.8 && t < 5.1 ? "splash" : undefined };
    }
    case "transplant": {
      const dip = Math.max(0, Math.sin((t / 0.7) * Math.PI * 2));   // bent over in the paddy, pressing seedlings in
      return { ...work, tool: "seedlings", hand: "L", drop: 0.07 * k, body: { x: 0.95 * k }, head: { x: 0.25 * k }, armL: { x: -0.9 * k }, armR: { x: k * (-1.2 - 0.35 * dip) }, legL: { x: -0.4 * k }, legR: { x: 0.35 * k } };
    }
    case "wave":
      return { hideHeld: false, drop: 0, tool: null, hand: "L", armL: { z: -k * (2.4 + Math.sin(t * 10) * 0.4) } };
  }
}

export type WorkTarget = { kind: "bed"; bed: number } | { kind: "well" } | { kind: "trough" } | { kind: "egg"; x: number; z: number };
export type Spot = { x: number; z: number; heading: number; focus: [number, number] };

const centre = (t: WorkTarget): [number, number] => {
  if (t.kind === "bed") { const [x0, x1, z0, z1] = BEDS[t.bed]; return [(x0 + x1) / 2, (z0 + z1) / 2]; }
  if (t.kind === "well") return [115.5, 117.5];
  if (t.kind === "trough") return [150.5, 90.5];
  return [t.x, t.z];
};

/** Where Khôi stands to work on a target: the reachable free spot beside it nearest to him, facing the work. */
export function standSpot(t: WorkTarget, from: [number, number]): Spot {
  const focus = centre(t);
  let cands: [number, number][];
  if (t.kind === "bed") {
    const [x0, x1, z0, z1] = BEDS[t.bed], mx = (x0 + x1) / 2;
    cands = [[mx, z1 + 1], [mx, z0 - 1], [mx - 5, z1 + 1], [mx + 5, z1 + 1], [mx - 5, z0 - 1], [mx + 5, z0 - 1]];   // the lanes between rows
  } else {
    const r = t.kind === "well" ? 8.5 : t.kind === "trough" ? 4.5 : 3;
    cands = Array.from({ length: 16 }, (_, i) => [focus[0] + Math.cos((i / 16) * Math.PI * 2) * r, focus[1] + Math.sin((i / 16) * Math.PI * 2) * r] as [number, number]);
  }
  cands = cands.filter(([x, z]) => walkable(x, z)).sort((a, b) => Math.hypot(a[0] - from[0], a[1] - from[1]) - Math.hypot(b[0] - from[0], b[1] - from[1]));
  const at = cands.find((c) => findPath(from, c)) ?? cands[0] ?? from;
  const look = t.kind === "bed" ? [at[0], focus[1]] : focus;   // at a bed, face straight across it
  return { x: at[0], z: at[1], heading: Math.atan2(look[0] - at[0], look[1] - at[1]), focus: look as [number, number] };
}
