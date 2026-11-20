'use client';

import React from 'react';
import { BEAMS_CONFIG, PRISM_1_COORDS, PRISM_2_COORDS } from './chapter02.config';
import { cn } from '@/lib/utils';

export interface BeamsProps {
  inputProgress: number; // 0 to 1 (Thread descending into Prism 1)
  fanProgress: number; // 0 to 1 (Beams fanning out)
  crossingProgress: number; // 0 to 1 (Beams bending towards convergence)
  recombinedProgress: number; // 0 to 1 (Gold beam exiting Prism 2)
  parallaxOffset?: number; // Cursor rotation offset (-4 to +4 deg)
  className?: string;
}

export function Beams({
  inputProgress,
  fanProgress,
  crossingProgress,
  recombinedProgress,
  parallaxOffset = 0,
  className,
}: BeamsProps) {
  // Input beam length: from y=0 down to apex of Prism 1 (y=125)
  const inputY = 125 * Math.min(1, inputProgress);

  return (
    <g
      id="ch02-beams"
      className={cn('pointer-events-none select-none', className)}
      style={{
        transform: `rotate(${parallaxOffset}deg)`,
        transformOrigin: '400px 400px',
        transition: 'transform 0.15s ease-out',
      }}
    >
      <defs>
        {/* Input Gold Beam Linear Gradient */}
        <linearGradient id="ch02-input-beam-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent-gold)" stopOpacity="0.8" />
          <stop offset="90%" stopColor="var(--color-accent-gold)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--color-accent-gold)" stopOpacity="0.9" />
        </linearGradient>

        {/* Four Refracted Beam Linear Gradients */}
        <linearGradient id="ch02-beam-azure-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent-azure)" stopOpacity="0.9" />
          <stop offset="40%" stopColor="var(--color-accent-azure)" stopOpacity="0.75" />
          <stop offset="100%" stopColor="var(--color-accent-azure)" stopOpacity="0.25" />
        </linearGradient>

        <linearGradient id="ch02-beam-iris-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent-iris)" stopOpacity="0.9" />
          <stop offset="40%" stopColor="var(--color-accent-iris)" stopOpacity="0.75" />
          <stop offset="100%" stopColor="var(--color-accent-iris)" stopOpacity="0.25" />
        </linearGradient>

        <linearGradient id="ch02-beam-rose-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent-rose)" stopOpacity="0.9" />
          <stop offset="40%" stopColor="var(--color-accent-rose)" stopOpacity="0.75" />
          <stop offset="100%" stopColor="var(--color-accent-rose)" stopOpacity="0.25" />
        </linearGradient>

        <linearGradient id="ch02-beam-ember-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent-ember)" stopOpacity="0.9" />
          <stop offset="40%" stopColor="var(--color-accent-ember)" stopOpacity="0.75" />
          <stop offset="100%" stopColor="var(--color-accent-ember)" stopOpacity="0.25" />
        </linearGradient>

        {/* Recombined Gold Exit Beam Linear Gradient */}
        <linearGradient id="ch02-recombined-gold-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent-gold)" stopOpacity="1" />
          <stop offset="80%" stopColor="var(--color-accent-gold)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--color-accent-gold)" stopOpacity="0.6" />
        </linearGradient>

        {/* Cross Flare Radial Gradient */}
        <radialGradient id="ch02-cross-flare-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-accent-gold)" stopOpacity="0.9" />
          <stop offset="35%" stopColor="var(--color-accent-gold)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--color-accent-gold)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 1. Input Gold Beam descending from top to Prism 1 */}
      {inputProgress > 0 && (
        <g id="ch02-input-thread-beam">
          {/* Outer soft taper */}
          <polygon
            points={`397,0 403,0 401.5,${inputY} 398.5,${inputY}`}
            fill="url(#ch02-input-beam-grad)"
            opacity="0.7"
          />
          {/* Core thread line */}
          <line
            x1="400"
            y1="0"
            x2="400"
            y2={inputY}
            stroke="var(--color-accent-gold)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* 2. Four Refracted Color Beams (Screen blend mode in dark mode) */}
      {fanProgress > 0 && (
        <g
          id="ch02-refracted-beams"
          style={{ mixBlendMode: 'screen' }}
          className="transition-opacity duration-300"
        >
          {BEAMS_CONFIG.map((beam) => {
            const { origin, fannedTarget, convergeTarget } = beam;

            // Interpolate target from fanned to converge
            const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
            const ct = ease(crossingProgress);

            const curTargetX = fannedTarget.x + (convergeTarget.x - fannedTarget.x) * ct;
            const curTargetY = fannedTarget.y + (convergeTarget.y - fannedTarget.y) * ct;

            // Current length based on fanProgress
            const effectiveTargetX = origin.x + (curTargetX - origin.x) * fanProgress;
            const effectiveTargetY = origin.y + (curTargetY - origin.y) * fanProgress;

            // Beam polygon taper width
            const halfWidthStart = 2.5;
            const halfWidthEnd = 16 * (1 - crossingProgress * 0.65);

            // Perpendicular vector for taper
            const dx = effectiveTargetX - origin.x;
            const dy = effectiveTargetY - origin.y;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            const perpX = (-dy / len);
            const perpY = (dx / len);

            const p1 = `${origin.x - perpX * halfWidthStart},${origin.y - perpY * halfWidthStart}`;
            const p2 = `${origin.x + perpX * halfWidthStart},${origin.y + perpY * halfWidthStart}`;
            const p3 = `${effectiveTargetX + perpX * halfWidthEnd},${effectiveTargetY + perpY * halfWidthEnd}`;
            const p4 = `${effectiveTargetX - perpX * halfWidthEnd},${effectiveTargetY - perpY * halfWidthEnd}`;

            return (
              <g key={beam.id} id={`beam-${beam.id}`}>
                {/* Tapered soft gradient polygon */}
                <polygon
                  points={`${p1} ${p2} ${p3} ${p4}`}
                  fill={`url(#ch02-beam-${beam.accent}-grad)`}
                  opacity={0.75 + 0.25 * crossingProgress}
                />
                {/* Center beam laser spine */}
                <line
                  x1={origin.x}
                  y1={origin.y}
                  x2={effectiveTargetX}
                  y2={effectiveTargetY}
                  stroke={beam.tokenVar}
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  style={{ vectorEffect: 'non-scaling-stroke' }}
                />
              </g>
            );
          })}
        </g>
      )}

      {/* 3. Crossing Intersection Flares (65% to 80%) */}
      {crossingProgress > 0.3 && (
        <g id="ch02-beam-crossing-flares" style={{ mixBlendMode: 'screen' }}>
          {BEAMS_CONFIG.map((beam) => (
            <circle
              key={`flare-${beam.id}`}
              cx={beam.crossFlare.x}
              cy={beam.crossFlare.y}
              r="22"
              fill="url(#ch02-cross-flare-glow)"
              opacity={Math.min(1, crossingProgress * 1.5) * (1 - recombinedProgress * 0.8)}
            />
          ))}
        </g>
      )}

      {/* 4. Recombined Single Gold Exit Beam from Inverted Prism */}
      {recombinedProgress > 0 && (
        <g id="ch02-recombined-exit-beam">
          {/* Exits apex of Prism 2 (400, 685) straight down to bottom (400, 800) */}
          <polygon
            points={`396,685 404,685 402,${685 + 115 * recombinedProgress} 398,${685 + 115 * recombinedProgress}`}
            fill="url(#ch02-recombined-gold-grad)"
            opacity="0.85"
          />
          <line
            x1="400"
            y1="685"
            x2="400"
            y2={685 + 115 * recombinedProgress}
            stroke="var(--color-accent-gold)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0 0 4px var(--color-accent-gold))',
            }}
          />
          {/* Leading luminous pulse node */}
          <circle
            cx="400"
            cy={685 + 115 * recombinedProgress}
            r="4"
            fill="var(--color-accent-gold)"
          />
        </g>
      )}
    </g>
  );
}
