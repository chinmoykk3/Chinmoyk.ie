'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useMotion } from '@/hooks/useMotion';
import { hasAnyCommentary } from '@/content/commentary';

export type CursorVariant = 'default' | 'view' | 'play' | 'drag' | 'open' | 'hidden';

export interface LowerThirdData {
  title: string;
  subtitle: string;
  category?: string;
  id?: string;
}

export interface PolishContextType {
  // 1. Director's commentary toggle
  commentaryEnabled: boolean;
  hasCommentary: boolean;
  toggleCommentary: () => void;
  setCommentaryEnabled: (enabled: boolean) => void;

  // 2. Ambient sound toggle
  soundEnabled: boolean;
  toggleSound: () => void;
  setSoundEnabled: (enabled: boolean) => void;

  // 3. Global "Reduce Effects" toggle
  reduceEffects: boolean;
  toggleReduceEffects: () => void;
  setReduceEffects: (enabled: boolean) => void;

  // 4. Cursor controls
  useDefaultCursor: boolean;
  toggleUseDefaultCursor: () => void;
  cursorVariant: CursorVariant;
  cursorLabel: string;
  setCursorHover: (variant: CursorVariant, label?: string) => void;
  clearCursorHover: () => void;

  // 5. Lower-third notifications
  activeLowerThird: LowerThirdData | null;
  triggerLowerThird: (data: LowerThirdData) => void;
  clearLowerThird: () => void;

  // 6. Active chapter & timecode state
  activeChapterKey: string;
  setActiveChapterKey: (key: string) => void;
}

const PolishContext = createContext<PolishContextType | null>(null);

export function PolishProvider({ children }: { children: React.ReactNode }) {
  const { prefersReducedMotion } = useMotion();

  const [commentaryEnabled, setCommentaryEnabledState] = useState(false);
  const [soundEnabled, setSoundEnabledState] = useState(false);
  const [reduceEffects, setReduceEffectsState] = useState(false);
  const [useDefaultCursor, setUseDefaultCursorState] = useState(false);

  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [activeLowerThird, setActiveLowerThird] = useState<LowerThirdData | null>(null);
  const [activeChapterKey, setActiveChapterKey] = useState<string>('prologue');

  const lowerThirdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasCommentary = hasAnyCommentary();

  // Load persisted user preferences safely in client
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedCommentary = localStorage.getItem('ck_commentary');
      if (savedCommentary !== null) setCommentaryEnabledState(savedCommentary === 'true');

      const savedSound = localStorage.getItem('ck_sound');
      if (savedSound !== null) setSoundEnabledState(savedSound === 'true');

      const savedCursor = localStorage.getItem('ck_default_cursor');
      if (savedCursor !== null) setUseDefaultCursorState(savedCursor === 'true');

      const savedReduce = localStorage.getItem('ck_reduce_effects');
      if (savedReduce !== null) {
        setReduceEffectsState(savedReduce === 'true');
      } else if (prefersReducedMotion) {
        setReduceEffectsState(true);
      }
    } catch {
      // LocalStorage fallback for private browsing
    }
  }, [prefersReducedMotion]);

  const toggleCommentary = useCallback(() => {
    setCommentaryEnabledState((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('ck_commentary', String(next));
      } catch {}
      return next;
    });
  }, []);

  const setCommentaryEnabled = useCallback((enabled: boolean) => {
    setCommentaryEnabledState(enabled);
    try {
      localStorage.setItem('ck_commentary', String(enabled));
    } catch {}
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabledState((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('ck_sound', String(next));
      } catch {}
      return next;
    });
  }, []);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    setSoundEnabledState(enabled);
    try {
      localStorage.setItem('ck_sound', String(enabled));
    } catch {}
  }, []);

  const toggleReduceEffects = useCallback(() => {
    setReduceEffectsState((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('ck_reduce_effects', String(next));
      } catch {}
      return next;
    });
  }, []);

  const setReduceEffects = useCallback((enabled: boolean) => {
    setReduceEffectsState(enabled);
    try {
      localStorage.setItem('ck_reduce_effects', String(enabled));
    } catch {}
  }, []);

  const toggleUseDefaultCursor = useCallback(() => {
    setUseDefaultCursorState((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('ck_default_cursor', String(next));
      } catch {}
      return next;
    });
  }, []);

  const setCursorHover = useCallback((variant: CursorVariant, label?: string) => {
    setCursorVariant(variant);
    setCursorLabel(label || '');
  }, []);

  const clearCursorHover = useCallback(() => {
    setCursorVariant('default');
    setCursorLabel('');
  }, []);

  const triggerLowerThird = useCallback((data: LowerThirdData) => {
    if (lowerThirdTimerRef.current) {
      clearTimeout(lowerThirdTimerRef.current);
    }
    setActiveLowerThird(data);

    // Auto-dismiss after 4.2 seconds
    lowerThirdTimerRef.current = setTimeout(() => {
      setActiveLowerThird(null);
    }, 4200);
  }, []);

  const clearLowerThird = useCallback(() => {
    if (lowerThirdTimerRef.current) {
      clearTimeout(lowerThirdTimerRef.current);
    }
    setActiveLowerThird(null);
  }, []);

  return (
    <PolishContext.Provider
      value={{
        commentaryEnabled,
        hasCommentary,
        toggleCommentary,
        setCommentaryEnabled,
        soundEnabled,
        toggleSound,
        setSoundEnabled,
        reduceEffects,
        toggleReduceEffects,
        setReduceEffects,
        useDefaultCursor,
        toggleUseDefaultCursor,
        cursorVariant,
        cursorLabel,
        setCursorHover,
        clearCursorHover,
        activeLowerThird,
        triggerLowerThird,
        clearLowerThird,
        activeChapterKey,
        setActiveChapterKey,
      }}
    >
      {children}
    </PolishContext.Provider>
  );
}

export function usePolish() {
  const context = useContext(PolishContext);
  if (!context) {
    throw new Error('usePolish must be used within a PolishProvider');
  }
  return context;
}
