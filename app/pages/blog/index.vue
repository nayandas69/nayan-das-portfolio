<!-- /blog — fresh notes and useful code licks, all living in the repo. -->
<template>
  <main class="blog-index">
    <header class="blog-header">
      <h1 class="gradient-text">/blog</h1>
      <p>Notes on building for the web, one useful detail at a time.</p>
    </header>
    <section aria-label="Find articles" class="blog-filters">
      <label for="blog-search">Search articles</label>
      <input
        id="blog-search"
        v-model="query"
        type="search"
        placeholder="Search by title, topic, or description"
      />
      <div class="blog-topics" role="group" aria-label="Filter by topic">
        <button
          v-for="topic in ['All', ...topics]"
          :key="topic"
          type="button"
          :aria-pressed="selected === topic"
          @click="selected = topic"
        >
          {{ topic }}
        </button>
      </div>
    </section>
    <p class="blog-count" role="status">
      {{ filtered.length }} {{ filtered.length === 1 ? 'article' : 'articles' }}
    </p>
    <BlogPostList
      v-if="filtered.length"
      :posts="filtered"
      :featured="!query && selected === 'All'"
    />
    <div v-else class="blog-empty">
      <h2>No matching articles</h2>
      <p>Try a different search or choose another topic.</p>
      <button
        type="button"
        @click="
          query = '';
          selected = 'All';
        "
      >
        Clear filters
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
  const posts = useBlogPosts();
  const query = ref('');
  const selected = ref('All');
  const topics = [...new Set(posts.flatMap((post) => post.tags))].sort();
  const filtered = computed(() =>
    posts.filter((post) => {
      const matchesTopic = selected.value === 'All' || post.tags.includes(selected.value);
      return (
        matchesTopic &&
        `${post.title} ${post.description} ${post.tags.join(' ')}`
          .toLowerCase()
          .includes(query.value.trim().toLowerCase())
      );
    })
  );
  const siteUrl = useRuntimeConfig().public.siteUrl;
  useSeoMeta({
    title: 'Blog — Nayan Das',
    description: 'Practical notes on Vue, Nuxt, TypeScript, testing, and building for the web.',
    ogTitle: 'Blog — Nayan Das',
    ogDescription: 'Practical notes on Vue, Nuxt, TypeScript, testing, and building for the web.',
    ogUrl: `${siteUrl}/blog`,
  });
  useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/blog` }] });
</script>
