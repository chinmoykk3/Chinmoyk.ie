'use client';

import React from 'react';
import { LAMP_CONFIG } from './chapter01.config';
import { cn } from '@/lib/utils';

export interface LampProps {
  assemblyProgress: number; // 0.0 (empty gap) to 1.0 (fully assembled)
  isIgnited: boolean;
  ignitionGlow: number; // 0.0 to 1.0
  exitRayProgress: number; // 0.0 to 1.0 (narrows into thread ray)
  gapGlowOpacity?: number;
  className?: string;
}

export function Lamp({
  assemblyProgress,
  isIgnited,
  ignitionGlow,
  exitRayProgress,
  gapGlowOpacity = 0,
  className,
}: LampProps) {
  const { center, base, stem, switch: switchPos, shade, filament, spark, exitRay } = LAMP_CONFIG;

  return (
    <g
      id="chapter01-lamp-system"
      className={cn('select-none pointer-events-none', className)}
      stroke="var(--color-accent-gold)"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        {/* Pre-baked radial glow for the ignited lamp */}
        <radialGradient id="lamp-ignition-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-accent-gold)" stopOpacity="0.85" />
          <stop offset="35%" stopColor="var(--color-accent-gold)" stopOpacity="0.45" />
          <stop offset="70%" stopColor="var(--color-accent-gold)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--color-accent-gold)" stopOpacity="0" />
        </radialGradient>

        {/* Conic illumination beam onto the workbench */}
        <linearGradient id="lamp-conic-beam-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent-gold)" stopOpacity="0.75" />
          <stop offset="45%" stopColor="var(--color-accent-gold)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--color-accent-gold)" stopOpacity="0" />
        </linearGradient>

        {/* Exit Thread Ray gradient down to Chapter 02 */}
        <linearGradient id="lamp-exit-ray-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent-gold)" stopOpacity="1" />
          <stop offset="80%" stopColor="var(--color-accent-gold)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--color-accent-gold)" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* 1. The Empty "Gap": Dashed outline on center bench (Beat 2) */}
      {assemblyProgress < 0.95 && (
        <g
          id="lamp-empty-gap"
          strokeWidth="1.25"
          strokeDasharray="4 6"
          style={{
            opacity: gapGlowOpacity * (1 - assemblyProgress),
            transition: 'opacity 0.25s ease-out',
            vectorEffect: 'non-scaling-stroke',
          }}
        >
          {/* Base ellipse outline */}
          <ellipse cx={base.x} cy={base.y} rx="34" ry="12" />
          {/* Stem outline */}
          <line x1={center.x - 4} y1={base.y} x2={center.x - 4} y2={shade.y + 20} />
          <line x1={center.x + 4} y1={base.y} x2={center.x + 4} y2={shade.y + 20} />
          {/* Shade silhouette */}
          <path d="M 460,250 L 540,250 L 525,225 L 475,225 Z" />
        </g>
      )}

      {/* 2. Downward Conic Illumination Beam (Ignited Beat 5) */}
      {ignitionGlow > 0 && (
        <g id="lamp-flood-light" style={{ opacity: ignitionGlow }}>
          {/* Conic light beam onto workbench */}
          <polygon
            points="500,260 410,540 590,540"
            fill="url(#lamp-conic-beam-grad)"
            stroke="none"
          />
          {/* Light pool on table */}
          <ellipse
            cx="500"
            cy="540"
            rx="120"
            ry="24"
            fill="var(--color-accent-gold)"
            fillOpacity="0.12"
            stroke="none"
          />
        </g>
      )}

      {/* 3. The Assembled Lamp Structure */}
      {assemblyProgress > 0.1 && (
        <g
          id="assembled-lamp-body"
          style={{
            opacity: Math.min(1, assemblyProgress * 1.5),
            vectorEffect: 'non-scaling-stroke',
          }}
        >
          {/* Component 1: Base (Large Watch Gear) */}
          <g id="lamp-part-base" transform={`translate(${base.x}, ${base.y})`}>
            {/* Gear in perspective plane as solid lamp foot */}
            <ellipse cx="0" cy="0" rx="34" ry="12" strokeWidth="1.75" />
            <ellipse cx="0" cy="0" rx="18" ry="6" strokeWidth="1" strokeDasharray="3 3" />
            {/* Base mounting collar */}
            <rect x="-8" y="-6" width="16" height="6" rx="2" fill="var(--color-surface)" />
          </g>

          {/* Component 2: Stem (Radio Induction Coil) */}
          <g id="lamp-part-stem" strokeWidth="1.75">
            {/* Vertical helical windings linking base to shade */}
            <path d="M 494,435 Q 500,425 506,435 Q 500,445 494,435" />
            <path d="M 494,410 Q 500,400 506,410 Q 500,420 494,410" />
            <path d="M 494,385 Q 500,375 506,385 Q 500,395 494,385" />
            <path d="M 494,360 Q 500,350 506,360 Q 500,370 494,360" />
            <path d="M 494,335 Q 500,325 506,335 Q 500,345 494,335" />
            <path d="M 494,310 Q 500,300 506,310 Q 500,320 494,310" />
            <path d="M 494,285 Q 500,275 506,285 Q 500,295 494,285" />
            {/* Stem central spine */}
            <line x1="500" y1="435" x2="500" y2="280" strokeWidth="2" />
          </g>

          {/* Component 3: Switch (Circuit Trace Toggle) */}
          <g id="lamp-part-switch" transform={`translate(${switchPos.x}, ${switchPos.y})`}>
            <rect x="-6" y="-3" width="12" height="6" rx="1.5" strokeWidth="1.25" fill="var(--color-surface)" />
            <line x1="-2" y1="-2" x2="2" y2="2" strokeWidth="1.5" />
            <circle cx="2" cy="2" r="1.5" fill="var(--color-accent-gold)" />
          </g>

          {/* Component 4: Shade (Camera Lens Optical Element) */}
          <g id="lamp-part-shade" transform={`translate(${shade.x}, ${shade.y})`}>
            {/* Conical bell shade */}
            <path d="M -38,22 L 38,22 L 24,-12 L -24,-12 Z" strokeWidth="1.75" />
            <ellipse cx="0" cy="22" rx="38" ry="10" strokeWidth="1.2" />
            <ellipse cx="0" cy="-12" rx="24" ry="6" strokeWidth="1.2" />
            <circle cx="0" cy="-16" r="3" strokeWidth="1" />
          </g>

          {/* Component 5: Filament (Aperture Iris Blades) */}
          <g id="lamp-part-filament" transform={`translate(${filament.x}, ${filament.y})`}>
            {/* Aperture blades forming the glowing filament core */}
            {[...Array(6)].map((_, i) => (
              <path
                key={`filament-blade-${i}`}
                d="M 0,-8 L 8,-3 L 4,0 Z"
                transform={`rotate(${i * 60})`}
                strokeWidth="1.2"
              />
            ))}
            <circle cx="0" cy="0" r="3.5" strokeWidth="1" />
          </g>

          {/* Component 6: Spark (The Gold Point that landed and ignited) */}
          {isIgnited && (
            <g id="lamp-ignited-spark" transform={`translate(${spark.x}, ${spark.y})`}>
              {/* Radial glow aura */}
              <circle cx="0" cy="0" r="42" fill="url(#lamp-ignition-glow)" />
              {/* Core radiant point */}
              <circle
                cx="0"
                cy="0"
                r="4"
                fill="var(--color-accent-gold)"
                style={{ filter: 'drop-shadow(0 0 6px var(--color-accent-gold))' }}
              />
            </g>
          )}
        </g>
      )}

      {/* 4. Exit Gold Thread Ray descending down to Chapter 02 (88% to 100%) */}
      {exitRayProgress > 0 && (
        <g id="lamp-thread-exit-ray">
          {/* Central concentrated laser ray */}
          <line
            x1={exitRay.x}
            y1={exitRay.startY}
            x2={exitRay.x}
            y2={exitRay.startY + (exitRay.endY - exitRay.startY) * exitRayProgress}
            stroke="var(--color-accent-gold)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0 0 4px var(--color-accent-gold))',
              vectorEffect: 'non-scaling-stroke',
            }}
          />
          {/* Tapered light ray envelope */}
          <polygon
            points={`497,${exitRay.startY} 503,${exitRay.startY} 501,${exitRay.startY + (exitRay.endY - exitRay.startY) * exitRayProgress} 499,${exitRay.startY + (exitRay.endY - exitRay.startY) * exitRayProgress}`}
            fill="url(#lamp-exit-ray-grad)"
            opacity="0.8"
          />
          {/* Leading luminous head node */}
          <circle
            cx={exitRay.x}
            cy={exitRay.startY + (exitRay.endY - exitRay.startY) * exitRayProgress}
            r="3.5"
            fill="var(--color-accent-gold)"
          />
        </g>
      )}
    </g>
  );
}
