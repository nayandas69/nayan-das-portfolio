<!-- 
pages/gallery.vue
simple gallery page
this page is not completed yet
-->

<template>
  <main class="gallery-wrapper">
    <!-- Breadcrumb-style Header Matching About Page -->
    <div class="gallery-header host-fade-up delay-100">
      <h1 class="page-title">/gallery</h1>
      <p class="role-subtitle">Visual Archive & Personal Photography</p>
      <p class="page-desc">
        A curated collection of digital craft and moments captured through my lens.
      </p>
    </div>

    <!-- Section 1: Selected Visuals (Work/Setup) -->
    <section class="gallery-section">
      <div class="section-header">
        <h2 class="section-title">01 / Selected Visuals</h2>
      </div>

      <div class="gallery-list">
        <NuxtLink
          v-for="(item, index) in galleryItems"
          :key="index"
          to="#"
          class="gallery-row host-fade-up"
          :style="{ transitionDelay: `${(index + 2) * 100}ms` }"
        >
          <div class="row-info">
            <span class="row-index">0{{ index + 1 }}</span>
            <div class="title-group">
              <h3 class="row-title">{{ item.title }}</h3>
              <span class="row-category">{{ item.category }}</span>
            </div>
          </div>

          <div class="row-image">
            <div class="image-reveal">
              <img :src="item.src" :alt="item.title" loading="lazy" />
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Section 2: Personal Photography (Real Face/Moments) -->
    <section class="gallery-section p-top-md">
      <div class="section-header">
        <h2 class="section-title">02 / Personal Photography</h2>
      </div>

      <div class="photo-grid">
        <div
          v-for="(photo, index) in photographyItems"
          :key="index"
          class="photo-card host-fade-up"
          :style="{ transitionDelay: `${(index + 1) * 100}ms` }"
        >
          <div class="photo-wrapper">
            <img :src="photo.src" :alt="photo.alt" loading="lazy" />
            <div class="photo-overlay">
              <span class="photo-tag">{{ photo.tag }}</span>
            </div>
          </div>
          <div class="photo-info">
            <h4 class="photo-title">{{ photo.title }}</h4>
            <p class="photo-date">{{ photo.date }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const { profile } = useAppConfig();

  useHead({
    title: `Gallery - ${profile.name}`,
    meta: [
      {
        name: 'description',
        content: `Selected visuals and personal photography by ${profile.name}.`,
      },
    ],
  });

  // Section 1: Selected Visuals
  interface GalleryItem {
    title: string;
    category: string;
    src: string;
  }
  const galleryItems = ref<GalleryItem[]>([
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

  // Section 2: Personal Photography
  interface PhotographyItem {
    title: string;
    tag: string;
    date: string;
    src: string;
    alt: string;
  }
  const photographyItems = ref<PhotographyItem[]>([
    {
      title: 'Evening Glow',
      tag: 'Portrait',
      date: 'Late 2020',
      src: '/images/nayan-das.jpg',
      alt: `Silhouette self portrait of ${profile.name} during sunset`,
    },
    {
      title: 'Caramel Delight',
      tag: 'Food',
      date: 'Winter 2021',
      src: '/images/food.jpg',
      alt: 'Sweet Dessert',
    },
    {
      title: 'River at Dusk',
      tag: 'Landscape',
      date: 'Summer 2022',
      src: '/images/river.jpg',
      alt: 'Twilight River',
    },
    {
      title: 'Sunset Photography',
      tag: 'Sunset',
      date: 'Summer 2022',
      src: '/images/sunset.jpg',
      alt: 'Sunset moment',
    },
  ]);
</script>

<style lang="scss" scoped>
  // ── Gallery Wrapper ────────────────────────────
  .gallery-wrapper {
    min-height: 100vh;
    padding: 4rem 1.5rem 10rem 1.5rem;
    max-width: 1100px;
    margin: 0 auto;
    background-color: transparent;
    color: #a1a1aa;
    font-family: 'Inter', sans-serif;
  }

  // ── Header Styling (Matching About Page) ───────
  .gallery-header {
    margin-bottom: 5rem;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .page-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 0.5rem 0;
    letter-spacing: -0.04em;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }

  .role-subtitle {
    font-size: 1.125rem;
    color: #ffffff;
    margin: 0 0 1.25rem 0;
    font-weight: 500;
  }

  .page-desc {
    font-size: 1.05rem;
    color: #71717a;
    max-width: 650px;
    line-height: 1.7;
  }

  // ── Sections ───────────────────────────────────
  .gallery-section {
    margin-bottom: 10rem;

    &.p-top-md {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 5rem;
    }
  }

  .section-header {
    margin-bottom: 4rem;

    .section-title {
      font-size: 0.8125rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      color: #ffffff;
      text-transform: uppercase;
      opacity: 0.8;
      display: flex;
      align-items: center;
      gap: 1rem;

      &::after {
        content: '';
        height: 1px;
        flex: 1;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0.1), transparent);
      }
    }
  }

  // ── Section 1: List Layout ─────────────────────
  .gallery-list {
    display: flex;
    flex-direction: column;
  }

  .gallery-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    padding: 4rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    text-decoration: none;
    color: inherit;
    align-items: center;
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover {
      border-bottom-color: rgba(255, 255, 255, 0.2);

      .row-title {
        color: #ffffff;
        transform: translateX(15px);
      }

      .row-category {
        opacity: 1;
        transform: translateY(0);
      }

      .image-reveal img {
        filter: grayscale(0%) brightness(1.1);
        transform: scale(1.08);
      }
    }
  }

  .row-info {
    display: flex;
    align-items: center;
    gap: 2.5rem;
  }

  .row-index {
    font-size: 0.75rem;
    color: #3f3f46;
    font-family: ui-monospace, SFMono-Regular, monospace;
    font-weight: 600;
  }

  .title-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .row-title {
    font-size: clamp(1.5rem, 4vw, 2.75rem);
    font-weight: 500;
    margin: 0;
    letter-spacing: -0.03em;
    color: #d4d4d8;
    line-height: 1.1;
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .row-category {
    font-size: 0.75rem;
    color: #71717a;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-family: ui-monospace, SFMono-Regular, monospace;
    opacity: 0.4;
    transform: translateY(10px);
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .row-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background-color: #09090b;
    box-shadow: 0 20px 50px -20px rgba(0, 0, 0, 0.5);
  }

  .image-reveal {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(100%) brightness(0.65);
      transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
    }
  }

  // ── Section 2: Photo Grid Polish ────────────────
  .photo-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3.5rem;
  }

  .photo-card {
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;

    &:hover {
      .photo-wrapper {
        transform: translateY(-8px);
        border-color: rgba(255, 255, 255, 0.3);
        box-shadow:
          0 30px 60px -15px rgba(0, 0, 0, 0.7),
          0 0 20px rgba(255, 255, 255, 0.05);

        img {
          transform: scale(1.1);
        }
      }
      .photo-overlay {
        opacity: 1;
      }
      .photo-title {
        color: #ffffff;
      }
    }
  }

  .photo-wrapper {
    position: relative;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background-color: #09090b;
    margin-bottom: 2rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.4);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .photo-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 60%);
      opacity: 0;
      transition: opacity 0.5s ease;
      display: flex;
      align-items: flex-end;
      padding: 1.5rem;
    }

    .photo-tag {
      font-size: 0.65rem;
      color: #ffffff;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(8px);
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  .photo-info {
    padding: 0 0.5rem;

    .photo-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #e4e4e7;
      line-height: 1.2;
      letter-spacing: -0.01em;
      transition: color 0.3s ease;

      // Force single line to prevent grid distortion
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
    }
    .photo-date {
      font-size: 0.75rem;
      color: #52525b;
      font-family: ui-monospace, SFMono-Regular, monospace;
      text-transform: lowercase;
    }
  }

  // ── Responsive ─────────────────────────────────
  @media (max-width: 1100px) {
    .gallery-wrapper {
      padding: 4rem 1.5rem;
    }

    .photo-grid {
      gap: 2.5rem;
    }

    .row-title {
      font-size: 2.25rem;
    }
  }

  @media (max-width: 900px) {
    .gallery-row {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding: 3rem 0;
    }

    .row-info {
      gap: 1.5rem;
    }

    .photo-grid {
      gap: 2rem;
    }
  }

  @media (max-width: 650px) {
    .gallery-header .page-title {
      font-size: 2rem;
    }

    .photo-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    .photo-info .photo-title {
      font-size: 1.05rem;
    }
  }

  // ── Animations ─────────────────────────────────
  .host-fade-up {
    animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
