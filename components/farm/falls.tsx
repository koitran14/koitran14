"use client";

import { useMemo } from "react";
import { BufferAttribute, BufferGeometry, DoubleSide, NormalBlending, ShaderMaterial, Vector3, type Mesh } from "three";

/** Daylight 0..1 for every water effect, set by the island each render. */
export const DAY = { value: 1 };

// value noise in GLSL: cheap, smooth, no texture
const NOISE = `
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}`;

/** A falling sheet of water, as the Blender fall shader draws it: glassy at the lip, whitening with air as it drops,
 *  streaks racing down (faster lower, as water accelerates), torn flickering edges, a soft foot.
 *  Fall UVs as three sees them: u across the sheet, v 0 at the lip and 1 at the foot (glTF flips Blender's v). */
export function fallMaterial(time: { value: number }) {
  return new ShaderMaterial({
    uniforms: { uTime: time, uDay: DAY },
    vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `${NOISE}
      uniform float uTime, uDay; varying vec2 vUv;
      void main() {
        float s = vUv.y, u = vUv.x;                       // s: 0 at the lip .. 1 at the foot
        float drop = s * s * 1.4 + s * 0.6;                 // distance fallen grows with the square of time: faster below
        float a1 = noise(vec2(u * 22.0, drop * 2.2 - uTime * 2.2));
        float a2 = noise(vec2(u * 55.0 + 7.0, drop * 4.5 - uTime * 3.6));
        float a3 = noise(vec2(u * 9.0 + 3.0, drop * 1.2 - uTime * 1.3));
        float streak = a1 * 0.5 + a2 * 0.3 + a3 * 0.2;      // long thin streaks: fine across, stretched along
        float air = smoothstep(0.0, 0.5, s);                // aerated white within the first half, as in the Blender render
        float froth = smoothstep(0.38, 0.72, streak + air * 0.5);
        vec3 glass = vec3(0.8, 0.88, 0.92), white = vec3(0.97, 0.99, 1.0);   // the lip as bright as the river above it
        vec3 col = mix(glass, white, clamp(max(froth, air * 0.85), 0.0, 1.0));
        col *= 0.9 + 0.16 * a2;                             // sparkle on the moving water
        col *= mix(vec3(0.22, 0.27, 0.4), vec3(1.0), uDay); // dusk to night
        // the sheet fills its notch wall to wall (wide torn sides showed the dark cut behind it), only the very edge flickers
        float tear = 0.02 + 0.04 * noise(vec2(s * 9.0 - uTime * 2.0, u * 3.0));
        float edge = smoothstep(0.0, tear, min(u, 1.0 - u));
        float foot = 1.0 - smoothstep(0.9, 1.0, s + 0.06 * (a3 - 0.5));     // runs into the pool, then the spray takes over
        float alpha = edge * foot * mix(0.82, 1.0, max(froth, air));
        gl_FragColor = vec4(col, alpha);
      }`,
    transparent: true, depthWrite: false, side: DoubleSide, blending: NormalBlending,
  });
}

/** Where a fall lands, for its spray: the foot of the sheet in world units and its width. */
export type Foot = { at: Vector3; width: number };
export function footOf(mesh: Mesh): Foot {
  mesh.updateWorldMatrix(true, false);
  const pos = mesh.geometry.attributes.position, v = new Vector3(), pts: Vector3[] = [];
  let minY = Infinity;
  for (let i = 0; i < pos.count; i++) { v.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld); pts.push(v.clone()); minY = Math.min(minY, v.y); }
  const low = pts.filter((p) => p.y < minY + 0.02), c = low.reduce((a, p) => a.add(p), new Vector3()).divideScalar(low.length);
  let w = 0; for (const p of low) w = Math.max(w, p.distanceTo(c) * 2);
  return { at: c, width: Math.max(0.08, w) };
}

/** Spray and mist where a fall lands: soft puffs rising and drifting, born again and again. GPU only. */
export function Spray({ foot, time, count = 110 }: { foot: Foot; time: { value: number }; count?: number }) {
  const { geo, mat } = useMemo(() => {
    const seed = new Float32Array(count * 3), pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) { seed[i * 3] = Math.random(); seed[i * 3 + 1] = Math.random() * 2 - 1; seed[i * 3 + 2] = Math.random(); }
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(pos, 3)); geo.setAttribute("seed", new BufferAttribute(seed, 3));
    geo.boundingSphere = null;
    const mat = new ShaderMaterial({
      uniforms: { uTime: time, uDay: DAY, uAt: { value: foot.at }, uW: { value: foot.width } },
      vertexShader: `attribute vec3 seed; uniform float uTime, uW; uniform vec3 uAt; varying float vA;
        void main() {
          float life = fract(uTime * (0.55 + 0.35 * seed.z) + seed.x);              // 0 born .. 1 gone
          // a white skirt of foam across the whole foot, rolling out over the pool so fall and stream read as one water
          vec3 p = uAt + vec3(seed.y * uW * 0.6, life * (0.04 + 0.07 * seed.z), (seed.z - 0.3) * 0.12 + life * 0.08);
          p.x += sin(uTime * 1.7 + seed.x * 6.3) * 0.012 * life;
          vA = smoothstep(0.0, 0.15, life) * (1.0 - smoothstep(0.45, 1.0, life));
          vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv;
          gl_PointSize = (8.0 + 22.0 * life) * (0.6 + 0.4 * seed.z);
        }`,
      fragmentShader: `uniform float uDay; varying float vA;
        void main() { vec2 d = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.0, length(d)) * vA * 0.42;
          gl_FragColor = vec4(mix(vec3(0.3, 0.34, 0.45), vec3(0.97, 0.99, 1.0), uDay), a); }`,
      transparent: true, depthWrite: false, blending: NormalBlending,
    });
    return { geo, mat };
  }, [count, foot, time]);
  return <points geometry={geo} material={mat} frustumCulled={false} />;
}

