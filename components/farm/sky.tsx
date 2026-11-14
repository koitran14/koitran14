"use client";

import { CAMERA } from "@/lib/farm/layout";
import { daylight } from "@/lib/farm/time";

/** Sun and sky light for the visitor's hour; the sun arcs east to west and fades out at night. */
export default function Sky({ hour }: { hour: number }) {
  const { day, dusk } = daylight(hour);
  const a = ((hour - 6) / 12) * Math.PI;
  const [tx, ty, tz] = CAMERA.target;
  const sunColor = dusk > 0.3 ? "#FFC98F" : "#FFF4E6";
  return (
    <>
      <hemisphereLight args={["#FFF6EE", "#8A7A6A"]} intensity={0.55 + 0.9 * day} />
      <directionalLight
        position={[tx - Math.cos(a) * 12, ty + Math.max(2, Math.sin(a) * 15), tz + 8]}
        color={sunColor}
        intensity={0.25 + 2.2 * day}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-9} shadow-camera-right={9} shadow-camera-top={9} shadow-camera-bottom={-9}
        shadow-bias={-0.0005}
      />
    </>
  );
}
