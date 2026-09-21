import { useEffect, useState } from 'react';

/** true once the page has scrolled past `offset` pixels (rAF-throttled). */
export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > offset);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > offset));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [offset]);

  return scrolled;
}
