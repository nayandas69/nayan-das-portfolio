<!--
  ArticlesSection
  Auto-fetches recent blog posts from the Blogverse API and renders
  them as a clean list with title, description, date, and reading time.
-->
<template>
  <section class="section fade-up" aria-labelledby="articles-title">
    <h2 id="articles-title" class="section__title">articles</h2>

    <!-- Loading skeletons -->
    <div v-if="loading" class="articles__list">
      <div v-for="n in 3" :key="n" class="articles__skeleton">
        <div class="skeleton" style="height: 16px; width: 70%" />
        <div class="skeleton" style="height: 12px; width: 50%; margin-top: 10px" />
      </div>
    </div>

    <!-- Error state -->
    <p v-else-if="error" class="articles__error">Failed to load articles. Check back later.</p>

    <!-- Article list -->
    <ul v-else-if="posts?.length" class="articles__list">
      <li v-for="post in posts" :key="post.slug" class="articles__item">
        <a :href="post.url" class="articles__link" target="_blank" rel="noopener noreferrer">
          <!-- Title row with external arrow -->
          <div class="articles__head">
            <h3 class="articles__title">{{ post.title }}</h3>
            <IconArrow class="articles__arrow" />
          </div>

          <!-- Description -->
          <p v-if="post.description" class="articles__desc">
            {{ post.description }}
          </p>

          <!-- Meta row: date + reading time + tags -->
          <div class="articles__meta">
            <span v-if="post.date" class="articles__date">
              {{ formatDate(post.date) }}
            </span>
            <span v-if="post.readingTime" class="articles__time">
              <IconClock />
              {{ post.readingTime }} min read
            </span>
          </div>

          <!-- Tags -->
          <div v-if="post.tags.length" class="articles__tags">
            <span v-for="tag in post.tags.slice(0, 4)" :key="tag" class="articles__tag">
              {{ tag }}
            </span>
          </div>
        </a>
      </li>
    </ul>

    <!-- Empty state -->
    <p v-else class="articles__error">No articles found.</p>

    <!-- Blog link -->
    <a
      href="https://blogverse-five-omega.vercel.app"
      class="articles__all"
      target="_blank"
      rel="noopener noreferrer"
    >
      read all articles
      <IconArrow />
    </a>
  </section>
</template>

<script setup lang="ts">
  import { useBlogPosts } from '~/composables/useBlogPosts';
  import IconArrow from '~/components/icons/IconArrow.vue';
  import IconClock from '~/components/icons/IconClock.vue';

  /** Fetch 5 most recent blog posts */
  const { posts, loading, error } = useBlogPosts(5);

  /**
   * Formats an ISO date string to a human-readable format.
   * Example: "2026-01-30" => "Jan 30, 2026"
   */
  function formatDate(dateStr: string) {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  }
</script>

<style lang="scss" scoped>
  /* ── Article list ─────────────────────────────────── */
  .articles__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .articles__item {
    border-bottom: 1px solid $color-border;

    &:last-child {
      border-bottom: none;
    }
  }

  .articles__link {
    display: block;
    padding: $space-5 0;
    text-decoration: none;
    color: inherit;
    @include transition(opacity);

    &:hover {
      color: inherit;

      .articles__arrow {
        opacity: 1;
        transform: translate(2px, -2px);
      }

      .articles__title {
        color: $color-accent;
      }
    }
  }

  /* ── Head row ──────────────────────────────────────── */
  .articles__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: $space-3;
  }

  .articles__title {
    font-family: $font-heading;
    font-size: 0.9375rem;
    font-weight: 600;
    color: $color-text;
    line-height: 1.4;
    @include transition(color);
  }

  .articles__arrow {
    width: 14px;
    height: 14px;
    color: $color-muted;
    flex-shrink: 0;
    margin-top: 2px;
    opacity: 0;
    @include transition(all);
  }

  /* ── Description ───────────────────────────────────── */
  .articles__desc {
    font-size: 0.8125rem;
    color: $color-muted;
    margin-top: $space-2;
    line-height: 1.5;
    @include line-clamp(2);
  }

  /* ── Meta row ──────────────────────────────────────── */
  .articles__meta {
    display: flex;
    align-items: center;
    gap: $space-4;
    margin-top: $space-3;
  }

  .articles__date,
  .articles__time {
    font-family: $font-mono;
    font-size: 0.75rem;
    color: $color-muted;
    display: inline-flex;
    align-items: center;
    gap: $space-1;

    svg {
      width: 12px;
      height: 12px;
    }
  }

  /* ── Tags ──────────────────────────────────────────── */
  .articles__tags {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;
    margin-top: $space-3;
  }

  .articles__tag {
    font-family: $font-mono;
    font-size: 0.6875rem;
    color: $color-accent;
    background: color.change($color-accent, $alpha: 0.08);
    padding: 2px 8px;
    border-radius: 4px;
  }

  /* ── Skeleton ──────────────────────────────────────── */
  .articles__skeleton {
    padding: $space-5 0;
    border-bottom: 1px solid $color-border;

    &:last-child {
      border-bottom: none;
    }
  }

  /* ── Error text ────────────────────────────────────── */
  .articles__error {
    font-size: 0.875rem;
    color: $color-muted;
  }

  /* ── "Read all" link ──────────────────────────────── */
  .articles__all {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    font-family: $font-mono;
    font-size: 0.8125rem;
    color: $color-muted;
    margin-top: $space-6;
    @include transition(color);

    svg {
      width: 14px;
      height: 14px;
    }

    &:hover {
      color: $color-accent;
    }
  }
</style>
