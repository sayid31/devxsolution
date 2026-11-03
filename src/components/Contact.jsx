import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

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

  const email = settings?.email || 'halo@devxsolution.com';
  const phone = settings?.phone || '+62 812-3456-7890';

  return (
    <section id="kontak" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center reveal">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">Contact</p>
          <h2 className="font-display mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Cerita kepada tim yang mau ngapain?
          </h2>
          <p className="mt-4 text-slate-600">
            Isi kebutuhan proyek Anda, nanti tim akan kirim estimasi dan garis besar kode kerja dalam 1–2 hari kerja.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="reveal space-y-5">
            {[
              { icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
              { icon: Phone, label: 'Phone / WhatsApp', value: phone, href: '#kontak' },
              { icon: MapPin, label: 'Location', value: settings?.address || 'Jakarta, Indonesia' },
            ].map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-100 text-blue-700">
                  <c.icon size={22} />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {c.label}
                  </div>
                  {c.href ? (
                    <a href={c.href} className="font-medium text-slate-800 hover:text-blue-700">
                      {c.value}
                    </a>
                  ) : (
                    <div className="font-medium text-slate-800">{c.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="reveal rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Name *</span>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Email *</span>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">WhatsApp number</span>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+62 8xx-xxxx-xxxx"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-slate-700">Service</span>
                <select
                  name="service"
                  defaultValue=""
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Uraikan kebutuhan Anda *</span>
              <textarea
                required
                name="message"
                rows={4}
                placeholder="Contoh: butuh aplikasi POS untuk 5 cabang..."
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                <CheckCircle2 size={18} /> Terima kasih! Pesan Anda telah terkirim — balasan
                akan dikirim dalam 1–2 hari kerja.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle size={18} /> Gagal mengirim. Coba lagi atau email langsung ke kami.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
