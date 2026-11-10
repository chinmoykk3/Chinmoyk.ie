import type { Variants, Transition } from 'framer-motion';

/**
 * Editorial Spring Physics
 * Crisp, non-bouncy physical transitions used across magnetic controls and interactive surfaces.
 */
export const editorialSpring: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 24,
  mass: 0.6,
};

/**
 * Smooth Cubic Bezier Curves
 * Emulates high-end editorial physical reveals.
 */
export const editorialEase = [0.16, 1, 0.3, 1] as const;
export const editorialEaseSlow = [0.65, 0, 0.35, 1] as const;

/**
 * Reveal Text Mask (Kinetic word / line reveal)
 */
export const maskReveal: Variants = {
  hidden: {
    y: '110%',
    opacity: 0,
    rotateZ: 1.5,
  },
  visible: (customDelay = 0) => ({
    y: '0%',
    opacity: 1,
    rotateZ: 0,
    transition: {
      duration: 0.85,
      delay: customDelay,
      ease: editorialEase,
    },
  }),
};

/**
 * Editorial Staggered Children Container
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: (staggerSpeed = 0.1) => ({
    opacity: 1,
    transition: {
      staggerChildren: staggerSpeed,
      delayChildren: 0.05,
    },
  }),
};

/**
 * Fade In Up Variant
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: customDelay,
      ease: editorialEase,
    },
  }),
};

/**
 * Hairline Divider Expansion
 */
export const hairlineReveal: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: (customDelay = 0) => ({
    scaleX: 1,
    transition: {
      duration: 1.1,
      delay: customDelay,
      ease: editorialEaseSlow,
    },
  }),
};

/**
 * Editorial Card Elevation & Focus
 */
export const cardHover: Variants = {
  initial: { y: 0, borderColor: 'rgba(247, 247, 244, 0.08)' },
  hover: {
    y: -4,
    borderColor: 'rgba(247, 247, 244, 0.22)',
    transition: editorialSpring,
  },
};
