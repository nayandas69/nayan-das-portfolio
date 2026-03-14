import type { BlogPost } from '~/types';

/**
 * useBlogPosts
 * Fetches recent blog posts from the Blogverse API.
 *
 * API endpoint: GET /api/v1/posts/recent?limit=N
 * Docs: https://blogverse-five-omega.vercel.app/api/v1
 *
 * @param {number} [limit] — number of recent posts
 * @returns {{ posts: Ref<BlogPost[]>, loading: ComputedRef<boolean>, error: Ref<any> }}
 */
export function useBlogPosts(limit?: number) {
  const { api } = useAppConfig();
  const targetLimit = limit || 5;
  const url = `${api.blogverse}/posts/recent?limit=${targetLimit}`;

  const {
    data: posts,
    status,
    error,
  } = useFetch<BlogPost[]>(url, {
    key: `blog-posts-recent-${targetLimit}`,

    /* Extract the data array from the API response wrapper */
    transform: (raw: any) => {
      if (!raw?.success || !raw?.data) return [];

      return raw.data.map((post: any) => ({
        slug: post.slug,
        title: post.frontmatter?.title || 'Untitled',
        description: post.frontmatter?.description || post.excerpt || '',
        date: post.frontmatter?.date || '',
        tags: post.frontmatter?.tags || [],
        readingTime: post.readingTime || 0,
        /* Direct link to the blog post on Blogverse */
        url: `https://blogverse-five-omega.vercel.app/blog/${post.slug}`,
      }));
    },
  });

  const loading = computed(() => status.value === 'pending');

  return { posts, loading, error };
}
