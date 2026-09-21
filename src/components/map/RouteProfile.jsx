import { useId } from 'react';
import { projects } from '@/data/projects.js';
import { usePreferences } from '@/hooks/usePreferences.js';
import { projectText } from '@/i18n/index.js';
import { buildProfile } from '@/lib/profile-path.js';
import { cn } from '@/lib/utils.js';

// One stop per project, spread evenly over the explored part of the climb.
const FIRST_STOP = 0.109;
const LAST_STOP = 0.818;

function stopFractions(count) {
  if (count <= 0) return [];
  if (count === 1) return [(FIRST_STOP + LAST_STOP) / 2];
  const step = (LAST_STOP - FIRST_STOP) / (count - 1);
  return Array.from({ length: count }, (_, index) => FIRST_STOP + index * step);
}

const PROFILE = buildProfile({ stops: stopFractions(projects.length) });

// With more than five projects the labels get close: every other label moves below the line.
const STAGGER = projects.length > 5;

/**
 * Elevation profile of the journey. Every project is a stop and every stop is a
 * link to its project. The stop of the project in view is highlighted.
 */
export function RouteProfile({ activeId = null }) {
  const { copy } = usePreferences();
  const gradient = `profile-gradient-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const { width, height, exploredPath, aheadPath, hatch, start, peak, stops } = PROFILE;

  return (
    <nav aria-label={copy.work.profile.label(projects.length)} className="my-2.5">
      <svg viewBox={`0 -10 ${width} ${height + 34}`} className="block h-auto w-full overflow-visible">
        <defs>
          <linearGradient id={gradient} x1="0" x2="1">
            <stop offset="0" style={{ stopColor: 'var(--color-route-start)' }} />
            <stop offset="1" style={{ stopColor: 'var(--color-route-end)' }} />
          </linearGradient>
        </defs>

        <g aria-hidden="true">
          <g stroke="var(--color-contour)" strokeWidth="1" opacity="0.45">
            {hatch.map(({ x, y }) => (
              <line key={x} x1={x} y1={y} x2={x} y2={height} />
            ))}
          </g>
          <path d={exploredPath} fill="none" stroke="var(--color-ink)" strokeWidth="1.5" />
          <path
            d={exploredPath}
            fill="none"
            stroke={`url(#${gradient})`}
            strokeWidth="4"
            strokeDasharray="14 6"
            strokeLinecap="round"
          />
          <path
            d={aheadPath}
            fill="none"
            stroke="var(--color-ink-2)"
            strokeWidth="2"
            strokeDasharray="2 6"
            strokeLinecap="round"
          />

          <circle cx={start.x} cy={start.y} r="5" fill="var(--color-route-start)" />
          <text x="0" y={height + 22} className="fill-ink-2 text-[12.5px] font-medium">
            {copy.work.profile.start}
          </text>

          <path
            d={`M${peak.x - 8},${peak.y + 2} l8,-14 l8,14 z`}
            fill="none"
            stroke="var(--color-ink-2)"
            strokeWidth="1.8"
            strokeDasharray="3 3"
          />
          <text x={width} y={peak.y - 20} textAnchor="end" className="italic-latin fill-ink-2 text-sm font-semibold">
            {copy.work.profile.next}
          </text>
          <text x={width} y={height + 22} textAnchor="end" className="fill-ink-2 text-[12.5px] font-medium">
            {copy.work.profile.climbing}
          </text>
        </g>

        {projects.map((project, index) => {
          const { x, y } = stops[index];
          const below = STAGGER && index % 2 === 1;
          const label = below
            ? { tickFrom: y + 12, tickTo: y + 22, y: y + 38 }
            : { tickFrom: y - 12, tickTo: y - 40, y: y - 48 };
          const active = project.id === activeId;
          const highlight = active
            ? 'fill-route-end scale-125'
            : 'fill-paper group-hover:fill-route-end group-hover:scale-125 group-focus-visible:fill-route-end group-focus-visible:scale-125';

          return (
            <a
              key={project.id}
              href={`#${project.id}`}
              aria-current={active ? 'true' : undefined}
              className="group cursor-pointer outline-hidden"
            >
              {/* Larger invisible hit area, easier to click and tap. */}
              <circle cx={x} cy={y} r="24" fill="transparent" />
              <line
                x1={x}
                y1={label.tickFrom}
                x2={x}
                y2={label.tickTo}
                strokeWidth="1"
                className={cn(
                  'stroke-ink motion-safe:transition-opacity',
                  active ? 'opacity-100' : 'opacity-50 group-hover:opacity-100 group-focus-visible:opacity-100',
                )}
              />
              {/* Keyboard focus ring (dashed, like the route). */}
              <circle
                cx={x}
                cy={y}
                r="16"
                fill="none"
                strokeWidth="2"
                strokeDasharray="3 3"
                className="stroke-ink opacity-0 group-focus-visible:opacity-100"
              />
              <circle
                cx={x}
                cy={y}
                r="7"
                strokeWidth="3"
                className={cn(
                  'origin-center stroke-route-end [transform-box:fill-box] motion-safe:transition-[fill,scale] motion-safe:duration-200',
                  highlight,
                )}
              />
              <text
                x={x}
                y={label.y}
                textAnchor="middle"
                className={cn(
                  'fill-ink stroke-paper text-sm [paint-order:stroke] [stroke-linejoin:round] [stroke-width:4px]',
                  active ? 'font-bold' : 'font-semibold group-hover:font-bold group-focus-visible:font-bold',
                )}
              >
                {projectText(copy, project.id).title}
              </text>
            </a>
          );
        })}
      </svg>
    </nav>
  );
}
