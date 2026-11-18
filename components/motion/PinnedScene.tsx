'use client';

import React, { useRef, useEffect } from 'react';
import { useMotion } from '@/hooks/useMotion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

export interface PinnedSceneProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onProgress'> {
  pinDuration?: string; // e.g. "+=100%" or "+=150%"
  pinSpacing?: boolean;
  onProgress?: (progress: number) => void;
  children: React.ReactNode;
}

export function PinnedScene({
  pinDuration = '+=100%',
  pinSpacing = true,
  onProgress,
  className,
  children,
  ...props
}: PinnedSceneProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinContentRef = useRef<HTMLDivElement>(null);
  const { motionEnabled } = useMotion();

  useEffect(() => {
    const triggerEl = triggerRef.current;
    const contentEl = pinContentRef.current;
    if (!triggerEl || !contentEl) return;

    if (!motionEnabled) {
      // Reduced motion: No pinning, render natural flow
      onProgress?.(1);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top top',
      end: pinDuration,
      pin: contentEl,
      pinSpacing,
      scrub: 0.5,
      onUpdate: (self) => {
        onProgress?.(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [pinDuration, pinSpacing, onProgress, motionEnabled]);

  return (
    <div ref={triggerRef} className={cn('relative w-full', className)} {...props}>
      <div ref={pinContentRef} className="w-full min-h-screen flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}
