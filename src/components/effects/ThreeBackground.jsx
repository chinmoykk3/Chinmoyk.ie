import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 1500 }) {
    const mesh = useRef()
    const mouse = useRef({ x: 0, y: 0 })

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 10 + Math.random() * 100
            const speed = 0.01 + Math.random() / 200
            const xFactor = -10 + Math.random() * 20
            const yFactor = -10 + Math.random() * 20
            const zFactor = -10 + Math.random() * 20
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
        }
        return temp
    }, [count])

    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Custom materials with vertex colors
    const colorArray = useMemo(() => {
        const colors = new Float32Array(count * 3)
        const c1 = new THREE.Color("#7C5CFF") // primary
        const c2 = new THREE.Color("#C6FF3D") // secondary

        for (let i = 0; i < count; i++) {
            const mixed = c1.clone().lerp(c2, Math.random())
            colors[i * 3] = mixed.r
            colors[i * 3 + 1] = mixed.g
            colors[i * 3 + 2] = mixed.b
        }
        return colors
    }, [count])

    useFrame((state, delta) => {
        // Basic parallax effect
        mouse.current.x += ((state.pointer.x * 2) - mouse.current.x) * 0.05
        mouse.current.y += ((-state.pointer.y * 2) - mouse.current.y) * 0.05

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle
            t = particle.t += speed / 2
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.cos(t)

            particle.mx += (mouse.current.x * 0.5 - particle.mx) * 0.01
            particle.my += (mouse.current.y * 0.5 - particle.my) * 0.01

            dummy.position.set(
                (xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10) + particle.mx * 2,
                (yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10) + particle.my * 2,
                (zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10)
            )

            const scale = s * 0.05
            dummy.scale.set(scale, scale, scale)
            dummy.updateMatrix()
            mesh.current.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <dodecahedronGeometry args={[0.2, 0]}>
                <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
            </dodecahedronGeometry>
            <meshBasicMaterial toneMapped={false} vertexColors transparent opacity={0.6} fog={false} />
        </instancedMesh>
    )
}

export function ThreeBackground() {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReducedMotion) {
        return (
            <div className="absolute inset-0 bg-bg opacity-30 z-0 bg-[radial-gradient(circle_at_50%_0%,_#7C5CFF_0%,_transparent_60%)] pointer-events-none" />
        )
    }

    return (
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none fade-in">
            <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 15], fov: 60 }} performance={{ min: 0.5 }}>
                <color attach="background" args={['transparent']} />
                <Particles count={1000} />
            </Canvas>
        </div>
    )
}
