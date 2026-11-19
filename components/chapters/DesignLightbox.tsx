'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { DesignWorkItem } from '@/content/designWork';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { Tag } from '@/components/ui/Tag';
import { Content } from '@/components/content/Content';
import { getContentText } from '@/content/schema';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sliders,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DesignLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: DesignWorkItem[];
  initialIndex: number;
}

export function DesignLightbox({ isOpen, onClose, items, initialIndex }: DesignLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [activeStage, setActiveStage] = useState<'sketch' | 'draft' | 'final'>('final');
  const [sliderVal, setSliderVal] = useState(100);
  const touchStartX = useRef<number | null>(null);

  const trapRef = useFocusTrap(isOpen, onClose);

  // Notify background scene to calm while lightbox is open
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(
      new CustomEvent('story:lightbox', {
        detail: { open: isOpen },
      })
    );
    return () => {
      window.dispatchEvent(
        new CustomEvent('story:lightbox', {
          detail: { open: false },
        })
      );
    };
  }, [isOpen]);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setActiveStage('final');
    setSliderVal(100);
  }, [initialIndex, isOpen]);

  const currentItem = items[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
    setActiveStage('final');
    setSliderVal(100);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
    setActiveStage('final');
    setSliderVal(100);
  }, [items.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNext(); // swiped left -> next
    } else if (diff < -50) {
      handlePrev(); // swiped right -> prev
    }
    touchStartX.current = null;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setSliderVal(val);
    if (val < 34) {
      setActiveStage('sketch');
    } else if (val < 68) {
      setActiveStage('draft');
    } else {
      setActiveStage('final');
    }
  };

  const setStageDirect = (stage: 'sketch' | 'draft' | 'final') => {
    setActiveStage(stage);
    if (stage === 'sketch') setSliderVal(15);
    else if (stage === 'draft') setSliderVal(50);
    else setSliderVal(100);
  };

  if (!isOpen || !currentItem) return null;

  // Determine current active image source based on process stage
  let activeImageSrc = currentItem.image;
  if (currentItem.processStages) {
    if (activeStage === 'sketch') activeImageSrc = currentItem.processStages.sketch;
    else if (activeStage === 'draft') activeImageSrc = currentItem.processStages.draft;
    else activeImageSrc = currentItem.processStages.final;
  }

  const altString = getContentText(currentItem.alt) || 'Design piece';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Design Specimen Lightbox: ${getContentText(currentItem.title) || ''}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6 select-none animate-fade-in"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={trapRef}
        className="w-full max-w-5xl max-h-[92vh] flex flex-col bg-theme-surface rounded-2xl border border-theme-border shadow-2xl overflow-hidden text-theme-text"
      >
        {/* Top Header Row */}
        <header className="p-4 sm:p-5 border-b border-theme-border flex items-center justify-between flex-wrap gap-3 bg-theme-surface-elevated/80">
          <div className="flex items-center gap-3">
            <Tag variant="rose" size="sm">
              {currentItem.category.toUpperCase()}
            </Tag>
            {currentItem.year && (
              <span className="text-xs font-mono text-theme-muted">{currentItem.year}</span>
            )}
            <span className="text-theme-border-strong select-none">·</span>
            <span className="text-xs font-mono text-theme-muted">
              {currentIndex + 1} of {items.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Previous / Next buttons */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous design piece"
              className="p-1.5 rounded-lg bg-theme-surface border border-theme-border hover:bg-theme-surface-elevated text-theme-muted hover:text-theme-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-rose"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next design piece"
              className="p-1.5 rounded-lg bg-theme-surface border border-theme-border hover:bg-theme-surface-elevated text-theme-muted hover:text-theme-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-rose"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close design lightbox (ESC)"
              className="p-1.5 rounded-lg bg-theme-surface border border-theme-border hover:bg-theme-surface-elevated text-theme-muted hover:text-theme-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-rose"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main Lightbox Body */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6 items-center">
          {/* Left Column (7 cols): Visual with next/image */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[320px] sm:min-h-[420px] bg-theme-surface-elevated/40 rounded-xl border border-theme-border p-4 overflow-hidden">
            <div className="relative w-full h-[340px] sm:h-[440px]">
              <Image
                src={activeImageSrc}
                alt={altString}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 700px"
                className="object-contain transition-all duration-300"
                placeholder="blur"
                blurDataURL={currentItem.blurDataUrl}
                priority
              />
            </div>

            {/* Stage Indicator Overlay */}
            {currentItem.processStages && (
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-theme-surface/85 backdrop-blur-md border border-theme-border text-[10px] font-mono text-theme-text uppercase">
                Stage: {activeStage.toUpperCase()}
              </div>
            )}
          </div>

          {/* Right Column (5 cols): Metadata, Required Alt Text, Process Slider & Notes */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-normal text-theme-text tracking-tight">
                <Content value={currentItem.title} />
              </h2>
              <p className="text-xs text-theme-muted font-sans mt-2 leading-relaxed">
                <Content value={currentItem.description} />
              </p>
            </div>

            {/* Mandatory Required Alt Text Communication */}
            <div className="p-3.5 rounded-xl bg-theme-surface-elevated border border-theme-border text-xs space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-theme-rose block font-semibold">
                Accessibility Description (Alt Text)
              </span>
              <p className="text-theme-text font-serif italic text-xs leading-relaxed">
                &ldquo;<Content value={currentItem.alt} />&rdquo;
              </p>
            </div>

            {/* Optional Process View: Before/After Slider + Stage Buttons */}
            {currentItem.processStages && (
              <div className="space-y-3 p-4 rounded-xl bg-theme-surface-elevated border border-theme-border">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-theme-text flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-theme-rose" />
                    <span>Process Evolution</span>
                  </span>
                  <span className="text-[10px] text-theme-rose uppercase font-semibold">
                    {activeStage}
                  </span>
                </div>

                {/* Accessible Before/After Range Slider */}
                <div className="space-y-1 pt-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderVal}
                    onChange={handleSliderChange}
                    aria-label="Process comparison slider: sketch to final"
                    className="w-full accent-theme-rose cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-theme-muted uppercase pt-0.5">
                    <span>Sketch</span>
                    <span>Draft</span>
                    <span>Final</span>
                  </div>
                </div>

                {/* Stage Direct Buttons */}
                <div className="grid grid-cols-3 gap-1 p-1 bg-theme-surface rounded-lg border border-theme-border text-xs font-mono">
                  {(['sketch', 'draft', 'final'] as const).map((stage) => (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => setStageDirect(stage)}
                      className={cn(
                        'py-1 rounded text-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-rose capitalize font-medium text-[11px]',
                        activeStage === stage
                          ? 'bg-theme-rose text-white shadow-sm font-semibold'
                          : 'text-theme-muted hover:text-theme-text hover:bg-theme-surface-elevated'
                      )}
                    >
                      {stage}
                    </button>
                  ))}
                </div>

                {currentItem.processNotes && (
                  <p className="text-[11px] text-theme-muted leading-relaxed font-sans pt-1 border-t border-theme-border/60">
                    {currentItem.processNotes}
                  </p>
                )}
              </div>
            )}

            {/* Tools & Deliverables */}
            <div className="space-y-2 text-xs">
              <div className="text-[10px] font-mono uppercase tracking-widest text-theme-muted">
                Craft Tools &amp; Deliverables
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentItem.tools.map((tool, idx) => (
                  <Tag key={idx} variant="default" size="sm">
                    <Content value={tool} />
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lightbox Footer */}
        <footer className="p-3 sm:p-4 border-t border-theme-border bg-theme-surface-elevated/50 flex items-center justify-between text-xs font-mono text-theme-muted">
          <span className="hidden sm:inline">
            Use &larr; &rarr; arrows to browse · ESC to close
          </span>
          <span className="sm:hidden">Swipe left/right to browse</span>

          <span className="text-[11px] text-theme-rose font-medium">
            Chapter 04 · Another Language Called Design
          </span>
        </footer>
      </div>
    </div>
  );
}
