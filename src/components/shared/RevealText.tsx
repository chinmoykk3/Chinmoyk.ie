'use client';

import { motion } from 'framer-motion';
import { maskReveal, staggerContainer } from '@/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

interface RevealTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  delay?: number;
  italicIndices?: number[];
  accentIndices?: number[];
}

export function RevealText({
  text,
  as: Component = 'h1',
  className,
  delay = 0,
  italicIndices = [],
  accentIndices = [],
}: RevealTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(' ');

  if (prefersReducedMotion) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component className={cn('inline-flex flex-wrap gap-x-[0.28em] gap-y-[0.1em]', className)}>
      <motion.span
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        custom={0.06}
        className="inline-flex flex-wrap gap-x-[0.28em] gap-y-[0.1em]"
      >
        {words.map((word, idx) => {
          const isItalic = italicIndices.includes(idx);
          const isAccent = accentIndices.includes(idx);

          return (
            <span key={idx} className="overflow-hidden inline-block py-[0.08em] -my-[0.08em]">
              <motion.span
                variants={maskReveal}
                custom={delay + idx * 0.04}
                className={cn(
                  'inline-block will-change-transform',
                  isItalic && 'italic font-serif font-light text-paper-muted',
                  isAccent && 'bg-gradient-to-r from-cobalt to-ochre bg-clip-text text-transparent'
                )}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Component>
  );
}
