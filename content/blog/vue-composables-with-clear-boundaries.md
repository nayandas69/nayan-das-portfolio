---
title: Give Vue composables one clear responsibility
description: Separate fetching, shaping data, and presentation so a small feature stays easy to change.
date: 2026-10-26
tags: [Vue, Architecture]
---
A composable is useful when it gives a feature a clear boundary. It becomes harder to use when it also decides the layout, formats every label, and silently changes data for a single screen. Start by asking what responsibility the caller is handing over.

For a local article archive, that responsibility can be very small: return the published articles in their defined order, with an optional limit. No loading state is necessary when the data is already part of the application build.

## Make the return value honest

```ts
interface Article {
  slug: string;
  title: string;
  date: string;
}

function latestArticles(articles: Article[], limit = 5) {
  return [...articles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, Math.max(0, limit));
}
```

This example copies before sorting. Calling `sort` on the input would change the original array, which can produce surprising behavior in another component using the same data.

> [!NOTE]
> Reactivity is useful when a value can change during the component's lifetime. Static build metadata does not need a loading spinner just to match the shape of a network composable.

## Keep presentation near the component

An article date has several representations. A machine-readable date belongs in a `time` element's `datetime` attribute. A human-readable label belongs in the visible text. Search indexing may need the original value.

If the data layer replaces the date with a display string, those other uses become harder. Preserve the original value and format it at the presentation boundary.

## Let callers choose the amount

The home page needs a preview. The archive needs every article. A shared selector can support both without maintaining separate datasets or making an extra request.

Test the two consumers directly: the archive receives every published item, and the home page receives exactly five in the same order. A test that only checks whether a return value exists does not protect that relationship.

## Know when to extract

Extraction pays off when two callers share a rule, or when a rule is complex enough to deserve a name. A single expression used once may be clearer inside the component. The goal is to make the feature easier to understand when you return to it later.
