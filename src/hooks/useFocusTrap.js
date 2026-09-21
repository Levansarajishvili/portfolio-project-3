import { useEffect } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * While `active`: moves focus into `ref`, keeps Tab inside it, closes on Escape,
 * locks page scroll, and gives focus back to the previously focused element.
 * `onEscape` must be stable (useCallback).
 */
export function useFocusTrap(ref, active, onEscape) {
  useEffect(() => {
    const node = ref.current;
    if (!active || !node) return undefined;

    const previous = document.activeElement;
    const focusables = () => [...node.querySelectorAll(FOCUSABLE)].filter((el) => el.getClientRects().length > 0);
    focusables()[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onEscape();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      if (previous instanceof HTMLElement) previous.focus({ preventScroll: true });
    };
  }, [ref, active, onEscape]);
}
