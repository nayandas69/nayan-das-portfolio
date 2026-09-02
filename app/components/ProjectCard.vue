<!--
  ProjectCard
  A single GitHub repository card showing name, badge, description,
  language, stars, forks, and last-updated time.
-->

<template>
  <a
    :href="repo.url"
    class="project-card"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="`View ${repo.name} on GitHub`"
  >
    <!-- Top row: icon + name + public badge -->
    <div class="project-card__head">
      <IconRepo class="project-card__icon" />
      <span class="project-card__name">{{ repo.name }}</span>
      <span class="project-card__badge">Public</span>
    </div>

    <!-- Description (2 line clamp) -->
    <p class="project-card__desc">{{ repo.description }}</p>

    <!-- Bottom row: language dot + stars + forks + updated -->
    <div class="project-card__meta">
      <!-- Language indicator -->
      <span v-if="repo.language" class="project-card__lang">
        <span class="project-card__dot" :style="{ backgroundColor: langColor(repo.language) }" />
        {{ repo.language }}
      </span>

      <!-- Stars -->
      <span v-if="repo.stars > 0" class="project-card__stat">
        <IconStar />
        {{ repo.stars }}
      </span>

      <!-- Forks -->
      <span v-if="repo.forks > 0" class="project-card__stat">
        <IconFork />
        {{ repo.forks }}
      </span>

      <!-- Last updated -->
      <span v-if="repo.pushedAt" class="project-card__stat project-card__updated">
        <IconClock />
        {{ relativeTime(repo.pushedAt) }}
      </span>
    </div>
  </a>
</template>

<script setup lang="ts">
  import type { GithubRepo } from '~/types';
  import IconRepo from '~/components/icons/IconRepo.vue';
  import IconStar from '~/components/icons/IconStar.vue';
  import IconFork from '~/components/icons/IconFork.vue';
  import IconClock from '~/components/icons/IconClock.vue';

  /* Pull the full language-color map from the shared composable */
  const { langColor } = useLanguageList();

  defineProps<{
    /** Repository object from useGithubRepos composable */
    repo: GithubRepo;
  }>();

  /**
   * Human-friendly relative time for the last push date.
   */
  function relativeTime(iso: string): string {
    const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
    if (days < 1) return 'today';
    if (days === 1) return 'yesterday';
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    return `${Math.floor(months / 12)}y ago`;
  }
</script>

<style lang="scss" scoped>
  .project-card {
    @include card;
    display: flex;
    flex-direction: column;
    gap: $space-3;
    padding: $space-5;
    min-width: 0;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition:
      transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
      border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      transform: translateY(-4px);
      border-color: rgba($color-accent, 0.55);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
      color: inherit;

      .project-card__icon {
        color: $color-accent;
      }
    }
  }

  /* ── Head row ──────────────────────────────────────── */
  .project-card__head {
    display: flex;
    align-items: center;
    gap: $space-2;
    min-width: 0;
  }

  .project-card__icon {
    width: 16px;
    height: 16px;
    color: $color-muted;
    flex-shrink: 0;
    transition: color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .project-card__name {
    font-family: $font-heading;
    font-size: 0.9375rem;
    font-weight: 600;
    color: $color-accent;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .project-card__badge {
    font-family: $font-mono;
    font-size: 0.6875rem;
    color: $color-muted;
    border: 1px solid $color-border;
    border-radius: 999px;
    padding: 1px 8px;
    margin-left: auto;
    flex-shrink: 0;
  }

  /* ── Description ───────────────────────────────────── */
  .project-card__desc {
    font-size: 0.8125rem;
    color: $color-muted;
    line-height: 1.5;
    @include line-clamp(2);
    /* Reserve space for 2 lines so cards stay aligned in the grid */
    min-height: 2.4375rem;
  }

  /* ── Bottom meta ───────────────────────────────────── */
  .project-card__meta {
    display: flex;
    align-items: center;
    gap: $space-3;
    margin-top: auto;
    flex-wrap: wrap;
  }

  .project-card__lang {
    display: inline-flex;
    align-items: center;
    gap: $space-1;
    font-family: $font-mono;
    font-size: 0.75rem;
    color: $color-muted;
  }

  .project-card__dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .project-card__stat {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-family: $font-mono;
    font-size: 0.75rem;
    color: $color-muted;

    svg {
      width: 14px;
      height: 14px;
    }
  }

  .project-card__updated {
    margin-left: auto;
  }

  /* Keep the meta row from wrapping awkwardly on very small screens */
  @media (max-width: 400px) {
    .project-card__updated {
      margin-left: 0;
    }
  }
</style>
