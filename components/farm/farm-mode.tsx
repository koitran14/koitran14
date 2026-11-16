"use client";

import { Component, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ACESFilmicToneMapping, Vector3, type OrthographicCamera } from "three";
import { ChevronLeft, ChevronRight, Droplets, Egg, Home, Sprout, Store, User } from "lucide-react";
import { CAMERA, VIEWS, fitOrtho, type View } from "@/lib/farm/layout";
import { daylight, seasonOf, skyColor, type Season } from "@/lib/farm/time";
import CalendarHud from "./calendar-hud";
import { useReducedMotion } from "./use-reduced-motion";
import Island from "./island";
import Chickens from "./chickens";
import { IconTile, Tile } from "./ui";
import RotateHint from "./rotate-hint";
import Khoi, { type Order } from "./khoi";
import Work from "./work";
import { useFarm } from "./use-farm";
import { buy, finish, jobFor, UNLOCKS, type Job, type Target } from "@/lib/farm/farmwork";
import { AccountPanel, EmailGate, ShopPanel } from "./panels";
import { logEvent } from "@/lib/farm/cloud";
import { nearestWalkable } from "@/lib/farm/nav";
import type { TaskKind, WorkTarget } from "@/lib/farm/tasks";
import Particles from "./particles";
import Sky from "./sky";
import { useClock } from "./use-clock";
import { clearFarmModels } from "./use-farm-model";

const TASK: Record<Job, TaskKind> = { plant: "plant", water: "water", harvest: "harvest", well: "well", feed: "feed", egg: "egg" };
const REASON: Record<string, string> = {
  "no-water": "The can is empty: fill it at the well", growing: "Still growing", frozen: "Too cold to grow here",
  "can-full": "The can is already full", night: "The hens are asleep",
};

/** Sky behind the island per season (matches the Blender renders in tools/voxel/farm_build.py). */
export const WORLD_BG: Record<Season, string> = { xuan: "#FBE9F0", ha: "#E3F4FF", thu: "#FBEBD6", dong: "#DDE7F4" };

const YAW = (CAMERA.yawDeg * Math.PI) / 180, PITCH = (CAMERA.pitchDeg * Math.PI) / 180;
const BACK = new Vector3(Math.sin(YAW) * Math.cos(PITCH), Math.sin(PITCH), Math.cos(YAW) * Math.cos(PITCH)).multiplyScalar(30);

/** Orthographic camera fitted to the island's 16:9 frame; refits on every resize. Slides sideways to an unlocked island,
 *  same angle and zoom, as the design's one strip of three islands. */
function CameraRig({ view, reducedMotion }: { view: View; reducedMotion: boolean }) {
  const camera = useThree((s) => s.camera) as OrthographicCamera;
  const size = useThree((s) => s.size);
  const at = useRef(new Vector3(...VIEWS[view]));
  useEffect(() => {
    const { halfW, halfH } = fitOrtho(size.width / size.height);
    Object.assign(camera, { left: -halfW, right: halfW, top: halfH, bottom: -halfH, near: 0.1, far: 200, zoom: 1 });
    camera.updateProjectionMatrix();
  }, [camera, size]);
  useFrame((_, delta) => {
    const goal = new Vector3(...VIEWS[view]);
    if (reducedMotion) at.current.copy(goal); else at.current.lerp(goal, 1 - Math.exp(-delta * 4));
    camera.position.copy(at.current).add(BACK);
    camera.lookAt(at.current);
  });
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
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
      <Tile className="px-5 py-3 text-[15px] font-semibold"><p role="alert">{children}</p></Tile>
    </div>
  );
}

