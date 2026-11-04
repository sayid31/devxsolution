import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { getPhones, phoneHref } from '../lib/contact';

export default function Contact({ settings }) {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    setStatus('loading');
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  const email = settings?.email || 'devxsolutioninfo@gmail.com';
  // 2 nomor dari settings.phones (lihat data/fallback.js — nilai placeholder).
  const phones = getPhones(settings);

  const cards = [
    { icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
    ...phones.map((p) => ({
      icon: Phone,
      label: p.label || 'Phone',
      value: p.value,
      href: phoneHref(p),
    })),
    { icon: MapPin, label: 'Location', value: settings?.address || 'Denpasar, Bali' },
  ];

  return (
    <section id="kontak" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center reveal">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">Contact</p>
          <h2 className="font-display mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Tell us what you are trying to build
          </h2>
          <p className="mt-4 text-slate-600">
            Share what you need below, and we will send an estimate with a rough plan within 1–2 business days.
          </p>
        </div>

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-[1fr_1.4fr]">
          <div className="reveal space-y-5">
            {cards.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-100 text-blue-700 sm:h-12 sm:w-12">
                  <c.icon size={22} />
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {c.label}
                  </div>
                  {c.href ? (
                    <a href={c.href} className="break-all font-medium text-slate-800 hover:text-blue-700">
                      {c.value}
                    </a>
                  ) : (
                    <div className="break-all font-medium text-slate-800">{c.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="reveal rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Name *</span>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[16px] leading-snug outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:py-2.5 sm:text-sm"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Email *</span>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="devxsolutioninfo@gmail.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[16px] leading-snug outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:py-2.5 sm:text-sm"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">WhatsApp number</span>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+62 8xx-xxxx-xxxx"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[16px] leading-snug outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:py-2.5 sm:text-sm"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Service</span>
                <select
                  name="service"
                  defaultValue=""
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[16px] leading-snug outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:py-2.5 sm:text-sm"
                >
                  <option value="">— Select a service —</option>
                  <option>Web Development</option>
                  <option>AI Solutions</option>
                  <option>Cloud Solutions</option>
                  <option>Mobile Apps</option>
                  <option>IoT Solutions</option>
                  <option>Other</option>
                </select>
              </label>
            </div>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Tell us about your project *</span>
              <textarea
                required
                name="message"
                rows={4}
                placeholder="e.g. a POS app for 5 branches..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[16px] leading-snug outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:py-2.5 sm:text-sm"
              />
            </label>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-300/50 transition hover:bg-blue-800 disabled:opacity-60 sm:w-auto"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send size={18} /> Send message
                </>
              )}
            </button>

            {status === 'success' && (
              <p className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                <CheckCircle2 size={18} /> Thanks! Your message is on its way — we usually reply
                within 1–2 business days.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle size={18} /> That did not go through. Try again, or email us directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
