import { z } from 'zod';
import { contentFieldSchema, ContentField, confirmed, draft, placeholder } from './schema';

export const socialLinkSchema = z.object({
  platform: z.string(),
  url: z.string(),
  handle: z.string(),
  isPlaceholder: z.boolean(),
});
export type SocialLink = z.infer<typeof socialLinkSchema>;

export const contactInfoSchema = z.object({
  name: contentFieldSchema,
  email: z.string(),
  location: contentFieldSchema,
  currentRoleOrStatus: contentFieldSchema,
  availability: contentFieldSchema,
  bioSnippet: contentFieldSchema,
  socials: z.array(socialLinkSchema),
  whatIWantToBecome: contentFieldSchema,
  whatIWantToBuild: contentFieldSchema,
  technologiesToExplore: z.array(contentFieldSchema),
  ambitions: contentFieldSchema,
  collaborationOpportunities: z.array(contentFieldSchema),
});
export type ContactInfo = z.infer<typeof contactInfoSchema>;

const rawContact: ContactInfo = {
  name: confirmed('Chinmoy Kalita'),
  email: 'chinmoykk3@gmail.com',
  location: placeholder('[TODO: confirm exact city/region, Assam, India]'),
  currentRoleOrStatus: placeholder('[TODO: add current role/student status/independent engineer title]'),
  availability: draft('Open for high-impact engineering roles, research collaborations & creative builds'),
  bioSnippet: draft(
    'Creative technologist and full-stack software engineer crafting narrative-rich interactive systems, resilient public platforms, and AI frontiers.'
  ),
  whatIWantToBecome: placeholder('[TODO: Chinmoy to supply: What I want to become]'),
  whatIWantToBuild: placeholder('[TODO: Chinmoy to supply: What I want to build]'),
  technologiesToExplore: [
    draft('Local Small Language Models (SLMs) & WebGPU Shaders'),
    draft('Distributed Consensus & Zero-Knowledge Cryptography'),
    draft('Spatial Typography & WebGL Real-Time Graphics'),
    draft('Deterministic Agentic Evaluation Systems'),
    placeholder('[TODO: confirm additional technologies to explore]'),
  ],
  ambitions: placeholder('[TODO: Chinmoy to supply: Ambitions]'),
  collaborationOpportunities: [
    draft('Founding / Core Full-Stack & AI Engineering Roles'),
    draft('Open-Source Decentralized & Civic Tech Initiatives'),
    draft('Interactive 3D / Creative Technology Experiments'),
    draft('Applied AI & Autonomous Agent Architecture Research'),
    placeholder('[TODO: add specific collaboration targets]'),
  ],
  socials: [
    {
      platform: 'GitHub',
      url: 'https://github.com/chinmoyk',
      handle: '@chinmoyk',
      isPlaceholder: true,
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/chinmoy-kalita',
      handle: 'Chinmoy Kalita',
      isPlaceholder: true,
    },
    {
      platform: 'Email',
      url: 'mailto:chinmoykk3@gmail.com',
      handle: 'chinmoykk3@gmail.com',
      isPlaceholder: false,
    },
  ],
};

export const contactData: ContactInfo = contactInfoSchema.parse(rawContact);
