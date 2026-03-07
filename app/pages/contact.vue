<!--
  pages/contact.vue
  Contact Page — Community-first with Discord, Cal.com scheduling, and Direct Mail.
  Aligned with the Homepage layout.
-->

<template>
  <main class="contact-page">
    <!-- Header: Consistent with AppHeader -->
    <header class="contact-header">
      <h1 class="contact-title motion-blur delay-100">/contact</h1>

      <!-- Social links row (shared social pattern) -->
      <nav class="contact-nav motion-blur delay-200" aria-label="Social links">
        <a
          v-for="link in socials"
          :key="link.label"
          :href="link.url"
          class="contact-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <component :is="link.icon" />
          <span>{{ link.label }}</span>
        </a>
      </nav>

      <p class="contact-tagline motion-blur delay-300">
        I’m currently available for new projects and speaking opportunities. Select a method below
        to start a conversation.
      </p>
    </header>

    <!-- Main Content Area -->
    <section class="contact-content motion-blur delay-400">
      <!-- 01 / Community (Discord) -->
      <div class="content-section">
        <h2 class="section-title">01 / Community</h2>
        <div class="contact-card discord-card">
          <div class="card-header">
            <div class="discord-icon">
              <!-- Simple Discord SVG -->
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.23 10.23 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
                />
              </svg>
            </div>
            <div class="card-status" v-if="discordData">
              <span class="dot active"></span>
              {{ discordData.presence_count }} Online
            </div>
          </div>
          <h3 class="card-title">Project Zenitsu</h3>
          <p class="card-description">
            Join my Discord server to chat about code, get help with projects, or just hangout with
            other creators.
          </p>
          <a href="https://discord.gg/u9XfHZN8K9" target="_blank" class="cta-button discord-btn">
            Join Server
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>
        </div>
      </div>

      <div class="divider"></div>

      <!-- 02 / Schedule (Cal.com) -->
      <div class="content-section">
        <h2 class="section-title">02 / Schedule a sync</h2>
        <div class="contact-card cal-card">
          <div class="card-header">
            <div class="meeting-badge">
              <span class="dot pulse"></span>
              15 Min Meeting
            </div>
          </div>
          <h3 class="card-title">Let's hop on a call</h3>
          <p class="card-description">
            Best for new project discussions or detailed consultations. I typically have slots
            available throughout the week.
          </p>
          <a href="https://cal.com/nayandas69/15min" target="_blank" class="cta-button cal-btn">
            Schedule on Cal.com
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>
        </div>
      </div>

      <div class="divider"></div>

      <!-- 03 / Direct (Mail) -->
      <div class="content-section">
        <h2 class="section-title">03 / Direct line</h2>
        <p class="direct-text">
          Prefer a long-form message? Reach me directly via email at:
          <a href="mailto:nayanchandradas@hotmail.com" class="text-link"
            >nayanchandradas@hotmail.com</a
          >
        </p>
      </div>
    </section>
  </main>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import IconGithub from '~/components/icons/IconGithub.vue';
  import IconX from '~/components/icons/IconX.vue';
  import IconDiscord from '~/components/icons/IconDiscord.vue';
  import IconMail from '~/components/icons/IconMail.vue';

  // --- Header Socials ---
  const socials = [
    { label: 'github', url: 'https://github.com/nayandas69', icon: IconGithub },
    { label: 'x', url: 'https://x.com/nayandas69', icon: IconX },
    { label: 'discord', url: 'https://discord.gg/u9XfHZN8K9', icon: IconDiscord },
    { label: 'email', url: 'mailto:nayanchandradas@hotmail.com', icon: IconMail },
  ];

  // --- Discord Widget Data ---
  const discordData = ref(null);

  const fetchDiscord = async () => {
    try {
      const res = await fetch('https://discord.com/api/guilds/1435329767149797461/widget.json');
      if (res.ok) {
        discordData.value = await res.json();
      }
    } catch (e) {
      console.error('Failed to fetch discord widget', e);
      // Fallback/Mock for local dev or if widget off
      discordData.value = { presence_count: '14+' };
    }
  };

  onMounted(() => {
    fetchDiscord();
  });

  // --- SEO ---
  useHead({
    title: 'Contact - Nayan Das',
    meta: [{ name: 'description', content: 'Contact Nayan Das via Discord, Cal.com, or Email.' }],
  });
