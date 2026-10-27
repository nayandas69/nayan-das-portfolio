// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { compilePost, parsePost, publishedPosts } from '../../modules/blog/compiler.mjs';

const frontmatter = `---
title: A test article
description: A useful description.
date: 2026-10-01
tags: [Vue, Testing]
---
`;

async function render(body, extension = 'md', components = {}) {
  const result = await compilePost(frontmatter + body, `test-article.${extension}`);
  const code = result.code.replaceAll(
    '"#blog-runtime/jsx-runtime"',
    JSON.stringify(new URL('../../modules/blog/jsx-runtime.mjs', import.meta.url).href)
  );
  const module = await import(
    `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`
  );
  return {
    ...result,
    html: await renderToString(createSSRApp(() => h(module.default, { components }))),
  };
}

describe('article metadata boundary', () => {
  it('accepts BOM, CRLF, optional drafts, and repeated tags', () => {
    const source =
      '\uFEFF' +
      frontmatter
        .replace('tags: [Vue, Testing]', 'draft: true\ntags: [Vue, Vue]')
        .replaceAll('\n', '\r\n') +
      'Body';
    expect(parsePost(source, 'test-article.MD').metadata).toMatchObject({
      draft: true,
      tags: ['Vue'],
      slug: 'test-article',
    });
  });

  it.each([
    ['no frontmatter', 'Body'],
    ['missing title', frontmatter.replace('title: A test article\n', '')],
    ['impossible date', frontmatter.replace('2026-10-01', '2026-02-31')],
    ['wrong date format', frontmatter.replace('2026-10-01', 'tomorrow')],
    ['non-array tags', frontmatter.replace('[Vue, Testing]', 'Vue')],
    ['empty tags', frontmatter.replace('[Vue, Testing]', '[]')],
    ['wrong draft type', frontmatter.replace('tags:', 'draft: "false"\ntags:')],
    ['duplicate YAML keys', frontmatter.replace('title:', 'title: First\ntitle:')],
  ])('rejects %s', (_name, source) => {
    expect(() => parsePost(source, 'test-article.md')).toThrow('test-article.md');
  });

  it('rejects unsafe or ambiguous filenames', () => {
    expect(() => parsePost(frontmatter, 'Not a slug.md')).toThrow('kebab-case');
  });

  it('excludes drafts and future posts, with a stable tie order, without mutating input', () => {
    const input = [
      { slug: 'zeta', date: '2026-10-01' },
      { slug: 'draft', date: '2026-10-03', draft: true },
      { slug: 'future', date: '2026-10-04' },
      { slug: 'alpha', date: '2026-10-01' },
      { slug: 'today', date: '2026-10-03' },
    ];
    expect(publishedPosts(input, '2026-10-03').map((post) => post.slug)).toEqual([
      'today',
      'alpha',
      'zeta',
    ]);
    expect(input[0].slug).toBe('zeta');
    expect(() => publishedPosts([input[0], input[0]])).toThrow('Duplicate blog slug');
  });
});

describe('Markdown and MDX rendered through Vue', () => {
  it('renders GFM, inline code, blockquotes, and distinct heading IDs', async () => {
    const { html, metadata } = await render(
      '## Same heading\n\n`inline` and ~~removed~~.\n\n## Same heading\n\n| A | B |\n| - | - |\n| One | Two |\n\n- [x] Done\n\n> Ordinary quote\n\nLiteral {braces}.'
    );
    expect(html).toContain('<table>');
    expect(html).toContain('<del>removed</del>');
    expect(html).toContain('type="checkbox"');
    expect(html).toContain('checked');
    expect(html).toContain('<blockquote>');
    expect(html).toContain('Literal {braces}');
    expect(metadata.headings.map((heading) => heading.id)).toEqual([
      'same-heading',
      'same-heading-1',
    ]);
    expect(html).toContain('id="same-heading-1"');
  });

  it.each(['NOTE', 'TIP', 'IMPORTANT', 'WARNING', 'CAUTION'])(
    'renders the %s alert without losing nested content',
    async (kind) => {
      const { html } = await render(
        `> [!${kind}]\n> First **strong** paragraph.\n>\n> - A nested list\n> - Another item`
      );
      const label = kind.trim().toLowerCase().replace('tips', 'tip');
      expect(html).toContain(`class="callout callout--${label}"`);
      expect(html).toContain('<strong>strong</strong>');
      expect(html).toContain('Another item');
      expect(html).not.toContain('[!');
    }
  );

  it.each(['[ !Tips]', '[!TIPS]', '[!tip]', '[ !TIP]', '[! TIP]'])(
    'keeps noncanonical %s as a regular quote',
    async (marker) => {
      const { html } = await render(`> ${marker}\n> Keep this content.`);
      expect(html).toContain('<blockquote>');
      expect(html).not.toContain('class="callout');
      expect(html).toContain('Keep this content.');
    }
  );

  it('highlights and escapes code, preserving text for both themes', async () => {
    const { html } = await render('```ts\nconst element = "<script>alert(1)</script>";\n```');
    expect(html).toContain('class="shiki');
    expect(html).toContain('--shiki-dark:');
    expect(html).toContain('--shiki-light:');
    expect(html).toContain('&lt;script&gt;');
    expect(html).not.toContain('<script>');
  });

  it('renders unlabelled and unknown languages as plain code', async () => {
    const { html } = await render(
      '```made-up-language\nhello <world>\n```\n\n```\nplain code\n```'
    );
    expect(html).toContain('hello &lt;world&gt;');
    expect(html).toContain('plain code');
  });

  it('evaluates real MDX expressions and supplied Vue components', async () => {
    const Callout = (_props, { slots }) =>
      h('aside', { class: 'custom-callout' }, slots.default?.());
    const { html } = await render(
      '## MDX\n\nThe answer is {2 + 3}.\n\n<Callout>\n\n**Component content**\n\n</Callout>',
      'mdx',
      { Callout }
    );
    expect(html).toContain('The answer is 5.');
    expect(html).toContain('class="custom-callout"');
    expect(html).toContain('<strong>Component content</strong>');
  });

  it('fails malformed MDX before deployment', async () => {
    await expect(compilePost(frontmatter + '<Callout>', 'broken.mdx')).rejects.toThrow();
  });
});
