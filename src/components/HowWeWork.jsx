import { HOW_WE_WORK } from '../data/fallback';

// Pengganti section testimoni: studio ini belum punya klien, jadi tidak ada
// kutipan/nama perusahaan palsu. Yang tampil cara kerja kami — komitmen yang
// bisa dipercaya, dengan layout kartu yang sama seperti sebelumnya.
export default function HowWeWork() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center reveal">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">How we work</p>
          <h2 className="font-display mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            What working with us feels like
          </h2>
        </div>

        {/* 6 kartu → 1 kolom di HP, 2 di sm, 3 di lg (baris penuh, tanpa lubang). */}
        <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {HOW_WE_WORK.map((w, i) => (
            <article
              key={w.title}
              className="reveal group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100 sm:p-7"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-50 font-display text-sm font-bold text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                  0{i + 1}
                </span>
                <h3 className="font-display text-base font-bold leading-snug text-slate-900 sm:text-lg">
                  {w.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{w.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
