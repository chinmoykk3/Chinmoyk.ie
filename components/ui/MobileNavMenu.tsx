'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Film, Compass, ChevronRight, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { chapters } from '@/content/chapters';
import { CKWordmark } from '@/components/ui/CKWordmark';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ModeSwitch } from '@/components/ui/ModeSwitch';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { usePolish } from '@/components/polish/PolishContext';
import { cn } from '@/lib/utils';

export interface MobileNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavMenu({ isOpen, onClose }: MobileNavMenuProps) {
  const pathname = usePathname();
  const trapRef = useFocusTrap(isOpen, onClose);
  const {
    commentaryEnabled,
    toggleCommentary,
    soundEnabled,
    toggleSound,
    reduceEffects,
    toggleReduceEffects,
  } = usePolish();

  // Prevent background scroll when mobile menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 flex flex-col bg-theme-bg/95 backdrop-blur-xl text-theme-text overflow-x-hidden animate-fade-in"
    >
      <div
        ref={trapRef}
        className="w-full max-w-lg mx-auto flex flex-col h-[100dvh] overflow-y-auto px-6 py-6 pb-12 safe-area-inset"
      >
        {/* Top Header Row */}
        <div className="flex items-center justify-between border-b border-theme-border pb-4">
          <CKWordmark />

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="p-2 rounded-full bg-theme-surface border border-theme-border text-theme-muted hover:text-theme-text hover:bg-theme-surface-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="pt-6 pb-4">
          <div className="text-xs font-mono uppercase tracking-widest text-theme-muted mb-2">
            Experience Mode
          </div>
          <ModeSwitch className="w-full justify-around py-1.5" />
        </div>

        {/* Chapter Journey Matrix */}
        <div className="py-4 space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-theme-muted">
            The Documentary Movements
          </div>

          <div className="space-y-1.5">
            {chapters.map((ch, idx) => {
              const formattedNum =
                typeof ch.number === 'number'
                  ? ch.number === 0
                    ? 'Prologue'
                    : `0${ch.number}`
                  : ch.number;

              return (
                <Link
                  key={ch.id}
                  href={`/#${ch.id}`}
                  onClick={onClose}
                  data-accent={ch.accentKey}
                  className="flex items-center justify-between p-3 rounded-xl bg-theme-surface border border-theme-border hover:border-theme-border-strong hover:bg-theme-surface-elevated transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-chapter-accent shrink-0" />
                    <div>
                      <div className="font-serif font-bold text-sm text-theme-text group-hover:text-chapter-accent transition-colors">
                        {ch.title}
                      </div>
                      <div className="text-[11px] font-mono text-theme-muted">
                        Movement {formattedNum} · {ch.emotionalArc}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-theme-muted group-hover:text-chapter-accent transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Director Polish Controls on Mobile */}
        <div className="py-4 border-t border-theme-border space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-theme-muted mb-2">
            Director Experience
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs font-mono">
            <button
              onClick={toggleCommentary}
              className={cn(
                'p-2.5 rounded-lg border text-center transition-colors flex flex-col items-center gap-1',
                commentaryEnabled
                  ? 'bg-theme-gold/15 border-theme-gold text-theme-gold font-semibold'
                  : 'bg-theme-surface border-theme-border text-theme-muted'
              )}
            >
              <Film className="w-4 h-4" />
              <span>Notes</span>
            </button>

            <button
              onClick={toggleSound}
              className={cn(
                'p-2.5 rounded-lg border text-center transition-colors flex flex-col items-center gap-1',
                soundEnabled
                  ? 'bg-theme-gold/15 border-theme-gold text-theme-gold font-semibold'
                  : 'bg-theme-surface border-theme-border text-theme-muted'
              )}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-theme-gold" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
              <span>Audio</span>
            </button>

            <button
              onClick={toggleReduceEffects}
              className={cn(
                'p-2.5 rounded-lg border text-center transition-colors flex flex-col items-center gap-1',
                reduceEffects
                  ? 'bg-theme-azure/15 border-theme-azure text-theme-azure font-semibold'
                  : 'bg-theme-surface border-theme-border text-theme-muted'
              )}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Simple</span>
            </button>
          </div>
        </div>

        {/* Secondary Links & Footprint */}
        <div className="mt-auto pt-6 border-t border-theme-border space-y-4">
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <Link
              href="/explore"
              onClick={onClose}
              className="p-2.5 rounded-lg bg-theme-surface border border-theme-border hover:bg-theme-surface-elevated text-theme-text"
            >
              Explore Hub
            </Link>
            <Link
              href="/design"
              onClick={onClose}
              className="p-2.5 rounded-lg bg-theme-surface border border-theme-border hover:bg-theme-surface-elevated text-theme-text"
            >
              Design
            </Link>
            <Link
              href="/contact"
              onClick={onClose}
              className="p-2.5 rounded-lg bg-theme-surface border border-theme-border hover:bg-theme-surface-elevated text-theme-text"
            >
              Contact
            </Link>
          </div>

          <p className="text-[10px] font-mono text-theme-muted text-center pt-2">
            A STORY STILL UNFOLDING · CHINMOY KALITA
          </p>
        </div>
      </div>
    </div>
  );
}
