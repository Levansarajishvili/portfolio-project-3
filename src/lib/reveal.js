/**
 * Scroll reveal. An element with `data-reveal` (or `data-reveal-group`) gets
 * `data-revealed` the first time it enters the viewport; the CSS in index.css
 * ("Motion") plays its entrance. One shared IntersectionObserver serves the whole
 * page and each element is revealed only once.
 *
 * Usage: <div ref={reveal} data-reveal="up" className="[--reveal-delay:120ms]" />
 * Variants: up (default), fade, pop, unroll. Groups: data-reveal-group + style={{ '--i': index }}.
 */
let observer = null;

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-revealed', '');
          observer.unobserve(entry.target);
        });
      },
      // Reveal when the element's top passes 90% of the viewport height.
      { rootMargin: '0px 0px -10% 0px' },
    );
  }
  return observer;
}

/** Ref callback. React 19 runs the returned function on unmount. */
export function reveal(node) {
  if (!node) return undefined;
  if (typeof IntersectionObserver === 'undefined') {
    node.setAttribute('data-revealed', '');
    return undefined;
  }
  const io = getObserver();
  io.observe(node);
  return () => io.unobserve(node);
}
