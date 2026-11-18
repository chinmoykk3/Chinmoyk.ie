'use client';

import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon, Laptop } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, resolvedTheme, setTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div
        className={cn(
          'w-9 h-9 rounded-full bg-theme-surface border border-theme-border animate-pulse',
          className
        )}
      />
    );
  }

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('system');
    else setTheme('dark');
  };

  const getLabel = () => {
    if (theme === 'system') return 'Theme: System default';
    return `Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`;
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={`${getLabel()}. Click to change.`}
      title={`${getLabel()} (click to cycle)`}
      className={cn(
        'relative inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200',
        'bg-theme-surface hover:bg-theme-surface-elevated text-theme-muted hover:text-theme-text',
        'border border-theme-border shadow-sm',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-chapter-accent focus-visible:ring-offset-2 focus-visible:ring-offset-theme-bg',
        className
      )}
    >
      {theme === 'system' ? (
        <Laptop className="w-4 h-4 transition-transform hover:scale-110" />
      ) : resolvedTheme === 'dark' ? (
        <Moon className="w-4 h-4 text-theme-gold transition-transform hover:rotate-12" />
      ) : (
        <Sun className="w-4 h-4 text-theme-gold transition-transform hover:rotate-45" />
      )}
    </button>
  );
}
