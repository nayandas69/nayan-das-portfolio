<!--
  Error Page (404 & other errors)
  Custom error page — shows a stylish "Nayan Das" name with a
  cheeky message when someone lands on a route that doesn't exist.
  Uses clearError() from Nuxt to navigate back to home.
-->
<template>
  <div class="error-page">
    <div class="error-page__container">
      <!-- Big status code -->
      <p class="error-page__code">{{ error?.statusCode || 404 }}</p>

      <!-- Stylish name -->
      <h1 class="error-page__name">nayan das</h1>

      <!-- Cheeky message -->
      <p class="error-page__message">
        {{ message }}
      </p>

      <!-- Sub text -->
      <p class="error-page__sub">this page ain't it. go back home and lics the real stuff.</p>

      <!-- Back home button -->
      <button class="error-page__btn" @click="goHome">take me home</button>
    </div>
  </div>
</template>

<script setup>
  /**
   * Nuxt auto-injects the `error` prop into error.vue.
   * Contains statusCode and message from the thrown error.
   */
  const props = defineProps({
    error: {
      type: Object,
      default: () => ({}),
    },
  });

  /**
   * Pick a fun message based on the status code.
   */
  const message = computed(() => {
    const code = props.error?.statusCode;

    if (code === 404) {
      return "yo, nayan das didn't build this page for you. why you even here?";
    }
    if (code === 500) {
      return 'something broke internally. not my fault... probably.';
    }
    return props.error?.message || "you're lost. this route doesn't exist homie.";
  });

  /**
   * Navigate back to home and clear the error state.
   */
  const goHome = () => clearError({ redirect: '/' });
</script>

<style lang="scss" scoped>
  .error-page {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $color-bg;
    padding: $space-5;
  }

  .error-page__container {
    text-align: center;
    max-width: 480px;
  }

  /* ── Status code ───────────────────────────────────── */
  .error-page__code {
    font-family: $font-mono;
    font-size: 8rem;
    font-weight: 700;
    line-height: 1;
    color: $color-border;
    letter-spacing: -0.04em;
    margin-bottom: $space-2;
    user-select: none;

    @include md {
      font-size: 10rem;
    }
  }

  /* ── Stylish name ──────────────────────────────────── */
  .error-page__name {
    font-family: $font-heading;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: $color-text;
    margin-bottom: $space-5;

    @include md {
      font-size: 2.75rem;
    }
  }

  /* ── Main message ──────────────────────────────────── */
  .error-page__message {
    font-family: $font-body;
    font-size: 1.0625rem;
    line-height: 1.7;
    color: $color-muted;
    margin-bottom: $space-3;
  }

  /* ── Sub text ──────────────────────────────────────── */
  .error-page__sub {
    font-family: $font-mono;
    font-size: 0.8125rem;
    color: color.adjust($color-muted, $lightness: -12%);
    margin-bottom: $space-7;
  }

  /* ── Home button ───────────────────────────────────── */
  .error-page__btn {
    display: inline-block;
    font-family: $font-mono;
    font-size: 0.875rem;
    font-weight: 500;
    color: $color-bg;
    background-color: $color-text;
    border: none;
    border-radius: $border-radius;
    padding: $space-3 $space-6;
    cursor: pointer;
    @include transition(background-color);

    &:hover {
      background-color: $color-accent;
    }

    &:focus-visible {
      @include focus-ring;
    }
  }
</style>
