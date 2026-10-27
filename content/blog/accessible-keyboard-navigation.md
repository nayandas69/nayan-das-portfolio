---
title: Make the keyboard path part of the design
description: Build navigation, filters, and code examples that remain usable when a mouse is out of reach.
date: 2026-10-22
tags: [Accessibility, CSS]
---
Keyboard access is easier to build when it is part of the initial interaction design. Every control needs a purpose, an accessible name, a visible focus state, and a sensible place in the document order. These decisions also make a small site more predictable for everyone.

## Choose the native element first

A link changes location. A button performs an action. Search belongs in a labeled input. Native elements supply keyboard behavior that a clickable `div` would need to recreate.

```html
<label for="article-search">Search articles</label>
<input id="article-search" type="search" />
<button type="button" aria-pressed="true">Vue</button>
<a href="/blog">All articles</a>
```

The pressed state tells assistive technology whether a topic filter is selected. The label tells the reader what the search field does even after its placeholder disappears.

## Keep focus visible

```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}
```

A focus ring is useful information. Check it against the actual background in both light and dark themes. Avoid removing the browser outline unless the replacement is at least as visible.

> [!IMPORTANT]
> Walk the page with Tab and Shift+Tab. A visual inspection cannot reveal an unreachable button or a confusing focus order.

## Let overflowing code receive focus

A code example may need horizontal scrolling on a phone or a zoomed page. Making its scroll container focusable allows a keyboard user to reach it and use the arrow keys. Give the container a short name so the extra focus stop has context.

The copy button should report success or failure. A quiet status message is enough; moving focus or opening a modal would interrupt the reader.

## Prefer a simple contents control

A native `details` element works well for an optional table of contents. Its `summary` already supports keyboard activation, and its expanded state is communicated by the browser. The list inside can remain ordinary anchor links.

Finally, test with reduced motion enabled. Content should remain visible after animations are disabled. Navigation and reading should never depend on watching an entrance effect finish.
