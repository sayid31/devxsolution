import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Reveal-on-scroll, count-up [data-count], floating parallax [data-float].
export default function useReveal() {
  useEffect(() => {
    if (reduced()) {
      gsap.set('.reveal', { opacity: 1, y: 0, clearProps: 'all' });
      return undefined;
    }

    const ctx = gsap.context(() => {
      // 1) Reveal elemen saat masuk viewport
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
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
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.v)}${suffix}`;
          },
        });
      });

      // 3) Galeri "floating": tiap kartu mengambang dengan offset selisih saat scroll
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

    return () => ctx.revert();
  }, []);
}
