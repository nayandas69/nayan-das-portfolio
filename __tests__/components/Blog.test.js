import { describe, it, expect, vi, afterEach } from 'vitest';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { flushPromises, mount } from '@vue/test-utils';
import ArticlesSection from '~/components/ArticlesSection.vue';
import BlogIndex from '~/pages/blog/index.vue';
import CodeBlock from '~/components/blog/CodeBlock.vue';
import { useBlogPosts } from '~/composables/useBlogPosts';
import { compilePost } from '../../modules/blog/compiler.mjs';

vi.mock('#blog', async () => await import('../fixtures/blog.js'));

afterEach(() => vi.restoreAllMocks());

describe('article discovery', () => {
  it('renders five home previews with internal links in newest-first order', async () => {
    const wrapper = await mountSuspended(ArticlesSection);
    const links = wrapper.findAll('.post-link');
    expect(links).toHaveLength(5);
    expect(links.map((link) => link.attributes('href'))).toEqual(
      useBlogPosts(5).map((post) => post.url)
    );
    expect(wrapper.find('.articles-all').attributes('href')).toBe('/blog');
    expect(links.every((link) => !link.attributes('target'))).toBe(true);
  });

  it('searches title and tags, combines filters, and recovers from an empty result', async () => {
    const wrapper = await mountSuspended(BlogIndex);
    expect(wrapper.findAll('.post-link')).toHaveLength(6);
    expect(wrapper.find('.blog-topics').attributes('role')).toBe('group');
    expect(wrapper.find('.blog-topics').attributes('aria-label')).toBe('Filter by topic');
    await wrapper.find('input').setValue('  MARKDOWN  ');
    expect(wrapper.findAll('.post-link')).toHaveLength(1);
    expect(wrapper.find('.post-title').text()).toContain('Markdown');
    const testing = wrapper
      .findAll('.blog-topics button')
      .find((button) => button.text() === 'Testing');
    await testing.trigger('click');
    expect(testing.attributes('aria-pressed')).toBe('true');
    expect(wrapper.findAll('.post-link')).toHaveLength(0);
    expect(wrapper.find('.blog-empty h2').text()).toBe('No matching articles');
    await wrapper.find('.blog-empty button').trigger('click');
    expect(wrapper.findAll('.post-link')).toHaveLength(6);
    await wrapper.find('input').setValue('Vue');
    expect(wrapper.findAll('.post-link').length).toBeGreaterThan(0);
  });
});

describe.each(['md', 'mdx'])('compiled %s code headers', (format) => {
  it.each([
    ['unlabelled', '```\nplain <code>\n```', 'Code'],
    ['explicit text', '```text\nplain <code>\n```', 'text'],
    ['unknown language', '```made-up-language\nplain <code>\n```', 'text'],
    ['known language', '```ts\nconst answer = 42;\n```', 'ts'],
    ['filename', '```ts title="example.ts"\nconst answer = 42;\n```', 'example.ts'],
  ])('renders the %s header through the CodeBlock mapping', async (_name, fence, title) => {
    const source = `---
title: Code headers
description: Code header regression fixture.
date: 2026-10-01
tags: [Testing]
---
${fence}`;
    const result = await compilePost(source, `code-headers.${format}`);
    const code = result.code.replaceAll(
      '"#blog-runtime/jsx-runtime"',
      JSON.stringify(pathToFileURL(resolve('modules/blog/jsx-runtime.mjs')).href)
    );
    const { default: Article } = await import(
      `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`
    );
    const wrapper = mount(Article, { props: { components: { pre: CodeBlock } } });
    try {
      expect(wrapper.find('.code-block__title').text()).toBe(title);
      expect(wrapper.find('pre code').text()).toBe(
        fence.includes('const answer') ? 'const answer = 42;' : 'plain <code>'
      );
      expect(wrapper.find('pre').attributes('tabindex')).toBe('0');
      expect(wrapper.find('script').exists()).toBe(false);
    } finally {
      wrapper.unmount();
    }
  });
});

describe('code copying', () => {
  it('copies only code text and announces success', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue({ writeText });
    const wrapper = mount(CodeBlock, {
      attrs: { 'data-code-title': 'example.ts', 'data-language': 'ts' },
      slots: { default: '<code>const answer = 42;</code>' },
    });
    expect(wrapper.find('.code-block__title').text()).toBe('example.ts');
    await wrapper.find('button').trigger('click');
    await flushPromises();
    expect(writeText).toHaveBeenCalledWith('const answer = 42;');
    expect(wrapper.find('[role="status"]').text()).toBe('Copied');
    expect(wrapper.find('pre').attributes('role')).toBe('region');
    expect(wrapper.find('pre').attributes('aria-label')).toBe('Code example');
    expect(wrapper.find('pre').attributes('tabindex')).toBe('0');
    wrapper.unmount();
  });

  it('announces clipboard failure without throwing', async () => {
    vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue({
      writeText: vi.fn().mockRejectedValue(new Error('denied')),
    });
    const wrapper = mount(CodeBlock, { slots: { default: '<code>example</code>' } });
    await wrapper.find('button').trigger('click');
    await flushPromises();
    expect(wrapper.find('[role="status"]').text()).toBe('Copy failed');
    wrapper.unmount();
  });
});
