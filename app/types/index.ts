/**
 * Core Types — Nayan Das Portfolio
 */

export interface GithubRepo {
  name: string;
  description: string;
  language?: string;
  stars: number;
  forks: number;
  url: string;
  homepage?: string;
  pushedAt: string;
  topics: string[];
  /** True when the repo has been archived on GitHub (read-only, no longer active) */
  archived: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
  url: string;
  headings: { id: string; text: string; depth: number }[];
}

export interface SocialLink {
  label: string;
  url: string;
  icon: any; // Using any for component reference
}

export interface AppConfig {
  profile: {
    name: string;
    bio: string;
    email: string;
  };
}
