import Icon from './Icon';

export default function Services({ services }) {
  return (
    <section id="layanan" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center reveal">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">Services</p>
          <h2 className="font-display mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            One partner for every digital need
          </h2>
          <p className="mt-4 text-slate-600">
            Website, aplikasi, AI, atau IoT — kita sambut dari yang kecil sampai yang Anda butuhkan.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(services || []).map((s, i) => (
            <article
              key={s.slug || s.title || i}
              className={`reveal group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100 ${
                i === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-100 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                <Icon name={s.icon} size={24} />
              </span>
              <h3 className="font-display mt-5 text-xl font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{s.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {(s.highlights || []).map((h) => (
                  <li
                    key={h}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
