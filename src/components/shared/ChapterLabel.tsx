'use client';

import { motion } from 'framer-motion';
import { hairlineReveal } from '@/animations';
import { cn } from '@/lib/utils';

interface ChapterLabelProps {
  number: string;
  label: string;
  metadata?: string;
  accent?: 'ochre' | 'cobalt' | 'default';
  className?: string;
}

export function ChapterLabel({
  number,
  label,
  metadata,
  accent = 'default',
  className,
}: ChapterLabelProps) {
  const accentClasses = {
    default: 'text-paper-muted',
    ochre: 'text-ochre',
    cobalt: 'text-cobalt',
  };

  const dotClasses = {
    default: 'bg-paper-muted',
    ochre: 'bg-ochre',
    cobalt: 'bg-cobalt',
  };

  return (
    <div className={cn('w-full flex flex-col space-y-2 mb-6', className)}>
      <div className="flex items-center justify-between text-2xs font-mono tracking-widest uppercase">
        <div className="flex items-center space-x-2">
          <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', dotClasses[accent])} />
          <span className="text-paper-dim">[{number}]</span>
          <span className={cn('font-medium', accentClasses[accent])}>{label}</span>
        </div>
        {metadata && (
          <span className="text-paper-dim hidden sm:inline-block font-mono tracking-widest">
            {metadata}
          </span>
        )}
      </div>
      <motion.div
        variants={hairlineReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full h-px bg-editorial-border origin-left"
      />
    </div>
  );
}

