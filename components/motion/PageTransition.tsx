'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotion } from '@/hooks/useMotion';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const { motionEnabled, prefersReducedMotion } = useMotion();
  const pathname = usePathname();

  // Disabled for reduced motion
  if (!motionEnabled || prefersReducedMotion) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
