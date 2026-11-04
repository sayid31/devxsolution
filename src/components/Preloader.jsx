import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// Preloader ala TRIONN: logo muncul, counter naik, lalu tirai terangkat.
// Diputar hanya untuk kunjungan pertama per sesi (buka ulang / pindah section
// tidak perlu menunggu tirai lagi) dan lebih singkat di layar kecil.
export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const cardRef = useRef(null);
  const barRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    // Penanda "sudah pernah lihat preloader" — sessionStorage (per tab),
    // otomatis hilang saat tab ditutup. Gagal akses (mode privat) → aman.
    let seen = false;
    try {
      seen = sessionStorage.getItem('dx-preloader-seen') === '1';
      sessionStorage.setItem('dx-preloader-seen', '1');
    } catch {
      /* mode privat: anggap belum pernah */
    }

    if (reduced || seen || !rootRef.current) {
      setGone(true);
      onDone?.();
      return undefined;
    }

    document.body.style.overflow = 'hidden';

    // Layar sempit → versi lebih singkat supaya konten cepat tampil.
    const small = window.matchMedia?.('(max-width: 640px)').matches;
    const D = small
      ? { cardIn: 0.4, count: 0.7, pause: 0.15, cardOut: 0.25, curtain: 0.5 }
      : { cardIn: 0.5, count: 1.1, pause: 0.25, cardOut: 0.3, curtain: 0.65 };

    const obj = { p: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        setGone(true);
      },
    });

    tl.fromTo(
      cardRef.current,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: D.cardIn, ease: 'power3.out' }
    )
      .to(
        obj,
        {
          p: 100,
          duration: D.count,
          ease: 'power2.inOut',
          onUpdate: () => setProgress(Math.round(obj.p)),
        },
        0.12
      )
      .fromTo(
        barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: D.count, ease: 'power2.inOut' },
        0.12
      )
      .to(cardRef.current, { autoAlpha: 0, y: -18, duration: D.cardOut, ease: 'power2.in' }, `+=${D.pause}`)
      .to(rootRef.current, {
        yPercent: -100,
        duration: D.curtain,
        ease: 'power4.inOut',
        // Hero mulai masuk saat tirai mulai terangkat (preloader masih menutupi),
        // bukan setelahnya — supaya konten tidak sempat berkedip di balik tirai.
        onStart: () => onDone?.(),
      });

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
      role="status"
      aria-label="Loading page"
    >
      <div ref={cardRef} className="flex flex-col items-center gap-6">
        <img src="/logo-devxsolution-transparent.svg" alt="DevXSolution" className="h-10 w-auto" />
        <span className="font-display text-4xl font-extrabold text-slate-900 tabular-nums">
          {progress}
          <span className="text-blue-700">%</span>
        </span>
      </div>
      <div className="absolute bottom-16 h-[3px] w-48 overflow-hidden rounded-full bg-blue-100 sm:w-64">
        <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-blue-700" />
      </div>
      <p className="absolute bottom-8 text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
        DevX Solution
      </p>
    </div>
  );
}
