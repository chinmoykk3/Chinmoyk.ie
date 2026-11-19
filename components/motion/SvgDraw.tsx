'use client';

import React, { useRef, useEffect } from 'react';
import { useMotion } from '@/hooks/useMotion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

export interface SvgDrawProps extends React.SVGAttributes<SVGSVGElement> {
  path?: string;
  triggerOn?: 'scroll' | 'inView';
  start?: string;
  end?: string;
  duration?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

export function SvgDraw({
  path,
  triggerOn = 'scroll',
  start = 'top 80%',
  end = 'center 45%',
  duration = 1.2,
  strokeColor = 'currentColor',
  strokeWidth = 2,
  className,
  children,
  ...props
}: SvgDrawProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const { motionEnabled } = useMotion();

  useEffect(() => {
    const pathEl = pathRef.current;
    const svgEl = svgRef.current;
    if (!pathEl || !svgEl) return;

    // Measure total length of the path
    const length = pathEl.getTotalLength ? pathEl.getTotalLength() : 300;

    if (!motionEnabled) {
      // Reduced motion: fully drawn immediately
      pathEl.style.strokeDasharray = `${length}`;
      pathEl.style.strokeDashoffset = '0';
      return;
    }

    pathEl.style.strokeDasharray = `${length}`;
    pathEl.style.strokeDashoffset = `${length}`;

    if (triggerOn === 'scroll') {
      const tween = gsap.to(pathEl, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: svgEl,
          start,
          end,
          scrub: 0.5,
          onEnter: () => {
            pathEl.style.willChange = 'stroke-dashoffset';
          },
          onLeave: () => {
            pathEl.style.willChange = 'auto';
          },
          onLeaveBack: () => {
            pathEl.style.willChange = 'auto';
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        pathEl.style.willChange = 'auto';
      };
    } else {
      // Trigger once on view
      const tween = gsap.to(pathEl, {
        strokeDashoffset: 0,
        duration,
        ease: 'power2.out',
        onStart: () => {
          pathEl.style.willChange = 'stroke-dashoffset';
        },
        onComplete: () => {
          pathEl.style.willChange = 'auto';
        },
        scrollTrigger: {
          trigger: svgEl,
          start,
          once: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        pathEl.style.willChange = 'auto';
      };
    }
  }, [path, triggerOn, start, end, duration, motionEnabled]);

  return (
    <svg
      ref={svgRef}
      className={cn('overflow-visible', className)}
      {...props}
    >
      {path ? (
        <path
          ref={pathRef}
          d={path}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        children
      )}
    </svg>
  );
}
