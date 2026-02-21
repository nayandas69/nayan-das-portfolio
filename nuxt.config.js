/**
 * Nuxt Configuration — Nayan Das Portfolio
 *
 * Nuxt 4 with the new app/ directory structure.
 * SCSS globals injected via Vite preprocessorOptions.
 * Vercel-compatible SSR deployment.
 */
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

/* == Helpers for Vite SCSS preprocessor configuration == */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const scssDir = resolve(__dirname, 'app/assets/scss');

export default defineNuxtConfig({
  /* ── Global CSS entry point ─────────────────────── */
  css: ['~/assets/scss/main.scss'],

  /**
   * Vite SCSS preprocessor configuration.
   *
   * - api: 'modern-compiler' — uses the modern Sass API via sass-embedded,
   *   which eliminates the legacy JS API deprecation warning.
   * - loadPaths — tells Sass where to resolve @use partials from,
   *   so we can write `@use 'variables' as *` without full paths.
   * - additionalData — injects the shared module (variables + mixins)
   *   into every component <style lang="scss"> block automatically.
   *   Uses a single @use of '_shared.scss' which @forward's both
   *   partials, avoiding duplicate-module conflicts.
   */
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          loadPaths: [scssDir],
          additionalData: `@use 'sass:color'; @use 'shared' as *;`,
        },
      },
    },
  },

  /* ── App head — SEO, fonts, viewport ────────────── */
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Nayan Das — Developer & Creator',
      meta: [
        {
          name: 'description',
          content:
            'Portfolio of Nayan Das — a developer and creator who builds tools, open-source projects, and writes about code.',
        },
        { name: 'theme-color', content: '#0a0a0a' },
        { property: 'og:title', content: 'Nayan Das — Developer & Creator' },
        {
          property: 'og:description',
          content: 'Developer portfolio showcasing open-source projects, blog posts, and more.',
        },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:creator', content: '@nayandas69' },
        { property: 'og:image', content: 'https://nayan-das-portfolio-navy.vercel.app/look.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:image', content: 'https://nayan-das-portfolio-navy.vercel.app/look.png' },
      ],
      link: [
        /* Favicon - Github avatar as a simple personal brand icon */
        {
          rel: 'icon',
          type: 'image/png',
          href: 'https://avatars.githubusercontent.com/u/174907517?v=4&size=64',
        },
        /* Google Fonts — Space Grotesk (headings) + Inter (body) + JetBrains Mono (code) */
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap',
          media: 'print',
          onload: "this.media='all'",
        },
        /* DNS prefetch for API domains — resolves DNS early */
        { rel: 'dns-prefetch', href: 'https://api.github.com' },
        { rel: 'dns-prefetch', href: 'https://blogverse-five-omega.vercel.app' },
        { rel: 'dns-prefetch', href: 'https://avatars.githubusercontent.com' },
      ],
    },
  },

  /* ── Modules ────────────────────────────────────── */
  modules: ['@nuxt/test-utils/module'],

  /* ── Compatibility date (required by Nuxt 4) ───── */
  compatibilityDate: '2025-01-01',

  /* ── SSR on — Vercel serverless compatible ──────── */
  ssr: true,

  /* ── Dev tools off in production ────────────────── */
  devtools: { enabled: false },
});
