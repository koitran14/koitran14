"use client";

import { Component, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Canvas, useThree } from "@react-three/fiber";
import type { OrthographicCamera } from "three";
import { X } from "lucide-react";
import { CAMERA, fitOrtho } from "@/lib/farm/layout";
import { daylight, seasonOf, skyColor, type Season } from "@/lib/farm/time";
import CalendarHud from "./calendar-hud";
import { useReducedMotion } from "./use-reduced-motion";
import Island from "./island";
import Khoi from "./khoi";
import Sky from "./sky";
import { useClock } from "./use-clock";

/** Sky behind the island per season (matches the Blender renders in tools/voxel/farm_build.py). */
export const WORLD_BG: Record<Season, string> = { xuan: "#FBE9F0", ha: "#E3F4FF", thu: "#FBEBD6", dong: "#DDE7F4" };

/** Orthographic camera fitted to the island's 16:9 frame; refits on every resize. */
function CameraRig() {
  const camera = useThree((s) => s.camera) as OrthographicCamera;
  const size = useThree((s) => s.size);  useEffect(() => {
    const { halfW, halfH } = fitOrtho(size.width / size.height);
    const yaw = (CAMERA.yawDeg * Math.PI) / 180, pitch = (CAMERA.pitchDeg * Math.PI) / 180;
    const [tx, ty, tz] = CAMERA.target;
    Object.assign(camera, { left: -halfW, right: halfW, top: halfH, bottom: -halfH, near: 0.1, far: 200, zoom: 1 });
    camera.position.set(tx + 30 * Math.sin(yaw) * Math.cos(pitch), ty + 30 * Math.sin(pitch), tz + 30 * Math.cos(yaw) * Math.cos(pitch));
    camera.lookAt(tx, ty, tz);
    camera.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

// Models load inside the Canvas's own React root, where outer Suspense / error boundaries can't see them;
// this boundary lives inside the scene and reports a failure out to the HTML overlay.
class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

/** Calls onReady once every model above it in the Suspense boundary has loaded. */
function Ready({ onReady }: { onReady: () => void }) {
  useEffect(onReady, [onReady]);
  return null;
}

function Notice({ children }: { children: ReactNode }) {
  return <p role="status" className="absolute inset-0 flex items-center justify-center text-sm text-zinc-700 pointer-events-none">{children}</p>;
}

export default function FarmMode({ onClose }: { onClose: () => void }) {
  const now = useClock();
  const season = seasonOf(now);
  const hour = now.getHours() + now.getMinutes() / 60;
  const { lampsOn } = daylight(hour);
  const reducedMotion = useReducedMotion();
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const onReady = useCallback(() => setStatus("ready"), []);
  const onError = useCallback(() => setStatus("error"), []);

  // Back button closes the farm: push one history entry on open and leave through it.
  // Tracked in a ref, not history.state: Next's router copies state between entries.
  const pushed = useRef(false);
  const close = useCallback(() => {
    if (pushed.current) window.history.back();
    else onClose();
  }, [onClose]);

  useEffect(() => {
    if (!pushed.current) { // StrictMode re-runs effects in dev; push only once
      window.history.pushState(window.history.state, ""); // keep Next's router state on the new entry
      pushed.current = true;
    }
    const onPop = () => { pushed.current = false; onClose(); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("popstate", onPop);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, close]);

  // Portal to <body>: the homepage Section is transformed (framer-motion), which would trap position:fixed.
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="Khôi's farm" className="fixed inset-0 z-[100]" style={{ background: skyColor(WORLD_BG[season], hour) }}>
      <Canvas orthographic flat shadows dpr={[1, 2]}>
        <CameraRig />
        <Sky hour={hour} />
        <SceneBoundary onError={onError}>
          <Suspense fallback={null}>
            <Island season={season} lampsOn={lampsOn} />
            <Khoi season={season} reducedMotion={reducedMotion} />
            <Ready onReady={onReady} />
          </Suspense>
        </SceneBoundary>
      </Canvas>
      {status === "loading" && <Notice>Loading the farm…</Notice>}
      {status === "error" && <Notice>Couldn&apos;t load the farm. Try again later.</Notice>}
      <CalendarHud now={now} />
      <button
        type="button"
        onClick={close}
        autoFocus
        className="absolute top-3 right-3 inline-flex h-11 items-center gap-2 rounded-full bg-white/90 px-4 text-sm text-zinc-800 shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
      >
        <X className="h-4 w-4" aria-hidden /> Back to homepage
      </button>
    </div>,
    document.body,
  );
}
