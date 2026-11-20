'use client';

import React from 'react';
import { IdentityWorld } from '@/content/chapter02';
import { Content } from '@/components/content/Content';
import { cn } from '@/lib/utils';

export interface IntelligenceWorldProps {
  progress: number; // 0.0 to 1.0 within Intelligence phase
  identity: IdentityWorld;
  isStatic?: boolean;
  className?: string;
}

export function IntelligenceWorld({
  progress,
  identity,
  isStatic = false,
  className,
}: IntelligenceWorldProps) {
  // Fluid signal propagation & learning node activation
  const pulsePhase = isStatic ? 1 : Math.max(0, Math.min(1, progress * 1.5));
  const textOpacity = isStatic ? 1 : Math.max(0, Math.min(1, (progress - 0.2) / 0.3));

  // Graph nodes
  const nodes = [
    { id: 'n0', x: 250, y: 70, r: 5, layer: 0 },
    { id: 'n1', x: 170, y: 150, r: 4.5, layer: 1 },
    { id: 'n2', x: 250, y: 160, r: 5.5, layer: 1 },
    { id: 'n3', x: 330, y: 150, r: 4.5, layer: 1 },
    { id: 'n4', x: 130, y: 250, r: 4, layer: 2 },
    { id: 'n5', x: 210, y: 260, r: 6, layer: 2 },
    { id: 'n6', x: 290, y: 260, r: 6, layer: 2 },
    { id: 'n7', x: 370, y: 250, r: 4, layer: 2 },
    { id: 'n8', x: 200, y: 340, r: 5, layer: 3 },
    { id: 'n9', x: 300, y: 340, r: 5, layer: 3 },
  ];

  const edges = [
    ['n0', 'n1'], ['n0', 'n2'], ['n0', 'n3'],
    ['n1', 'n4'], ['n1', 'n5'],
    ['n2', 'n5'], ['n2', 'n6'],
    ['n3', 'n6'], ['n3', 'n7'],
    ['n4', 'n8'], ['n5', 'n8'], ['n5', 'n9'],
    ['n6', 'n8'], ['n6', 'n9'], ['n7', 'n9'],
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
        stroke="var(--color-accent-iris)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <radialGradient id="intel-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent-iris)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-accent-iris)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="250" cy="210" r="170" fill="url(#intel-core-glow)" />

        {/* Neural Network Edges */}
        <g id="intel-edges" strokeWidth="1" opacity={0.6}>
          {edges.map(([fromId, toId], i) => {
            const f = nodes.find((n) => n.id === fromId)!;
            const t = nodes.find((n) => n.id === toId)!;
            const edgeActive = pulsePhase > f.layer * 0.22;
            return (
              <line
                key={`edge-${i}`}
                x1={f.x}
                y1={f.y}
                x2={t.x}
                y2={t.y}
                strokeWidth={edgeActive ? 1.5 : 0.75}
                strokeDasharray={edgeActive ? 'none' : '3 4'}
                style={{
                  opacity: edgeActive ? 0.9 : 0.2,
                  transition: 'opacity 0.3s ease, stroke-width 0.3s ease',
                  vectorEffect: 'non-scaling-stroke',
                }}
              />
            );
          })}
        </g>

        {/* Network Synaptic Nodes */}
        <g id="intel-nodes">
          {nodes.map((node) => {
            const nodeActive = pulsePhase > node.layer * 0.25;
            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="transition-all duration-300"
              >
                {/* Activation pulse ring */}
                {nodeActive && (
                  <circle
                    cx="0"
                    cy="0"
                    r={node.r * 2.2}
                    stroke="var(--color-accent-iris)"
                    strokeWidth="0.75"
                    strokeOpacity="0.4"
                    strokeDasharray="2 3"
                  />
                )}
                {/* Node core */}
                <circle
                  cx="0"
                  cy="0"
                  r={node.r}
                  fill={nodeActive ? 'var(--color-accent-iris)' : 'var(--color-surface)'}
                  stroke="var(--color-accent-iris)"
                  strokeWidth="1.5"
                  style={{
                    filter: nodeActive ? 'drop-shadow(0 0 4px var(--color-accent-iris))' : 'none',
                  }}
                />
              </g>
            );
          })}
        </g>

        {/* Input Signal Vector Arrow */}
        <g transform="translate(250, 30)" opacity={pulsePhase > 0.1 ? 0.9 : 0.2}>
          <line x1="0" y1="0" x2="0" y2="28" strokeWidth="2" strokeDasharray="4 2" />
          <polygon points="-3,24 3,24 0,32" fill="var(--color-accent-iris)" />
        </g>

        {/* Signal feedback resonance loop */}
        <path
          d="M 130,250 C 90,290 120,380 250,380 C 380,380 410,290 370,250"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity={pulsePhase > 0.7 ? 0.5 : 0.1}
        />
      </svg>

      {/* World Narrative Text */}
      <div
        className="text-center max-w-lg mx-auto px-4 mt-2 transition-all duration-300"
        style={{
          opacity: textOpacity,
          transform: `translateY(${textOpacity > 0 ? '0px' : '10px'})`,
        }}
      >
        <span className="font-mono text-[11px] uppercase tracking-widest text-theme-iris font-medium block mb-1">
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
