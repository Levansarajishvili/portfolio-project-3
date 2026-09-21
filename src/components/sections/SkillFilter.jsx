import { SKILL_COUNTS, SKILL_FILTERS } from '@/data/skills.js';
import { usePreferences } from '@/hooks/usePreferences.js';
import { cn } from '@/lib/utils.js';

export function SkillFilter({ value, onChange }) {
  const { copy } = usePreferences();

  return (
    <div
      role="group"
      aria-label={copy.skills.filterLabel}
      className="mb-5 flex gap-0.5 overflow-x-auto rounded-xl border-[1.5px] border-ink bg-land p-1 md:mt-2.5 md:mb-[30px] md:inline-flex md:rounded-full"
    >
      {SKILL_FILTERS.map((filter) => {
        const selected = filter === value;
        return (
          <button
            key={filter}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(filter)}
            className={cn(
              'flex shrink-0 grow items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-2 text-[13.5px] font-semibold transition-colors md:grow-0 md:gap-2 md:px-[18px] md:text-[15px]',
              selected ? 'bg-ink text-paper' : 'hover:bg-ink/[0.07]',
            )}
          >
            {copy.skills.filters[filter]}
            <span className={cn('text-xs font-medium md:text-[13px]', selected ? 'opacity-75' : 'opacity-60')}>
              {SKILL_COUNTS[filter]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
