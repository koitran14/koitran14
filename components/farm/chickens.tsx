"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Quaternion, Vector3, type Group } from "three";
import { COOP_DOOR, FLOCK, nextTarget, stepToward } from "@/lib/farm/chickens";
import { S } from "@/lib/farm/layout";
import { useFarmModel } from "./use-farm-model";

const START = ([[140, 100], [150, 104], [172, 96], [180, 92], [128, 96]] as [number, number][]).slice(0, FLOCK);
const SPEED = 6; // voxels per second
const TROUGH: [number, number][] = [[146, 94], [149, 95], [152, 95], [155, 94], [150.5, 97]];   // in front of the feed trough
// The hen faces +x; Blender's +y side axis is three's −z, and a positive turn about it tips her head down.
const SIDE = new Vector3(0, 0, -1), PECK = new Quaternion();

type Hen = { at: [number, number]; to: [number, number]; wait: number };

export default function Chickens({ lampsOn, reducedMotion, feedUntil = 0 }: { lampsOn: boolean; reducedMotion: boolean; feedUntil?: number }) {
  const gltf = useFarmModel("chicken");
  const models = useMemo(() => START.map(() => {
    const m = gltf.scene.clone();
    m.traverse((o) => { o.castShadow = true; });
    let body: Group | undefined;
    m.traverse((o) => { if (!body && o.name.startsWith("hen-body")) body = o as Group; });   // pitches to peck
    return { m, body, rest: body?.quaternion.clone() };
  }), [gltf]);
  const hens = useRef<Hen[]>(START.map((p) => ({ at: [...p] as [number, number], to: [...p] as [number, number], wait: Math.random() * 3 })));
  const refs = useRef<(Group | null)[]>([]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    hens.current.forEach((h, i) => {
      const g = refs.current[i];
      if (!g) return;
      if (!reducedMotion) {
        if (lampsOn) h.to = COOP_DOOR;                       // bedtime: everyone heads for the coop
        else if (Date.now() < feedUntil) { h.to = TROUGH[i % TROUGH.length]; h.wait = 1; }   // grain scattered: crowd the trough
        else if ((h.wait -= dt) <= 0 && h.at[0] === h.to[0] && h.at[1] === h.to[1]) {
          h.to = nextTarget(h.at, Math.random);
          h.wait = 3 + Math.random() * 3;
        }
        const before = h.at;
        h.at = stepToward(h.at, h.to, SPEED, dt);
        const moving = before[0] !== h.at[0] || before[1] !== h.at[1];
        if (moving) g.rotation.y = Math.atan2(-(h.to[1] - before[1]), h.to[0] - before[0]);   // +x towards the target
        g.position.y = moving ? Math.abs(Math.sin(t * 14 + i)) * 0.03 : 0;
        const { body, rest } = models[i];
        if (body && rest) {   // irregular peck bursts while standing
          const peck = moving ? 0 : Math.max(0, Math.sin(t * 2.6 + i * 1.7) + 0.6 * Math.sin(t * 0.9 + i) - 0.9) * 0.8;
          body.quaternion.copy(rest).multiply(PECK.setFromAxisAngle(SIDE, peck));
        }
      }
      g.position.x = h.at[0] * S; g.position.z = h.at[1] * S;
      // once at the door at night they're inside the coop
      g.visible = !(lampsOn && h.at[0] === COOP_DOOR[0] && h.at[1] === COOP_DOOR[1]);
    });
  });

  return (
    <>
      {models.map(({ m }, i) => (
        <group key={i} ref={(g) => { refs.current[i] = g; }}>
          <primitive object={m} />
          {/* a soft contact shadow: white hens on snow (and pale grass) need it to read at all */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]} renderOrder={1}>
            <circleGeometry args={[0.06, 20]} />
            <meshBasicMaterial color="#2A2420" transparent opacity={0.32} depthWrite={false} />
          </mesh>
        </group>
      ))}
    </>
  );
}
