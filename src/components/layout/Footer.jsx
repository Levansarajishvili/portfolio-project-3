import { usePreferences } from '@/hooks/usePreferences.js';
import { cn, container } from '@/lib/utils.js';

const YEAR = new Date().getFullYear();

export function Footer() {
  const { copy } = usePreferences();
  return (
    <footer className="relative z-[4] border-t-[1.5px] border-ink py-7 text-sm text-ink-2">
      <div className={cn(container, 'flex flex-col gap-1.5 md:flex-row md:justify-between')}>
        <span>
          © {YEAR} {copy.hero.fullName}
        </span>
        <span>{copy.footer.credit}</span>
      </div>
    </footer>
  );
}
