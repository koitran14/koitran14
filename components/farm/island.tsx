"use client";

import { useEffect, useMemo } from "react";
import type { Mesh, MeshStandardMaterial } from "three";
import type { Season } from "@/lib/farm/time";
import { useFarmModel } from "./use-farm-model";

// Material names are the voxel hex colours (tools/voxel): barn windows and lamp heads glow at night.
const GLOW = new Set(["#FFE9A8", "#FFF1C2"]);

export default function Island({ season, lampsOn }: { season: Season; lampsOn: boolean }) {
  const gltf = useFarmModel(`island-${season}`);
  const glowing = useMemo(() => {
    const mats: MeshStandardMaterial[] = [];
    gltf.scene.traverse((o) => {
      const mesh = o as Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true; mesh.receiveShadow = true;
      for (const m of ([] as MeshStandardMaterial[]).concat(mesh.material as MeshStandardMaterial)) if (GLOW.has(m.name)) mats.push(m);
    });
    return mats;
  }, [gltf]);

  useEffect(() => {
    for (const m of glowing) { m.emissive.set(lampsOn ? "#FFB84A" : "#000000"); m.emissiveIntensity = lampsOn ? 1.2 : 0; }
  }, [glowing, lampsOn]);

  return (
    <>
      <primitive object={gltf.scene} />
      {/* warm spill from the barn windows at night */}
      {lampsOn && <pointLight position={[1.2, 1.5, 2.3]} color="#FFC870" intensity={3} distance={5} decay={1.5} />}
    </>
  );
}
