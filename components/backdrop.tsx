"use client";

import { useEffect, useRef } from "react";

/** Page-wide dot grid with a soft blue spotlight that follows the pointer. */
export const Backdrop = () => {
  const spot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spot.current;
    if (!el) return;
    // layer is fixed to the viewport, so client coords map straight onto it
    const move = (e: PointerEvent) => {
      el.style.setProperty("--x", `${e.clientX}px`);
      el.style.setProperty("--y", `${e.clientY}px`);
      el.style.opacity = "1";
    };
    const leave = () => (el.style.opacity = "0");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_75%_90%_at_50%_40%,black,transparent)]" />
      <div
        ref={spot}
        className="absolute inset-0 opacity-0 transition-opacity duration-300 motion-reduce:hidden [--spot-a:0.05] dark:[--spot-a:0.12]"
        style={{ background: "radial-gradient(280px circle at var(--x) var(--y), rgba(59,130,246,var(--spot-a)), transparent 70%)" }}
      />
    </div>
  );
};
