import React from 'react';
import { chapters } from '@/content/chapters';
import { OpeningExperience } from '@/components/story/OpeningExperience';
import { StoryHero } from '@/components/story/StoryHero';
import { ChapterCard } from '@/components/chapters/ChapterCard';
import { ChapterRail } from '@/components/story/ChapterRail';
import { Chapter01Curiosity } from '@/components/chapters/Chapter01Curiosity';
import { Chapter02Worlds } from '@/components/chapters/Chapter02Worlds';
import { Chapter03Real } from '@/components/chapters/Chapter03Real';
import { Chapter04Design } from '@/components/chapters/Chapter04Design';
import { Chapter05Intelligence } from '@/components/chapters/Chapter05Intelligence';
import { EpilogueSection } from '@/components/story/EpilogueSection';

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
