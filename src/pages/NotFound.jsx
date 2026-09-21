import { Link } from 'react-router-dom';
import { LanguageSwitch } from '@/components/layout/LanguageSwitch.jsx';
import { usePreferences } from '@/hooks/usePreferences.js';
import { buttonVariants } from '@/lib/button-variants.js';

export default function NotFound() {
  const { copy } = usePreferences();

  return (
    <main className="relative grid min-h-svh place-items-center bg-sea px-5">
      <LanguageSwitch className="absolute right-5 top-5 md:right-8 md:top-7" />
      <div className="max-w-[520px]">
        <svg width="56" height="56" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" fill="none" stroke="var(--color-ink)" strokeWidth="1.5" strokeDasharray="2 2.4" />
          <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8z" fill="var(--color-route-end)" />
        </svg>
        <p className="mt-6 text-sm font-semibold text-ink-2">404</p>
        <h1 className="mt-1 text-[56px] leading-[0.95] font-[760] tracking-[-0.02em] [font-stretch:74%] md:text-[80px]">
          {copy.notFound.title}
        </h1>
        <p className="mt-5 text-lg text-ink-2">{copy.notFound.body}</p>
        <Link to="/" className={buttonVariants({ className: 'mt-8' })}>
          {copy.notFound.back}
        </Link>
      </div>
    </main>
  );
}
