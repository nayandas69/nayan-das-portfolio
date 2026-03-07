<!-- 
pages/gallery.vue
simple gallery page
this page is not completed yet
-->

<template>
  <main class="gallery-wrapper">
    <div class="gallery-header slide-in-left delay-100">
      <h1 class="page-title">Selected Visuals</h1>
      <p class="page-desc">A minimal collection of moments, spaces, and digital craft.</p>
    </div>

    <!-- Minimal Horizontal/Vertical List -->
    <div class="gallery-list">
      <NuxtLink
        v-for="(item, index) in galleryItems"
        :key="index"
        to="#"
        class="gallery-row slide-in-right"
        :style="{ animationDelay: `${(index + 2) * 100}ms` }"
      >
        <div class="row-info">
          <span class="row-index">0{{ index + 1 }}</span>
          <h2 class="row-title">{{ item.title }}</h2>
          <span class="row-category">{{ item.category }}</span>
        </div>

        <div class="row-image">
          <div class="image-reveal">
            <img :src="item.src" :alt="item.title" loading="lazy" />
          </div>
        </div>
      </NuxtLink>
    </div>
  </main>
</template>

<script setup>
  import { ref } from 'vue';

  useHead({
    title: 'Gallery - Nayan Das',
    meta: [{ name: 'description', content: 'Selected visuals and moments by Nayan Das.' }],
  });

  // Gallery Items (Local or URLs)
  // In this page i use img from internet so img credit goes to the img owner
  const galleryItems = ref([
    {
      title: 'Workspace Setup',
      category: 'Environment',
      src: '/images/photo-1.avif',
    },
    {
      title: 'Code Architecture',
      category: 'Development',
      src: '/images/photo-2.avif',
    },
    {
      title: 'Design System',
      category: 'UI/UX',
      src: '/images/photo-3.avif',
    },
    {
      title: 'Late Night Coffee',
      category: 'Lifestyle',
      src: '/images/photo-4.avif',
    },
    {
      title: 'Mobile App Concept',
      category: 'Design',
      src: '/images/photo-5.avif',
    },
  ]);
</script>

<style lang="scss" scoped>
  // ── Gallery Wrapper ────────────────────────────
  .gallery-wrapper {
    min-height: 100vh;
    background-color: transparent;
    color: #ededed;
    font-family:
      'Inter',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      sans-serif;
    padding: 6rem 2rem 10rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  // ── Gallery Header ─────────────────────────────
  .gallery-header {
    margin-bottom: 6rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .page-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 500;
    letter-spacing: -0.04em;
    margin: 0 0 1rem 0;
    color: #ffffff;
  }

  .page-desc {
    font-size: 1.125rem;
    color: #888888;
    margin: 0;
    font-weight: 400;
  }

  // ── Gallery List Layout ────────────────────────
  .gallery-list {
    display: flex;
    flex-direction: column;
  }

  .gallery-row {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 3rem;
    padding: 3rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    text-decoration: none;
    color: inherit;
    align-items: center;
    transition: border-color 0.3s ease;
    position: relative;

    &:hover {
      border-bottom-color: rgba(255, 255, 255, 0.2);

      .row-title {
        transform: translateX(10px);
        color: #ffffff;
      }

      .row-category {
        opacity: 1;
        transform: translateX(0);
      }

      .image-reveal img {
        filter: grayscale(0%) brightness(1);
        transform: scale(1);
      }
    }
  }

  // ── Row Info ───────────────────────────────────
  .row-info {
    display: grid;
    grid-template-columns: 50px 1fr auto;
    align-items: baseline;
    gap: 2rem;
    z-index: 2;
  }

  .row-index {
    font-size: 0.875rem;
    color: #555555;
    font-variant-numeric: tabular-nums;
  }

  .row-title {
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 500;
    margin: 0;
    letter-spacing: -0.02em;
    transform: translateX(0);
    transition:
      transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
      color 0.3s ease;
  }

  .row-category {
    font-size: 0.875rem;
    color: #888888;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0;
    transform: translateX(-10px);
    transition:
      opacity 0.4s ease,
      transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  // ── Row Image ──────────────────────────────────
  .row-image {
    height: 250px;
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    background: rgba(255, 255, 255, 0.02);
  }

  .image-reveal {
    width: 100%;
    height: 100%;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(100%) brightness(0.7);
      transform: scale(1.05);
      transition:
        filter 0.6s ease,
        transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
  }

  // ── Tablet & Mobile Responsive ─────────────────
  @media (max-width: 900px) {
    .gallery-row {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding: 2rem 0;

      &:hover .row-title {
        transform: none;
      }
    }

    .row-info {
      grid-template-columns: 40px 1fr;
      align-items: center;
    }

    .row-title {
      font-size: 1.75rem;
    }

    .row-category {
      display: none;
    }

    .row-image {
      height: 300px;
    }
  }
</style>
