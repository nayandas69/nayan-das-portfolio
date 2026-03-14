/**
 * AppFooter — Component Tests
 *
 * Mounts AppFooter with mountSuspended and validates the
 * copyright text, year, and footer links.
 *
 * @see ~/components/AppFooter.vue
 */
import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import AppFooter from '~/components/AppFooter.vue';

describe('AppFooter', () => {
  /* ── Renders the footer element ────────────────────── */
  it('renders a footer element', async () => {
    const wrapper = await mountSuspended(AppFooter);

    expect(wrapper.find('footer').exists()).toBe(true);
  });

  /* ── Displays the current year ─────────────────────── */
  it('displays the current year in the copyright text', async () => {
    const wrapper = await mountSuspended(AppFooter);

    const currentYear = new Date().getFullYear().toString();
    expect(wrapper.text()).toContain(currentYear);
  });

  /* ── Renders name link ────────────────────────────── */
  it('renders name link pointing to GitHub profile', async () => {
    const wrapper = await mountSuspended(AppFooter);

    const links = wrapper.findAll('a');
    const nayanLink = links.find((link) => link.text().toLowerCase() === 'nayan das');

    expect(nayanLink).toBeDefined();
    expect(nayanLink.attributes('href')).toBe('https://github.com/nayandas69');
    expect(nayanLink.attributes('target')).toBe('_blank');
    expect(nayanLink.attributes('rel')).toBe('noopener noreferrer');
  });

  /* ── Renders "GitHub" source link ──────────────────── */
  it('renders "GitHub" link pointing to portfolio repository', async () => {
    const wrapper = await mountSuspended(AppFooter);

    const links = wrapper.findAll('a');
    const githubLink = links.find((link) => link.text() === 'GitHub');

    expect(githubLink).toBeDefined();
    expect(githubLink.attributes('href')).toBe('https://github.com/nayandas69/nayan-das-portfolio');
    expect(githubLink.attributes('target')).toBe('_blank');
    expect(githubLink.attributes('rel')).toBe('noopener noreferrer');
  });

  /* ── Copyright text contains "Source code on" ──────── */
  it('contains "Source code on" text in the footer', async () => {
    const wrapper = await mountSuspended(AppFooter);

    expect(wrapper.text()).toContain('Source code on');
  });
});
