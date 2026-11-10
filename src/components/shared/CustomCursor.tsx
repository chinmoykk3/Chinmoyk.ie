'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'magnetic' | 'view'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth lagging follower
  const springConfig = { damping: 28, stiffness: 350, mass: 0.4 };
  const followerX = useSpring(mouseX, springConfig);
  const followerY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch / coarse pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Inspect target to determine cursor state
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (cursorAttr === 'view') {
        setCursorType('view');
      } else if (cursorAttr === 'magnetic') {
        setCursorType('magnetic');
      } else if (target.closest('button, a, input, textarea, select')) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || prefersReducedMotion || !isVisible) {
    return null;
  }

  const cursorVariants = {
    default: {
      width: 8,
      height: 8,
      backgroundColor: '#f7f7f4',
      scale: 1,
    },
    pointer: {
      width: 44,
      height: 44,
      backgroundColor: 'rgba(247, 247, 244, 0.15)',
      borderColor: 'rgba(247, 247, 244, 0.4)',
      scale: 1.1,
    },
    magnetic: {
      width: 52,
      height: 52,
      backgroundColor: 'rgba(47, 104, 238, 0.2)',
      borderColor: 'rgba(47, 104, 238, 0.6)',
      scale: 1.2,
    },
    view: {
      width: 72,
      height: 72,
      backgroundColor: '#e67e3a',
      scale: 1,
    },
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Outer Follower */}
      <motion.div
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        variants={cursorVariants}
        animate={cursorType}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="rounded-full flex items-center justify-center border border-transparent backdrop-blur-[1px]"
      >
        {cursorType === 'view' && (
          <span className="text-[10px] font-mono uppercase tracking-widest text-canvas font-bold">
            Inspect
          </span>
        )}
      </motion.div>

      {/* Tiny Center Dot (when not in view/magnetic state) */}
      {cursorType === 'default' && (
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="w-1.5 h-1.5 rounded-full bg-paper fixed pointer-events-none"
        />
      )}
    </div>
  );
}
