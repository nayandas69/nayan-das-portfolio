---
title: TypeScript starts where the data becomes trustworthy
description: Use runtime checks at file and API boundaries, then let types keep the rest of the application simple.
date: 2026-10-25
tags: [TypeScript, Architecture]
---
A TypeScript interface describes the data the program expects. It does not prove that a YAML file, a network response, or a browser storage value actually has that shape. Treat those inputs as unknown until they pass a runtime check.

This matters even for repository content. A mistyped date can create an invalid sitemap entry. A string where a tag array belongs can crash a filter. Those are good reasons to validate content while building the site.

## Narrow before using

```ts
function requireTitle(value: unknown): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error('Article title must be a non-empty string');
  }

  return value.trim();
}
```

The returned string is useful because the function checked it. An assertion such as `value as string` would satisfy the type checker without checking anything at runtime.

## Check meaning as well as shape

A date can look correct and still be impossible. `2026-02-31` matches a simple year-month-day pattern. Some date parsers normalize it into March. If the publishing contract expects a calendar date, compare the normalized result with the original input.

```ts
function isCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(parsed.getTime())
    && parsed.toISOString().slice(0, 10) === value;
}
```

> [!WARNING]
> Validation errors should identify the file and the field. “Invalid content” makes the author search; “article.md: date must be a real YYYY-MM-DD date” points to the repair.

## Validate once, simplify callers

After the boundary accepts an article, the component should be able to use its title and tags directly. Repeating fallback logic everywhere hides broken inputs and makes each caller behave differently.

Choose deliberate defaults only for optional fields. An omitted `draft` can reasonably mean `false`. A missing title should fail the build because the title is part of the article's public identity.

## Test the rejected inputs

Happy-path tests establish that valid content works. Boundary tests establish that malformed content cannot leak farther into the system. Include missing fields, wrong types, duplicate names, malformed YAML, and impossible dates. Those tests protect the build contract that the UI relies on.
