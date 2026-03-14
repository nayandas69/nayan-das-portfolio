<!--
  AppFooter
  Simple footer with copyright and a colophon line.
-->
<template>
  <footer class="footer fade-up">
    <p class="footer__copy">
      &copy; {{ year }}
      <a href="https://github.com/nayandas69" target="_blank" rel="noopener noreferrer">
        {{ profile.name }}
      </a>
      &nbsp;&middot;&nbsp; Source code on
      <a
        href="https://github.com/nayandas69/nayan-das-portfolio"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </p>
  </footer>
</template>

<script setup lang="ts">
  const { profile } = useAppConfig();
  const year = new Date().getFullYear();
</script>

<style lang="scss" scoped>
  .footer {
    padding-top: $space-8;
    padding-bottom: $space-6;
    display: flex;
  }

  .footer__copy {
    font-family: $font-mono;
    font-size: 0.75rem;
    color: $color-muted;

    a {
      color: $color-muted;
      text-decoration: underline;
      text-underline-offset: 2px;

      &:hover {
        color: $color-text;
      }
    }
  }
</style>
