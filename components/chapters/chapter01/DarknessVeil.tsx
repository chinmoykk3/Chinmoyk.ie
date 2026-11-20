'use client';

import React, { useEffect, useRef } from 'react';
import { lightStore, LightState } from '@/lib/lightStore';
import { cn } from '@/lib/utils';

export interface DarknessVeilProps {
  autoX: number; // Viewport normalized auto target X (0 to 1)
  autoY: number; // Viewport normalized auto target Y (0 to 1)
  veilDarkness: number; // 0.94 initially, dropping to ~0.35 upon ignition
  isIgnited: boolean;
  isReducedMotion?: boolean;
  className?: string;
}

export function DarknessVeil({
  autoX,
  autoY,
  veilDarkness,
  isIgnited,
  isReducedMotion = false,
  className,
}: DarknessVeilProps) {
  const veilRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Smooth lerp state for light position
  const posRef = useRef({
    currentX: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500,
    currentY: typeof window !== 'undefined' ? window.innerHeight * 0.5 : 300,
    targetX: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500,
    targetY: typeof window !== 'undefined' ? window.innerHeight * 0.5 : 300,
    lastPointerMoveTime: 0,
    isFinePointer: false,
  });

  useEffect(() => {
    if (isReducedMotion) return;

    const mediaQuery = window.matchMedia('(pointer: fine)');
    posRef.current.isFinePointer = mediaQuery.matches;

    const handlePointerMove = (e: MouseEvent) => {
      if (!mediaQuery.matches || isIgnited) return;
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
      posRef.current.lastPointerMoveTime = performance.now();
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, [isReducedMotion, isIgnited]);

  // Main 60fps RAF loop updating CSS custom properties and lightStore
  useEffect(() => {
    if (isReducedMotion) return;

    const updateLoop = () => {
      const now = performance.now();
      const p = posRef.current;
      const veil = veilRef.current;

      // If no pointer move for ~1s or not a fine pointer, fallback to timeline auto target
      const idle = !p.isFinePointer || now - p.lastPointerMoveTime > 1100 || isIgnited;
      if (idle) {
        p.targetX = window.innerWidth * autoX;
        p.targetY = window.innerHeight * autoY;
      }

      // Smooth lerp ~0.12
      const lerp = 0.12;
      p.currentX += (p.targetX - p.currentX) * lerp;
      p.currentY += (p.targetY - p.currentY) * lerp;

      // Calculate radius (22 to 28 vmin)
      const vmin = Math.min(window.innerWidth, window.innerHeight);
      const radius = Math.round(vmin * 0.25);

      if (veil) {
        veil.style.setProperty('--lx', `${p.currentX.toFixed(1)}px`);
        veil.style.setProperty('--ly', `${p.currentY.toFixed(1)}px`);
        veil.style.setProperty('--lr', `${radius}px`);
        veil.style.setProperty('--veil-darkness', veilDarkness.toFixed(3));
      }

      // Update shared lightStore for background canvas dust motes
      lightStore.setState({
        x: p.currentX,
        y: p.currentY,
        radius,
        intensity: isIgnited ? 1.0 : 0.85,
        gold: isIgnited,
        veilDarkness,
      });

      animFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animFrameRef.current = requestAnimationFrame(updateLoop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [autoX, autoY, veilDarkness, isIgnited, isReducedMotion]);

  if (isReducedMotion) {
    return null; // Reduced motion mode disables the darkness veil overlay
  }

  return (
    <div
      ref={veilRef}
      aria-hidden="true"
      className={cn(
        'absolute inset-0 pointer-events-none z-15 select-none transition-opacity duration-500',
        className
      )}
      style={{
        background: `radial-gradient(circle var(--lr, 25vmin) at var(--lx, 50%) var(--ly, 50%), transparent 0%, transparent 35%, rgba(0, 0, 0, var(--veil-darkness, 0.94)) 100%)`,
      }}
    />
  );
}
