"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { S } from "@/lib/farm/layout";
import {
  CanvasTexture, Color, DoubleSide, Euler, Matrix4, MeshPhysicalMaterial, Quaternion, RepeatWrapping, SRGBColorSpace, Vector2, Vector3,
  InstancedMesh, Mesh, type BufferGeometry, type Material, type MeshStandardMaterial, type Object3D, type WebGLProgramParametersWithUniforms,
} from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { blenderFrame, blenderToThree, compileDriver } from "@/lib/farm/drivers";
import type { Season } from "@/lib/farm/time";
import { useFarmModel } from "./use-farm-model";

/** The wind every moving thing shares (Blender WIND, world x/y), in three's axes. */
const WIND = new Vector3(...blenderToThree([0.94, 0.34, 0])).normalize();
const WATER: Record<Season, string> = { xuan: "#7DB7C6", ha: "#6FB0C4", thu: "#7FA9B4", dong: "#6E98A6" };   // winter: cold but light, not a black gap in the snow

type Driven = { slow: boolean; node: Object3D; loc: (((f: number) => number) | null)[]; rot: (((f: number) => number) | null)[]; restPos: Vector3; restQuat: Quaternion; restLoc: number[]; restRot: number[] };

// Blender world → three world as a matrix (x, y, z) -> (x, z, -y); conjugating a Blender rotation by it gives the three one.
const B2T = new Matrix4().set(1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1);
const T2B = B2T.clone().invert();
const tmpM = new Matrix4(), tmpM2 = new Matrix4(), tmpE = new Euler();

function readDriven(root: Object3D): Driven[] {
  const out: Driven[] = [];
  root.traverse((node) => {
    const x = node.userData as Record<string, unknown>;
    const pick = (path: string) => [0, 1, 2].map((i) => (typeof x[`drv:${path}:${i}`] === "string" ? compileDriver(x[`drv:${path}:${i}`] as string) : null));
    const loc = pick("location"), rot = pick("rotation_euler");
    if (!loc.some(Boolean) && !rot.some(Boolean)) return;
    const nums = (k: string) => String(x[k] ?? "0,0,0").split(",").map(Number);
    out.push({ slow: node.name.startsWith("sway"), node, loc, rot, restPos: node.position.clone(), restQuat: node.quaternion.clone(), restLoc: nums("rest_loc"), restRot: nums("rest_rot") });
  });
  return out;
}

function applyDrivers(list: Driven[], frame: number) {
  for (const d of list) {
    if (d.loc.some(Boolean)) {
      const delta = d.loc.map((f, i) => (f ? f(frame) - d.restLoc[i] : 0)) as [number, number, number];
      const [x, y, z] = blenderToThree(delta);
      d.node.position.set(d.restPos.x + x, d.restPos.y + y, d.restPos.z + z);
    }
    if (d.rot.some(Boolean)) {
      // tree crowns: Blender's ~1 s sway reads as shaking in a live view; slower and smaller here, leaves tremble on their own
      const fr = d.slow ? frame * 0.4 : frame, k = d.slow ? 0.6 : 1;
      const e = d.rot.map((f, i) => (f ? d.restRot[i] + (f(fr) - d.restRot[i]) * k : d.restRot[i]));
      // Blender delta R(e)·R(rest)⁻¹, expressed in three space, applied on top of the rest orientation
      tmpM.makeRotationFromEuler(tmpE.set(e[0], e[1], e[2], "XYZ"));
      tmpM2.makeRotationFromEuler(tmpE.set(d.restRot[0], d.restRot[1], d.restRot[2], "XYZ")).invert();
      tmpM.multiply(tmpM2).premultiply(B2T).multiply(T2B);
      d.node.quaternion.setFromRotationMatrix(tmpM).multiply(d.restQuat);
    }
  }
}

// Thin leaves and blades let the sun through (Blender: subsurface + translucent cards). Without it the back-lit
// foliage the design relies on turns dark: add light that grows as the sun sits behind the surface, seen from the camera.
const TRANSLUCENT = `#include <lights_fragment_end>
  #if NUM_DIR_LIGHTS > 0
  { float tr = max(0.0, dot(geometryViewDir, -directionalLights[0].direction));
    reflectedLight.directDiffuse += diffuseColor.rgb * directionalLights[0].color * (0.12 + 0.75 * tr * tr) * uTrans; }
  #endif`;

/** Grass: tips lean a little downwind in gusts that travel across the island, each blade fluttering on its own phase;
 *  roots (weight 0) stay put. Plus the translucency above. GPU only. */
