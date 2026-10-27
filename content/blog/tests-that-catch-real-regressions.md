---
title: Write tests that can actually fail
description: Replace guarded assertions and implementation checks with tests of the promises a feature makes.
date: 2026-10-24
tags: [Testing, Vue]
---
A passing test is useful only if the wrong behavior would make it fail. It is easy to accidentally write a test that skips its assertions when the feature is broken. Asynchronous UI and mocked network responses are common places for that mistake.

## Avoid the quiet early return

```ts
// This can pass when the feature returns nothing.
if (!posts.length) return;
expect(posts[0].title).toBe('A useful article');
```

The empty array is exactly the situation the test should investigate. Assert the precondition instead of escaping from it.

```ts
expect(posts).toHaveLength(5);
expect(posts[0].title).toBe('A useful article');
```

When the test needs asynchronous data, wait for the actual operation or use the framework's supported settling utilities. An arbitrary delay can make tests slow on a fast machine and unreliable on a busy one.

## Test the boundary that matters

For a blog, useful promises include these:

- Draft articles do not appear in the public archive.
- A missing slug produces a real 404 response.
- The home page links to exactly the five newest articles.
- A code example preserves its text after highlighting.
- A callout exposes both its label and its body.

These checks describe behavior a reader or author depends on. They give the implementation room to change without weakening the contract.

> [!TIP]
> Before keeping a test, imagine a specific bug it should catch. Temporarily introducing that bug is a useful way to check whether the assertion reaches the intended behavior.

## Use fixtures with a purpose

A fixture should include the details that make a rule observable. For sorting, give posts different dates and an equal-date pair. For content rendering, include a table, a fenced block, and a callout with more than one paragraph.

Tiny fixtures are easier to understand, but a fixture that leaves out the risky boundary does not save time. It moves the discovery to a later stage.

## Keep a production check

Component tests cannot prove that a deployed server returns the right status code or that build tooling includes an article's code chunk. A narrow production smoke check complements the suite: request an article, inspect its HTML, and request a missing article. Keep each check tied to a concrete risk.
