'use client';

import { createContext, useContext } from 'react';
import type Lenis from 'lenis';

export interface MotionContextType {
  prefersReducedMotion: boolean;
  motionEnabled: boolean;
  setMotionEnabled: (enabled: boolean) => void;
  toggleMotion: () => void;
  scrollProgress: number;
  lenis: Lenis | null;
}

export const MotionContext = createContext<MotionContextType>({
  prefersReducedMotion: false,
  motionEnabled: true,
  setMotionEnabled: () => {},
  toggleMotion: () => {},
  scrollProgress: 0,
  lenis: null,
});

export function useMotion() {
  return useContext(MotionContext);
}
