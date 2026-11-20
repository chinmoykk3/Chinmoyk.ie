'use client';

import React from 'react';
import { IdentityWorld } from '@/content/chapter02';
import { Content } from '@/components/content/Content';
import { cn } from '@/lib/utils';

export interface BuilderWorldProps {
  progress: number; // 0.0 to 1.0 within Builder phase
  identity: IdentityWorld;
  isStatic?: boolean;
  className?: string;
}

export function BuilderWorld({
  progress,
  identity,
  isStatic = false,
  className,
}: BuilderWorldProps) {
  // Stepped, snappy build progression
  const step = isStatic ? 3 : Math.min(3, Math.floor(progress * 3.8));
  const textOpacity = isStatic ? 1 : Math.max(0, Math.min(1, (progress - 0.2) / 0.3));

  return (
    <div
      className={cn(
        'relative w-full h-full flex flex-col items-center justify-center pointer-events-none select-none',
        className
      )}
    >
      {/* Centered Isometric SVG Canvas */}
      <svg
        viewBox="0 0 500 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-full max-h-[46vh] overflow-visible"
        stroke="var(--color-accent-azure)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <radialGradient id="builder-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent-azure)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-accent-azure)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="250" cy="210" r="160" fill="url(#builder-core-glow)" />

        {/* 1. Database Layer (Bottom slab, y=280) */}
        <g
          id="builder-layer-db"
          style={{
            opacity: step >= 1 ? 1 : 0.15,
            transform: `translateY(${step >= 1 ? 0 : 20}px)`,
            transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
            vectorEffect: 'non-scaling-stroke',
          }}
        >
          {/* Isometric Diamond Slab: Center (250, 290) */}
          <polygon
            points="250,230 360,285 250,340 140,285"
            strokeWidth="1.5"
            fill="var(--color-surface)"
            fillOpacity="0.4"
          />
          {/* Database sector cylinders */}
          <path d="M 190,285 C 190,295 210,305 250,305 C 290,305 310,295 310,285" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 190,300 C 190,310 210,320 250,320 C 290,320 310,310 310,300" strokeWidth="1" />
          <line x1="190" y1="285" x2="190" y2="300" strokeWidth="1" />
          <line x1="310" y1="285" x2="310" y2="300" strokeWidth="1" />
          <text x="250" y="330" textAnchor="middle" fill="var(--color-accent-azure)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">
            DATA PERSISTENCE
          </text>
        </g>

        {/* 2. API Routing Layer (Middle slab, y=190) */}
        <g
          id="builder-layer-api"
          style={{
            opacity: step >= 2 ? 1 : 0.15,
            transform: `translateY(${step >= 2 ? 0 : 20}px)`,
            transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
            vectorEffect: 'non-scaling-stroke',
          }}
        >
          {/* Isometric Diamond Slab: Center (250, 190) */}
          <polygon
            points="250,135 360,190 250,245 140,190"
            strokeWidth="1.5"
            fill="var(--color-surface-elevated)"
            fillOpacity="0.4"
          />
          {/* API Grid nodes and routing paths */}
          <line x1="200" y1="180" x2="300" y2="200" strokeWidth="1.2" strokeDasharray="4 4" />
          <line x1="220" y1="210" x2="280" y2="170" strokeWidth="1.2" />
          <circle cx="200" cy="180" r="3" fill="var(--color-accent-azure)" />
          <circle cx="300" cy="200" r="3" fill="var(--color-accent-azure)" />
          <circle cx="250" cy="190" r="4" strokeWidth="1.5" />
          <text x="250" y="165" textAnchor="middle" fill="var(--color-accent-azure)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">
            API / SYSTEM LOGIC
          </text>
        </g>

        {/* 3. UI Application Layer (Top slab, y=95) */}
        <g
          id="builder-layer-ui"
          style={{
            opacity: step >= 3 ? 1 : 0.15,
            transform: `translateY(${step >= 3 ? 0 : 20}px)`,
            transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
            vectorEffect: 'non-scaling-stroke',
          }}
        >
          {/* Isometric Diamond Slab: Center (250, 95) */}
          <polygon
            points="250,40 360,95 250,150 140,95"
            strokeWidth="1.75"
            fill="var(--color-surface)"
            fillOpacity="0.5"
          />
          {/* Viewport UI frames */}
          <polygon points="250,58 330,98 250,138 170,98" strokeWidth="1" strokeDasharray="2 3" />
          <polygon points="230,85 270,105 230,125 190,105" strokeWidth="1" />
          <text x="250" y="80" textAnchor="middle" fill="var(--color-accent-azure)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em">
            USER EXPERIENCE
          </text>
        </g>

        {/* Connecting Vertical Data Buses */}
        <g id="builder-layer-interconnects" strokeWidth="1" opacity={step >= 2 ? 0.7 : 0.2}>
          <line x1="140" y1="95" x2="140" y2="285" strokeDasharray="3 3" />
          <line x1="360" y1="95" x2="360" y2="285" strokeDasharray="3 3" />
          <line x1="250" y1="150" x2="250" y2="230" strokeWidth="1.5" />
          <line x1="250" y1="245" x2="250" y2="290" strokeWidth="1.5" />
        </g>
      </svg>

      {/* World Identity Narrative Text Box (Mask reveal) */}
      <div
        className="text-center max-w-lg mx-auto px-4 mt-2 transition-all duration-300"
        style={{
          opacity: textOpacity,
          transform: `translateY(${textOpacity > 0 ? '0px' : '10px'})`,
        }}
      >
        <span className="font-mono text-[11px] uppercase tracking-widest text-theme-azure font-medium block mb-1">
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
