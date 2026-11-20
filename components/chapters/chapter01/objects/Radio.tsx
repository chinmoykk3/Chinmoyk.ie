'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface RadioProps {
  x: number;
  y: number;
  openProgress: number; // 0.0 (closed shell) to 1.0 (open x-ray)
  motionSpeed: number; // 1.0 (pulsing) to 0.0 (quieted)
  isPartDetached?: boolean;
  isEmptied?: boolean;
  className?: string;
}

export function Radio({
  x,
  y,
  openProgress,
  motionSpeed,
  isPartDetached = false,
  isEmptied = false,
  className,
}: RadioProps) {
  // Acoustic diaphragm pulse scaling
  const pulseScale = 1 + motionSpeed * 0.06;

  return (
    <g
      id="object-radio"
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
      {/* 1. Shell: Retro Chassis, Antenna & Knobs */}
      <g id="radio-shell" strokeWidth="1.5">
        {/* Telescoping Antenna */}
        <line x1="-35" y1="-50" x2="-60" y2="-95" strokeWidth="1.25" />
        <circle cx="-60" cy="-95" r="2" fill="var(--color-accent-gold)" />
        {/* Main Cabinet Box */}
        <rect x="-55" y="-50" width="110" height="85" rx="6" strokeWidth="1.75" />
        {/* Carrying Handle */}
        <path d="M -35,-50 C -35,-65 35,-65 35,-50" strokeWidth="1.25" />
        {/* Dial Window */}
        <rect x="-42" y="-38" width="84" height="20" rx="3" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="-30" y1="-28" x2="30" y2="-28" strokeWidth="0.75" />
        <line x1="5" y1="-34" x2="5" y2="-22" strokeWidth="1.5" />
        {/* Volume & Tuning Knobs */}
        <circle cx="-30" cy="18" r="8" strokeWidth="1.25" />
        <circle cx="30" cy="18" r="8" strokeWidth="1.25" />
        <line x1="-30" y1="12" x2="-30" y2="16" strokeWidth="1.5" />
        <line x1="30" y1="12" x2="30" y2="16" strokeWidth="1.5" />
      </g>

      {/* 2. Inside: "X-Ray" Induction Coil & Vacuum Tube */}
      {openProgress > 0 && (
        <g
          id="radio-inside"
          style={{
            opacity: openProgress,
            transform: `scale(${0.85 + openProgress * 0.15})`,
            transformOrigin: '0px 0px',
            transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
          }}
        >
          {/* Pulsing Acoustic Speaker Diaphragm (Center) */}
          <g transform={`scale(${pulseScale})`} style={{ transformOrigin: '0px 10px' }}>
            <circle cx="0" cy="10" r="16" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
            <circle cx="0" cy="10" r="6" strokeWidth="1.25" />
          </g>

          {/* Induction Tuning Coil (Detachable -> Lamp Stem) */}
          {!isPartDetached && (
            <g id="part-radio-coil" strokeWidth="1.75">
              {/* Helical wire coil windings */}
              <path d="M -16,-20 Q -8,-28 0,-20 Q 8,-12 16,-20" />
              <path d="M -16,-12 Q -8,-20 0,-12 Q 8,-4 16,-12" />
              <path d="M -16,-4 Q -8,-12 0,-4 Q 8,4 16,-4" />
              <path d="M -16,4 Q -8,-4 0,4 Q 8,12 16,4" />
              <line x1="-16" y1="-20" x2="-16" y2="4" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
              <line x1="16" y1="-20" x2="16" y2="4" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
            </g>
          )}

          {/* Vacuum Tube Triode Valve (Right) */}
          <g transform="translate(32, -18)" strokeWidth="1">
            <rect x="-6" y="-14" width="12" height="24" rx="6" />
            <line x1="0" y1="-8" x2="0" y2="4" strokeWidth="1.25" opacity={motionSpeed > 0 ? 0.9 : 0.3} />
            <circle cx="0" cy="-2" r="1.5" fill="var(--color-accent-gold)" opacity={motionSpeed} />
          </g>
        </g>
      )}

      {/* Front Speaker Grille (Slams open on hinge) */}
      <g
        id="radio-grille-panel"
        style={{
          transform: `translate(${openProgress * 48}px, 0) rotate(${openProgress * 45}deg)`,
          transformOrigin: '55px 0px',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        strokeWidth="1"
        opacity={1 - openProgress * 0.4}
      >
        <line x1="-20" y1="-2" x2="20" y2="-2" strokeWidth="1.2" />
        <line x1="-20" y1="4" x2="20" y2="4" strokeWidth="1.2" />
        <line x1="-20" y1="10" x2="20" y2="10" strokeWidth="1.2" />
        <line x1="-20" y1="16" x2="20" y2="16" strokeWidth="1.2" />
      </g>
    </g>
  );
}
