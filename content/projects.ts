import { z } from 'zod';
import { contentFieldSchema, ContentField, draft, placeholder } from './schema';

export const projectStatusSchema = z.enum([
  'unknown',
  'completed',
  'in-progress',
  'prototype',
]);
export type ProjectStatus = z.infer<typeof projectStatusSchema>;

export const projectCategorySchema = z.enum([
  'Full-Stack & Systems',
  'Decentralized / Web3',
  'Civic Tech & Gov',
  'Educational & Campus',
]);
export type ProjectCategory = z.infer<typeof projectCategorySchema>;

export const projectTenPointFrameworkSchema = z.object({
  idea: contentFieldSchema,
  problem: contentFieldSchema,
  motivation: contentFieldSchema,
  vision: contentFieldSchema,
  contribution: contentFieldSchema,
  process: contentFieldSchema,
  stack: z.array(contentFieldSchema),
  challenges: contentFieldSchema,
  outcomes: contentFieldSchema,
  lessons: contentFieldSchema,
});
export type ProjectTenPointFramework = z.infer<typeof projectTenPointFrameworkSchema>;

export const architectureNodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  sublabel: z.string(),
  type: z.enum(['client', 'gateway', 'service', 'db', 'ledger', 'ai']),
});
export type ArchitectureNode = z.infer<typeof architectureNodeSchema>;

export interface ProjectEvidence {
  screenshots: { caption: string; url?: string; placeholder: string }[];
  demoVideo: { caption: string; url?: string; placeholder: string };
  repoLink: { url?: string; placeholder: string };
  liveLink: { url?: string; placeholder: string };
}

export const projectSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: contentFieldSchema,
  tagline: contentFieldSchema,
  status: projectStatusSchema,
  category: projectCategorySchema,
  featured: z.boolean(),
  framework: projectTenPointFrameworkSchema,
  architectureNodes: z.array(architectureNodeSchema),
  evidence: z.any().optional(),
  links: z
    .object({
      demo: z.string().optional(),
      github: z.string().optional(),
      caseStudy: z.string().optional(),
    })
    .optional(),
});
export type Project = z.infer<typeof projectSchema>;

