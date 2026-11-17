"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader, type ThreeEvent } from "@react-three/fiber";
import { CAMERA, S } from "@/lib/farm/layout";
import {
  CanvasTexture, Color, DoubleSide, Euler, Matrix4, MeshPhysicalMaterial, Quaternion, RepeatWrapping, SRGBColorSpace, Vector2, Vector3,
  InstancedMesh, Mesh, type BufferGeometry, type Material, type MeshStandardMaterial, type Object3D, type WebGLProgramParametersWithUniforms,
} from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { FileLoader, MeshBasicMaterial, TextureLoader, Vector4, type Texture } from "three";
import { blenderFrame, blenderToThree, compileDriver } from "@/lib/farm/drivers";
import type { Season } from "@/lib/farm/time";
import { useFarmModel } from "./use-farm-model";
import { heightAt } from "@/lib/farm/nav";
import { DAY, fallMaterial, footOf, Spray, type Foot } from "./falls";
import { sunRim } from "./sunlight";

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

/** The stream as Blender renders it (3d-farming-asset scripts/bake_stream.py): an image from the game's own camera
 *  angle and the affine map from world position to that image. The camera never rotates, so painting the water, banks
 *  and falls with it shows exactly the Blender look (refraction, depth, glare, spray) that real time can't compute. */
type Kind = "water" | "fall" | "bank";
type Stream = { tex: Texture; u: number[]; v: number[]; day: { value: number }; parts?: Record<string, Kind> };
const TO_CAMERA = (() => { const y = (CAMERA.yawDeg * Math.PI) / 180, p = (CAMERA.pitchDeg * Math.PI) / 180; return new Vector3(Math.sin(y) * Math.cos(p), Math.sin(p), Math.cos(y) * Math.cos(p)); })();
const NIGHT_TINT = "vec3(0.16, 0.2, 0.32)";

function paintStream(m: Material, s: Stream, kind: "water" | "fall" | "bank", time: { value: number }, ripples: Texture) {
  m.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, { uProj: { value: s.tex }, uPU: { value: new Vector4(...s.u) }, uPV: { value: new Vector4(...s.v) }, uDay: s.day, uTime: time, uRip: { value: ripples } });
    sh.vertexShader = sh.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vWorldP; varying vec2 vRawUv;")
      .replace("#include <project_vertex>", `#include <project_vertex>\nvWorldP = (modelMatrix * vec4(transformed, 1.0)).xyz; ${kind === "fall" ? "vRawUv = uv;" : ""}`);   // falls have a map, so uv is declared
    // The render is a still; the motion comes from here, as Blender's flow noise moves its water and falls.
    // water: two ripple layers flowing downstream (+z) bend the image, and glints dance where the sun glare is
    // falls: smooth froth noise, stretched down the sheet and scrolling with it, wobbles and brightens the image
    const pre = kind === "water" ? `vec2 rr = texture2D(uRip, vWorldP.xz * vec2(1.4, 0.9) - vec2(0.0, uTime * 0.35)).xy - 0.5;
      rr += 0.6 * (texture2D(uRip, vWorldP.xz * vec2(2.3, 1.6) - vec2(uTime * 0.05, uTime * 0.6)).xy - 0.5);
      pu += rr * 0.009;`
      : kind === "fall" ? `vec2 fn = texture2D(uRip, vMapUv * vec2(2.5, 0.35)).xy - 0.5; float sk = fn.x + fn.y;   // smooth noise, long down the sheet, scrolling with its uv
      pu += vec2(fn.x * 0.003, fn.y * 0.006);` : "";
    const post = kind === "water" ? `float lum = dot(pc, vec3(0.299, 0.587, 0.114));
      pc += vec3(1.0, 0.97, 0.9) * smoothstep(0.5, 0.9, rr.x + rr.y) * smoothstep(0.45, 0.85, lum) * 0.55 * uDay;`
      : kind === "fall" ? `pc = min(pc * (0.96 + 0.3 * max(sk, 0.0)), vec3(1.0));
      gl_FragColor.a = smoothstep(0.0, 0.12, vRawUv.x) * smoothstep(1.0, 0.88, vRawUv.x) * smoothstep(0.0, 0.2, vRawUv.y + sk * 0.06);` : "";
    // falls only brighten (the falling water froths, it never stripes dark), and fade at the sides and foot (u across,
    // v 1 at the lip, 0 at the foot): the sheet's margins showed the render's background as a pale card
    const w = kind === "bank" ? `smoothstep(${80.2 * S}, ${82.2 * S}, vWorldP.x) * (1.0 - smoothstep(${109.8 * S}, ${111.8 * S}, vWorldP.x))` : "1.0";   // banks fade into the live-lit lawn
    sh.fragmentShader = "uniform sampler2D uProj, uRip; uniform vec4 uPU, uPV; uniform float uDay, uTime; varying vec3 vWorldP; varying vec2 vRawUv;\n" + sh.fragmentShader.replace("#include <dithering_fragment>", `#include <dithering_fragment>
      vec2 pu = vec2(dot(uPU.xyz, vWorldP) + uPU.w, dot(uPV.xyz, vWorldP) + uPV.w);
      ${pre}
      vec3 pc = texture2D(uProj, pu).rgb * mix(${NIGHT_TINT}, vec3(1.0), uDay);
      ${post}
      gl_FragColor.rgb = mix(gl_FragColor.rgb, pc, ${w});`);   // after tone mapping and the sRGB step: the render is already display colour
  };
  m.customProgramCacheKey = () => `stream-${kind}`;
  m.needsUpdate = true;
}

