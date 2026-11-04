import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// URL bar mobile yang muncul/hilang memicu resize → refresh berulang dan
// animasi lompat. Abaikan resize kecil di layar sentuh.
ScrollTrigger.config({ ignoreMobileResize: true });

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Reveal-on-scroll, count-up [data-count], floating parallax [data-float].
export default function useReveal() {
  useEffect(() => {
    if (reduced()) {
      gsap.set('.reveal', { opacity: 1, y: 0, clearProps: 'all' });
      return undefined;
    }

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // 1) Reveal elemen saat masuk viewport.
      //    `immediateRender: false`: elemen tetap terlihat sampai animasinya
      //    benar-benar jalan. Dulu "from" diterapkan sejak awal, jadi kalau
      //    trigger telat menyala (HP lambat, font/gambar belum siap) layar
      //    jadi kosong beberapa detik — sekarang konten tidak pernah hilang,
      //    paling-paling muncul tanpa animasi.
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          }
        );
      });

      // 2) Count-up angka statistik [data-count="50" data-suffix="+"]
      gsap.utils.toArray('[data-count]').forEach((el) => {
        const target = parseFloat(el.dataset.count || '0');
        const suffix = el.dataset.suffix || '';
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.v)}${suffix}`;
          },
        });
      });

      // 3) Galeri "floating": offset selisih saat scroll.
      //    Hanya ≥640px — parallax scrub justru bikin scroll terasa berat
      //    (tersendat) di HP.
      mm.add('(min-width: 640px)', () => {
        gsap.utils.toArray('[data-float]').forEach((el, i) => {
          const direction = i % 2 === 0 ? -26 : 20;
          const rot = i % 2 === 0 ? -1.2 : 1.2;
          gsap.fromTo(
            el,
            { yPercent: -direction, rotate: 0 },
            {
              yPercent: direction,
              rotate: rot,
              ease: 'none',
              scrollTrigger: {
                trigger: el.closest('section') || el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        });
      });

      // 4) Garis interaktif footer: menyala mengikuti gerakan
      gsap.utils.toArray('[data-lines] span').forEach((line, i) => {
        gsap.fromTo(
          line,
          { scaleY: 0.15, opacity: 0.25 },
          {
            scaleY: 1,
            opacity: 1,
            transformOrigin: 'top',
            ease: 'none',
            scrollTrigger: {
              trigger: line.closest('[data-lines]'),
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: 1,
            },
            delay: (i % 10) * 0.03,
          }
        );
      });
    });

    // Posisi trigger dihitung ulang setelah web font selesai dimuat —
    // metrik huruf berbeda dari font cadangan, jarak antar elemen bergeser.
    document.fonts?.ready?.then(() => ScrollTrigger.refresh()).catch(() => {});

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);
}
