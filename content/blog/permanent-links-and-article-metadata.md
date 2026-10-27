---
title: Treat an article URL as part of its content
description: Stable slugs, clear descriptions, and canonical links make a small blog easier to share and maintain.
date: 2026-10-19
tags: [Writing, Nuxt]
---
A reader may keep an article link for longer than they remember the site that published it. Once a URL is shared, it becomes part of the article's public interface. A simple filename rule helps make that interface predictable.

## Choose a durable slug

Use lowercase words separated by hyphens. Prefer the subject to a temporary announcement. `testing-article-rendering` is easier to keep useful than a name tied to the day you happened to publish it.

Changing a title does not require changing the slug. If a published URL must change, add a redirect and verify it before removing the old route. Avoid making readers discover the new location through a search engine.

```text
content/blog/testing-article-rendering.md
            ↓
/blog/testing-article-rendering
```

## Write metadata for a real reader

A title should name the article's promise. A description should explain enough to help someone decide whether to open it. Repeating the title in the description wastes the second opportunity to provide context.

Publication dates should use one explicit format. A plain date is often sufficient for a personal blog; format it with a fixed timezone so a reader in another location does not see the previous day.

> [!IMPORTANT]
> Keep the canonical origin aligned with the real deployment domain. A preview hostname is useful for testing, but it should not accidentally become the permanent identity of published articles.

## Make sharing consistent

The visible heading, page title, Open Graph title, and structured data should describe the same article. Generate them from the same validated metadata rather than maintaining several copies by hand.

A canonical link expresses the preferred URL. Structured article data can describe the author, publication date, and primary page. Neither replaces a useful title or guarantees how another service will display the link.

## Make missing content explicit

A missing article should return 404. Rendering a friendly empty paragraph with HTTP 200 makes monitoring and indexing less reliable. The error page can still provide a route back to the archive.

Before publishing, follow the link from the home page, open it directly in a new browser tab, and inspect its metadata. Those paths exercise different parts of the site and are worth checking together.
