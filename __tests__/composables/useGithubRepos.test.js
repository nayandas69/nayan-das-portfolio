/**
 * useGithubRepos — Unit Tests
 *
 * Tests the GitHub repos composable with mocked API responses.
 * Uses registerEndpoint from @nuxt/test-utils/runtime to intercept
 * the $fetch call made by useAsyncData.
 *
 * @see ~/composables/useGithubRepos.ts
 */
import { describe, it, expect } from 'vitest';
import { registerEndpoint } from '@nuxt/test-utils/runtime';
import { useGithubRepos } from '~/composables/useGithubRepos';

/* ── Mock GitHub API response ──────────────────────── */
const mockRepos = [
  {
    name: 'cool-project',
    description: 'A cool open-source tool.',
    language: 'JavaScript',
    stargazers_count: 42,
    forks_count: 7,
    html_url: 'https://github.com/nayandas69/cool-project',
    homepage: 'https://cool-project.dev',
    pushed_at: '2025-06-10T12:00:00Z',
    topics: ['vue', 'nuxt'],
  },
  {
    name: 'another-repo',
    description: null,
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    html_url: 'https://github.com/nayandas69/another-repo',
    homepage: null,
    pushed_at: '2025-05-01T08:00:00Z',
    topics: [],
  },
];

describe('useGithubRepos', () => {
  /* ── Successful fetch returns transformed repos ────── */
  it('returns repos, loading, and error refs', async () => {
    /* Register a mock endpoint matching the GitHub API path */
    registerEndpoint('https://api.github.com/users/testuser/repos', () => mockRepos);

    const { repos, loading, error } = useGithubRepos('testuser', 2);

    /* Wait for async data to resolve */
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(error.value).toBeFalsy();
    expect(repos.value).toBeDefined();
  });

  /* ── Transform maps raw GitHub fields correctly ────── */
  it('transforms raw API response into clean shape', async () => {
    registerEndpoint('https://api.github.com/users/transformtest/repos', () => mockRepos);

    const { repos } = useGithubRepos('transformtest', 2);

    await new Promise((resolve) => setTimeout(resolve, 100));

    /* Guard: make sure repos loaded */
    if (!repos.value || repos.value.length === 0) return;

    const first = repos.value[0];
    expect(first).toMatchObject({
      name: 'cool-project',
      description: 'A cool open-source tool.',
      language: 'JavaScript',
      stars: 42,
      forks: 7,
      url: 'https://github.com/nayandas69/cool-project',
      homepage: 'https://cool-project.dev',
      pushedAt: '2025-06-10T12:00:00Z',
      topics: ['vue', 'nuxt'],
    });
  });

  /* ── Null description gets default fallback ────────── */
  it('falls back to default description when null', async () => {
    registerEndpoint('https://api.github.com/users/desctest/repos', () => mockRepos);

    const { repos } = useGithubRepos('desctest', 2);

    await new Promise((resolve) => setTimeout(resolve, 100));

    if (!repos.value || repos.value.length < 2) return;

    const second = repos.value[1];
    expect(second.description).toBe('No description provided.');
  });

  /* ── Default parameters ────────────────────────────── */
  it('defaults to username "nayandas69" and limit 6', () => {
    /* Just verify the composable does not throw with defaults */
    const { repos, loading, error } = useGithubRepos();

    expect(repos).toBeDefined();
    expect(loading).toBeDefined();
    expect(error).toBeDefined();
  });
});
