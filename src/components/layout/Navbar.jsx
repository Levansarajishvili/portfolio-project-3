import { useCallback, useState } from 'react';
import { Menu } from 'lucide-react';
import { LanguageSwitch } from './LanguageSwitch.jsx';
import { MobileMenu } from './MobileMenu.jsx';
import { useActiveSection } from '@/hooks/useActiveSection.js';
import { usePreferences } from '@/hooks/usePreferences.js';
import { useScrolled } from '@/hooks/useScrolled.js';
import { cn } from '@/lib/utils.js';

const NAV_SECTIONS = ['work', 'skills', 'about', 'contact'];
const OBSERVED = ['top', ...NAV_SECTIONS];

export function Navbar() {
  const { copy } = usePreferences();
  const scrolled = useScrolled(24);
  const active = useActiveSection(OBSERVED);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-200',
        scrolled ? 'border-rule bg-paper/90 backdrop-blur-md' : 'border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-8 lg:h-[84px] lg:px-16">
        <a href="#top" className="text-xl font-bold tracking-[-0.005em] [font-stretch:82%]">
          {copy.hero.fullName}
        </a>

        <nav aria-label={copy.nav.primary} className="hidden items-center gap-9 lg:flex">
          <ul className="flex gap-8 text-base font-medium">
            {NAV_SECTIONS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? 'true' : undefined}
                  className="relative py-1 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-route-end after:transition-transform hover:after:scale-x-100 aria-[current=true]:after:scale-x-100"
                >
                  {copy.nav[id]}
                </a>
              </li>
            ))}
          </ul>
          <LanguageSwitch />
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label={copy.nav.openMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="grid size-10 place-items-center rounded-lg border-[1.5px] border-ink bg-land/60 lg:hidden"
        >
          <Menu size={20} aria-hidden="true" />
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} active={active} />
    </header>
  );
}
