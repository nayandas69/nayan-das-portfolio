<template>
  <main class="blog-article">
    <article>
      <header class="blog-header">
        <NuxtLink to="/blog" class="blog-back">All articles</NuxtLink>
        <div class="article-meta">
          <time :datetime="post.date">{{ formatBlogDate(post.date) }}</time
          ><span>{{ post.readingTime }} min read</span>
        </div>
        <h1>{{ post.title }}</h1>
        <p>{{ post.description }}</p>
        <div class="article-tags">
          <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
        </div>
      </header>
      <details v-if="post.headings.length" class="article-contents">
        <summary>On this page</summary>
        <nav aria-label="Table of contents">
          <ul>
            <li
              v-for="heading in post.headings"
              :key="heading.id"
              :class="{ 'contents-nested': heading.depth === 3 }"
            >
              <a :href="`#${heading.id}`">{{ heading.text }}</a>
            </li>
          </ul>
        </nav>
      </details>
      <div class="blog-prose">
        <component :is="Article" :components="{ pre: BlogCodeBlock, Callout: BlogCallout }" />
      </div>
    </article>
    <footer class="article-footer">
      <NuxtLink to="/blog">Browse all articles</NuxtLink>
      <NuxtLink v-if="nextPost" :to="nextPost.url"
        ><span>Read next</span><strong>{{ nextPost.title }}</strong></NuxtLink
      >
    </footer>
  </main>
</template>

<script setup lang="ts">
  import { posts, loaders } from '#blog';
  import BlogCodeBlock from '~/components/blog/CodeBlock.vue';
  import BlogCallout from '~/components/blog/Callout.vue';

  definePageMeta({ key: (route) => route.path });
  const route = useRoute();
  const post = posts.find((entry) => entry.slug === route.params.slug);
  if (!post) throw createError({ statusCode: 404, statusMessage: 'Article not found' });
  const Article = (await loaders[post.slug]()).default;
  const nextPost = posts[posts.indexOf(post) + 1];
  const {
    public: { siteUrl },
  } = useRuntimeConfig();
  const canonical = `${siteUrl}${post.url}`;
  useSeoMeta({
    title: `${post.title} — Nayan Das`,
    description: post.description,
    ogTitle: post.title,
    ogDescription: post.description,
    ogType: 'article',
    ogUrl: canonical,
    articlePublishedTime: `${post.date}T00:00:00Z`,
    articleAuthor: ['Nayan Das'],
    articleTag: post.tags,
    twitterTitle: post.title,
    twitterDescription: post.description,
  });
  useHead({
    link: [{ rel: 'canonical', href: canonical }],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: `${post.date}T00:00:00Z`,
          author: { '@type': 'Person', name: 'Nayan Das', url: siteUrl },
          mainEntityOfPage: canonical,
          url: canonical,
          image: `${siteUrl}/look.png`,
        }).replace(/</g, '\u003c'),
      },
    ],
  });
</script>