/** Turn a Blender export into the live look: water, falls, wind in grass and leaves, roof tiles, lifted cliffs.
 *  Shared by the island and every unlock model, so an unlocked item matches the ground it stands on. */
function dress(root: Object3D, season: Season, time: { value: number }, ripples: CanvasTexture, stream?: Stream) {
  const glowing: MeshStandardMaterial[] = [], falls: CanvasTexture[] = [], feet: Foot[] = [];
  const seen = new Set<Material>();
  root.traverse((o) => {
      const mesh = o as Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = !mesh.name.startsWith("grass"); mesh.receiveShadow = true;
      // the named part right under the file root (or under an unlock-<id> group)
      const top = (() => { let n: Object3D = mesh; while (n.parent && n.parent !== root && !n.parent.name.startsWith("unlock-")) n = n.parent; return n.name; })();
      const mat0 = ([] as Material[]).concat(mesh.material)[0]?.name ?? "";
      if (top.startsWith("fall-")) {   // every waterfall: the animated sheet (a still render can't fall), spray where it lands
        mesh.material = fallMaterial(time); mesh.castShadow = false;
        // the main upper fall hangs just behind the bank's drop face at the lip: 4 cm toward the camera, along its line
        // of sight, draws it in front without moving it on screen
        mesh.position.addScaledVector(TO_CAMERA, 0.04);
        const f = footOf(mesh);
        if (Math.abs(heightAt(f.at.x / S, f.at.z / S) * S - f.at.y) < 0.15) feet.push(f);   // not for a fall pouring off the edge into the air
        return;
      }
      // water painted with its Blender render: the parts each bake lists (the main stream's first bake lists none)
      const kind = !stream ? undefined : stream.parts ? Object.entries(stream.parts).find(([p]) => top.startsWith(p))?.[1]
        : /^(water-surface\d|fall-(front|upper)|bank)/.test(top) ? (top.startsWith("water") ? "water" : top.startsWith("fall") ? "fall" : "bank") : undefined;
      if (stream && kind) {
        const mats = ([] as Material[]).concat(mesh.material).map((m) => {
          if (kind === "bank") { const c = m.clone(); paintStream(c, stream, kind, time, ripples); return c; }   // own copy: banks share the lawn's materials
          const tex = kind === "fall" ? streakTexture().map : null; if (tex) falls.push(tex);
          const b = new MeshBasicMaterial({ map: tex, side: DoubleSide, transparent: kind === "fall", depthWrite: kind !== "fall" }); paintStream(b, stream, kind, time, ripples); return b;   // the fall sheets face away from the camera
        });
        mesh.material = mats.length === 1 ? mats[0] : mats; mesh.castShadow = false;
        // the upper fall hangs just behind the bank's drop face at the lip, which then showed the still render: bring
        // each fall 4 cm toward the camera along its line of sight, so it draws in front and its pixels stay put
        if (kind === "fall") mesh.position.addScaledVector(TO_CAMERA, 0.04);
        return;
      }
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
  root.traverse((o) => { const m = o as Mesh; if (m.isMesh) ([] as Material[]).concat(m.material).forEach(sunRim); });   // sunlight catching every lit surface
  const driven = readDriven(root);
  mergeRigid(driven.map((d) => d.node));
  return { driven, glowing, falls, feet };
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

/** Where a click meets the ground: walk the ray down through the height map (main island, bridges, islands) in
 *  half-voxel steps, from above everything to below the islands. Exact on paddies, bridge decks and stairs alike. */
function groundHit(e: ThreeEvent<MouseEvent>): [number, number] | null {
  const o = e.ray.origin, d = e.ray.direction;   // d is unit length: one unit of t is one voxel once o is in voxels
  const ox = o.x / S, oy = o.y / S, oz = o.z / S;
  if (d.y >= 0) return null;
  for (let t = Math.max(0, (60 - oy) / d.y), end = (-40 - oy) / d.y; t < end; t += 0.5) {
    const x = ox + d.x * t, y = oy + d.y * t, z = oz + d.z * t;
    if (y <= heightAt(x, z)) return [x, z];
  }
  return null;
}

/** What hides once something is unlocked: the wooden front fence under the flower fence, the fog over each new island. */
const HIDDEN_BY: Record<string, string> = { "fence-front": "flowerfence", "fog-left": "terraces", "fog-right": "lotus" };

export default function Island({ season, lampsOn, reducedMotion = false, onGround, unlocked = [], day = 1 }: { season: Season; lampsOn: boolean; reducedMotion?: boolean; onGround?: (x: number, z: number) => void; unlocked?: string[]; day?: number }) {
  const gltf = useFarmModel(`island-${season}`);
  const time = useRef({ value: 0 });
  const ripples = useMemo(rippleTexture, []);
  const streamTex = useLoader(TextureLoader, `/models/farm/stream-${season}.jpg`);
  const streamMap = useLoader(FileLoader, `/models/farm/stream-${season}.json`) as string;
  const dayU = useRef({ value: day }); dayU.current.value = day;
  const stream = useMemo<Stream>(() => { const j = JSON.parse(streamMap); return { tex: streamTex, u: j.u, v: j.v, day: dayU.current }; }, [streamTex, streamMap]);
  const dressed = useMemo(() => {
    if (process.env.NODE_ENV !== "production") Object.assign(window, { __island: gltf.scene });   // dev-only, for scripted checks
    return dress(gltf.scene, season, time.current, ripples, stream);
  }, [gltf, season, ripples, stream]);
  useAlive(dressed, lampsOn, reducedMotion, time.current, ripples);
  DAY.value = day;
  useEffect(() => {
    for (const [name, id] of Object.entries(HIDDEN_BY)) { const n = gltf.scene.getObjectByName(name); if (n) n.visible = !unlocked.includes(id); }
  }, [gltf, unlocked]);

  return (
    <>
      <primitive object={gltf.scene} />
      {dressed.feet.map((f, i) => <Spray key={i} foot={f} time={time.current} />)}
      {/* Ground clicks: one flat invisible plane under the whole strip catches them, and the ray is traced through the
          height map. Not the island models: R3F hit-tests every interactive object on every mouse move, and the models'
          grass, water and terrain cost ~5 ms a move, enough to make Khôi's walk stutter while the mouse moved. */}
      {onGround && (
        <mesh
          position={[96 * S, -40 * S, 70 * S]}
          rotation={[-Math.PI / 2, 0, 0]}
          onClick={(e: ThreeEvent<MouseEvent>) => {
            if (e.intersections.some((h) => h.object.userData.clickable)) return;   // a bed, the well, an egg or Khôi takes it
            e.stopPropagation(); const p = groundHit(e); if (p) onGround(p[0], p[1]);
          }}
        >
          <planeGeometry args={[720 * S, 300 * S]} />
          <meshBasicMaterial visible={false} />
        </mesh>
      )}
      {/* warm spill from the barn windows at night */}
      {lampsOn && <pointLight position={[1.2, 1.5, 2.3]} color="#FFC870" intensity={3} distance={5} decay={1.5} />}
      {unlocked.map((id) => (
        <Suspense key={id} fallback={null}>{/* each model streams in on its own; the island never waits for one */}
          {WATERY.includes(id)
            ? <WateryUnlock id={id} season={season} lampsOn={lampsOn} reducedMotion={reducedMotion} ripples={ripples} day={stream.day} />
            : <Unlock id={id} season={season} lampsOn={lampsOn} reducedMotion={reducedMotion} ripples={ripples} />}
        </Suspense>
      ))}
    </>
  );
}

/** One unlocked item, exported in place by cozy_farm.py (web/<season>/unlock-<id>.glb). */
type UnlockProps = { id: string; season: Season; lampsOn: boolean; reducedMotion: boolean; ripples: CanvasTexture };

function Unlock({ id, season, lampsOn, reducedMotion, ripples, stream }: UnlockProps & { stream?: Stream }) {
  const gltf = useFarmModel(`unlock-${id}-${season}`);
  const time = useRef({ value: 0 });
  const dressed = useMemo(() => dress(gltf.scene, season, time.current, ripples, stream), [gltf, season, ripples, stream]);
  useAlive(dressed, lampsOn, reducedMotion, time.current);
  return (
    <>
      <primitive object={gltf.scene} />
      {dressed.feet.map((f, i) => <Spray key={i} foot={f} time={time.current} />)}
    </>
  );
}

/** The islands with water: their pond, paddies, streams and falls painted from their own Blender render, as the main stream. */
const WATERY = ["terraces", "lotus"];
function WateryUnlock({ day, ...p }: UnlockProps & { day: { value: number } }) {
  const tex = useLoader(TextureLoader, `/models/farm/stream-${p.id}-${p.season}.jpg`);
  const map = useLoader(FileLoader, `/models/farm/stream-${p.id}-${p.season}.json`) as string;
  const stream = useMemo<Stream>(() => { const j = JSON.parse(map); return { tex, u: j.u, v: j.v, day, parts: j.parts }; }, [tex, map, day]);
  return <Unlock {...p} stream={stream} />;
}
