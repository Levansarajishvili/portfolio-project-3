import { useId } from 'react';
import { Layers } from 'lucide-react';
import { usePreferences } from '@/hooks/usePreferences.js';
import { cn } from '@/lib/utils.js';

const STYLES = ['day', 'night'];

/** Leaflet-style layer picker. Switches the whole site between Day and Night. */
export function MapStyleControl({ className }) {
  const { theme, setTheme, copy } = usePreferences();
  const id = useId();

  return (
    <div
      role="radiogroup"
      aria-labelledby={`${id}-title`}
      className={cn(
        'rounded-lg bg-panel px-3.5 pb-2.5 pt-2.5 text-sm leading-tight shadow-[0_1px_5px_rgba(22,35,59,.35)]',
        className,
      )}
    >
      <p id={`${id}-title`} className="mb-1.5 flex items-center gap-2 font-semibold">
        <Layers size={17} aria-hidden="true" />
        {copy.map.style}
      </p>
      {STYLES.map((style) => (
        <label key={style} className="flex cursor-pointer items-center gap-2 py-[3px]">
          <input
            type="radio"
            name={`${id}-style`}
            value={style}
            checked={theme === style}
            onChange={() => setTheme(style)}
            className="peer sr-only"
          />
          <span
            aria-hidden="true"
            className="grid size-3.5 place-items-center rounded-full border-[1.5px] border-ink after:size-1.5 after:rounded-full after:bg-ink after:opacity-0 after:content-[''] peer-checked:after:opacity-100 peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-route-end peer-focus-visible:outline-solid"
          />
          {copy.map[style]}
        </label>
      ))}
    </div>
  );
}
