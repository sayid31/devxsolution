import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Faq({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-gradient-brand py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center reveal">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">FAQ</p>
          <h2 className="font-display mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            The questions we hear most often
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {(faqs || []).map((f, i) => {
            const open = openIndex === i;
            return (
              <div
                key={f.question || i}
                className="reveal overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left sm:gap-4 sm:px-6"
                >
                  <span className="font-display text-[15px] font-semibold leading-snug text-slate-900 sm:text-base">
                    {f.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-blue-700 transition-transform ${open ? 'rotate-180' : ''}`}
                  />
                </button>
                {open && (
                  <p className="px-4 pb-5 text-sm leading-6 text-slate-600 sm:px-6">{f.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
