// Where Khôi can walk (voxel x/z, see cozy_farm.py in the asset repo): the main island, and once bought the two islands
// beside it, reached by rope bridges from the upper terrace. One strip, a 2-voxel grid with A*, string-pulled into legs.
// Main island: two terraces 12 voxels apart (upper z < 60), joined only by the two flights of stone steps; the stream
// is crossed only by the bridge.

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
const BED_CORES: Box[] = BEDS.map(([x0, x1, z0, z1]) => [x0 + 1, x1 - 1, z0, z1]);   // beds block a voxel short at each end

const inside = ([x0, x1, z0, z1]: Box, x: number, z: number) => x >= x0 && x <= x1 && z >= z0 && z <= z1;
const onStairs = (x: number, z: number) => z >= UPZ && z <= UPZ + 12 && STAIRS.some(([a, b]) => x >= a && x <= b);
const near = (x: number, z: number, cx: number, cz: number, r: number) => Math.hypot(x - cx, z - cz) < r;

// ---- the islands beside it (cozy_farm.py LEFT / RIGHT, rope_bridge, terraced_island, lotus_island) ----
const G = 14;   // both islands' ground
const LEFT: Box = [-200, -70, -10, 90], RIGHT: Box = [262, 392, 0, 100];
/** Rope bridges from the upper terrace: deck from (x0, y0) to (x1, y1) at z, sagging `sag` mid-span, planks 7 wide. */
const ROPES = { terraces: { x0: 0.5, y0: UPH, x1: -70.5, y1: G, z: 45, sag: 5 }, lotus: { x0: 191.5, y0: UPH, x1: 262.5, y1: G, z: 52, sag: 5 } };
const onRope = (r: typeof ROPES.terraces, x: number, z: number) => Math.abs(z - r.z) <= 3 && x >= Math.min(r.x0, r.x1) - 1 && x <= Math.max(r.x0, r.x1) + 1;
function ropeHeight(r: typeof ROPES.terraces, x: number) {
  const t = Math.min(1, Math.max(0, (x - r.x0) / (r.x1 - r.x0)));
  return r.y0 + (r.y1 - r.y0) * t - r.sag * 4 * t * (1 - t) + 0.2;   // plank tops
}

// rice terraces: six walls round a hill (contour rings), a paddy on each step, the summit with the stilt house
const T = { cx: -135, cz: 40, rx: 58, rz: 44, n: 6, rise: 4.2 };
const ringW = (a: number, k: number) => 1 + 0.07 * Math.sin(3 * a + 0.8 + k * 0.45) + 0.045 * Math.sin(5 * a + 2.1 + k * 0.2) + 0.03 * Math.sin(2 * a + k);
function inRing(k: number, x: number, z: number) {
  const s = 1 - k / (T.n + 1.15), X = (x - T.cx) / (T.rx * s), Z = (z - T.cz) / (T.rz * s);
  return Math.hypot(X, Z) < ringW(Math.atan2(Z, X), k);
}
const lift = (k: number) => G + T.rise * (k + 1);
function terraceHeight(x: number, z: number) {
  for (let k = T.n - 1; k >= 0; k--) if (inRing(k, x, z)) return lift(k) - (k < T.n - 1 ? 0.15 : 0);
  return G;
}
const TERRACE_BLOCKED: Box[] = [[-146, -130, 32, 44], [-75.5, -73.5, 40.5, 42.5]];   // stilt house, lamp at the bridge
const TERRACE_POSTS: [number, number, number][] = [[-126, 29, 3.5], [-182, 4, 3.5], [-96, 6, 3.5]];   // bamboo clumps

// lotus pond: open water but for the zigzag bridge, the pavilion's deck and the fishing jetty
const P = { cx: 330, cz: 54, rx: 50, rz: 36 };
const wob = (a: number) => 1 + 0.08 * Math.sin(3 * a + 1) + 0.05 * Math.sin(5 * a);
function inPond(x: number, z: number, pad = 0) {
  const a = Math.atan2((z - P.cz) / P.rz, (x - P.cx) / P.rx);
  return ((x - P.cx) / (P.rx * wob(a) + pad)) ** 2 + ((z - P.cz) / (P.rz * wob(a) + pad)) ** 2 < 1;
}
const ZIG: [number, number][] = [[281, 65], [300, 58], [312, 64], [326, 56], [337, 52]];
function zigAlong(x: number, z: number): number | null {   // distance walked along the bridge, if (x, z) is on its deck
  let walked = 0;
  for (let i = 0; i < ZIG.length - 1; i++) {
    const [ax, az] = ZIG[i], [bx, bz] = ZIG[i + 1], L = Math.hypot(bx - ax, bz - az);
    const t = Math.max(0, Math.min(1, ((x - ax) * (bx - ax) + (z - az) * (bz - az)) / (L * L)));
    if (Math.hypot(x - (ax + (bx - ax) * t), z - (az + (bz - az) * t)) <= 2.3) return walked + t * L;
    walked += L;
  }
  return null;
}
const PAVILION: Box = [337, 355, 41, 59], JETTY: Box = [313, 319, 78, 95];
const BANYAN: [number, number, number] = [286, 22, 7];
const LOTUS_LAMPS: [number, number][] = [[292.5, 42.5], [376.5, 94.5]];

