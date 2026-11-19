'use client';

import { useState, useEffect } from 'react';
import { useMotion } from '@/hooks/useMotion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface ChapterProgressState {
  progress: number;
  isInView: boolean;
  isPassed: boolean;
}

export function useChapterProgress(chapterId: string): ChapterProgressState {
  const { motionEnabled } = useMotion();
  const [state, setState] = useState<ChapterProgressState>({
    progress: 0,
    isInView: false,
    isPassed: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const element = document.getElementById(chapterId);
    if (!element) return;

    if (!motionEnabled) {
      // Reduced motion fallback using IntersectionObserver
      const observer = new IntersectionObserver(
        ([entry]) => {
          setState({
            progress: entry.isIntersecting ? 1 : 0,
            isInView: entry.isIntersecting,
            isPassed: !entry.isIntersecting && entry.boundingClientRect.top < 0,
          });
        },
        { threshold: [0, 0.5, 1] }
      );

      observer.observe(element);
      return () => observer.disconnect();
    }

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.3,
      onUpdate: (self) => {
        setState({
          progress: self.progress,
          isInView: self.isActive,
          isPassed: self.progress >= 1,
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [chapterId, motionEnabled]);

  return state;
}
