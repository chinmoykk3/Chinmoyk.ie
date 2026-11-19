'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePolish, CursorVariant } from './PolishContext';
import { cn } from '@/lib/utils';

export function ViewfinderCursor() {
  const { useDefaultCursor, reduceEffects } = usePolish();
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [label, setLabel] = useState<string>('');
  const [isFinePointer, setIsFinePointer] = useState<boolean>(false);

  // Position state updated via transform in RAF
  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect fine pointer capability (Desktop mice / trackpads only)
    const mediaQuery = window.matchMedia('(pointer: fine) and (hover: hover)');
    setIsFinePointer(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (!isFinePointer || useDefaultCursor || reduceEffects) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!visible) setVisible(true);
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    // Inspect hovered target to adapt cursor shape
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Inputs, textareas, or content-editable: return native cursor
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable ||
        target.closest('p a') ||
        target.classList.contains('native-cursor')
      ) {
        setVariant('hidden');
        setLabel('');
        return;
      }

      // Check explicit data-cursor attributes on interactive media/cards
      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor') as CursorVariant;
        const customLabel = cursorTarget.getAttribute('data-cursor-label') || type.toUpperCase();
        setVariant(type || 'view');
        setLabel(customLabel);
        return;
      }

      // Explicit image gallery or interactive project previews
      if (target.tagName === 'IMG' && target.closest('a, button, [role="button"]')) {
        setVariant('view');
        setLabel('VIEW');
        return;
      }

      // Default buttons or links
      if (target.closest('button') || target.closest('a')) {
        setVariant('open');
        setLabel('');
        return;
      }

      setVariant('default');
      setLabel('');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    // Single RAF loop for smooth interpolated trailing without layout recalculations
    const tick = () => {
      const el = cursorRef.current;
      if (el) {
        // Linear interpolation for gentle organic follow
        currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.35;
        currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.35;

        el.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseover', onMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isFinePointer, useDefaultCursor, reduceEffects, visible]);

  if (!isFinePointer || useDefaultCursor || reduceEffects || !visible || variant === 'hidden') {
    return null;
  }

  const isViewfinder = variant === 'view' || variant === 'play' || variant === 'drag';

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-50 select-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
      style={{ willChange: 'transform' }}
    >
      {isViewfinder ? (
        // Camera Viewfinder Corner Brackets + Label
        <div className="relative flex items-center justify-center w-14 h-14 -translate-x-1/2 -translate-y-1/2">
          {/* Top-Left Corner */}
          <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-theme-gold" />
          {/* Top-Right Corner */}
          <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-theme-gold" />
          {/* Bottom-Left Corner */}
          <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-theme-gold" />
          {/* Bottom-Right Corner */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-theme-gold" />

          {/* Viewfinder Center Crosshair Reticle */}
          <span className="w-1 h-1 rounded-full bg-theme-gold/60" />

          {label && (
            <span className="absolute -bottom-5 text-[9px] font-mono uppercase tracking-widest text-theme-gold font-bold px-1.5 py-0.5 rounded bg-theme-surface/90 border border-theme-border shadow-sm">
              {label}
            </span>
          )}
        </div>
      ) : variant === 'open' ? (
        // Button hover subtle interactive focus ring
        <div className="w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-theme-gold/80 bg-theme-gold/10 backdrop-blur-xs transition-all duration-150" />
      ) : (
        // Default subtle cinema reticle ring
        <div className="w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-theme-text/40 bg-theme-text/5 flex items-center justify-center">
          <span className="w-1 h-1 rounded-full bg-theme-text/60" />
        </div>
      )}
    </div>
  );
}
