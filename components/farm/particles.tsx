"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferAttribute, BufferGeometry, CanvasTexture, DoubleSide, Object3D, type InstancedMesh, type Points, type PointsMaterial } from "three";
import { S } from "@/lib/farm/layout";
import { heightAt } from "@/lib/farm/nav";
import type { Season } from "@/lib/farm/time";

// a box a little bigger than the island, in world units; flakes land on the ground they fall onto
const X = [-1, 10.6], TOP = 3.6, Z = [-0.5, 7.7];
const WIND: [number, number] = [0.94, -0.34];   // the scene's one wind (Blender x/y → three x/z)
const groundAt = (x: number, z: number) => (x >= 0 && x <= 9.6 && z >= 0 && z <= 7.2 ? heightAt(x / S, z / S) * S : -1.5);   // off the island: fall past its edge

/** Falling petals or leaves (spring, autumn) or snow (winter). */
export default function Particles({ season, reducedMotion }: { season: Season; reducedMotion: boolean }) {
  if (reducedMotion || season === "ha") return null;
  return season === "dong" ? <Snow /> : <Leaves color={season === "xuan" ? "#F7B6CF" : "#E07A35"} big={season === "thu"} />;
}

/** Soft round flakes in two depths: small and slow far off, a few larger near ones; they sway, drift downwind and settle. */
function Snow() {
  const sprite = useMemo(() => {   // a soft disc, so flakes read as snow, not as squares of paper
    const c = document.createElement("canvas"); c.width = c.height = 32;
    const g = c.getContext("2d")!, grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, "rgba(255,255,255,1)"); grad.addColorStop(0.45, "rgba(255,255,255,0.85)"); grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad; g.fillRect(0, 0, 32, 32);
    return new CanvasTexture(c);
  }, []);
  return (
    <>
      <SnowLayer count={520} size={3} speed={[0.16, 0.26]} sprite={sprite} opacity={0.85} />
      <SnowLayer count={90} size={5.5} speed={[0.24, 0.34]} sprite={sprite} opacity={0.95} />
    </>
  );
}

function SnowLayer({ count, size, speed, sprite, opacity }: { count: number; size: number; speed: [number, number]; sprite: CanvasTexture; opacity: number }) {
  const ref = useRef<Points>(null!);
  const { geo, flakes } = useMemo(() => {
    const flakes = Array.from({ length: count }, () => ({
      x: X[0] + Math.random() * (X[1] - X[0]), y: Math.random() * TOP, z: Z[0] + Math.random() * (Z[1] - Z[0]),
      fall: speed[0] + Math.random() * (speed[1] - speed[0]), ph: Math.random() * Math.PI * 2, sway: 0.03 + Math.random() * 0.05,
    }));
    const geo = new BufferGeometry(); geo.setAttribute("position", new BufferAttribute(new Float32Array(count * 3), 3));
    return { geo, flakes };
  }, [count, speed]);
  const mat = useRef<PointsMaterial>(null!);
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime, dt = Math.min(delta, 0.1), pos = geo.attributes.position as BufferAttribute;
    mat.current.size = size * Math.min(1, state.size.height / 720);   // pixel-sized points: shrink with the view so flakes stay flake-sized
    flakes.forEach((f, i) => {
      f.y -= f.fall * dt;
      f.x += WIND[0] * 0.05 * dt; f.z += WIND[1] * 0.05 * dt;   // a light breeze carries the whole fall
      const x = f.x + Math.sin(t * 0.9 + f.ph) * f.sway, z = f.z + Math.cos(t * 0.7 + f.ph) * f.sway;
      if (f.y < groundAt(x, z) + 0.005 || f.x > X[1] || f.z < Z[0]) {   // settled or blown off: start again at the top, upwind
        f.y = TOP; f.x = X[0] + Math.random() * (X[1] - X[0]) - 0.4; f.z = Z[0] + Math.random() * (Z[1] - Z[0]) + 0.2;
      }
      pos.setXYZ(i, x, f.y, z);
    });
    pos.needsUpdate = true;
  });
  return (
    <points ref={ref} geometry={geo} frustumCulled={false}>
      {/* the farm camera is orthographic, so size is in screen pixels */}
      <pointsMaterial ref={mat} map={sprite} size={size} sizeAttenuation={false} transparent opacity={opacity} depthWrite={false} color="#FFFFFF" />
    </points>
  );
}

const LEAVES = 70;
/** Petals and leaves: small cards that flutter edge-on and flat as they fall, landing on the ground. */
function Leaves({ color, big }: { color: string; big: boolean }) {
  const mesh = useRef<InstancedMesh>(null!);
  const size = (big ? 1.6 : 1.1) * S;
  const flakes = useMemo(() => Array.from({ length: LEAVES }, () => ({
    x: X[0] + Math.random() * (X[1] - X[0]), y: Math.random() * TOP, z: Z[0] + Math.random() * (Z[1] - Z[0]),
    fall: 0.16 + Math.random() * 0.14, ph: Math.random() * Math.PI * 2,
  })), []);
  const dummy = useMemo(() => new Object3D(), []);
  useFrame((state, delta) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime, dt = Math.min(delta, 0.1);
    flakes.forEach((f, i) => {
      f.y -= f.fall * dt * (0.7 + 0.3 * Math.abs(Math.sin(t * 2 + f.ph)));   // flutter: slower when flat to the air
      f.x += WIND[0] * 0.08 * dt; f.z += WIND[1] * 0.08 * dt;
      const x = f.x + Math.sin(t * 1.3 + f.ph) * 0.12, z = f.z;
      if (f.y < groundAt(x, z) + 0.004 || f.x > X[1]) { f.y = TOP; f.x = X[0] + Math.random() * (X[1] - X[0]) - 0.5; }
      dummy.position.set(x, f.y, z);
      dummy.rotation.set(Math.sin(t * 2 + f.ph) * 1.2, t * 0.8 + f.ph, Math.cos(t * 1.7 + f.ph) * 0.6);
      dummy.updateMatrix(); mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, LEAVES]} frustumCulled={false}>
      <planeGeometry args={[size, size * 0.6]} />
      <meshStandardMaterial color={color} side={DoubleSide} roughness={0.6} />
    </instancedMesh>
  );
}
