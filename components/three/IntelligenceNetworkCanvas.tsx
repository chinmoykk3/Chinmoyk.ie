'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface IntelligenceNetworkCanvasProps {
  inView?: boolean;
  highlightCategory?: 'completed' | 'experiments' | 'learning' | 'future' | null;
  className?: string;
}

// Inner 3D Network Particle Scene
function ParticleField({
  highlightCategory,
}: {
  highlightCategory?: 'completed' | 'experiments' | 'learning' | 'future' | null;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 3600; // Well under ≤ 6,000 requirement

  // Generate 3D spherical constellation nodes with category assignments
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    // Primary iris color in normalized RGB floats: R: 0.65, G: 0.54, B: 0.98
    const baseColor = new THREE.Color(0.65, 0.54, 0.98);
    const goldColor = new THREE.Color(0.98, 0.75, 0.14); // Gold nucleus
    const azureColor = new THREE.Color(0.22, 0.74, 0.97); // Azure builder
    const roseColor = new THREE.Color(0.98, 0.44, 0.52); // Rose visual

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      // Clustered 3D neural distribution
      const radius = 4 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[idx] = radius * Math.sin(phi) * Math.cos(theta);
      pos[idx + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[idx + 2] = radius * Math.cos(phi);

      // Color variation across the 4 clusters
      let c = baseColor;
      if (i % 4 === 0) c = goldColor;
      else if (i % 4 === 1) c = azureColor;
      else if (i % 4 === 2) c = roseColor;

      col[idx] = c.r;
      col[idx + 1] = c.g;
      col[idx + 2] = c.b;
    }

    return [pos, col];
  }, [particleCount]);

  // Subtle rotation + reactive mouse tracking in RAF
  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Slow ambient rotation
    pointsRef.current.rotation.y += delta * 0.08;
    pointsRef.current.rotation.x += delta * 0.03;

    // Subtle reaction to cursor pointer coordinates
    const targetX = state.pointer.x * 0.4;
    const targetY = state.pointer.y * 0.4;
    pointsRef.current.rotation.y += (targetX - pointsRef.current.rotation.y) * 0.05;
    pointsRef.current.rotation.x += (-targetY - pointsRef.current.rotation.x) * 0.05;

    // Subtle scale pulse on category highlight
    const targetScale = highlightCategory ? 1.08 : 1.0;
    pointsRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.11}
        vertexColors
        transparent
        opacity={highlightCategory ? 0.95 : 0.75}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function IntelligenceNetworkCanvas({
  inView = true,
  highlightCategory,
  className,
}: IntelligenceNetworkCanvasProps) {
  return (
    <div aria-hidden="true" className={className || 'w-full h-full relative pointer-events-none'}>
      <Canvas
        camera={{ position: [0, 0, 14], fov: 55 }}
        dpr={[1, 1.75]} // Cap DPR at 1.75 per requirement
        frameloop={inView ? 'always' : 'never'} // Pause when off-screen
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          alpha: true,
        }}
      >
        <ParticleField highlightCategory={highlightCategory} />
      </Canvas>
    </div>
  );
}
