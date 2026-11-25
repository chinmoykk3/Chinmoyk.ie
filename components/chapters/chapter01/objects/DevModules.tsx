'use client';

import React from 'react';

export interface DevModuleProps {
  x: number;
  y: number;
  openProgress: number; // 0 = closed, 1 = expanded architecture
  motionSpeed: number; // 1 = active pulse, 0 = paused
  isPartDetached: boolean;
  isEmptied: boolean;
}

/**
 * 01 · Kernel & Clock (CPU Die / Oscillator)
 */
export function KernelModule({
  x,
  y,
  openProgress,
  motionSpeed,
  isPartDetached,
  isEmptied,
}: DevModuleProps) {
  const spread = openProgress * 16;
  const opacity = isEmptied ? 0.35 : 1;

  return (
    <g
      id="module-kernel"
      transform={`translate(${x}, ${y})`}
      stroke="var(--color-accent-gold)"
      fill="none"
      opacity={opacity}
    >
      {/* Outer CPU Pins */}
      {[-24, -12, 0, 12, 24].map((offset) => (
        <g key={`pin-${offset}`} strokeWidth="1" opacity="0.65">
          <line x1={offset} y1={-34 - spread * 0.4} x2={offset} y2={-43 - spread * 0.4} />
          <line x1={offset} y1={34 + spread * 0.4} x2={offset} y2={43 + spread * 0.4} />
          <line x1={-34 - spread * 0.4} y1={offset} x2={-43 - spread * 0.4} y2={offset} />
          <line x1={34 + spread * 0.4} y1={offset} x2={43 + spread * 0.4} y2={offset} />
        </g>
      ))}

      {/* Outer Package Shell */}
      <rect
        x={-34 - spread * 0.4}
        y={-34 - spread * 0.4}
        width={68 + spread * 0.8}
        height={68 + spread * 0.8}
        rx="6"
        strokeWidth="1.5"
      />

      {/* Corner Mounting Vias + Pin-1 Chamfer Marker */}
      <circle cx={-27 - spread * 0.35} cy={-27 - spread * 0.35} r="1.3" fill="var(--color-accent-gold)" stroke="none" opacity="0.85" />
      <circle cx={27 + spread * 0.35} cy={-27 - spread * 0.35} r="1" strokeWidth="0.9" opacity="0.45" />
      <circle cx={-27 - spread * 0.35} cy={27 + spread * 0.35} r="1" strokeWidth="0.9" opacity="0.45" />
      <circle cx={27 + spread * 0.35} cy={27 + spread * 0.35} r="1" strokeWidth="0.9" opacity="0.45" />

      {/* Inner Silicon Die */}
      <rect x="-20" y="-20" width="40" height="40" rx="3" strokeWidth="1" opacity={0.45 + openProgress * 0.55} />

      {/* Internal Clock Registers (revealed on open) */}
      {openProgress > 0.1 && (
        <g opacity={openProgress} strokeWidth="0.9">
          <line x1="-14" y1="-10" x2="14" y2="-10" strokeDasharray="3 2" />
          <line x1="-14" y1="0" x2="14" y2="0" />
          <line x1="-14" y1="10" x2="14" y2="10" strokeDasharray="3 2" />
          {!isPartDetached && (
            <circle
              cx="0"
              cy="0"
              r="8"
              strokeWidth="1.2"
              strokeDasharray="2 2"
              opacity={0.7 + motionSpeed * 0.3}
            />
          )}
          <text
            x="0"
            y="29"
            textAnchor="middle"
            fill="var(--color-accent-gold)"
            stroke="none"
            fontFamily="var(--font-mono)"
            fontSize="6.5"
            letterSpacing="1"
            opacity="0.7"
          >
            CLK_SYNC
          </text>
        </g>
      )}

      {/* Center Clock Pulse Dot */}
      <circle
        cx="0"
        cy="0"
        r="2.2"
        fill="var(--color-accent-gold)"
        stroke="none"
        opacity={isPartDetached ? 0.25 : 0.9}
      />
    </g>
  );
}

/**
 * 02 · Network & Signal (Packet Bus / Router Node)
 */
