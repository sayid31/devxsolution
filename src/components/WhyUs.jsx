import { WHY_US } from '../data/fallback';

// About ala TRIONN: statement dua baris raksasa ("Focused vision. Measured / execution."),
// lalu nilai-nilai sebagai baris bernomor saja — tanpa kartu-kartu.
export default function WhyUs() {
  return (
    <section id="keunggulan" className="bg-gradient-brand py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* Statement kiri */}
          <div className="reveal">
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              About us
            </h2>
            <p className="mt-6 max-w-md text-sm leading-6 text-slate-500">
              Tim digital yang paham bisnis, nggak cuma menganggap pekerjaanmu sebagai ticket kecil.
            </p>
          </div>

          {/* Nilai: baris bernomor, tanpa kartu */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-700 reveal">
              ✦ Why us
            </p>
            <ul className="mt-4 space-y-7">
              {WHY_US.map((w, i) => (
                <li
                  key={w.title}
                  className="reveal group border-t border-blue-100 py-5 first:border-t-0 sm:first:border-t"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-xs font-semibold text-blue-400">
                      0{i + 1}
                    </span>
                    <span className="font-display text-right text-base font-semibold text-blue-700 transition-colors group-hover:text-blue-900">
                      {w.title}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{w.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
