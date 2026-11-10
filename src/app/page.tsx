import { HeroSection } from '@/components/hero/HeroSection';
import { DisciplinesSection } from '@/components/chapters/DisciplinesSection';
import { ProjectsPreview } from '@/components/projects/ProjectsPreview';
import { AboutSection } from '@/components/chapters/AboutSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DisciplinesSection />
      <ProjectsPreview />
      <AboutSection />
    </>
  );
}
