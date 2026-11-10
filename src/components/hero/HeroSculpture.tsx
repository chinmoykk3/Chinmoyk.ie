'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function SculptureMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  const prefersReducedMotion = useReducedMotion();

  // Create subtle procedural geometry
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2.2, 32), []);
  const wireframeGeo = useMemo(() => new THREE.IcosahedronGeometry(2.35, 12), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (!prefersReducedMotion) {
      // Smooth lerp rotation toward mouse pointer position
      const targetRotationX = pointer.y * 0.4 + state.clock.elapsedTime * 0.15;
      const targetRotationY = pointer.x * 0.5 + state.clock.elapsedTime * 0.2;

      meshRef.current.rotation.x = THREE.MathUtils.damp(
        meshRef.current.rotation.x,
        targetRotationX,
        4,
        delta
      );
      meshRef.current.rotation.y = THREE.MathUtils.damp(
        meshRef.current.rotation.y,
        targetRotationY,
        4,
        delta
      );

      if (wireframeRef.current) {
        wireframeRef.current.rotation.x = meshRef.current.rotation.x * 0.8;
        wireframeRef.current.rotation.y = -meshRef.current.rotation.y * 0.6;
      }
    }
  });

  return (
    <Float
      speed={prefersReducedMotion ? 0 : 2}
      rotationIntensity={prefersReducedMotion ? 0 : 0.8}
      floatIntensity={prefersReducedMotion ? 0 : 1.2}
    >
      <group>
        {/* Core Organic Sculpture */}
        <mesh ref={meshRef} geometry={geometry}>
          <MeshDistortMaterial
            color="#2a334d"
            roughness={0.2}
            metalness={0.85}
            distort={prefersReducedMotion ? 0 : 0.42}
            speed={prefersReducedMotion ? 0 : 2.5}
            clearcoat={0.6}
            clearcoatRoughness={0.15}
          />
        </mesh>

        {/* Outer Kinetic Lattice / Grid Structure */}
        <mesh ref={wireframeRef} geometry={wireframeGeo}>
          <meshStandardMaterial
            color="#6366f1"
            wireframe
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function HeroSculpture() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 8]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-8, -8, -5]} intensity={2.5} color="#3b82f6" />
        <pointLight position={[6, -6, 5]} intensity={2.0} color="#f59e0b" />

        <SculptureMesh />

        {/* Ambient particulate field */}
        <Sparkles count={45} scale={8} size={2.5} speed={0.4} opacity={0.4} color="#60a5fa" />
      </Canvas>
    </div>
  );
}
