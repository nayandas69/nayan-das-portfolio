import { describe, it, expect, vi } from 'vitest';
import { useBlogPosts } from '~/composables/useBlogPosts';
import { formatBlogDate } from '~/utils/blog';

vi.mock('#blog', async () => await import('../fixtures/blog.js'));

describe('repository articles', () => {
  it('lists all published articles in descending publication order with local URLs', () => {
    const posts = useBlogPosts();
    expect(posts).toHaveLength(6);
    expect(posts.map((post) => post.date)).toEqual(
      posts
        .map((post) => post.date)
        .sort()
        .reverse()
    );
    for (const post of posts) {
      expect(post.url).toBe(`/blog/${post.slug}`);
      expect(post.title.length).toBeGreaterThan(0);
      expect(post.readingTime).toBeGreaterThan(0);
      expect(post.headings.length).toBeGreaterThan(0);
    }
  });

  it('selects exactly the five latest posts for home without changing the archive', () => {
    expect(useBlogPosts(5)).toEqual(useBlogPosts().slice(0, 5));
    expect(useBlogPosts(0)).toEqual([]);
    expect(useBlogPosts(-1)).toEqual([]);
    expect(useBlogPosts()).toHaveLength(6);
  });

  it('formats a publication date in UTC consistently', () => {
    expect(formatBlogDate('2026-10-27')).toBe('Oct 27, 2026');
  });
});