export default function FarmMode({ onClose }: { onClose: () => void }) {
  const now = useClock();
  const season = seasonOf(now);
  const hour = now.getHours() + now.getMinutes() / 60;
  const { lampsOn } = daylight(hour);
  const reducedMotion = useReducedMotion();
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const onReady = useCallback(() => setStatus("ready"), []);
  // A failed load is cached by the loader; drop it so closing and reopening really retries.
  const onError = useCallback(() => { clearFarmModels(); setStatus("error"); }, []);

  // Phase 2 play: click the ground to walk, click a bed/well/trough/egg to work it, WASD to walk on a keyboard.
  const { farm, setFarm, account } = useFarm(lampsOn);
  const [panel, setPanel] = useState<"shop" | "account" | null>(null);
  const panelRef = useRef(panel); panelRef.current = panel;
  const views: View[] = [...(farm.unlocked.includes("terraces") ? ["left" as const] : []), "main", ...(farm.unlocked.includes("lotus") ? ["right" as const] : [])];
  const [view, setView] = useState<View>("main");
  const vi = views.indexOf(view);
  const go = (v: View) => { setView(v); logEvent("view_island", { view: v }); };
  // nobody plays before confirming an email; signing out closes everything and goes back to the door
  const inside = account.gate === "in";
  useEffect(() => { if (!inside) { setPanel(null); setView("main"); } }, [inside]);
  const [order, setOrder] = useState<Order | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [feedUntil, setFeedUntil] = useState(0);
  const seq = useRef(0);
  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(null), 2600); return () => clearTimeout(id); }, [toast]);
  const onGround = useCallback((x: number, z: number) => { const p = nearestWalkable(x, z); if (p) setOrder({ seq: ++seq.current, kind: "go", x: p[0], z: p[1] }); }, []);
  const onWave = useCallback(() => setOrder({ seq: ++seq.current, kind: "wave" }), []);
  const onTarget = useCallback((t: Target) => {
    const { job, reason } = jobFor(farm, t, Date.now(), season, lampsOn);
    if (process.env.NODE_ENV !== "production") Object.assign(window, { __lastTarget: { t, job, reason } });   // dev-only, for scripted tests
    if (!job) { if (reason && REASON[reason]) setToast(REASON[reason]); return; }
    const egg = t.kind === "egg" ? farm.eggs.find((e) => e.id === t.id) : undefined;
    const target: WorkTarget = t.kind === "egg" ? { kind: "egg", x: egg!.x, z: egg!.z } : t;
    setOrder({ seq: ++seq.current, kind: "work", target, task: TASK[job], onDone: () => {
      setFarm((f) => finish(f, job, t, Date.now(), season));
      logEvent("job", { job, season });
      if (job === "feed") setFeedUntil(Date.now() + 8000);
    } });
  }, [farm, season, lampsOn, setFarm]);
  const onBuy = useCallback((id: string) => {
    const r = buy(farm, id);
    if (!r.ok) return;
    setFarm(r.farm);
    logEvent("buy", { id, price: UNLOCKS.find((u) => u.id === id)!.price });
    setToast(`${UNLOCKS.find((u) => u.id === id)!.name} added to your farm`);
    if (id === "terraces" || id === "lotus") { go(id === "terraces" ? "left" : "right"); setPanel(null); }   // go and look at it
  }, [farm, setFarm]);
  const crops = Object.entries(farm.inv).filter(([k, n]) => k !== "egg" && n > 0).reduce((a, [, n]) => a + n, 0);

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
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { if (panelRef.current) setPanel(null); else close(); } };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Keep keyboard and screen-reader focus inside the farm: everything else on the page goes inert.
    const dialog = document.querySelector<HTMLElement>("[data-farm-dialog]");
    const muted = Array.from(document.body.children).filter((el) => el !== dialog && !el.hasAttribute("inert"));
    muted.forEach((el) => el.setAttribute("inert", ""));
    window.addEventListener("popstate", onPop);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      muted.forEach((el) => el.removeAttribute("inert"));
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, close]);

  // Portal to <body>: the homepage Section is transformed (framer-motion), which would trap position:fixed.
  return createPortal(
    <div data-farm-dialog role="dialog" aria-modal="true" aria-label="Khôi's farm" className="fixed inset-0 z-[100]" style={{ background: skyColor(WORLD_BG[season], hour) }}>
      {/* outer boundary: no WebGL (or a lighting/camera error) must not take the homepage down */}
      <SceneBoundary onError={onError}>
      <Canvas orthographic shadows dpr={[1, 2]} gl={{ toneMapping: ACESFilmicToneMapping, toneMappingExposure: 1.0 }}>   {/* filmic, not flat: closest to the Blender renders' AgX Punchy (three's AgX came out washed out) */}
        <CameraRig view={view} reducedMotion={reducedMotion} />
        <Sky hour={hour} season={season} focus={VIEWS[view]} />
        <SceneBoundary onError={onError}>
          <Suspense fallback={null}>
            <Island season={season} lampsOn={lampsOn} reducedMotion={reducedMotion} onGround={onGround} unlocked={farm.unlocked} />
            <Work season={season} farm={farm} onTarget={onTarget} />
            <Khoi season={season} reducedMotion={reducedMotion} order={order} onWave={onWave} />
            <Chickens lampsOn={lampsOn} reducedMotion={reducedMotion} feedUntil={feedUntil} />
            <Particles season={season} reducedMotion={reducedMotion} />
            <Ready onReady={onReady} />
          </Suspense>
        </SceneBoundary>
      </Canvas>
      </SceneBoundary>
      {status === "loading" && <Notice>Loading the farm…</Notice>}
      {status === "error" && <Notice>Couldn&apos;t load the farm. Close it and try again.</Notice>}
      <CalendarHud now={now} />
      {status === "ready" && inside && (
        <Tile className="absolute bottom-3 left-3 flex items-center gap-3 px-3 py-2 text-[13px] font-semibold" style={{ pointerEvents: "none" }}>
          <span className="flex items-center gap-1" title="Water in the can"><Droplets className="h-4 w-4 text-sky-500" aria-hidden />{farm.water}/3</span>
          <span className="flex items-center gap-1" title="Crops harvested"><Sprout className="h-4 w-4 text-green-600" aria-hidden />{crops}</span>
          <span className="flex items-center gap-1" title="Eggs collected"><Egg className="h-4 w-4 text-amber-500" aria-hidden />{farm.inv.egg ?? 0}</span>
        </Tile>
      )}
      {toast && <div className="pointer-events-none absolute inset-x-0 top-20 flex justify-center"><Tile className="px-4 py-2 text-[14px] font-semibold"><p role="status">{toast}</p></Tile></div>}
      {/* beside Home on wide screens; bottom-right on phones, where the top row is the calendar's */}
      {inside && <div className="absolute bottom-3 right-3 flex gap-2 sm:bottom-auto sm:right-[66px] sm:top-3">
        <IconTile label="Farm shop" aria-expanded={panel === "shop"} onClick={() => setPanel(panel === "shop" ? null : "shop")}>
          <Store className="h-5 w-5" strokeWidth={2.25} aria-hidden />
        </IconTile>
        <IconTile label="Your account" aria-expanded={panel === "account"} onClick={() => setPanel(panel === "account" ? null : "account")}>
          <User className="h-5 w-5" strokeWidth={2.25} aria-hidden />
        </IconTile>
      </div>}
      <IconTile label="Back to homepage" onClick={close} autoFocus className="absolute right-3 top-3">
        <Home className="h-5 w-5" strokeWidth={2.25} aria-hidden />
      </IconTile>
      {inside && panel === "shop" && <ShopPanel farm={farm} onBuy={onBuy} onClose={() => setPanel(null)} />}
      {inside && panel === "account" && <AccountPanel account={account} onClose={() => setPanel(null)} />}
      {status !== "error" && !inside && <EmailGate account={account} checking={account.gate === "checking"} />}
      {status === "ready" && inside && vi > 0 && (
        <IconTile label={views[vi - 1] === "main" ? "Back to the farm" : "Look at the rice terraces"} onClick={() => go(views[vi - 1])} className="absolute left-3 top-1/2 -translate-y-1/2">
          <ChevronLeft className="h-6 w-6" strokeWidth={2.5} aria-hidden />
        </IconTile>
      )}
      {status === "ready" && inside && vi < views.length - 1 && (
        <IconTile label={views[vi + 1] === "main" ? "Back to the farm" : "Look at the lotus pond"} onClick={() => go(views[vi + 1])} className="absolute right-3 top-1/2 -translate-y-1/2">
          <ChevronRight className="h-6 w-6" strokeWidth={2.5} aria-hidden />
        </IconTile>
      )}
      <RotateHint />
    </div>,
    document.body,
  );
}
