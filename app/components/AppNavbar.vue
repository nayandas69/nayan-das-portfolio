<!--
  components/AppNavbar.vue
  Floating capsule-style bottom navigation.
  Features Home, Blog (External), Gallery, Contact, and About links.
-->

<template>
  <nav class="navbar-wrapper section-fade-up">
    <div class="navbar-capsule">
      <ul class="navbar-links">
        <li v-for="item in navItems" :key="item.label" class="nav-item">
          <!-- Internal Link -->
          <NuxtLink v-if="!item.external" :to="item.path" class="nav-link" active-class="is-active">
            {{ item.label }}
          </NuxtLink>

          <!-- External Link -->
          <a v-else :href="item.path" class="nav-link" target="_blank" rel="noopener noreferrer">
            {{ item.label }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
  /**
   * Access centralized config
   */
  const { api } = useAppConfig();

  /**
   * Navigation links as requested.
   * Blog is an external URL. Order: Home, Blog, Gallery, Contact, About.
   */
  const navItems = [
    { label: 'Home', path: '/', external: false },
    { label: 'Blog', path: api.blogverse.replace('/api/v1', ''), external: true },
    { label: 'Gallery', path: '/gallery', external: false },
    { label: 'Contact', path: '/contact', external: false },
    { label: 'About', path: '/about', external: false },
  ];
</script>

<style lang="scss" scoped>
  .navbar-wrapper {
    position: fixed;
    bottom: $space-6;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    pointer-events: none; /* Let clicks pass through to content behind gaps */
  }

  .navbar-capsule {
    pointer-events: auto; /* Enable clicks on the menu itself */
    background: rgba($color-surface, 0.7);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid rgba($color-border, 0.8);
    border-radius: 100px;
    padding: 0.5rem;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
    @include transition(all);

    &:hover {
      border-color: rgba($color-accent, 0.3);
      background: rgba($color-surface, 0.8);
    }
  }

  .navbar-links {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .nav-link {
    display: block;
    padding: 0.625rem 1.25rem;
    font-family: $font-body;
    font-size: 0.875rem;
    font-weight: 500;
    color: $color-muted;
    text-decoration: none;
    border-radius: 100px;
    @include transition(all);

    &:hover {
      color: $color-text;
      background: rgba(255, 255, 255, 0.05);
    }

    &.is-active {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.1);
      font-weight: 600;
    }
  }

  /* Mobile adjustments */
  @media (max-width: $bp-sm) {
    .navbar-wrapper {
      bottom: $space-4;
    }

    .nav-link {
      padding: 0.5rem 0.875rem;
      font-size: 0.8125rem;
    }
  }
</style>
