import { WHY_US, STATS } from '../data/fallback';

// "50+" -> figure "50", suffix "+" (suffix sengaja dibedakan biar huruf
// kecilnya tidak dianggap bagian dari label).
function parseStat(value = '') {
  // "30 min" -> figure "30", suffix " min" (spasi dipertahankan supaya
  // suffix yang diwarnai berbeda tetap terbaca sebagai "30 min", bukan "30min").
  const m = String(value).trim().match(/^([\d.,]+)(.*)$/);
  if (!m) return { figure: String(value), suffix: '' };
  return { figure: m[1], suffix: m[2] };
}

// About ala TRIONN: statement besar di kiri + angka kunci di bawahnya,
// nilai-nilai bernomor di kanan. Teks Inggris santai tapi tetap profesional.
export default function WhyUs() {
  return (
    <section id="keunggulan" className="bg-gradient-brand py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* ====== KIRI : statement + angka kunci ====== */}
          <div className="reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-700">
              ✦ About us
            </p>
            <h2 className="font-display mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              We work like
              <br />
              <span className="text-gradient">part of your team.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-6 text-slate-600 sm:text-[15px] sm:leading-7">
              We are a small, hands-on team — design, backend, data, and ops sitting in the
              same room. You talk to the people actually building your product, never an
              account manager forwarding messages.
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-500 sm:text-[15px] sm:leading-7">
              And we would rather do four projects properly than twenty at speed.
            </p>

            {/* Angka kunci — ringkas, 2 kolom di HP & 4 kolom di ≥sm */}
            <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-blue-200/70 pt-7 sm:grid-cols-4 sm:gap-x-4 lg:gap-x-6">
              {STATS.map((s) => {
                const { figure, suffix } = parseStat(s.value);
                return (
                  <div key={s.label}>
                    <div className="font-display text-3xl font-extrabold leading-none tracking-[-0.03em] text-blue-700 sm:text-4xl">
                      {figure}
                      {suffix ? <span className="text-blue-300">{suffix}</span> : null}
                    </div>
                    <div className="mt-2.5 text-[10px] font-semibold uppercase leading-[1.5] tracking-[0.16em] text-slate-500 sm:text-[11px] sm:tracking-[0.18em]">
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ====== KANAN : daftar nilai bernomor ====== */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-700 reveal">
              ✦ Why us
            </p>
            <ul className="mt-5">
              {WHY_US.map((w, i) => (
                <li
                  key={w.title}
                  className="reveal group border-t border-blue-100 py-6 first:border-t-0 sm:first:border-t"
                >
                  <div className="flex gap-4 sm:gap-5">
                    <span className="mt-1 w-6 shrink-0 text-xs font-semibold tabular-nums text-blue-400">
                      0{i + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-blue-700 sm:text-xl">
                        {w.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{w.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
