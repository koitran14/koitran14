// Farm-mode chrome: white bento tiles with soft shadows, sitting over the scene.
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

const SHADOW = "0 6px 18px rgba(30,40,60,.12)";

export function Tile({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return <div className={`rounded-2xl bg-white text-zinc-900 ${className}`} style={{ boxShadow: SHADOW, ...style }}>{children}</div>;
}

/** Square icon tile button, 46 px (above the 44 px touch minimum); `label` is its accessible name. */
export function IconTile({ label, children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      {...props}
      className={`grid h-[46px] w-[46px] place-items-center rounded-2xl bg-white text-zinc-900 transition-transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${className}`}
      style={{ boxShadow: SHADOW }}
    >
      {children}
    </button>
  );
}
