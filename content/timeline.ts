import { z } from 'zod';
import { contentFieldSchema, ContentField, draft, placeholder } from './schema';

export const timelineStageSchema = z.enum([
  'Curiosity',
  'Discovery',
  'Experimentation',
  'Creation',
  'Expression',
  'Exploration',
  'Growth',
  'Possibility',
]);
export type TimelineStage = z.infer<typeof timelineStageSchema>;

export const timelineMilestoneSchema = z.object({
  id: z.string(),
  frameNumber: z.number().optional(),
  yearOrPeriod: contentFieldSchema.optional(),
  title: contentFieldSchema,
  stage: timelineStageSchema,
  summary: contentFieldSchema,
  whatItChanged: contentFieldSchema.optional(),
  image: z.string().optional(),
  blurDataUrl: z.string().optional(),
});
export type TimelineMilestone = z.infer<typeof timelineMilestoneSchema>;

const placeholderBlur =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMGQwZDBkIiAvPjwvc3ZnPg==';

const rawTimeline: TimelineMilestone[] = [
  {
    id: 'timeline-early-spark',
    frameNumber: 1,
    yearOrPeriod: draft('Origins'),
    title: draft('The Inquisitive Spark'),
    stage: 'Curiosity',
    summary: draft(
      'Early days of taking apart physical hardware, testing how software communicates with metal, and discovering that technology is human intention made tangible.'
    ),
    whatItChanged: draft(
      'Instilled a lifelong refusal to treat computers as black boxes; understanding must go all the way to the foundation.'
    ),
    blurDataUrl: placeholderBlur,
  },
  {
    id: 'timeline-first-code',
    frameNumber: 2,
    yearOrPeriod: draft('Foundations'),
    title: draft('Writing the First Code'),
    stage: 'Discovery',
    summary: draft(
      'Moving from passive curiosity into writing the first loops, functions, and logic branches that executed predictably on screen.'
    ),
    whatItChanged: draft(
      'Transformed understanding into authorship — realizing that logic could create entirely new capabilities out of nothing.'
    ),
    blurDataUrl: placeholderBlur,
  },
  {
    id: 'timeline-prototyping',
    frameNumber: 3,
    yearOrPeriod: draft('Breakthroughs'),
    title: draft('Rapid Prototyping & Failures'),
    stage: 'Experimentation',
    summary: draft(
      'Intensive hackathons, late-night experiments, broken builds, and learning how to recover gracefully when assumptions fail.'
    ),
    whatItChanged: draft(
      'Taught resilience under pressure and replaced the fear of broken builds with systematic debugging curiosity.'
    ),
    blurDataUrl: placeholderBlur,
  },
  {
    id: 'timeline-fullstack-architecture',
    frameNumber: 4,
    yearOrPeriod: draft('Architecture'),
    title: draft('Engineering Cohesive Systems'),
    stage: 'Creation',
    summary: draft(
      'Designing and delivering full-stack institutional software like Librarium 2.0 with relational databases, authenticated state, and real users.'
    ),
    whatItChanged: draft(
      'Elevated my perspective from clever scripts to durable, maintainable system architecture that others depend on.'
    ),
    blurDataUrl: placeholderBlur,
  },
  {
    id: 'timeline-visual-craft',
    frameNumber: 5,
    yearOrPeriod: draft('Convergence'),
    title: draft('Harmonizing Motion, 3D & Form'),
    stage: 'Expression',
    summary: draft(
      'Realizing that engineering without aesthetics loses half its communication power; immersing myself in Swiss typography, R3F canvases, and micro-interactions.'
    ),
    whatItChanged: draft(
      'Proved that visual craft and rigorous systems engineering are not opposites — they are the same discipline expressed in different mediums.'
    ),
    blurDataUrl: placeholderBlur,
  },
  {
    id: 'timeline-frontiers-web3-ai',
    frameNumber: 6,
    yearOrPeriod: draft('Frontiers'),
    title: draft('Intelligent & Decentralized Systems'),
    stage: 'Exploration',
    summary: draft(
      'Venturing into decentralized transaction frameworks (Sahyog Cryptos) and autonomous multi-agent planning loops with local model inference.'
    ),
    whatItChanged: draft(
      'Shifted my thinking from deterministic CRUD interfaces toward probabilistic reasoning and decentralized consensus models.'
    ),
    blurDataUrl: placeholderBlur,
  },
  {
    id: 'timeline-civic-and-campus-scale',
    frameNumber: 7,
    yearOrPeriod: draft('Production Scale'),
    title: draft('Building for Real Communities'),
    stage: 'Growth',
    summary: draft(
      'Shipping GCU Campus Flow for university operations and architecting IRDMS Assam for low-bandwidth regional disaster resilience.'
    ),
    whatItChanged: draft(
      'Crystallized the true standard of engineering: software is only as good as its reliability when people are relying on it during crisis.'
    ),
    blurDataUrl: placeholderBlur,
  },
  {
    id: 'timeline-current-horizon',
    frameNumber: 8,
    yearOrPeriod: draft('Present Horizon'),
    title: draft('A Story Still Unfolding'),
    stage: 'Possibility',
    summary: draft(
      'Actively exploring neuro-symbolic agent verification, spatial user interfaces, and looking for challenging frontiers to build next.'
    ),
    whatItChanged: draft(
      'A permanent conviction that every milestone reached is merely the prologue to the next creative expedition.'
    ),
    blurDataUrl: placeholderBlur,
  },
];

export const timeline: TimelineMilestone[] = z.array(timelineMilestoneSchema).parse(rawTimeline);
