import { ProjectEntry } from './ProjectEntry.jsx';
import { SectionHeader } from './SectionHeader.jsx';
import { RouteProfile } from '@/components/map/RouteProfile.jsx';
import { projects } from '@/data/projects.js';
import { usePreferences } from '@/hooks/usePreferences.js';
import { waypointProgress } from '@/lib/route.js';
import { cn, container } from '@/lib/utils.js';

const TRAIL_ROW = 'lg:grid lg:grid-cols-[72px_minmax(0,1fr)] lg:gap-x-10';

export function WorkSection() {
  const { copy } = usePreferences();

  return (
    <section id="work" aria-labelledby="work-title" className="relative scroll-mt-[72px] pb-5 pt-14 lg:scroll-mt-0 lg:pb-10 lg:pt-[200px]">
      <div className={cn(container, 'relative z-[4]')}>
        <div className={TRAIL_ROW}>
          <div aria-hidden="true" className="hidden lg:block" />
          <SectionHeader id="work-title" title={copy.work.title} intro={copy.work.intro} />
        </div>
        <div className={cn('hidden md:block', TRAIL_ROW)}>
          <div aria-hidden="true" className="hidden lg:block" />
          <RouteProfile />
        </div>
        {projects.map((project, index) => (
          <ProjectEntry key={project.id} project={project} progress={waypointProgress(index)} />
        ))}
      </div>
    </section>
  );
}
