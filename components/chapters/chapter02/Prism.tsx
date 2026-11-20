'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface PrismProps {
  x: number;
  y: number;
  size?: number;
  inverted?: boolean;
  opacity?: number;
  rotation?: number;
  className?: string;
}

export function Prism({
  x,
  y,
  size = 90,
  inverted = false,
  opacity = 1,
  rotation = 0,
  className,
}: PrismProps) {
  // Equilateral triangle geometry
  // Height = size * sqrt(3) / 2
  const h = (size * Math.sqrt(3)) / 2;
  const halfS = size / 2;

  // Normal (apex up) vs Inverted (apex down)
  const p1 = inverted ? { x: 0, y: (2 / 3) * h } : { x: 0, y: (-2 / 3) * h }; // Apex
  const p2 = inverted ? { x: -halfS, y: (-1 / 3) * h } : { x: -halfS, y: (1 / 3) * h }; // Base Left
  const p3 = inverted ? { x: halfS, y: (-1 / 3) * h } : { x: halfS, y: (1 / 3) * h }; // Base Right

  const pathD = `M ${p1.x},${p1.y} L ${p2.x},${p2.y} L ${p3.x},${p3.y} Z`;

  // Inner highlight facet line
  const innerP1 = { x: p1.x * 0.72, y: p1.y * 0.72 };
  const innerP2 = { x: p2.x * 0.72, y: p2.y * 0.72 };
  const innerP3 = { x: p3.x * 0.72, y: p3.y * 0.72 };
  const innerPathD = `M ${innerP1.x},${innerP1.y} L ${innerP2.x},${innerP2.y} L ${innerP3.x},${innerP3.y} Z`;

  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rotation})`}
      style={{ opacity, transition: 'opacity 0.2s ease-out' }}
      className={cn('select-none pointer-events-none', className)}
    >
      {/* Subtle glass interior tint */}
      <path
        d={pathD}
        fill="var(--color-surface-elevated)"
        fillOpacity="0.3"
        style={{ backdropFilter: 'blur(2px)' }}
      />

      {/* Main glass prism boundary stroke */}
      <path
        d={pathD}
        fill="none"
        stroke="var(--color-border-strong)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        style={{ vectorEffect: 'non-scaling-stroke' }}
      />

      {/* Internal refraction facet / reflection line */}
      <path
        d={innerPathD}
        fill="none"
        stroke="var(--color-accent-gold)"
        strokeOpacity="0.45"
        strokeWidth="1"
        strokeDasharray="4 6"
        strokeLinejoin="round"
        style={{ vectorEffect: 'non-scaling-stroke' }}
      />

      {/* Glass edge highlights */}
      <line
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
        stroke="var(--color-accent-gold)"
        strokeOpacity="0.65"
        strokeWidth="1.25"
        style={{ vectorEffect: 'non-scaling-stroke' }}
      />

      {/* Apex dispersion spark node */}
      <circle
        cx={p1.x}
        cy={p1.y}
        r="2"
        fill="var(--color-accent-gold)"
        fillOpacity="0.8"
      />
    </g>
  );
}
