'use client';

import React from 'react';
import { WORKBENCH_OBJECTS, ASSEMBLY_PATHS, ObjectConfig } from './chapter01.config';
import {
  KernelModule,
  NetworkModule,
  TerminalModule,
  NeuralModule,
} from './objects/DevModules';
import { SystemCore } from './SystemCore';
import { Chapter01Phases } from './chapter01.timeline';
import { cn } from '@/lib/utils';

export interface WorkbenchProps {
  phases: Chapter01Phases;
  isReducedMotion?: boolean;
  activeObjectId?: ObjectConfig['id'] | null;
  onSelectObject?: (id: ObjectConfig['id'] | null) => void;
  className?: string;
}

const RULER_TICKS = Array.from({ length: 21 }, (_, i) => i * 50);

export function Workbench({
  phases,
  isReducedMotion = false,
  activeObjectId = null,
  onSelectObject,
  className,
}: WorkbenchProps) {
  const {
    watchOpenProgress,
    radioOpenProgress,
    lensOpenProgress,
    circuitOpenProgress,
    interiorMotionSpeed,
    questionWordsOpacity,
    gapGlowOpacity,
    assemblyFlightProgress,
    isIgnited,
    ignitionGlow,
    exitRayProgress,
  } = phases;

  const isPartsFlying = assemblyFlightProgress > 0 && assemblyFlightProgress < 1;
  const isEmptied = isIgnited || assemblyFlightProgress >= 0.95;

  return (
    <figure className={cn('relative w-full h-full flex items-center justify-center', className)}>
      <figcaption className="sr-only">
        A dark workbench. A small light reveals four objects opening up to show how they work. The room falls quiet. Parts from the objects assemble into a new lamp, which lights up.
      </figcaption>

      <svg
        viewBox="0 0 1000 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-full h-full max-h-[58vh] select-none overflow-visible"
        stroke="var(--color-accent-gold)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          {/* Subtle workbench surface ambient wash */}
          <linearGradient id="workbench-plane-wash" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-surface)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-surface-elevated)" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* 1. Perspective Horizon Line & Faint Workbench Table Plane */}
        <g id="workbench-surface" strokeWidth="1">
          {/* Perspective table top surface */}
          <polygon
            points="40,430 960,430 1000,560 0,560"
            fill="url(#workbench-plane-wash)"
            stroke="none"
          />
          {/* Table back edge horizon */}
          <line
            x1="30"
            y1="430"
            x2="970"
            y2="430"
            stroke="var(--color-border)"
            strokeWidth="1.25"
            style={{ vectorEffect: 'non-scaling-stroke' }}
          />
          {/* Table front bevel line */}
          <line
            x1="0"
            y1="560"
            x2="1000"
            y2="560"
            stroke="var(--color-border-strong)"
            strokeWidth="1.5"
            style={{ vectorEffect: 'non-scaling-stroke' }}
          />
          {/* Subtle perspective grid lines */}
          <line x1="220" y1="430" x2="160" y2="560" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.4" />
          <line x1="420" y1="430" x2="400" y2="560" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.4" />
          <line x1="620" y1="430" x2="640" y2="560" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.4" />
          <line x1="820" y1="430" x2="880" y2="560" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.4" />

          {/* Blueprint Ruler Ticks along front edge */}
          {RULER_TICKS.map((tx) => (
            <line
              key={`tick-${tx}`}
              x1={tx}
              y1="560"
              x2={tx}
              y2={tx % 100 === 0 ? '572' : '566'}
              stroke="var(--color-border-strong)"
              strokeWidth={tx % 100 === 0 ? '1.2' : '0.7'}
              opacity={tx % 100 === 0 ? '0.65' : '0.35'}
            />
          ))}

          {/* Desk Coordinate & Revision Micro-Stamps */}
          <g fill="var(--color-text-muted)" stroke="none" fontFamily="var(--font-mono)" fontSize="8" opacity="0.4">
            <text x="8" y="584">X:000</text>
            <text x="500" y="584" textAnchor="middle">X:500 // CORE_BUS</text>
            <text x="992" y="584" textAnchor="end">REV 1.0 · X:1000</text>
          </g>

          {/* Etched PCB Bus Traces on Desk Surface (Modules -> Core Base) */}
          <g
            id="workbench-pcb-traces"
            fill="none"
            stroke={isPartsFlying || isIgnited ? 'var(--color-accent-gold)' : 'var(--color-border-strong)'}
            strokeWidth="1.2"
            opacity={isIgnited ? 0.8 : isPartsFlying ? 0.6 : 0.35}
          >
            {/* 01 Kernel -> Core */}
            <path d="M 180,435 L 180,475 L 220,515 L 448,515 L 470,493 L 470,435" />
            <circle cx="180" cy="435" r="2.5" fill="var(--color-cinema-bg)" />
            {/* 02 Network -> Core */}
            <path d="M 340,435 L 340,462 L 368,490 L 485,490 L 485,435" />
            <circle cx="340" cy="435" r="2.5" fill="var(--color-cinema-bg)" />
            {/* 03 Terminal -> Core */}
            <path d="M 660,435 L 660,462 L 632,490 L 515,490 L 515,435" />
            <circle cx="660" cy="435" r="2.5" fill="var(--color-cinema-bg)" />
            {/* 04 Neural -> Core */}
            <path d="M 820,435 L 820,475 L 780,515 L 552,515 L 530,493 L 530,435" />
            <circle cx="820" cy="435" r="2.5" fill="var(--color-cinema-bg)" />
          </g>

          {/* Module Memory Address Labels on Desk Plane */}
          <g fill="var(--color-accent-gold)" stroke="none" fontFamily="var(--font-mono)" fontSize="8.5" opacity="0.45">
            <text x="180" y="452" textAnchor="middle">0x01 · KERNEL</text>
            <text x="340" y="452" textAnchor="middle">0x02 · NET_BUS</text>
            <text x="660" y="452" textAnchor="middle">0x03 · AST_CLI</text>
            <text x="820" y="452" textAnchor="middle">0x04 · NEURAL</text>
          </g>
        </g>

        {/* Ambient Golden Sparks / Dust Motes */}
        <g id="workbench-sparks" fill="var(--color-accent-gold)" stroke="none" pointerEvents="none">
          <circle cx="140" cy="210" r="1.4" opacity={isIgnited ? 0.65 : 0.2} />
          <circle cx="290" cy="170" r="1" opacity={isIgnited ? 0.55 : 0.15} />
          <circle cx="440" cy="135" r="1.6" opacity={isIgnited ? 0.75 : 0.25} />
          <circle cx="570" cy="145" r="1.2" opacity={isIgnited ? 0.65 : 0.2} />
          <circle cx="725" cy="185" r="1.5" opacity={isIgnited ? 0.6 : 0.18} />
          <circle cx="870" cy="230" r="1.1" opacity={isIgnited ? 0.55 : 0.15} />
        </g>

        {/* 2. The Four Engineering Modules */}
        {/* Module 1: Kernel & Clock (left) */}
        <KernelModule
          x={WORKBENCH_OBJECTS[0].x}
          y={WORKBENCH_OBJECTS[0].y}
          openProgress={watchOpenProgress}
          motionSpeed={interiorMotionSpeed}
          isPartDetached={isPartsFlying || isEmptied}
          isEmptied={isEmptied}
        />

        {/* Module 2: Network & Signal (mid-left) */}
        <NetworkModule
          x={WORKBENCH_OBJECTS[1].x}
          y={WORKBENCH_OBJECTS[1].y}
          openProgress={radioOpenProgress}
          motionSpeed={interiorMotionSpeed}
          isPartDetached={isPartsFlying || isEmptied}
          isEmptied={isEmptied}
        />

        {/* Module 3: Terminal & AST (mid-right) */}
        <TerminalModule
          x={WORKBENCH_OBJECTS[2].x}
          y={WORKBENCH_OBJECTS[2].y}
          openProgress={lensOpenProgress}
          motionSpeed={interiorMotionSpeed}
          isPartDetached={isPartsFlying || isEmptied}
          isEmptied={isEmptied}
        />

        {/* Module 4: Neural Logic Gate (right) */}
        <NeuralModule
          x={WORKBENCH_OBJECTS[3].x}
          y={WORKBENCH_OBJECTS[3].y}
          openProgress={circuitOpenProgress}
          motionSpeed={interiorMotionSpeed}
          isPartDetached={isPartsFlying || isEmptied}
          isEmptied={isEmptied}
        />

        {/* 3. Developer Inquiry Prompts beside modules */}
        {questionWordsOpacity > 0 && !isEmptied && (
          <g id="workbench-question-words" style={{ opacity: questionWordsOpacity }}>
            {WORKBENCH_OBJECTS.map((obj) => (
              <g key={`qw-${obj.id}`} transform={`translate(${obj.x + obj.questionOffset.x}, ${obj.y + obj.questionOffset.y})`}>
                <text
                  x="0"
                  y="0"
                  fill="var(--color-accent-gold)"
                  stroke="none"
                  fontFamily="var(--font-mono)"
                  fontSize="11"
                  opacity={watchOpenProgress > 0.8 ? 0.35 : 0.85}
                >
                  {obj.questionWord}
                </text>
                <circle cx="-7" cy="-3.5" r="1.5" fill="var(--color-accent-gold)" stroke="none" />
              </g>
            ))}
          </g>
        )}

        {/* 4. Data Bus Assembly Trails during Compile (60% to 88%) */}
        {isPartsFlying && (
          <g id="assembly-flight-trails" strokeWidth="1.25" strokeDasharray="3 5" opacity="0.65">
            <path d={ASSEMBLY_PATHS.watchGear} />
            <path d={ASSEMBLY_PATHS.radioCoil} />
            <path d={ASSEMBLY_PATHS.lensShade} />
            <path d={ASSEMBLY_PATHS.circuitSwitch} />
            <path d={ASSEMBLY_PATHS.sparkPoint} strokeDasharray="none" strokeWidth="1.5" />
          </g>
        )}

        {/* 5. Center System Core (Slot -> Assembled -> Online -> Data Ray Exit) */}
        <SystemCore
          assemblyProgress={assemblyFlightProgress}
          isIgnited={isIgnited}
          ignitionGlow={ignitionGlow}
          exitRayProgress={exitRayProgress}
          gapGlowOpacity={gapGlowOpacity}
        />

        {/* 6. Interactive Object Inspection Reticles & Hit Targets */}
        {onSelectObject && (
          <g id="workbench-hit-targets">
            {WORKBENCH_OBJECTS.map((obj) => {
              const isSelected = activeObjectId === obj.id;
              return (
                <g
                  key={`hit-${obj.id}`}
                  transform={`translate(${obj.x}, ${obj.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => onSelectObject(obj.id)}
                  onClick={() => onSelectObject(isSelected ? null : obj.id)}
                >
                  {/* Transparent hit area */}
                  <circle cx="0" cy="0" r="64" fill="transparent" stroke="none" />

                  {/* Inspection reticle when active/hovered */}
                  {isSelected && (
                    <g stroke="var(--color-accent-gold)" fill="none" pointerEvents="none">
                      <circle
                        cx="0"
                        cy="0"
                        r="56"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        opacity="0.7"
                      />
                      {/* Corner targeting brackets */}
                      <path d="M -52,-38 L -52,-52 L -38,-52" strokeWidth="1.5" opacity="0.9" />
                      <path d="M 38,-52 L 52,-52 L 52,-38" strokeWidth="1.5" opacity="0.9" />
                      <path d="M -52,38 L -52,52 L -38,52" strokeWidth="1.5" opacity="0.9" />
                      <path d="M 38,52 L 52,52 L 52,38" strokeWidth="1.5" opacity="0.9" />
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        )}
      </svg>
    </figure>
  );
}
