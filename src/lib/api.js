// Ambil data dari API; endpoint yang gagal diabaikan agar halaman tetap tampil.
//
// Build statis (Vercel) tidak punya backend, jadi panggilan /api pasti 404 —
// untuk itu panggilan dilewati dan halaman memakai data fallback. Isi
// VITE_API_BASE kalau backend dipisah (contoh: https://api.devxsolution.my.id),
// atau VITE_API_BASE= (kosong) kalau backend satu domain dengan site.
// Development selalu memakai proxy Vite → http://localhost:5100.
const API_BASE = import.meta.env.VITE_API_BASE ?? (import.meta.env.DEV ? '' : null);

const endpointMap = {
  services: '/api/services',
  projects: '/api/projects',
  faqs: '/api/faqs',
  settings: '/api/settings',
};

export async function fetchSiteData() {
  if (API_BASE === null) return {};
  const results = {};
  await Promise.all(
    Object.entries(endpointMap).map(async ([key, url]) => {
      try {
        const res = await fetch(`${API_BASE}${url}`);
        if (res.ok) results[key] = await res.json();
      } catch {
        /* server/API belum jalan — pakai data fallback */
      }
    })
  );
  return results;
}
