import { cn } from '@/lib/utils.js';

export function SectionHeader({ id, title, intro, className }) {
  return (
    <header
      className={cn(
        'flex flex-col gap-2.5 pb-[18px] lg:flex-row lg:items-baseline lg:justify-between lg:gap-10',
        className,
      )}
    >
      <h2
        id={id}
        className="text-[44px] leading-[1.05] font-[740] tracking-[-0.015em] [font-stretch:78%] lg:text-[64px]"
      >
        {title}
      </h2>
      {intro && <p className="max-w-[36ch] text-ink-2 lg:text-right lg:text-lg">{intro}</p>}
    </header>
  );
}
