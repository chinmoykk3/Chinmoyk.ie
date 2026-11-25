export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
}

export const GITHUB_USERNAME = 'chinmoykk3';
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

const EXCLUDED_REPOS = new Set(['chinmoykk3', 'spotify-clone-frontend', 'Netflix-clone-frontend']);

/**
 * Verified public repositories from github.com/chinmoykk3
 * Used for instant SSR rendering and offline/rate-limit resilience.
 */
export const FALLBACK_GITHUB_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: 'Xongket',
    description: 'TypeScript application & systems project built by Chinmoy Kalita.',
    html_url: 'https://github.com/chinmoykk3/Xongket',
    homepage: null,
    language: 'TypeScript',
    stargazers_count: 2,
    forks_count: 0,
    updated_at: '2026-11-20T00:00:00Z',
  },
  {
    id: 2,
    name: 'CampusMilan-AI',
    description: 'AI-powered campus discovery and student assistant web application.',
    html_url: 'https://github.com/chinmoykk3/CampusMilan-AI',
    homepage: 'https://campus-find-ai-mauve.vercel.app',
    language: 'JavaScript',
    stargazers_count: 1,
    forks_count: 0,
    updated_at: '2026-11-18T00:00:00Z',
  },
  {
    id: 3,
    name: 'Xohayy',
    description: 'Full-stack TypeScript platform engineered for modern web workflows.',
    html_url: 'https://github.com/chinmoykk3/Xohayy',
    homepage: null,
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-11-22T00:00:00Z',
  },
  {
    id: 4,
    name: 'librarium',
    description: 'Digital library & knowledge management application.',
    html_url: 'https://github.com/chinmoykk3/librarium',
    homepage: null,
    language: 'JavaScript',
    stargazers_count: 1,
    forks_count: 0,
    updated_at: '2026-11-15T00:00:00Z',
  },
  {
    id: 5,
    name: 'chink-s-Clipper',
    description: 'Python-based media & content clipping utility.',
    html_url: 'https://github.com/chinmoykk3/chink-s-Clipper',
    homepage: null,
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-11-24T00:00:00Z',
  },
  {
    id: 6,
    name: 'Chinmoyk.ie',
    description: 'Interactive first-person documentary developer portfolio built with Next.js & Three.js.',
    html_url: 'https://github.com/chinmoykk3/Chinmoyk.ie',
    homepage: 'https://chinmoyk-ie.vercel.app',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-11-25T00:00:00Z',
  },
  {
    id: 7,
    name: 'developer-portfolio-website',
    description: 'Developer portfolio website designed and coded from scratch.',
    html_url: 'https://github.com/chinmoykk3/developer-portfolio-website',
    homepage: null,
    language: 'TypeScript',
    stargazers_count: 1,
    forks_count: 0,
    updated_at: '2026-10-10T00:00:00Z',
  },
  {
    id: 8,
    name: 'my-frontend-projects',
    description: 'Collection of documented frontend engineering builds and UI experiments.',
    html_url: 'https://github.com/chinmoykk3/my-frontend-projects',
    homepage: null,
    language: 'CSS',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-10-01T00:00:00Z',
  },
];

interface RawGitHubApiRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  topics?: string[];
}

/**
 * Fetches live public repositories from GitHub for chinmoykk3.
 * Falls back to verified snapshot if offline or rate-limited.
 */
export async function fetchGitHubRepos(): Promise<{
  repos: GitHubRepo[];
  live: boolean;
}> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      return { repos: FALLBACK_GITHUB_REPOS, live: false };
    }

    const raw: RawGitHubApiRepo[] = await res.json();
    const filtered: GitHubRepo[] = raw
      .filter((r) => !r.fork && !EXCLUDED_REPOS.has(r.name))
      .map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        html_url: r.html_url,
        homepage: r.homepage && r.homepage.trim().length > 0 ? r.homepage : null,
        language: r.language,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count,
        updated_at: r.updated_at,
        topics: r.topics,
      }));

    if (filtered.length === 0) {
      return { repos: FALLBACK_GITHUB_REPOS, live: false };
    }

    return { repos: filtered, live: true };
  } catch {
    return { repos: FALLBACK_GITHUB_REPOS, live: false };
  }
}
