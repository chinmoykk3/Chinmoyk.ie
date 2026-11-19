'use client';

import { createContext, useContext } from 'react';
import type Lenis from 'lenis';

export interface MotionContextType {
  prefersReducedMotion: boolean;
  motionEnabled: boolean;
  reduceEffects: boolean;
  setMotionEnabled: (enabled: boolean) => void;
  toggleMotion: () => void;
  setReduceEffects: (enabled: boolean) => void;
  toggleReduceEffects: () => void;
  scrollProgress: number;
  lenis: Lenis | null;
}

export const MotionContext = createContext<MotionContextType>({
  prefersReducedMotion: false,
  motionEnabled: true,
  reduceEffects: false,
  setMotionEnabled: () => {},
  toggleMotion: () => {},
  setReduceEffects: () => {},
  toggleReduceEffects: () => {},
  scrollProgress: 0,
  lenis: null,
});

export function useMotion() {
  return useContext(MotionContext);
}
