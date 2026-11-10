import type { Variants } from 'framer-motion';

/**
 * Editorial fade & slide upwards variant
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: customDelay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/**
 * Staggered container variant for lists, tags, and grid items
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/**
 * Subtle scale-in reveal
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Editorial line expander
 */
export const lineReveal: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
