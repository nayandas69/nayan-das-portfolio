<template>
  <section class="section" aria-labelledby="articles-title">
    <h2 id="articles-title" class="section__title">articles</h2>
    <BlogPostList :posts="posts" heading-level="h3" />
    <NuxtLink to="/blog" class="articles-all">Read all articles</NuxtLink>
  </section>
</template>

<script setup lang="ts">
  const posts = useBlogPosts(5);
</script>

<style scoped lang="scss">
  .articles-all {
    display: inline-block;
    margin-top: $space-5;
    color: $color-accent;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
</style>
