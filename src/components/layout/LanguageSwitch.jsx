import { usePreferences } from '@/hooks/usePreferences.js';
import { LANGUAGES } from '@/i18n/index.js';
import { cn } from '@/lib/utils.js';

export function LanguageSwitch({ className }) {
  const { lang, setLang, copy } = usePreferences();
  return (
    <div
      role="group"
      aria-label={copy.nav.language}
      className={cn('flex rounded-full border-[1.5px] border-ink p-[3px] text-[13px] font-semibold', className)}
    >
      {LANGUAGES.map((option) => {
        const selected = option.code === lang;
        return (
          <button
            key={option.code}
            type="button"
            lang={option.code}
            title={option.name}
            aria-pressed={selected}
            onClick={() => setLang(option.code)}
            className={cn(
              'rounded-full px-[11px] py-0.5 transition-colors',
              selected ? 'bg-ink text-paper' : 'hover:bg-ink/10',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
