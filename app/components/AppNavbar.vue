<!--
  components/AppNavbar.vue
  Classic navigation licks: glass capsule, soft blue glow, active label only.
-->

<template>
  <nav class="navbar-wrapper" aria-label="Main navigation">
    <div class="navbar-capsule">
      <ul class="navbar-links">
        <li
          v-for="(item, index) in navItems"
          :key="item.path"
          class="nav-item"
          :style="{ '--i': index }"
        >
          <NuxtLink
            :to="item.path"
            :aria-label="item.label"
            class="nav-link"
            :class="{ 'is-active': index === activeIndex }"
            :aria-current="
              index === activeIndex ? (route.path === item.path ? 'page' : 'location') : undefined
            "
          >
            <span class="nav-link__icon" aria-hidden="true"><component :is="item.icon" /></span>
            <span class="nav-link__label">{{ item.label }}</span>
          </NuxtLink>
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

  const route = useRoute();
  const navItems = [
    { label: 'Home', path: '/', icon: IconHome },
    { label: 'Blog', path: '/blog', icon: IconBlog },
    { label: 'Gallery', path: '/gallery', icon: IconGallery },
    { label: 'Contact', path: '/contact', icon: IconContact },
    { label: 'About', path: '/about', icon: IconAbout },
  ];
  const activeIndex = computed(() =>
    navItems.findIndex(
      (item) =>
        route.path === item.path || (item.path !== '/' && route.path.startsWith(`${item.path}/`))
    )
  );
</script>

<style lang="scss" scoped>
  .navbar-wrapper {
    position: fixed;
    bottom: calc(#{$space-6} + env(safe-area-inset-bottom, 0px));
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    padding: 0 $space-4;
    pointer-events: none; /* Let clicks pass through to content behind gaps */
  }

  .navbar-capsule {
    position: relative;
    pointer-events: auto; /* Enable clicks on the menu itself */
    max-width: 100%;
    background: $color-surface;
    @supports ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
      background: color-mix(in srgb, $color-surface 90%, transparent);
      -webkit-backdrop-filter: blur(24px) saturate(140%);
      backdrop-filter: blur(24px) saturate(140%);
    }
    border: 1px solid color-mix(in srgb, $color-border 90%, transparent);
    border-radius: $space-6;
    padding: $space-2 0.625rem;
    box-shadow:
      0 8px 32px color-mix(in srgb, $color-text 12%, transparent),
      inset 0 1px 0 color-mix(in srgb, $color-text 6%, transparent);
    animation: navbarRise 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;

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
    min-width: 44px;
    animation: navItemRise 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
    animation-delay: calc(0.12s + var(--i) * 0.06s);
  }

  .nav-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-width: 44px;
    min-height: 44px;
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
      display: none;
      max-width: 100%;
      overflow-wrap: anywhere;
    }

    &:hover {
      color: $color-text;
      background: color-mix(in srgb, $color-text 6%, transparent);

      .nav-link__icon svg {
        transform: translateY(-2px);
      }
    }

    &.is-active {
      color: $color-text;
      font-weight: 600;
      background: color-mix(in srgb, $color-accent 14%, transparent);
      box-shadow:
        0 4px 18px color-mix(in srgb, $color-accent 25%, transparent),
        inset 0 0 0 1px color-mix(in srgb, $color-accent 25%, transparent);

      .nav-link__icon {
        color: $color-accent;
      }

      .nav-link__icon svg {
        transform: translateY(-1px);
      }

      .nav-link__label {
        display: block;
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
      bottom: calc(#{$space-4} + env(safe-area-inset-bottom, 0px));
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
