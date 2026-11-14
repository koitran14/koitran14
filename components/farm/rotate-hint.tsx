"use client";

import { useState, useSyncExternalStore } from "react";
import { Smartphone, X } from "lucide-react";
import { Tile } from "./ui";

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
    <Tile className="absolute inset-x-3 bottom-6 mx-auto flex max-w-[340px] items-center gap-3 rounded-[20px] py-2 pl-2 pr-1.5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-zinc-900 text-white">
        <Smartphone className="h-5 w-5 animate-[farm-tilt_2.4s_ease-in-out_infinite] motion-reduce:animate-none" strokeWidth={2.25} aria-hidden />
      </span>
      <p className="flex-1 text-[13px] leading-tight text-zinc-500">
        <span className="block text-[14px] font-semibold text-zinc-900">Turn your phone sideways</span>
        to see the whole farm
      </p>
      <button type="button" onClick={dismiss} aria-label="Dismiss" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-zinc-500 hover:bg-zinc-100">
        <X className="h-5 w-5" strokeWidth={2.25} aria-hidden />
      </button>
      <style>{`@keyframes farm-tilt{0%,30%{transform:rotate(0)}50%,80%{transform:rotate(-90deg)}100%{transform:rotate(0)}}`}</style>
    </Tile>
  );
}
