"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { seasonOf, skyColor, skyIsDark, WORLD_BG } from "@/lib/farm/time";

const grow = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));

/** A seedling that grows with the load: the seed splits, the stem rises, two leaves open, then the top bud. */
export function Seedling({ progress, size = 112 }: { progress: number; size?: number }) {
  const p = progress;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden>
      <style>{`@keyframes farm-sway{0%,100%{transform:rotate(-2.5deg)}50%{transform:rotate(2.5deg)}}
        .farm-sway{transform-origin:60px 96px;animation:farm-sway 3.2s ease-in-out infinite}
        @media (prefers-reduced-motion: reduce){.farm-sway{animation:none}}`}</style>
      <ellipse cx="60" cy="101" rx="36" ry="9" fill="#6E4A31" />
      <ellipse cx="60" cy="98" rx="31" ry="6" fill="#8C6143" />
      <ellipse cx="60" cy="95" rx="5" ry="3.4" fill="#D8B477" opacity={1 - grow(p, 0, 0.15)} />
      <g className="farm-sway">
        <path d="M60 96 C60 82 57 72 60 54" fill="none" stroke="#4E8A36" strokeWidth="4.5" strokeLinecap="round"
          pathLength={1} strokeDasharray="1" strokeDashoffset={1 - grow(p, 0.05, 0.55)} opacity={p > 0.05 ? 1 : 0} />{/* a zero-length round cap still draws a dot */}
        <path d="M0 0 C-6 -10 -20 -13 -27 -6 C-19 3 -8 4 0 0Z" fill="#74AD45" transform={`translate(59 76) scale(${grow(p, 0.3, 0.62)})`} />
        <path d="M0 0 C6 -10 20 -13 27 -6 C19 3 8 4 0 0Z" fill="#88C254" transform={`translate(60 65) scale(${grow(p, 0.45, 0.78)})`} />
        <path d="M0 0 C-5 -7 -3 -14 0 -17 C3 -14 5 -7 0 0Z" fill="#9CD062" transform={`translate(60 55) scale(${grow(p, 0.72, 1)})`} />
      </g>
    </svg>
  );
}

/** The seedling and how far along the farm is, on its sky; light text when the sky is dark. */
export function FarmLoader({ progress, background }: { progress: number; background: string }) {
  const dark = skyIsDark(background);
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2" role="status" aria-live="polite">
      <Seedling progress={progress} />
      <p className={`flex items-baseline gap-2 text-[15px] font-semibold ${dark ? "text-white" : "text-zinc-800"}`}>
        Loading the farm
        <span className={`tabular-nums font-medium ${dark ? "text-white/70" : "text-zinc-500"}`}>{Math.round(progress * 100)}%</span>
      </p>
    </div>
  );
}

/** Follows a 0..1 source each frame, easing toward it and never going back (more files can join the total later). */
export function useEasedProgress(read: () => number, done: boolean) {
  const [p, setP] = useState(0);
  const shown = useRef(0);
  useEffect(() => {
    let id = 0;
    const tick = () => {
      const goal = done ? 1 : Math.min(0.97, read());   // the last few percent wait for the scene, not just the bytes
      shown.current = Math.max(shown.current, shown.current + (goal - shown.current) * 0.12);
      setP(shown.current);
      if (shown.current < 0.999) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [read, done]);
  return p;
}

/** Shown from the click while the farm's code itself downloads, before any model: same sky, the seed in its soil. */
export default function FarmLoadingScreen() {
  if (typeof document === "undefined") return null;
  const now = new Date();
  const bg = skyColor(WORLD_BG[seasonOf(now)], now.getHours() + now.getMinutes() / 60);
  // portal: the homepage section is transformed (framer-motion), which would trap position:fixed
  return createPortal(<div className="fixed inset-0 z-[100]" style={{ background: bg }}><FarmLoader progress={0} background={bg} /></div>, document.body);
}
