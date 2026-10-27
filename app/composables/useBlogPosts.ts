import { posts } from '#blog';

/** Published articles, newest first. Content is compiled at build time. */
export function useBlogPosts(limit?: number) {
  return limit === undefined ? posts : posts.slice(0, Math.max(0, Math.floor(limit)));
}
