'use client';

import { useState, useEffect, RefObject } from 'react';
import { useMotion } from '@/hooks/useMotion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface ScrollProgressState {
  progress: number;
  direction: number;
  velocity: number;
  isInView: boolean;
}

export function useScrollProgress(
  targetRef?: RefObject<HTMLElement | null>,
  options?: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
  }
): ScrollProgressState {
  const { motionEnabled } = useMotion();
  const [state, setState] = useState<ScrollProgressState>({
    progress: 0,
    direction: 1,
    velocity: 0,
    isInView: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Fallback when targetRef is not provided: track window scroll
    if (!targetRef?.current) {
      const handleScroll = () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const current = window.scrollY;
        const prog = total > 0 ? Math.min(1, Math.max(0, current / total)) : 0;
        setState((prev) => ({
          ...prev,
          progress: prog,
          isInView: true,
        }));
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }

    // Target element tracking using GSAP ScrollTrigger
    const element = targetRef.current;
    if (!element) return;

    const startPos = options?.start || 'top bottom';
    const endPos = options?.end || 'bottom top';

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: startPos,
      end: endPos,
      scrub: motionEnabled ? (options?.scrub ?? true) : false,
      onUpdate: (self) => {
        setState({
          progress: self.progress,
          direction: self.direction,
          velocity: self.getVelocity(),
          isInView: self.isActive,
        });
      },
      onToggle: (self) => {
        setState((prev) => ({
          ...prev,
          isInView: self.isActive,
        }));
      },
    });

    return () => {
      trigger.kill();
    };
  }, [targetRef, options?.start, options?.end, options?.scrub, motionEnabled]);

  return state;
}
