---
title: One set of components, two readable themes
description: Use semantic CSS tokens to keep light and dark modes consistent without duplicating component styles.
date: 2026-10-21
tags: [CSS, Accessibility]
---
A theme is more than a background switch. Text, borders, controls, code blocks, and callouts all need enough separation to stay readable. Semantic tokens let components express the role of a color while the theme chooses the actual value.

## Name the role

```css
:root {
  --color-bg: #0a0a0a;
  --color-text: #ededed;
  --color-accent: #3b82f6;
}

:root[data-theme='light'] {
  --color-bg: #f6f6f7;
  --color-text: #17171c;
  --color-accent: #2563eb;
}
```

A component uses `--color-text` because it needs readable foreground text. It should not need to know whether the site is in light mode. This keeps the component's responsibility small and makes future palette changes easier to review.

## Treat code as a separate surface

Syntax highlighting contains many foreground colors. Changing only the code block's background can leave comments or punctuation difficult to read. A renderer that emits both light and dark token colors allows the theme switch to update the entire code sample together.

The article should not need to recompile in the browser to switch themes. The build can prepare both color sets, and CSS can choose between them.

> [!TIP]
> Inspect the quiet parts of the interface first: descriptions, dates, borders, and placeholder text. Large headings often look fine while supporting information becomes hard to read.

## Keep meaning outside color

A warning should say “Warning.” A selected filter should expose its pressed state. A link should be recognizable in prose. Color can reinforce those signals, but a reader should not have to distinguish two hues to understand the interface.

## Check the transition

If the site remembers a theme choice, apply it early enough to avoid flashing the other theme during startup. Keep storage access guarded because browser settings can prevent it. The default theme should remain usable even when persistence is unavailable.

A practical review is small: open the same article in each theme, inspect a code block and a callout, tab through the controls, and repeat at a narrow viewport. That catches more than checking the home-page background alone.
