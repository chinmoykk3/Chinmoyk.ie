'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { useTheme } from '@/hooks/useTheme';
import { ChapterKey, PointerState, SceneSize, ThemeMode } from './types';
import { SceneManager } from './SceneManager';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

export interface BackgroundStageProps {
  className?: string;
  scrimOpacity?: number; // Content scrim opacity (default: 0.12 - 0.22)
  manualChapter?: ChapterKey; // Manual chapter override for background-lab
  manualChapterProgress?: number; // Manual chapter progress for background-lab
  onFpsUpdate?: (fps: number, frameTimeMs: number) => void;
  qualityOverride?: number; // Manual quality level for background-lab
}

export function BackgroundStage({
  className,
  scrimOpacity = 0.18,
  manualChapter,
  manualChapterProgress,
  onFpsUpdate,
  qualityOverride,
}: BackgroundStageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const managerRef = useRef<SceneManager | null>(null);

  const { motionEnabled, prefersReducedMotion, scrollProgress, lenis } = useMotion();
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const pointerRef = useRef<PointerState>({
    x: 0,
    y: 0,
    isTouch: false,
    active: false,
  });

  const scrollVelocityRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);
  const lastScrollTimeRef = useRef<number>(0);

  const isReduced = prefersReducedMotion || !motionEnabled;

  // 1. Mount & Setup pointer interaction
  useEffect(() => {
    setMounted(true);

    const isTouchDevice =
      typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    pointerRef.current.isTouch = isTouchDevice;

    // Desktop pointer movement
    const handleMouseMove = (e: MouseEvent) => {
      if (pointerRef.current.isTouch) return;
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      // Normalize to -1 to 1 (0 at center)
      pointerRef.current.x = (e.clientX / w) * 2 - 1;
      pointerRef.current.y = (e.clientY / h) * 2 - 1;
      pointerRef.current.active = true;
    };

    const handleMouseLeave = () => {
      pointerRef.current.active = false;
      pointerRef.current.x = 0;
      pointerRef.current.y = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // 2. Track scroll velocity from Lenis or fallback delta
  useEffect(() => {
    if (lenis) {
      const handleLenisScroll = (e: { velocity?: number }) => {
        if (typeof e.velocity === 'number') {
          scrollVelocityRef.current = e.velocity;
        }
      };
      lenis.on('scroll', handleLenisScroll);
      return () => {
        lenis.off('scroll', handleLenisScroll);
      };
    } else {
      const handleNativeScroll = () => {
        const now = performance.now();
        const currentY = window.scrollY || window.pageYOffset || 0;
        const dt = (now - lastScrollTimeRef.current) / 1000;

        if (dt > 0.005) {
          scrollVelocityRef.current = (currentY - lastScrollYRef.current) / dt;
          lastScrollYRef.current = currentY;
          lastScrollTimeRef.current = now;
        }
      };

      window.addEventListener('scroll', handleNativeScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleNativeScroll);
      };
    }
  }, [lenis]);

  // 3. Initialize Canvas & SceneManager with single shared RAF
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: false, // Opaque backing store for peak GPU compositing
      desynchronized: true, // Lower latency
    });
    if (!ctx) return;

    const manager = new SceneManager(ctx);
    managerRef.current = manager;

    // Check for Save-Data header or low-power hint
    const navAny = navigator as unknown as { connection?: { saveData?: boolean } };
    if (navAny.connection?.saveData) {
      manager.setQualityLevel(0.0);
    }

    // Handle canvas resize with DPR cap at 1.5
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const size: SceneSize = { width: w, height: h, dpr };
      manager.resize(size);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Handle visibility changes: pause entirely when tab is hidden
    let isTabVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // RAF Loop (with 30fps cap for mobile touch screens)
    let lastRenderTime = 0;
    let frameCount = 0;
    let fpsTimer = performance.now();
    const isMobile = window.innerWidth < 768 || pointerRef.current.isTouch;
    const minFrameInterval = isMobile ? 32 : 14; // ~30fps mobile, ~60fps desktop

    const tickerCallback = (time: number) => {
      if (!isTabVisible) return;

      const now = performance.now();
      const delta = now - lastRenderTime;

      if (delta < minFrameInterval) return;
      lastRenderTime = now;

      // Apply manual quality override if passed
      if (typeof qualityOverride === 'number') {
        manager.setQualityLevel(qualityOverride);
      }

      // Read exposure CSS variable (defaults to 0.0 - 1.0)
      let exposure = 0;
      if (typeof window !== 'undefined') {
        const rootStyle = getComputedStyle(document.documentElement);
        const expStr = rootStyle.getPropertyValue('--exposure').trim();
        exposure = parseFloat(expStr) || scrollProgress;
      }

      manager.render(time * 1000, {
        scrollProgress,
        scrollVelocity: scrollVelocityRef.current,
        pointer: pointerRef.current,
        theme: (resolvedTheme as ThemeMode) || 'dark',
        exposure,
        reducedMotion: isReduced,
        manualChapter,
        manualChapterProgress,
      });

      // Decay scroll velocity smoothly
      scrollVelocityRef.current *= 0.92;

      // FPS tracking for lab / diagnostics
      frameCount++;
      if (now - fpsTimer >= 1000) {
        const calculatedFps = Math.round((frameCount * 1000) / (now - fpsTimer));
        const avgFrameTime = manager.getAverageFrameTime();
        onFpsUpdate?.(calculatedFps, avgFrameTime);
        frameCount = 0;
        fpsTimer = now;
      }
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      gsap.ticker.remove(tickerCallback);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      manager.dispose();
      managerRef.current = null;
    };
  }, [
    resolvedTheme,
    scrollProgress,
    isReduced,
    manualChapter,
    manualChapterProgress,
    qualityOverride,
    onFpsUpdate,
  ]);

  if (!mounted) {
    // SSR / initial static placeholder
    return (
      <div
        aria-hidden="true"
        className={cn('fixed inset-0 z-0 pointer-events-none bg-theme-bg', className)}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn('fixed inset-0 z-0 pointer-events-none overflow-hidden select-none', className)}
    >
      {/* Primary Fixed Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-300"
      />

      {/* Configurable Content Scrim: Guarantees WCAG AA Body Text Contrast (≤ 35% opacity behind content) */}
      <div
        style={{ opacity: scrimOpacity }}
        className="absolute inset-0 pointer-events-none bg-theme-bg transition-opacity duration-300"
      />
    </div>
  );
}
