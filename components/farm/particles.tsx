"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Object3D, type InstancedMesh } from "three";
import { S } from "@/lib/farm/layout";
import type { Season } from "@/lib/farm/time";

const COUNT = 70;
const SIZE = 2 * S; // two voxels, matching the petals baked into the Blender renders
const COLOR: Record<Season, string | null> = { xuan: "#F7B6CF", ha: null, thu: "#EE8034", dong: "#FFFFFF" };
// a box a little bigger than the island, in world units
const X = [-1, 10.6], Y = [0.3, 3.6], Z = [-0.5, 7.7];

/** Falling petals, leaves or snow: one instanced mesh, drifting down and wrapping to the top. */
export default function Particles({ season, reducedMotion }: { season: Season; reducedMotion: boolean }) {
  const mesh = useRef<InstancedMesh>(null!);
  const color = COLOR[season];
  const flakes = useMemo(() => Array.from({ length: COUNT }, () => ({
    x: X[0] + Math.random() * (X[1] - X[0]), y: Y[0] + Math.random() * (Y[1] - Y[0]), z: Z[0] + Math.random() * (Z[1] - Z[0]),
    fall: 0.25 + Math.random() * 0.25, phase: Math.random() * Math.PI * 2,
  })), []);
  const dummy = useMemo(() => new Object3D(), []);

  useFrame((state, dt) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    flakes.forEach((f, i) => {
      f.y -= f.fall * dt;
      if (f.y < Y[0]) f.y = Y[1];
      dummy.position.set(f.x + Math.sin(t + f.phase) * 0.15, f.y, f.z);
      dummy.rotation.set(t + f.phase, t * 0.7, 0);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  if (!color || reducedMotion) return null;
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
      <boxGeometry args={[SIZE, SIZE, SIZE]} />
      <meshStandardMaterial color={color} />
    </instancedMesh>
  );
}
