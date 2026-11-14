// Cozy farm-game chrome: wooden boards with a cream face, chunky raised buttons, rounded type.
import { Baloo_2 } from "next/font/google";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export const gameFont = Baloo_2({ subsets: ["latin", "vietnamese"], weight: ["500", "700"], display: "swap" });

export const WOOD = "#8A5A3C";
const WOOD_DARK = "#5E3B24";
const CREAM = "#FFF4DC";
export const INK = "#5A3A22";

/** A cream sign on a wooden frame with a solid drop, like a farm-game HUD panel. */
export function Board({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl ${className}`}
      style={{ background: CREAM, color: INK, border: `3px solid ${WOOD}`, boxShadow: `0 4px 0 ${WOOD_DARK}, 0 8px 18px rgba(60,35,20,.25)` }}
    >
      {children}
    </div>
  );
}

/** Chunky raised button that sinks when pressed; at least 44 px tall for touch. */
export function GameButton({ children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={`${gameFont.className} inline-flex min-h-[44px] items-center gap-2 rounded-2xl px-4 text-[15px] font-bold transition-transform duration-75 hover:-translate-y-0.5 active:translate-y-1 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-amber-400 ${className}`}
      style={{ background: "#F6C453", color: INK, border: `3px solid ${WOOD}`, boxShadow: `0 4px 0 ${WOOD_DARK}` }}
    >
      {children}
    </button>
  );
}
