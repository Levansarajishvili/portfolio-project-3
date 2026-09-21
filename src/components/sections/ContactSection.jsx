import { ContactForm } from './ContactForm.jsx';
import { SectionHeader } from './SectionHeader.jsx';
import { Waypoint } from '@/components/map/Waypoint.jsx';
import { profile } from '@/data/profile.js';
import { usePreferences } from '@/hooks/usePreferences.js';
import { TBILISI } from '@/lib/geo.js';
import { cn, container } from '@/lib/utils.js';

export function ContactSection() {
  const { copy } = usePreferences();
  const text = copy.contact;

  const rows = [
    { label: text.phone, value: <a href={profile.phone.href}>{profile.phone.display}</a> },
    {
      label: text.location,
      value: (
        <>
          {text.locationValue}
          <span className="block text-sm font-normal text-ink-2">{TBILISI.coords}</span>
        </>
      ),
    },
    {
      label: text.github,
      value: (
        <a href={profile.github.url} target="_blank" rel="noreferrer">
          {profile.github.handle}
        </a>
      ),
    },
    profile.linkedin.url && {
      label: text.linkedin,
      value: (
        <a href={profile.linkedin.url} target="_blank" rel="noreferrer">
          {profile.linkedin.handle}
        </a>
      ),
    },
  ].filter(Boolean);

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative scroll-mt-[72px] pb-24 pt-14 lg:scroll-mt-0 lg:pb-[120px] lg:pt-[90px]"
    >
      <div className={cn(container, 'relative z-[4] lg:grid lg:grid-cols-[72px_minmax(0,1fr)] lg:gap-x-10')}>
        <div className="hidden justify-center pt-3.5 lg:flex">
          <Waypoint destination />
        </div>
        <div>
          <SectionHeader id="contact-title" title={text.title} intro={text.intro} />
          <div className="mt-[18px] grid gap-9 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-14">
            <div>
              <a
                href={`mailto:${profile.email}`}
                className="inline-block text-[22px] leading-[1.15] font-bold tracking-[-0.015em] underline decoration-route-end decoration-[3px] underline-offset-[9px] [font-stretch:78%] [overflow-wrap:anywhere] md:text-[30px] xl:text-[34px]"
              >
                {profile.email}
              </a>
              <dl aria-label={text.details} className="mt-[34px] border-t-[1.5px] border-ink">
                {rows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[96px_1fr] gap-3 border-b border-rule py-3.5 text-[15.5px] md:grid-cols-[120px_1fr] md:text-[17px]"
                  >
                    <dt className="text-ink-2">{row.label}</dt>
                    <dd className="font-semibold [&_a]:underline-offset-4 [&_a:hover]:underline [&_a:hover]:decoration-route-end [&_a:hover]:decoration-2">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
