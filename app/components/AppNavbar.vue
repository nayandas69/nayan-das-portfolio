<!--
  components/AppNavbar.vue
  Floating capsule-style bottom navigation.
  Each item shows an icon + text label; the active item gets an accent glow.
-->

<template>
  <nav class="navbar-wrapper" aria-label="Main navigation">
    <div class="navbar-capsule">
      <ul class="navbar-links">
        <li v-for="(item, i) in navItems" :key="item.label" class="nav-item" :style="{ '--i': i }">
          <!-- Internal Link -->
          <NuxtLink
            v-if="!item.external"
            :to="item.path"
            class="nav-link"
            exact-active-class="is-active"
          >
            <span class="nav-link__icon"><component :is="item.icon" /></span>
            <span class="nav-link__label">{{ item.label }}</span>
          </NuxtLink>

          <!-- External Link -->
          <a v-else :href="item.path" class="nav-link" target="_blank" rel="noopener noreferrer">
            <span class="nav-link__icon"><component :is="item.icon" /></span>
            <span class="nav-link__label">{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import IconHome from '~/components/icons/IconHome.vue';
  import IconBlog from '~/components/icons/IconBlog.vue';
  import IconGallery from '~/components/icons/IconGallery.vue';
  import IconContact from '~/components/icons/IconMail.vue';
  import IconAbout from '~/components/icons/IconAbout.vue';

  /**
   * Access centralized config
   */
  const { api } = useAppConfig();

  /**
   * Navigation links — each with label, path, and icon component.
   * Blog is an external URL. Order: Home, Blog, Gallery, Contact, About.
   */
  const navItems = [
    { label: 'Home', path: '/', external: false, icon: IconHome },
    { label: 'Blog', path: api.blogverse.replace('/api/v1', ''), external: true, icon: IconBlog },
    { label: 'Gallery', path: '/gallery', external: false, icon: IconGallery },
    { label: 'Contact', path: '/contact', external: false, icon: IconContact },
    { label: 'About', path: '/about', external: false, icon: IconAbout },
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
    padding: 0 $space-4;
    pointer-events: none; /* Let clicks pass through to content behind gaps */
  }

  .navbar-capsule {
    pointer-events: auto; /* Enable clicks on the menu itself */
    background: rgba($color-surface, 0.75);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba($color-border, 0.9);
    border-radius: $space-6;
    padding: $space-2 0.625rem;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
    animation: navbarRise 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
    will-change: transform, opacity;

    /* Subtle top highlight for a glassy feel */
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent 40%);
    }
  }

  .navbar-links {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: stretch;
    gap: $space-1;
  }

  .nav-item {
    animation: navItemRise 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
    animation-delay: calc(0.12s + var(--i) * 0.06s);
    will-change: transform, opacity;
  }

  .nav-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0.625rem 0.875rem;
    font-family: $font-body;
    font-size: 0.6875rem;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: $color-muted;
    text-decoration: none;
    border-radius: $space-4;
    transition:
      color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
      background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);

    &__icon {
      display: flex;

      svg {
        width: 18px;
        height: 18px;
        transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
    }

    /* Text is shown only for the active item; icons only otherwise */
    &__label {
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transition:
        max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1),
        opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    &:hover {
      color: $color-text;
      background: rgba(255, 255, 255, 0.06);

      .nav-link__icon svg {
        transform: translateY(-2px);
      }
    }

    &.is-active {
      color: #ffffff;
      font-weight: 600;
      background: rgba($color-accent, 0.14);
      box-shadow:
        0 4px 18px rgba($color-accent, 0.25),
        inset 0 0 0 1px rgba($color-accent, 0.25);

      .nav-link__icon {
        color: $color-accent;
      }

      .nav-link__icon svg {
        transform: translateY(-1px);
      }

      .nav-link__label {
        max-height: 1.25rem;
        opacity: 1;
      }
    }
  }

  @keyframes navbarRise {
    from {
      opacity: 0;
      transform: translateY(24px) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes navItemRise {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Mobile adjustments */
  @media (max-width: $bp-sm) {
    .navbar-wrapper {
      bottom: $space-4;
    }

    .nav-link {
      padding: 0.4375rem 0.625rem;

      &__icon svg {
        width: 17px;
        height: 17px;
      }
    }
  }
</style>
