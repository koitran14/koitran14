// Cozy farm-game chrome in the soft-glossy casual style: pill shapes, a white rim, a highlight on top,
// a thick coloured "lip" underneath that the button sinks into when pressed, and rounded type.
import { Nunito } from "next/font/google";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

// Nunito: rounded and friendly, with Vietnamese glyphs (Baloo 2 failed to load through next/font).
export const gameFont = Nunito({ subsets: ["latin", "vietnamese"], weight: ["700", "800", "900"], display: "swap" });

export const INK = "#3B2A1E";

type Tone = { top: string; bottom: string; lip: string; ink: string };
export const TONES = {
  leaf: { top: "#B8F09A", bottom: "#6CCB5F", lip: "#3C8F3A", ink: "#173F17" },
  sun: { top: "#FFE7A0", bottom: "#F6C453", lip: "#C98A1E", ink: "#4A2E05" },
  sky: { top: "#CFEFFF", bottom: "#8CCDF3", lip: "#4A8CC0", ink: "#12324D" },
  berry: { top: "#FFD0E0", bottom: "#F59AB8", lip: "#C45C80", ink: "#4D1426" },
  night: { top: "#6A78B8", bottom: "#3E4A86", lip: "#252D5C", ink: "#F3F4FF" },
} satisfies Record<string, Tone>;

/** Glossy fill: a lighter top, a soft white highlight band and a darker lip below. */
export const gloss = (t: Tone, lip = 4): CSSProperties => ({
  background: `linear-gradient(180deg, ${t.top} 0%, ${t.bottom} 100%)`,
  color: t.ink,
  border: "3px solid #FFFFFF",
  boxShadow: `inset 0 3px 0 rgba(255,255,255,.55), inset 0 -3px 0 rgba(0,0,0,.08), 0 ${lip}px 0 ${t.lip}, 0 ${lip + 6}px 14px rgba(40,30,20,.22)`,
});

/** A cream card with a white rim and a soft drop, the HUD panel of the farm. */
export function Card({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`rounded-[22px] ${className}`}
      style={{
        background: "linear-gradient(180deg, #FFFDF7 0%, #FFF1D8 100%)",
        color: INK,
        border: "3px solid #FFFFFF",
        boxShadow: "0 0 0 2px rgba(150,105,60,.28), 0 5px 0 rgba(150,105,60,.35), 0 12px 24px rgba(40,30,20,.20)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Round glossy chip holding an icon (season, sun/moon, close…). */
export function Chip({ tone, children, size = 40 }: { tone: Tone; children: ReactNode; size?: number }) {
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-full" style={{ ...gloss(tone, 3), width: size, height: size }}>
      {children}
    </span>
  );
}

/** Pill button that sinks into its lip when pressed; at least 44 px tall for touch. */
export function GameButton({ tone = TONES.leaf, children, className = "", style, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone }) {
  return (
    <button
      type="button"
      {...props}
      className={`${gameFont.className} group inline-flex min-h-[46px] items-center gap-2 rounded-full pl-1.5 pr-5 text-[16px] font-extrabold tracking-wide transition-[transform,box-shadow] duration-100 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-[3px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-amber-400 ${className}`}
      style={{ ...gloss(tone), ...style }}
    >
      {children}
    </button>
  );
}
