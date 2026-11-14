"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Object3D } from "three";
import { khoiAt } from "@/lib/farm/khoi";
import { walkAt } from "@/lib/farm/layout";
import type { Season } from "@/lib/farm/time";
import { useFarmModel } from "./use-farm-model";

const SCALE = 0.55;
const WAVE_SECONDS = 2;
const FACE_CAMERA = (25 * Math.PI) / 180; // the camera sits 25° round toward +x
const FACE_FIELD = -Math.PI / 2;          // the field lies to the west of the gate
const IDLE_T = 0.35;                      // where he stands when motion is reduced

type Parts = Record<"head" | "body" | "armL" | "armR" | "legL" | "legR", Object3D>;

export default function Khoi({ season, reducedMotion }: { season: Season; reducedMotion: boolean }) {
  const gltf = useFarmModel(`khoi-${season}`);
  const root = useRef<Group>(null!);
  const clock = useRef(0);
  const waveUntil = useRef(0);
  const waveAsked = useRef(false); // set by a click, turned into a deadline on the next frame's clock
  const parts = useMemo(() => {
    gltf.scene.traverse((o) => { o.castShadow = true; });
    const get = (n: string) => gltf.scene.getObjectByName(n)!;
    return { head: get("head"), body: get("body"), armL: get("armL"), armR: get("armR"), legL: get("legL"), legR: get("legR") } as Parts;
  }, [gltf]);
  // Xuân's raised arm is armR, so he waves with it; the others wave the hand that isn't holding anything.
  const waveArm = season === "xuan" ? parts.armR : parts.armL;

  useFrame((state, delta) => {
    const now = state.clock.elapsedTime;
    if (waveAsked.current) { waveAsked.current = false; waveUntil.current = now + WAVE_SECONDS; }
    const waving = now < waveUntil.current;
    if (!waving && !reducedMotion) clock.current += delta;
    const plan = reducedMotion ? { mode: "idle" as const, t: IDLE_T } : khoiAt(clock.current);
    const { pos, heading } = walkAt(plan.t);
    const walking = plan.mode === "walk" && !waving;
    const swing = walking ? Math.sin(now * 8) : 0;

    root.current.position.set(pos[0], pos[1] + (walking ? Math.abs(swing) * 0.02 : 0), pos[2]);
    root.current.rotation.y = waving || plan.mode === "idle" ? FACE_CAMERA : plan.mode === "chore" ? FACE_FIELD : heading;

    for (const p of Object.values(parts)) p.rotation.set(0, 0, 0);
    parts.legL.rotation.x = swing * 0.5; parts.legR.rotation.x = -swing * 0.5;
    parts.armL.rotation.x = -swing * 0.3; parts.armR.rotation.x = swing * 0.3;

    if (plan.mode === "chore" && !waving) chore(season, parts, now);
    if (waving) {
      const side = waveArm === parts.armR ? 1 : -1;
      waveArm.rotation.z = side * ((season === "xuan" ? 0 : 2.4) + Math.sin(now * 10) * 0.4);
    }
  });

  return (
    <group ref={root} scale={SCALE}>
      <primitive object={gltf.scene} />
      {/* generous invisible hit area: at phone zoom the figure itself is smaller than a 44px target */}
      <mesh
        position={[0, 1.3, 0]}
        onClick={(e) => { e.stopPropagation(); waveAsked.current = true; }}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = ""; }}
      >
        <boxGeometry args={[3.2, 3.2, 2.2]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

/** The season's small chore at the field gate. */
function chore(season: Season, p: Parts, now: number) {
  const s = Math.sin(now * 3);
  if (season === "xuan") { p.body.rotation.x = 0.15; p.head.rotation.x = 0.15; p.armL.rotation.x = -0.6 + s * 0.15; }  // watering
  if (season === "ha") { p.armR.rotation.x = -0.4 - Math.max(0, s) * 0.6; p.head.rotation.x = 0.2; }                    // picking
  if (season === "thu") { p.armL.rotation.x = p.armR.rotation.x = -0.2 - Math.max(0, s) * 0.3; }                     // lifting
  if (season === "dong") { p.armL.rotation.x = p.armR.rotation.x = -0.5 + s * 0.2; }                                 // patting snow
}
