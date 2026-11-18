'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useMotion } from '@/hooks/useMotion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

export interface SubtitleRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  lines: string[];
  fullText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function SubtitleReveal({
  lines,
  fullText,
  size = 'md',
  className,
  ...props
}: SubtitleRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const { motionEnabled } = useMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const entireNarrative = fullText || lines.join(' ');

  const sizeClasses = {
    sm: 'text-base sm:text-lg',
    md: 'text-fluid-narration sm:text-2xl',
    lg: 'text-2xl sm:text-3xl lg:text-4xl',
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!motionEnabled) {
      // Reduced motion: All lines fully readable without scroll dimming
      setActiveIndex(lines.length - 1);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 75%',
      end: 'bottom 40%',
      scrub: 0.5,
      onUpdate: (self) => {
        const step = Math.min(lines.length - 1, Math.floor(self.progress * lines.length));
        setActiveIndex(step);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [lines.length, motionEnabled]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative space-y-3 font-serif italic transition-colors duration-200',
        className
      )}
      {...props}
    >
      {/* Accessible screen reader announcement: Full text always accessible at once */}
      <div className="sr-only">
        <p>{entireNarrative}</p>
      </div>

      {/* Visual line-by-line scroll highlight (aria-hidden to avoid screen reader fragmentation) */}
      <div aria-hidden="true" className="space-y-2">
        {lines.map((line, idx) => {
          const isActive = idx === activeIndex;
          const isPast = idx < activeIndex;

          return (
            <p
              key={idx}
              ref={(el) => {
                lineRefs.current[idx] = el;
              }}
              className={cn(
                'leading-relaxed transition-all duration-300 transform-gpu',
                sizeClasses[size],
                !motionEnabled
                  ? 'text-theme-text opacity-100'
                  : isActive
                    ? 'text-theme-text opacity-100 translate-x-1 font-normal'
                    : isPast
                      ? 'text-theme-muted opacity-45 translate-x-0'
                      : 'text-theme-muted opacity-15 translate-x-0'
              )}
            >
              {line}
            </p>
          );
        })}
      </div>
    </div>
  );
}
