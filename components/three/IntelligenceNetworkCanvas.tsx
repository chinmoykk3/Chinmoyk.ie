'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { StaticNetworkFallback } from './StaticNetworkFallback';

export interface IntelligenceNetworkCanvasProps {
  inView?: boolean;
  highlightCategory?: 'completed' | 'experiments' | 'learning' | 'future' | null;
  className?: string;
}

function hasWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

// Inner 3D Network Particle Scene
function ParticleField({
  highlightCategory,
}: {
  highlightCategory?: 'completed' | 'experiments' | 'learning' | 'future' | null;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 3600; // Well under ≤ 6,000 requirement

  // Cluster assignment: 0: completed, 1: experiments, 2: learning, 3: future
  const clusterIndices = useMemo(() => {
    const arr = new Uint8Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      arr[i] = i % 4;
    }
    return arr;
  }, [particleCount]);

  // Generate 3D spherical constellation nodes with category assignments
  const [positions, baseColors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    // Primary iris color in normalized RGB floats: R: 0.61, G: 0.48, B: 1.0 (iris)
    const irisColor = new THREE.Color(0.61, 0.48, 1.0);
    const goldColor = new THREE.Color(1.0, 0.78, 0.34); // Gold nucleus
    const roseColor = new THREE.Color(1.0, 0.36, 0.54); // Rose visual
    const azureColor = new THREE.Color(0.3, 0.55, 1.0); // Azure builder
    const emberColor = new THREE.Color(1.0, 0.54, 0.3); // Ember future

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      // Clustered 3D neural distribution
      const radius = 4 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[idx] = radius * Math.sin(phi) * Math.cos(theta);
      pos[idx + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[idx + 2] = radius * Math.cos(phi);

      // Color assignment per cluster
      let c = irisColor;
      const cluster = i % 4;
      if (cluster === 0) c = goldColor;
      else if (cluster === 1) c = roseColor;
      else if (cluster === 2) c = azureColor;
      else if (cluster === 3) c = emberColor;

      col[idx] = c.r;
      col[idx + 1] = c.g;
      col[idx + 2] = c.b;
    }

    return [pos, col];
  }, [particleCount]);

  // Dynamic colors buffer that illuminates hovered/focused cluster nodes
  const dynamicColors = useMemo(() => new Float32Array(baseColors), [baseColors]);

  useEffect(() => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const colAttr = geom.getAttribute('color') as THREE.BufferAttribute | undefined;
    if (!colAttr) return;

    let targetCluster = -1;
    if (highlightCategory === 'completed') targetCluster = 0;
    else if (highlightCategory === 'experiments') targetCluster = 1;
    else if (highlightCategory === 'learning') targetCluster = 2;
    else if (highlightCategory === 'future') targetCluster = 3;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const cluster = clusterIndices[i];
      const isTarget = targetCluster === -1 || cluster === targetCluster;

      const boost = targetCluster !== -1 ? (isTarget ? 1.4 : 0.25) : 1.0;

      dynamicColors[idx] = Math.min(1, baseColors[idx] * boost);
      dynamicColors[idx + 1] = Math.min(1, baseColors[idx + 1] * boost);
      dynamicColors[idx + 2] = Math.min(1, baseColors[idx + 2] * boost);
    }

    colAttr.needsUpdate = true;
  }, [highlightCategory, baseColors, clusterIndices, dynamicColors, particleCount]);

  // Subtle rotation + reactive mouse tracking in RAF
  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Slow ambient rotation
    pointsRef.current.rotation.y += delta * 0.07;
    pointsRef.current.rotation.x += delta * 0.025;

    // Subtle reaction to cursor pointer coordinates
    const targetX = state.pointer.x * 0.35;
    const targetY = state.pointer.y * 0.35;
    pointsRef.current.rotation.y += (targetX - pointsRef.current.rotation.y) * 0.04;
    pointsRef.current.rotation.x += (-targetY - pointsRef.current.rotation.x) * 0.04;

    // Scale lerp on category highlight
    const targetScale = highlightCategory ? 1.06 : 1.0;
    pointsRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[dynamicColors, 3]} />
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
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    setWebglSupported(hasWebGL());
  }, []);

  if (!webglSupported) {
    return <StaticNetworkFallback className={className} />;
  }

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
