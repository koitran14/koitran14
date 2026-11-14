import { WALK, waypointT } from "./layout";

/** One trip round the walk loop, and the pause at the field gate for the season's chore. */
export const WALK_SECONDS = 40;
export const CHORE_SECONDS = 4;

const GATE_T = waypointT(WALK.findIndex(([x, y, z]) => x === 77 && y === 0 && z === 104));

/** Where Khôi is in his day after `seconds` of animation: walking at loop fraction t, or doing a chore at the gate. */
export function khoiAt(seconds: number): { mode: "walk" | "chore"; t: number } {
  const s = ((seconds % (WALK_SECONDS + CHORE_SECONDS)) + WALK_SECONDS + CHORE_SECONDS) % (WALK_SECONDS + CHORE_SECONDS);
  const arrive = GATE_T * WALK_SECONDS;
  if (s < arrive) return { mode: "walk", t: s / WALK_SECONDS };
  if (s < arrive + CHORE_SECONDS) return { mode: "chore", t: GATE_T };
  return { mode: "walk", t: (s - CHORE_SECONDS) / WALK_SECONDS };
}
