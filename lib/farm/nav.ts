// Where Khôi can walk on the main island (voxel x/z, see tools/voxel/farm_build.py and cozy_farm.py in the asset repo).
// Two terraces 12 voxels apart (upper z < 60); the only ways between them are the two flights of stone steps, and the
// stream is crossed only by the bridge. A 2-voxel grid with A*, then string-pulled into straight legs.

type Box = [x0: number, x1: number, z0: number, z1: number];
const UPZ = 60, UPH = 12;
const STAIRS: [number, number][] = [[72, 82], [176, 184]];   // x ranges; the steps run from z 60 down to 72
const BRIDGE: Box = [84, 108, 99.5, 110.5];
const STREAM: [number, number] = [85, 107];
const BLOCKED: Box[] = [
  [4, 46, 13, 38.5], [44, 60, 16, 31], [44, 50.5, 36, 40], [2, 5, 18, 32],          // barn, silo, barrels, firewood
  [80, 112, 0, 9],                                                                     // spring boulders
  [122, 128, 12, 18], [148, 154, 12, 18], [174, 180, 12, 18], [135, 141, 34, 40], [161, 167, 34, 40],   // orchard trunks
  [117, 135, 49, 56], [65, 68, 49, 52],                                                // bench, lamp
  [3, 5, 67, 125], [3, 69, 66.5, 69], [3, 69, 123, 125.5], [67.4, 68.6, 67, 96], [67.4, 68.6, 106, 125],   // field fence, gate at z 96..106
  [36, 39.5, 80, 83.5],                                                                // scarecrow
  [19, 54, 129, 138], [111, 142, 129, 138],                                            // planters
  [109, 122, 111, 124], [111, 114, 93, 96], [139, 142, 111, 114],                      // well, lamps
  [138, 172, 68, 86], [155, 161, 85, 93], [147, 154, 89, 92.5],                         // coop and crates, ramp, trough
  [171, 189, 112, 124], [162, 167, 110, 117],                                          // hay, mailbox
  // unlockable spots, kept clear even before they are bought (small, off the paths): windmill, two hives, cow, greenhouse
  [64, 76, 30, 42], [165, 173, 42, 50], [184, 191, 38, 46], [170, 185, 94, 104], [56, 70, 127, 141],
];
/** The raised beds: 3 columns × 5 rows. Index = row * 3 + column. */
export const BEDS: Box[] = [74, 84, 94, 104, 114].flatMap((z0) => [8, 28, 48].map((x0) => [x0 - 0.5, x0 + 18.5, z0 - 0.5, z0 + 7.5] as Box));

const inside = ([x0, x1, z0, z1]: Box, x: number, z: number) => x >= x0 && x <= x1 && z >= z0 && z <= z1;
const onStairs = (x: number, z: number) => z >= UPZ && z <= UPZ + 12 && STAIRS.some(([a, b]) => x >= a && x <= b);

/** Ground height (voxels) under (x, z). */
export function heightAt(x: number, z: number): number {
  if (z < UPZ) return UPH;
  if (onStairs(x, z)) return UPH - (z - UPZ);
  return 0;
}

export function walkable(x: number, z: number): boolean {
  if (x < 1 || x > 191 || z < 1 || z > 143) return false;
  if (x >= STREAM[0] && x <= STREAM[1] && !inside(BRIDGE, x, z)) return false;
  // beds block a voxel short at each end, so there is a lane between the columns and along the fence
  return !BLOCKED.some((b) => inside(b, x, z)) && !BEDS.some(([x0, x1, z0, z1]) => inside([x0 + 1, x1 - 1, z0, z1], x, z));
}

const MAX_RISE = 2.5;   // per 2 voxels: the stairs pass, the terrace wall does not
function canStep(ax: number, az: number, bx: number, bz: number): boolean {
  return walkable(bx, bz) && Math.abs(heightAt(bx, bz) - heightAt(ax, az)) <= MAX_RISE;   // not scaled by distance: no stepping off the side of the stairs
}

/** A straight leg is clear if every half-voxel along it can be stepped to from the previous one. */
function clear(a: [number, number], b: [number, number]): boolean {
  const n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) * 2));
  let px = a[0], pz = a[1];
  for (let k = 1; k <= n; k++) {
    const x = a[0] + ((b[0] - a[0]) * k) / n, z = a[1] + ((b[1] - a[1]) * k) / n;
    if (!canStep(px, pz, x, z)) return false;
    px = x; pz = z;
  }
  return true;
}

const C = 2, NX = 96, NZ = 72;
const cx = (i: number) => i * C + 1, cz = (j: number) => j * C + 1;

