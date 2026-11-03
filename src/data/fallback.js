// Placeholder data mirror (before real CMS content is applied).
// Sprint 2: components read this from the API /api/* (the server already provides it).
export const SETTINGS = {
  siteName: 'DevXSolution',
  tagline: 'We help SMEs and startups turn their ideas into real digital products.',
  email: 'halo@devxsolution.com',
  phone: '+62 812-3456-7890',
  whatsapp: '6281234567890',
  address: 'Jakarta, Indonesia',
  social: {
    linkedin: 'https://linkedin.com/company/devxsolution',
    instagram: 'https://instagram.com/devxsolution',
    github: 'https://github.com/devxsolution',
  },
};

export const SERVICES = [
  {
    slug: 'web-development',
    icon: 'code',
    title: 'Web Development',
    description:
      'Websites and web apps that look good, load fast, and don\'t give you paperwork headaches.',
    highlights: ['Company Profile', 'E-Commerce', 'Web App & Dashboard'],
  },
  {
    slug: 'ai-solutions',
    icon: 'cpu',
    title: 'AI Solutions',
    description:
      'Automasi yang dirancang untuk cara kerja Anda, bukan sekadar pojok teknologi yang hubungannya.',
    highlights: ['Machine Learning', 'Computer Vision', 'Natural Language Processing'],
  },
  {
    slug: 'cloud-solutions',
    icon: 'cloud',
    title: 'Cloud Solutions',
    description:
      'Infrastruktur yang bisa tumbuh bersama usaha Anda, dibangun di atas kebutuhan, bukan sekadar standar.',
    highlights: ['Cloud Migration', 'DevOps & CI/CD', 'Monitoring & Backup'],
  },
  {
    slug: 'mobile-apps',
    icon: 'smartphone',
    title: 'Mobile Apps',
    description:
      'Aplikasi mobile yang rapi, nyaman dipakai harian, dan siap rilis ke App Store maupun Play Store.',
    highlights: ['iOS & Android', 'Flutter / React Native', 'App Store Publishing'],
  },
  {
    slug: 'iot-solutions',
    icon: 'wifi',
    title: 'IoT Solutions',
    description:
      'Sensor, dashboard, dan koneksi ke sistem bisnis Anda — semua dalam satu alur yang bisa dipakai.',
    highlights: ['Smart Devices', 'Realtime Dashboard', 'System Integration'],
  },
];

export const STATS = [
  { label: 'Projects Delivered', value: '50+' },
  { label: 'Happy Clients', value: '30+' },
  { label: 'Years of Experience', value: '5+' },
  { label: 'Tech Stack', value: '20+' },
];

export const WHY_US = [
  {
    title: 'Multi-disciplinary team',
    description: 'Satu tim yang punya grafik backend, data, dan operasional — jadi Anda tidak perlu kumpulkan vendor sendiri.',
  },
  {
    title: 'Transparent & measurable',
    description: 'Komitmen jelas: perkembangan rutin, demo yang bisa kamu lihat, dan laporan yang nggak ribet.',
  },
  {
    title: 'Tech that fits the need',
    description: 'Kita pilih teknologi berdasarkan pekerjaan Anda, bukan tren. Karena baru yang enak dipakai jangka panjang.',
  },
  {
    title: 'Long-term support',
    description: 'Jaminan perbaikan lubang kecil selama tiga bulan, plus opsi layanan terdokumentasi kalau butuh.',
  },
];

export const PROCESS_STEPS = [
  { step: '01', title: 'Discovery', description: 'Understand your needs, business goals, and constraints in an initial conversation.' },
  { step: '02', title: 'Proposal', description: 'A clear work plan, timeline, and cost estimate delivered up front.' },
  { step: '03', title: 'Development', description: 'Agile, incremental delivery with regular demos at every milestone.' },
  { step: '04', title: 'Deploy & Support', description: 'Launch, a short training session, a bug-fix warranty, and optional maintenance.' },
];

export const PROJECTS = [
  {
    slug: 'demo-project-1',
    title: 'Factory IoT Monitoring System',
    category: 'IoT Solutions',
    description: 'Tampilan yang menampilkan suhu, kelembapan, dan data sensor produksi secarag langsung.',
    tech: ['React', 'Node.js', 'MongoDB', 'MQTT'],
    image: '',
    link: '',
  },
  {
    slug: 'demo-project-2',
    title: 'Warehouse Object Detection AI',
    category: 'AI Solutions',
    description: 'Visual yang bisa menghitung dan melacak stok dari kamera, dari sisi yang bisa diperiksa.',
    tech: ['Python', 'TensorFlow', 'OpenCV'],
    image: '',
    link: '',
  },
  {
    slug: 'demo-project-3',
    title: 'Fashion E-Commerce Platform',
    category: 'Web Development',
    description: 'Toko online dengan pembayaran, pengiriman, dan halaman admin yang nyaman dipakai tim.',
    tech: ['Next.js', 'PostgreSQL', 'Midtrans'],
    image: '',
    link: '',
  },
  {
    slug: 'demo-project-4',
    title: 'Multi-Outlet POS App',
    category: 'Mobile Apps',
    description: 'Aplikasi POS yang bisa dipakai di dua sistem sekaligus, dan tetap bisa bekerja saat jaringan lemot.',
    tech: ['Flutter', 'Firebase'],
    image: '',
    link: '',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Andi Wijaya',
    role: 'CEO, PT Maju Teknologi',
    quote:
      'Timnya cepat merespons, hasilnya sesuai, dan proses pengiriman teratur. Nggak ada drama yang merdu.',
    rating: 5,
  },
  {
    name: 'Sari Kusuma',
    role: 'Owner, Retail Bumami',
    quote:
      'Aplikasinya gampang dipakai kasir, juga support jam buka yang baru nambah. Cocok banget buat kami.',
    rating: 5,
  },
  {
    name: 'Budi Santoso',
    role: 'Operations Manager, Pabrik Sejahtera',
    quote:
      'Layarnya mantep, dashboardnya ngasih gambaran yang gampang di baca, dan mesinnya nggak lagi macet 5 jam.',
    rating: 5,
  },
];

export const FAQS = [
  {
    question: 'How long does a project take?',
    answer:
      'Terlihat ribet tergantung yang diminta. Profil perusahaan biasanya 2–4 minggu, aplikasi bisnis 1–3 bulan. Estimasi detail dikirim lewat proposal.',
    order: 1,
  },
  {
    question: 'How does the payment schedule work?',
    answer:
      'Biasanya 40% di awal, 30% saat proyek utama, 30% setelah sistem selesai. Bisa disesuaikan kalau proyeknya lebih besar.',
    order: 2,
  },
  {
    question: 'Is there a warranty and support after launch?',
    answer:
      'Bisa. Semua proyek ini dilengkapi perbaikan awal 3 bulan, plus opsi layanan bulanan kalau mau.',
    order: 3,
  },
  {
    question: 'Do we get the source code?',
    answer: 'Bisa. Source code lengkap diterima setelah pembayaran selesai, lengkap dengan panduan singkat yang gampang diulang.',
    order: 4,
  },
  {
    question: 'Can you extend an existing system?',
    answer:
      'Bisa. Kita mulai dari audit teknis, baru lanjutkan ke usulan perbaikan atau migrasi.',
    order: 5,
  },
];
