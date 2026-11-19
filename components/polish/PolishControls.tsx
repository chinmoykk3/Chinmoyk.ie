'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePolish } from './PolishContext';
import { CommentaryToggle } from './DirectorsCommentary';
import { SoundToggle } from './SoundToggle';
import { Sliders, MousePointer, ShieldCheck, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PolishControls({ className }: { className?: string }) {
  const { reduceEffects, toggleReduceEffects, useDefaultCursor, toggleUseDefaultCursor } =
    usePolish();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  return (
    <div ref={menuRef} className={cn('relative flex items-center gap-1.5 sm:gap-2', className)}>
      {/* 1. Director's Commentary Button */}
      <CommentaryToggle />

      {/* 2. Optional Ambient Sound Button */}
      <SoundToggle />

      {/* 3. Settings / Reduce Effects Dropdown Button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Director preferences: Reduce effects & cursor options"
          title="Directing Preferences"
          className={cn(
            'p-1.5 rounded-full border text-xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent',
            reduceEffects || menuOpen
              ? 'bg-theme-surface-elevated border-chapter-accent text-theme-text shadow-xs'
              : 'bg-theme-surface border-theme-border text-theme-muted hover:text-theme-text hover:bg-theme-surface-elevated'
          )}
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>

        {menuOpen && (
          <div
            role="menu"
            aria-label="Directing options"
            className="absolute right-0 top-full mt-2 w-56 p-2 rounded-2xl bg-theme-surface/95 backdrop-blur-md border border-theme-border shadow-2xl z-50 text-xs font-mono space-y-1 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-theme-muted border-b border-theme-border">
              Director Settings
            </div>

            {/* Reduce Effects Switch */}
            <button
              role="menuitemcheckbox"
              aria-checked={reduceEffects}
              onClick={toggleReduceEffects}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-theme-surface-elevated text-left transition-colors text-theme-text"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-theme-gold" />
                <span>Reduce Effects</span>
              </div>
              {reduceEffects && <Check className="w-3.5 h-3.5 text-theme-gold" />}
            </button>

            {/* Use Default Cursor */}
            <button
              role="menuitemcheckbox"
              aria-checked={useDefaultCursor}
              onClick={toggleUseDefaultCursor}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-theme-surface-elevated text-left transition-colors text-theme-text"
            >
              <div className="flex items-center gap-2">
                <MousePointer className="w-3.5 h-3.5 text-theme-azure" />
                <span>Default Cursor</span>
              </div>
              {useDefaultCursor && <Check className="w-3.5 h-3.5 text-theme-azure" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
