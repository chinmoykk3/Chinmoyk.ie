'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface PocketWatchProps {
  x: number;
  y: number;
  openProgress: number; // 0.0 (closed shell) to 1.0 (fully open x-ray)
  motionSpeed: number; // 1.0 (running) to 0.0 (quieted)
  isPartDetached?: boolean;
  isEmptied?: boolean;
  className?: string;
}

export function PocketWatch({
  x,
  y,
  openProgress,
  motionSpeed,
  isPartDetached = false,
  isEmptied = false,
  className,
}: PocketWatchProps) {
  // Gear rotation angle based on continuous motionSpeed
  const gearAngle = motionSpeed * 35;

  return (
    <g
      id="object-pocket-watch"
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
      {/* 1. Shell: Outer Pocket Watch Casing, Crown & Bow Ring */}
      <g id="watch-shell" strokeWidth="1.5">
        {/* Crown and top winding loop */}
        <circle cx="0" cy="-62" r="10" strokeWidth="1.25" />
        <rect x="-4" y="-52" width="8" height="6" rx="1" fill="var(--color-surface)" />
        {/* Outer casing rim */}
        <circle cx="0" cy="0" r="48" strokeWidth="1.75" />
        <circle cx="0" cy="0" r="43" strokeDasharray="1.5 5" strokeWidth="0.75" />
      </g>

      {/* 2. Inside: "X-Ray" Gear Train & Balance Mechanism */}
      {openProgress > 0 && (
        <g
          id="watch-inside"
          style={{
            opacity: openProgress,
            transform: `scale(${0.85 + openProgress * 0.15})`,
            transformOrigin: '0px 0px',
            transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
          }}
        >
          {/* Internal mechanism baseplate ring */}
          <circle cx="0" cy="0" r="38" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

          {/* Master Spur Gear (Detachable -> Lamp Base) */}
          {!isPartDetached && (
            <g
              id="part-watch-gear"
              transform={`rotate(${gearAngle})`}
              className="transition-transform duration-75"
            >
              <circle cx="0" cy="0" r="26" strokeWidth="1.5" />
              {/* 12 gear teeth */}
              {[...Array(12)].map((_, i) => (
                <line
                  key={`tooth-${i}`}
                  x1="0"
                  y1="-26"
                  x2="0"
                  y2="-30"
                  strokeWidth="2"
                  transform={`rotate(${i * 30})`}
                />
              ))}
              <circle cx="0" cy="0" r="7" strokeWidth="1.2" />
              {/* Lightening spokes */}
              <circle cx="0" cy="-14" r="4" strokeWidth="1" />
              <circle cx="14" cy="0" r="4" strokeWidth="1" />
              <circle cx="0" cy="14" r="4" strokeWidth="1" />
              <circle cx="-14" cy="0" r="4" strokeWidth="1" />
            </g>
          )}

          {/* Escapement balance wheel & hairspring */}
          <g transform={`translate(-14, -14) rotate(${-gearAngle * 2})`}>
            <circle cx="0" cy="0" r="10" strokeWidth="1" />
            <path d="M 0,0 C 2,-2 4,2 2,4 C -2,6 -4,1 -2,-3 C 1,-6 6,-4 6,1" strokeWidth="0.8" />
          </g>

          {/* Jewel bearing mounts */}
          <circle cx="0" cy="0" r="2" fill="var(--color-accent-gold)" />
          <circle cx="14" cy="14" r="1.5" fill="var(--color-accent-gold)" />
        </g>
      )}

      {/* Hinged Front Bezel (Flips open as openProgress increases) */}
      <g
        id="watch-hinged-bezel"
        style={{
          transform: `translate(${openProgress * -46}px, 0) rotate(${openProgress * -55}deg)`,
          transformOrigin: '-48px 0px',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        strokeWidth="1.25"
      >
        <circle cx="0" cy="0" r="47" strokeDasharray="4 6" opacity={1 - openProgress * 0.4} />
        {/* Watch hands */}
        <line x1="0" y1="0" x2="0" y2="-22" strokeWidth="1.5" />
        <line x1="0" y1="0" x2="14" y2="6" strokeWidth="1.2" />
      </g>
    </g>
  );
}
