/**
 * useTheme
 *
 * Light/dark theme state, persisted in localStorage and mirrored onto
 * `<html data-theme="...">` — the attribute the SCSS tokens in
 * app/assets/scss/_themes.scss switch on. Dark is the default, so a first-time
 * visitor keeps the original look.
 *
 * The inline script in nuxt.config.ts applies the stored value before first
 * paint, so a returning light-mode visitor never sees a dark flash; onMounted
 * syncs this composable's state with whatever that script already applied.
 */
export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';

export function useTheme() {
  const theme = useState<Theme>('theme', () => 'dark');

  function apply(value: Theme) {
    theme.value = value;
    document.documentElement.dataset.theme = value;
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* storage unavailable (private mode) — theme still applies for the session */
    }
  }

  function toggle() {
    apply(theme.value === 'dark' ? 'light' : 'dark');
  }

  /* Pick up the theme the pre-hydration script already applied */
  onMounted(() => {
    theme.value = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
  });

  return { theme, toggle };
}
