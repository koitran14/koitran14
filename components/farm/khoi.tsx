"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshStandardMaterial, Vector3, type Group, type Material, type Mesh, type Object3D } from "three";
import { khoiAt } from "@/lib/farm/khoi";
import { S, WALK, walkAt } from "@/lib/farm/layout";
import { findPath, heightAt, slide } from "@/lib/farm/nav";
import { TASKS, pose, standSpot, type Pose, type TaskKind, type WorkTarget } from "@/lib/farm/tasks";
import type { Season } from "@/lib/farm/time";
import { useFarmModel } from "./use-farm-model";
import { sunRim } from "./sunlight";

/** What the player asked for: walk somewhere, wave, or walk to a job and do it. `seq` changes with every new order. */
export type Order = { seq: number } & ({ kind: "go"; x: number; z: number } | { kind: "wave" } | { kind: "work"; target: WorkTarget; task: TaskKind; onDone: () => void });

const SPEED = 26;                         // voxels per second, about 1.3 m/s: a click should get a response soon
const RESUME_AFTER = 30;                  // seconds without orders before he goes back to his stroll
const FACE_CAMERA = (25 * Math.PI) / 180; // the camera sits 25° round toward +x
const IDLE_T = 0.35;                      // where he stands when motion is reduced
const YAW = (25 * Math.PI) / 180;
const KEYS: Record<string, [number, number]> = { w: [0, 1], arrowup: [0, 1], s: [0, -1], arrowdown: [0, -1], a: [-1, 0], arrowleft: [-1, 0], d: [1, 0], arrowright: [1, 0] };
const PARTS = ["head", "body", "armL", "armR", "legL", "legR"] as const;
type Parts = Record<(typeof PARTS)[number], Object3D>;
const TOOLS = ["hoe", "seedbag", "can", "basket", "bowl", "rod", "seedlings", "egg"];
const X_AXIS = new Vector3(1, 0, 0);

type Mode = "auto" | "path" | "task" | "idle" | "key";

export type Zone = "left" | "main" | "right";
/** Which island he stands on (or is crossing to): the camera follows him there. */
const zoneOf = (x: number): Zone => (x < -1 ? "left" : x > 193 ? "right" : "main");

