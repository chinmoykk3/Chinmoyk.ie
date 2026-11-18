'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function AmbientParticles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const [particleColor, setParticleColor] = useState<string>('var(--color-gold)');
  const [particles] = useState(() => {
    const count = 45;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return positions;
  });

  useEffect(() => {
    // Read active design token dynamically to avoid hardcoded hex
    const rootStyle = getComputedStyle(document.documentElement);
    const tokenVal = rootStyle.getPropertyValue('--color-gold').trim() || 'gold';
    setParticleColor(tokenVal);
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={particleColor}
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

export function DocumentaryCanvas() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  if (!mounted || reducedMotion) {
    // Accessible fallback: Ambient subtle wash using design token classes with zero WebGL overhead
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none -z-10 opacity-30 bg-chapter-wash"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 opacity-50 transition-opacity"
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ alpha: true, antialias: true }}>
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <AmbientParticles />
        </Float>
      </Canvas>
    </div>
  );
}
