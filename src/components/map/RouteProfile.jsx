import { useId } from 'react';
import { projects } from '@/data/projects.js';
import { usePreferences } from '@/hooks/usePreferences.js';
import { buildProfile } from '@/lib/profile-path.js';

const PROFILE = buildProfile({ stops: [0.109, 0.355, 0.6, 0.818] });

/** Elevation profile of the journey: every project is a stop on the climb. */
export function RouteProfile() {
  const { copy } = usePreferences();
  const gradient = `profile-gradient-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const { width, height, exploredPath, aheadPath, hatch, start, peak, stops } = PROFILE;

  return (
    <figure className="my-2.5">
      <svg
        viewBox={`0 -10 ${width} ${height + 34}`}
        role="img"
        aria-label={copy.work.profile.label}
        className="block h-auto w-full overflow-visible"
      >
        <defs>
          <linearGradient id={gradient} x1="0" x2="1">
            <stop offset="0" style={{ stopColor: 'var(--color-route-start)' }} />
            <stop offset="1" style={{ stopColor: 'var(--color-route-end)' }} />
          </linearGradient>
        </defs>

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

        {stops.map(({ x, y }, index) => (
          <g key={projects[index].id}>
            <line x1={x} y1={y - 12} x2={x} y2={y - 40} stroke="var(--color-ink)" strokeWidth="1" opacity="0.5" />
            <circle cx={x} cy={y} r="7" fill="var(--color-paper)" stroke="var(--color-route-end)" strokeWidth="3" />
            <text x={x} y={y - 48} textAnchor="middle" className="fill-ink text-sm font-semibold">
              {copy.projects[projects[index].id].title}
            </text>
          </g>
        ))}

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
      </svg>
    </figure>
  );
}
