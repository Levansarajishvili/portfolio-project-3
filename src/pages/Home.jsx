import { useRef } from 'react';
import { Footer } from '@/components/layout/Footer.jsx';
import { Navbar } from '@/components/layout/Navbar.jsx';
import { RouteLayer } from '@/components/map/RouteLayer.jsx';
import { AboutSection } from '@/components/sections/AboutSection.jsx';
import { ContactSection } from '@/components/sections/ContactSection.jsx';
import { HeroSection } from '@/components/sections/HeroSection.jsx';
import { SkillsSection } from '@/components/sections/SkillsSection.jsx';
import { WorkSection } from '@/components/sections/WorkSection.jsx';
import { usePreferences } from '@/hooks/usePreferences.js';

export default function Home() {
  const pageRef = useRef(null);
  const { copy } = usePreferences();

  return (
    <div ref={pageRef} className="relative overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2.5 focus:font-semibold focus:text-paper"
      >
        {copy.nav.skip}
      </a>
      <Navbar />
      <RouteLayer containerRef={pageRef} />
      <HeroSection />
      <main id="main" tabIndex={-1} className="outline-none">
        <WorkSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