export function NetworkModule({
  x,
  y,
  openProgress,
  motionSpeed,
  isPartDetached,
  isEmptied,
}: DevModuleProps) {
  const spread = openProgress * 14;
  const opacity = isEmptied ? 0.35 : 1;

  return (
    <g
      id="module-network"
      transform={`translate(${x}, ${y})`}
      stroke="var(--color-accent-gold)"
      fill="none"
      opacity={opacity}
    >
      {/* Server / Node Chassis */}
      <rect x="-38" y={-26 - spread * 0.5} width="76" height="52" rx="6" strokeWidth="1.5" />

      {/* Bottom RJ45 / Bus Port Jacks */}
      {[-20, 0, 20].map((px) => (
        <rect
          key={`port-${px}`}
          x={px - 5}
          y={20 - spread * 0.5}
          width="10"
          height="6"
          rx="1"
          strokeWidth="0.9"
          opacity="0.55"
        />
      ))}

      {/* Signal Antenna / Uplink + Concentric Wave Arcs */}
      <line x1="0" y1={-26 - spread * 0.5} x2="0" y2={-44 - spread * 0.7} strokeWidth="1.2" />
      <circle
        cx="0"
        cy={-48 - spread * 0.7}
        r="3"
        fill="var(--color-accent-gold)"
        stroke="none"
        opacity={0.5 + motionSpeed * 0.5}
      />
      {openProgress > 0.2 && (
        <g opacity={openProgress * 0.65} strokeWidth="1">
          <path d={`M -10,${-53 - spread * 0.7} A 12 12 0 0 1 10,${-53 - spread * 0.7}`} />
          <path d={`M -16,${-58 - spread * 0.7} A 20 20 0 0 1 16,${-58 - spread * 0.7}`} strokeDasharray="3 2" />
        </g>
      )}

      {/* Packet Waveform (revealed when open) */}
      <path
        d="M -26,0 L -16,0 L -10,-12 L -2,12 L 6,-8 L 14,6 L 20,0 L 28,0"
        strokeWidth="1.3"
        opacity={0.35 + openProgress * 0.65}
      />

      {/* TX / RX Micro-labels */}
      {openProgress > 0.15 && (
        <g fill="var(--color-accent-gold)" stroke="none" fontFamily="var(--font-mono)" fontSize="6" opacity={openProgress * 0.7}>
          <text x="16" y={-14 - spread * 0.3}>TX</text>
          <text x="27" y={-14 - spread * 0.3}>RX</text>
        </g>
      )}

      {/* Status LEDs */}
      {!isPartDetached && (
        <g fill="var(--color-accent-gold)" stroke="none" opacity={0.4 + openProgress * 0.6}>
          <circle cx="-26" cy={-16 - spread * 0.3} r="1.8" />
          <circle cx="-18" cy={-16 - spread * 0.3} r="1.8" opacity={motionSpeed ? 0.9 : 0.3} />
          <circle cx="-10" cy={-16 - spread * 0.3} r="1.8" opacity="0.4" />
        </g>
      )}
    </g>
  );
}

/**
 * 03 · Terminal & AST (Code Window / Execution Syntax)
 */
export function TerminalModule({
  x,
  y,
  openProgress,
  motionSpeed,
  isPartDetached,
  isEmptied,
}: DevModuleProps) {
  const spread = openProgress * 14;
  const opacity = isEmptied ? 0.35 : 1;

  return (
    <g
      id="module-terminal"
      transform={`translate(${x}, ${y})`}
      stroke="var(--color-accent-gold)"
      fill="none"
      opacity={opacity}
    >
      {/* Terminal Window Frame */}
      <rect x="-42" y={-30 - spread * 0.3} width="84" height={60 + spread * 0.5} rx="6" strokeWidth="1.5" />

      {/* Window Titlebar Divider */}
      <line x1="-42" y1={-16 - spread * 0.3} x2="42" y2={-16 - spread * 0.3} strokeWidth="1" opacity="0.5" />

      {/* Window Control Dots */}
      <circle cx="-32" cy={-23 - spread * 0.3} r="1.5" fill="var(--color-accent-gold)" stroke="none" opacity="0.7" />
      <circle cx="-25" cy={-23 - spread * 0.3} r="1.5" fill="var(--color-accent-gold)" stroke="none" opacity="0.5" />
      <circle cx="-18" cy={-23 - spread * 0.3} r="1.5" fill="var(--color-accent-gold)" stroke="none" opacity="0.3" />

      {/* Titlebar file tag */}
      <text
        x="34"
        y={-21 - spread * 0.3}
        textAnchor="end"
        fill="var(--color-accent-gold)"
        stroke="none"
        fontFamily="var(--font-mono)"
        fontSize="5.5"
        opacity="0.55"
      >
        ast.ts
      </text>

      {/* Prompt >_ + Cursor Block */}
      <path d="M -28,-4 L -20,2 L -28,8" strokeWidth="1.5" />
      <line x1="-15" y1="8" x2="-6" y2="8" strokeWidth="1.5" />
      <rect
        x="-3"
        y="-1"
        width="4.5"
        height="9"
        fill="var(--color-accent-gold)"
        stroke="none"
        opacity={motionSpeed ? 0.85 : 0.35}
      />

      {/* Code / AST Lines + Gutter Ticks revealed when open */}
      {openProgress > 0.1 && !isPartDetached && (
        <g opacity={openProgress} strokeWidth="1.1">
          {/* Gutter line numbers */}
          <line x1="-34" y1="16" x2="-31" y2="16" opacity="0.4" />
          <line x1="-34" y1="23" x2="-31" y2="23" opacity="0.4" />
          <line x1="-34" y1="30" x2="-31" y2="30" opacity="0.4" />

          {/* Syntax bars */}
          <line x1="-26" y1="16" x2="12" y2="16" opacity="0.8" />
          <line x1="-20" y1="23" x2="26" y2="23" strokeDasharray="4 3" opacity="0.6" />
          <line x1="-26" y1="30" x2="4" y2="30" opacity="0.45" />

          {/* AST Curly Braces */}
          <text
            x="17"
            y="6"
            fill="var(--color-accent-gold)"
            stroke="none"
            fontFamily="var(--font-mono)"
            fontSize="13"
            opacity="0.85"
          >
            {'{}'}
          </text>
        </g>
      )}
    </g>
  );
}