function grassShader(m: MeshStandardMaterial, time: { value: number }) {
  m.vertexColors = false;   // COLOR_0 carries the blade-height weight, not a tint
  m.onBeforeCompile = (shader: WebGLProgramParametersWithUniforms) => {
    shader.uniforms.uTime = time; shader.uniforms.uWind = { value: WIND }; shader.uniforms.uTrans = { value: 0.55 };   // less than leaves: the design's lawn reads straw, not lime
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nattribute vec4 windW;\nuniform float uTime;\nuniform vec3 uWind;\nvarying float vH;")
      .replace("#include <begin_vertex>", `#include <begin_vertex>
        vH = windW.r;
        float w = windW.r * windW.r;
        float ph = fract(sin(dot(floor(position.xz * 40.0), vec2(12.9898, 78.233))) * 43758.5453) * 6.2832;   // one phase per blade
        vec2 p = transformed.xz - uWind.xz * uTime * 0.35;
        float g = 0.5 + 0.3 * sin(p.x * 4.3 + p.y * 2.1) + 0.2 * sin(p.x * 1.7 - p.y * 3.3 + 1.7);   // a gust rolling across
        vec3 side = vec3(-uWind.z, 0.0, uWind.x);
        transformed += uWind * (0.012 * w * (0.4 + g)) + side * (0.005 * w * sin(uTime * 4.1 + ph)) + uWind * (0.004 * w * sin(uTime * 5.3 + ph * 1.7));`);
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nuniform float uTrans;\nvarying float vH;")
      .replace("#include <color_fragment>", `#include <color_fragment>
        diffuseColor.rgb *= mix(0.6, 1.05, vH);`)   // a little darker at the root, as the design's blade shading
      .replace("#include <lights_fragment_end>", TRANSLUCENT);
  };
  m.customProgramCacheKey = () => "farm-grass";
}

/** Leaf and flower cards: translucent, and each card trembles on its own (crowns no longer move as one rigid blob). */
function leafShader(m: MeshStandardMaterial, time: { value: number }) {
  m.onBeforeCompile = (shader: WebGLProgramParametersWithUniforms) => {
    shader.uniforms.uTime = time; shader.uniforms.uTrans = { value: 0.85 };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nuniform float uTime;")
      .replace("#include <begin_vertex>", `#include <begin_vertex>
        float lp = fract(sin(dot(floor(position * 60.0), vec3(12.9898, 78.233, 37.719))) * 43758.5453) * 6.2832;   // one phase per card
        transformed += vec3(sin(uTime * 1.6 + lp), sin(uTime * 2.1 + lp * 1.3) * 0.5, cos(uTime * 1.3 + lp)) * 0.0008;   // a faint, slow tremble per card`);
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nuniform float uTrans;")
      .replace("#include <lights_fragment_end>", TRANSLUCENT);
  };
  m.customProgramCacheKey = () => "farm-leaf";
}
const LEAVES = ["blossom", "leaf", "evergreen", "flowerbush", "ivy", "lotus-leaf", "rice"];

/** Grass ships thinned to a fifth of the design's blades to fit 3 MB; drawing the same blades three more times with small
 *  offsets restores the carpet on the GPU without a byte more to download. */
const GRASS_COPIES: [number, number][] = [[0, 0], [0.021, 0.012], [-0.016, 0.024], [0.011, -0.027]];

/** Roof shingles. The baked roof swatches lost the rows (object-space boards) and came out as moss blotches on near-black,
 *  which read as plaid. Roofs pitch under 45°, so the world top projection runs these rows parallel to every ridge. */
const shingleCache = new Map<string, CanvasTexture>();
function shingles(base: string) {
  const hit = shingleCache.get(base); if (hit) return hit;
  const c = document.createElement("canvas"); c.width = c.height = 256;
  const g = c.getContext("2d")!, col = new Color(base);
  const shade = (k: number) => `rgb(${Math.round(Math.min(255, col.r * 255 * k))},${Math.round(Math.min(255, col.g * 255 * k))},${Math.round(Math.min(255, col.b * 255 * k))})`;
  g.fillStyle = shade(0.55); g.fillRect(0, 0, 256, 256);
  for (let row = 0; row < 8; row++) {   // 8 courses per tile, tabs offset every other course, each tab a slightly different tone
    const y = row * 32, off = row % 2 ? 16 : 0;
    for (let x = -32; x < 256; x += 32) {
      const k = 0.85 + ((Math.sin(row * 12.9 + x * 0.73) + 1) / 2) * 0.3;
      g.fillStyle = shade(k); g.fillRect(x + off + 1, y + 1, 30, 29);
      g.fillStyle = shade(k * 0.8); g.fillRect(x + off + 1, y + 24, 30, 6);   // the shadowed lower lip of each tab
    }
  }
  const t = new CanvasTexture(c); t.wrapS = t.wrapT = RepeatWrapping; t.repeat.set(8, 8); t.colorSpace = SRGBColorSpace;   // 4 m tile → 6 cm courses
  shingleCache.set(base, t); return t;
}

