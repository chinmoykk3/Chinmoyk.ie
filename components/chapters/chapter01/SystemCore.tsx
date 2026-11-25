'use client';

import React from 'react';
import { LAMP_CONFIG } from './chapter01.config';

export interface SystemCoreProps {
  assemblyProgress: number; // 0 to 1
  isIgnited: boolean;
  ignitionGlow: number; // 0 to 1
  exitRayProgress: number; // 0 to 1
  gapGlowOpacity: number; // 0 to 1
}

/**
 * Central Developer System Core (Replaces the antique lamp)
 * Assembles the 4 engineering modules into a unified runtime engine & compiles online.
 */
export function SystemCore({
  assemblyProgress,
  isIgnited,
  ignitionGlow,
  exitRayProgress,
  gapGlowOpacity,
}: SystemCoreProps) {
  const { center, base, filament, exitRay } = LAMP_CONFIG;

  const baseOpacity = Math.min(1, assemblyProgress * 2.5);
  const conduitOpacity = Math.max(0, Math.min(1, (assemblyProgress - 0.2) * 2.5));
  const ringOpacity = Math.max(0, Math.min(1, (assemblyProgress - 0.45) * 2.5));
  const coreOpacity = Math.max(0, Math.min(1, (assemblyProgress - 0.65) * 3));

  return (
    <g id="system-core-assembly">
      <defs>
        <radialGradient id="core-ignition-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-accent-gold)" stopOpacity="0.85" />
          <stop offset="40%" stopColor="var(--color-accent-gold)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-accent-gold)" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="core-exit-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent-gold)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--color-accent-gold)" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* 1. Empty Target Blueprint Slot before assembly */}
      {assemblyProgress < 0.3 && (
        <g opacity={gapGlowOpacity * (1 - assemblyProgress * 3)}>
          <polygon
            points={`${center.x},${center.y - 52} ${center.x + 45},${center.y - 26} ${center.x + 45},${center.y + 26} ${center.x},${center.y + 52} ${center.x - 45},${center.y + 26} ${center.x - 45},${center.y - 26}`}
            stroke="var(--color-accent-gold)"
            strokeWidth="1"
            strokeDasharray="4 4"
            fill="none"
            opacity="0.5"
          />
          <text
            x={center.x}
            y={center.y + 4}
            textAnchor="middle"
            fill="var(--color-accent-gold)"
            stroke="none"
            fontFamily="var(--font-mono)"
            fontSize="10"
            letterSpacing="2"
            opacity="0.7"
          >
            CORE_SLOT
          </text>
        </g>
      )}

      {/* 2. Ignition Ambient Field */}
      {isIgnited && (
        <circle
          cx={filament.x}
          cy={filament.y}
          r={110 + ignitionGlow * 140}
          fill="url(#core-ignition-glow)"
          stroke="none"
          opacity={ignitionGlow * 0.7}
        />
      )}

      {/* 3. Base Bus Pedestal (from Kernel) */}
      {baseOpacity > 0 && (
        <g opacity={baseOpacity} stroke="var(--color-accent-gold)" fill="none">
          <path d={`M ${base.x - 52},${base.y} L ${base.x + 52},${base.y}`} strokeWidth="2" />
          <path d={`M ${base.x - 36},${base.y - 10} L ${base.x + 36},${base.y - 10}`} strokeWidth="1.2" opacity="0.7" />
          <line x1={base.x} y1={base.y - 10} x2={base.x} y2={filament.y + 48} strokeWidth="1.5" />
        </g>
      )}

      {/* 4. Data Conduit & Containment Hexagon (from Network + Terminal) */}
      {conduitOpacity > 0 && (
        <g opacity={conduitOpacity} stroke="var(--color-accent-gold)" fill="none">
          <circle
            cx={filament.x}
            cy={filament.y}
            r="56"
            strokeWidth="1"
            strokeDasharray="6 4"
            opacity={ringOpacity * 0.7}
          />
          {/* Cardinal Docking Nodes */}
          <circle cx={filament.x} cy={filament.y - 56} r="2" fill="var(--color-accent-gold)" stroke="none" opacity={ringOpacity} />
          <circle cx={filament.x + 56} cy={filament.y} r="2" fill="var(--color-accent-gold)" stroke="none" opacity={ringOpacity} />
          <circle cx={filament.x - 56} cy={filament.y} r="2" fill="var(--color-accent-gold)" stroke="none" opacity={ringOpacity} />
          <circle cx={filament.x} cy={filament.y + 56} r="2" fill="var(--color-accent-gold)" stroke="none" opacity={ringOpacity} />

          {/* Orbital Tick Marks */}
          <line x1={filament.x - 62} y1={filament.y} x2={filament.x - 68} y2={filament.y} strokeWidth="1" opacity={ringOpacity * 0.6} />
          <line x1={filament.x + 62} y1={filament.y} x2={filament.x + 68} y2={filament.y} strokeWidth="1" opacity={ringOpacity * 0.6} />

          <polygon
            points={`${filament.x},${filament.y - 44} ${filament.x + 38},${filament.y - 22} ${filament.x + 38},${filament.y + 22} ${filament.x},${filament.y + 44} ${filament.x - 38},${filament.y + 22} ${filament.x - 38},${filament.y - 22}`}
            strokeWidth="1.6"
            opacity={ringOpacity}
          />
        </g>
      )}

      {/* 5. Central Execution Node (from Neural Logic) */}
      {coreOpacity > 0 && (
        <g opacity={coreOpacity}>
          <circle
            cx={filament.x}
            cy={filament.y}
            r={isIgnited ? 14 : 9}
            fill="var(--color-accent-gold)"
            stroke="none"
            opacity={isIgnited ? 0.95 : 0.5}
          />
          <circle
            cx={filament.x}
            cy={filament.y}
            r="24"
            stroke="var(--color-accent-gold)"
            strokeWidth="1.2"
            fill="none"
            opacity={isIgnited ? 0.9 : 0.4}
          />
          {isIgnited && (
            <text
              x={filament.x}
              y={filament.y - 54}
              textAnchor="middle"
              fill="var(--color-accent-gold)"
              stroke="none"
              fontFamily="var(--font-mono)"
              fontSize="10"
              letterSpacing="3"
              opacity={ignitionGlow}
            >
              SYS // ONLINE
            </text>
          )}
        </g>
      )}

      {/* 6. Downward Data Bus Ray into Chapter 02 */}
      {exitRayProgress > 0 && (
        <line
          x1={exitRay.x}
          y1={exitRay.startY}
          x2={exitRay.x}
          y2={exitRay.startY + (exitRay.endY - exitRay.startY) * exitRayProgress}
          stroke="url(#core-exit-beam)"
          strokeWidth={1.5 + exitRayProgress * 1.5}
          opacity={0.7 + exitRayProgress * 0.3}
        />
      )}
    </g>
  );
}
