"use client";

import { useMemo } from "react";
import type { Mesh } from "three";
import type { Season } from "@/lib/farm/time";
import { useFarmModel } from "./use-farm-model";

export default function Island({ season }: { season: Season }) {
  const gltf = useFarmModel(`island-${season}`);
  useMemo(() => {
    gltf.scene.traverse((o) => {
      if ((o as Mesh).isMesh) { o.castShadow = true; o.receiveShadow = true; }
    });
  }, [gltf]);
  return <primitive object={gltf.scene} />;
}