let open = new Set<string>();
/** Which islands Khôi may walk on: the unlocks bought. */
export function setOpenIslands(ids: readonly string[]) { open = new Set(ids); table = null; }

/** Ground height (voxels) under (x, z), on the main island, the bridges and the islands; far below where there is none. */
export function heightAt(x: number, z: number): number {
  if (x >= 0 && x <= 192) {
    if (z < UPZ) return UPH;
    if (onStairs(x, z)) return UPH - (z - UPZ);
    return 0;
  }
  if (onRope(ROPES.terraces, x, z) && x > LEFT[1]) return ropeHeight(ROPES.terraces, x);
  if (onRope(ROPES.lotus, x, z) && x < RIGHT[0]) return ropeHeight(ROPES.lotus, x);
  if (inside(LEFT, x, z)) return terraceHeight(x, z);
  if (inside(RIGHT, x, z)) {
    const w = zigAlong(x, z);
    if (w !== null) return G + 2.8 * Math.min(1, w / 3);   // the deck rises off the shore path over a few planks
    if (inside(PAVILION, x, z)) return G + 2.4;
    if (inside(JETTY, x, z)) return G + 2.5 * Math.min(1, (95 - z) / 3);
    return G;
  }
  return -1000;
}

export function walkable(x: number, z: number): boolean {
  if (x >= 1 && x <= 191 && z >= 1 && z <= 143) {
    if (x >= STREAM[0] && x <= STREAM[1] && !inside(BRIDGE, x, z)) return false;
    // beds block a voxel short at each end, so there is a lane between the columns and along the fence
    return !BLOCKED.some((b) => inside(b, x, z)) && !BED_CORES.some((b) => inside(b, x, z));
  }
  if (open.has("terraces")) {
    if (onRope(ROPES.terraces, x, z) && x > LEFT[1] - 1 && x < 1.5) return true;   // overlaps the island edge: no gap at the landing
    if (x >= LEFT[0] + 1 && x <= LEFT[1] - 0.5 && z >= LEFT[2] + 1 && z <= LEFT[3] - 1)
      return !TERRACE_BLOCKED.some((b) => inside(b, x, z)) && !TERRACE_POSTS.some(([px, pz, r]) => near(x, z, px, pz, r));
  }
  if (open.has("lotus")) {
    if (onRope(ROPES.lotus, x, z) && x > 190.5 && x < RIGHT[0] + 1) return true;
    if (x >= RIGHT[0] + 0.5 && x <= RIGHT[1] - 1 && z >= RIGHT[2] + 1 && z <= RIGHT[3] - 1) {
      if (zigAlong(x, z) !== null || inside(PAVILION, x, z) || inside(JETTY, x, z)) return true;
      return !inPond(x, z, 0.5) && !near(x, z, BANYAN[0], BANYAN[1], BANYAN[2]) && !LOTUS_LAMPS.some(([lx, lz]) => near(x, z, lx, lz, 1.2));
    }
  }
  return false;
}

// per 2 voxels: the stairs pass, the main terrace wall does not. On the rice terraces a step up is a terrace wall
// (4.2 voxels, ~21 cm against Khôi's 84): he steps up onto the next paddy, as you would onto a low bund.
const MAX_RISE = 2.5, TERRACE_RISE = 4.5;
const onTerraces = (x: number, z: number) => inside(LEFT, x, z);
function canStep(ax: number, az: number, bx: number, bz: number): boolean {
  const limit = onTerraces(ax, az) && onTerraces(bx, bz) ? TERRACE_RISE : MAX_RISE;
  return walkable(bx, bz) && Math.abs(heightAt(bx, bz) - heightAt(ax, az)) <= limit;   // not scaled by distance: no stepping off the side of the stairs
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

// the grid spans the whole strip: left island, main island, right island
const C = 2, X0 = LEFT[0], Z0 = LEFT[2], NX = (RIGHT[1] - X0) / C, NZ = (144 - Z0) / C;
const cx = (i: number) => X0 + i * C + 1, cz = (j: number) => Z0 + j * C + 1;

/** walkable and height at every cell centre, built once per set of open islands: the search asks for each cell's
 *  neighbours eight times over, and the island shapes (rings, the pond's outline) are not free to compute. */
let table: { walk: Uint8Array; h: Float32Array } | null = null;
function cells() {
  if (table) return table;
  const walk = new Uint8Array(NX * NZ), h = new Float32Array(NX * NZ);
  for (let j = 0; j < NZ; j++) for (let i = 0; i < NX; i++) { const k = j * NX + i; walk[k] = walkable(cx(i), cz(j)) ? 1 : 0; h[k] = heightAt(cx(i), cz(j)); }
  return (table = { walk, h });
}

/** A binary min-heap of [priority, i, j]: the open set of a strip-wide search outgrew a linear scan. */
class Heap {
  private a: [number, number, number][] = [];
  get size() { return this.a.length; }
  push(v: [number, number, number]) {
    const a = this.a; a.push(v); let i = a.length - 1;
    while (i > 0) { const p = (i - 1) >> 1; if (a[p][0] <= a[i][0]) break; [a[p], a[i]] = [a[i], a[p]]; i = p; }
  }
  pop(): [number, number, number] {
    const a = this.a, top = a[0], last = a.pop()!;
    if (a.length) {
      a[0] = last; let i = 0;
      for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < a.length && a[l][0] < a[m][0]) m = l; if (r < a.length && a[r][0] < a[m][0]) m = r; if (m === i) break; [a[m], a[i]] = [a[i], a[m]]; i = m; }
    }
    return top;
  }
}

