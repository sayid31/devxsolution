import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown, ArrowRight, Globe, Sparkles } from 'lucide-react';

// three.js (~600 kB) dimuat sebagai chunk terpisah: teks hero tampil lebih dulu,
// kanvas menyusul. Fallback-nya X statis CSS agar tidak ada lompatan layout.
const HeroCanvas = lazy(() => import('./HeroCanvas'));

function HeroCanvasFallback() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="relative h-[min(42vw,220px)] w-[min(42vw,220px)] animate-pulse opacity-60">
        <span className="absolute left-1/2 top-1/2 h-[19%] w-[80%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-blue-600/20" />
        <span className="absolute left-1/2 top-1/2 h-[19%] w-[80%] -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-blue-600/20" />
      </div>
    </div>
  );
}

// Hero ala TRIONN: X 3D selalu jadi latar full-bleed (seperti referensi),
// konten mengambang di atasnya. Di < 1024px X ditempatkan di "zona aman"
// antara blok atas (judul + CTA) dan blok bawah (meta) hasil ukuran DOM,
// jadi tidak pernah menimpa teks. Tema tetap putih × biru (warna logo).
const DESKTOP_QUERY = '(min-width: 1024px)';

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e) => setIsDesktop(e.matches);
    setIsDesktop(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return isDesktop;
}

