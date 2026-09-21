import { useEffect, useState } from 'react';

/**
 * Id of the element (one of `ids`) that crosses the middle of the viewport,
 * or null when none does. Drives the navbar and the "you are here" project stop.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  const key = ids.join('|');

  useEffect(() => {
    const order = key.split('|');
    const elements = order.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return undefined;

    const inView = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) inView.add(entry.target.id);
          else inView.delete(entry.target.id);
        });
        setActive(order.find((id) => inView.has(id)) ?? null);
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
