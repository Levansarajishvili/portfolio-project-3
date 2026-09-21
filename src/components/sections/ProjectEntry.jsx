import { LegendSymbol } from '@/components/ui/LegendSymbol.jsx';
import { Waypoint } from '@/components/map/Waypoint.jsx';
import { profile } from '@/data/profile.js';
import { skillsById } from '@/data/skills.js';
import { usePreferences } from '@/hooks/usePreferences.js';
import { projectText } from '@/i18n/index.js';
import { routeColor } from '@/lib/route.js';
import { displayUrl } from '@/lib/utils.js';

function CompassIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="mt-[3px] shrink-0">
      <circle cx="12" cy="12" r="9" fill="none" stroke="var(--color-ink)" strokeWidth="2" />
      <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8z" fill="var(--color-route-end)" />
    </svg>
  );
}

export function ProjectEntry({ project, progress, active = false }) {
  const { copy } = usePreferences();
  const text = projectText(copy, project.id);
  const titleId = `${project.id}-title`;

  return (
    <article
      id={project.id}
      aria-labelledby={titleId}
      className="grid scroll-mt-[72px] gap-[18px] py-9 lg:scroll-mt-[60px] lg:grid-cols-[72px_380px_minmax(0,1fr)] lg:items-start lg:gap-x-10 lg:gap-y-0 lg:py-16"
    >
      <div className="hidden justify-center pt-3.5 lg:flex">
        <Waypoint progress={progress} active={active} />
      </div>

      <div className="order-2 lg:order-none">
        <h3
          id={titleId}
          className="text-[32px] leading-[1.08] font-[720] tracking-[-0.01em] [font-stretch:80%] lg:text-[40px]"
        >
          {text.title}
        </h3>
        <p className="mt-4 max-w-[34ch] text-ink-2">{text.description}</p>

        <ul aria-label={copy.work.stack} className="mt-[22px] flex flex-wrap gap-x-[18px] gap-y-2 text-[15px] font-medium">
          {project.stack.map((id) => (
            <li key={id} className="flex items-center gap-2">
              <LegendSymbol type={skillsById[id].symbol} />
              {skillsById[id].name}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-x-[26px] gap-y-3 text-base font-semibold">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noreferrer" className="link-underline">
              {copy.work.demo}
              <span className="sr-only"> {copy.work.newTab}</span>
            </a>
          )}
          <a
            href={project.codeUrl ?? profile.github.repositories}
            target="_blank"
            rel="noreferrer"
            className="link-underline"
          >
            {copy.work.code}
            <span className="sr-only"> {copy.work.newTab}</span>
          </a>
        </div>

        <aside
          className="mt-[22px] flex max-w-[36ch] gap-3 border-l-[3px] bg-land/80 px-3.5 py-3"
          style={{ borderLeftColor: routeColor(progress) }}
        >
          <CompassIcon />
          <p className="text-[15.5px] leading-normal">
            <b className="block text-[12.5px] font-semibold text-ink-2">{copy.work.fieldNote}</b>
            <span className="italic-latin">{text.note}</span>
          </p>
        </aside>
      </div>

      <figure className="order-1 border-[1.5px] border-ink bg-land p-[7px] lg:order-none">
        <img
          src={project.image.src}
          width={project.image.width}
          height={project.image.height}
          alt={copy.work.screenshotAlt(text.title)}
          loading="lazy"
          decoding="async"
          className="block aspect-[2.2/1] w-full border border-ink/50 object-cover"
          style={{ objectPosition: project.image.position }}
        />
        <figcaption className="px-0.5 pb-px pt-[9px] text-[13px] text-ink-2">
          {project.demoUrl ? displayUrl(project.demoUrl) : copy.work.demoSoon}
        </figcaption>
      </figure>
    </article>
  );
}
