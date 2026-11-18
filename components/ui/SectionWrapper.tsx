import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  chapter?: string | number;
  withWash?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export function SectionWrapper({
  chapter,
  withWash = false,
  padding = 'lg',
  className,
  children,
  ...props
}: SectionWrapperProps) {
  const paddingClasses = {
    none: 'py-0',
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16',
    lg: 'py-16 sm:py-24',
    xl: 'py-24 sm:py-32',
  };

  const chapterAttr = chapter !== undefined ? String(chapter).toLowerCase() : undefined;

  return (
    <section
      data-chapter={chapterAttr}
      className={cn(
        'relative w-full transition-colors duration-300',
        paddingClasses[padding],
        withWash && 'bg-[image:var(--wash)] bg-no-repeat bg-top',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
