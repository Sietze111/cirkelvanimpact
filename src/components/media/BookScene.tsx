/* eslint-disable react/no-unknown-property -- React Three Fiber elements */
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef } from 'react'
import { MathUtils, SRGBColorSpace, TextureLoader } from 'three'
import type { Group } from 'three'
import { product } from 'content/product'
import { asset } from 'lib/asset'

const WIDTH = 2.4
const HEIGHT = 3.36
const PAGES = 0.4
const BOARD = 0.03
const SPINE = 0.07

type BookModelProps = {
  active: boolean
  reducedMotion: boolean
  onReady: () => void
}

function BookModel({ active, reducedMotion, onReady }: BookModelProps) {
  const group = useRef<Group>(null)
  const texture = useLoader(TextureLoader, asset(product.cover))
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = 8

  const angle = useRef(-0.42)
  const target = useRef(-0.42)
  const drag = useRef<{ pointerId: number | null; x: number }>({
    pointerId: null,
    x: 0
  })
  const ready = useRef(false)
  const gl = useThree((state) => state.gl)

  useEffect(() => {
    if (reducedMotion) return

    const element = gl.domElement
    element.style.touchAction = 'pan-y'
    element.style.cursor = 'grab'

    const onDown = (event: PointerEvent) => {
      drag.current = { pointerId: event.pointerId, x: event.clientX }
      element.setPointerCapture(event.pointerId)
      element.style.cursor = 'grabbing'
    }
    const onMove = (event: PointerEvent) => {
      if (drag.current.pointerId !== event.pointerId) return
      target.current = MathUtils.clamp(
        target.current + (event.clientX - drag.current.x) * 0.009,
        -0.95,
        0.55
      )
      drag.current.x = event.clientX
    }
    const onUp = (event: PointerEvent) => {
      if (drag.current.pointerId !== event.pointerId) return
      drag.current.pointerId = null
      element.style.cursor = 'grab'
    }

    element.addEventListener('pointerdown', onDown)
    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerup', onUp)
    element.addEventListener('pointercancel', onUp)

    return () => {
      element.removeEventListener('pointerdown', onDown)
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerup', onUp)
      element.removeEventListener('pointercancel', onUp)
      element.style.cursor = ''
      element.style.touchAction = ''
    }
  }, [gl, reducedMotion])

  useFrame((state, delta) => {
    if (!ready.current) {
      ready.current = true
      onReady()
    }
    if (!group.current || reducedMotion || !active) return

    const time = state.clock.elapsedTime
    const idle = Math.sin(time * 0.5) * 0.06
    const smoothing = 1 - Math.exp(-delta * 4)

    angle.current += (target.current + idle - angle.current) * smoothing
    group.current.rotation.y = angle.current
    group.current.rotation.x = 0.05 + Math.sin(time * 0.35) * 0.02
    group.current.position.y = Math.sin(time * 0.55) * 0.035
  })

  return (
    <group ref={group} rotation={[0.05, -0.42, 0]}>
      {/* Page block, slightly smaller than the boards so it reads as paper. */}
      <mesh>
        <boxGeometry args={[WIDTH - 0.06, HEIGHT - 0.06, PAGES]} />
        <meshStandardMaterial color="#F5EEE2" roughness={0.95} metalness={0} />
      </mesh>

      <mesh position={[0, 0, PAGES / 2 + BOARD / 2]}>
        <boxGeometry args={[WIDTH, HEIGHT, BOARD]} />
        <meshStandardMaterial color="#F3EBDE" roughness={0.85} metalness={0} />
      </mesh>
      {/* The artwork is unlit so the cover keeps its printed colours. */}
      <mesh position={[0, 0, PAGES / 2 + BOARD + 0.001]}>
        <planeGeometry args={[WIDTH, HEIGHT]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      <mesh position={[0, 0, -PAGES / 2 - BOARD / 2]}>
        <boxGeometry args={[WIDTH, HEIGHT, BOARD]} />
        <meshStandardMaterial color="#F3EBDE" roughness={0.85} metalness={0} />
      </mesh>

      <mesh position={[-WIDTH / 2, 0, 0]}>
        <boxGeometry args={[SPINE, HEIGHT, PAGES + BOARD * 2]} />
        <meshStandardMaterial color="#17504F" roughness={0.65} metalness={0} />
      </mesh>
    </group>
  )
}

type BookSceneProps = {
  active: boolean
  reducedMotion: boolean
  onReady: () => void
}

export default function BookScene({
  active,
  reducedMotion,
  onReady
}: BookSceneProps) {
  return (
    <Canvas
      flat
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reducedMotion || !active ? 'demand' : 'always'}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 7, 7]} intensity={2} />
      <directionalLight position={[-5, 2, -5]} intensity={0.6} />

      <Suspense fallback={null}>
        <BookModel
          active={active}
          reducedMotion={reducedMotion}
          onReady={onReady}
        />
      </Suspense>
    </Canvas>
  )
}
