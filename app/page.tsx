import React from 'react';
import { chapters } from '@/content/chapters';
import { getContentText } from '@/content/schema';
import { CinematicOpening } from '@/components/story/CinematicOpening';
import { ChapterErrorBoundary } from '@/components/story/ChapterErrorBoundary';
import { Chapter01 } from '@/components/chapters/chapter01/Chapter01';
import { Chapter02 } from '@/components/chapters/chapter02/Chapter02';
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
          const titleStr = getContentText(chapter.title) || chapter.id;

          let content = null;
          if (chapter.id === 'chapter-01') {
            content = <Chapter01 chapter={chapter} />;
          } else if (chapter.id === 'chapter-02') {
            content = <Chapter02 chapter={chapter} />;
          } else if (chapter.id === 'chapter-03') {
            content = <Chapter03Real chapter={chapter} />;
          } else if (chapter.id === 'chapter-04') {
            content = <Chapter04Design chapter={chapter} />;
          } else if (chapter.id === 'chapter-05') {
            content = <Chapter05Intelligence chapter={chapter} />;
          } else if (chapter.id === 'chapter-06') {
            content = <Chapter06Scale chapter={chapter} />;
          } else if (chapter.id === 'chapter-07') {
            content = <Chapter07Possibility chapter={chapter} />;
          } else if (chapter.id === 'epilogue') {
            content = <EpilogueSection chapter={chapter} />;
          }

          if (!content) return null;

          return (
            <ChapterErrorBoundary
              key={chapter.id}
              chapterId={chapter.id}
              chapterTitle={titleStr}
            >
              {content}
            </ChapterErrorBoundary>
          );
        })}
      </main>
    </div>
  );
}
