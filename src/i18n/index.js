import en from './en.js';
import ka from './ka.js';

export const dictionaries = { en, ka };

export const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ka', label: 'ქარ', name: 'ქართული' },
];

const EMPTY_PROJECT = { title: '', description: '', note: '' };

/**
 * Text for a project in the current language. Falls back to English, then to the
 * project id, so a missing translation never breaks the page.
 */
export function projectText(copy, id) {
  const own = copy.projects[id];
  if (!own && import.meta.env.DEV) {
    console.warn(`[i18n] No text for project "${id}" in this language. Add projects["${id}"] to src/i18n/en.js and ka.js.`);
  }
  const text = own ?? en.projects[id];
  return text ? { ...EMPTY_PROJECT, ...text } : { ...EMPTY_PROJECT, title: id };
}
