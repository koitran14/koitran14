"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { AdditiveBlending, BufferAttribute, BufferGeometry, PlaneGeometry, ShaderMaterial, Vector2, Vector3, type Material, type MeshStandardMaterial } from "three";
import { CAMERA, S } from "@/lib/farm/layout";
import { daylight, type Season } from "@/lib/farm/time";
import { sunDirection } from "./sky";

/** How strongly the sun rims everything right now (0 at night, most at golden hours); set by <Sunlight>. */
export const SUNLIT = { value: 0 };

/** Sunlight catching the models: a golden rim on every lit surface turned away from the viewer, strongest where the
 *  sun stands behind the object (as at 3 pm, when it sits beyond the island). Light on the assets, not a screen layer.
 *  Layers over any patch the material already has (grass, leaves). */
export function sunRim(m: Material) {
  const std = m as MeshStandardMaterial;
  if (!std.isMeshStandardMaterial || std.userData.sunRim) return;
  std.userData.sunRim = true;
  const prev = std.onBeforeCompile.bind(std), prevKey = std.customProgramCacheKey.bind(std);
  std.onBeforeCompile = (sh, r) => {
    prev(sh, r);
    sh.uniforms.uRim = SUNLIT;
    const foliage = !!sh.uniforms.uTrans;   // leaves and grass: thin, the sun shines through them
    sh.fragmentShader = "uniform float uRim;\n" + sh.fragmentShader.replace("#include <lights_fragment_end>", `#include <lights_fragment_end>
      #if NUM_DIR_LIGHTS > 0
      { // only true silhouettes: the camera looks down 33 degrees, so flat ground is already well off-axis
        float edge = smoothstep(0.5, 0.9, 1.0 - saturate(dot(normal, geometryViewDir)));
        float lit = saturate(dot(normal, directionalLights[0].direction) + 0.25);           // the sun's side, not the shade
        float behind = saturate(dot(-geometryViewDir, directionalLights[0].direction));    // the sun beyond the object
        reflectedLight.directDiffuse += directionalLights[0].color * mix(diffuseColor.rgb, vec3(1.0), 0.6) * edge * lit * (0.25 + 0.75 * behind) * uRim;
        ${foliage ? "reflectedLight.directDiffuse += directionalLights[0].color * diffuseColor.rgb * vec3(1.15, 1.0, 0.7) * (0.4 + 0.6 * behind) * 1.1 * uRim;" : ""}   // leaves and blades glow golden in the sun (at 3 pm it stands ~66 degrees off the line of sight)
      }
      #endif`);
  };
  std.customProgramCacheKey = () => `${prevKey()}|sun-rim`;
  std.needsUpdate = true;
}

const TO_CAMERA = (() => { const y = (CAMERA.yawDeg * Math.PI) / 180, p = (CAMERA.pitchDeg * Math.PI) / 180; return new Vector3(Math.sin(y) * Math.cos(p), Math.sin(p), Math.cos(y) * Math.cos(p)); })();
const WARM = "vec3(1.0, 0.86, 0.62)";   // additive blending scales colour by alpha itself: write colour, not colour × alpha
const NOISE = `
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y); }`;

/** Sunlight pouring in: soft rays fanning from where the sun stands on screen (it follows the real sun for the hour and
 *  season), a warm haze on that side, both strongest when the sun is low, gone at night or with the sun behind the
 *  viewer; dust drifting in the light over the islands. One full-screen additive pass and a few hundred points.
 *  (World-space beams were tried first: with the sun behind the island they stood up like spotlights.) */
