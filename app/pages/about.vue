<!--
pages/about.vue
simple about page
this page is not completed yet
-->

<template>
  <main class="about-container">
    <div class="content-wrapper">
      <!-- Top Minimal Header -->
      <header class="about-header elegant-fade-up delay-100">
        <h1 class="page-title">nayan_das / about</h1>
        <p class="role-subtitle">Full-Stack Engineer & Cross-Platform Creator</p>
      </header>

      <div class="about-grid">
        <!-- Left Column: Image & Quick Links -->
        <aside class="sidebar elegant-fade-up delay-200">
          <div class="profile-card">
            <div class="image-container">
              <img
                src="https://avatars.githubusercontent.com/u/174907517?v=4"
                alt="Nayan Das"
                class="profile-img"
              />
              <div class="image-overlay"></div>
            </div>
            <div class="status-indicator">
              <span class="pulse"></span>
              <span>Available for new projects</span>
            </div>
          </div>

          <nav class="quick-links" :class="{ 'hidden-on-scroll': hideLinksOnMobile }">
            <h3 class="nav-title">Connect</h3>
            <ul class="link-list">
              <li><a href="https://github.com/nayandas69" class="nav-link">github ↗</a></li>
              <li><a href="https://x.com/nayandas69" class="nav-link">x ↗</a></li>
              <li>
                <a href="https://bsky.app/profile/nayandas69.bsky.social" class="nav-link"
                  >bluesky ↗</a
                >
              </li>
              <li><a href="#" class="nav-link">resume.pdf ↓</a></li>
            </ul>
          </nav>
        </aside>

        <!-- Right Column: main prose -->
        <article class="prose-content elegant-fade-up delay-300">
          <section class="text-section intro-section">
            <p class="lead-text">
              Hello. I'm <strong class="highlight">Nayan</strong>, an independent software engineer
              who loves turning ambitious ideas into reality. My core expertise lies in building
              high-performance
              <strong class="highlight">Android, iOS, PC, and Mac applications</strong>, and I also
              work extensively as a <strong class="highlight">Full-Stack Web Developer</strong>.
            </p>
            <p>
              I don't just write code; I architect solutions that live on the devices people use
              every single day. From a fluid mobile app layout to a robust server-side architecture,
              I thrive on the challenge of building scalable ecosystems spanning multiple platforms.
            </p>
          </section>

          <div class="divider"></div>

          <section class="text-section">
            <h2 class="section-title">01 / How I Build</h2>
            <p>
              Developing for varied platforms demands a deep appreciation for human-computer
              interaction. My approach centers on <strong class="highlight">adaptability</strong>,
              <strong class="highlight">performance</strong>, and
              <strong class="highlight">clean architecture</strong>.
            </p>
            <p>
              Whether I'm optimizing memory for mobile or designing a highly responsive web
              interface, I believe the codebase must be as elegant as the UI it powers. I refuse to
              ship software that feels sluggish—performance is a feature, never an afterthought.
            </p>
          </section>

          <div class="divider"></div>

          <section class="text-section">
            <h2 class="section-title">02 / The Developer Mindset</h2>
            <p>
              The tech industry evolves at breakneck speed. What keeps me motivated is the infinite
              landscape of things left to learn. I enjoy diving into complex system architectures,
              exploring new frameworks, and refactoring code until it runs flawlessly.
            </p>
            <p>
              There is an unmatched sense of satisfaction in compiling a massive project and
              watching it run smoothly across a smartphone, a tablet, and a desktop machine
              simultaneously.
            </p>
          </section>

          <div class="divider"></div>

          <section class="text-section">
            <h2 class="section-title">03 / When I'm Offline</h2>
            <p>
              While I spend a massive chunk of my life in code editors and terminals, I step back to
              maintain perspective. When I'm not pushing commits, you might catch me dissecting the
              UX of trending apps, experimenting with tech stacks for quirky side projects, or
              sharing knowledge with developer communities.
            </p>
            <p>
              I'm always open to talking about code, modern systems design, or new ventures. Check
              out my <NuxtLink to="/" class="text-link">projects</NuxtLink> or
              <NuxtLink to="/contact" class="text-link">reach out</NuxtLink> if you're ready to
              build something incredible together.
            </p>
          </section>
        </article>
      </div>
    </div>
  </main>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';

  useHead({
    title: 'About - Nayan Das',
    meta: [
      {
        name: 'description',
        content: 'About Nayan Das - Full-Stack Engineer & Cross-Platform Creator.',
      },
    ],
  });

  // Scroll listener logic to hide/show Connect links on mobile
  const hideLinksOnMobile = ref(false);
  let lastScrollPosition = 0;

  const handleScroll = () => {
    // Only apply this logic on screens smaller than 800px
    if (window.innerWidth <= 800) {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      // Scrolling down (hide links)
      if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 50) {
        hideLinksOnMobile.value = true;
      }
      // Scrolling up (show links)
      else if (currentScrollPosition < lastScrollPosition) {
        hideLinksOnMobile.value = false;
      }

      lastScrollPosition = currentScrollPosition;
    } else {
      // Make sure it's always visible on desktop
      hideLinksOnMobile.value = false;
    }
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check once on load
    handleScroll();
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
</script>

