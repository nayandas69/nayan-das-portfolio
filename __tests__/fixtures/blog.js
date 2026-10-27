// Stable metadata keeps authoring new posts independent of UI unit tests.
export const posts = [
  {
    slug: 'markdown-guide',
    title: 'Markdown that reads well',
    description: 'Write clear articles.',
    tags: ['Writing'],
  },
  {
    slug: 'vue-boundaries',
    title: 'Vue boundaries',
    description: 'Separate feature responsibilities.',
    tags: ['Vue'],
  },
  {
    slug: 'tests-that-fail',
    title: 'Tests that catch mistakes',
    description: 'Check useful behavior.',
    tags: ['Testing'],
  },
  {
    slug: 'keyboard-path',
    title: 'A keyboard path',
    description: 'Make controls reachable.',
    tags: ['Accessibility'],
  },
  {
    slug: 'two-themes',
    title: 'Two readable themes',
    description: 'Use semantic CSS tokens.',
    tags: ['CSS'],
  },
  {
    slug: 'first-response',
    title: 'Useful first responses',
    description: 'Render stable content early.',
    tags: ['Nuxt'],
  },
].map((post, index) => ({
  ...post,
  date: `2026-10-${27 - index}`,
  url: `/blog/${post.slug}`,
  readingTime: 2,
  headings: [{ id: 'details', text: 'Details', depth: 2 }],
}));
