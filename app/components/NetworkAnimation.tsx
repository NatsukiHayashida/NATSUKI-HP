"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useTheme } from "next-themes"

// Single light streak flowing along a curve
function LightStreak({ curve, speed, offset, color }: { curve: THREE.CubicBezierCurve3; speed: number; offset: number; color: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  // Create geometry for the streak with more points for smooth line
  const geometry = useMemo(() => {
    const points = curve.getPoints(200)
    const positions = new Float32Array(points.length * 3)
    const indices: number[] = []

    points.forEach((point, i) => {
      positions[i * 3] = point.x
      positions[i * 3 + 1] = point.y
      positions[i * 3 + 2] = point.z

      if (i < points.length - 1) {
        indices.push(i)
      }
    })

    const geom = new THREE.BufferGeometry()
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    // Add vertex indices for line rendering
    const vertexIndices = new Float32Array(points.length)
    for (let i = 0; i < points.length; i++) {
      vertexIndices[i] = i / points.length
    }
    geom.setAttribute("vertexIndex", new THREE.BufferAttribute(vertexIndices, 1))

    return geom
  }, [curve])

  useFrame((state) => {
    if (!materialRef.current) return

    const time = state.clock.getElapsedTime()
    const progress = (time * speed + offset) % 1

    materialRef.current.uniforms.uProgress.value = progress
  })

  return (
    // @ts-expect-error - Three.js line element
    <line geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        linewidth={3}
        uniforms={{
          uProgress: { value: 0 },
          uColor: { value: new THREE.Color(color) },
          uTailLength: { value: 0.15 },
        }}
        vertexShader={`
          uniform float uProgress;
          uniform float uTailLength;

          attribute float vertexIndex;
          varying float vAlpha;

          void main() {
            // Calculate distance from current progress point
            float dist = vertexIndex - uProgress;

            // Create tail effect - only show vertices behind the progress point
            float tailFade = 0.0;
            if (dist <= 0.0 && dist >= -uTailLength) {
              // Smooth gradient from head (1.0) to tail (0.0)
              tailFade = smoothstep(-uTailLength, 0.0, dist);
            }

            vAlpha = tailFade;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          varying float vAlpha;

          void main() {
            // Brighter at head, fading to transparent at tail
            float brightness = pow(vAlpha, 0.8);
            gl_FragColor = vec4(uColor * (1.0 + brightness * 2.0), vAlpha * 0.9);
          }
        `}
      />
    </line>
  )
}

function createHeartbeatCurve(y: number, startX: number): THREE.CubicBezierCurve3[] {
  const segments: THREE.CubicBezierCurve3[] = []
  const segmentWidth = 8
  let currentX = startX

  // Repeat heartbeat pattern 4 times
  for (let repeat = 0; repeat < 4; repeat++) {
    // Flat line before spike
    segments.push(
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(currentX, y, 0),
        new THREE.Vector3(currentX + segmentWidth * 0.33, y, 0),
        new THREE.Vector3(currentX + segmentWidth * 0.66, y, 0),
        new THREE.Vector3(currentX + segmentWidth, y, 0),
      ),
    )
    currentX += segmentWidth

    // P wave (small bump) - increased height
    segments.push(
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(currentX, y, 0),
        new THREE.Vector3(currentX + 0.3, y + 0.8, 0),
        new THREE.Vector3(currentX + 0.6, y + 0.8, 0),
        new THREE.Vector3(currentX + 0.9, y, 0),
      ),
    )
    currentX += 0.9

    // Flat line
    segments.push(
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(currentX, y, 0),
        new THREE.Vector3(currentX + 0.3, y, 0),
        new THREE.Vector3(currentX + 0.6, y, 0),
        new THREE.Vector3(currentX + 0.9, y, 0),
      ),
    )
    currentX += 0.9

    // QRS complex (sharp spike)
    // Q dip - increased depth
    segments.push(
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(currentX, y, 0),
        new THREE.Vector3(currentX + 0.15, y - 1.0, 0),
        new THREE.Vector3(currentX + 0.25, y - 1.0, 0),
        new THREE.Vector3(currentX + 0.35, y, 0),
      ),
    )
    currentX += 0.35

    // R spike (tall peak) - significantly increased height
    segments.push(
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(currentX, y, 0),
        new THREE.Vector3(currentX + 0.2, y + 5.0, 0),
        new THREE.Vector3(currentX + 0.3, y + 5.0, 0),
        new THREE.Vector3(currentX + 0.5, y, 0),
      ),
    )
    currentX += 0.5

    // S dip - increased depth
    segments.push(
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(currentX, y, 0),
        new THREE.Vector3(currentX + 0.15, y - 1.5, 0),
        new THREE.Vector3(currentX + 0.25, y - 1.5, 0),
        new THREE.Vector3(currentX + 0.4, y, 0),
      ),
    )
    currentX += 0.4

    // Flat line
    segments.push(
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(currentX, y, 0),
        new THREE.Vector3(currentX + 0.4, y, 0),
        new THREE.Vector3(currentX + 0.8, y, 0),
        new THREE.Vector3(currentX + 1.2, y, 0),
      ),
    )
    currentX += 1.2

    // T wave (medium bump) - increased height
    segments.push(
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(currentX, y, 0),
        new THREE.Vector3(currentX + 0.4, y + 1.5, 0),
        new THREE.Vector3(currentX + 0.8, y + 1.5, 0),
        new THREE.Vector3(currentX + 1.2, y, 0),
      ),
    )
    currentX += 1.2
  }

  // Final flat line to reach the edge
  segments.push(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(currentX, y, 0),
      new THREE.Vector3(currentX + segmentWidth * 0.33, y, 0),
      new THREE.Vector3(currentX + segmentWidth * 0.66, y, 0),
      new THREE.Vector3(currentX + segmentWidth, y, 0),
    ),
  )

  return segments
}

