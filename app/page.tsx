import React from 'react';
import dynamic from 'next/dynamic';
import { chapters } from '@/content/chapters';
import { OpeningExperience } from '@/components/story/OpeningExperience';
import { StoryHero } from '@/components/story/StoryHero';
import { ChapterCard } from '@/components/chapters/ChapterCard';
import { ChapterRail } from '@/components/story/ChapterRail';

function ChapterSkeleton({ title, number }: { title: string; number: string }) {
  return (
    <div className="min-h-[80svh] w-full flex items-center justify-center p-8 animate-pulse text-center">
      <div className="space-y-4 max-w-md mx-auto">
        <span className="text-[11px] font-mono uppercase tracking-widest text-theme-muted font-semibold">
          CHAPTER {number}
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif text-theme-text/70">{title}</h3>
      </div>
    </div>
  );
}

// Code-split heavy GSAP/R3F chapters for ultra-fast initial paint and low LCP
const Chapter01Curiosity = dynamic(
  () => import('@/components/chapters/Chapter01Curiosity').then((m) => m.Chapter01Curiosity),
  { loading: () => <ChapterSkeleton title="It Started With Curiosity" number="01" /> }
);
const Chapter02Worlds = dynamic(
  () => import('@/components/chapters/Chapter02Worlds').then((m) => m.Chapter02Worlds),
  { loading: () => <ChapterSkeleton title="I Found More Than One World" number="02" /> }
);
const Chapter03Real = dynamic(
  () => import('@/components/chapters/Chapter03Real').then((m) => m.Chapter03Real),
  { loading: () => <ChapterSkeleton title="I Wanted To Build Something Real" number="03" /> }
);
const Chapter04Design = dynamic(
  () => import('@/components/chapters/Chapter04Design').then((m) => m.Chapter04Design),
  { loading: () => <ChapterSkeleton title="Another Language Called Design" number="04" /> }
);
const Chapter05Intelligence = dynamic(
  () => import('@/components/chapters/Chapter05Intelligence').then((m) => m.Chapter05Intelligence),
  { loading: () => <ChapterSkeleton title="The World of Intelligence" number="05" /> }
);
const EpilogueSection = dynamic(
  () => import('@/components/story/EpilogueSection').then((m) => m.EpilogueSection),
  { loading: () => <ChapterSkeleton title="The Story Is Still Being Written" number="EPILOGUE" /> }
);

export default function StoryModePage() {
  return (
    <div className="w-full relative">
      {/* Cinematic Opening Experience (Pure Black Screen, Focus Pull, Breathing Gold Point) */}
      <OpeningExperience />

      {/* Desktop Chapter Rail (Synced to continuous scroll with arrow-key jumping) */}
      <ChapterRail />

      {/* Narrative Hero (Prologue) */}
      <StoryHero />

      {/* Full-bleed Chapter Scenes: Scene, Not Card (Rule 1) */}
      <main className="w-full relative">
        {chapters.map((chapter, index) => {
          if (chapter.id === 'chapter-01') {
            return <Chapter01Curiosity key={chapter.id} chapter={chapter} />;
          }
          if (chapter.id === 'chapter-02') {
            return <Chapter02Worlds key={chapter.id} chapter={chapter} />;
          }
          if (chapter.id === 'chapter-03') {
            return <Chapter03Real key={chapter.id} chapter={chapter} />;
          }
          if (chapter.id === 'chapter-04') {
            return <Chapter04Design key={chapter.id} chapter={chapter} />;
          }
          if (chapter.id === 'chapter-05') {
            return <Chapter05Intelligence key={chapter.id} chapter={chapter} />;
          }
          if (chapter.id === 'epilogue') {
            return <EpilogueSection key={chapter.id} chapter={chapter} />;
          }
          return <ChapterCard key={chapter.id} chapter={chapter} index={index} />;
        })}
      </main>
    </div>
  );
}