/** A tileable ripple normal map (whole-number wave counts so it wraps), for the stream's moving surface. */
function rippleTexture() {
  const N = 256, c = document.createElement("canvas"); c.width = c.height = N;
  const g = c.getContext("2d")!, img = g.createImageData(N, N);
  const waves = [[3, 1, 0.0], [1, 4, 1.3], [5, -2, 2.1], [-2, 6, 0.7], [7, 3, 4.0], [-6, 5, 2.9], [9, -7, 1.1], [4, 11, 5.2]];
  const h = (x: number, y: number) => waves.reduce((a, [kx, ky, ph], i) => a + Math.sin(((kx * x + ky * y) / N) * Math.PI * 2 + ph) / (1 + i * 0.6), 0);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const dx = h(x + 1, y) - h(x - 1, y), dy = h(x, y + 1) - h(x, y - 1), len = Math.hypot(dx, dy, 1.6), o = (y * N + x) * 4;
    img.data[o] = 128 + (-dx / len) * 127; img.data[o + 1] = 128 + (-dy / len) * 127; img.data[o + 2] = 128 + (1.6 / len) * 127; img.data[o + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  const t = new CanvasTexture(c); t.wrapS = t.wrapT = RepeatWrapping; t.repeat.set(7, 7); return t;
}

/** Falling-water streaks, drawn once and scrolled: a pale see-through body with bright foam streaks (colour + alpha). */
function streakTexture() {
  const streaks = Array.from({ length: 70 }, () => ({ x: Math.random() * 64, w: 1 + Math.random() * 3, y: Math.random() * 256, h: 30 + Math.random() * 120, a: 0.35 + Math.random() * 0.6 }));
  const draw = (bg: string, fg: (a: number) => string) => {
    const c = document.createElement("canvas"); c.width = 64; c.height = 256;
    const g = c.getContext("2d")!; g.fillStyle = bg; g.fillRect(0, 0, 64, 256);
    for (const k of streaks) for (const dy of [0, -256]) { g.fillStyle = fg(k.a); g.fillRect(k.x, k.y + dy, k.w, k.h); }   // wrap so the scroll never seams
    const t = new CanvasTexture(c); t.wrapS = t.wrapT = RepeatWrapping; return t;
  };
  return { map: draw("rgb(176,214,228)", (a) => `rgba(255,255,255,${a})`), alpha: draw("rgb(115,115,115)", (a) => `rgba(255,255,255,${a})`) };   // body ~45% opaque, foam near solid
}

/** Turn a Blender export into the live look: water, falls, wind in grass and leaves, roof tiles, lifted cliffs.
 *  Shared by the island and every unlock model, so an unlocked item matches the ground it stands on. */
function dress(root: Object3D, season: Season, time: { value: number }, ripples: CanvasTexture) {
  const glowing: MeshStandardMaterial[] = [], falls: CanvasTexture[] = [];
  const seen = new Set<Material>();
  root.traverse((o) => {
      const mesh = o as Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = !mesh.name.startsWith("grass"); mesh.receiveShadow = true;
      // the named part right under the file root (or under an unlock-<id> group)
      const top = (() => { let n: Object3D = mesh; while (n.parent && n.parent !== root && !n.parent.name.startsWith("unlock-")) n = n.parent; return n.name; })();
      const mat0 = ([] as Material[]).concat(mesh.material)[0]?.name ?? "";
      if (top.startsWith("water-surface") || /^(pond|paddy-water)#/.test(mat0)) {
        mesh.material = new MeshPhysicalMaterial({
          // see-through by blending, not transmission: transmission re-renders the whole scene every frame (21 ms → 5 ms a frame)
          // Blender's stream reads as sunlit sheen, not blue paint: a darker body that mostly reflects, rough enough that
          // the rippled normals spread the sky and sun into a broad white glare (matched side by side, autumn 15:00)
          color: new Color(WATER[season]).multiplyScalar(0.58), roughness: 0.3, transparent: true, opacity: 0.85, depthWrite: false,
          normalMap: ripples, normalScale: new Vector2(1.2, 1.2), envMapIntensity: 3.6,
        });
        mesh.castShadow = false; return;
      }
      if (/^glasshouse#/.test(mat0)) {
        mesh.material = new MeshPhysicalMaterial({ color: "#EAF6F2", roughness: 0.08, transparent: true, opacity: 0.28, depthWrite: false, envMapIntensity: 1.4 });   // blended glass, as the water
        mesh.castShadow = false; return;
      }
      if (top.startsWith("fall-")) {
        const tex = streakTexture(); falls.push(tex.map, tex.alpha);
        const m = (mesh.material as MeshStandardMaterial).clone();
        Object.assign(m, { map: tex.map, alphaMap: tex.alpha, transparent: true, side: DoubleSide, depthWrite: false, roughness: 0.2 });
        mesh.material = m; mesh.castShadow = false; return;
      }
      for (const m of ([] as MeshStandardMaterial[]).concat(mesh.material as MeshStandardMaterial)) {
        if (seen.has(m)) continue; seen.add(m);
        if (m.name.endsWith("#emit")) glowing.push(m);
        if (top.startsWith("grass")) grassShader(m, time);
        else if (LEAVES.includes(m.name.split("#")[0])) leafShader(m, time);
        else if (m.name.startsWith("core-")) m.color.multiplyScalar(1.7);   // the dark crown cores showed through the thinned leaf cards
        else if (/^(tile-)?roof#/.test(m.name)) Object.assign(m, { map: shingles(m.name.startsWith("tile") ? "#8A5A4E" : "#BE5E4A"), roughness: 0.78 }).color.set("#FFFFFF");
        else if (/^strata#/.test(m.name)) m.color.setScalar(2.3);       // baked swatch is the unlit albedo; Cycles' bounce made these cliffs warm and light
        else if (m.name === "terrain#side") m.color.setScalar(1.5);
        else if (m.name === "terrain#top") m.color.setScalar(0.78);   // the ground between blades sits in their shade
      }
      if (top.startsWith("grass") && mesh.geometry.getAttribute("color")) {   // move the weight off the colour slot
        mesh.geometry.setAttribute("windW", mesh.geometry.getAttribute("color")); mesh.geometry.deleteAttribute("color");
      }
    });
  const grass: Mesh[] = [];
  root.traverse((o) => { const m = o as Mesh; if (m.isMesh && !(m as InstancedMesh).isInstancedMesh && /^grass/.test(m.parent?.name || m.name)) grass.push(m); });
    for (const g of grass) {   // denser carpet: the same blades again, nudged a couple of centimetres (see GRASS_COPIES)
      const inst = new InstancedMesh(g.geometry, g.material, GRASS_COPIES.length);
      GRASS_COPIES.forEach(([dx, dz], i) => inst.setMatrixAt(i, new Matrix4().makeTranslation(dx, 0, dz)));
      inst.position.copy(g.position); inst.quaternion.copy(g.quaternion); inst.scale.copy(g.scale); inst.name = g.name;
      inst.receiveShadow = true; inst.castShadow = false; inst.frustumCulled = false;
      g.parent!.add(inst); g.parent!.remove(g);
    }
  const driven = readDriven(root);
  mergeRigid(driven.map((d) => d.node));
  return { driven, glowing, falls };
}

/** Each moving group (a swaying crown, a turning sail) arrives as many small meshes that only ever move together: a bare
 *  winter tree alone was ~190 branch meshes, ~3,700 draw calls a frame with shadows. Merge them per material under the
 *  node that moves them, so each group draws once per material. Meshes under a nested moving node stay apart. */
function mergeRigid(hosts: Object3D[]) {
  const moving = new Set(hosts);
  for (const host of hosts) {
    host.updateWorldMatrix(true, true);
    const toHost = host.matrixWorld.clone().invert(), groups = new Map<string, Mesh[]>();
    host.traverse((o) => {
      const m = o as Mesh;
      if (!m.isMesh || (m as InstancedMesh).isInstancedMesh || Array.isArray(m.material)) return;
      for (let p = m.parent; p && p !== host; p = p.parent) if (moving.has(p)) return;
      const key = `${m.material.uuid}|${Object.keys(m.geometry.attributes).sort().join()}|${!!m.geometry.index}`;   // mergeable only alike
      groups.set(key, [...(groups.get(key) ?? []), m]);
    });
    for (const list of Array.from(groups.values())) {
      if (list.length < 2) continue;
      const merged = mergeGeometries(list.map((m): BufferGeometry => m.geometry.clone().applyMatrix4(toHost.clone().multiply(m.matrixWorld))));
      if (!merged) continue;
      const one = new Mesh(merged, list[0].material);
      Object.assign(one, { name: list[0].name, castShadow: list[0].castShadow, receiveShadow: true });
      list.forEach((m) => m.removeFromParent());
      host.add(one);
    }
  }
}

/** Lamps glow at night; drivers, falls and ripples move. */
function useAlive(d: ReturnType<typeof dress>, lampsOn: boolean, reducedMotion: boolean, time: { value: number }, ripples?: CanvasTexture) {
  useEffect(() => {
    for (const m of d.glowing) { m.emissive.set(m.name.startsWith("lantern") ? "#FFC77A" : "#FFB25A"); m.emissiveIntensity = lampsOn ? 2.2 : 0.08; }
  }, [d, lampsOn]);
  useFrame((state) => {
    const t = reducedMotion ? 0 : state.clock.elapsedTime;
    time.value = t;
    applyDrivers(d.driven, blenderFrame(t));
    for (const f of d.falls) f.offset.y = -t * 0.9;   // fall UVs run v 0 at the lip → 1 at the foot: streaks must slide toward +v, i.e. down
    ripples?.offset.set(Math.sin(t * 0.2) * 0.02, t * 0.12);   // water UVs are world-projected (v = −z / 4 m): +offset moves ripples downstream (+z)
  });
}

/** The walkable levels as [z from, z to, height] in voxels: the upper terrace behind its wall, the field in front. */
const GROUND: [number, number, number][] = [[0, 60, 12], [60, 144, 0]];

/** What hides once something is unlocked: the wooden front fence under the flower fence, the fog over each new island. */
const HIDDEN_BY: Record<string, string> = { "fence-front": "flowerfence", "fog-left": "terraces", "fog-right": "lotus" };

export default function Island({ season, lampsOn, reducedMotion = false, onGround, unlocked = [] }: { season: Season; lampsOn: boolean; reducedMotion?: boolean; onGround?: (x: number, z: number) => void; unlocked?: string[] }) {
  const gltf = useFarmModel(`island-${season}`);
  const time = useRef({ value: 0 });
  const ripples = useMemo(rippleTexture, []);
  const dressed = useMemo(() => {
    if (process.env.NODE_ENV !== "production") Object.assign(window, { __island: gltf.scene });   // dev-only, for scripted checks
    return dress(gltf.scene, season, time.current, ripples);
  }, [gltf, season, ripples]);
  useAlive(dressed, lampsOn, reducedMotion, time.current, ripples);
  useEffect(() => {
    for (const [name, id] of Object.entries(HIDDEN_BY)) { const n = gltf.scene.getObjectByName(name); if (n) n.visible = !unlocked.includes(id); }
  }, [gltf, unlocked]);

  return (
    <>
      <primitive object={gltf.scene} />
      {/* Ground clicks hit two flat invisible planes (upper terrace, lower field), not the island model: R3F hit-tests
          every interactive object on every mouse move, and the model's grass, water and terrain cost ~5 ms a move, enough
          to make Khôi's walk stutter while the mouse moved. */}
      {onGround && GROUND.map(([z0, z1, y]) => (
        <mesh
          key={y}
          position={[96 * S, y * S, ((z0 + z1) / 2) * S]}
          rotation={[-Math.PI / 2, 0, 0]}
          onClick={(e: ThreeEvent<MouseEvent>) => {
            if (e.intersections.some((h) => h.object.userData.clickable)) return;   // a bed, the well, an egg or Khôi takes it
            e.stopPropagation(); onGround(e.point.x / S, e.point.z / S);
          }}
        >
          <planeGeometry args={[192 * S, (z1 - z0) * S]} />
          <meshBasicMaterial visible={false} />
        </mesh>
      ))}
      {/* warm spill from the barn windows at night */}
      {lampsOn && <pointLight position={[1.2, 1.5, 2.3]} color="#FFC870" intensity={3} distance={5} decay={1.5} />}
      {unlocked.map((id) => (
        <Suspense key={id} fallback={null}>{/* each model streams in on its own; the island never waits for one */}
          <Unlock id={id} season={season} lampsOn={lampsOn} reducedMotion={reducedMotion} ripples={ripples} />
        </Suspense>
      ))}
    </>
  );
}

/** One unlocked item, exported in place by cozy_farm.py (web/<season>/unlock-<id>.glb). */
function Unlock({ id, season, lampsOn, reducedMotion, ripples }: { id: string; season: Season; lampsOn: boolean; reducedMotion: boolean; ripples: CanvasTexture }) {
  const gltf = useFarmModel(`unlock-${id}-${season}`);
  const time = useRef({ value: 0 });
  const dressed = useMemo(() => dress(gltf.scene, season, time.current, ripples), [gltf, season, ripples]);
  useAlive(dressed, lampsOn, reducedMotion, time.current);
  return <primitive object={gltf.scene} />;
}
