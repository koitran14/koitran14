// Free-range chickens on the lower-right lawn (voxel x/z; see tools/voxel/farm_build.py).
// They keep off the stream and the field (spec 4.4c) and out of the coop, well and hay.

/** How many hens roam the island in phase 1. */
export const FLOCK = 5;

type Box = [x0: number, x1: number, z0: number, z1: number];
const LAWN: Box = [106, 186, 70, 126];
const BLOCKED: Box[] = [
  [144, 172, 68, 86],  // coop
  [108, 123, 110, 124], // well
  [170, 188, 110, 132], // hay bales
];
/** Where chickens head at night, just in front of the coop door. */
export const COOP_DOOR: [number, number] = [158, 90];

const inside = ([x0, x1, z0, z1]: Box, x: number, z: number) => x >= x0 && x <= x1 && z >= z0 && z <= z1;

export function inLawn(x: number, z: number): boolean {
  return inside(LAWN, x, z) && !BLOCKED.some((b) => inside(b, x, z));
}

/** A random spot on the lawn within 12 voxels of `from`; stays put if none is found. */
export function nextTarget(from: [number, number], rand: () => number): [number, number] {
  for (let i = 0; i < 20; i++) {
    const a = rand() * Math.PI * 2, r = 12 * Math.sqrt(rand());
    const t: [number, number] = [from[0] + Math.cos(a) * r, from[1] + Math.sin(a) * r];
    if (inLawn(t[0], t[1])) return t;
  }
  return from;
}

/** Move toward `to` at `speed` voxels/s for `dt` seconds, stopping exactly on arrival. */
export function stepToward(p: [number, number], to: [number, number], speed: number, dt: number): [number, number] {
  const dx = to[0] - p[0], dz = to[1] - p[1], d = Math.hypot(dx, dz), s = speed * dt;
  return d <= s ? [to[0], to[1]] : [p[0] + (dx / d) * s, p[1] + (dz / d) * s];
}
