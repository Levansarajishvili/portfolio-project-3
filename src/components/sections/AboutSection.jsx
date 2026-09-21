import { Waypoint } from '@/components/map/Waypoint.jsx';
import { projects } from '@/data/projects.js';
import { usePreferences } from '@/hooks/usePreferences.js';
import { reveal } from '@/lib/reveal.js';
import { routeColor, waypointProgress } from '@/lib/route.js';
import { cn, container } from '@/lib/utils.js';

const PROGRESS = waypointProgress(projects.length + 1);

export function AboutSection() {
  const { copy } = usePreferences();
  const [lead, detail] = copy.about.bio;

  return (
    <section id="about" aria-labelledby="about-title" className="relative scroll-mt-[72px] py-14 lg:scroll-mt-0 lg:py-20">
      <div className={cn(container, 'relative z-[4] lg:grid lg:grid-cols-[72px_380px_minmax(0,1fr)] lg:gap-x-10')}>
        <div className="hidden justify-center pt-3.5 lg:flex">
          <Waypoint progress={PROGRESS} />
        </div>
        <h2
          id="about-title"
          ref={reveal}
          data-reveal="up"
          className="text-[44px] leading-[1.05] font-[740] tracking-[-0.015em] [font-stretch:78%] lg:text-[64px]"
        >
          {copy.about.title}
        </h2>
        <div className="mt-5 lg:mt-0">
          <p ref={reveal} data-reveal="up" className="max-w-[34ch] text-xl leading-[1.55] lg:text-[22px]">
            {lead}
          </p>
          <p ref={reveal} data-reveal="up" className="mt-[18px] max-w-[34ch] text-ink-2 [--reveal-delay:100ms]">
            {detail}
          </p>

          <div
            ref={reveal}
            data-reveal="up"
            className="mt-[30px] flex items-start gap-4 border-[1.5px] border-dashed border-ink px-5 py-[18px] [--reveal-delay:150ms]"
          >
            {/* Dashed "next waypoint" ring turns once, like a compass finding north. */}
            <span
              aria-hidden="true"
              className="spin-once mt-[3px] size-5 shrink-0 rounded-full border-[3px] border-dashed"
              style={{ borderColor: routeColor(PROGRESS) }}
            />
            <p>
              <b className="block text-[17px] font-semibold">{copy.about.next.title}</b>
              <span className="text-[15.5px] text-ink-2">{copy.about.next.body}</span>
            </p>
          </div>

          <dl ref={reveal} data-reveal-group="" className="mt-[34px] border-t-[1.5px] border-ink">
            {copy.about.facts.map((fact, index) => (
              <div
                key={fact.label}
                style={{ '--i': index }}
                className="grid grid-cols-[130px_1fr] gap-3 border-b border-rule py-[13px] text-base lg:grid-cols-[150px_1fr]"
              >
                <dt className="text-ink-2">{fact.label}</dt>
                <dd className="font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
