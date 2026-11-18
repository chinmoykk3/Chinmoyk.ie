import React from 'react';
import { chapters } from '@/content/chapters';
import { projects } from '@/content/projects';
import { OpeningExperience } from '@/components/story/OpeningExperience';
import { StoryHero } from '@/components/story/StoryHero';
import { ChapterCard } from '@/components/chapters/ChapterCard';
import { Chapter01Curiosity } from '@/components/chapters/Chapter01Curiosity';
import { Chapter02Worlds } from '@/components/chapters/Chapter02Worlds';
import { Chapter03Real } from '@/components/chapters/Chapter03Real';
import { Chapter04Design } from '@/components/chapters/Chapter04Design';
import { Chapter05Intelligence } from '@/components/chapters/Chapter05Intelligence';
import { EpilogueSection } from '@/components/story/EpilogueSection';
import { ChapterRail } from '@/components/story/ChapterRail';
import { Container } from '@/components/ui/Container';
import { Tag } from '@/components/ui/Tag';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export default function StoryModePage() {
  return (
    <div className="w-full relative">
      {/* Cinematic Opening Experience (Pure Black Screen, Focus Pull, Breathing Gold Point) */}
      <OpeningExperience />

      {/* Desktop Chapter Rail (Synced to continuous scroll with arrow-key jumping) */}
      <ChapterRail />

      {/* Narrative Hero */}
      <StoryHero />

      {/* Chapters Container */}
      <Container size="md" className="py-16 space-y-12">
        <div className="flex items-center justify-between border-b border-theme-border pb-4 flex-wrap gap-2">
          <div>
            <h2 className="text-fluid-h2 font-serif font-bold text-theme-text">The Chapters</h2>
            <p className="text-xs sm:text-sm text-theme-muted mt-1">
              8 chronological movements from initial curiosity to future possibilities
            </p>
          </div>
          <Tag variant="gold" size="md">
            {chapters.length} Movements Indexed
          </Tag>
        </div>

        {/* Chapter List Rendering From Content Files */}
        <div className="space-y-16">
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
        </div>

        {/* Projects Bridge Preview */}
        <div className="mt-20">
          <Card withWash elevated className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-theme-border pb-4">
              <div>
                <Tag variant="ember" size="sm">
                  Connected Artifacts
                </Tag>
                <h3 className="text-2xl font-serif font-bold text-theme-text mt-2">
                  Featured Projects in this Story
                </h3>
              </div>
              <Link
                href="/explore"
                className="text-xs font-mono font-semibold text-theme-gold hover:underline"
              >
                View all {projects.length} projects in Explore Hub &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <Link
                  key={proj.id}
                  href={`/projects/${proj.slug}`}
                  className="p-5 rounded-xl bg-theme-surface border border-theme-border hover:border-theme-border-strong transition-all group"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-theme-muted mb-2">
                    <span>{proj.category}</span>
                    <Tag variant="status" size="sm">
                      {proj.status}
                    </Tag>
                  </div>
                  <h4 className="text-base font-serif font-semibold text-theme-text group-hover:text-chapter-accent transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-theme-muted mt-1 line-clamp-2">{proj.tagline}</p>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
