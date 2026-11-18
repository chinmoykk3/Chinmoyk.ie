import React from 'react';
import { cn } from '@/lib/utils';

export interface OutlinedNumeralProps extends React.HTMLAttributes<HTMLDivElement> {
  num: number | string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  label?: string;
}

export function OutlinedNumeral({
  num,
  size = 'md',
  label,
  className,
  ...props
}: OutlinedNumeralProps) {
  const formatted =
    typeof num === 'number' ? String(num).padStart(2, '0') : String(num).slice(0, 2).toUpperCase();

  const sizeClasses = {
    sm: 'text-4xl sm:text-5xl font-mono font-black',
    md: 'text-6xl sm:text-7xl lg:text-8xl font-mono font-black',
    lg: 'text-8xl sm:text-9xl lg:text-[10rem] font-mono font-black',
    hero: 'text-[7rem] sm:text-[11rem] lg:text-[14rem] font-mono font-black',
  };

  return (
    <div
      aria-hidden={!label}
      aria-label={label}
      className={cn(
        'select-none leading-none tracking-tighter transition-all duration-300 text-transparent',
        sizeClasses[size],
        className
      )}
      style={{
        WebkitTextStroke: '1.5px var(--accent)',
      }}
      {...props}
    >
      <span className="opacity-75 hover:opacity-100 transition-opacity">{formatted}</span>
    </div>
  );
}
