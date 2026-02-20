<!--
  ProjectsSection
  Auto-fetches public GitHub repos and renders them in a 2-column grid.
  Shows skeleton loaders while data is loading.
-->
<template>
  <section class="section fade-up" aria-labelledby="projects-title">
    <h2 id="projects-title" class="section__title">projects</h2>

    <!-- Loading skeleton cards -->
    <div v-if="loading" class="projects__grid">
      <div v-for="n in 6" :key="n" class="projects__skeleton">
        <div class="skeleton" style="height: 16px; width: 60%" />
        <div class="skeleton" style="height: 12px; width: 90%; margin-top: 12px" />
        <div class="skeleton" style="height: 12px; width: 40%; margin-top: 16px" />
      </div>
    </div>

    <!-- Error state -->
    <p v-else-if="error" class="projects__error">Failed to load repositories. Check back later.</p>

    <!-- Repo cards grid -->
    <div v-else-if="repos?.length" class="projects__grid">
      <ProjectCard v-for="repo in repos" :key="repo.name" :repo="repo" />
    </div>

    <!-- Empty state fallback -->
    <p v-else class="projects__empty">No repositories found.</p>

    <!-- View all link -->
    <a
      href="https://github.com/nayandas69?tab=repositories"
      class="projects__all"
      target="_blank"
      rel="noopener noreferrer"
    >
      view all repositories
      <IconArrow />
    </a>
  </section>
</template>

<script setup>
  import IconArrow from '~/components/icons/IconArrow.vue';

  /**
   * Fetch 6 most recently pushed public repos.
   * useGithubRepos is auto-imported from ~/composables/
   */
  const { repos, loading, error } = useGithubRepos('nayandas69', 6);
</script>

<style lang="scss" scoped>
  /* ── 2-column grid (1 col on mobile) ──────────────── */
  .projects__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-4;

    @include sm {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* ── Skeleton card placeholder ────────────────────── */
  .projects__skeleton {
    @include card;
    padding: $space-5;
  }

  /* ── Error / empty text ───────────────────────────── */
  .projects__error,
  .projects__empty {
    font-size: 0.875rem;
    color: $color-muted;
  }

  /* ── "View all" link ──────────────────────────────── */
  .projects__all {
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
