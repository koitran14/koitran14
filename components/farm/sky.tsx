"use client";

import { useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { CanvasTexture, EquirectangularReflectionMapping, SRGBColorSpace, Vector3, type DirectionalLight } from "three";
import { CAMERA } from "@/lib/farm/layout";
import { daylight, type Season } from "@/lib/farm/time";

const PEAK: Record<Season, number> = { dong: 30, thu: 42, xuan: 52, ha: 62 };   // noon sun height by season (degrees), as the Blender scenes
const FILL: [number, number, number] = (() => {   // from the camera's side, a little higher than it
  const y = (CAMERA.yawDeg * Math.PI) / 180, p = ((CAMERA.pitchDeg + 12) * Math.PI) / 180;
  return [Math.sin(y) * Math.cos(p) * 20, Math.sin(p) * 20, Math.cos(y) * Math.cos(p) * 20];
})();
const smooth = (a: number, b: number, v: number) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };

/** Where the sun is, matching cozy_farm.py: at 15:00 it sits exactly where the game camera's mirror ray off flat water
 *  points, so the stream catches the light; it swings 15° an hour from there. Returns a unit vector toward the sun. */
export function sunDirection(hour: number, season: Season): Vector3 {
  const el = (Math.max(3, PEAK[season] * Math.sin((Math.PI * (hour - 6)) / 12)) * Math.PI) / 180;
  const yaw = (CAMERA.yawDeg * Math.PI) / 180;
  const az = ((hour - 15) * 15 * Math.PI) / 180;
  const hx = -Math.sin(yaw), hz = -Math.cos(yaw);   // away from the camera, across the island
  const rx = hx * Math.cos(az) + hz * Math.sin(az), rz = -hx * Math.sin(az) + hz * Math.cos(az);
  return new Vector3(rx * Math.cos(el), Math.sin(el), rz * Math.cos(el));
}

/** A small sky for reflections: zenith-to-horizon gradient, darker ground, and a bright sun disc — water, glass and
 *  glossy paint need something to mirror, or they read as flat colour. */
function skyTexture(sun: Vector3, day: number, dusk: number) {
  const W = 256, H = 128, c = document.createElement("canvas"); c.width = W; c.height = H;
  const g = c.getContext("2d")!;
  const zen = day > 0.2 ? (dusk > 0.3 ? "#8C9BC4" : "#7FAEDF") : "#1C2442", hor = day > 0.2 ? (dusk > 0.3 ? "#F4C79A" : "#E6F1F8") : "#3A4366";
  const grad = g.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, zen); grad.addColorStop(0.48, hor); grad.addColorStop(0.52, "#8C8A72"); grad.addColorStop(1, "#4A4A3A");
  g.fillStyle = grad; g.fillRect(0, 0, W, H);
  if (day > 0.05) {   // the sun: three's equirect lookup is u = atan(z, x) / 2π + 0.5, v = asin(y) / π + 0.5
    const u = Math.atan2(sun.z, sun.x) / (2 * Math.PI) + 0.5, v = Math.asin(sun.y) / Math.PI + 0.5;
    const x = u * W, y = (1 - v) * H, r = g.createRadialGradient(x, y, 0, x, y, 14);
    r.addColorStop(0, "rgba(255,250,235,1)"); r.addColorStop(0.25, "rgba(255,240,210,0.9)"); r.addColorStop(1, "rgba(255,230,190,0)");
    g.fillStyle = r; g.fillRect(x - 16, y - 16, 32, 32);
  }
  const t = new CanvasTexture(c); t.mapping = EquirectangularReflectionMapping; t.colorSpace = SRGBColorSpace; return t;
}

/** Sun and sky light for the visitor's hour and season. */
export default function Sky({ hour, season, focus = CAMERA.target }: { hour: number; season: Season; focus?: [number, number, number] }) {
  const { day, dusk } = daylight(hour);
  const scene = useThree((s) => s.scene);
  const sun = useMemo(() => sunDirection(hour, season), [hour, season]);
  const env = useMemo(() => skyTexture(sun, day, dusk), [sun, day, dusk]);
  useEffect(() => {
    scene.environment = env; scene.environmentIntensity = 0.35 + 0.45 * day;
    return () => { scene.environment = null; env.dispose(); };
  }, [scene, env, day]);
  const [tx, ty, tz] = focus;   // the island in view, so its shadows fall inside the sun's shadow box
  const light = useRef<DirectionalLight>(null!);
  useEffect(() => {   // aim at the island's centre, not the world origin: off-centre, the sun came in ~15° wrong and the stream never caught it
    const l = light.current; l.target.position.set(tx, ty, tz); scene.add(l.target);
    return () => { scene.remove(l.target); };
  }, [scene, tx, ty, tz]);
  const el = Math.asin(sun.y) * (180 / Math.PI), warm = 1 - smooth(5, 40, el);   // low sun: warmer light, as in Blender
  const sunColor = `rgb(255, ${Math.round(255 * (0.93 - 0.28 * warm))}, ${Math.round(255 * (0.84 - 0.4 * warm))})`;
  return (
    <>
      {/* less sky and fill than before: the scene was flat next to Blender, where the sun side and the shade differ clearly */}
      <hemisphereLight args={["#FFF6EE", "#8A7A6A"]} intensity={0.3 + 0.45 * day} />
      <directionalLight
        ref={light}
        position={[tx + sun.x * 20, ty + sun.y * 20, tz + sun.z * 20]}
        color={day > 0.05 ? sunColor : "#9FB2E0"}
        intensity={0.2 + 3.0 * day}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-11} shadow-camera-right={11} shadow-camera-top={11} shadow-camera-bottom={-11} shadow-camera-far={60}
        shadow-bias={-0.0005} shadow-normalBias={0.02}
      />
      {/* bounce: Cycles lit the faces turned to the camera with light thrown back off the warm ground and sky; with the sun
          behind the island they went near black here (cliffs, crown cores, roofs). A soft shadowless fill from the viewer's
          side stands in for it. Shadow casters sort first, so the sun stays directionalLights[0] for the foliage shader. */}
      <directionalLight position={FILL} color="#FFE6CC" intensity={0.15 + 0.55 * day} />
    </>
  );
}
