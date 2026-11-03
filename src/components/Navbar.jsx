import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const LINKS = [
  { href: '#beranda', label: 'Beranda' },
  { href: '#layanan', label: 'Layanan' },
  { href: '#keunggulan', label: 'Why us' },
  { href: '#portofolio', label: 'Pekerjaan' },
  { href: '#tentang', label: 'Tentang Kami' },
  { href: '#kontak', label: 'Kontak' },
];

// Menu minimal slide panel ala TRIONN: tombol "Menu" membuka overlay besar dengan
// tautan bertumpuk yang muncul stagger. Dipakai di semua ukuran layar.
export default function Navbar({ settings }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const siteName = settings?.siteName || 'DevXSolution';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all ${
          scrolled ? 'bg-white/85 shadow-sm backdrop-blur' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#beranda" aria-label={siteName} className="flex items-center">
            <img src="/logo-devxsolution-transparent.svg" alt={siteName} className="h-8 w-auto sm:h-9" />
          </a>

          <div className="flex items-center gap-3">
            <a
              href="#kontak"
              className="hidden items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-blue-700 hover:text-blue-700 sm:inline-flex"
            >
              Mulai Proyek <ArrowUpRight size={15} />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="group inline-flex items-center gap-3 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Menu
              <span aria-hidden="true" className="flex flex-col gap-[3px]">
                <span className="h-[2px] w-4 bg-white" />
                <span className="h-[2px] w-4 bg-white" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Slide panel */}
      <div
        className={`fixed inset-0 z-[90] transition-[visibility] duration-300 ${
          open ? 'visible' : 'invisible'
        }`}
        aria-hidden={!open}
      >
        <div
          role="presentation"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5">
            <img src="/logo-devxsolution-transparent.svg" alt={siteName} className="h-8 w-auto" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:border-blue-700 hover:text-blue-700"
            >
              <span className="relative block h-4 w-4">
                <span className="absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-700">Navigation</p>
            <ul className="mt-4 space-y-1">
              {LINKS.map((l, i) => (
                <li
                  key={l.href}
                  style={{ transitionDelay: open ? `${80 + i * 55}ms` : '0ms' }}
                  className={`border-b border-slate-100 transition-all duration-500 ${
                    open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between py-4 font-display text-2xl font-bold text-slate-900 transition-colors hover:text-blue-700"
                  >
                    {l.label}
                    <ArrowUpRight
                      size={22}
                      className="text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-blue-700"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-6 pb-8">
            <a
              href="#kontak"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-blue-700 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-800"
            >
              Start a project <ArrowUpRight size={16} />
            </a>
            <p className="mt-4 text-center text-xs text-slate-400">
              {settings?.email || 'halo@devxsolution.com'}
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
