'use client';

import { useRef, useState, type MouseEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { motion, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  magneticStrength?: number;
  icon?: ReactNode;
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  magneticStrength = 0.35,
  icon,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Spring physics for buttery elastic return
  const springConfig = { damping: 15, stiffness: 180, mass: 0.2 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * magneticStrength);
    y.set(middleY * magneticStrength);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const variantStyles = {
    primary:
      'bg-paper text-canvas hover:bg-white border border-transparent shadow-editorial-sm hover:shadow-editorial-md',
    secondary:
      'bg-canvas-card text-paper hover:bg-canvas-subtle border border-editorial-border hover:border-editorial-border-hover',
    outline:
      'bg-transparent text-paper border border-editorial-border hover:border-paper-muted hover:bg-white/[0.03]',
    ghost:
      'bg-transparent text-paper-muted hover:text-paper hover:bg-white/[0.04] border border-transparent',
  };

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs rounded-editorial-sm gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-editorial-md gap-2',
    lg: 'px-7 py-3.5 text-base rounded-editorial-lg gap-3',
  };

  const innerContent = (
    <span className="flex items-center justify-center font-medium tracking-wide">
      <span>{children}</span>
      {icon && <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">{icon}</span>}
    </span>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="inline-block relative select-none will-change-transform"
      data-cursor={isHovered ? 'magnetic' : undefined}
    >
      {href ? (
        <Link
          href={href}
          className={cn(
            'group relative inline-flex items-center justify-center transition-all duration-300 focus-visible:outline-2 focus-visible:outline-cobalt',
            variantStyles[variant],
            sizeStyles[size],
            className
          )}
        >
          {innerContent}
        </Link>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className={cn(
            'group relative inline-flex items-center justify-center transition-all duration-300 focus-visible:outline-2 focus-visible:outline-cobalt cursor-pointer',
            variantStyles[variant],
            sizeStyles[size],
            className
          )}
        >
          {innerContent}
        </button>
      )}
    </motion.div>
  );
}

