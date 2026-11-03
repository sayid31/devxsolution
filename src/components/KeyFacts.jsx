// Key facts: angka besar + label. Nilai dari data seperti "50+" dipisah jadi
// angka & sufiks ("+", "k", dsb) supaya sufiks tidak dianggap sebagai label.
const parseStat = (value = '') => {
  const m = String(value).trim().match(/^([\d.,]+)\s*(.*)$/);
  if (!m) return { figure: String(value), suffix: '' };
  return { figure: m[1], suffix: m[2] };
};

export default function KeyFacts({ stats = [] }) {
  return (
    <section className="bg-gradient-brand py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-700">
          ✦ From idea to outcome.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-blue-200/70 pt-9 sm:gap-x-10 lg:grid-cols-4">
          {stats.map((s) => {
            const { figure, suffix } = parseStat(s.value);
            return (
              <div key={s.label} className="reveal">
                <div className="font-display text-[clamp(2.75rem,6vw,4rem)] font-extrabold leading-none tracking-[-0.03em] text-blue-700">
                  {figure}
                  {suffix ? <span className="text-blue-300">{suffix}</span> : null}
                </div>
                <div className="mt-3 text-[11px] font-semibold uppercase leading-[1.6] tracking-[0.2em] text-slate-500">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-16 max-w-md text-sm leading-6 text-slate-500 reveal">
          90% of our clients come back for a second project — proof of measured execution,
          not just promises.
        </p>
      </div>
    </section>
  );
}
