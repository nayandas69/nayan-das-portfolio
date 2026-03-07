<!--
  pages/index.vue
  Portfolio homepage — assembles all sections:
  Header (name + socials + bio), Projects (GitHub), Articles (Blog), Footer.
-->
<template>
  <main class="home">
    <!-- Header: name, social links, bio -->
    <AppHeader />

    <!-- Projects: auto-fetched GitHub repos in card grid -->
    <ProjectsSection class="motion-blur delay-400" />

    <!-- Articles: auto-fetched blog posts from Blogverse API -->
    <ArticlesSection class="motion-blur delay-500" />

    <!-- Footer: copyright + colophon -->
    <AppFooter class="motion-blur delay-600" />
  </main>
</template>

<script setup>
  /**
   * SEO meta tags for the homepage.
   * useHead is auto-imported by Nuxt 3.
   */
  useHead({
    title: 'Nayan Das — Developer & Creator',
    meta: [
      {
        name: 'description',
        content:
          'Portfolio of Nayan Das — a developer and creator who builds open-source tools and writes about code.',
      },
      { property: 'og:image', content: 'https://nayan-das-portfolio-navy.vercel.app/look.png' },
    ],
  });
</script>

<style lang="scss" scoped>
  .home {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
