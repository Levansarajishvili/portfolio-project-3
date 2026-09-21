import { LegendSymbol } from '@/components/ui/LegendSymbol.jsx';
import { usePreferences } from '@/hooks/usePreferences.js';
import { cn } from '@/lib/utils.js';

export function SkillCard({ skill }) {
  const { copy } = usePreferences();
  const learning = skill.status === 'learning';

  return (
    <article
      className={cn(
        'flex h-full min-h-[150px] flex-col border-[1.5px] border-ink p-3.5 lg:min-h-[176px] lg:px-5 lg:pb-4 lg:pt-[18px]',
        learning ? 'border-dashed bg-transparent' : 'bg-land',
      )}
    >
      <p className="flex items-center gap-2.5 text-[13px] font-medium text-ink-2">
        <LegendSymbol type={skill.symbol} />
        {copy.skills.filters[skill.category]}
      </p>
      <h3 className="mt-3.5 text-[21px] leading-[1.1] font-[720] tracking-[-0.01em] [font-stretch:82%] lg:text-[26px]">
        {skill.name}
      </h3>
      <p className="mt-2 text-[14.5px] leading-[1.45] text-ink-2">
        <span className="block text-[12.5px] opacity-80">{learning ? copy.skills.status : copy.skills.usedIn}</span>
        {copy.skills.items[skill.id]}
      </p>
      <p className="mt-auto flex items-center gap-[7px] pt-3.5 text-[12.5px] font-semibold">
        <span aria-hidden="true" className={cn('w-[18px] border-t-[2.5px] border-ink', learning && 'border-dashed')} />
        {learning ? copy.skills.learning : copy.skills.shipped}
      </p>
    </article>
  );
}
