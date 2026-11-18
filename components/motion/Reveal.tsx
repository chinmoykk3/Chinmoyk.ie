'use client';

import React, { useRef, useEffect } from 'react';
import { useMotion } from '@/hooks/useMotion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'fade' | 'translate' | 'mask';
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  children: React.ReactNode;
}

export function Reveal({
  variant = 'translate',
  delay = 0,
  duration = 0.8,
  threshold = 0.15,
  once = true,
  className,
  children,
  ...props
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { motionEnabled } = useMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Reduced motion fallback: Simple subtle opacity fade
    if (!motionEnabled) {
      gsap.set(el, { opacity: 1, y: 0, clipPath: 'none', clearProps: 'all' });
      return;
    }

    let tween: gsap.core.Tween;

    if (variant === 'mask') {
      // Cinematic clip-path wipe reveal
      gsap.set(el, {
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        opacity: 0,
      });

      tween = gsap.to(el, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        opacity: 1,
        duration,
        delay,
        ease: 'power3.out',
        onStart: () => {
          el.style.willChange = 'clip-path, opacity';
        },
        onComplete: () => {
          el.style.willChange = 'auto';
        },
        scrollTrigger: {
          trigger: el,
          start: `top ${100 - threshold * 100}%`,
          once,
        },
      });
    } else if (variant === 'fade') {
      gsap.set(el, { opacity: 0 });

      tween = gsap.to(el, {
        opacity: 1,
        duration,
        delay,
        ease: 'power2.out',
        onStart: () => {
          el.style.willChange = 'opacity';
        },
        onComplete: () => {
          el.style.willChange = 'auto';
        },
        scrollTrigger: {
          trigger: el,
          start: `top ${100 - threshold * 100}%`,
          once,
        },
      });
    } else {
      // Default: Translate Up + Smooth Fade
      gsap.set(el, { opacity: 0, y: 28 });

      tween = gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        onStart: () => {
          el.style.willChange = 'transform, opacity';
        },
        onComplete: () => {
          el.style.willChange = 'auto';
        },
        scrollTrigger: {
          trigger: el,
          start: `top ${100 - threshold * 100}%`,
          once,
        },
      });
    }

    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
      if (el) {
        el.style.willChange = 'auto';
      }
    };
  }, [variant, delay, duration, threshold, once, motionEnabled]);

  return (
    <div ref={containerRef} className={cn('transition-colors duration-200', className)} {...props}>
      {children}
    </div>
  );
}
