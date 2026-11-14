"use client";

import { useState, useSyncExternalStore } from "react";
import { Smartphone, X } from "lucide-react";
import { Card, Chip, gameFont, gloss, TONES } from "./game-ui";

const PORTRAIT_PHONE = "(orientation: portrait) and (max-width: 640px)";
const KEY = "farm-rotate-hint-dismissed";

function usePortraitPhone() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(PORTRAIT_PHONE);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(PORTRAIT_PHONE).matches,
    () => false,
  );
}

function wasDismissed() {
  try { return sessionStorage.getItem(KEY) === "1"; } catch { return false; }
}

/** On a portrait phone, suggest turning sideways: the island is a 16:9 box and gets small upright. */
export default function RotateHint() {
  const portrait = usePortraitPhone();
  const [dismissed, setDismissed] = useState(wasDismissed);
  if (!portrait || dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try { sessionStorage.setItem(KEY, "1"); } catch { /* private mode: the hint just comes back next time */ }
  };

  return (
    <Card className={`${gameFont.className} absolute inset-x-3 bottom-6 mx-auto flex max-w-[350px] items-center gap-3 py-2 pl-2.5 pr-2`}>
      <Chip tone={TONES.sun} size={46}>
        <Smartphone className="h-6 w-6 animate-[farm-tilt_2.4s_ease-in-out_infinite] motion-reduce:animate-none" strokeWidth={2.75} aria-hidden />
      </Chip>
      <p className="flex-1 text-[15px] font-bold leading-tight">
        <span className="block text-[16px] font-extrabold">Turn sideways</span>
        to see the whole farm
      </p>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform active:translate-y-[2px]"
        style={gloss(TONES.berry, 3)}
      >
        <X className="h-5 w-5" strokeWidth={3} aria-hidden />
      </button>
      <style>{`@keyframes farm-tilt{0%,30%{transform:rotate(0)}50%,80%{transform:rotate(-90deg)}100%{transform:rotate(0)}}`}</style>
    </Card>
  );
}
