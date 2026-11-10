'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion is preferred or already seen in session, exit quickly
    if (prefersReducedMotion || typeof window !== 'undefined' && sessionStorage.getItem('visited')) {
      setLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('visited', 'true');
          }, 350);
          return 100;
        }
        // Editorial non-linear acceleration
        const increment = Math.max(2, Math.floor((100 - prev) / 6));
        return Math.min(100, prev + increment);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.85, ease: [0.65, 0, 0.35, 1] },
          }}
          className="fixed inset-0 z-[10000] bg-canvas flex flex-col justify-between p-8 sm:p-12 select-none"
        >
          {/* Top Metadata */}
          <div className="flex items-center justify-between text-2xs font-mono uppercase tracking-widest text-paper-dim">
            <span>Chinmoy Kalita</span>
            <span>Edition 2025</span>
          </div>

          {/* Center Identity */}
          <div className="space-y-4 max-w-xl">
            <div className="text-2xs font-mono uppercase tracking-[0.25em] text-ochre">
              [ Three Disciplines &bull; One Creative Universe ]
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif text-paper font-normal tracking-tight">
              A Mind in <span className="italic text-paper-muted">Motion.</span>
            </h1>
          </div>

          {/* Bottom Progress Counter */}
          <div className="flex items-end justify-between border-t border-editorial-border pt-6 text-2xs font-mono uppercase tracking-widest text-paper-dim">
            <div className="flex items-center space-x-3">
              <span className="w-2 h-2 rounded-full bg-cobalt animate-ping" />
              <span>Initializing Shaders &amp; Design Architecture</span>
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-paper">
              {progress < 10 ? `0${progress}` : progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
