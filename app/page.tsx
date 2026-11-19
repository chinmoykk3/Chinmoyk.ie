import React from 'react';
import { chapters } from '@/content/chapters';
import { CinematicOpening } from '@/components/story/CinematicOpening';
import { Chapter01Curiosity } from '@/components/chapters/Chapter01Curiosity';
import { Chapter02Worlds } from '@/components/chapters/Chapter02Worlds';
import { Chapter03Real } from '@/components/chapters/Chapter03Real';
import { Chapter04Design } from '@/components/chapters/Chapter04Design';
import { Chapter05Intelligence } from '@/components/chapters/Chapter05Intelligence';
import { Chapter06Scale } from '@/components/chapters/Chapter06Scale';
import { Chapter07Possibility } from '@/components/chapters/Chapter07Possibility';
import { EpilogueSection } from '@/components/story/EpilogueSection';

export default function StoryModePage() {
  const visibleChapters = chapters.visible ? chapters.visible() : chapters;

  return (
    <div className="w-full relative">
      {/* Cinematic Opening (Full-viewport pinned scene on pure black #000000, Prologue) */}
      <CinematicOpening />

      {/* Full-bleed Chapter Scenes: Scene, Not Card (Rule 1) */}
      <main className="w-full relative">
        {visibleChapters.map((chapter) => {
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
          if (chapter.id === 'chapter-06') {
            return <Chapter06Scale key={chapter.id} chapter={chapter} />;
          }
          if (chapter.id === 'chapter-07') {
            return <Chapter07Possibility key={chapter.id} chapter={chapter} />;
          }
          if (chapter.id === 'epilogue') {
            return <EpilogueSection key={chapter.id} chapter={chapter} />;
          }
          return null;
        })}
      </main>
    </div>
  );
}