/**
 * 04 · Neural Logic Gate (Nodes, Weights & Weighted Edges)
 */
export function NeuralModule({
  x,
  y,
  openProgress,
  motionSpeed,
  isPartDetached,
  isEmptied,
}: DevModuleProps) {
  const spread = openProgress * 12;
  const opacity = isEmptied ? 0.35 : 1;

  return (
    <g
      id="module-neural"
      transform={`translate(${x}, ${y})`}
      stroke="var(--color-accent-gold)"
      fill="none"
      opacity={opacity}
    >
      {/* Outer Hexagonal Containment */}
      <polygon
        points={`0,${-38 - spread * 0.4} ${34 + spread * 0.3},${-19 - spread * 0.2} ${34 + spread * 0.3},${19 + spread * 0.2} 0,${38 + spread * 0.4} ${-34 - spread * 0.3},${19 + spread * 0.2} ${-34 - spread * 0.3},${-19 - spread * 0.2}`}
        strokeWidth="1.5"
      />

      {/* Neural Edges (revealed as openProgress rises) */}
      <g strokeWidth="1" opacity={0.3 + openProgress * 0.7}>
        <line x1="-18" y1="-12" x2="0" y2="0" />
        <line x1="-18" y1="12" x2="0" y2="0" />
        <line x1="0" y1="0" x2="18" y2="-10" />
        <line x1="0" y1="0" x2="18" y2="10" />
        <line x1="-18" y1="-12" x2="18" y2="-10" strokeDasharray="2 3" opacity="0.5" />
        <line x1="-18" y1="12" x2="18" y2="10" strokeDasharray="2 3" opacity="0.5" />
      </g>

      {/* Edge Weight Dots */}
      {openProgress > 0.2 && (
        <g fill="var(--color-accent-gold)" stroke="none" opacity={openProgress * 0.8}>
          <circle cx="-9" cy="-6" r="1.2" />
          <circle cx="-9" cy="6" r="1.2" />
          <circle cx="9" cy="-5" r="1.2" />
          <circle cx="9" cy="5" r="1.2" />
        </g>
      )}

      {/* Nodes */}
      <circle cx="-18" cy="-12" r="3.2" fill="var(--color-cinema-bg)" strokeWidth="1.3" />
      <circle cx="-18" cy="12" r="3.2" fill="var(--color-cinema-bg)" strokeWidth="1.3" />
      <circle cx="18" cy="-10" r="3.2" fill="var(--color-cinema-bg)" strokeWidth="1.3" />
      <circle cx="18" cy="10" r="3.2" fill="var(--color-cinema-bg)" strokeWidth="1.3" />

      {/* Central Inference Node */}
      <circle
        cx="0"
        cy="0"
        r={isPartDetached ? '2.5' : '4.5'}
        fill="var(--color-accent-gold)"
        stroke="none"
        opacity={0.5 + motionSpeed * 0.5}
      />
    </g>
  );
}
