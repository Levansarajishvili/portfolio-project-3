import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { LanguageSwitch } from './LanguageSwitch.jsx';
import { MapStyleControl } from '@/components/map/MapStyleControl.jsx';
import { useFocusTrap } from '@/hooks/useFocusTrap.js';
import { usePreferences } from '@/hooks/usePreferences.js';
import { cn } from '@/lib/utils.js';

const SECTIONS = ['work', 'skills', 'about', 'contact'];

/** Full-screen menu for small screens: links, language and map style. */
export function MobileMenu({ open, onClose, active }) {
  const { copy } = usePreferences();
  const panelRef = useRef(null);
  useFocusTrap(panelRef, open, onClose);

  if (!open) return null;

  // Portal: the sticky header uses backdrop-filter, which would trap a fixed child.
  return createPortal(
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={copy.nav.menu}
      className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-paper px-5 pb-8 md:px-8"
    >
      <div className="flex h-[72px] shrink-0 items-center justify-between">
        <span className="text-xl font-bold [font-stretch:82%]">{copy.hero.fullName}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.nav.closeMenu}
          className="grid size-10 place-items-center rounded-lg border-[1.5px] border-ink"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <nav aria-label={copy.nav.primary} className="mt-6">
        <ul className="border-t-[1.5px] border-ink">
          {SECTIONS.map((id, index) => (
            <li key={id} className="border-b border-rule">
              <a
                href={`#${id}`}
                onClick={onClose}
                aria-current={active === id ? 'true' : undefined}
                className={cn(
                  'flex items-baseline justify-between py-4 text-[34px] font-bold leading-tight [font-stretch:78%]',
                  active === id && 'text-route-end',
                )}
              >
                {copy.nav[id]}
                <span aria-hidden="true" className="text-sm font-medium text-ink-2">
                  0{index + 1}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto flex flex-wrap items-end justify-between gap-6 pt-10">
        <LanguageSwitch />
        <MapStyleControl />
      </div>
    </div>,
    document.body,
  );
}
