import { useEffect, useMemo, useState } from 'react';
import { PreferencesContext } from './preferences-context.js';
import { dictionaries } from '@/i18n/index.js';

const LANG_KEY = 'ls:lang';
const THEME_KEY = 'ls:theme';
const THEME_COLOR = { day: '#EEF2EC', night: '#0E1928' };

function readStored(key, allowed) {
  try {
    const value = window.localStorage.getItem(key);
    return allowed.includes(value) ? value : null;
  } catch {
    return null;
  }
}

function persist(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage can be blocked (private mode). The choice still works for this visit.
  }
}

const initialLang = () =>
  readStored(LANG_KEY, ['en', 'ka']) ?? (navigator.language?.toLowerCase().startsWith('ka') ? 'ka' : 'en');

// "Day" is the designed default; "Night" is an opt-in map style that we remember.
const initialTheme = () => readStored(THEME_KEY, ['day', 'night']) ?? 'day';

/**
 * Global UI preferences: language (EN / KA) and map style (Day / Night).
 * Everything else in the app is local state, so a Context is all we need here.
 */
export function PreferencesProvider({ children }) {
  const [lang, setLang] = useState(initialLang);
  const [theme, setTheme] = useState(initialTheme);
  const copy = dictionaries[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = copy.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.meta.description);
    persist(LANG_KEY, lang);
  }, [lang, copy]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
    persist(THEME_KEY, theme);
  }, [theme]);

  const value = useMemo(() => ({ lang, setLang, theme, setTheme, copy }), [lang, theme, copy]);

  return <PreferencesContext value={value}>{children}</PreferencesContext>;
}
