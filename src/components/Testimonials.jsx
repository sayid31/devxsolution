import { Star, Quote } from 'lucide-react';

function Stars({ rating = 5 }) {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? 'fill-amber-400' : 'text-slate-200'}
        />
      ))}
    </div>
  );
}

export default function Testimonials({ testimonials }) {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center reveal">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">Testimonials</p>
          <h2 className="font-display mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            What our clients say
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {(testimonials || []).map((t, i) => (
            <figure
              key={t.name || i}
              className="reveal relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-lg hover:shadow-blue-100"
            >
              <Quote size={32} className="text-blue-100" />
              <blockquote className="mt-3 text-sm leading-6 text-slate-600">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-full font-display font-bold text-white bg-gradient-to-br ${
                    ['from-blue-600 to-sky-400', 'from-indigo-600 to-blue-400', 'from-sky-500 to-blue-500'][
                      i % 3
                    ]
                  }`}
                >
                  {t.name?.charAt(0) || '?'}
                </span>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </figcaption>
              <div className="mt-4">
                <Stars rating={t.rating} />
              </div>
            </figure>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-500 reveal">
          * Testimonials are still placeholders — they will be replaced with real client data (asset handoff #2).
        </p>
      </div>
    </section>
  );
}
