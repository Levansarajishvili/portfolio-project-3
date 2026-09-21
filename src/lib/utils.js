import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge conditional class names and resolve Tailwind conflicts. */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** "https://levansarajishvili.github.io/Leo-News/" -> "levansarajishvili.github.io/Leo-News" */
export function displayUrl(url) {
  try {
    const { host, pathname } = new URL(url);
    return `${host}${pathname}`.replace(/\/$/, '');
  } catch {
    return url;
  }
}

/** Shared page container: 1312px max, 64px gutters on desktop (matches the design grid). */
export const container = 'mx-auto w-full max-w-[1312px] px-5 md:px-8 lg:px-16';
