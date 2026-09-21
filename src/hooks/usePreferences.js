import { use } from 'react';
import { PreferencesContext } from '@/context/preferences-context.js';

export function usePreferences() {
  const context = use(PreferencesContext);
  if (!context) throw new Error('usePreferences must be used inside <PreferencesProvider>');
  return context;
}
