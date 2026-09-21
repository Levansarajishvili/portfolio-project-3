import { routeColor } from '@/lib/route.js';

/** A stop on the page route. The route layer connects every [data-waypoint]. */
export function Waypoint({ progress, destination = false }) {
  if (destination) {
    return (
      <span
        data-waypoint=""
        aria-hidden="true"
        className="relative z-[5] block size-[22px] rotate-45 rounded-[4px] bg-route-end"
      />
    );
  }
  return (
    <span
      data-waypoint=""
      aria-hidden="true"
      className="relative z-[5] block size-[22px] rounded-full border-[3.5px] bg-paper"
      style={{ borderColor: routeColor(progress) }}
    />
  );
}
