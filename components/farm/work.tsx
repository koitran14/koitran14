"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Box3, Vector3, type Object3D } from "three";
import { stageOf, type Farm, type Target } from "@/lib/farm/farmwork";
import { S } from "@/lib/farm/layout";
import { BEDS, heightAt } from "@/lib/farm/nav";
import type { Season } from "@/lib/farm/time";
import { useFarmModel } from "./use-farm-model";

const BED_TOP = 2.2;
const CLICKABLE = { clickable: true };   // island.tsx lets clicks through to these   // voxels: the raised beds' soil surface

const pointer = {
  onPointerOver: (e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); document.body.style.cursor = "pointer"; },
  onPointerOut: () => { document.body.style.cursor = ""; },
};

/** Clickable farm work: the beds (their crops grow with the bed's stage), the well, the trough and the eggs. */
export default function Work({ season, farm, onTarget }: { season: Season; farm: Farm; onTarget: (t: Target) => void }) {
  const island = useFarmModel(`island-${season}`);
  const crops = useMemo(() => {   // each bed's crop node and the point it grows from
    return BEDS.map((_, i) => {
      const node = island.scene.getObjectByName(`crop-b${i}`) as Object3D | undefined;
      if (!node) return null;
      const box = new Box3().setFromObject(node), base = new Vector3((box.min.x + box.max.x) / 2, box.min.y, (box.min.z + box.max.z) / 2);
      return { node, base, rest: node.position.clone() };
    });
  }, [island]);

  const now = Date.now();
  const stages = BEDS.map((_, i) => stageOf(farm, i, now, season));
  const stagesRef = useRef(stages); stagesRef.current = stages;
  useEffect(() => () => { for (const c of crops) if (c) { c.node.visible = true; c.node.scale.setScalar(1); c.node.position.copy(c.rest); } }, [crops]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    crops.forEach((c, i) => {
      if (!c) return;
      const st = stagesRef.current[i];
      const s = st === "growing" ? 0.45 : st === "ripe" ? 1 : 0;   // sprouts, then the full crop (no pulsing: it read as plants dancing)
      c.node.visible = s > 0;
      c.node.scale.setScalar(Math.max(s, 1e-3));
      c.node.position.copy(c.rest).add(c.base.clone().multiplyScalar(1 - s));   // grow from the soil, not from the world origin
    });
  });

  return (
    <group>
      {BEDS.map(([x0, x1, z0, z1], i) => (
        <group key={i}>
          {stages[i] === "seeded" && [0, 1, 2, 3, 4].map((k) => (   // fresh furrow mounds where seed went in
            <mesh key={k} position={[(x0 + 2.7 + k * 3.4) * S, BED_TOP * S, ((z0 + z1) / 2) * S]} scale={[1, 0.35, 1]}>
              <sphereGeometry args={[0.035, 10, 6]} />
              <meshStandardMaterial color="#4A3022" roughness={1} />
            </mesh>
          ))}
          <mesh position={[((x0 + x1) / 2) * S, (BED_TOP + 2) * S, ((z0 + z1) / 2) * S]} userData={CLICKABLE} onClick={(e) => { e.stopPropagation(); onTarget({ kind: "bed", bed: i }); }} {...pointer}>
            <boxGeometry args={[(x1 - x0) * S, 4 * S, (z1 - z0) * S]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
        </group>
      ))}
      <mesh position={[115.5 * S, 8 * S, 117.5 * S]} userData={CLICKABLE} onClick={(e) => { e.stopPropagation(); onTarget({ kind: "well" }); }} {...pointer}>
        <cylinderGeometry args={[7 * S, 7 * S, 18 * S, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh position={[150.5 * S, 1.5 * S, 90.7 * S]} userData={CLICKABLE} onClick={(e) => { e.stopPropagation(); onTarget({ kind: "trough" }); }} {...pointer}>
        <boxGeometry args={[9 * S, 4 * S, 5 * S]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {farm.eggs.map((e) => (
        <group key={e.id} position={[e.x * S, heightAt(e.x, e.z) * S, e.z * S]}>
          <mesh position={[0, 0.02, 0]} scale={[0.85, 1.1, 0.85]} castShadow>
            <sphereGeometry args={[0.022, 14, 10]} />
            <meshStandardMaterial color="#F4E9D8" roughness={0.45} />
          </mesh>
          <mesh position={[0, 0.06, 0]} userData={CLICKABLE} onClick={(ev) => { ev.stopPropagation(); onTarget({ kind: "egg", id: e.id }); }} {...pointer}>
            <boxGeometry args={[0.18, 0.16, 0.18]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
