import type { GithubRepo } from '~/types';

/**
 * useGithubRepos
 *
 * Fetches public repositories for a GitHub user, sorted by most recently pushed.
 * Uses useAsyncData + $fetch for reliable SSR/CSR fetching with proper
 * error handling and response validation.
 *
 * @param {string} [username] — GitHub username
 * @param {number} [limit]    — max repos to return
 * @returns {{ repos: Ref<GithubRepo[]>, loading: ComputedRef<boolean>, error: Ref<any> }}
 */
export function useGithubRepos(username?: string, limit?: number) {
  const { profile } = useAppConfig();
  const targetUser = username || 'nayandas69';
  const targetLimit = limit || 6;

  /* GitHub REST API — public repos sorted by last push */
  const apiUrl = `https://api.github.com/users/${targetUser}/repos`;

  const {
    data: repos,
    status,
    error,
  } = useAsyncData<GithubRepo[]>(
    `github-repos-${targetUser}`,
    () =>
      $fetch(apiUrl, {
        params: {
          sort: 'pushed',
          per_page: targetLimit,
          type: 'public',
        },
        headers: {
          Accept: 'application/vnd.github+json',
        },
      }),
    {
      /* Transform raw GitHub response into a clean, minimal shape */
      transform: (raw: any[]) => {
        /* Guard: ensure we received an array from GitHub */
        if (!Array.isArray(raw)) return [];

        return raw.map((repo: any) => ({
          name: repo.name,
          description: repo.description || 'No description provided.',
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          url: repo.html_url,
          homepage: repo.homepage,
          pushedAt: repo.pushed_at,
          topics: repo.topics || [],
        }));
      },

      /* Fallback to empty array so the template never sees null */
      default: () => [],
    }
  );

  /* Derive a boolean loading state from Nuxt's status ref */
  const loading = computed(() => status.value === 'pending');

  return { repos, loading, error };
}
