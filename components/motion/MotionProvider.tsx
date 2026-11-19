'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionContext } from '@/hooks/useMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [reduceEffects, setReduceEffects] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  // 1. Detect OS prefers-reduced-motion & load stored preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const savedMotion = localStorage.getItem('motion_enabled');
    if (savedMotion !== null) {
      setMotionEnabled(savedMotion === 'true');
    } else if (mediaQuery.matches) {
      setMotionEnabled(false);
    }

    const savedReduceEffects = localStorage.getItem('reduce_effects');
    if (savedReduceEffects !== null) {
      setReduceEffects(savedReduceEffects === 'true');
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setMotionEnabled(false);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleSetMotionEnabled = useCallback((enabled: boolean) => {
    setMotionEnabled(enabled);
    localStorage.setItem('motion_enabled', String(enabled));
  }, []);

  const toggleMotion = useCallback(() => {
    handleSetMotionEnabled(!motionEnabled);
  }, [motionEnabled, handleSetMotionEnabled]);

  const handleSetReduceEffects = useCallback((enabled: boolean) => {
    setReduceEffects(enabled);
    localStorage.setItem('reduce_effects', String(enabled));
  }, []);

  const toggleReduceEffects = useCallback(() => {
    handleSetReduceEffects(!reduceEffects);
  }, [reduceEffects, handleSetReduceEffects]);

  // Effective motion flag: true only if OS prefers motion, user enabled motion, and effects are not reduced
  const effectiveMotion = motionEnabled && !prefersReducedMotion && !reduceEffects;

  // 2. Setup Lenis + GSAP ScrollTrigger on single RAF loop, or native scroll fallback
  useEffect(() => {
    let scheduledRaf: number | null = null;
    let lastProgress = -1;

    const updateExposureAndProgress = (p: number) => {
      const clamped = Math.min(1, Math.max(0, p));
      // Drive the --exposure token smoothly from scroll progress (0.0 to 1.0)
      document.documentElement.style.setProperty('--exposure', clamped.toFixed(3));

      if (Math.abs(clamped - lastProgress) >= 0.002 || clamped === 0 || clamped === 1) {
        lastProgress = clamped;
        if (scheduledRaf !== null) cancelAnimationFrame(scheduledRaf);
        scheduledRaf = requestAnimationFrame(() => {
          setScrollProgress(clamped);
        });
      }
    };

    if (!effectiveMotion) {
      // Under reduced motion: no Lenis smoothing, no inertia
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      ScrollTrigger.refresh();

      // Native scroll handler for reduced motion mode
      const handleNativeScroll = () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const current = window.scrollY;
        const p = total > 0 ? current / total : 0;
        updateExposureAndProgress(p);
      };

      window.addEventListener('scroll', handleNativeScroll, { passive: true });
      handleNativeScroll();

      return () => {
        if (scheduledRaf !== null) cancelAnimationFrame(scheduledRaf);
        window.removeEventListener('scroll', handleNativeScroll);
      };
    }

    // Lenis Smooth Scroll Configuration
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll to ScrollTrigger and exposure update
    lenis.on('scroll', (e: { progress: number; scroll: number }) => {
      ScrollTrigger.update();
      updateExposureAndProgress(e.progress);
    });

    // Single synchronized GSAP ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (scheduledRaf !== null) cancelAnimationFrame(scheduledRaf);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [effectiveMotion]);

  // 3. Route change teardown & ScrollTrigger refresh
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  // 4. ScrollTrigger refresh after webfonts and dynamic media finish loading
  useEffect(() => {
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLoad);
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <MotionContext.Provider
      value={{
        prefersReducedMotion,
        motionEnabled: effectiveMotion,
        reduceEffects,
        setMotionEnabled: handleSetMotionEnabled,
        toggleMotion,
        setReduceEffects: handleSetReduceEffects,
        toggleReduceEffects,
        scrollProgress,
        lenis: lenisRef.current,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}
