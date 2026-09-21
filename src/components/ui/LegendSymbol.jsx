import { cn } from '@/lib/utils.js';

/** Map-legend glyph for a technology (see .sym-* in index.css). Decorative. */
export function LegendSymbol({ type, className }) {
  return <i aria-hidden="true" className={cn('sym', `sym-${type}`, className)} />;
}
