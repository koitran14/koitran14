"use client";

import { useLayoutEffect, useMemo, useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { arrivalPose, DROP, RISE, type Arrival } from "@/lib/farm/arrival";
import { AdditiveBlending, Box3, BufferAttribute, BufferGeometry, NormalBlending, ShaderMaterial, Vector3, type Group, type Matrix4, type Object3D } from "three";

export type { Arrival };

/** Wraps a model exported in place (world coordinates) so it can scale about its own base, and plays its arrival once. */
/** rest: kept at the inverse of the model's current placement while it moves, identity at rest, for shaders that paint
 *  by world position (the islands' water). */
export function Appear({ object, kind, play, rest, children }: { object: Object3D; kind: Arrival; play: boolean; rest?: { value: Matrix4 }; children: ReactNode }) {
  const { base, top, radius } = useMemo(() => {
    const b = new Box3().setFromObject(object), c = b.getCenter(new Vector3()), s = b.getSize(new Vector3());
    return { base: new Vector3(c.x, b.min.y, c.z), top: new Vector3(c.x, b.max.y - s.y * 0.15, c.z), radius: Math.max(0.15, Math.max(s.x, s.z) / 2) };
  }, [object]);
  const g = useRef<Group>(null!);
  const elapsed = useRef<number | null>(play ? -1 : null);
  const puffT = useRef({ value: -1 });
  const pose = (p: [number, number, number] | null) => {
    const [lift, sx, sy] = p ?? [0, 1, 1];
    g.current.position.set(base.x, base.y + lift, base.z); g.current.scale.set(sx, sy, sx);
  };
  // once, on mount: no flash at full size before the first frame (on every render it would snap a running arrival back)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => { pose(elapsed.current === null ? null : arrivalPose(kind, 0)); }, []);
  useFrame((_, delta) => {
    if (elapsed.current === null) return;
    // its own clock, at most 1/20 s a frame: the model's first frame compiles its shaders (a hitch of ~0.5 s), which on
    // the real clock swallowed the whole drop
    elapsed.current = Math.max(0, elapsed.current) + (elapsed.current < 0 ? 0 : Math.min(delta, 0.05));
    const t = elapsed.current, p = arrivalPose(kind, t);
    const at = kind === "island" ? RISE * 0.6 : DROP;   // dust as it lands; sparkle as the island comes up
    puffT.current.value = (t - at) / (kind === "island" ? 1.2 : 0.8);
    pose(p);
    if (rest) { if (p) { object.updateWorldMatrix(true, false); rest.value.copy(object.matrixWorld).invert(); } else rest.value.identity(); }
    if (!p && puffT.current.value >= 1) elapsed.current = null;
  });
  return (
    <>
      <group ref={g}><group position={[-base.x, -base.y, -base.z]}>{children}</group></group>
      {elapsed.current !== null && <Puff at={kind === "island" ? top : base} radius={radius} t={puffT.current} dust={kind === "item"} />}
    </>
  );
}

/** A ring of dust thrown out at the base, and gold sparks drifting up; t runs 0..1 (hidden outside). GPU only. */
function Puff({ at, radius, t, dust }: { at: Vector3; radius: number; t: { value: number }; dust: boolean }) {
  const parts = useMemo(() => {
    const make = (n: number, sparks: boolean) => {
      const seed = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) seed.set([(i / n) * Math.PI * 2 + Math.random() * 0.3, Math.random(), Math.random()], i * 3);
      const geo = new BufferGeometry();
      geo.setAttribute("position", new BufferAttribute(new Float32Array(n * 3), 3)); geo.setAttribute("seed", new BufferAttribute(seed, 3));
      const mat = new ShaderMaterial({
        uniforms: { uT: t, uAt: { value: at }, uR: { value: radius } },
        vertexShader: `attribute vec3 seed; uniform float uT, uR; uniform vec3 uAt; varying float vA;
          void main() {
            float k = clamp(uT, 0.0, 1.0), e = 1.0 - pow(1.0 - k, 3.0);
            vec3 dir = vec3(cos(seed.x), 0.0, sin(seed.x));
            ${sparks
              ? `vec3 p = uAt + dir * uR * (0.2 + 0.9 * seed.y) * e + vec3(0.0, (0.15 + 0.5 * seed.z) * e * uR, 0.0);
                 vA = (uT > 0.0 && uT < 1.0 ? 1.0 : 0.0) * (1.0 - k) * (0.5 + 0.5 * sin(uT * 30.0 + seed.y * 20.0));
                 gl_PointSize = 5.0 + 5.0 * seed.z;`
              : `vec3 p = uAt + dir * uR * (0.75 + 0.6 * e + 0.15 * seed.y) + vec3(0.0, 0.03 + 0.12 * e * seed.z, 0.0);
                 vA = (uT > 0.0 && uT < 1.0 ? 1.0 : 0.0) * pow(1.0 - k, 1.5) * 0.5;
                 gl_PointSize = (14.0 + 16.0 * seed.z) * (0.7 + 0.6 * e);`}
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }`,
        fragmentShader: `varying float vA;
          void main() { float a = smoothstep(0.5, 0.0, length(gl_PointCoord - 0.5)) * vA;
            gl_FragColor = vec4(${sparks ? "1.0, 0.9, 0.6" : "0.93, 0.88, 0.8"}, a); }`,
        transparent: true, depthWrite: false, blending: sparks ? AdditiveBlending : NormalBlending,
      });
      return { geo, mat };
    };
    return dust ? [make(40, false), make(14, true)] : [make(36, true)];
  }, [at, radius, t, dust]);
  return <>{parts.map((p, i) => <points key={i} geometry={p.geo} material={p.mat} frustumCulled={false} />)}</>;
}
