---
title: A small release checklist for a personal site
description: Check the boundaries that matter before calling a blog deployment ready.
date: 2026-10-18
tags: [Testing, Performance]
---
A personal site does not need a large release process. It does need a few repeatable checks that catch expensive mistakes before visitors do. Keep the checklist close to the repository and tie each item to an observable result.

## Start with the content build

The build should reject missing required metadata and invalid source syntax. It should also make drafts and future posts disappear from public navigation and generated article routes. Those rules need to agree across the archive, home page, sitemap, and direct URLs.

```bash
pnpm format:check
pnpm test
pnpm build
```

Run the documented commands with the project's declared runtime and package manager. A successful command on an unrelated environment does not prove that the deployment environment will accept the same lockfile or module syntax.

## Exercise the reader's route

- [ ] Open the home page and follow one of the five article previews.
- [ ] Search the archive and select a topic.
- [ ] Open an article directly, without visiting the home page first.
- [ ] Copy a code example and compare its plain text.
- [ ] Follow a table-of-contents link.
- [ ] Request an article slug that does not exist.

The last check should return HTTP 404. The working article should include its text in the server response, with the expected canonical link and description.

> [!CAUTION]
> “Build succeeded” does not mean that every interaction or deployment setting is correct. Keep the claim tied to what you actually checked.

## Review a narrow screen

Long titles, tables, and code are useful stress cases. Code may scroll inside its own region; the page itself should not gain accidental horizontal scrolling. The floating navigation should leave enough room to reach the last link.

Check light and dark themes on the same article. Try keyboard navigation and reduced motion. These are small observations with a direct effect on whether someone can use the page comfortably.

## Leave a reproducible handoff

Record the commands that passed, the environment they used, and any limitations that remain. Keep that record separate from the article's public content. The next change can then reuse valid evidence and repeat only the checks affected by the new work.

A release process is useful when it helps you notice a real problem. Keep it short enough that you will actually run it before publishing the next article.