export default function Sunlight({ hour, season, reducedMotion }: { hour: number; season: Season; reducedMotion: boolean }) {
  const { day } = daylight(hour);
  const sun = useMemo(() => sunDirection(hour, season), [hour, season]);
  const el = Math.asin(sun.y) * (180 / Math.PI);
  const golden = 1 - Math.min(1, Math.max(0, (el - 8) / 40));      // low sun: long warm rays
  const facing = Math.min(1, Math.max(0, 0.4 - sun.dot(TO_CAMERA)) / 0.6);   // rays only with the sun ahead of the viewer
  const strength = day * (0.4 + 0.6 * golden) * (season === "dong" ? 0.75 : 1);
  const u = useRef({ uTime: { value: 0 }, uStr: { value: strength }, uRays: { value: facing }, uSun: { value: new Vector2(0, 1.4) }, uAspect: { value: 1 } }).current;
  u.uStr.value = strength; u.uRays.value = facing;
  SUNLIT.value = strength;
  const size = useThree((s) => s.size);

  const rays = useMemo(() => new ShaderMaterial({
    uniforms: u,
    vertexShader: `varying vec2 vNdc; void main() { vNdc = position.xy * 2.0; gl_Position = vec4(position.xy * 2.0, 0.0, 1.0); }`,
    fragmentShader: `${NOISE}
      uniform float uTime, uStr, uRays, uAspect; uniform vec2 uSun; varying vec2 vNdc;
      void main() {
        vec2 d = (vNdc - uSun) * vec2(uAspect, 1.0);
        float r = length(d), ang = atan(d.y, d.x);
        // rays: angular noise, a few broad and many fine, drifting slowly
        float broad = noise(vec2(ang * 7.0, uTime * 0.05)), fine = noise(vec2(ang * 23.0 + 5.0, uTime * 0.08));
        float ray = pow(broad, 2.2) * 0.65 + pow(fine, 3.0) * 0.55;
        float reach = exp(-r * 0.55);                  // long rays, fading across the scene
        float haze = exp(-r * 1.4);                    // warm glow on the sun's side
        float a = (ray * reach * 0.16 * uRays + haze * 0.2) * uStr;   // a light haze: the sunlight itself is on the models (sunRim)
        gl_FragColor = vec4(${WARM}, a);
      }`,
    transparent: true, depthTest: false, depthWrite: false, blending: AdditiveBlending, toneMapped: false,
  }), [u]);

  // dust: specks drifting in the sunny air over the three islands, twinkling as they turn in the light
  const dust = useMemo(() => {
    const n = 420, pos = new Float32Array(n * 3), seed = new Float32Array(n);
    const areas = [[-200, -70, -10, 90, 14], [0, 192, 0, 144, 0], [262, 392, 0, 100, 14]];
    for (let i = 0; i < n; i++) {
      const [x0, x1, z0, z1, g] = areas[i % 3];
      pos.set([(x0 + Math.random() * (x1 - x0)) * S, (g + 6 + Math.random() * 34) * S, (z0 + Math.random() * (z1 - z0)) * S], i * 3); seed[i] = Math.random();
    }
    const geo = new BufferGeometry(); geo.setAttribute("position", new BufferAttribute(pos, 3)); geo.setAttribute("seed", new BufferAttribute(seed, 1));
    const mat = new ShaderMaterial({
      uniforms: u,
      vertexShader: `attribute float seed; uniform float uTime; varying float vTw;
        void main() {
          vec3 p = position + vec3(sin(uTime * 0.21 + seed * 17.0), sin(uTime * 0.17 + seed * 11.0) * 0.5, cos(uTime * 0.19 + seed * 13.0)) * 0.08;
          vTw = pow(0.5 + 0.5 * sin(uTime * (0.9 + seed) + seed * 40.0), 4.0);
          vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = 2.0 + 2.5 * seed;
        }`,
      fragmentShader: `uniform float uStr; varying float vTw;
        void main() { float a = smoothstep(0.5, 0.0, length(gl_PointCoord - 0.5)) * vTw * uStr * 0.8; gl_FragColor = vec4(${WARM}, a); }`,
      transparent: true, depthWrite: false, blending: AdditiveBlending, toneMapped: false,
    });
    return { geo, mat };
  }, [u]);

  const quad = useMemo(() => new PlaneGeometry(1, 1), []);
  const far = useMemo(() => new Vector3(), []);
  useFrame(({ camera, clock }) => {
    u.uTime.value = reducedMotion ? 0 : clock.elapsedTime;
    u.uAspect.value = size.width / size.height;
    // the sun's place on screen: an orthographic view has no vanishing point, so take only the direction the sun lies
    // in on screen and stand it just beyond that edge of the frame
    const centre = far.copy(camera.position).addScaledVector(TO_CAMERA, -30);
    const a = centre.clone().project(camera), b = centre.addScaledVector(sun, 1).project(camera);
    const dx = b.x - a.x, dy = b.y - a.y, k = 1.2 / Math.max(Math.abs(dx), Math.abs(dy), 1e-6);
    u.uSun.value.set(dx * k, dy * k);
  });

  if (strength < 0.02) { SUNLIT.value = 0; return null; }
  return (
    <>
      <mesh geometry={quad} material={rays} frustumCulled={false} renderOrder={20} />
      <points geometry={dust.geo} material={dust.mat} frustumCulled={false} renderOrder={6} />
    </>
  );
}
