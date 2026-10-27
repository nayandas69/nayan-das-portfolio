# Writing and publishing articles

The blog is part of this Nuxt application. Its content is compiled during the build; it has no external blog service, database, credentials, or content API.

## Add an article

Create `content/blog/your-article.md` or `content/blog/your-article.mdx`. Both uppercase and lowercase extensions are accepted. Filenames must be lowercase kebab-case, and each slug must be unique across formats. The filename becomes `/blog/your-article`; keep it stable once published.

```yaml
---
title: Your article title
description: A short, specific description of what the reader will learn.
date: 2026-10-27
tags: [Vue, Testing]
draft: false
---
```

`title`, `description`, a real `YYYY-MM-DD` date, and a non-empty array of string `tags` are required. `draft` is optional and defaults to `false`. Invalid metadata, duplicate slugs, or malformed content stop the build with an error.

Drafts and future-dated posts are excluded from public metadata, article imports, generated pages, and the sitemap. Dates use UTC. **A new build is required to publish a scheduled post**; the date does not trigger a deployment. Posts are sorted newest first, then by slug for equal dates. The home page displays the first five; `/blog` lists all published articles with search and topic filters.

Run `pnpm dev`, then open `/blog`. Editing, adding, renaming, or deleting a content file restarts the development server to regenerate the manifest. Keep articles directly in `content/blog/`; subdirectories are not scanned.

## Formatting

Markdown supports headings, emphasis, links, images, lists, ordinary blockquotes, horizontal rules, GFM tables, strikethrough, and task lists. Level-two and level-three Markdown headings automatically populate the table of contents with unique anchor IDs. Put images in `public/images/` and reference them as `/images/example.png`, with useful alt text.

Use fenced code blocks with a language, such as `ts`, `js`, `vue`, `css`, `bash`, `json`, or `yaml`. Highlighting is generated at build time for both themes. Missing or unknown languages render as plain code. Code blocks scroll independently, can receive keyboard focus, and offer a copy button. Plain `.md` files preserve literal braces; use `.mdx` for expressions and JSX.

### Callouts

All five GitHub alert types work, with uppercase markers:

```markdown
> [!NOTE]
> Useful context.

> [!TIP]
> An optional improvement.

> [!IMPORTANT]
> A requirement.

> [!WARNING]
> A likely mistake to avoid.

> [!CAUTION]
> A consequence to consider.
```

Use exactly `> [!TIP]` for tips; spaced, lowercase, and plural variants remain ordinary blockquotes. Put the marker on its own line. Callout bodies can contain multiple paragraphs, lists, emphasis, and code fences; keep the blockquote prefix on each line.

### MDX components

MDX compiles to Vue's JSX runtime. The article renderer supplies a `Callout` component:

```mdx
<Callout type="tip" title="A useful detail">

Write **Markdown** inside the component, separated by blank lines.

</Callout>

The result of two plus three is {2 + 3}.
```

MDX also supports imports of Vue components using repository aliases, for example `import Demo from '~/components/Demo.vue'`, followed by `<Demo />`. Use Vue conventions such as `class`, and avoid React-specific hooks or components. Markdown headings generate contents entries; headings written directly as JSX do not.

**Only compile trusted repository content.** MDX is executable code, including its imports and expressions. Do not accept visitor input or remote content into this pipeline. Raw HTML in plain Markdown is omitted; use trusted MDX for embedded markup.

See `/blog/markdown-that-reads-well` for a working formatting example.

## Deployment and checks

Use Node 24 and the pnpm version declared in `package.json`:

```bash
pnpm install --frozen-lockfile
pnpm format:check
pnpm test
pnpm build
pnpm preview
```

For the production smoke test, run `node scripts/blog-smoke-fixtures.mjs prepare` **before** `pnpm build`, then start `pnpm preview`. In another terminal, run `pnpm test:blog:smoke` (optionally followed by a base URL). Afterwards, run `node scripts/blog-smoke-fixtures.mjs cleanup`, including when a build or smoke check fails. CI performs these steps automatically.

The two synthetic files exercise draft and future-date exclusion without relying on real articles. The future date is generated one year ahead on every preparation. Fixture filenames are reserved and existing files are never overwritten. The smoke test fails if either fixture is missing or public, and checks their absence from the archive and sitemap plus HTTP 404 responses. It also checks every published article, five home previews, metadata, code examples, callouts, and missing-slug behavior. Ordinary deployments do not need these fixtures.

The production build prerenders `/blog` and every published article, fails if a prerendered article errors, and includes the routes in the generated sitemap. Article bodies are separate lazy imports; the archive and home page share lightweight metadata. Unknown slugs return HTTP 404.

The default canonical origin matches the portfolio's configured production domain. When changing domains, set `NUXT_PUBLIC_SITE_URL` to the public origin **without a trailing slash before building**, so the prerendered metadata and sitemap agree. Rebuild after changing it.

Before deploying, check the archive, an article opened directly, a missing slug, the sitemap, mobile overflow, keyboard navigation, code copying, and both themes. The existing GitHub project feed remains a separate feature of the home page and still uses GitHub.
