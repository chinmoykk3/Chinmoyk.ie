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
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  // 1. Detect OS prefers-reduced-motion & restore user manual motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const savedMotion = localStorage.getItem('motion_enabled');
    if (savedMotion !== null) {
      setMotionEnabled(savedMotion === 'true');
    } else if (mediaQuery.matches) {
      setMotionEnabled(false);
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

  // 2. Setup Lenis & GSAP ScrollTrigger single RAF loop
  const effectiveMotion = motionEnabled && !prefersReducedMotion;

  useEffect(() => {
    if (!effectiveMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      ScrollTrigger.refresh();
      return;
    }

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

    // Connect Lenis scroll to ScrollTrigger
    lenis.on('scroll', (e: { progress: number; scroll: number }) => {
      ScrollTrigger.update();
      setScrollProgress(e.progress);

      // Drive the --exposure token smoothly from scroll progress (0.0 to 1.0)
      document.documentElement.style.setProperty(
        '--exposure',
        Math.min(1, Math.max(0, e.progress)).toFixed(3)
      );
    });

    // Single synchronized RAF ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [effectiveMotion]);

  // 3. Handle route changes cleanly & refresh ScrollTrigger
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
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

    window.addEventListener('load', () => ScrollTrigger.refresh());
    return () => {
      window.removeEventListener('load', () => ScrollTrigger.refresh());
    };
  }, []);

  return (
    <MotionContext.Provider
      value={{
        prefersReducedMotion,
        motionEnabled: effectiveMotion,
        setMotionEnabled: handleSetMotionEnabled,
        toggleMotion,
        scrollProgress,
        lenis: lenisRef.current,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}
