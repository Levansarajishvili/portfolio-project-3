import { Button } from '@/components/ui/Button.jsx';
import { HeroMap } from '@/components/map/HeroMap.jsx';
import { MapStyleControl } from '@/components/map/MapStyleControl.jsx';
import { profile } from '@/data/profile.js';
import { usePreferences } from '@/hooks/usePreferences.js';
import { cn } from '@/lib/utils.js';

export function HeroSection() {
  const { copy, lang } = usePreferences();

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b-[1.5px] border-ink bg-sea xl:min-h-[clamp(720px,56.8vw,860px)]"
    >
      {/* xl+: the map is a full-bleed backdrop. Below xl the copy would cover Georgia, so it stacks. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[44%] bg-gradient-to-r from-sea/60 via-sea/20 to-transparent xl:z-[1] xl:block"
      />

      <div className="relative z-[5] mx-auto w-full max-w-[1440px] lg:px-16">
        <MapStyleControl className="absolute right-16 top-24 z-[6] hidden lg:block" />

        <div className="px-5 pb-7 pt-[92px] md:px-8 lg:w-[620px] lg:px-0 lg:pb-12 lg:pt-[128px] xl:w-[min(560px,42vw)] xl:pb-24 xl:pt-[140px]">
          <h1
            id="hero-title"
            className={cn(
              'font-[760] tracking-[-0.02em] [font-stretch:74%]',
              lang === 'ka'
                ? 'text-[clamp(40px,11.5vw,56px)] leading-[1.08] lg:text-[clamp(52px,5.6vw,84px)]'
                : 'text-[clamp(52px,16vw,64px)] leading-[0.9] lg:text-[clamp(64px,6.8vw,98px)]',
            )}
          >
            <span className="block">{copy.hero.firstName}</span>
            <span className="block">{copy.hero.lastName}</span>
          </h1>
          <p className="mt-[18px] max-w-[29ch] text-lg leading-normal lg:mt-7 lg:text-[21px]">{copy.hero.role}</p>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row lg:mt-[34px] lg:gap-3">
            <Button href="#work">{copy.hero.seeWork}</Button>
            {profile.cvUrl && (
              <Button href={profile.cvUrl} variant="ghost" download>
                {copy.hero.downloadCv}
              </Button>
            )}
          </div>
          <p className="mt-[22px] flex items-center gap-2.5 text-[15px] font-medium text-ink-2">
            <span aria-hidden="true" className="size-2.5 rounded-full border-2 border-ink-2" />
            {copy.hero.status}
          </p>
        </div>
      </div>

      <HeroMap className="hidden aspect-[1440/818] w-full lg:block xl:absolute xl:inset-0 xl:aspect-auto xl:h-full" />
      <HeroMap variant="compact" className="block aspect-[390/300] w-full lg:hidden" />
    </section>
  );
}