</script>

<style lang="scss" scoped>
  .contact-page {
    padding-top: $space-4;
  }

  /* ── Header ────────────────────────────────────── */
  .contact-header {
    padding-bottom: $space-8;
    border-bottom: 1px solid $color-border;
    margin-bottom: $space-8;
  }

  .contact-title {
    font-family: $font-heading;
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: $space-5;
    color: $color-text;

    @include md {
      font-size: 2.5rem;
    }
  }

  .contact-nav {
    display: flex;
    flex-wrap: wrap;
    gap: $space-4;
    margin-bottom: $space-6;
  }

  .contact-link {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    font-family: $font-mono;
    font-size: 0.8125rem;
    color: $color-muted;
    @include transition(color);

    svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    &:hover {
      color: $color-text;
    }
  }

  .contact-tagline {
    font-size: 0.9375rem;
    line-height: 1.7;
    color: $color-muted;
    max-width: 560px;
  }

  /* ── Contact Content ───────────────────────────── */
  .contact-content {
    display: flex;
    flex-direction: column;
    gap: $space-8;
    padding-bottom: $space-9;
  }

  .content-section {
    display: flex;
    flex-direction: column;
    gap: $space-6;
  }

  .section-title {
    font-family: $font-mono;
    font-size: 0.8125rem;
    font-weight: 500;
    color: $color-muted;
    text-transform: lowercase;
    letter-spacing: 0.05em;
  }

  /* ── Unified Card Style ────────────────────────── */
  .contact-card {
    background: $color-surface;
    border: 1px solid $color-border;
    border-radius: 16px;
    padding: $space-6;
    display: flex;
    flex-direction: column;
    gap: $space-4;
    max-width: 520px;
    @include transition(all);

    &:hover {
      border-color: rgba($color-accent, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 12px 40px -15px rgba(0, 0, 0, 0.6);
    }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
  }

  .card-description {
    font-size: 0.9375rem;
    line-height: 1.6;
    color: $color-muted;
    margin: 0;
  }

  /* ── CTA Buttons ───────────────────────────────── */
  .cta-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $space-3;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.9375rem;
    text-decoration: none;
    @include transition(all);
    margin-top: $space-2;

    &.discord-btn {
      background: #5865f2;
      color: #ffffff;
      &:hover {
        background: color-mix(in srgb, #5865f2, white 10%);
      }
    }

    &.cal-btn {
      background: #ffffff;
      color: #000000;
      &:hover {
        background: $color-accent;
        color: #ffffff;
      }
    }
  }

  /* ── Badges & Dots ─────────────────────────────── */
  .discord-icon {
    color: #5865f2;
  }

  .card-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    color: #a1a1aa;
    font-family: $font-mono;
    background: rgba(16, 185, 129, 0.05);
    padding: 0.4rem 0.75rem;
    border-radius: 100px;
    border: 1px solid rgba(16, 185, 129, 0.1);
  }

  .meeting-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.75rem;
    background: rgba($color-accent, 0.1);
    border: 1px solid rgba($color-accent, 0.2);
    border-radius: 100px;
    font-size: 0.75rem;
    font-weight: 600;
    color: $color-accent;
    font-family: $font-mono;
    text-transform: uppercase;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    &.active {
      background: #10b981;
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
    }
    &.pulse {
      background: $color-accent;
      animation: badgePulse 2s infinite;
    }
  }

  @keyframes badgePulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.5);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  /* ── Direct Line ──────────────────────────────── */
  .direct-text {
    color: $color-muted;
    font-size: 0.9375rem;
    line-height: 1.6;
  }

  .text-link {
    color: $color-accent;
    @include transition(color);
    border-bottom: 1px solid transparent;
    &:hover {
      border-bottom-color: $color-accent;
    }
  }

  .divider {
    height: 1px;
    background: $color-border;
    width: 100%;
  }
</style>
