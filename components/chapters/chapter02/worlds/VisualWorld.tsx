'use client';

import React from 'react';
import { IdentityWorld } from '@/content/chapter02';
import { Content } from '@/components/content/Content';
import { cn } from '@/lib/utils';

export interface VisualWorldProps {
  progress: number; // 0.0 to 1.0 within Visual phase
  identity: IdentityWorld;
  isStatic?: boolean;
  className?: string;
}

export function VisualWorld({
  progress,
  identity,
  isStatic = false,
  className,
}: VisualWorldProps) {
  // Rhythmic snapping of poster grid components
  const snap = isStatic ? 1 : Math.max(0, Math.min(1, progress * 1.4));
  const textOpacity = isStatic ? 1 : Math.max(0, Math.min(1, (progress - 0.2) / 0.3));

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
        stroke="var(--color-accent-rose)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <radialGradient id="visual-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent-rose)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-accent-rose)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="250" cy="210" r="170" fill="url(#visual-core-glow)" />

        {/* 1. Poster Grid & Registration Crosshairs */}
        <g id="visual-grid" strokeWidth="0.75" opacity={0.4} strokeDasharray="2 4">
          {/* Outer editorial frame */}
          <rect x="110" y="50" width="280" height="320" />
          {/* Baseline guides */}
          <line x1="90" y1="130" x2="410" y2="130" />
          <line x1="90" y1="210" x2="410" y2="210" />
          <line x1="90" y1="290" x2="410" y2="290" />
          <line x1="210" y1="30" x2="210" y2="390" />
          <line x1="290" y1="30" x2="290" y2="390" />
        </g>

        {/* Crop Marks at Corners */}
        <g id="visual-crop-marks" strokeWidth="1.25">
          {/* Top-left */}
          <line x1="95" y1="50" x2="105" y2="50" />
          <line x1="110" y1="35" x2="110" y2="45" />
          {/* Top-right */}
          <line x1="395" y1="50" x2="405" y2="50" />
          <line x1="390" y1="35" x2="390" y2="45" />
          {/* Bottom-left */}
          <line x1="95" y1="370" x2="105" y2="370" />
          <line x1="110" y1="375" x2="110" y2="385" />
          {/* Bottom-right */}
          <line x1="395" y1="370" x2="405" y2="370" />
          <line x1="390" y1="375" x2="390" y2="385" />
        </g>

        {/* 2. Bold Typographic Glyphs (Snaps in) */}
        <g
          id="visual-glyph"
          style={{
            transform: `translate(${snap * 20}px, 0)`,
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Geometric Serif Character Apex */}
          <path
            d="M 170,270 L 220,110 L 270,270"
            strokeWidth="3.5"
            strokeLinecap="square"
          />
          <line x1="185" y1="225" x2="255" y2="225" strokeWidth="2.5" />
          {/* Serifs */}
          <line x1="155" y1="270" x2="185" y2="270" strokeWidth="2" />
          <line x1="255" y1="270" x2="285" y2="270" strokeWidth="2" />
          <line x1="210" y1="110" x2="230" y2="110" strokeWidth="2" />
        </g>

        {/* 3. Golden Ratio Circle (Snaps into grid) */}
        <g
          id="visual-circle"
          style={{
            transform: `scale(${0.6 + snap * 0.4})`,
            transformOrigin: '320px 180px',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <circle
            cx="320"
            cy="180"
            r="65"
            strokeWidth="1.75"
            strokeDasharray={snap > 0.6 ? 'none' : '4 4'}
          />
          <circle cx="320" cy="180" r="40" strokeWidth="1" opacity="0.6" />
          <circle cx="320" cy="180" r="3" fill="var(--color-accent-rose)" />
        </g>

        {/* 4. Modular Solid Rule / Bar (Snaps along baseline) */}
        <g
          id="visual-bar"
          style={{
            opacity: snap,
            transition: 'opacity 0.25s ease-out',
          }}
        >
          <line x1="140" y1="310" x2="360" y2="310" strokeWidth="3" strokeLinecap="square" />
          <circle cx="140" cy="310" r="3" fill="var(--color-accent-rose)" />
          <circle cx="360" cy="310" r="3" fill="var(--color-accent-rose)" />
          {/* Typography baseline label */}
          <text
            x="250"
            y="335"
            textAnchor="middle"
            fill="var(--color-accent-rose)"
            fontSize="9"
            fontFamily="var(--font-mono)"
            letterSpacing="0.15em"
          >
            SPATIAL HARMONY &middot; 1.618
          </text>
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
        <span className="font-mono text-[11px] uppercase tracking-widest text-theme-rose font-medium block mb-1">
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
