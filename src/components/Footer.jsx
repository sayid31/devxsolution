import { useRef } from 'react';
import { Linkedin, Instagram, Github, Mail, Phone, MapPin } from 'lucide-react';

const NAV = [
  { href: '#layanan', label: 'Layanan' },
  { href: '#keunggulan', label: 'Why us' },
  { href: '#portofolio', label: 'Pekerjaan' },
  { href: '#tentang', label: 'Tentang Kami' },
  { href: '#kontak', label: 'Kontak' },
];

const SERVICES = [
  'Web Development',
  'AI Solutions',
  'Cloud Solutions',
  'Mobile Apps',
  'IoT Solutions',
];

// Footer ala TRIONN: wordmark raksasa di tengah + garis penyeragam yang
// ikut digerakkan scroll-nya browser (vertical timeline / "hover the lines").
function useHoverLinesSound() {
  const ctxRef = useRef(null);

  const play = () => {
    try {
      if (!ctxRef.current) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        ctxRef.current = new AC();
      }
      const ctx = ctxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 1100 + Math.random() * 700;
      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.07);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      /* audio blocked by the browser — ignore silently */
    }
  };

  return play;
}

export default function Footer({ settings }) {
  const year = new Date().getFullYear();
  const site = settings?.siteName || 'DevXSolution';
  const wordmark = (site || 'DevXSolution').toUpperCase();
  const tick = useHoverLinesSound();

  return (
    <footer className="relative bg-gradient-brand">
      {/* Garis berkali-kali ala gambar footer — link biru, top/bottom border */}
      <div
        data-lines
        onMouseMove={tick}
        aria-hidden="true"
        className="mx-auto flex h-16 max-w-7xl items-stretch justify-between px-6 pt-2"
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} className="block h-[2px] w-10 bg-blue-700" />
        ))}
      </div>

      {/* Info kolom, monokrom */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-10 pt-8 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <a href="#beranda" aria-label={site} className="flex items-center">
            <img src="/logo-devxsolution-transparent.svg" alt={site} className="h-8 w-auto" />
          </a>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">
            {(settings?.tagline || 'We help SMEs and startups turn their ideas into real digital products.')}
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { icon: Linkedin, href: settings?.social?.linkedin, label: 'LinkedIn' },
              { icon: Instagram, href: settings?.social?.instagram, label: 'Instagram' },
              { icon: Github, href: settings?.social?.github, label: 'GitHub' },
            ].map((s) =>
              s.href ? (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-blue-100 text-blue-700 transition hover:bg-blue-700 hover:text-white"
                >
                  <s.icon size={16} />
                </a>
              ) : null
            )}
          </div>
        </div>

        <nav>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-blue-700">
            Navigation
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-slate-500 transition hover:text-blue-700">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-blue-700">
            Services
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s}>
                <a href="#layanan" className="text-slate-500 transition hover:text-blue-700">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-blue-700">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-blue-700" />{' '}
              <span className="text-slate-500">{settings?.email || 'halo@devxsolution.com'}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} className="text-blue-700" />{' '}
              <span className="text-slate-500">{settings?.phone || '+62 812-3456-7890'}</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 text-blue-700" />{' '}
              <span className="text-slate-500">{settings?.address || 'Jakarta, Indonesia'}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Wordmark raksasa ala TRIONN footer */}
      <div aria-hidden="true" className="overflow-hidden px-2">
        <p className="font-display select-none whitespace-nowrap text-center text-[11.5vw] font-extrabold leading-[0.85] tracking-tight text-blue-700">
          {wordmark}
          <sup className="align-super text-[3vw] font-bold text-blue-300">®</sup>
        </p>
      </div>

      <div className="border-t border-slate-100">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-slate-400 sm:px-6 lg:px-8">
          © {year} {site}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
