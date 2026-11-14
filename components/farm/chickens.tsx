"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { COOP_DOOR, FLOCK, nextTarget, stepToward } from "@/lib/farm/chickens";
import { S } from "@/lib/farm/layout";
import { useFarmModel } from "./use-farm-model";

const START = ([[140, 100], [150, 104], [172, 96], [180, 92], [128, 96]] as [number, number][]).slice(0, FLOCK);
const SPEED = 6; // voxels per second

type Hen = { at: [number, number]; to: [number, number]; wait: number };

export default function Chickens({ lampsOn, reducedMotion }: { lampsOn: boolean; reducedMotion: boolean }) {
  const gltf = useFarmModel("chicken");
  const models = useMemo(() => START.map(() => {
    const m = gltf.scene.clone();
    m.traverse((o) => { o.castShadow = true; });
    return m;
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
        else if ((h.wait -= dt) <= 0 && h.at[0] === h.to[0] && h.at[1] === h.to[1]) {
          h.to = nextTarget(h.at, Math.random);
          h.wait = 3 + Math.random() * 3;
        }
        const before = h.at;
        h.at = stepToward(h.at, h.to, SPEED, dt);
        const moving = before[0] !== h.at[0] || before[1] !== h.at[1];
        if (moving) g.rotation.y = Math.atan2(h.to[0] - before[0], h.to[1] - before[1]);
        g.position.y = moving ? Math.abs(Math.sin(t * 14 + i)) * 0.03 : 0;
      }
      g.position.x = h.at[0] * S; g.position.z = h.at[1] * S;
      // once at the door at night they're inside the coop
      g.visible = !(lampsOn && h.at[0] === COOP_DOOR[0] && h.at[1] === COOP_DOOR[1]);
    });
  });

  return (
    <>
      {models.map((m, i) => (
        <group key={i} ref={(g) => { refs.current[i] = g; }}>
          <primitive object={m} />
        </group>
      ))}
    </>
  );
}
