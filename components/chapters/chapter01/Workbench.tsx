'use client';

import React from 'react';
import { WORKBENCH_OBJECTS, ASSEMBLY_PATHS } from './chapter01.config';
import { PocketWatch } from './objects/PocketWatch';
import { Radio } from './objects/Radio';
import { CameraLens } from './objects/CameraLens';
import { CircuitBoard } from './objects/CircuitBoard';
import { Lamp } from './Lamp';
import { Chapter01Phases } from './chapter01.timeline';
import { cn } from '@/lib/utils';

export interface WorkbenchProps {
  phases: Chapter01Phases;
  isReducedMotion?: boolean;
  className?: string;
}

export function Workbench({
  phases,
  isReducedMotion = false,
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
        </g>

        {/* 2. The Four Workbench Objects */}
        {/* Object 1: Pocket Watch (left) */}
        <PocketWatch
          x={WORKBENCH_OBJECTS[0].x}
          y={WORKBENCH_OBJECTS[0].y}
          openProgress={watchOpenProgress}
          motionSpeed={interiorMotionSpeed}
          isPartDetached={isPartsFlying || isEmptied}
          isEmptied={isEmptied}
        />

        {/* Object 2: Vintage Radio (mid-left) */}
        <Radio
          x={WORKBENCH_OBJECTS[1].x}
          y={WORKBENCH_OBJECTS[1].y}
          openProgress={radioOpenProgress}
          motionSpeed={interiorMotionSpeed}
          isPartDetached={isPartsFlying || isEmptied}
          isEmptied={isEmptied}
        />

        {/* Object 3: Camera Lens (mid-right) */}
        <CameraLens
          x={WORKBENCH_OBJECTS[2].x}
          y={WORKBENCH_OBJECTS[2].y}
          openProgress={lensOpenProgress}
          motionSpeed={interiorMotionSpeed}
          isPartDetached={isPartsFlying || isEmptied}
          isEmptied={isEmptied}
        />

        {/* Object 4: Circuit Board (right) */}
        <CircuitBoard
          x={WORKBENCH_OBJECTS[3].x}
          y={WORKBENCH_OBJECTS[3].y}
          openProgress={circuitOpenProgress}
          motionSpeed={interiorMotionSpeed}
          isPartDetached={isPartsFlying || isEmptied}
          isEmptied={isEmptied}
        />

        {/* 3. Question Words beside objects (fading in and morphing into small gold dots) */}
        {questionWordsOpacity > 0 && !isEmptied && (
          <g id="workbench-question-words" style={{ opacity: questionWordsOpacity }}>
            {WORKBENCH_OBJECTS.map((obj) => (
              <g key={`qw-${obj.id}`} transform={`translate(${obj.x + obj.questionOffset.x}, ${obj.y + obj.questionOffset.y})`}>
                {/* Question word text */}
                <text
                  x="0"
                  y="0"
                  fill="var(--color-accent-gold)"
                  stroke="none"
                  fontFamily="var(--font-serif)"
                  fontStyle="italic"
                  fontSize="13"
                  opacity={watchOpenProgress > 0.8 ? 0.3 : 0.85}
                >
                  {obj.questionWord}
                </text>
                {/* Morphed gold dot */}
                <circle cx="-6" cy="-3" r="1.5" fill="var(--color-accent-gold)" stroke="none" />
              </g>
            ))}
          </g>
        )}

        {/* 4. Flight Paths & Flying Detachable Parts during Assembly (60% to 88%) */}
        {isPartsFlying && (
          <g id="assembly-flight-trails" strokeWidth="1.25" strokeDasharray="3 5" opacity="0.65">
            {/* Assembly bezier flight paths */}
            <path d={ASSEMBLY_PATHS.watchGear} />
            <path d={ASSEMBLY_PATHS.radioCoil} />
            <path d={ASSEMBLY_PATHS.lensShade} />
            <path d={ASSEMBLY_PATHS.circuitSwitch} />
            <path d={ASSEMBLY_PATHS.sparkPoint} strokeDasharray="none" strokeWidth="1.5" />
          </g>
        )}

        {/* 5. Center Lamp Component (Gap -> Assembled -> Ignited -> Ray Exit) */}
        <Lamp
          assemblyProgress={assemblyFlightProgress}
          isIgnited={isIgnited}
          ignitionGlow={ignitionGlow}
          exitRayProgress={exitRayProgress}
          gapGlowOpacity={gapGlowOpacity}
        />
      </svg>
    </figure>
  );
}
