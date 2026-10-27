---
title: Put stable content in the first response
description: Understand what server rendering and prerendering contribute to a small article site.
date: 2026-10-20
tags: [Nuxt, Performance]
---
An article is usually stable between deployments. Its title, paragraphs, and code examples do not need a browser to ask for them after the page loads. Sending that content in the first HTML response makes the page useful earlier and gives link previews a dependable document to inspect.

## Separate content from interaction

The article body can be prepared ahead of time. Search filters, copy buttons, and a theme toggle are interactions that enhance the page after it arrives. Keeping those concerns separate makes it easier to reason about failures.

If the browser cannot run an interaction immediately, the reader should still have the article. A copy button is convenient, but selecting and reading the code should not depend on it.

## Know the two rendering moments

| Approach | When HTML is produced | Useful for |
| --- | --- | --- |
| Server rendering | When the server handles a request | Request-dependent pages |
| Prerendering | During the deployment build | Stable article pages |

A Nuxt application can use both. Prerendering known article routes does not require every other part of the portfolio to become static.

```ts
const articleRoutes = posts.map((post) => `/blog/${post.slug}`);
const routesToPrerender = ['/blog', ...articleRoutes];
```

The important detail is how the route list is created. Use the same published article collection that powers navigation so drafts cannot enter through a second route discovery path.

> [!NOTE]
> A future publication date becomes visible only after a build includes it. Prerendered files do not update themselves when the clock passes midnight.

## Keep article bundles independent

An archive needs titles and descriptions. It does not need every article's rendered body to make a list. Load article components by route so a visitor opening the archive does not download all the examples from all the posts.

## Inspect the actual output

A successful build is necessary, but it is not the last observation. Request the production article URL and inspect the returned HTML for its heading and body. Then request an unknown slug and verify the HTTP status. These checks catch mistakes that a client-side navigation demo can conceal.