/** Shortest walkable route from `from` to `to` as straight legs, or null when `to` cannot be reached. */
export function findPath(from: [number, number], to: [number, number]): [number, number][] | null {
  if (!walkable(to[0], to[1])) return null;
  const cell = ([x, z]: [number, number]) => [Math.min(NX - 1, Math.max(0, Math.floor((x - X0) / C))), Math.min(NZ - 1, Math.max(0, Math.floor((z - Z0) / C)))];
  const snap = (p: [number, number]) => {   // nearest walkable cell centre
    const [i0, j0] = cell(p); let best: [number, number] | null = null, bd = Infinity;
    for (let r = 0; r <= 3 && !best; r++)
      for (let i = i0 - r; i <= i0 + r; i++) for (let j = j0 - r; j <= j0 + r; j++) {
        if (i < 0 || j < 0 || i >= NX || j >= NZ || !cells().walk[j * NX + i]) continue;
        const d = Math.hypot(cx(i) - p[0], cz(j) - p[1]); if (d < bd) { bd = d; best = [i, j]; }
      }
    return best;
  };
  const s = snap(from), g = snap(to);
  if (!s || !g) return null;
  const key = (i: number, j: number) => j * NX + i;
  const { walk, h } = cells();
  const gScore = new Map<number, number>([[key(s[0], s[1]), 0]]), came = new Map<number, number>();
  const heap = new Heap(); heap.push([Math.hypot(cx(g[0]) - cx(s[0]), cz(g[1]) - cz(s[1])), s[0], s[1]]);
  const closed = new Set<number>();
  while (heap.size) {
    const [, i, j] = heap.pop(); const k0 = key(i, j);
    if (closed.has(k0)) continue; closed.add(k0);
    if (i === g[0] && j === g[1]) {
      const cells: [number, number][] = []; let k = k0;
      for (;;) { cells.push([cx(k % NX), cz(Math.floor(k / NX))]); const p = came.get(k); if (p === undefined) break; k = p; }
      cells.reverse();
      const pts: [number, number][] = [from, ...cells.slice(1, -1), to];
      // string-pull: jump to the farthest point still in a clear straight line. Gallop (1, 2, 4, … cells on) then halve
      // back, so a leg costs a few line checks, not one per cell: across the whole strip the backward scan took ~150 ms
      const out: [number, number][] = [pts[0]], last = pts.length - 1;
      for (let a = 0; a < last;) {
        let ok = a + 1, step = 1;
        while (ok + step <= last && clear(pts[a], pts[ok + step])) { ok += step; step *= 2; }
        let bad = Math.min(last + 1, ok + step);
        while (bad - ok > 1) { const m = (ok + bad) >> 1; if (clear(pts[a], pts[m])) ok = m; else bad = m; }
        out.push(pts[ok]); a = ok;
      }
      return out;
    }
    for (let di = -1; di <= 1; di++) for (let dj = -1; dj <= 1; dj++) {
      if (!di && !dj) continue;
      const ni = i + di, nj = j + dj; if (ni < 0 || nj < 0 || ni >= NX || nj >= NZ) continue;
      const nk = key(ni, nj);
      if (!walk[nk] || Math.abs(h[nk] - h[k0]) > (onTerraces(cx(i), cz(j)) && onTerraces(cx(ni), cz(nj)) ? TERRACE_RISE : MAX_RISE)) continue;   // canStep, from the table
      if (di && dj && (!walk[key(i + di, j)] || !walk[key(i, j + dj)])) continue;   // no corner cutting
      const t = (gScore.get(k0) ?? 0) + Math.hypot(di, dj) * C;
      if (t < (gScore.get(nk) ?? Infinity)) {
        gScore.set(nk, t); came.set(nk, k0);
        heap.push([t + Math.hypot(cx(g[0]) - cx(ni), cz(g[1]) - cz(nj)), ni, nj]);
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
