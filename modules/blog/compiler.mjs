import { compile } from '@mdx-js/mdx';
import rehypeShiki from '@shikijs/rehype';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { visit } from 'unist-util-visit';
import { toString as mdastText } from 'mdast-util-to-string';
import { toString as hastText } from 'hast-util-to-string';
import { parseDocument } from 'yaml';
import { basename, extname } from 'node:path';

const calloutNames = {
  note: 'Note',
  tip: 'Tip',
  important: 'Important',
  warning: 'Warning',
  caution: 'Caution',
};

/** Canonical GitHub alerts only — keep these little licks predictable. */
function remarkCallouts() {
  return (tree) => {
    visit(tree, 'blockquote', (node) => {
      const first = node.children[0];
      const text = first?.type === 'paragraph' ? first.children[0] : undefined;
      if (text?.type !== 'text') return;
      const match = text.value.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\][ \t]*(?:\r?\n|$)/);
      if (!match) return;
      const label = calloutNames[match[1].toLowerCase()];
      text.value = text.value.slice(match[0].length);
      if (!text.value) first.children.shift();
      if (!first.children.length) node.children.shift();
      node.data = {
        hName: 'aside',
        hProperties: {
          className: ['callout', `callout--${label.toLowerCase()}`],
          'aria-label': label,
        },
      };
      node.children.unshift({
        type: 'paragraph',
        data: { hProperties: { className: ['callout__title'] } },
        children: [{ type: 'text', value: label }],
      });
    });
  };
}

function collectReadingText(state) {
  return () => (tree) => {
    state.text = mdastText(tree);
  };
}

function collectHeadings(headings) {
  return () => (tree) => {
    visit(tree, 'element', (node) => {
      if (/^h[23]$/.test(node.tagName)) {
        headings.push({
          id: node.properties.id,
          text: hastText(node),
          depth: Number(node.tagName[1]),
        });
      }
    });
  };
}

export function parsePost(source, file) {
  const slug = basename(file, extname(file));
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
    throw new Error(`${file}: use a lowercase kebab-case filename`);
  const match = source.replace(/^\uFEFF/, '').match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) throw new Error(`${file}: YAML frontmatter is required`);
  const doc = parseDocument(match[1], { uniqueKeys: true });
  if (doc.errors.length) throw new Error(`${file}: ${doc.errors[0].message}`);
  const data = doc.toJS({ maxAliasCount: 0 });
  if (!data || typeof data !== 'object' || Array.isArray(data))
    throw new Error(`${file}: frontmatter must be a mapping`);
  for (const field of ['title', 'description', 'date']) {
    if (typeof data[field] !== 'string' || !data[field].trim())
      throw new Error(`${file}: ${field} must be a non-empty string`);
  }
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
    !Number.isFinite(Date.parse(`${data.date}T00:00:00Z`)) ||
    new Date(`${data.date}T00:00:00Z`).toISOString().slice(0, 10) !== data.date
  ) {
    throw new Error(`${file}: date must be a real YYYY-MM-DD date`);
  }
  if (
    !Array.isArray(data.tags) ||
    !data.tags.length ||
    data.tags.some((tag) => typeof tag !== 'string' || !tag.trim())
  )
    throw new Error(`${file}: tags must be a non-empty string array`);
  if (data.draft !== undefined && typeof data.draft !== 'boolean')
    throw new Error(`${file}: draft must be true or false`);
  return {
    body: source.replace(/^\uFEFF/, '').slice(match[0].length),
    metadata: {
      slug,
      title: data.title.trim(),
      description: data.description.trim(),
      date: data.date,
      tags: [...new Set(data.tags.map((tag) => tag.trim()))],
      url: `/blog/${slug}`,
      draft: data.draft ?? false,
    },
  };
}

export function publishedPosts(posts, today = new Date().toISOString().slice(0, 10)) {
  const slugs = new Set();
  for (const post of posts) {
    if (slugs.has(post.slug)) throw new Error(`Duplicate blog slug: ${post.slug}`);
    slugs.add(post.slug);
  }
  return posts
    .filter((post) => !post.draft && post.date <= today)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

/** Only repository-authored content is compiled. MDX is executable, trusted code. */
export async function compilePost(source, file) {
  const { body, metadata } = parsePost(source, file);
  const headings = [];
  const reading = { text: '' };
  const result = await compile(
    { value: body, path: file },
    {
      format: extname(file).toLowerCase() === '.mdx' ? 'mdx' : 'md',
      jsxImportSource: '#blog-runtime',
      elementAttributeNameCase: 'html',
      stylePropertyNameCase: 'dom',
      remarkPlugins: [remarkGfm, collectReadingText(reading), remarkCallouts],
      rehypePlugins: [
        rehypeSlug,
        collectHeadings(headings),
        [
          rehypeShiki,
          {
            themes: { dark: 'github-dark', light: 'github-light' },
            defaultColor: false,
            fallbackLanguage: 'text',
            defaultLanguage: 'text',
            langs: [],
            lazy: true,
          },
        ],
      ],
    }
  );
  return {
    code: String(result),
    metadata: {
      ...metadata,
      headings,
      readingTime: Math.max(1, Math.ceil(reading.text.split(/\s+/).filter(Boolean).length / 200)),
    },
  };
}
