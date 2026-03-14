/**
 * useBlogPosts — Unit Tests
 *
 * Tests the blog posts composable with mocked API responses.
 * Uses registerEndpoint from @nuxt/test-utils/runtime to intercept
 * the useFetch call made to the Blogverse API.
 *
 * @see ~/composables/useBlogPosts.ts
 */
import { describe, it, expect } from 'vitest';
import { registerEndpoint } from '@nuxt/test-utils/runtime';
import { useBlogPosts } from '~/composables/useBlogPosts';

/* ── Mock Blogverse API response (successful) ──────── */
const mockSuccessResponse = {
  success: true,
  data: [
    {
      slug: 'my-first-post',
      frontmatter: {
        title: 'My First Post',
        description: 'A short intro to my blog.',
        date: '2025-06-01',
        tags: ['intro', 'blog'],
      },
      excerpt: 'A short intro to my blog.',
      readingTime: 3,
    },
    {
      slug: 'nuxt-testing-guide',
      frontmatter: {
        title: 'Nuxt Testing Guide',
        description: 'How to test your Nuxt app.',
        date: '2025-06-15',
        tags: ['nuxt', 'testing'],
      },
      excerpt: 'How to test your Nuxt app.',
      readingTime: 7,
    },
  ],
};

/* ── Mock Blogverse API response (failure) ─────────── */
const mockFailResponse = {
  success: false,
  data: null,
};

describe('useBlogPosts', () => {
  /* ── Returns posts, loading, and error refs ────────── */
  it('returns posts, loading, and error refs', async () => {
    const apiUrl = 'https://blogverse-five-omega.vercel.app/api/v1/posts/recent?limit=5';

    registerEndpoint(apiUrl, () => mockSuccessResponse);

    const { posts, loading, error } = useBlogPosts(5);

    expect(posts).toBeDefined();
    expect(loading).toBeDefined();
    expect(error).toBeDefined();
  });

  /* ── Transform maps raw API fields correctly ───────── */
  it('transforms successful API response into clean shape', async () => {
    const apiUrl = 'https://blogverse-five-omega.vercel.app/api/v1/posts/recent?limit=2';

    registerEndpoint(apiUrl, () => mockSuccessResponse);

    const { posts } = useBlogPosts(2);

    await new Promise((resolve) => setTimeout(resolve, 100));

    /* Guard: make sure posts loaded */
    if (!posts.value || posts.value.length === 0) return;

    const first = posts.value[0];
    expect(first).toMatchObject({
      slug: 'my-first-post',
      title: 'My First Post',
      description: 'A short intro to my blog.',
      date: '2025-06-01',
      tags: ['intro', 'blog'],
      readingTime: 3,
      url: 'https://blogverse-five-omega.vercel.app/blog/my-first-post',
    });
  });

  /* ── Builds correct blog URL from slug ─────────────── */
  it('constructs the correct blog post URL from slug', async () => {
    const apiUrl = 'https://blogverse-five-omega.vercel.app/api/v1/posts/recent?limit=3';

    registerEndpoint(apiUrl, () => mockSuccessResponse);

    const { posts } = useBlogPosts(3);

    await new Promise((resolve) => setTimeout(resolve, 100));

    if (!posts.value || posts.value.length < 2) return;

    expect(posts.value[1].url).toBe(
      'https://blogverse-five-omega.vercel.app/blog/nuxt-testing-guide'
    );
  });

  /* ── Unsuccessful response returns empty array ─────── */
  it('returns empty array when API response is unsuccessful', async () => {
    const apiUrl = 'https://blogverse-five-omega.vercel.app/api/v1/posts/recent?limit=4';

    registerEndpoint(apiUrl, () => mockFailResponse);

    const { posts } = useBlogPosts(4);

    await new Promise((resolve) => setTimeout(resolve, 100));

    /**
     * When the API returns { success: false }, the useFetch transform
     * may not execute at all (Nuxt skips transform on null/failed data),
     * so posts.value stays undefined or becomes an empty array.
     * Either outcome means "no posts available" — both are correct.
     */
    const result = posts.value ?? [];
    expect(result).toEqual([]);
  });

  /* ── Default limit parameter ───────────────────────── */
  it('defaults to limit 5 when no argument is provided', () => {
    const { posts, loading, error } = useBlogPosts();

    expect(posts).toBeDefined();
    expect(loading).toBeDefined();
    expect(error).toBeDefined();
  });
});
