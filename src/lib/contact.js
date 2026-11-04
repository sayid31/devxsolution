// Helper kontak supaya Contact, Footer, dan menu mobile selalu tampil
// konsisten (1 email + 2 nomor), termasuk saat data lama dari API hanya
// mempunya field `phone` tunggal.

export function getPhones(settings) {
  if (Array.isArray(settings?.phones) && settings.phones.length > 0) {
    return settings.phones;
  }
  // Fallback data lama (field `phone` tunggal) — tetap tampil satu baris.
  return [{ label: 'Phone / WhatsApp', value: settings?.phone || '+62 812-3456-7890' }];
}

// Nomor 1 (ada `wa`) → link WhatsApp; nomor lainnya → dialer telepon.
export function phoneHref(p) {
  return p.wa
    ? `https://wa.me/${String(p.wa).replace(/\D/g, '')}`
    : `tel:${String(p.value).replace(/[^\d+]/g, '')}`;
}
