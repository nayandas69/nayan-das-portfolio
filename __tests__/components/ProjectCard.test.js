/**
 * ProjectCard — Component Tests
 *
 * Mounts ProjectCard with mountSuspended and validates the
 * rendered card content: name, description, badge, language dot,
 * star/fork counts, and link behavior.
 *
 * @see ~/components/ProjectCard.vue
 */
import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import ProjectCard from '~/components/ProjectCard.vue';

/* ── Mock repo object (full data) ──────────────────── */
const fullRepo = {
  name: 'super-tool',
  description: 'A super useful CLI tool for devs.',
  language: 'JavaScript',
  stars: 128,
  forks: 23,
  url: 'https://github.com/nayandas69/super-tool',
  homepage: 'https://super-tool.dev',
  pushedAt: '2025-06-12T10:00:00Z',
  topics: ['cli', 'tool'],
};

/* ── Mock repo object (minimal data) ─────────────── */
const minimalRepo = {
  name: 'tiny-lib',
  description: 'No description provided.',
  language: null,
  stars: 0,
  forks: 0,
  url: 'https://github.com/nayandas69/tiny-lib',
  homepage: null,
  pushedAt: null,
  topics: [],
};

describe('ProjectCard', () => {
  /* ── Renders repo name ─────────────────────────────── */
  it('renders the repository name', async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { repo: fullRepo },
    });

    expect(wrapper.find('.project-card__name').text()).toBe('super-tool');
  });

  /* ── Renders description ───────────────────────────── */
  it('renders the repository description', async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { repo: fullRepo },
    });

    expect(wrapper.find('.project-card__desc').text()).toBe('A super useful CLI tool for devs.');
  });

  /* ── Renders "Public" badge ────────────────────────── */
  it('renders the "Public" badge', async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { repo: fullRepo },
    });

    expect(wrapper.find('.project-card__badge').text()).toBe('Public');
  });

  /* ── Language dot shows correct color ──────────────── */
  it('shows language dot with correct background color', async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { repo: fullRepo },
    });

    const dot = wrapper.find('.project-card__dot');
    expect(dot.exists()).toBe(true);
    /* happy-dom keeps the raw hex value instead of converting to rgb */
    expect(dot.attributes('style')).toContain('background-color: #f1e05a');
  });

  /* ── Language name is displayed ────────────────────── */
  it('shows language name next to the dot', async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { repo: fullRepo },
    });

    expect(wrapper.find('.project-card__lang').text()).toContain('JavaScript');
  });

  /* ── Language dot hidden when language is null ──────── */
  it('hides language section when language is null', async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { repo: minimalRepo },
    });

    expect(wrapper.find('.project-card__lang').exists()).toBe(false);
  });

  /* ── Star count is displayed ───────────────────────── */
  it('shows star count when stars > 0', async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { repo: fullRepo },
    });

    const stats = wrapper.findAll('.project-card__stat');
    const starStat = stats[0];

    expect(starStat).toBeDefined();
    expect(starStat.text()).toContain('128');
  });

  /* ── Star count hidden when 0 ──────────────────────── */
  it('hides star count when stars is 0', async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { repo: minimalRepo },
    });

    const stats = wrapper.findAll('.project-card__stat');
    expect(stats.length).toBe(0);
  });

  /* ── Fork count is displayed ───────────────────────── */
  it('shows fork count when forks > 0', async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { repo: fullRepo },
    });

    const stats = wrapper.findAll('.project-card__stat');
    const forkStat = stats[1];

    expect(forkStat).toBeDefined();
    expect(forkStat.text()).toContain('23');
  });

  /* ── Fork count hidden when 0 ──────────────────────── */
  it('hides fork count when forks is 0', async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { repo: minimalRepo },
    });

    /* No stats should be rendered at all for minimal repo */
    const stats = wrapper.findAll('.project-card__stat');
    expect(stats.length).toBe(0);
  });

  /* ── Card links to repo URL ────────────────────────── */
  it('card links to the repository URL', async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { repo: fullRepo },
    });

    const card = wrapper.find('a');
    expect(card.attributes('href')).toBe('https://github.com/nayandas69/super-tool');
  });

  /* ── Card opens in new tab ─────────────────────────── */
  it('card opens in new tab with noopener noreferrer', async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { repo: fullRepo },
    });

    const card = wrapper.find('a');
    expect(card.attributes('target')).toBe('_blank');
    expect(card.attributes('rel')).toBe('noopener noreferrer');
  });

  /* ── Card has accessible aria-label ────────────────── */
  it('card has aria-label with repo name', async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { repo: fullRepo },
    });

    const card = wrapper.find('a');
    expect(card.attributes('aria-label')).toBe('View super-tool on GitHub');
  });
});
