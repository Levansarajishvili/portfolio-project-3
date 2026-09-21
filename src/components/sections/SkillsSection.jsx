import { useMemo, useState } from 'react';
import { SectionHeader } from './SectionHeader.jsx';
import { SkillCard } from './SkillCard.jsx';
import { SkillFilter } from './SkillFilter.jsx';
import { Waypoint } from '@/components/map/Waypoint.jsx';
import { projects } from '@/data/projects.js';
import { skills } from '@/data/skills.js';
import { usePreferences } from '@/hooks/usePreferences.js';
import { waypointProgress } from '@/lib/route.js';
import { cn, container } from '@/lib/utils.js';

const TRAIL_ROW = 'lg:grid lg:grid-cols-[72px_minmax(0,1fr)] lg:gap-x-10';

export function SkillsSection() {
  const { copy } = usePreferences();
  const [filter, setFilter] = useState('all');
  const visible = useMemo(
    () => (filter === 'all' ? skills : skills.filter((skill) => skill.category === filter)),
    [filter],
  );

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative scroll-mt-[72px] py-14 lg:scroll-mt-0 lg:py-20">
      <div className={cn(container, 'relative z-[4]')}>
        <div className={TRAIL_ROW}>
          <div className="hidden justify-center pt-3.5 lg:flex">
            <Waypoint progress={waypointProgress(projects.length)} />
          </div>
          <SectionHeader id="skills-title" title={copy.skills.title} intro={copy.skills.intro} />
        </div>
        <div className={TRAIL_ROW}>
          <div aria-hidden="true" className="hidden lg:block" />
          <div>
            <SkillFilter value={filter} onChange={setFilter} />
            <p className="sr-only" aria-live="polite">
              {copy.skills.showing(visible.length)}
            </p>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-[18px]">
              {visible.map((skill) => (
                <li key={skill.id}>
                  <SkillCard skill={skill} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
