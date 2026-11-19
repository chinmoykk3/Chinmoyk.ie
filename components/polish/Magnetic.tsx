'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { usePolish } from './PolishContext';
import { cn } from '@/lib/utils';

export interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  maxPull?: number; // Maximum offset in pixels (≤ 8px per requirement)
  radius?: number; // Activation bounding radius
}

export function Magnetic({ children, className, maxPull = 7, radius = 50 }: MagneticProps) {
  const { prefersReducedMotion } = useMotion();
  const { reduceEffects } = usePolish();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFinePointer, setIsFinePointer] = useState(false);

  const isReduced = prefersReducedMotion || reduceEffects;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(pointer: fine) and (hover: hover)');
    setIsFinePointer(media.matches);

    const onChange = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFinePointer || isReduced) return;
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < rect.width / 2 + radius) {
      // Smooth clamped magnetic pull (≤ maxPull)
      const pullFactor = Math.min(1, dist / (rect.width / 2 + radius));
      const pullX = (dx / (rect.width / 2)) * maxPull * pullFactor;
      const pullY = (dy / (rect.height / 2)) * maxPull * pullFactor;

      setPosition({
        x: Math.max(-maxPull, Math.min(maxPull, pullX)),
        y: Math.max(-maxPull, Math.min(maxPull, pullY)),
      });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  if (isReduced || !isFinePointer) {
    return <div className={cn('inline-block', className)}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('inline-block transition-transform duration-150 ease-out', className)}
      style={{
        transform: `translate3d(${position.x.toFixed(1)}px, ${position.y.toFixed(1)}px, 0)`,
        willChange: position.x !== 0 || position.y !== 0 ? 'transform' : 'auto',
      }}
    >
      {children}
    </div>
  );
}
