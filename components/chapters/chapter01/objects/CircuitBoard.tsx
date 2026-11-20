'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface CircuitBoardProps {
  x: number;
  y: number;
  openProgress: number; // 0.0 to 1.0
  motionSpeed: number; // 1.0 to 0.0
  isPartDetached?: boolean;
  isEmptied?: boolean;
  className?: string;
}

export function CircuitBoard({
  x,
  y,
  openProgress,
  motionSpeed,
  isPartDetached = false,
  isEmptied = false,
  className,
}: CircuitBoardProps) {
  // Signal packet travel offset
  const packetOffset = (motionSpeed * 40) % 30;

  return (
    <g
      id="object-circuit-board"
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
      {/* 1. Shell: PCB Substrate Outline, Ground Plane & Mounting Holes */}
      <g id="circuit-shell" strokeWidth="1.5">
        {/* PCB Board Outline */}
        <polygon
          points="-48,-38 42,-38 48,-32 48,38 -48,38"
          strokeWidth="1.75"
          fill="var(--color-surface)"
          fillOpacity="0.4"
        />
        {/* 4 Corner Mounting Holes */}
        <circle cx="-42" cy="-32" r="3" strokeWidth="1" />
        <circle cx="42" cy="-32" r="3" strokeWidth="1" />
        <circle cx="-42" cy="32" r="3" strokeWidth="1" />
        <circle cx="42" cy="32" r="3" strokeWidth="1" />
        {/* Edge connector gold fingers */}
        <line x1="-30" y1="38" x2="-30" y2="44" strokeWidth="2" />
        <line x1="-20" y1="38" x2="-20" y2="44" strokeWidth="2" />
        <line x1="-10" y1="38" x2="-10" y2="44" strokeWidth="2" />
        <line x1="0" y1="38" x2="0" y2="44" strokeWidth="2" />
        <line x1="10" y1="38" x2="10" y2="44" strokeWidth="2" />
        <line x1="20" y1="38" x2="20" y2="44" strokeWidth="2" />
        <line x1="30" y1="38" x2="30" y2="44" strokeWidth="2" />
      </g>

      {/* 2. Inside: "X-Ray" Logic Core, Traces & Travelling Signal Packets */}
      {openProgress > 0 && (
        <g
          id="circuit-inside"
          style={{
            opacity: openProgress,
            transform: `scale(${0.85 + openProgress * 0.15})`,
            transformOrigin: '0px 0px',
            transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
          }}
        >
          {/* Microcontroller Silicon Chip */}
          <rect x="-16" y="-16" width="32" height="32" rx="2" strokeWidth="1.5" />
          <circle cx="-10" cy="-10" r="1.5" fill="var(--color-accent-gold)" />

          {/* Copper Signal Traces */}
          <g strokeWidth="1">
            <path d="M -16,-6 L -32,-6 L -38,-14" />
            <path d="M -16,6 L -32,6 L -38,14" />
            <path d="M 16,-6 L 32,-6 L 38,-14" />
            <path d="M 16,6 L 32,6 L 38,14" />
            <path d="M -6,-16 L -6,-28 L -16,-34" />
            <path d="M 6,-16 L 6,-28 L 16,-34" />
          </g>

          {/* Solder Test Points */}
          <circle cx="-38" cy="-14" r="2" />
          <circle cx="-38" cy="14" r="2" />
          <circle cx="38" cy="-14" r="2" />
          <circle cx="38" cy="14" r="2" />

          {/* Travelling Data Signal Packets */}
          {motionSpeed > 0 && (
            <circle
              cx={-16 - packetOffset * 0.6}
              cy={-6}
              r="2"
              fill="var(--color-accent-gold)"
            />
          )}

          {/* Central Toggle Switch (Detachable -> Lamp Switch) */}
          {!isPartDetached && (
            <g id="part-circuit-switch" transform="translate(0, 22)">
              <rect x="-8" y="-4" width="16" height="8" rx="2" strokeWidth="1.25" />
              <line x1="-3" y1="-2" x2="3" y2="-2" strokeWidth="1.5" />
              <circle cx="2" cy="0" r="1.5" fill="var(--color-accent-gold)" />
            </g>
          )}
        </g>
      )}

      {/* Protective Shield Shroud (Pivots open) */}
      <g
        id="circuit-protective-shroud"
        style={{
          transform: `translate(${openProgress * -42}px, ${openProgress * 25}px) rotate(${openProgress * -35}deg)`,
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        strokeWidth="1.2"
        opacity={1 - openProgress * 0.4}
      >
        <rect x="-44" y="-34" width="88" height="68" rx="4" strokeDasharray="3 3" />
        <line x1="-30" y1="0" x2="30" y2="0" strokeWidth="0.75" opacity="0.5" />
      </g>
    </g>
  );
}
