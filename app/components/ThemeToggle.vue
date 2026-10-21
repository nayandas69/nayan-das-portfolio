<!--
  ThemeToggle
  Fixed in the top corner: switches between the light and dark palettes.
  Both icons are rendered and CSS reveals the one matching the active theme,
  so the correct icon shows before hydration (no flash, no mismatch).
-->
<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    :title="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggle"
  >
    <IconSun class="theme-toggle__icon theme-toggle__icon--sun" />
    <IconMoon class="theme-toggle__icon theme-toggle__icon--moon" />
  </button>
</template>

<script setup lang="ts">
  import IconMoon from '~/components/icons/IconMoon.vue';
  import IconSun from '~/components/icons/IconSun.vue';

  const { theme, toggle } = useTheme();
</script>

<style lang="scss" scoped>
  .theme-toggle {
    position: fixed;
    top: $space-5;
    right: $space-5;
    z-index: 100;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    padding: 0;
    border-radius: 50%;
    border: 1px solid $color-border;
    background: color-mix(in srgb, $color-surface 75%, transparent);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    color: $color-muted;
    cursor: pointer;
    @include transition(all, 0.25s);

    &:hover {
      color: $color-text;
      border-color: color-mix(in srgb, $color-accent 45%, transparent);
      transform: translateY(-1px);
    }

    &:focus-visible {
      @include focus-ring;
    }

    &__icon {
      width: 18px;
      height: 18px;
      display: block;
    }

    /* Dark theme (default) shows the moon, light theme shows the sun */
    &__icon--sun {
      display: none;
    }
  }
</style>

<!--
  Theme-driven icon switch.

  Deliberately NOT scoped: these rules key off `<html data-theme="light">`,
  which lives outside this component's scope root, so they cannot be expressed
  in the scoped block. Written there as `:global(html[data-theme='light'])
  .theme-toggle { … }` the scoped compiler flattened the descendant selectors
  away and emitted `html[data-theme='light'] { display: none }` — hiding the
  entire page in light mode.
-->
<style lang="scss">
  /* Light theme shows the sun and hides the moon */
  html[data-theme='light'] .theme-toggle .theme-toggle__icon--sun {
    display: block;
  }

  html[data-theme='light'] .theme-toggle .theme-toggle__icon--moon {
    display: none;
  }
</style>
