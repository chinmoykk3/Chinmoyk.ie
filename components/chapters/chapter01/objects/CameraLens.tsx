'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface CameraLensProps {
  x: number;
  y: number;
  openProgress: number; // 0.0 to 1.0
  motionSpeed: number; // 1.0 to 0.0
  isPartDetached?: boolean;
  isEmptied?: boolean;
  className?: string;
}

export function CameraLens({
  x,
  y,
  openProgress,
  motionSpeed,
  isPartDetached = false,
  isEmptied = false,
  className,
}: CameraLensProps) {
  // Aperture blade iris rotation angle
  const irisAngle = motionSpeed * 22;

  return (
    <g
      id="object-camera-lens"
      transform={`translate(${x}, ${y})`}
      className={cn('select-none pointer-events-none transition-opacity duration-300', className)}
      style={{
        opacity: isEmptied ? 0.35 : 1,
        vectorEffect: 'non-scaling-stroke',
      }}
      stroke="var(--color-accent-gold)"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* 1. Shell: Optical Barrel & Focus Knurling */}
      <g id="lens-shell" strokeWidth="1.5">
        {/* Outer Cylindrical Barrel Body */}
        <circle cx="0" cy="0" r="46" strokeWidth="1.75" />
        <circle cx="0" cy="0" r="41" strokeDasharray="3 3" strokeWidth="0.8" />
        {/* Focus distance scale ticks */}
        {[...Array(8)].map((_, i) => (
          <line
            key={`lens-tick-${i}`}
            x1="0"
            y1="-46"
            x2="0"
            y2="-42"
            strokeWidth="1.5"
            transform={`rotate(${i * 45})`}
          />
        ))}
      </g>

      {/* 2. Inside: "X-Ray" Glass Elements & Aperture Iris Blades */}
      {openProgress > 0 && (
        <g
          id="lens-inside"
          style={{
            opacity: openProgress,
            transform: `scale(${0.85 + openProgress * 0.15})`,
            transformOrigin: '0px 0px',
            transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
          }}
        >
          {/* Convex Optical Glass Element (Detachable -> Lamp Shade) */}
          {!isPartDetached && (
            <g id="part-lens-shade">
              {/* Convex glass curvature arcs */}
              <circle cx="0" cy="0" r="32" strokeWidth="1.25" strokeDasharray="6 2" opacity="0.8" />
              <path d="M -26,-12 C -12,-24 12,-24 26,-12 C 12,0 -12,0 -26,-12 Z" strokeWidth="1.5" />
            </g>
          )}

          {/* Aperture Iris Blades (Detachable -> Lamp Filament) */}
          {!isPartDetached && (
            <g
              id="part-lens-filament"
              transform={`rotate(${irisAngle})`}
              className="transition-transform duration-75"
              strokeWidth="1.25"
            >
              {/* 6 Interlocking Aperture Blades */}
              {[...Array(6)].map((_, i) => (
                <path
                  key={`blade-${i}`}
                  d="M 0,-16 L 14,-7 L 8,-2 Z"
                  transform={`rotate(${i * 60})`}
                />
              ))}
              <circle cx="0" cy="0" r="5" strokeWidth="1" strokeDasharray="2 2" />
            </g>
          )}

          {/* Light ray ray-tracing vectors */}
          <line x1="-32" y1="-32" x2="32" y2="32" strokeWidth="0.75" strokeDasharray="2 4" opacity="0.4" />
          <line x1="-32" y1="32" x2="32" y2="-32" strokeWidth="0.75" strokeDasharray="2 4" opacity="0.4" />
        </g>
      )}

      {/* Front Optical Filter Ring (Slides forward) */}
      <g
        id="lens-filter-ring"
        style={{
          transform: `translate(${openProgress * 38}px, ${openProgress * -18}px)`,
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        strokeWidth="1.2"
        opacity={1 - openProgress * 0.3}
      >
        <circle cx="0" cy="0" r="44" strokeWidth="1.25" />
        <text
          x="0"
          y="35"
          textAnchor="middle"
          fill="var(--color-accent-gold)"
          fontSize="7"
          fontFamily="var(--font-mono)"
          letterSpacing="0.1em"
          stroke="none"
        >
          f/1.4 &middot; 50mm
        </text>
      </g>
    </g>
  );
}
