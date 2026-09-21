import { routeColor } from '@/lib/route.js';

/**
 * A stop on the page route. The route layer connects every [data-waypoint].
 * `active` marks the project that is in view ("you are here").
 */
export function Waypoint({ progress, destination = false, active = false }) {
  if (destination) {
    return (
      <span
        data-waypoint=""
        aria-hidden="true"
        className="relative z-[5] block size-[22px] rotate-45 rounded-[4px] bg-route-end"
      />
    );
  }

  const color = routeColor(progress);
  return (
    <span
      data-waypoint=""
      aria-hidden="true"
      className="relative z-[5] block size-[22px] rounded-full border-[3.5px] bg-paper motion-safe:transition-[background-color,box-shadow] motion-safe:duration-300"
      style={{
        borderColor: color,
        ...(active && {
          backgroundColor: color,
          boxShadow: `0 0 0 6px color-mix(in oklab, ${color} 24%, transparent)`,
        }),
      }}
    />
  );
}
