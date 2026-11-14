// Spike v2: chibi voxel figures (rounded head, big eyes, small body), written to figures.json for blender_build.py.
// Axes: x right, y up, z toward the viewer. Usage: node figures.mjs [--alt]
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const C = {
  skin: "#FFE0CC", skinD: "#F5CDB5", earIn: "#F0B9A2",
  hair: "#3A3140", hairD: "#2C2532", hairHi: "#5E5268",
  eye: "#3B2A2E", eyeLo: "#7B5A60", white: "#FFFFFF", mouth: "#86343F", tongue: "#F48C9A", teeth: "#FFFFFF", blush: "#FFA3AE",
  shirt: "#C4BCF6", shirtD: "#ABA2EC", shirtL: "#E0DCFC", pants: "#F4EDE2", shoe: "#FFFFFF", sole: "#C9CBD6", lace: "#C4BCF6", silver: "#E3E8EF",
};
const FIGS = [
  { key: "xuan", eyes: "squint", alt: "open", mouth: "big" },
  { key: "ha", eyes: "open", alt: "squint", mouth: "grin" },
  { key: "thu", eyes: "open", alt: "squint", mouth: "smile" },
  { key: "dong", eyes: "open", alt: "squint", mouth: "o" },
];

function makeFig(o, altOn) {
  const V = new Map(); const K = (x, y, z) => `${x}|${y}|${z}`;
  const put = (x, y, z, c) => V.set(K(x, y, z), c);
  const col = (c, x, y, z, t) => typeof c === "function" ? c(x, y, z, t) : c;
  const box = (x0, x1, y0, y1, z0, z1, c) => { for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) for (let z = z0; z <= z1; z++) put(x, y, z, col(c, x, y, z)); };
  // rounded box: every voxel whose centre lies inside a box with corner radius r
  const rbox = (x0, x1, y0, y1, z0, z1, r, c, keep = () => true) => {
    const cx = (x0 + x1 + 1) / 2, cy = (y0 + y1 + 1) / 2, cz = (z0 + z1 + 1) / 2;
    const hx = (x1 + 1 - x0) / 2 - r, hy = (y1 + 1 - y0) / 2 - r, hz = (z1 + 1 - z0) / 2 - r;
    for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) for (let z = z0; z <= z1; z++) {
      const qx = Math.max(Math.abs(x + .5 - cx) - hx, 0), qy = Math.max(Math.abs(y + .5 - cy) - hy, 0), qz = Math.max(Math.abs(z + .5 - cz) - hz, 0);
      if (Math.hypot(qx, qy, qz) <= r + 0.01 && keep(x, y, z)) put(x, y, z, col(c, x, y, z));
    }
  };
  const cap = (a, b, r, c) => {
    const mn = [0, 1, 2].map(i => Math.floor(Math.min(a[i], b[i]) - r)), mx = [0, 1, 2].map(i => Math.ceil(Math.max(a[i], b[i]) + r));
    const ab = [0, 1, 2].map(i => b[i] - a[i]), L = ab[0] ** 2 + ab[1] ** 2 + ab[2] ** 2;
    for (let x = mn[0]; x <= mx[0]; x++) for (let y = mn[1]; y <= mx[1]; y++) for (let z = mn[2]; z <= mx[2]; z++) {
      const p = [x + .5 - a[0], y + .5 - a[1], z + .5 - a[2]];
      const t = Math.max(0, Math.min(1, (p[0] * ab[0] + p[1] * ab[1] + p[2] * ab[2]) / L));
      if (Math.hypot(p[0] - ab[0] * t, p[1] - ab[1] * t, p[2] - ab[2] * t) <= r) put(x, y, z, col(c, x, y, z, t));
    }
  };
  const isHair = (c) => c === C.hair || c === C.hairD || c === C.hairHi;
  const clearHairAbove = (y0) => { for (const [kk, c] of [...V]) if (isHair(c) && +kk.split("|")[1] >= y0) V.delete(kk); };
  // paint the frontmost voxel at (x, y): follows the curve of the rounded face
  const F = (x, y, c) => { for (let z = 12; z >= -2; z--) if (V.has(K(x, y, z)) && !isHair(V.get(K(x, y, z)))) { put(x, y, z, c); return; } };

  const k = o.key; const eyes = altOn ? o.alt : o.eyes;

  // ---- head: 20 wide, 18 tall, rounded r=4; face is flat in the middle ----
  const inHead = new Set();
  rbox(-10, 9, 14, 31, -9, 8, 2, C.skin);
  for (const kk of V.keys()) inHead.add(kk);
  [-11, 10].forEach(x => { box(x, x, 16, 19, -1, 1, C.skin); put(x, 17, 0, C.earIn); put(x, 18, 0, C.earIn); });

  // ---- hair: rounded shell around the head, cut to frame the face ----
  const BANG = [27, 26, 26, 25, 26, 26, 25, 26, 26, 27, 26, 25, 26, 26, 25, 26, 26, 25, 26, 27]; // per x = -10..9
  const bang = (x) => BANG[Math.min(19, Math.max(0, x + 10))];
  const hairCol = (x, y, z) => {
    if (z >= 8) return C.hair;          // fringe clumps
    return C.hair;                                       // layered sides/back
  };
  rbox(-11, 10, 15, 35, -10, 9, 3, hairCol, (x, y, z) => {
    if (inHead.has(K(x, y, z))) return false;
    if (z >= 8) return y >= bang(x);
    if (x <= -11 || x >= 10) return y >= 20;
    if (z <= -3) return y >= 15;
    return y >= 28;
  });
  for (let x = -10; x <= 9; x++) if (Math.floor((x + 10) / 3) % 2 === 0) for (let y = bang(x) + 1; y <= 30; y++) put(x, y, 10, hairCol(x, y, 10));
  box(-8, -5, 36, 36, -4, 1, C.hair); box(-3, 0, 36, 37, 1, 5, C.hair); box(2, 5, 36, 36, -2, 3, C.hair); box(-1, 2, 36, 36, -7, -3, C.hair); // messy top tufts

  // ---- face ----
  const eye = (cx) => {
    if (eyes === "open") {
      for (let x = cx - 1; x <= cx + 1; x++) for (let y = 19; y <= 22; y++) F(x, y, C.eye);
      F(cx + 1, 22, C.white); F(cx, 19, C.eyeLo);
    } else {
      [[cx, 22], [cx - 1, 21], [cx + 1, 21], [cx - 2, 20], [cx + 2, 20], [cx - 1, 22], [cx + 1, 22]].forEach(([x, y]) => F(x, y, C.eye));
    }
  };
  eye(-5); eye(4);
  [[-9, -7], [6, 8]].forEach(([a, b]) => { for (let x = a; x <= b; x++) for (let y = 17; y <= 18; y++) F(x, y, C.blush); });
  const m = o.mouth;
  if (m === "smile") { for (let x = -2; x <= 1; x++) F(x, 17, C.mouth); F(-1, 16, C.tongue); F(0, 16, C.tongue); }
  if (m === "big" || m === "grin") {
    const w = m === "grin" ? 3 : 2;
    for (let x = -w - 1; x <= w; x++) F(x, 17, (x === -w - 1 || x === w) ? C.mouth : C.teeth);
    for (let x = -w; x <= w - 1; x++) F(x, 16, (x === -1 || x === 0) ? C.tongue : C.mouth);
    F(-1, 15, C.mouth); F(0, 15, C.mouth);
  }
  if (m === "o") { F(-1, 17, C.mouth); F(0, 17, C.mouth); F(-1, 16, C.tongue); F(0, 16, C.tongue); F(-2, 16, C.mouth); F(1, 16, C.mouth); F(-1, 15, C.mouth); F(0, 15, C.mouth); }

  // ---- body: small torso, stubby limbs ----
  const outfit = {
    xuan: { body: C.shirt, bodyD: C.shirtD, pants: "#7FA6D6", shoe: C.shoe },   // denim overalls
    ha: { body: "#A8DCEB", bodyD: "#8CCADD", pants: "#EFE2C8", shoe: "#B98559" },
    thu: { body: "#C69A70", bodyD: "#AE8259", pants: C.pants, shoe: "#7A5640" },
    dong: { body: "#F6F1E8", bodyD: "#E2D9CA", pants: "#5F5C78", shoe: "#8A6247" },
  }[k];
  const W = k === "dong" ? 1 : 0; // the puffer jacket is a bit wider
  rbox(-6 - W, 5 + W, 6, 13, -4 - W, 3 + W, 2, (x, y, z) => {
    if (y === 6) return outfit.bodyD;
    return outfit.body;
  });
  const FR = 3 + W; // torso front plane
  [[-5, -2], [1, 4]].forEach(([a, b]) => {
    if (k === "ha") { box(a + 1, b - 1, 2, 4, -1, 0, C.skin); box(a, b, 4, 5, -2, 1, outfit.pants); }
    else box(a, b, 2, 5, -2, 1, outfit.pants);
    rbox(a, b, 0, k === "thu" || k === "dong" ? 3 : k === "ha" ? 1 : 2, -2, 3, 1, (x, y) => y === 0 ? (k === "ha" ? "#9A6C46" : C.sole) : outfit.shoe);
    if (k === "xuan") { put(a + 1, 2, 2, C.lace); put(b - 1, 2, 2, C.lace); }
    if (k === "ha") box(a, b, 1, 1, 1, 2, "#7FB5E0");                   // sandal strap
    if (k === "dong") box(a, b, 3, 3, -2, 3, C.white);                  // fur cuff
  });

  const armDown = (side, sleeve, hand = C.skin) => {
    const x0 = side < 0 ? -8 - W : 6 + W;
    box(x0, x0 + 1, 8, 12, -1, 0, sleeve); rbox(x0, x0 + 1, 6, 7, -1, 0, 0.5, hand);
  };
  const armFront = (side, hand, sleeve, handCol = C.skin) => {
    cap([side * (6.5 + W), 12, -0.5], hand, 1.3, (x, y, z, t) => (k === "ha" && t > 0.35) ? C.skin : sleeve);
    rbox(Math.round(hand[0]) - 1, Math.round(hand[0]) + 1, Math.round(hand[1]) - 1, Math.round(hand[1]) + 1, Math.round(hand[2]), Math.round(hand[2]) + 1, 0.8, handCol);
  };

  if (k === "xuan") {
    for (let y = 11; y <= 13; y++) for (let x = -2 + (13 - y); x <= 1 - (13 - y); x++) put(x, y, FR, C.white);   // tee in the collar V
    [[-4, 13], [-3, 13], [-4, 12], [2, 13], [3, 13], [3, 12]].forEach(([x, y]) => put(x, y, FR + 1, C.shirtL));   // collar points
    const DEN = "#7FA6D6", DEND = "#6A90C2";
    box(-4, 3, 6, 10, FR, FR, (x, y) => y === 6 ? DEND : DEN);                                                   // overall bib
    box(-1, 0, 8, 9, FR + 1, FR + 1, DEND);                                                                       // bib pocket
    box(-4, -3, 11, 13, FR, FR, DEN); box(2, 3, 11, 13, FR, FR, DEN);                                             // straps
    put(-4, 10, FR + 1, "#F2C94C"); put(3, 10, FR + 1, "#F2C94C");                                                // buttons
    armDown(-1, C.shirt);
    const CAN = "#79C2A4", CAND = "#5FA88A";                                                                     // watering can
    rbox(-11, -6, 1, 5, -2, 2, 1, (x, y) => y === 5 ? CAND : CAN); box(-9, -7, 6, 6, -1, 0, CAND);
    cap([-11, 3, 0], [-15, 7, 0], 0.8, CAND); rbox(-17, -14, 7, 8, -1, 1, 0.5, CAN);
    // friendly wave: elbow out, forearm up beside the head, open palm toward the viewer
    cap([6.5, 12, 0], [11, 14, 1], 1.4, C.shirt);
    cap([11, 14, 1], [12, 19, 2], 1.3, (x, y, z, t) => t > 0.75 ? C.silver : C.shirt);
    rbox(10, 14, 20, 23, 1, 3, 0.8, C.skin);                                                   // palm
    [10, 12, 14].forEach(x => box(x, x, 24, 25, 2, 3, C.skin));                                 // fingers
    box(15, 15, 21, 22, 2, 3, C.skin);                                                          // thumb
    [[-12, 29, 3], [-12, 31, 3], [-12, 30, 2], [-12, 30, 4], [-12, 31, 4], [-12, 29, 2]].forEach(([x, y, z]) => put(x, y, z, "#FFB3CC"));
    put(-12, 30, 3, "#FFD86B");
  }
  if (k === "ha") {
    box(-2, 1, 6, 13, FR, FR, C.white); box(-3, -3, 6, 13, FR + 1, FR + 1, outfit.bodyD); box(2, 2, 6, 13, FR + 1, FR + 1, outfit.bodyD);
    put(-1, 10, FR, "#FF9FA8"); put(0, 10, FR, "#FF9FA8");
    armDown(-1, outfit.body); box(-8, -7, 8, 10, -1, 0, C.skin);
    armFront(1, [6.5, 9, 4.5], outfit.body);
    rbox(4, 11, 2, 8, 4, 10, 1, (x, y) => y % 2 ? "#C9965E" : "#B07F4A");                     // woven basket
    rbox(5, 10, 8, 10, 5, 9, 1, "#E2564B"); put(6, 10, 6, "#5FAE45"); put(9, 10, 8, "#5FAE45");     // tomatoes
    clearHairAbove(31);
    for (let y = 30; y <= 42; y++) {                                                           // non la: conical hat
      const r = 15.5 * (1 - (y - 30) / 12.5);
      for (let x = -16; x <= 15; x++) for (let z = -16; z <= 15; z++) if (Math.hypot(x + .5, z + .5) < r) put(x, y, z, (y - 30) % 4 === 3 ? "#D9C48E" : "#ECDDAE");
    }
  }
  if (k === "thu") {
    box(-2, 1, 6, 13, FR, FR, C.shirt); put(-1, 13, FR, C.white); put(0, 13, FR, C.white);
    [7, 9, 11].forEach(y => put(-3, y, FR + 1, "#F4E6CC"));
    rbox(-6, 5, 12, 14, -4, 4, 2, "#E9C46A"); box(-4, -2, 8, 11, FR + 1, FR + 1, "#E9C46A");          // mustard scarf
    armFront(-1, [-4, 8, 5], outfit.body); armFront(1, [3, 8, 5], outfit.body);
    rbox(-5, 4, 5, 12, 5, 12, 2, (x) => (x + 10) % 3 === 0 ? "#E07B2A" : "#F0923A");               // pumpkin
    box(-1, 0, 13, 14, 8, 9, "#5E7A2E"); put(1, 13, 9, "#7FB04F");
    [[11, 29, 3], [11, 30, 2], [11, 30, 3], [11, 30, 4], [11, 31, 3], [11, 29, 2], [11, 29, 4]].forEach(([x, y, z]) => put(x, y, z, "#EE8034"));
    put(11, 28, 3, "#A5521F");
  }
  if (k === "dong") {
    box(-1, -1, 6, 11, FR, FR, outfit.bodyD);                                                                         // zip
    rbox(-6, 5, 12, 14, -4, 4, 2, (x, y) => y === 13 ? "#C94141" : "#E05050");                                        // scarf wrap
    box(1, 3, 7, 11, 5, 5, (x, y) => y === 7 ? C.white : "#E05050");                            // scarf tail
    armDown(-1, outfit.body, "#E05050");
    armFront(1, [6.5, 11, 4.5], outfit.body, "#E05050");
    box(7, 8, 2, 19, 5, 6, "#A87A48"); box(5, 10, 19, 20, 5, 6, "#8A6247");                         // shovel shaft + grip
    box(4, 11, 0, 4, 7, 7, "#B8C0CC"); box(4, 11, 0, 0, 7, 10, "#B8C0CC"); box(4, 11, 1, 1, 8, 10, C.white);  // blade with snow
    clearHairAbove(29);
    rbox(-11, 10, 26, 37, -10, 9, 3, "#E05050", (x, y) => y >= 30);
    rbox(-12, 11, 28, 30, -11, 10, 2, "#C94141");                      // folded cuff
    rbox(-2, 1, 37, 40, -2, 1, 1, C.white);                                                                            // pompom
  }

  const stretch = (at, n) => { const nv = new Map(); for (const [kk, c] of V) { const [x, y, z] = kk.split("|").map(Number); if (y < at) nv.set(kk, c); else if (y > at) nv.set(K(x, y + n, z), c); else for (let i = 0; i <= n; i++) nv.set(K(x, y + i, z), c); } V.clear(); for (const [a, b] of nv) V.set(a, b); };
  stretch(3, 2);
  // Which jointed part a voxel belongs to, from final (post-stretch) coordinates.
  // Legs end at y=7, the torso spans y=8..15, the head starts at y=16; torso x is -6-W..5+W.
  const partOf = (x, y, z) => {
    if (k === "xuan" && x >= 11) return "armR";                    // the waving arm reaches up beside the head
    if (y >= 16) return "head";
    if (x < -6 - W || (y <= 7 && x <= -6)) return "armL";
    if (x > 5 + W || (y <= 7 && x >= 5)) return "armR";
    if (z >= FR + 2) return k === "thu" ? "body" : x < 0 ? "armL" : "armR";  // held items; a two-handed carry stays with the body
    if (y <= 7) return x < 0 ? "legL" : "legR";
    return "body";
  };
  const out = [];
  for (const [kk, c] of V) {
    const [x, y, z] = kk.split("|").map(Number);
    if ([[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]].some(d => !V.has(K(x + d[0], y + d[1], z + d[2])))) out.push([x, y, z, c, partOf(x, y, z)]);
  }
  return out;
}

const alt = process.argv.includes("--alt");
const data = FIGS.map(o => ({ name: o.key, voxels: makeFig(o, alt) }));
const file = join(dirname(fileURLToPath(import.meta.url)), "figures.json");
writeFileSync(file, JSON.stringify(data));
console.log(data.map(d => `${d.name}: ${d.voxels.length}`).join(", "), "->", file);
