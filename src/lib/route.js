import { projects } from '@/data/projects.js';

/** Waypoints on the page: one per project, then Skills, About and the Contact destination. */
export const WAYPOINT_TOTAL = projects.length + 3;

/** 0 at Tbilisi, 1 at the destination. */
export const waypointProgress = (index) => (index + 1) / WAYPOINT_TOTAL;

/** The route colour at a given point of the journey (light orange -> orangered). */
export const routeColor = (progress) =>
  `color-mix(in oklab, var(--color-route-start) ${Math.round((1 - progress) * 100)}%, var(--color-route-end))`;
