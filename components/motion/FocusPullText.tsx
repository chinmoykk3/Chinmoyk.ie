'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useMotion } from '@/hooks/useMotion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

export interface FocusPullTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  initialBlur?: number; // default 12px
  start?: string;
  end?: string;
  withGrain?: boolean;
  className?: string;
}

export function FocusPullText({
  children,
  initialBlur = 12,
  start = 'top 85%',
  end = 'top 45%',
  withGrain = true,
  className,
  ...props
}: FocusPullTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const { motionEnabled } = useMotion();
  const [grainUrl, setGrainUrl] = useState<string | null>(null);

  // Generate lightweight procedural 35mm grain overlay
  useEffect(() => {
    if (!withGrain || typeof window === 'undefined') return;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const imgData = ctx.createImageData(64, 64);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const noise = Math.floor(Math.random() * 255);
          data[i] = noise;
          data[i + 1] = noise;
          data[i + 2] = noise;
          data[i + 3] = 40;
        }
        ctx.putImageData(imgData, 0, 0);
        setGrainUrl(canvas.toDataURL('image/png'));
      }
    } catch {
      // Graceful fallback
    }
  }, [withGrain]);

  useEffect(() => {
    const el = containerRef.current;
    const textEl = textRef.current;
    const grainEl = grainRef.current;
    if (!el || !textEl) return;

    if (!motionEnabled) {
      // Reduced motion fallback: Instantly sharp, no grain
      gsap.set(textEl, { filter: 'blur(0px)', opacity: 1, clearProps: 'all' });
      if (grainEl) gsap.set(grainEl, { opacity: 0 });
      return;
    }

    gsap.set(textEl, {
      filter: `blur(${initialBlur}px)`,
      opacity: 0.35,
    });
    if (grainEl) {
      gsap.set(grainEl, { opacity: 0.45 });
    }

    const tween = gsap.to(textEl, {
      filter: 'blur(0px)',
      opacity: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub: 0.6,
        onEnter: () => {
          textEl.style.willChange = 'filter, opacity';
        },
        onLeave: () => {
          textEl.style.willChange = 'auto';
        },
        onLeaveBack: () => {
          textEl.style.willChange = 'auto';
        },
        onUpdate: (self) => {
          if (grainEl) {
            grainEl.style.opacity = `${(1 - self.progress) * 0.45}`;
          }
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      textEl.style.willChange = 'auto';
    };
  }, [initialBlur, start, end, motionEnabled, grainUrl]);

  return (
    <div
      ref={containerRef}
      className={cn('relative transition-colors duration-200 overflow-visible', className)}
      {...props}
    >
      <div ref={textRef} className="relative z-10">
        {children}
      </div>

      {grainUrl && motionEnabled && (
        <div
          ref={grainRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 mix-blend-screen opacity-40 transition-opacity duration-150"
          style={{ backgroundImage: `url(${grainUrl})`, backgroundRepeat: 'repeat' }}
        />
      )}
    </div>
  );
}
