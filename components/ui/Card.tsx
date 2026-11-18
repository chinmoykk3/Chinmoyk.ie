import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  withWash?: boolean;
  hoverEffect?: boolean;
  elevated?: boolean;
  children: React.ReactNode;
}

export function Card({
  withWash = false,
  hoverEffect = true,
  elevated = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl border transition-all duration-300 backdrop-blur-sm p-6 sm:p-8',
        elevated
          ? 'bg-theme-surface-elevated border-theme-border-strong shadow-md'
          : 'bg-theme-surface border-theme-border shadow-sm',
        hoverEffect && 'hover:border-theme-border-strong hover:shadow-lg hover:-translate-y-0.5',
        withWash && 'bg-[image:var(--wash)] bg-no-repeat bg-top',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-wrap items-center justify-between gap-3 mb-4', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-xl sm:text-2xl font-serif font-bold text-theme-text', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm text-theme-muted mt-1 leading-relaxed', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mt-4 text-theme-text', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'mt-6 pt-4 border-t border-theme-border flex items-center justify-between',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
