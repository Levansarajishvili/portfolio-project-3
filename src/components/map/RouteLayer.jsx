import { useEffect, useId, useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery.js';
import { usePreferences } from '@/hooks/usePreferences.js';

const DESKTOP = '(min-width: 64rem)';
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function centerOf(element, origin) {
  const rect = element.getBoundingClientRect();
  return [rect.left + rect.width / 2 - origin.left, rect.top + rect.height / 2 - origin.top];
}

/**
 * One leg per stretch between stops. Early legs are thin and sparsely dashed,
 * later legs get thicker and denser, the last one is solid: the line "grows".
 */
function buildLegs(start, points, heroBottom) {
  const [sx, sy] = start;
  const [fx, fy] = points[0];
  const turnY = heroBottom + 120;
  const paths = [
    `M${sx},${sy} C${sx},${heroBottom + 30} ${sx - 40},${turnY} ${(sx + fx) / 2},${turnY} S${fx},${turnY + 10} ${fx},${fy}`,
  ];
  for (let i = 1; i < points.length; i += 1) {
    const [ax, ay] = points[i - 1];
    const [x, y] = points[i];
    const sway = i % 2 ? 14 : -14;
    const mid = (ay + y) / 2;
    paths.push(`M${ax},${ay} C${ax},${ay + 60} ${ax + sway},${mid - 40} ${ax + sway},${mid} S${x},${y - 60} ${x},${y}`);
  }
  return paths.map((d, index) => {
    const k = paths.length > 1 ? index / (paths.length - 1) : 1;
    return {
      d,
      width: 2.4 + 2.6 * k,
      dash: k >= 1 ? 'none' : `${(4 + 14 * k).toFixed(1)} ${(10 * (1 - k) + 3).toFixed(1)}`,
    };
  });
}

/**
 * Draws the dashed route from the Tbilisi pin through every waypoint to the contact
 * section. Desktop only. Colour comes from CSS variables, so Day/Night just works.
 * The stretch you have already scrolled past is drawn at full strength.
 */
export function RouteLayer({ containerRef }) {
  const isDesktop = useMediaQuery(DESKTOP);
  const reducedMotion = useMediaQuery(REDUCED_MOTION);
  const { lang } = usePreferences();
  const [geometry, setGeometry] = useState(null);
  const clipRectRef = useRef(null);
  // Furthest point the visitor has scrolled to. Kept across re-measures, so the route never un-draws.
  const reachedRef = useRef(0);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');

  // Measure the pin + waypoints and rebuild the path whenever the layout changes.
  useEffect(() => {
    const container = containerRef.current;
    if (!isDesktop || !container) return undefined;

    let frame = 0;
    let alive = true;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!alive) return;
        const origin = container.getBoundingClientRect();
        const start = container.querySelector('[data-route-start]');
        const hero = container.querySelector('#top');
        const points = [...container.querySelectorAll('[data-waypoint]')]
          .filter((element) => element.getClientRects().length > 0)
          .map((element) => centerOf(element, origin));
        if (!start || !hero || !points.length) {
          setGeometry(null);
          return;
        }
        // Leave the pin itself clean: the line starts just below its outline.
        const pin = start.getBoundingClientRect();
        const from = [pin.left + pin.width / 2 - origin.left, pin.bottom - origin.top + 3];
        setGeometry({
          width: container.scrollWidth,
          height: container.scrollHeight,
          top: from[1],
          bottom: points[points.length - 1][1],
          legs: buildLegs(from, points, hero.getBoundingClientRect().bottom - origin.top),
        });
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [containerRef, isDesktop, lang]);

  // Reveal the travelled part of the route as the visitor scrolls (it never "un-travels").
  useEffect(() => {
    const rect = clipRectRef.current;
    const container = containerRef.current;
    if (!geometry || !rect || !container) return undefined;
    if (reducedMotion) {
      rect.setAttribute('height', String(geometry.height));
      return undefined;
    }

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const top = container.getBoundingClientRect().top;
        reachedRef.current = Math.max(reachedRef.current, window.innerHeight * 0.62 - top);
        rect.setAttribute('height', String(Math.max(0, Math.min(reachedRef.current, geometry.height))));
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
    };
  }, [geometry, reducedMotion, containerRef]);

  if (!isDesktop || !geometry) return null;

  const { width, height, top, bottom, legs } = geometry;
  const gradient = `route-gradient-${uid}`;
  const clip = `route-travelled-${uid}`;

  return (
    <svg
      aria-hidden="true"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="pointer-events-none absolute left-0 top-0 z-[3] overflow-visible"
    >
      <defs>
        <linearGradient id={gradient} gradientUnits="userSpaceOnUse" x1="0" y1={top} x2="0" y2={bottom}>
          <stop offset="0" style={{ stopColor: 'var(--color-route-start)' }} />
          <stop offset="1" style={{ stopColor: 'var(--color-route-end)' }} />
        </linearGradient>
        <clipPath id={clip}>
          <rect ref={clipRectRef} x="0" y="0" width={width} height={height} />
        </clipPath>
      </defs>

      <g opacity="0.3">
        {legs.map((leg, index) => (
          <path
            key={`ahead-${index}`}
            d={leg.d}
            className="route-line"
            stroke={`url(#${gradient})`}
            strokeWidth={leg.width}
            strokeDasharray={leg.dash}
          />
        ))}
      </g>

      <g clipPath={`url(#${clip})`}>
        {legs.map((leg, index) => (
          <g key={`leg-${index}`}>
            <path d={leg.d} className="route-casing" strokeWidth={leg.width + 5} />
            <path
              d={leg.d}
              className="route-line"
              stroke={`url(#${gradient})`}
              strokeWidth={leg.width}
              strokeDasharray={leg.dash}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
