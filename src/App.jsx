import { useCallback, useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fetchSiteData } from './lib/api';
import useReveal from './hooks/useReveal';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

import { SERVICES, PROJECTS, TESTIMONIALS, FAQS, SETTINGS } from './data/fallback';

const SERVICE_LABELS = [
  'Web Development',
  'AI Solutions',
  'Cloud Solutions',
  'Mobile Apps',
  'IoT Solutions',
];

export default function App() {
  const [heroReady, setHeroReady] = useState(false);
  const [data, setData] = useState({
    services: SERVICES,
    projects: PROJECTS,
    testimonials: TESTIMONIALS,
    faqs: FAQS,
    settings: SETTINGS,
  });

  useEffect(() => {
    fetchSiteData().then((remote) => {
      if (Object.keys(remote).length > 0) {
        setData((prev) => ({ ...prev, ...remote }));
      }
    });
  }, []);

  useReveal();

  const handlePreloaderDone = useCallback(() => {
    // Preloader selesai → hero baru boleh memulai entrance-nya.
    setHeroReady(true);
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Preloader onDone={handlePreloaderDone} />
      <Navbar settings={data.settings} />
      <main>
        <Hero settings={data.settings} ready={heroReady} />
        <Marquee items={SERVICE_LABELS} variant="blue" />
        <Services services={data.services} />
        <WhyUs />
        <Portfolio projects={data.projects} />
        <Testimonials testimonials={data.testimonials} />
        <Faq faqs={data.faqs} />
        <Marquee
          items={[
            'Start a Project',
            'Clear Estimates',
            'Weekly Demos',
            'Full Handover',
            'Post-launch Support',
          ]}
          variant="outline"
        />
        <Contact settings={data.settings} />
      </main>
      <Footer settings={data.settings} />
    </div>
  );
}
