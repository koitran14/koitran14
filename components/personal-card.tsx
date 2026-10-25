'use client'
import * as React from 'react'
import * as THREE from 'three'
import { useRef, useState, useEffect, forwardRef } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import type { RapierRigidBody } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })

// Lanyard badge, adapted from Vercel's "Building an interactive 3D event badge"
// (React Three Fiber + rapier rope joints + MeshLine band).

/**
 * Compatibility shim: `RigidBody` in rapier v2.x reads `ref` from props (React 19 pattern).
 * In React 18, JSX strips `ref` before it reaches props, so we use forwardRef to pass
 * it back in as a prop via createElement.
 */
const CompatRigidBody = forwardRef<RapierRigidBody, React.ComponentPropsWithoutRef<typeof RigidBody>>(
  (props, ref) => React.createElement(RigidBody, { ...props, ref })
)
CompatRigidBody.displayName = 'CompatRigidBody'

/** Full-bleed photo card: photo covers the whole face, name sits on a dark fade at the bottom */
function buildCardTexture(photo: HTMLImageElement | null): THREE.Texture {
  const S = 2 // supersample so the text stays crisp when the card is close
  const W = 512, H = 720, R = 28
  const canvas = document.createElement('canvas')
  canvas.width = W * S
  canvas.height = H * S
  const ctx = canvas.getContext('2d')!
  ctx.scale(S, S)

  // Rounded card shape; corners stay transparent and are cut by alphaTest
  ctx.beginPath()
  ctx.roundRect(0, 0, W, H, R)
  ctx.clip()
  ctx.fillStyle = '#18181b'
  ctx.fillRect(0, 0, W, H)

  // Cover-crop the photo, biased toward the top so the face stays in frame
  if (photo) {
    const scale = Math.max(W / photo.width, H / photo.height)
    const sw = W / scale, sh = H / scale
    ctx.drawImage(photo, (photo.width - sw) / 2, (photo.height - sh) * 0.2, sw, sh, 0, 0, W, H)
  }

  // Fades so white text reads on any photo
  const top = ctx.createLinearGradient(0, 0, 0, 120)
  top.addColorStop(0, 'rgba(0,0,0,0.45)')
  top.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = top
  ctx.fillRect(0, 0, W, 120)
  const bottom = ctx.createLinearGradient(0, H - 260, 0, H)
  bottom.addColorStop(0, 'rgba(0,0,0,0)')
  bottom.addColorStop(1, 'rgba(0,0,0,0.85)')
  ctx.fillStyle = bottom
  ctx.fillRect(0, H - 260, W, 260)

  const sans = "'Space Grotesk', 'Archivo', system-ui, sans-serif"
  const mono = "ui-monospace, SFMono-Regular, Menlo, monospace"

  ctx.fillStyle = '#ffffff'
  ctx.textBaseline = 'alphabetic'
  ctx.font = `600 30px ${sans}`
  ctx.fillText('koitran.', 36, 66)

  ctx.font = `600 54px ${sans}`
  ctx.fillText('Dang Khoi Tran', 36, H - 100)
  ctx.fillStyle = 'rgba(228,228,231,0.9)'
  ctx.font = `500 28px ${mono}`
  ctx.fillText('AI Software Engineer', 38, H - 54)

  // Hairline edge so the card reads on both light and dark pages
  ctx.strokeStyle = 'rgba(255,255,255,0.18)'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.roundRect(1.5, 1.5, W - 3, H - 3, R - 1.5)
  ctx.stroke()

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 16
  return tex
}

/**
 * Strap texture. MeshLine maps u along the band and v across it, so the label is
 * drawn horizontally and tiled along the length (see `repeat` on the material).
 */
function buildStrapTexture(): THREE.Texture {
  const W = 1280, H = 300
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#27272a'
  ctx.fillRect(0, 0, W, H)
  // thin woven edges
  ctx.fillStyle = '#52525b'
  ctx.fillRect(0, 0, W, 14)
  ctx.fillRect(0, H - 14, W, 14)
  ctx.fillStyle = '#fafafa'
  ctx.font = '700 200px ui-monospace, SFMono-Regular, Menlo, monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('KOITRAN14', W / 2, H / 2 + 8)
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 16
  return tex
}

// The canvas is taller than the hero column so a dragged card isn't cut off; the camera
// sits further back and lower so the card keeps its on-screen size and rest position.
export const CANVAS_H = 600
const CAMERA_Z = 12.3 // ~110 CSS px per world unit
const VIEW_TOP = 2.215 // world y of the canvas' top edge (where the strap enters)
const CAMERA_Y = VIEW_TOP - CAMERA_Z * Math.tan(THREE.MathUtils.degToRad(12.5))

interface PersonalCardProps {
  className?: string
  /** Element that receives pointer events, so the canvas itself can ignore them. */
  eventSource?: React.MutableRefObject<HTMLElement>
}

