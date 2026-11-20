'use client';

import React from 'react';
import { IdentityWorld } from '@/content/chapter02';
import { Content } from '@/components/content/Content';
import { cn } from '@/lib/utils';

export interface ExplorerWorldProps {
  progress: number; // 0.0 to 1.0 within Explorer phase
  identity: IdentityWorld;
  isStatic?: boolean;
  className?: string;
}

export function ExplorerWorld({
  progress,
  identity,
  isStatic = false,
  className,
}: ExplorerWorldProps) {
  // Path traversal & star illumination
  const starPhase = isStatic ? 1 : Math.max(0, Math.min(1, progress * 1.4));
  const textOpacity = isStatic ? 1 : Math.max(0, Math.min(1, (progress - 0.2) / 0.3));

  // Waypoints along celestial path
  const waypoints = [
    { x: 190, y: 220, r: 3 },
    { x: 230, y: 160, r: 3.5 },
    { x: 290, y: 120, r: 4 },
    { x: 350, y: 160, r: 3.5 },
    { x: 410, y: 110, r: 4.5 },
    { x: 470, y: 70, r: 5 }, // Runs off edge unfinished
  ];

  return (
    <div
      className={cn(
        'relative w-full h-full flex flex-col items-center justify-center pointer-events-none select-none',
        className
      )}
    >
      <svg
        viewBox="0 0 500 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-full max-h-[46vh] overflow-visible"
        stroke="var(--color-accent-ember)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <radialGradient id="explorer-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent-ember)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-accent-ember)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="250" cy="210" r="170" fill="url(#explorer-core-glow)" />

        {/* 1. Compass Rose / Astrolabe Origin (Center 130, 270) */}
        <g id="explorer-compass" transform="translate(130, 270)">
          {/* Compass ring */}
          <circle cx="0" cy="0" r="45" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
          <circle cx="0" cy="0" r="32" strokeWidth="1.25" />
          <circle cx="0" cy="0" r="3" fill="var(--color-accent-ember)" />
          {/* 4 Cardinal pointers */}
          <polygon points="0,-32 4,-12 0,-4 -4,-12" fill="var(--color-accent-ember)" />
          <polygon points="0,32 4,12 0,4 -4,12" fill="none" strokeWidth="1" />
          <polygon points="32,0 12,4 4,0 12,-4" fill="none" strokeWidth="1" />
          <polygon points="-32,0 -12,4 -4,0 -12,-4" fill="none" strokeWidth="1" />
          {/* Astrolabe degree markings */}
          <line x1="0" y1="-45" x2="0" y2="-40" strokeWidth="1" />
          <line x1="45" y1="0" x2="40" y2="0" strokeWidth="1" />
          <line x1="0" y1="45" x2="0" y2="40" strokeWidth="1" />
          <line x1="-45" y1="0" x2="-40" y2="0" strokeWidth="1" />
        </g>

        {/* 2. Dotted Celestial Trajectory leaving compass and running off edge */}
        <path
          d="M 130,270 Q 180,240 230,160 T 350,160 T 470,70"
          strokeWidth="1.75"
          strokeDasharray="4 6"
          opacity={0.8}
        />

        {/* 3. Star Nodes & Morphed Question Glyphs along trajectory */}
        <g id="explorer-stars">
          {waypoints.map((pt, idx) => {
            const isLit = starPhase > (idx + 1) * 0.16;
            return (
              <g key={`star-${idx}`} transform={`translate(${pt.x}, ${pt.y})`}>
                {isLit ? (
                  // Star node
                  <g>
                    {/* Star rays */}
                    <line x1="0" y1={-pt.r * 2} x2="0" y2={pt.r * 2} strokeWidth="1" opacity="0.7" />
                    <line x1={-pt.r * 2} y1="0" x2={pt.r * 2} y2="0" strokeWidth="1" opacity="0.7" />
                    <circle
                      cx="0"
                      cy="0"
                      r={pt.r}
                      fill="var(--color-accent-ember)"
                      style={{
                        filter: 'drop-shadow(0 0 4px var(--color-accent-ember))',
                      }}
                    />
                  </g>
                ) : (
                  // Unreached question mark
                  <g opacity="0.35" strokeWidth="1">
                    <path d="M -2,-5 C -2,-8 2,-8 2,-5 C 2,-2 0,-1 0,1" />
                    <circle cx="0" cy="3" r="0.6" fill="var(--color-accent-ember)" />
                  </g>
                )}
              </g>
            );
          })}
        </g>

        {/* Horizon coordinate grids */}
        <g id="explorer-horizon" strokeWidth="0.75" opacity="0.35" strokeDasharray="2 5">
          <ellipse cx="250" cy="360" rx="200" ry="40" />
          <line x1="50" y1="360" x2="450" y2="360" />
        </g>
      </svg>

      {/* World Narrative Text */}
      <div
        className="text-center max-w-lg mx-auto px-4 mt-2 transition-all duration-300"
        style={{
          opacity: textOpacity,
          transform: `translateY(${textOpacity > 0 ? '0px' : '10px'})`,
        }}
      >
        <span className="font-mono text-[11px] uppercase tracking-widest text-theme-ember font-medium block mb-1">
          <Content value={identity.role} />
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-theme-text font-normal mb-2">
          <Content value={identity.name} />
        </h3>
        <p className="font-sans text-xs sm:text-sm text-theme-muted leading-relaxed max-w-md mx-auto">
          <Content value={identity.description} />
        </p>
      </div>
    </div>
  );
}
