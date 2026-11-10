export type DisciplineType = 'engineering' | 'ai' | 'design';

export interface Discipline {
  id: DisciplineType;
  title: string;
  tagline: string;
  description: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  disciplines: DisciplineType[];
  description: string;
  highlights: string[];
  technologies: string[];
  externalUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface EditorialChapter {
  id: string;
  chapterNumber: string;
  title: string;
  subtitle: string;
  leadParagraph: string;
}

export interface SiteMetadata {
  title: string;
  description: string;
  siteUrl: string;
  author: string;
  twitterHandle: string;
}

