'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChapterLabel } from './ChapterLabel';
import { fadeInUp } from '@/animations';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  chapterNumber?: string;
  chapterTitle?: string;
  metadata?: string;
  title: string;
  italicWord?: string;
  description?: string;
  align?: 'left' | 'center';
  accent?: 'ochre' | 'cobalt' | 'default';
  className?: string;
  children?: ReactNode;
}

export function SectionHeading({
  chapterNumber,
  chapterTitle,
  metadata,
  title,
  italicWord,
  description,
  align = 'left',
  accent = 'default',
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'w-full mb-12 sm:mb-16',
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-4xl',
        className
      )}
    >
      {chapterNumber && chapterTitle && (
        <ChapterLabel
          number={chapterNumber}
          label={chapterTitle}
          metadata={metadata}
          accent={accent}
        />
      )}

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="space-y-4"
      >
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-paper tracking-tight leading-[1.08]">
          {title}{' '}
          {italicWord && (
            <span className="italic font-light text-paper-muted">
              {italicWord}
            </span>
          )}
        </h2>

        {description && (
          <p className="text-base sm:text-lg text-paper-muted font-light leading-relaxed max-w-2xl">
            {description}
          </p>
        )}

        {children}
      </motion.div>
    </div>
  );
}
