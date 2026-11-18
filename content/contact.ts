export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
  isPlaceholder: boolean;
}

export interface ContactInfo {
  name: string;
  email: string;
  location: string;
  currentRoleOrStatus: string;
  availability: string;
  bioSnippet: string;
  socials: SocialLink[];
  isPlaceholder: boolean;
}

export const contactData: ContactInfo = {
  name: 'Chinmoy Kalita',
  email: 'chinmoykk3@gmail.com', // derived from git author email
  location: 'Assam, India [TODO: confirm exact city/region]',
  currentRoleOrStatus: '[TODO: Add current role/student status/independent engineer title]',
  availability: 'Open for high-impact engineering roles, research collaborations & creative builds',
  bioSnippet:
    'Creative technologist and full-stack software engineer crafting narrative-rich interactive systems, resilient public platforms, and AI frontiers.',
  isPlaceholder: true,
  socials: [
    {
      platform: 'GitHub',
      url: 'https://github.com/chinmoyk [TODO: verify GitHub handle]',
      handle: '@chinmoyk [TODO: verify]',
      isPlaceholder: true,
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/[TODO: add-linkedin-slug]',
      handle: 'Chinmoy Kalita [TODO: verify]',
      isPlaceholder: true,
    },
    {
      platform: 'X (Twitter)',
      url: 'https://x.com/[TODO: add-x-handle]',
      handle: '@[TODO: handle]',
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
