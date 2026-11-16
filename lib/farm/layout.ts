// Island layout shared by the scene: world units are voxels × S, y up, +z toward the viewer.

export const S = 0.05;
/** Width of the island's 16:9 frame in world units. */
export const FRAME_W = 15;
const FRAME_H = (FRAME_W * 9) / 16;

/** Island centre (32 × 24 cells of 6 voxels) and the fixed isometric-ish view. */
export const CAMERA = { yawDeg: 25, pitchDeg: 33, target: [4.8, 0.3, 3.6] as [number, number, number] };
/** Where the camera looks for each island of the strip: the main one, and the two unlockable ones beside it
 *  (cozy_farm.py LEFT/RIGHT centres, voxels (-135, 14, 40) and (327, 14, 50)). */
export const VIEWS: Record<"left" | "main" | "right", [number, number, number]> = { left: [-6.75, 0.7, 2.0], main: CAMERA.target, right: [16.35, 0.7, 2.5] };
export type View = keyof typeof VIEWS;

/** Fit the 16:9 frame: wider screens keep its height, narrower ones (phones) keep its full width. */
export function fitOrtho(aspect: number): { halfW: number; halfH: number } {
  if (aspect >= 16 / 9) {
    const halfH = FRAME_H / 2;
    return { halfW: halfH * aspect, halfH };
  }
  const halfW = FRAME_W / 2;
  return { halfW, halfH: halfW / aspect };
}

type V3 = [number, number, number];

// Barn door → terrace path → stairs → field gate → bridge → chicken lawn (voxel coords, see farm_build.py).
const OUT: V3[] = [[24, 12, 44], [77, 12, 46], [77, 12, 58], [77, 0, 72], [77, 0, 104], [96, 2, 105], [130, 0, 105], [155, 0, 120]];
/** Waypoints of the closed loop: out to the lawn, then back the same way. */
export const WALK: V3[] = [...OUT, ...OUT.slice(1, -1).reverse()];

const SEG = WALK.map((a, i) => {
  const b = WALK[(i + 1) % WALK.length];
  return { a, b, len: Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]) };
});
const TOTAL = SEG.reduce((s, g) => s + g.len, 0);

/** Fraction of the loop at which waypoint i is reached. */
export function waypointT(i: number): number {
  return SEG.slice(0, i).reduce((s, g) => s + g.len, 0) / TOTAL;
}

/** Position (world units) and y-heading (radians) at fraction t of the loop; t wraps. */
export function walkAt(t: number): { pos: V3; heading: number } {
  let d = (((t % 1) + 1) % 1) * TOTAL;
  for (const g of SEG) {
    if (d <= g.len || g === SEG[SEG.length - 1]) {
      const f = g.len ? Math.min(1, d / g.len) : 0;
      const pos = [0, 1, 2].map((k) => (g.a[k] + (g.b[k] - g.a[k]) * f) * S) as V3;
      return { pos, heading: Math.atan2(g.b[0] - g.a[0], g.b[2] - g.a[2]) };
    }
    d -= g.len;
  }
  throw new Error("unreachable");
}
