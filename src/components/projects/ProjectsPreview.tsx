'use client';

import { motion } from 'framer-motion';
import { FEATURED_PROJECTS } from '@/data/projectData';
import { staggerContainer } from '@/animations';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ProjectCard } from '@/components/projects/ProjectCard';

export function ProjectsPreview() {
  return (
    <section id="projects" className="py-28 border-b border-editorial-border relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <SectionHeading
          chapterNumber="02"
          chapterTitle="Selected Works"
          metadata="2024–2025 Architecture"
          title="Manifestations of theory into"
          italicWord="operational code."
          description="Three landmark systems demonstrating full-stack engineering resilience, computational AI depth, and real-time aesthetic direction."
          accent="ochre"
        />

        {/* Project Cards List */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="space-y-8"
        >
          {FEATURED_PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
