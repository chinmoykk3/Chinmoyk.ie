'use client';

import React, { useRef, useEffect } from 'react';
import { useMotion } from '@/hooks/useMotion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

export interface FocusPullTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  initialBlur?: number; // default 10px
  start?: string;
  end?: string;
  className?: string;
}

export function FocusPullText({
  children,
  initialBlur = 10,
  start = 'top 85%',
  end = 'top 45%',
  className,
  ...props
}: FocusPullTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { motionEnabled } = useMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!motionEnabled) {
      // Reduced motion fallback: Instantly sharp
      gsap.set(el, { filter: 'blur(0px)', opacity: 1, clearProps: 'all' });
      return;
    }

    gsap.set(el, {
      filter: `blur(${initialBlur}px)`,
      opacity: 0.35,
    });

    const tween = gsap.to(el, {
      filter: 'blur(0px)',
      opacity: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub: 0.6,
        onEnter: () => {
          el.style.willChange = 'filter, opacity';
        },
        onLeave: () => {
          el.style.willChange = 'auto';
        },
        onLeaveBack: () => {
          el.style.willChange = 'auto';
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      if (el) el.style.willChange = 'auto';
    };
  }, [initialBlur, start, end, motionEnabled]);

  return (
    <div
      ref={containerRef}
      className={cn('relative transition-colors duration-200', className)}
      {...props}
    >
      {children}
    </div>
  );
}
