'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { usePolish } from './PolishContext';
import { cn } from '@/lib/utils';

export function Preloader() {
  const { prefersReducedMotion } = useMotion();
  const { reduceEffects } = usePolish();

  const [shouldRender, setShouldRender] = useState(false);
  const [countdown, setCountdown] = useState<number>(3);
  const [fadingOut, setFadingOut] = useState(false);

  const isReduced = prefersReducedMotion || reduceEffects;
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const dismiss = useCallback(() => {
    timeoutRefs.current.forEach(clearTimeout);
    setFadingOut(true);
    try {
      sessionStorage.setItem('ck_preloaded', 'true');
    } catch {}
    setTimeout(() => {
      setShouldRender(false);
    }, 350);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Session check: only run once per browser session
    try {
      if (sessionStorage.getItem('ck_preloaded') === 'true') {
        return;
      }
    } catch {
      return;
    }

    // If reduced motion, skip film-leader entirely
    if (isReduced) {
      try {
        sessionStorage.setItem('ck_preloaded', 'true');
      } catch {}
      return;
    }

    const startTime = performance.now();
    let assetsLoaded = false;

    // Check critical asset readiness (WebFonts)
    if (document.fonts) {
      document.fonts.ready.then(() => {
        assetsLoaded = true;
      });
    } else {
      assetsLoaded = true;
    }

    // 2. Only show preloader if loading takes LONGER than 600ms
    const delayTimer = setTimeout(() => {
      if (!assetsLoaded || performance.now() - startTime >= 600) {
        setShouldRender(true);

        // Film countdown: 3 -> 2 -> 1 over max 1.2s total
        const t2 = setTimeout(() => setCountdown(2), 350);
        const t1 = setTimeout(() => setCountdown(1), 700);
        const tEnd = setTimeout(() => dismiss(), 1100);

        timeoutRefs.current.push(t2, t1, tEnd);
      } else {
        // Assets loaded quickly under 600ms: no preloader needed!
        try {
          sessionStorage.setItem('ck_preloaded', 'true');
        } catch {}
      }
    }, 600);

    const timeouts = timeoutRefs.current;
    timeouts.push(delayTimer);

    // Keyboard escape / space listener to skip immediately
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        dismiss();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      timeouts.forEach(clearTimeout);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isReduced, dismiss]);

  if (!shouldRender) return null;

  return (
    <div
      role="dialog"
      aria-label="Documentary Film Leader Countdown"
      aria-modal="true"
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center select-none overflow-hidden',
        // Pure neutral black background (rgb(0, 0, 0), zero blue tint)
        'bg-black text-white transition-opacity duration-300',
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      )}
    >
      {/* Film Leader Concentric Reticle */}
      <div
        className="relative flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80"
        aria-hidden="true"
      >
        {/* Outer Circular Target */}
        <div className="absolute inset-0 rounded-full border border-white/15 animate-spin duration-[8000ms] linear" />
        {/* Inner Target */}
        <div className="absolute inset-8 rounded-full border border-theme-gold/30" />
        {/* Film Leader Crosshairs */}
        <span className="absolute w-full h-[1px] bg-white/15" />
        <span className="absolute h-full w-[1px] bg-white/15" />

        {/* Big Golden Countdown Numeral */}
        <span className="font-serif font-black text-7xl sm:text-8xl text-theme-gold tracking-tight animate-scale-in">
          {countdown}
        </span>
      </div>

      {/* Film Slate Label & Skip Button */}
      <div className="absolute bottom-10 flex items-center justify-between w-full max-w-sm px-6 text-xs font-mono text-white/50">
        <span>FILM LEADER · 35MM</span>
        <button
          onClick={dismiss}
          className="hover:text-white transition-colors underline underline-offset-4 focus:outline-none focus:ring-1 focus:ring-theme-gold"
        >
          Skip &rarr;
        </button>
      </div>
    </div>
  );
}
