/** How a bought thing arrives: an item drops onto its spot and settles; an island rises out of the clouds. */
export type Arrival = "item" | "island";

export const DROP = 0.5, SETTLE = 0.9, RISE = 1.6;   // seconds
const backOut = (k: number) => { const c = 1.25, x = k - 1; return 1 + (c + 1) * x * x * x + c * x * x; };

/** Pose at time t (s) since the start, for the group holding the model at its base: [lift (m), widen, stretch];
 *  null once it has come to rest. */
export function arrivalPose(kind: Arrival, t: number): [lift: number, sx: number, sy: number] | null {
  if (kind === "island") {
    if (t >= RISE) return null;
    const e = backOut(Math.max(0, t) / RISE);
    return [-3 * (1 - e), 0.92 + 0.08 * e, 0.92 + 0.08 * e];
  }
  if (t < DROP) {   // falls under gravity, growing to full size, stretched a little by the speed
    const k = Math.max(0, t) / DROP, s = 0.6 + 0.4 * k;
    return [1.1 * (1 - k * k), s * 0.94, s * 1.1];
  }
  if (t >= DROP + SETTLE) return null;   // on t itself: t - DROP rounds just under SETTLE
  const u = t - DROP;
  const sq = Math.exp(-u * 7) * Math.cos(u * 18) * 0.16;   // lands: squashes, springs back, settles
  return [0, 1 + sq * 0.5, 1 - sq];
}