export default function Khoi({ season, reducedMotion, order, onWave, onZone }: { season: Season; reducedMotion: boolean; order: Order | null; onWave: () => void; onZone?: (z: Zone) => void }) {
  const gltf = useFarmModel(`khoi-${season}`);
  const toolsGltf = useFarmModel("khoi-tools");
  const root = useRef<Group>(null!);
  const keys = useRef(new Set<string>());
  const fx = useRef<Pose["fx"] | null>(null), fxT = useRef(0);
  const st = useRef({
    mode: "auto" as Mode, clock: 0, x: 24, z: 44, y: NaN, zone: "main" as Zone, heading: 0, path: [] as [number, number][], leg: 0,
    job: null as null | { task: TaskKind; t: number; onDone?: () => void; heading: number }, lastOrder: 0, seenSeq: -1, resuming: false,
  });

  const rig = useMemo(() => {
    gltf.scene.traverse((o) => { o.castShadow = true; const m = o as Mesh; if (m.isMesh) ([] as Material[]).concat(m.material).forEach(sunRim); });   // the sun rims him too
    const parts = Object.fromEntries(PARTS.map((n) => [n, gltf.scene.getObjectByName(n)!])) as Parts;
    const rest = Object.fromEntries(PARTS.map((n) => [n, parts[n].position.clone()])) as Record<keyof Parts, Vector3>;
    const held: Object3D[] = []; gltf.scene.traverse((o) => { if (o.name.startsWith("held")) held.push(o); });
    const hands: Record<"L" | "R", Record<string, Object3D>> = { L: {}, R: {} };
    for (const side of ["L", "R"] as const) {   // every tool cloned onto each hand, shown one at a time
      const hand = gltf.scene.getObjectByName(`hand${side}`);
      if (!hand) continue;
      for (const t of TOOLS) {
        const src = toolsGltf.scene.getObjectByName(`tool-${t}`); if (!src) continue;
        const c = src.clone(); c.position.set(0, 0, 0); c.visible = false; c.traverse((o) => { o.castShadow = true; }); hand.add(c); hands[side][t] = c;
      }
    }
    const hip = rest.legL.clone().setX(0);   // the upper body bends about the hips
    return { parts, rest, held, hands, hip };
  }, [gltf, toolsGltf]);

  // Keyboard: WASD / arrows walk him while held; ignored while typing anywhere.
  useEffect(() => {
    const set = keys.current;
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase(), el = e.target as HTMLElement | null;
      if (!KEYS[k] || el?.closest?.("input, textarea, select, [contenteditable]")) return;
      set.add(k); e.preventDefault();
    };
    const up = (e: KeyboardEvent) => set.delete(e.key.toLowerCase());
    const blur = () => set.clear();
    window.addEventListener("keydown", down); window.addEventListener("keyup", up); window.addEventListener("blur", blur);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); window.removeEventListener("blur", blur); };
  }, []);

  useEffect(() => {   // dev-only handle for inspecting his state from the console
    if (process.env.NODE_ENV !== "production") Object.assign(window, { __khoi: st.current, __khoiNav: { findPath, standSpot } });
  }, []);

  useFrame((state, delta) => {
    const s = st.current, now = state.clock.elapsedTime, dt = Math.min(delta, 0.1);
    if (process.env.NODE_ENV !== "production") Object.assign(window, {   // dev-only: voxel → page pixels, for scripted click tests
      __khoiScreen: (x: number, y: number, z: number) => { const v = new Vector3(x * S, y * S, z * S).project(state.camera); return [(v.x + 1) / 2 * state.size.width + state.size.left, (1 - v.y) / 2 * state.size.height + state.size.top]; },
    });
    const goTo = (to: [number, number]) => { const p = findPath([s.x, s.z], to); if (p) { s.path = p; s.leg = 1; s.mode = "path"; } return !!p; };
    const leaveAuto = () => { if (s.mode === "auto") { const { pos } = walkAt(reducedMotion ? IDLE_T : khoiAt(s.clock).t); s.x = pos[0] / S; s.z = pos[2] / S; } };

    if (order && order.seq !== s.seenSeq) {   // a new order from a click
      s.seenSeq = order.seq; s.lastOrder = now; s.resuming = false; leaveAuto();
      if (order.kind === "go") { s.job = null; if (!goTo([order.x, order.z])) s.mode = "idle"; }
      else if (order.kind === "wave") { if (!(s.mode === "task" && s.job && s.job.task !== "wave")) { s.job = { task: "wave", t: 0, heading: FACE_CAMERA }; s.mode = "task"; s.path = []; } }
      else {
        const spot = standSpot(order.target, [s.x, s.z]);
        s.job = { task: order.task, t: -1, onDone: order.onDone, heading: spot.heading };
        if (Math.hypot(spot.x - s.x, spot.z - s.z) < 1) { s.mode = "task"; s.job.t = 0; }
        else if (!goTo([spot.x, spot.z])) { s.job = null; s.mode = "idle"; }
      }
    }

    let kx = 0, kz = 0;   // keyboard takes over from anything but a job in progress
    keys.current.forEach((k) => { const v = KEYS[k]; if (v) { kx += v[0]; kz += v[1]; } });
    if ((kx || kz) && !reducedMotion) {
      leaveAuto();
      s.mode = "key"; s.job = null; s.path = [];   // like a click elsewhere, walking off abandons the job unpaid
      s.lastOrder = now; s.resuming = false;
    } else if (s.mode === "key") s.mode = "idle";

    let walking = false, heading = s.heading;
    if (s.mode === "auto" && reducedMotion) {
      const { pos } = walkAt(IDLE_T); s.x = pos[0] / S; s.z = pos[2] / S; heading = FACE_CAMERA;
    } else if (s.mode === "auto") {
      s.clock += dt;
      const plan = khoiAt(s.clock), { pos, heading: h } = walkAt(plan.t);
      s.x = pos[0] / S; s.z = pos[2] / S; walking = plan.mode === "walk"; heading = walking ? h : -Math.PI / 2;
    } else if (s.mode === "key" && (kx || kz)) {
      const v = (SPEED * dt) / Math.hypot(kx, kz);
      // screen axes on the ground: right = (cos yaw, −sin yaw), away from the viewer = (−sin yaw, −cos yaw)
      const dx = (kx * Math.cos(YAW) - kz * Math.sin(YAW)) * v, dz = (-kx * Math.sin(YAW) - kz * Math.cos(YAW)) * v;
      [s.x, s.z] = slide([s.x, s.z], [dx, dz]); walking = true; heading = Math.atan2(dx, dz);
    } else if (s.mode === "path") {
      let step = SPEED * dt;
      while (step > 0 && s.leg < s.path.length) {
        const [tx, tz] = s.path[s.leg], d = Math.hypot(tx - s.x, tz - s.z);
        if (d > 1e-6) heading = Math.atan2(tx - s.x, tz - s.z);
        if (d <= step) { s.x = tx; s.z = tz; s.leg++; step -= d; } else { s.x += ((tx - s.x) / d) * step; s.z += ((tz - s.z) / d) * step; step = 0; }
      }
      walking = s.leg < s.path.length;
      if (!walking) {
        if (s.job && s.job.t < 0) { s.job.t = 0; s.mode = "task"; }
        else if (s.resuming) { s.mode = "auto"; s.clock = 0; s.resuming = false; }
        else s.mode = "idle";
      }
    }
    if (s.mode === "task" && s.job && s.job.t >= 0) {
      heading = turn(s.heading, s.job.heading, dt * 8);
      s.job.t += dt;
      if (s.job.t >= TASKS[s.job.task].seconds) { const done = s.job.onDone; s.job = null; s.mode = "idle"; s.lastOrder = now; done?.(); }
    }
    // back to his stroll from the barn door; not from an island, where he waits for the player (walking home on his own
    // dragged the camera away from the island you were looking at)
    if (s.mode === "idle" && !reducedMotion && now - s.lastOrder > RESUME_AFTER && zoneOf(s.x) === "main") {
      s.resuming = true; if (!goTo([WALK[0][0], WALK[0][2]])) { s.mode = "auto"; s.clock = 0; s.resuming = false; }
    }
    // ease every turn: the stroll used to snap up to 90° in one frame at its corners and when stopping for chores
    s.heading = reducedMotion || s.mode === "task" ? heading : turn(s.heading, heading, dt * 12);

    // pose
    const p: Pose | null = s.mode === "task" && s.job && s.job.t >= 0 ? pose(s.job.task, s.job.t) : null;
    const swing = walking ? Math.sin(now * 9) : 0;
    // ease the height: on the rice terraces he steps up and down a paddy at a time (a 21 cm wall), which would pop
    const gy = heightAt(s.x, s.z);
    s.y = Number.isNaN(s.y) || Math.abs(gy - s.y) > 6 ? gy : s.y + (gy - s.y) * Math.min(1, dt * 14);
    root.current.position.set(s.x * S, s.y * S + (walking ? Math.abs(swing) * 0.015 : 0) - (p?.drop ?? 0), s.z * S);
    const zone = zoneOf(s.x);
    if (zone !== s.zone) { s.zone = zone; onZone?.(zone); }
    root.current.rotation.y = s.heading;
    const { parts, rest, held, hands, hip } = rig;
    const hug = season === "thu" && !p?.hideHeld;   // autumn: arms round the pumpkin unless working
    const lean = p?.body?.x ?? 0;
    for (const n of PARTS) parts[n].rotation.set(0, 0, 0);
    for (const n of ["body", "head", "armL", "armR"] as const) {   // the upper body pivots together at the hips
      parts[n].position.copy(rest[n]).sub(hip).applyAxisAngle(X_AXIS, lean).add(hip);
      parts[n].rotation.x = lean;
    }
    parts.head.rotation.x += p?.head?.x ?? 0;
    parts.legL.rotation.x = p?.legL?.x ?? swing * 0.5; parts.legR.rotation.x = p?.legR?.x ?? -swing * 0.5;
    parts.armL.rotation.x += p?.armL?.x ?? (hug ? -0.75 : -swing * 0.3); parts.armL.rotation.z = p?.armL?.z ?? (hug ? 0.35 : 0);
    parts.armR.rotation.x += p?.armR?.x ?? (hug ? -0.75 : swing * 0.3); parts.armR.rotation.z = p?.armR?.z ?? (hug ? -0.35 : 0);
    for (const h of held) h.visible = !p?.hideHeld;
    for (const side of ["L", "R"] as const) for (const [name, o] of Object.entries(hands[side])) {
      o.visible = !!p && p.tool === name && p.hand === side;
      o.rotation.x = o.visible ? p?.toolX ?? 0 : 0;
    }
    fx.current = p?.fx ?? null; fxT.current = s.job?.t ?? 0;
  });

  return (
    <group ref={root}>
      <primitive object={gltf.scene} />
      <Effects kind={fx} t={fxT} />
      <Destination state={st} root={root} />
      {/* generous invisible hit area: a click makes him wave */}
      <mesh
        position={[0, 0.45, 0]}
        userData={{ clickable: true }}
        onClick={(e) => { e.stopPropagation(); onWave(); }}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = ""; }}
      >
        <boxGeometry args={[0.6, 0.95, 0.5]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

/** Where a click sent him: a pulsing ring on the ground until he gets there, so the order visibly registered. */
function Destination({ state, root }: { state: MutableRefObject<{ mode: Mode; path: [number, number][]; resuming: boolean }>; root: MutableRefObject<Group> }) {
  const ring = useRef<Group>(null!);
  useFrame(({ clock }) => {
    const s = state.current, g = ring.current, end = s.path[s.path.length - 1];
    g.visible = s.mode === "path" && !s.resuming && !!end;
    if (!g.visible || !end) return;
    // the ring lives in Khôi's group: undo his position/heading to place it in the world
    const r = root.current, wx = end[0] * S - r.position.x, wz = end[1] * S - r.position.z, c = Math.cos(-r.rotation.y), sn = Math.sin(-r.rotation.y);
    g.position.set(wx * c + wz * sn, heightAt(end[0], end[1]) * S - r.position.y + 0.01, -wx * sn + wz * c);
    g.scale.setScalar(1 + 0.15 * Math.sin(clock.elapsedTime * 6));
  });
  return (
    <group ref={ring} visible={false}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.07, 0.1, 28]} />
        <meshBasicMaterial color="#FFF3C4" transparent opacity={0.9} depthWrite={false} />
      </mesh>
    </group>
  );
}