const rawProjects: Project[] = [
  {
    id: 'sahyog-cryptos',
    slug: 'sahyog-cryptos',
    title: draft('Sahyog Cryptos'),
    tagline: draft('Collaborative crypto-asset management and decentralized transaction framework'),
    status: 'unknown', // Requirement 6: status field starts as "unknown" and must be set by Chinmoy
    category: 'Decentralized / Web3',
    featured: true,
    framework: {
      idea: draft(
        'Collaborative crypto-asset management and decentralized transaction framework',
        'One-line premise from project brief'
      ),
      problem: placeholder('[TODO: specify problem statement — friction in group management, transparency, or trust]'),
      motivation: placeholder('[TODO: add personal motivation for building Sahyog Cryptos]'),
      vision: placeholder('[TODO: add long-term vision for decentralized collective finance or community trust protocols]'),
      contribution: placeholder('[TODO: detail Chinmoy’s specific technical authorship — smart contracts, state management, or architecture]'),
      process: placeholder('[TODO: document research, prototyping phase, and testing setup]'),
      stack: [
        placeholder('[TODO: confirm web3 chain & smart contract framework]'),
        placeholder('[TODO: confirm frontend & indexing stack]'),
      ],
      challenges: placeholder('[TODO: document key technical roadblocks — e.g. gas optimization or consensus]'),
      outcomes: placeholder('[TODO: add real verified metrics, benchmarks, or delivery milestones — DO NOT INVENT]'),
      lessons: placeholder('[TODO: key engineering takeaways about blockchain mechanics or UX friction]'),
    },
    architectureNodes: [
      { id: 'sc-1', label: 'Wallet Client', sublabel: 'EIP-1193 Provider', type: 'client' },
      { id: 'sc-2', label: 'Gateway Node', sublabel: 'RPC Node / Infura', type: 'gateway' },
      { id: 'sc-3', label: 'Smart Contract', sublabel: 'Multi-Sig Treasury', type: 'ledger' },
    ],
    links: {
      github: '',
      demo: '',
    },
  },
  {
    id: 'librarium-2-0',
    slug: 'librarium-2-0',
    title: draft('Librarium 2.0'),
    tagline: draft('Modern digital library management system and resource catalog'),
    status: 'unknown', // Requirement 6: status field starts as "unknown" and must be set by Chinmoy
    category: 'Full-Stack & Systems',
    featured: true,
    framework: {
      idea: draft(
        'Modern digital library management system and resource catalog',
        'One-line premise from project brief'
      ),
      problem: placeholder('[TODO: legacy institutional library inefficiencies and catalog friction addressed]'),
      motivation: placeholder('[TODO: what sparked the rebuild for Librarium 2.0]'),
      vision: placeholder('[TODO: modern digital resource ecosystem and seamless academic access vision]'),
      contribution: placeholder('[TODO: Chinmoy’s personal backend, schema, indexing, and interface code]'),
      process: placeholder('[TODO: database design, relational schema indexing, and deployment methodology]'),
      stack: [
        placeholder('[TODO: confirm backend, database, and search indexing stack]'),
        placeholder('[TODO: confirm frontend UI library and state management]'),
      ],
      challenges: placeholder('[TODO: concurrency, query latency, or asset tagging obstacles]'),
      outcomes: placeholder('[TODO: real adoption numbers, catalog count, or deployment status — DO NOT INVENT]'),
      lessons: placeholder('[TODO: architecture and relational schema takeaways]'),
    },
    architectureNodes: [
      { id: 'lib-1', label: 'Web Client', sublabel: 'Next.js App', type: 'client' },
      { id: 'lib-2', label: 'API Layer', sublabel: 'Server Routes', type: 'service' },
      { id: 'lib-3', label: 'Catalog DB', sublabel: 'PostgreSQL Relational DB', type: 'db' },
    ],
    links: {
      github: '',
      demo: '',
    },
  },
  {
    id: 'gcu-campus-flow',
    slug: 'gcu-campus-flow',
    title: draft('GCU Campus Flow'),
    tagline: draft('Integrated digital workflow and approval automation platform for university campus operations'),
    status: 'unknown', // Requirement 6: status field starts as "unknown" and must be set by Chinmoy
    category: 'Educational & Campus',
    featured: true,
    framework: {
      idea: draft(
        'Integrated digital workflow and approval automation platform for university campus operations',
        'One-line premise from project brief'
      ),
      problem: placeholder('[TODO: administrative paper log bottlenecks and campus department friction]'),
      motivation: placeholder('[TODO: personal catalyst for building campus administrative automation]'),
      vision: placeholder('[TODO: vision for cohesive, paperless, real-time university digital services]'),
      contribution: placeholder('[TODO: Chinmoy’s architecture, role hierarchies, and approval pipeline code]'),
      process: placeholder('[TODO: user feedback cycles across campus faculty and deployment milestones]'),
      stack: [
        placeholder('[TODO: confirm authentication, database, and workflow engine stack]'),
        placeholder('[TODO: confirm frontend notification and review UI]'),
      ],
      challenges: placeholder('[TODO: role hierarchy, security permissions, or faculty adoption friction]'),
      outcomes: placeholder('[TODO: verified user numbers, departmental adoption, or pilot milestones — DO NOT INVENT]'),
      lessons: placeholder('[TODO: takeaways on engineering mission-critical institutional software]'),
    },
    architectureNodes: [
      { id: 'gcu-1', label: 'Campus Portal', sublabel: 'Role-Based Dashboard', type: 'client' },
      { id: 'gcu-2', label: 'Workflow Engine', sublabel: 'Approval State Machine', type: 'service' },
      { id: 'gcu-3', label: 'Audit Store', sublabel: 'Encrypted Records DB', type: 'db' },
    ],
    links: {
      github: '',
      demo: '',
    },
  },
  {
    id: 'irdms-assam',
    slug: 'irdms-assam',
    title: draft('IRDMS Assam'),
    tagline: draft('Integrated regional disaster and resource management system for low-bandwidth civic resilience'),
    status: 'unknown', // Requirement 6: status field starts as "unknown" and must be set by Chinmoy
    category: 'Civic Tech & Gov',
    featured: true,
    framework: {
      idea: draft(
        'Integrated regional disaster and resource management system for low-bandwidth civic resilience',
        'One-line premise from project brief'
      ),
      problem: placeholder('[TODO: disaster management communication breakdowns and resource allocation delays in Assam]'),
      motivation: placeholder('[TODO: personal imperative for building low-bandwidth civic disaster tooling]'),
      vision: placeholder('[TODO: offline-first, highly accessible emergency coordination framework]'),
      contribution: placeholder('[TODO: Chinmoy’s data architecture, offline caching, and resource dispatch modeling]'),
      process: placeholder('[TODO: field assessment, emergency service workflow analysis, and pilot testing]'),
      stack: [
        placeholder('[TODO: confirm GIS / mapping, offline synchronization, and edge caching stack]'),
        placeholder('[TODO: confirm SMS/USSD or low-bandwidth protocol integrations]'),
      ],
      challenges: placeholder('[TODO: low-bandwidth connectivity, intermittent electricity, and real-time validation]'),
      outcomes: placeholder('[TODO: verified pilot trials, simulated response metrics, or civic partner tests — DO NOT INVENT]'),
      lessons: placeholder('[TODO: engineering for catastrophic failure conditions and vulnerable populations]'),
    },
    architectureNodes: [
      { id: 'ir-1', label: 'Field Client', sublabel: 'PWA Offline Cache', type: 'client' },
      { id: 'ir-2', label: 'Sync Broker', sublabel: 'Conflict-Free Replicator', type: 'service' },
      { id: 'ir-3', label: 'Spatial Registry', sublabel: 'GIS Resource DB', type: 'db' },
    ],
    links: {
      github: '',
      demo: '',
    },
  },
];

export const projects: Project[] = z.array(projectSchema).parse(rawProjects);
