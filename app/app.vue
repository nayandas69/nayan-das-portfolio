<!--
  App Root
  Renders the default layout via <NuxtLayout> and the active page via <NuxtPage>.
  Applies blur reveal effect on mount.
-->
<template>
  <div class="app-wrapper">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue';

  onMounted(() => {
    // Add blur reveal class to trigger animation
    const html = document.documentElement;
    html.classList.add('blur-reveal-mode');
  });
</script>

<style>
  html.blur-reveal-mode {
    /* Ensure initial state has blur */
    filter: blur(0);
  }

  html.blur-reveal-mode * {
    opacity: 0;
    filter: blur(16px);
  }
</style>
