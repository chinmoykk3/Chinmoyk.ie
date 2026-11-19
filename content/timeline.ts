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
  yearOrPeriod: contentFieldSchema,
  title: contentFieldSchema,
  stage: timelineStageSchema,
  summary: contentFieldSchema,
  details: contentFieldSchema.optional(),
});
export type TimelineMilestone = z.infer<typeof timelineMilestoneSchema>;

const rawTimeline: TimelineMilestone[] = [
  {
    id: 'timeline-early-spark',
    yearOrPeriod: draft('Origins'),
    title: draft('The Inquisitive Spark'),
    stage: 'Curiosity',
    summary: draft('First encounters with computing, disassembly, and questioning internal mechanisms.'),
  },
  {
    id: 'timeline-first-code',
    yearOrPeriod: draft('Foundations'),
    title: draft('Writing the First Code'),
    stage: 'Discovery',
    summary: draft('Stepping into software engineering through foundational programming languages.'),
  },
  {
    id: 'timeline-prototyping',
    yearOrPeriod: draft('Prototypes'),
    title: draft('Rapid Prototyping & Breakdowns'),
    stage: 'Experimentation',
    summary: draft('Building experimental tools, hackathon participations, and learning through failure.'),
  },
  {
    id: 'timeline-fullstack-architecture',
    yearOrPeriod: draft('Architecture'),
    title: draft('Engineering Cohesive Systems'),
    stage: 'Creation',
    summary: draft('Developing full-stack architectures like Librarium 2.0 and structured data systems.'),
  },
  {
    id: 'timeline-visual-craft',
    yearOrPeriod: draft('Craft'),
    title: draft('Harmonizing Motion, 3D & User Interfaces'),
    stage: 'Expression',
    summary: draft('Refining typography, spatial interactions, Three.js canvases, and fluid transitions.'),
  },
  {
    id: 'timeline-frontiers-web3-ai',
    yearOrPeriod: draft('Frontiers'),
    title: draft('Decentralized & Intelligent Systems'),
    stage: 'Exploration',
    summary: draft('Explorations in Sahyog Cryptos, autonomous LLM agents, and decentralized topologies.'),
  },
  {
    id: 'timeline-civic-and-campus-scale',
    yearOrPeriod: draft('Production'),
    title: draft('Deploying for Real Organizations'),
    stage: 'Growth',
    summary: draft('Building GCU Campus Flow and IRDMS Assam for real community impact and resilience.'),
  },
  {
    id: 'timeline-current-horizon',
    yearOrPeriod: draft('Present & Beyond'),
    title: draft('A Story Still Unfolding'),
    stage: 'Possibility',
    summary: draft('Continuing research, open-source work, and looking for transformative collaborations.'),
  },
];

export const timeline: TimelineMilestone[] = z.array(timelineMilestoneSchema).parse(rawTimeline);
