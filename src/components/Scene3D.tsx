import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/** Soft round sprite so points glow instead of rendering as hard squares. */
function useGlowTexture() {
  return useMemo(() => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')!
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.25, 'rgba(255,255,255,0.65)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    return new THREE.CanvasTexture(canvas)
  }, [])
}

/** Evenly distributes `count` points on a unit sphere (Fibonacci spiral). */
function fibonacciSphere(count: number, radius: number) {
  const arr = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    arr[i * 3] = Math.cos(theta) * r * radius
    arr[i * 3 + 1] = y * radius
    arr[i * 3 + 2] = Math.sin(theta) * r * radius
  }
  return arr
}

/** Lerps the whole scene toward the pointer for a subtle parallax tilt. */
function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!ref.current) return
    if (!REDUCED_MOTION) ref.current.rotation.y += delta * 0.08
    const { x, y } = state.pointer
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -y * 0.35, 0.05)
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, x * 0.25, 0.05)
  })

  return <group ref={ref}>{children}</group>
}

function Globe() {
  const tex = useGlowTexture()
  const surface = useMemo(() => fibonacciSphere(2800, 1.7), [])
  const halo = useMemo(() => fibonacciSphere(500, 2.7), [])

  return (
    <Rig>
      {/* Dense surface — reads as a clear globe */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[surface, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={tex}
          color="#3b82f6"
          size={0.045}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Faint structural wireframe inside */}
      <mesh>
        <icosahedronGeometry args={[1.68, 1]} />
        <meshBasicMaterial color="#1d4ed8" wireframe transparent opacity={0.12} />
      </mesh>

      {/* Sparse outer halo for depth */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[halo, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={tex}
          color="#93c5fd"
          size={0.03}
          sizeAttenuation
          transparent
          opacity={0.5}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </Rig>
  )
}

export default function Scene3D() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Globe />
    </Canvas>
  )
}
