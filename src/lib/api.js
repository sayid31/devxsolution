// Ambil data dari API; endpoint yang gagal diabaikan agar halaman tetap tampil (mode placeholder).
const endpointMap = {
  services: '/api/services',
  projects: '/api/projects',
  testimonials: '/api/testimonials',
  faqs: '/api/faqs',
  settings: '/api/settings',
};

export async function fetchSiteData() {
  const results = {};
  await Promise.all(
    Object.entries(endpointMap).map(async ([key, url]) => {
      try {
        const res = await fetch(url);
        if (res.ok) results[key] = await res.json();
      } catch {
        /* server/API belum jalan — pakai placeholder */
      }
    })
  );
  return results;
}