// Network of curves with flowing light streaks - single heartbeat trace
function NetworkScene() {
  const { theme, resolvedTheme } = useTheme()

  // Determine colors based on theme
  // Dark mode: bright blue (0x3b82f6 - blue-500)
  // Light mode: darker neon green (0x16a34a - green-600)
  const currentTheme = resolvedTheme || theme
  const lightColor = currentTheme === 'dark' ? 0x3b82f6 : 0x16a34a
  // Dark mode path: dark blue (0x1e40af - blue-800)
  // Light mode path: light gray matching background (0xe5e7eb - gray-200)
  const pathColor = currentTheme === 'dark' ? 0x1e40af : 0xe5e7eb

  const curves = useMemo(() => {
    const curveData: Array<{ curve: THREE.CubicBezierCurve3; speed: number; offset: number }> = []

    // Create 1 heartbeat trace at center
    const y = 0  // Center position
    const heartbeatSegments = createHeartbeatCurve(y, -35)

    // Combine all segments into one continuous curve by sampling points
    const allPoints: THREE.Vector3[] = []
    heartbeatSegments.forEach((segment) => {
      const points = segment.getPoints(20)
      allPoints.push(...points)
    })

    // Create a single curve from all points using CatmullRomCurve3 for smooth connection
    const continuousCurve = new THREE.CatmullRomCurve3(allPoints)

    curveData.push({
      curve: continuousCurve as any,
      speed: 0.15,
      offset: 0,
    })

    return curveData
  }, [])

  // Render curve paths (subtle blue lines)
  const curvePaths = useMemo(() => {
    return curves.map((data, i) => {
      const points = data.curve.getPoints(200)
      const geometry = new THREE.BufferGeometry().setFromPoints(points)

      return (
        // @ts-expect-error - Three.js line element
        <line key={`path-${i}`} geometry={geometry}>
          <lineBasicMaterial color={pathColor} transparent opacity={0.3} blending={THREE.AdditiveBlending} linewidth={2} />
        </line>
      )
    })
  }, [curves, pathColor])

  return (
    <>
      {/* Curve paths */}
      {curvePaths}

      {/* Light streaks flowing along curves */}
      {curves.map((data, i) => (
        <LightStreak key={`streak-${i}`} curve={data.curve} speed={data.speed} offset={data.offset} color={lightColor} />
      ))}
    </>
  )
}

export default function NetworkAnimation() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <NetworkScene />
      </Canvas>
    </div>
  )
}