<style lang="scss" scoped>
  // ── Base Layout & Theme Matching ───────────────
  .about-container {
    min-height: 100vh;
    background-color: transparent;
    color: #a1a1aa;
    font-family:
      'Inter',
      ui-sans-serif,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      sans-serif;
    padding: 4rem 1.5rem 8rem 1.5rem;
    display: flex;
    justify-content: center;
  }

  .content-wrapper {
    max-width: 1000px;
    width: 100%;
  }

  // ── Header Styling ─────────────────────────────
  .about-header {
    margin-bottom: 4rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .page-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 0.5rem 0;
    letter-spacing: -0.04em;
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
      monospace;
  }

  .role-subtitle {
    font-size: 1.1rem;
    color: #71717a;
    margin: 0;
    font-weight: 400;
  }

  // ── Main Grid Layout ───────────────────────────
  .about-grid {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 4rem;
    align-items: start;

    @media (max-width: 800px) {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }

  // ── Sidebar & Image ────────────────────────────
  .sidebar {
    position: sticky;
    top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @media (max-width: 800px) {
      position: sticky;
      top: 1rem;
      z-index: 10;
    }
  }

  .profile-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .image-container {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: #050505;

    &:hover .profile-img {
      filter: grayscale(0%);
    }
  }

  .profile-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
    transition: filter 0.5s ease;
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent 50%);
    pointer-events: none;
  }

  // ── Status Indicator ───────────────────────────
  .status-indicator {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.85rem;
    color: #d4d4d8;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    backdrop-filter: blur(10px);
  }

  .pulse {
    width: 8px;
    height: 8px;
    background-color: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
    animation: pulse-ring 2s infinite cubic-bezier(0.66, 0, 0, 1);
  }

  @keyframes pulse-ring {
    to {
      box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
    }
  }

  // ── Navigation Links ───────────────────────────
  .quick-links {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 1.5rem;
    backdrop-filter: blur(10px);
    transition:
      opacity 0.4s ease,
      transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1),
      max-height 0.4s ease,
      margin 0.4s ease,
      padding 0.4s ease;
    transform-origin: top;
    max-height: 400px;
    overflow: hidden;

    &.hidden-on-scroll {
      opacity: 0;
      transform: scaleY(0.9);
      max-height: 0;
      padding-top: 0;
      padding-bottom: 0;
      margin-top: 0;
      border-width: 0;
      pointer-events: none;
    }
  }

  .nav-title {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #52525b;
    margin: 0 0 1rem 0;
    font-weight: 600;
  }

  .link-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .nav-link {
    color: #a1a1aa;
    text-decoration: none;
    font-size: 0.95rem;
    transition:
      color 0.2s ease,
      padding-left 0.2s ease;
    display: block;

    &:hover {
      color: #ffffff;
      padding-left: 5px;
    }
  }

  // ── Prose Content Formatting ───────────────────
  .prose-content {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .text-section {
    p {
      line-height: 1.8;
      margin-bottom: 1.25rem;
      font-size: 1.05rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .lead-text {
    font-size: 1.2rem !important;
    color: #d4d4d8;
    line-height: 1.7 !important;
  }

  .highlight {
    color: #ffffff;
    font-weight: 500;
  }

  .section-title {
    font-size: 1.1rem;
    color: #ffffff;
    margin: 0 0 1rem 0;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .divider {
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.08);
  }

  .text-link {
    color: #3b82f6;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition:
      border-color 0.2s ease,
      color 0.2s ease;

    &:hover {
      color: #60a5fa;
      border-bottom-color: #60a5fa;
    }
  }
</style>
