'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotion } from '@/hooks/useMotion';
import { usePolish } from '@/components/polish/PolishContext';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const { reduceEffects } = usePolish();
  const pathname = usePathname();

  const isReduced = !motionEnabled || prefersReducedMotion || reduceEffects;

  // Disabled under reduced motion or Reduce Effects
  if (isReduced) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{
          opacity: 0,
          clipPath: 'circle(12% at 50% 45%)',
        }}
        animate={{
          opacity: 1,
          clipPath: 'circle(150% at 50% 50%)',
          transition: {
            duration: 0.42,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        exit={{
          opacity: 0,
          clipPath: 'circle(12% at 50% 50%)',
          transition: {
            duration: 0.26,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
