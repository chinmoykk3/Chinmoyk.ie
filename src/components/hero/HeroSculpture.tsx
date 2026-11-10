'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SculptureSceneProps {
  isDragging: boolean;
  dragDelta: { x: number; y: number };
  resetDragDelta: () => void;
  scrollProgress: number;
}

function SculptureScene({
  isDragging,
  dragDelta,
  resetDragDelta,
  scrollProgress,
}: SculptureSceneProps) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const mainSculptureRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const pointerLightRef = useRef<THREE.PointLight>(null);

  const { pointer } = useThree();
  const prefersReducedMotion = useReducedMotion();

  // Rotation inertia tracking
  const rotationVelocity = useRef({ x: 0, y: 0 });
  const manualRotation = useRef({ x: 0.2, y: 0.3 });

  // Geometries memoized once to avoid any GC or memory churn
  const knotGeometry = useMemo(
    () => new THREE.TorusKnotGeometry(1.5, 0.4, 260, 48, 2, 3),
    []
  );
  const coreGeometry = useMemo(
    () => new THREE.OctahedronGeometry(0.75, 0),
    []
  );
  const ring1Geometry = useMemo(
    () => new THREE.TorusGeometry(2.35, 0.018, 16, 120),
    []
  );
  const ring2Geometry = useMemo(
    () => new THREE.TorusGeometry(2.58, 0.014, 16, 120),
    []
  );

  useFrame((state, delta) => {
    if (!rootGroupRef.current) return;

    if (prefersReducedMotion) {
      // Keep static position when reduced motion is preferred
      rootGroupRef.current.rotation.set(0.2, 0.3, 0);
      return;
    }

    const t = state.clock.elapsedTime;

    // 1. Process drag input and inertia
    if (isDragging) {
      rotationVelocity.current.x = dragDelta.y * 0.007;
      rotationVelocity.current.y = dragDelta.x * 0.007;
      manualRotation.current.x += rotationVelocity.current.x;
      manualRotation.current.y += rotationVelocity.current.y;
      resetDragDelta();
    } else {
      // Apply momentum decay / friction
      rotationVelocity.current.x *= 0.94;
      rotationVelocity.current.y *= 0.94;
      manualRotation.current.x += rotationVelocity.current.x;
      manualRotation.current.y += rotationVelocity.current.y;
    }

    // 2. Mouse position tracking with smooth damping
    const targetMouseX = pointer.y * 0.35;
    const targetMouseY = pointer.x * 0.45;

    // 3. Scroll-linked transition (subtle pull-back & rotation as user scrolls)
    const scrollOffset = scrollProgress * 1.5;
    rootGroupRef.current.position.y = THREE.MathUtils.damp(
      rootGroupRef.current.position.y,
      -scrollOffset * 0.8,
      3,
      delta
    );
    rootGroupRef.current.position.z = THREE.MathUtils.damp(
      rootGroupRef.current.position.z,
      -scrollOffset * 0.5,
      3,
      delta
    );

    // 4. Combine manual drag rotation, ambient time precession, and pointer parallax
    const targetRotX = manualRotation.current.x + targetMouseX + Math.sin(t * 0.2) * 0.08;
    const targetRotY = manualRotation.current.y + targetMouseY + t * 0.12;

    rootGroupRef.current.rotation.x = THREE.MathUtils.damp(
      rootGroupRef.current.rotation.x,
      targetRotX,
      5,
      delta
    );
    rootGroupRef.current.rotation.y = THREE.MathUtils.damp(
      rootGroupRef.current.rotation.y,
      targetRotY,
      5,
      delta
    );

    // 5. Individual part kinetics
    if (mainSculptureRef.current) {
      // Subtle organic breathing oscillation
      const scaleBreath = 1 + Math.sin(t * 1.2) * 0.025;
      mainSculptureRef.current.scale.set(scaleBreath, scaleBreath, scaleBreath);
    }

    if (coreRef.current) {
      // Counter-rotation of intelligence core
      coreRef.current.rotation.x = -t * 0.6;
      coreRef.current.rotation.y = t * 0.8;
      const corePulse = 1 + Math.sin(t * 2.4) * 0.06;
      coreRef.current.scale.set(corePulse, corePulse, corePulse);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.25;
      ring1Ref.current.rotation.y = t * 0.35;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.3;
      ring2Ref.current.rotation.z = t * 0.2;
    }

    // 6. Interactive cursor-tracking point light with proximity intensity
    if (pointerLightRef.current) {
      pointerLightRef.current.position.x = pointer.x * 4;
      pointerLightRef.current.position.y = pointer.y * 3;
      pointerLightRef.current.position.z = 3.5;

      // Distance from center
      const distFromCenter = Math.sqrt(pointer.x * pointer.x + pointer.y * pointer.y);
      const intensity = THREE.MathUtils.lerp(3.8, 1.8, Math.min(distFromCenter, 1));
      pointerLightRef.current.intensity = intensity;
    }
  });

  return (
    <>
      {/* Studio Lighting System */}
      <ambientLight intensity={0.65} />
      {/* Warm Solar Key Light (Ochre warm highlight) */}
      <directionalLight position={[6, 8, 6]} intensity={2.6} color="#fbbf24" />
      {/* Cool Algorithmic Rim Light (Cobalt hyper-specular) */}
      <pointLight position={[-7, -6, -5]} intensity={3.5} color="#2f68ee" />
      {/* Dynamic Cursor Light that highlights surface as mouse moves */}
      <pointLight
        ref={pointerLightRef}
        position={[0, 0, 4]}
        intensity={2.2}
        color="#38bdf8"
        distance={10}
        decay={2}
      />

      <Float
        speed={prefersReducedMotion ? 0 : 1.8}
        rotationIntensity={prefersReducedMotion ? 0 : 0.4}
        floatIntensity={prefersReducedMotion ? 0 : 0.8}
      >
        <group ref={rootGroupRef}>
          {/* Main Abstract Harmonic Sculpture */}
          <mesh ref={mainSculptureRef} geometry={knotGeometry}>
            <meshPhysicalMaterial
              color="#121724"
              roughness={0.16}
              metalness={0.92}
              clearcoat={1.0}
              clearcoatRoughness={0.08}
              reflectivity={0.95}
              envMapIntensity={1.2}
            />
          </mesh>

          {/* Inner Pulsing Intelligence Core */}
          <mesh ref={coreRef} geometry={coreGeometry}>
            <meshStandardMaterial
              color="#090d16"
              emissive="#3b82f6"
              emissiveIntensity={2.8}
              wireframe
              transparent
              opacity={0.85}
            />
          </mesh>

          {/* Concentric Gyroscopic Orbital Ring 1 (Cobalt accent) */}
          <mesh ref={ring1Ref} geometry={ring1Geometry}>
            <meshStandardMaterial
              color="#2f68ee"
              roughness={0.3}
              metalness={0.8}
              transparent
              opacity={0.45}
            />
          </mesh>

          {/* Concentric Gyroscopic Orbital Ring 2 (Ochre accent) */}
          <mesh ref={ring2Ref} geometry={ring2Geometry}>
            <meshStandardMaterial
              color="#e67e3a"
              roughness={0.3}
              metalness={0.85}
              transparent
              opacity={0.4}
            />
          </mesh>

          {/* Stardust / Synaptic particulate constellation */}
          <Sparkles
            count={48}
            scale={7.5}
            size={2.8}
            speed={0.45}
            opacity={0.4}
            color="#93c5fd"
          />
        </group>
      </Float>

      {/* Ground Contact Shadow */}
      <ContactShadows
        position={[0, -2.6, 0]}
        opacity={0.45}
        scale={9}
        blur={2.4}
        far={4.5}
        color="#000000"
      />
    </>
  );
}

export function HeroSculpture() {
  const [isDragging, setIsDragging] = useState(false);
  const [dragDelta, setDragDelta] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastPointerPos = useRef({ x: 0, y: 0 });

  // Track window scroll for seamless transition into Chapter 01
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(Math.max(scrollY / windowHeight, 0), 1.5);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    lastPointerPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPointerPos.current.x;
    const dy = e.clientY - lastPointerPos.current.y;
    lastPointerPos.current = { x: e.clientX, y: e.clientY };
    setDragDelta((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignore if not captured
    }
  };

  const resetDragDelta = () => {
    setDragDelta({ x: 0, y: 0 });
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`w-full h-full relative select-none touch-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      data-cursor={isDragging ? 'grabbing' : 'view'}
      aria-label="Interactive 3D Abstract Sculpture by Chinmoy Kalita. Click and drag to inspect in 360 degrees."
    >
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        <SculptureScene
          isDragging={isDragging}
          dragDelta={dragDelta}
          resetDragDelta={resetDragDelta}
          scrollProgress={scrollProgress}
        />
      </Canvas>
    </div>
  );
}
