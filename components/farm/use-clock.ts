import { useEffect, useState } from "react";

// Dev only: ?at=2026-03-15T15:00 runs the farm clock from that moment, to check a season or hour by eye.
const SHIFT = (() => {
  if (process.env.NODE_ENV === "production" || typeof window === "undefined") return 0;
  const at = Date.parse(new URLSearchParams(window.location.search).get("at") ?? "");
  return Number.isFinite(at) ? at - Date.now() : 0;
})();
const clock = () => new Date(Date.now() + SHIFT);

/** The current time, re-rendering once a minute on the minute. */
export function useClock(): Date {
  const [now, setNow] = useState(clock);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const d = clock();
      setNow(d);
      timer = setTimeout(tick, 60_000 - (d.getSeconds() * 1000 + d.getMilliseconds()) + 20);
    };
    timer = setTimeout(tick, 60_000 - (now.getSeconds() * 1000 + now.getMilliseconds()) + 20);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return now;
}
