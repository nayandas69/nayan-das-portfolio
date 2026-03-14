/**
 * useLanguageList — Unit Tests
 *
 * Validates the language-to-color mapping composable.
 * Tests known languages, edge cases, and the fallback behavior.
 *
 * @see ~/composables/useLanguageList.ts
 */
import { describe, it, expect } from 'vitest';
import { useLanguageList } from '~/composables/useLanguageList';

describe('useLanguageList', () => {
  /* ── Setup ─────────────────────────────────────────── */
  const { langColor } = useLanguageList();

  /* ── Known languages return correct hex colors ─────── */
  describe('known languages', () => {
    it('returns #f1e05a for JavaScript', () => {
      expect(langColor('JavaScript')).toBe('#f1e05a');
    });

    it('returns #3178c6 for TypeScript', () => {
      expect(langColor('TypeScript')).toBe('#3178c6');
    });

    it('returns #3572A5 for Python', () => {
      expect(langColor('Python')).toBe('#3572A5');
    });

    it('returns #e34c26 for HTML', () => {
      expect(langColor('HTML')).toBe('#e34c26');
    });

    it('returns #563d7c for CSS', () => {
      expect(langColor('CSS')).toBe('#563d7c');
    });

    it('returns #41b883 for Vue', () => {
      expect(langColor('Vue')).toBe('#41b883');
    });

    it('returns #dea584 for Rust', () => {
      expect(langColor('Rust')).toBe('#dea584');
    });

    it('returns #00ADD8 for Go', () => {
      expect(langColor('Go')).toBe('#00ADD8');
    });

    it('returns #b07219 for Java', () => {
      expect(langColor('Java')).toBe('#b07219');
    });

    it('returns #701516 for Ruby', () => {
      expect(langColor('Ruby')).toBe('#701516');
    });

    it('returns #f34b7d for C++', () => {
      expect(langColor('C++')).toBe('#f34b7d');
    });

    it('returns #555555 for C', () => {
      expect(langColor('C')).toBe('#555555');
    });

    it('returns #A97BFF for Kotlin', () => {
      expect(langColor('Kotlin')).toBe('#A97BFF');
    });

    it('returns #F05138 for Swift', () => {
      expect(langColor('Swift')).toBe('#F05138');
    });

    it('returns #89e051 for Shell', () => {
      expect(langColor('Shell')).toBe('#89e051');
    });

    it('returns #4F5D95 for PHP', () => {
      expect(langColor('PHP')).toBe('#4F5D95');
    });

    it('returns #fcb32c for MDX', () => {
      expect(langColor('MDX')).toBe('#fcb32c');
    });

    it('returns #00B4AB for Dart', () => {
      expect(langColor('Dart')).toBe('#00B4AB');
    });
  });

  /* ── Extended Linguist colors ──────────────────────── */
  describe('extended Linguist languages', () => {
    it('returns #6e4a7e for Elixir', () => {
      expect(langColor('Elixir')).toBe('#6e4a7e');
    });

    it('returns #ff5a03 for Astro', () => {
      expect(langColor('Astro')).toBe('#ff5a03');
    });

    it('returns #ff3e00 for Svelte', () => {
      expect(langColor('Svelte')).toBe('#ff3e00');
    });

    it('returns #000080 for Lua', () => {
      expect(langColor('Lua')).toBe('#000080');
    });

    it('returns #ec915c for Zig', () => {
      expect(langColor('Zig')).toBe('#ec915c');
    });

    it('returns #384d54 for Dockerfile', () => {
      expect(langColor('Dockerfile')).toBe('#384d54');
    });

    it('returns #c22d40 for Scala', () => {
      expect(langColor('Scala')).toBe('#c22d40');
    });

    it('returns #e10098 for GraphQL', () => {
      expect(langColor('GraphQL')).toBe('#e10098');
    });
  });

  /* ── Fallback for unknown / missing languages ──────── */
  describe('fallback behavior', () => {
    it('returns #888888 for an unknown language string', () => {
      expect(langColor('BrainMelt2000')).toBe('#888888');
    });

    it('returns #888888 for an empty string', () => {
      expect(langColor('')).toBe('#888888');
    });

    it('returns #888888 for undefined', () => {
      expect(langColor(undefined)).toBe('#888888');
    });

    it('returns #888888 for null', () => {
      expect(langColor(null)).toBe('#888888');
    });
  });

  /* ── Case sensitivity ──────────────────────────────── */
  describe('case sensitivity', () => {
    it('does not match lowercase "javascript"', () => {
      expect(langColor('javascript')).toBe('#888888');
    });

    it('does not match uppercase "PYTHON"', () => {
      expect(langColor('PYTHON')).toBe('#888888');
    });
  });
});
