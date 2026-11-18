'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export function StaticNetworkFallback({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'w-full h-full relative overflow-hidden flex items-center justify-center select-none pointer-events-none',
        className
      )}
    >
      {/* Multi-layered Iris Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(167,139,250,0.14)_0%,rgba(124,58,237,0.05)_50%,transparent_75%)]" />

      {/* Static Vector Constellation Lines */}
      <svg viewBox="0 0 600 400" className="w-full h-full max-w-2xl opacity-60 overflow-visible">
        <defs>
          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-iris)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-iris)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Network Connections */}
        <g stroke="var(--color-iris)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4">
          <line x1="120" y1="180" x2="280" y2="120" />
          <line x1="280" y1="120" x2="440" y2="160" />
          <line x1="440" y1="160" x2="480" y2="280" />
          <line x1="480" y1="280" x2="320" y2="300" />
          <line x1="320" y1="300" x2="160" y2="260" />
          <line x1="160" y1="260" x2="120" y2="180" />
          <line x1="280" y1="120" x2="320" y2="300" />
          <line x1="120" y1="180" x2="440" y2="160" />
        </g>

        {/* Constellation Nodes */}
        <circle cx="280" cy="120" r="16" fill="url(#node-glow)" opacity="0.6" />
        <circle cx="280" cy="120" r="4" fill="var(--color-iris)" />

        <circle cx="440" cy="160" r="14" fill="url(#node-glow)" opacity="0.5" />
        <circle cx="440" cy="160" r="3.5" fill="var(--color-iris)" />

        <circle cx="320" cy="300" r="18" fill="url(#node-glow)" opacity="0.7" />
        <circle cx="320" cy="300" r="4.5" fill="var(--color-gold)" />

        <circle cx="160" cy="260" r="12" fill="url(#node-glow)" opacity="0.5" />
        <circle cx="160" cy="260" r="3" fill="var(--color-azure)" />

        <circle cx="120" cy="180" r="14" fill="url(#node-glow)" opacity="0.5" />
        <circle cx="120" cy="180" r="3.5" fill="var(--color-rose)" />

        <circle cx="480" cy="280" r="10" fill="url(#node-glow)" opacity="0.4" />
        <circle cx="480" cy="280" r="2.5" fill="var(--color-ember)" />
      </svg>
    </div>
  );
}