export default function Hero({ settings, ready = false }) {
  const tagline = settings?.tagline || 'End-to-end digital solutions for your business';
  const isDesktop = useIsDesktop();

  const sectionRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const [focus, setFocus] = useState({ top: 0.46, bottom: 0.78 });

  // Ukur zona kosong antara blok atas & blok bawah → posisi X di belakang teks.
  useEffect(() => {
    const measure = () => {
      const sec = sectionRef.current;
      const topEl = topRef.current;
      const bottomEl = bottomRef.current;
      if (!sec || !topEl || !bottomEl) return;
      const s = sec.getBoundingClientRect();
      const H = s.height || 1;
      const topEnd = (topEl.getBoundingClientRect().bottom - s.top) / H;
      const bottomStart = (bottomEl.getBoundingClientRect().top - s.top) / H;
      const next = {
        top: Math.min(Math.max(topEnd + 0.02, 0.2), 0.7),
        bottom: Math.min(Math.max(bottomStart - 0.02, 0.35), 0.97),
      };
      if (next.bottom - next.top < 0.12) return;
      setFocus((prev) =>
        Math.abs(prev.top - next.top) > 0.008 || Math.abs(prev.bottom - next.bottom) > 0.008
          ? next
          : prev
      );
    };

    measure();
    document.fonts?.ready?.then(measure).catch(() => {});
    const t = setTimeout(measure, 800);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', measure);
    };
  }, [tagline, isDesktop]);

  // Entrance setelah preloader selesai: konten hero naik berurutan.
  useEffect(() => {
    if (!ready || !sectionRef.current) return undefined;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-in]',
        { autoAlpha: 0, y: 34 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09 }
      );
      gsap.fromTo(
        '.hero-stage',
        { autoAlpha: 0, scale: 0.94 },
        { autoAlpha: 1, scale: 1, duration: 1.4, ease: 'power3.out', delay: 0.2 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      id="beranda"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-gradient-brand"
    >
      {/* Latar: grid tipis + glow biru di belakang X */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(29,78,216,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(29,78,216,0.055)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(125%_100%_at_50%_0%,black,transparent_82%)]" />
        <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[130px]" />
      </div>

      {/* X 3D selalu jadi latar full-bleed — gerak otonom, tidak menangkap kursor */}
      <div
        className={`hero-stage pointer-events-none absolute inset-0 z-0 ${
          isDesktop ? 'translate-x-[7%]' : ''
        }`}
      >
        <Suspense fallback={<HeroCanvasFallback />}>
          <HeroCanvas mode={isDesktop ? 'stage' : 'band'} focus={focus} />
        </Suspense>
      </div>

      {/* Konten */}
      {/* Jarak & ukuran tipe berskala tinggi layar (vh) supaya seluruh hero —
          termasuk indikator scroll di bar bawah — muat tanpa perlu scroll. */}
      <div className="pointer-events-none relative z-10 mx-auto flex min-h-svh w-full max-w-7xl flex-col justify-between gap-[clamp(20px,4vh,56px)] px-4 pb-[clamp(26px,5vh,52px)] pt-[clamp(90px,13vh,144px)] sm:px-6 lg:px-8">
        {/* ====== ATAS : statement + CTA ====== */}
        <div className="relative max-w-lg" data-hero-in="">
          {/* Scrim radial: blok teks punya "panggung" sendiri di atas X 3D.
              Bukan kartu kotak — hanya cahaya putih yang memudar, jadi headline
              solid tetap terbaca dan menyatu dengan scene di belakangnya. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 -inset-y-8 -z-10 rounded-[3rem] bg-[radial-gradient(120%_120%_at_6%_22%,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.86)_46%,rgba(255,255,255,0)_80%)]"
          />

          <span className="inline-flex items-center gap-2.5 rounded-full border border-blue-200 bg-white/70 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.26em] text-blue-700 backdrop-blur sm:text-[11px]">
            <span aria-hidden="true" className="text-blue-500">
              ✦
            </span>
            Est. Software Studio — Indonesia
          </span>

          <h1 className="mt-[clamp(16px,2.6vh,26px)] font-display text-[clamp(2.1rem,min(6.2vw,7.6vh),4.3rem)] font-extrabold leading-[1.03] tracking-[-0.035em] text-slate-900">
            <span className="block">Designed</span>
            <span className="block">to mean</span>
            <span className="block">something</span>
            {/* Kata kunci diberi gradient + garis aksen: satu-satunya bagian
                berwarna, jadi mata berhenti di sini — bukan di outline tipis. */}
            <span className="relative mt-1 block w-fit text-gradient">
              real.
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300"
              />
            </span>
          </h1>

          <p className="mt-[clamp(16px,2.6vh,26px)] max-w-sm text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            {tagline}.
          </p>

          <div
            className="pointer-events-auto mt-[clamp(18px,3vh,30px)] flex flex-wrap items-center gap-x-5 gap-y-3"
            data-hero-in=""
          >
            <a
              href="#kontak"
              className="group inline-flex items-center gap-2.5 rounded-full bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_32px_-14px_rgba(29,78,216,0.75)] transition hover:-translate-y-0.5 hover:bg-blue-800"
            >
              Book a 30-min call
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15">
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
            <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Free, no commitment
            </span>
          </div>
        </div>

        {/* ====== BAWAH : scroll, hint, meta ====== */}
        {/* Proporsi mengikuti referensi TRIONN: indikator scroll kecil di tepi kiri,
            hint di tengah halaman, blok EST rata dengan tepi kanan konten. */}
        <div className="grid w-full grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10" data-hero-in="">
          <div className="hidden lg:col-span-4 lg:flex">
            <a
              href="#layanan"
              aria-label="Scroll to the next section"
              className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full border border-blue-700/40 text-blue-700/70 transition hover:border-blue-700 hover:bg-blue-700 hover:text-white"
            >
              <ArrowDown size={14} />
            </a>
          </div>

          <div className="hidden flex-col items-center gap-1 text-center lg:col-span-4 lg:flex">
            <span className="inline-flex items-center gap-2 font-display text-[13px] font-bold uppercase tracking-[0.12em] text-slate-700">
              <Sparkles size={14} className="text-blue-700" />
              Live 3D
            </span>
            <span className="font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Always in motion — no input needed
            </span>
          </div>

          {/* Meta EST — kotak berbingkai ala TRIONN, rata tepi kanan.
              Tipografinya disamakan dengan label teknis 3D: mikro, uppercase,
              tracking lebar, tanpa paragraf panjang yang bertabrakan dengan X. */}
          <div className="ml-auto flex w-full max-w-sm flex-col items-start gap-3.5 lg:col-span-4 lg:max-w-[262px] lg:items-end">
            <span className="h-px w-12 bg-blue-300/70 lg:w-16" aria-hidden="true" />
            <div className="flex min-h-[72px] w-fit items-stretch overflow-hidden rounded-sm border border-blue-200 bg-white/75 backdrop-blur">
              <div className="flex w-[70px] flex-col items-center justify-center gap-1.5 border-r border-blue-200 px-2 py-3.5">
                <Globe size={15} className="text-blue-700" aria-hidden="true" />
                <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                  Est. 2021
                </span>
              </div>
              <div className="flex items-center px-3.5 py-3.5">
                <span className="font-display text-[10px] font-semibold uppercase leading-[1.55] tracking-[0.14em] text-blue-700">
                  5+ years shaping
                  <br />
                  digital direction
                </span>
              </div>
            </div>
            <p className="text-[10px] font-semibold uppercase leading-[1.8] tracking-[0.24em] text-slate-500 lg:text-right">
              Built for the AI era
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
