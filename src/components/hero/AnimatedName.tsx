'use client';

import { motion, type Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

interface AnimatedNameProps {
  firstName?: string;
  lastName?: string;
  className?: string;
}

export function AnimatedName({
  firstName = 'CHINMOY',
  lastName = 'KALITA',
  className,
}: AnimatedNameProps) {
  const prefersReducedMotion = useReducedMotion();

  const letterVariants: Variants = {
    hidden: {
      y: '120%',
      opacity: 0,
      rotateZ: 4,
    },
    visible: (custom: number) => ({
      y: '0%',
      opacity: 1,
      rotateZ: 0,
      transition: {
        duration: 0.85,
        delay: 0.15 + custom * 0.035,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const renderWord = (word: string, startIndex: number) => {
    return (
      <span className="inline-flex whitespace-nowrap overflow-hidden py-1">
        {word.split('').map((char, index) => {
          const charIndex = startIndex + index;
          return (
            <span
              key={charIndex}
              className="inline-block overflow-hidden will-change-transform"
            >
              <motion.span
                variants={prefersReducedMotion ? undefined : letterVariants}
                initial={prefersReducedMotion ? false : 'hidden'}
                animate="visible"
                custom={charIndex}
                className="inline-block"
              >
                {char}
              </motion.span>
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div
      className={cn(
        'font-serif font-normal tracking-[-0.035em] text-paper select-none leading-[0.92]',
        className
      )}
      aria-label={`${firstName} ${lastName}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-x-6">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] tracking-tight">
          {renderWord(firstName, 0)}
          <span className="inline-block sm:hidden w-full" />
          <span className="hidden sm:inline-block">&nbsp;</span>
          {renderWord(lastName, firstName.length)}
        </h1>
      </div>
    </div>
  );
}
