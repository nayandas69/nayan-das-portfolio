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
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
  url: string;
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
  api: {
    blogverse: string;
  };
}
