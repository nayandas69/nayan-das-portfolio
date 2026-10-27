<template>
  <TransitionGroup name="posts" tag="ul" class="post-list">
    <li
      v-for="(post, index) in posts"
      :key="post.slug"
      :class="{ 'post-feature': featured && index === 0 }"
    >
      <NuxtLink :to="post.url" class="post-link">
        <div class="post-meta">
          <time :datetime="post.date">{{ formatBlogDate(post.date) }}</time>
          <span>{{ post.readingTime }} min read</span>
        </div>
        <component :is="headingLevel || 'h2'" class="post-title">{{ post.title }}</component>
        <p class="post-description">{{ post.description }}</p>
        <div class="post-tags">
          <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
        </div>
      </NuxtLink>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
  import type { BlogPost } from '~/types';
  defineProps<{ posts: BlogPost[]; featured?: boolean; headingLevel?: 'h2' | 'h3' }>();
</script>

<style scoped lang="scss">
  // Filter licks: let the remaining stories settle into their new places.
  .posts-move,
  .posts-enter-active,
  .posts-leave-active {
    transition:
      opacity 180ms ease,
      transform 240ms ease;
  }
  .posts-leave-active {
    position: absolute;
    width: 100%;
  }
  .posts-leave-to {
    opacity: 0;
  }
  .posts-enter-from {
    opacity: 0;
    transform: translateY(8px);
  }
  @media (prefers-reduced-motion: reduce) {
    .posts-enter-from {
      transform: none;
    }
  }
  .post-list {
    position: relative;
    list-style: none;
    padding: 0;
  }
  .post-list > li + li {
    border-top: 1px solid $color-border;
  }
  .post-link {
    display: block;
    padding: 1.75rem 0;
  }
  .post-link:hover .post-title {
    color: $color-accent;
  }
  .post-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    color: $color-muted;
    font-size: 0.75rem;
  }
  .post-title {
    margin: 0.6rem 0;
    font-size: 1.15rem;
    line-height: 1.4;
    text-transform: none;
    letter-spacing: -0.02em;
  }
  .post-description {
    font-size: 0.875rem;
    line-height: 1.7;
    max-width: 65ch;
  }
  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 0.8rem;
    font-size: 0.75rem;
    color: $color-muted;
  }
  .post-feature {
    padding-left: 1.25rem;
    border-left: 3px solid $color-accent;
    margin: 0.75rem 0 1.5rem;
  }
  .post-feature .post-link {
    padding: 0.25rem 0;
  }
  .post-feature .post-title {
    font-size: clamp(1.5rem, 5vw, 2rem);
    line-height: 1.25;
  }
</style>