function turn(from: number, to: number, k: number) {
  const d = Math.atan2(Math.sin(to - from), Math.cos(to - from));
  return from + d * Math.min(1, k);
}

/** Water from the can, grain from the hand, a splash where the line lands: a few small drops, no particle system. */
function Effects({ kind, t }: { kind: MutableRefObject<Pose["fx"] | null>; t: MutableRefObject<number> }) {
  const group = useRef<Group>(null!);
  const mat = useMemo(() => new MeshStandardMaterial({ color: "#BFE3F2", roughness: 0.2 }), []);
  const drops = useMemo(() => Array.from({ length: 12 }, (_, i) => ({ ph: i / 12, sx: Math.sin(i * 12.9898) * 0.03 })), []);
  useFrame(() => {
    const g = group.current, k = kind.current;
    g.visible = !!k;
    if (!k) return;
    mat.color.set(k === "grain" ? "#E8C66A" : "#BFE3F2");
    g.children.forEach((c, i) => {
      const d = drops[i], u = (t.current * 1.6 + d.ph) % 1;
      if (k === "water") c.position.set(0.05 + d.sx, 0.3 * (1 - u) - 0.02, 0.32 + u * 0.05);
      else if (k === "grain") c.position.set(0.15 + u * 0.35 + d.sx, 0.35 * (1 - u * u), 0.15 + d.sx * 4);
      else c.position.set(Math.cos(d.ph * 6.28) * 0.06 * (1 + u), 0.02 + 0.08 * Math.sin(u * Math.PI), 0.9 + Math.sin(d.ph * 6.28) * 0.06 * (1 + u));
    });
  });
  return (
    <group ref={group} visible={false}>
      {drops.map((_, i) => (
        <mesh key={i} material={mat}>
          <sphereGeometry args={[0.012, 6, 4]} />
        </mesh>
      ))}
    </group>
  );
}
