import { ArrowUpRight } from 'lucide-react';

// Work showcase ala TRIONN "Floating Project Gallery": kartu mengambang
// berbeda ketinggian, nomor besar, kategori kecil, hover → EXPLORE PROJECT.
// Placeholder monokrom sebelum gambar asli dari CMS.
const PLACEHOLDER_GRADIENTS = [
  'from-blue-700 via-blue-600 to-blue-400',
  'from-blue-500 via-sky-500 to-blue-300',
  'from-indigo-600 via-blue-600 to-sky-400',
  'from-blue-800 via-blue-500 to-sky-400',
];

export default function Portfolio({ projects }) {
  return (
    <section id="portofolio" className="bg-gradient-brand py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-700">
          ✦ Selected work.
        </p>
        <h2 className="font-display mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Projects we build,
          <span className="text-outline">built to last.</span>
        </h2>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {(projects || []).map((p, i) => (
            <article
              key={p.slug || p.title || i}
              data-float
              className={`group relative cursor-pointer overflow-hidden ${
                i % 2 === 1 ? 'sm:mt-20' : ''
              }`}
            >
              {/* Visual */}
              <div
                className={`relative h-60 overflow-hidden bg-gradient-to-br sm:h-72 ${
                  PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length]
                }`}
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
                    <p className="font-display text-7xl font-extrabold leading-none text-white/15 sm:text-8xl">
                      0{i + 1}
                    </p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                      {p.category || 'Project'}
                    </p>
                  </div>
                )}

                {/* Label EXPLORE ala TRIONN */}
                <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-3 rounded-full bg-white px-5 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-blue-700 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  View project →
                </span>
              </div>

              {/* Info di bawah visual */}
              <div className="pt-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-extrabold tracking-tight text-blue-700 sm:text-2xl">
                    {p.title}
                  </h3>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open project ${p.title}`}
                      className="mt-1 grid h-9 w-9 place-items-center rounded-full border border-blue-200 text-blue-600 transition hover:border-blue-700 hover:bg-blue-700 hover:text-white"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
                <p className="mt-1 text-sm leading-6 text-slate-500">{p.description}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {(p.tech || []).map((t) => (
                    <li
                      key={t}
                      className="border border-blue-100 bg-blue-50 px-2 py-0.5 font-mono text-[11px] text-blue-700"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-14 text-center text-xs text-slate-400">
          * Images above are placeholders — they will be replaced with real project documentation.
        </p>
      </div>
    </section>
  );
}