/** Shortest walkable route from `from` to `to` as straight legs, or null when `to` cannot be reached. */
export function findPath(from: [number, number], to: [number, number]): [number, number][] | null {
  if (!walkable(to[0], to[1])) return null;
  const cell = ([x, z]: [number, number]) => [Math.min(NX - 1, Math.max(0, Math.floor(x / C))), Math.min(NZ - 1, Math.max(0, Math.floor(z / C)))];
  const snap = (p: [number, number]) => {   // nearest walkable cell centre
    const [i0, j0] = cell(p); let best: [number, number] | null = null, bd = Infinity;
    for (let r = 0; r <= 3 && !best; r++)
      for (let i = i0 - r; i <= i0 + r; i++) for (let j = j0 - r; j <= j0 + r; j++) {
        if (i < 0 || j < 0 || i >= NX || j >= NZ || !walkable(cx(i), cz(j))) continue;
        const d = Math.hypot(cx(i) - p[0], cz(j) - p[1]); if (d < bd) { bd = d; best = [i, j]; }
      }
    return best;
  };
  const s = snap(from), g = snap(to);
  if (!s || !g) return null;
  const key = (i: number, j: number) => j * NX + i;
  const gScore = new Map<number, number>([[key(s[0], s[1]), 0]]), came = new Map<number, number>();
  const open: [number, number, number][] = [[Math.hypot(cx(g[0]) - cx(s[0]), cz(g[1]) - cz(s[1])), s[0], s[1]]];
  const closed = new Set<number>();
  while (open.length) {
    let bi = 0; for (let k = 1; k < open.length; k++) if (open[k][0] < open[bi][0]) bi = k;
    const [, i, j] = open.splice(bi, 1)[0]; const k0 = key(i, j);
    if (closed.has(k0)) continue; closed.add(k0);
    if (i === g[0] && j === g[1]) {
      const cells: [number, number][] = []; let k = k0;
      for (;;) { cells.push([cx(k % NX), cz(Math.floor(k / NX))]); const p = came.get(k); if (p === undefined) break; k = p; }
      cells.reverse();
      const pts: [number, number][] = [from, ...cells.slice(1, -1), to];
      const out: [number, number][] = [pts[0]];   // string-pull: jump to the farthest point still in a clear straight line
      for (let a = 0; a < pts.length - 1;) {
        let b = pts.length - 1;
        while (b > a + 1 && !clear(pts[a], pts[b])) b--;
        out.push(pts[b]); a = b;
      }
      return out;
    }
    for (let di = -1; di <= 1; di++) for (let dj = -1; dj <= 1; dj++) {
      if (!di && !dj) continue;
      const ni = i + di, nj = j + dj; if (ni < 0 || nj < 0 || ni >= NX || nj >= NZ) continue;
      if (!canStep(cx(i), cz(j), cx(ni), cz(nj))) continue;
      if (di && dj && (!walkable(cx(i + di), cz(j)) || !walkable(cx(i), cz(j + dj)))) continue;   // no corner cutting
      const nk = key(ni, nj), t = (gScore.get(k0) ?? 0) + Math.hypot(di, dj) * C;
      if (t < (gScore.get(nk) ?? Infinity)) {
        gScore.set(nk, t); came.set(nk, k0);
        open.push([t + Math.hypot(cx(g[0]) - cx(ni), cz(g[1]) - cz(nj)), ni, nj]);
      }
    }
  }
  return null;
}

/** Keyboard movement: go as far along `delta` as the ground allows, sliding along walls, in half-voxel steps. */
export function slide(pos: [number, number], delta: [number, number]): [number, number] {
  const n = Math.max(1, Math.ceil(Math.hypot(delta[0], delta[1]) * 2));
  let [x, z] = pos;
  for (let k = 0; k < n; k++) {
    const dx = delta[0] / n, dz = delta[1] / n;
    if (canStep(x, z, x + dx, z + dz)) { x += dx; z += dz; }
    else if (dx && canStep(x, z, x + dx, z)) x += dx;
    else if (dz && canStep(x, z, x, z + dz)) z += dz;
    else break;
  }
  return [x, z];
}

/** The closest point Khôi can stand on within 12 voxels of (x, z) — a click on a roof or fence becomes "go next to it". */
export function nearestWalkable(x: number, z: number): [number, number] | null {
  if (walkable(x, z)) return [x, z];
  for (let r = 1; r <= 12; r++)
    for (let i = 0; i < 8 * r; i++) {
      const a = (i / (8 * r)) * Math.PI * 2, px = x + Math.cos(a) * r, pz = z + Math.sin(a) * r;
      if (walkable(px, pz)) return [px, pz];
    }
  return null;
}
