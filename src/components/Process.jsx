import { PROCESS_STEPS } from '../data/fallback';

// Cara kerja ala TRIONN "How we work": baris penuh per langkah (Step–01 Understand, dst.)
// yang muncul + berubah saat hover. Langkah didahulukan dari judul.
export default function Process() {
  return (
    <section id="tentang" className="bg-gradient-brand py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-700 reveal">
          ✦ Our process. How we work.
        </p>
        <h2 className="font-display mt-4 max-w-3xl text-3xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl reveal">
          A method we repeat
          <br />
          <span className="text-outline">on every engagement.</span>
        </h2>

        <ul className="mt-12">
          {PROCESS_STEPS.map((p, i) => (
            <li
              key={p.step}
              className="reveal group grid cursor-default grid-cols-[6rem_1fr_auto] items-center gap-x-5 gap-y-1 border-t border-blue-100 px-2 py-6 transition-all duration-300 hover:bg-blue-700 hover:text-white first:border-t-0 sm:px-4 sm:py-8 last:border-b"
            >
              {/* Nomor langkah (seperti gambar) */}
              <span className="flex items-baseline gap-1 text-sm font-semibold text-blue-400 transition-colors group-hover:text-blue-200">
                0{i + 1}
              </span>

              {/* Judul besar ala gambar */}
              <span className="font-display text-2xl font-extrabold tracking-tight text-blue-700 transition-colors group-hover:text-white sm:text-4xl lg:text-5xl">
                {p.title}
              </span>

              {/* Deskripsi kecil */}
              <p className="col-span-2 max-w-md text-sm leading-6 text-slate-500 transition-colors group-hover:text-blue-100 sm:col-span-1 sm:text-right">
                {p.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