export function PersonalCard({ className, eventSource }: PersonalCardProps) {
  return (
    <div className={className} style={{ height: CANVAS_H }}>
      <Canvas
        camera={{ position: [0, CAMERA_Y, CAMERA_Z], rotation: [0, 0, 0], fov: 25 }}
        eventSource={eventSource}
        eventPrefix="client"
        dpr={[1, 2]}
        flat // R3F defaults to ACES tone mapping, which washed out the photo and strap
      >
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-5, 5, 5]} intensity={0.5} />
        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band />
        </Physics>
      </Canvas>
    </div>
  )
}

type Segment = RapierRigidBody & { lerped?: THREE.Vector3 }
const segmentProps = { canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 } as const

function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef<any>(null)
  const fixed = useRef<Segment>(null)
  const j1 = useRef<Segment>(null)
  const j2 = useRef<Segment>(null)
  const j3 = useRef<Segment>(null)
  const card = useRef<RapierRigidBody>(null)

  const [vec] = useState(() => new THREE.Vector3())
  const [ang] = useState(() => new THREE.Vector3())
  const [dir] = useState(() => new THREE.Vector3())
  const [curve] = useState(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(), new THREE.Vector3(),
      new THREE.Vector3(), new THREE.Vector3()
    ])
    c.curveType = 'chordal' // avoids kinks/overshoot when joints bunch up
    return c
  })
  const [dragged, drag] = useState<THREE.Vector3 | false>(false)
  const [hovered, hover] = useState(false)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const [strap] = useState(buildStrapTexture)

  useEffect(() => {
    const toTexture = (photo: HTMLImageElement | null) => setTexture(buildCardTexture(photo))
    const photo = new Image()
    // wait for web fonts so the canvas text uses Space Grotesk
    photo.onload = () => document.fonts.ready.then(() => toTexture(photo))
    photo.onerror = () => toTexture(null)
    photo.src = '/images/koitran.jpg'
  }, [])

  useEffect(() => {
    if (!hovered && !dragged) return
    document.body.style.cursor = dragged ? 'grabbing' : 'grab'
    return () => void (document.body.style.cursor = 'auto')
  }, [hovered, dragged])

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.2, 0]]) // prettier-ignore

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.copy(state.camera.position).add(dir.multiplyScalar(-state.camera.position.z / dir.z)) // pointer ray hits z=0
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: 0 })
    }
    if (!fixed.current || !j1.current || !j2.current || !j3.current || !card.current) return

    // Ease the middle joints toward their physics position: raw rapier positions
    // jump between steps when the rope is over-pulled, which made the band jitter.
    const dt = Math.min(delta, 1 / 30)
    for (const seg of [j1.current, j2.current]) {
      seg.lerped ??= new THREE.Vector3().copy(seg.translation())
      const dist = Math.max(0.1, Math.min(1, seg.lerped.distanceTo(seg.translation())))
      seg.lerped.lerp(seg.translation(), Math.min(1, dt * (minSpeed + dist * (maxSpeed - minSpeed))))
    }
    curve.points[0].copy(j3.current.translation())
    curve.points[1].copy(j2.current.lerped!)
    curve.points[2].copy(j1.current.lerped!)
    curve.points[3].copy(fixed.current.translation())
    band.current.geometry.setPoints(curve.getPoints(32))

    // Damp spin around the vertical axis so the card settles facing the viewer
    ang.copy(card.current.angvel())
    const q = card.current.rotation()
    card.current.setAngvel({ x: ang.x, y: ang.y - q.y * 0.25, z: ang.z }, true)
  })

  return (
    <>
      <group position={[0, 4, 0]}>
        <CompatRigidBody ref={fixed} {...segmentProps} type="fixed" />
        <CompatRigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </CompatRigidBody>
        <CompatRigidBody position={[1, 0, 0]} ref={j2} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </CompatRigidBody>
        <CompatRigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps} type="dynamic">
          <BallCollider args={[0.1]} />
        </CompatRigidBody>
        <CompatRigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          {/* metal clip drawn over the strap's end so strap, clip and card read as one piece */}
          <mesh position={[0, 1.17, 0.02]} renderOrder={2}>
            <boxGeometry args={[0.38, 0.2, 0.04]} />
            <meshStandardMaterial color="#d4d4d8" metalness={0.3} roughness={0.35} depthTest={false} />
          </mesh>
          <mesh
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => ((e.target as Element).releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e) => (
              (e.target as Element).setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current!.translation())))
            )}
          >
            <planeGeometry args={[0.8 * 2, 1.125 * 2]} />
            {texture ? (
              // key forces a fresh material so the shader is compiled with the map
              // unlit so the photo shows its real colors (physical light units dimmed it)
              <meshBasicMaterial key={texture.uuid} map={texture} side={THREE.DoubleSide} alphaTest={0.5} />
            ) : (
              <meshStandardMaterial color="#27272a" side={THREE.DoubleSide} />
            )}
          </mesh>
        </CompatRigidBody>
      </group>
      <mesh ref={band} renderOrder={1}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[1000, 1000]}
          useMap
          map={strap}
          repeat={[-3, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  )
}
