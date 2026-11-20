'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  MECHANISM_PARTS,
  QUESTION_GLYPHS,
  TERMINAL_TRACE_PATH,
  TERMINAL_NODE_COORDS,
  MechanismPartConfig,
} from './chapter01.config';
import { cn } from '@/lib/utils';

export interface MechanismIllustrationProps {
  /**
   * Continuous scroll scrub progress for Chapter 01 (0.0 to 1.0)
   */
  progress: number;
  /**
   * When true, disables pointer parallax & animations, rendering static crisp states
   */
  isReducedMotion?: boolean;
  /**
   * Specific static mode for reduced-motion sequential slides
   */
  staticMode?: 'assembled' | 'exploded' | 'rebuilt';
  className?: string;
}

export function MechanismIllustration({
  progress,
  isReducedMotion = false,
  staticMode,
  className,
}: MechanismIllustrationProps) {
  const [pointer, setPointer] = useState({ x: 0, y: 0, isFine: false });
  const svgRef = useRef<SVGSVGElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Detect fine pointer for desktop cursor parallax (±6° tilt, ±8px depth shift)
  useEffect(() => {
    if (isReducedMotion || staticMode) return;

    const mediaQuery = window.matchMedia('(pointer: fine)');
    setPointer((p) => ({ ...p, isFine: mediaQuery.matches }));

    const handlePointerMove = (e: MouseEvent) => {
      if (!mediaQuery.matches) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1; // -1 to 1

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(() => {
        setPointer({ x: Math.max(-1, Math.min(1, nx)), y: Math.max(-1, Math.min(1, ny)), isFine: true });
      });
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isReducedMotion, staticMode]);

  // Compute interpolated kinematic progress
  // Timeline slices:
  // 0.00 - 0.12: Title card / drawing in
  // 0.12 - 0.30: Assembled drawing & line 1 (understand)
  // 0.30 - 0.50: Exploded view & line 2 (deconstruct)
  // 0.50 - 0.60: Held hanging beat (parts hang slightly dim)
  // 0.60 - 0.85: Rebuilding into new synthesis & line 3
  // 0.85 - 1.00: Terminal pulse & lit node to ThreadSpine
  const {
    drawProgress,
    explodeProgress,
    rebuildProgress,
    pulseProgress,
    nodeGlowProgress,
    dimBeatOpacity,
  } = useMemo(() => {
    if (staticMode === 'assembled') {
      return {
        drawProgress: 1,
        explodeProgress: 0,
        rebuildProgress: 0,
        pulseProgress: 0,
        nodeGlowProgress: 0,
        dimBeatOpacity: 1,
      };
    }
    if (staticMode === 'exploded') {
      return {
        drawProgress: 1,
        explodeProgress: 1,
        rebuildProgress: 0,
        pulseProgress: 0,
        nodeGlowProgress: 0,
        dimBeatOpacity: 1,
      };
    }
    if (staticMode === 'rebuilt') {
      return {
        drawProgress: 1,
        explodeProgress: 1,
        rebuildProgress: 1,
        pulseProgress: 1,
        nodeGlowProgress: 1,
        dimBeatOpacity: 1,
      };
    }

    const p = Math.max(0, Math.min(1, progress));

    // Draw in phase: 0.08 to 0.26
    const dp = Math.max(0, Math.min(1, (p - 0.08) / 0.18));

    // Explode phase: 0.30 to 0.48
    const ep = Math.max(0, Math.min(1, (p - 0.30) / 0.18));

    // Held dim beat: 0.50 to 0.60 (opacity drops slightly to 0.65)
    let dim = 1;
    if (p >= 0.48 && p <= 0.62) {
      const centerDist = Math.abs(p - 0.55) / 0.07;
      dim = 0.62 + 0.38 * Math.min(1, centerDist);
    }

    // Rebuild phase: 0.60 to 0.82
    const rp = Math.max(0, Math.min(1, (p - 0.60) / 0.22));

    // Pulse along circuit trace: 0.75 to 0.92
    const pp = Math.max(0, Math.min(1, (p - 0.75) / 0.17));

    // Final node illumination: 0.84 to 1.00
    const ngp = Math.max(0, Math.min(1, (p - 0.84) / 0.16));

    return {
      drawProgress: dp,
      explodeProgress: ep,
      rebuildProgress: rp,
      pulseProgress: pp,
      nodeGlowProgress: ngp,
      dimBeatOpacity: dim,
    };
  }, [progress, staticMode]);

  // Overall container tilt from cursor parallax (±6deg)
  const containerTilt = pointer.isFine && !isReducedMotion ? pointer.x * 6 : 0;

  // Helper for computing each part's current transform
  const getPartTransform = (part: MechanismPartConfig) => {
    const { assembled, exploded, rebuilt } = part;

    // Exploded coordinates
    const expX = assembled.x + exploded.dx;
    const expY = assembled.y + exploded.dy;
    const expRot = assembled.rotation + exploded.rotation;

    // Parallax depth shift (±8px)
    const pxOffset = pointer.isFine && !isReducedMotion ? pointer.x * 8 * exploded.depth : 0;
    const pyOffset = pointer.isFine && !isReducedMotion ? pointer.y * 8 * exploded.depth : 0;

    let curX: number;
    let curY: number;
    let curRot: number;
    let curScale: number;

    if (rebuildProgress > 0) {
      // Interpolate from exploded to rebuilt
      const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
      const t = ease(rebuildProgress);
      curX = expX + (rebuilt.x - expX) * t;
      curY = expY + (rebuilt.y - expY) * t;
      curRot = expRot + (rebuilt.rotation - expRot) * t;
      const targetScale = rebuilt.scale ?? 1;
      curScale = 1 + (targetScale - 1) * t;
    } else if (explodeProgress > 0) {
      // Interpolate from assembled to exploded
      const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
      const t = ease(explodeProgress);
      curX = assembled.x + (expX - assembled.x) * t;
      curY = assembled.y + (expY - assembled.y) * t;
      curRot = assembled.rotation + (expRot - assembled.rotation) * t;
      curScale = 1;
    } else {
      curX = assembled.x;
      curY = assembled.y;
      curRot = assembled.rotation;
      curScale = assembled.scale ?? 1;
    }

    return `translate(${curX + pxOffset}, ${curY + pyOffset}) rotate(${curRot}) scale(${curScale})`;
  };

  return (
    <figure className={cn('relative w-full h-full flex items-center justify-center', className)}>
      <figcaption className="sr-only">
        An illustration of a mechanism being taken apart and rebuilt into something new.
      </figcaption>

      <svg
        ref={svgRef}
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-full h-full max-h-[58vh] select-none overflow-visible transition-transform duration-300 ease-out"
        style={{
          transform: `rotate(${containerTilt}deg)`,
          transformOrigin: '300px 300px',
        }}
      >
        <defs>
          {/* Pre-baked subtle radial glow for the active moment (no heavy blur filters) */}
          <radialGradient id="ch01-active-moment-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent-gold)" stopOpacity="0.22" />
            <stop offset="50%" stopColor="var(--color-accent-gold)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--color-accent-gold)" stopOpacity="0" />
          </radialGradient>

          {/* Terminal lit node radial glow */}
          <radialGradient id="ch01-terminal-node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent-gold)" stopOpacity="0.85" />
            <stop offset="35%" stopColor="var(--color-accent-gold)" stopOpacity="0.4" />
            <stop offset="70%" stopColor="var(--color-accent-gold)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--color-accent-gold)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Ambient Active Moment Glow behind the mechanism */}
        <circle
          cx="300"
          cy="300"
          r="220"
          fill="url(#ch01-active-moment-glow)"
          style={{
            opacity: drawProgress * dimBeatOpacity * (1 - rebuildProgress * 0.4),
            transition: 'opacity 0.2s linear',
          }}
        />

        {/* 2. Thin Dashed Assembly Lines (visible during explosion beat 30-50%, fading out during rebuild) */}
        {explodeProgress > 0 && rebuildProgress < 0.95 && (
          <g
            id="ch01-assembly-lines"
            stroke="var(--color-accent-gold)"
            strokeWidth="1"
            strokeDasharray="3 4"
            style={{
              opacity: explodeProgress * (1 - rebuildProgress) * 0.45 * dimBeatOpacity,
              vectorEffect: 'non-scaling-stroke',
            }}
          >
            {MECHANISM_PARTS.map((part) => (
              <line
                key={`assembly-${part.id}`}
                x1={part.assembled.x}
                y1={part.assembled.y}
                x2={part.assembled.x + part.exploded.dx * explodeProgress}
                y2={part.assembled.y + part.exploded.dy * explodeProgress}
              />
            ))}
          </g>
        )}

        {/* 3. The 8 Mechanism Parts */}
        <g
          id="ch01-mechanism-assembly"
          stroke="var(--color-accent-gold)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            opacity: drawProgress * dimBeatOpacity,
            vectorEffect: 'non-scaling-stroke',
          }}
        >
          {/* Part 1: Outer Casing Ring */}
          <g
            id="part-outerRing"
            transform={getPartTransform(MECHANISM_PARTS[0])}
            className="transition-transform duration-75"
          >
            {/* Outer circular bezel */}
            <circle cx="0" cy="0" r="145" />
            {/* Inner index track */}
            <circle cx="0" cy="0" r="134" strokeDasharray="1.5 6" />
            {/* Cardinal calibration notches */}
            <line x1="0" y1="-145" x2="0" y2="-130" />
            <line x1="145" y1="0" x2="130" y2="0" />
            <line x1="0" y1="145" x2="0" y2="130" />
            <line x1="-145" y1="0" x2="-130" y2="0" />
            {/* Mounting ears / lugs */}
            <rect x="-12" y="-154" width="24" height="9" rx="2" />
            <circle cx="0" cy="-149.5" r="2" />
            <rect x="-12" y="145" width="24" height="9" rx="2" />
            <circle cx="0" cy="149.5" r="2" />
          </g>

          {/* Part 2: Master Spur Gear (12 teeth, spokes) */}
          <g
            id="part-largeGear"
            transform={getPartTransform(MECHANISM_PARTS[1])}
            className="transition-transform duration-75"
          >
            {/* Gear tooth profile path */}
            <path d="M 0,-74 L 6,-74 L 9,-65 L 29,-69 L 34,-62 L 28,-54 L 46,-43 L 53,-40 L 51,-30 L 65,-14 L 73,-14 L 74,-4 L 74,4 L 73,14 L 65,14 L 51,30 L 53,40 L 46,43 L 28,54 L 34,62 L 29,69 L 9,65 L 6,74 L -6,74 L -9,65 L -29,69 L -34,62 L -28,54 L -46,43 L -53,40 L -51,30 L -65,14 L -73,14 L -74,4 L -74,-4 L -73,-14 L -65,-14 L -51,-30 L -53,-40 L -46,-43 L -28,-54 L -34,-62 L -29,-69 L -9,-65 Z" />
            {/* Center bore */}
            <circle cx="0" cy="0" r="22" />
            {/* 4 Lightening spokes */}
            <circle cx="0" cy="-42" r="11" />
            <circle cx="42" cy="0" r="11" />
            <circle cx="0" cy="42" r="11" />
            <circle cx="-42" cy="0" r="11" />
          </g>

          {/* Part 3: Pinion Gear (8 teeth) */}
          <g
            id="part-smallGear"
            transform={getPartTransform(MECHANISM_PARTS[2])}
            className="transition-transform duration-75"
          >
            {/* 8-tooth gear profile */}
            <path d="M 0,-38 L 5,-38 L 7,-31 L 22,-31 L 27,-22 L 22,-17 L 31,-7 L 38,-5 L 38,5 L 31,7 L 22,17 L 27,22 L 22,31 L 7,31 L 5,38 L -5,38 L -7,31 L -22,31 L -27,22 L -22,17 L -31,7 L -38,5 L -38,-5 L -31,-7 L -22,-17 L -27,-22 L -22,-31 L -7,-31 Z" />
            {/* Hub and keyway slot */}
            <circle cx="0" cy="0" r="12" />
            <path d="M -3,-12 L 3,-12 L 3,-7 L -3,-7 Z" />
          </g>

          {/* Part 4: Transmission Arbor / Shaft */}
          <g
            id="part-shaft"
            transform={getPartTransform(MECHANISM_PARTS[3])}
            className="transition-transform duration-75"
          >
            <line x1="0" y1="-50" x2="0" y2="50" strokeWidth="2.5" />
            <circle cx="0" cy="-35" r="6" />
            <circle cx="0" cy="35" r="6" />
            <line x1="-8" y1="-15" x2="8" y2="-15" strokeWidth="1.5" />
            <line x1="-8" y1="15" x2="8" y2="15" strokeWidth="1.5" />
          </g>

          {/* Part 5: Circuit Plate & Traces */}
          <g
            id="part-circuitPlate"
            transform={getPartTransform(MECHANISM_PARTS[4])}
            className="transition-transform duration-75"
          >
            {/* PCB substrate outline */}
            <path d="M -65,-55 L 45,-55 L 65,-35 L 65,45 L 45,65 L -45,65 L -65,45 Z" />
            {/* Central IC Chip footprint */}
            <rect x="-18" y="-18" width="36" height="36" rx="2" strokeWidth="1.5" />
            <circle cx="-11" cy="-11" r="1.5" fill="var(--color-accent-gold)" />
            {/* IC lead traces branching out */}
            <path d="M -18,-9 L -36,-9 L -48,-21" />
            <path d="M -18,9 L -36,9 L -48,21" />
            <path d="M 18,-9 L 36,-9 L 48,-21" />
            <path d="M 18,9 L 36,9 L 48,21" />
            <path d="M -9,-18 L -9,-36 L -21,-48" />
            <path d="M 9,-18 L 9,-36 L 21,-48" />
            <path d="M -9,18 L -9,36 L -21,48" />
            {/* Terminal Bus line running to bottom connector */}
            <path d="M 9,18 L 9,45 L 0,54 L 0,65" strokeWidth="1.75" />
            {/* Surface mount pad dots */}
            <circle cx="-48" cy="-21" r="2.5" />
            <circle cx="48" cy="-21" r="2.5" />
            <circle cx="-48" cy="21" r="2.5" />
            <circle cx="48" cy="21" r="2.5" />
            <circle cx="-21" cy="-48" r="2.5" />
            <circle cx="21" cy="-48" r="2.5" />
          </g>

          {/* Part 6: Resonator Coil Spring */}
          <g
            id="part-coilSpring"
            transform={getPartTransform(MECHANISM_PARTS[5])}
            className="transition-transform duration-75"
          >
            {/* Archimedean balance coil spiral */}
            <path d="M 0,0 C 5,-2 7,4 3,7 C -4,11 -12,2 -7,-7 C -2,-17 14,-15 20,-3 C 27,11 16,30 -2,33 C -23,36 -39,18 -36,-6 C -32,-33 -5,-48 21,-42" />
            <circle cx="21" cy="-42" r="3" />
            <line x1="21" y1="-42" x2="35" y2="-42" />
          </g>

          {/* Part 7: Screw 1 (Left) */}
          <g
            id="part-screw1"
            transform={getPartTransform(MECHANISM_PARTS[6])}
            className="transition-transform duration-75"
          >
            <circle cx="0" cy="0" r="8" />
            <line x1="-5" y1="0" x2="5" y2="0" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="11" strokeDasharray="2 3" opacity="0.6" />
          </g>

          {/* Part 8: Screw 2 (Right) */}
          <g
            id="part-screw2"
            transform={getPartTransform(MECHANISM_PARTS[7])}
            className="transition-transform duration-75"
          >
            <circle cx="0" cy="0" r="8" />
            <line x1="0" y1="-5" x2="0" y2="5" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="11" strokeDasharray="2 3" opacity="0.6" />
          </g>
        </g>

        {/* 4. Question Glyphs that Morph into Small Filled Anchor Dots */}
        {rebuildProgress < 0.8 && (
          <g id="ch01-curiosity-glyphs" style={{ opacity: drawProgress * dimBeatOpacity }}>
            {QUESTION_GLYPHS.map((q) => {
              // During beat 1 (explodeProgress == 0): question mark glyph
              // During beat 2 (explodeProgress > 0): morph into filled gold anchor dot
              return (
                <g
                  key={q.id}
                  transform={`translate(${q.x}, ${q.y})`}
                  className="transition-all duration-200"
                >
                  {/* Morphed filled dot (Beat 2) */}
                  <circle
                    cx="0"
                    cy="0"
                    r="2.5"
                    fill="var(--color-accent-gold)"
                    style={{
                      opacity: explodeProgress * (1 - rebuildProgress),
                      transform: `scale(${explodeProgress > 0 ? 1 : 0.2})`,
                    }}
                  />
                  {/* Question Mark glyph (Beat 1) */}
                  {explodeProgress < 0.9 && (
                    <g
                      style={{
                        opacity: (1 - explodeProgress * 1.4) * (1 - rebuildProgress),
                      }}
                      stroke="var(--color-accent-gold)"
                      strokeWidth="1.2"
                      fill="none"
                      strokeLinecap="round"
                    >
                      <path d="M -3,-6 C -3,-10 3,-10 3,-6 C 3,-3 0,-2 0,0" />
                      <circle cx="0" cy="3" r="0.75" fill="var(--color-accent-gold)" />
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        )}

        {/* 5. Rebuilt Extension Trace leading down and out of frame */}
        {rebuildProgress > 0.2 && (
          <g
            id="ch01-rebuilt-bus"
            stroke="var(--color-accent-gold)"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{
              opacity: rebuildProgress,
              vectorEffect: 'non-scaling-stroke',
            }}
          >
            {/* The structural circuit bus route descending from the rebuilt plate */}
            <path d={TERMINAL_TRACE_PATH} />

            {/* Subtle guide tick marks along the terminal bus */}
            <line x1="294" y1="430" x2="306" y2="430" strokeWidth="1" opacity="0.6" />
            <line x1="279" y1="467" x2="291" y2="467" strokeWidth="1" opacity="0.6" />
            <line x1="294" y1="505" x2="306" y2="505" strokeWidth="1" opacity="0.6" />
          </g>
        )}

        {/* 6. Gold Travelling Pulse along the trace (stroke-dash animation) */}
        {pulseProgress > 0 && (
          <path
            d={TERMINAL_TRACE_PATH}
            stroke="var(--color-accent-gold)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="28 200"
            strokeDashoffset={220 * (1 - pulseProgress)}
            style={{
              filter: 'drop-shadow(0 0 4px var(--color-accent-gold))',
              vectorEffect: 'non-scaling-stroke',
            }}
          />
        )}

        {/* 7. Illuminated Terminal Node (meets Chapter 02 ThreadSpine) */}
        {nodeGlowProgress > 0 && (
          <g
            id="ch01-terminal-node"
            transform={`translate(${TERMINAL_NODE_COORDS.x}, ${TERMINAL_NODE_COORDS.y})`}
            style={{ opacity: nodeGlowProgress }}
          >
            {/* Pre-baked radial glow disc */}
            <circle cx="0" cy="0" r="28" fill="url(#ch01-terminal-node-glow)" />
            {/* Core luminous node */}
            <circle
              cx="0"
              cy="0"
              r="4.5"
              fill="var(--color-accent-gold)"
              stroke="var(--theme-background)"
              strokeWidth="1"
            />
          </g>
        )}
      </svg>
    </figure>
  );
}
