// Placeholder data mirror (before real CMS content is applied).
// Sprint 2: components read this from the API /api/* (the server already provides it).
// ══════════════════════════════════════════════════════════════════════
//  KONTAK — nilainya diambil dari environment:
//   • lokal : server/.env lewat API (CONTACT_EMAIL, CONTACT_PHONE_1, ...)
//   • Vercel: VITE_CONTACT_* (Project Settings → Environment Variables)
//  Baris di bawah hanya cadangan kalau keduanya kosong.
// ══════════════════════════════════════════════════════════════════════
const EMAIL_FROM_ENV = import.meta.env.VITE_CONTACT_EMAIL;
const PHONES_FROM_ENV = [
  import.meta.env.VITE_CONTACT_PHONE_1
    ? {
        label: 'WhatsApp — Sales',
        value: import.meta.env.VITE_CONTACT_PHONE_1,
        wa: import.meta.env.VITE_CONTACT_PHONE_1_WA || '',
      }
    : null,
  import.meta.env.VITE_CONTACT_PHONE_2
    ? { label: 'Phone — Office', value: import.meta.env.VITE_CONTACT_PHONE_2 }
    : null,
].filter(Boolean);

export const SETTINGS = {
  siteName: 'DevXSolution',
  tagline: 'We help SMEs and startups turn their ideas into real digital products.',
  email: EMAIL_FROM_ENV || 'halo@devxsolution.com',
  phones:
    PHONES_FROM_ENV.length > 0
      ? PHONES_FROM_ENV
      : [
          { label: 'WhatsApp — Sales', value: '+62 812-3456-7890', wa: '6281234567890' },
          { label: 'Phone — Office', value: '+62 813-9876-5432' },
        ],
  address: 'Denpasar, Bali',
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
      'Automation built around the way your team already works — not a shiny corner of tech nobody asked for.',
    highlights: ['Machine Learning', 'Computer Vision', 'Natural Language Processing'],
  },
  {
    slug: 'cloud-solutions',
    icon: 'cloud',
    title: 'Cloud Solutions',
    description:
      'Infrastructure that grows with your business — built on what you actually need, not a generic checklist.',
    highlights: ['Cloud Migration', 'DevOps & CI/CD', 'Monitoring & Backup'],
  },
  {
    slug: 'mobile-apps',
    icon: 'smartphone',
    title: 'Mobile Apps',
    description:
      'Mobile apps that feel clean, hold up in daily use, and ship ready for the App Store and Play Store.',
    highlights: ['iOS & Android', 'Flutter / React Native', 'App Store Publishing'],
  },
  {
    slug: 'iot-solutions',
    icon: 'wifi',
    title: 'IoT Solutions',
    description:
      'Sensors, dashboards, and hooks into the systems you already run — all wired into one flow people can use.',
    highlights: ['Smart Devices', 'Realtime Dashboard', 'System Integration'],
  },
];

// Angka jujur untuk studio yang baru jalan: tanpa klaim klien/pengalaman puluhan
// tahun — isinya komitmen yang memang bisa kami tepati.
export const STATS = [
  { label: 'Projects Shipped', value: '3' },
  { label: 'First Call', value: '30 min' },
  { label: 'Bug-fix Cover', value: '3 mo' },
  { label: 'Source Handover', value: '100%' },
];

export const WHY_US = [
  {
    title: 'One team, whole stack',
    description:
      'Design, backend, data, and ops all sit on the same team — so you are not juggling five vendors or translating between them.',
  },
  {
    title: 'Transparent & measurable',
    description:
      'A clear plan up front, a working demo you can click through every week, and updates written in plain English. No jargon, no surprises.',
  },
  {
    title: 'Tech that fits the need',
    description:
      'We pick tools your team will still be happy using two years from now — not whatever happens to be trending this month.',
  },
  {
    title: 'Long-term support',
    description:
      'Three months of small-bug fixes after launch, on us. If you want us to stay longer, there is a documented support plan waiting.',
  },
];

export const PROCESS_STEPS = [
  { step: '01', title: 'Discovery', description: 'Understand your needs, business goals, and constraints in an initial conversation.' },
  { step: '02', title: 'Proposal', description: 'A clear work plan, timeline, and cost estimate delivered up front.' },
  { step: '03', title: 'Development', description: 'Agile, incremental delivery with regular demos at every milestone.' },
  { step: '04', title: 'Deploy & Support', description: 'Launch, a short training session, a bug-fix warranty, and optional maintenance.' },
];

// Karya nyata — tiga proyek yang sudah live, ditautkan ke situsnya sendiri.
export const PROJECTS = [
  {
    slug: 'apotek-nusa',
    title: 'Apotek Nusa',
    category: 'Web Development',
    description:
      'A premium site for a 24-hour pharmacy: live open/closed status, weekly promos, outlet list, careers and FAQ — dark theme with gold accents, scoring 92–96 on Lighthouse mobile.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    image: '/images/projects/apotek-nusa.jpg',
    link: 'https://apotek-nusa.vercel.app',
  },
  {
    slug: 'farmacare',
    title: 'FarmaCare',
    category: 'Web App',
    description:
      'A full pharmacy storefront: drug catalogue, cart, checkout with QR payment, prescription uploads, pharmacist chat and order tracking — plus an admin area for outlets and stock.',
    tech: ['React 19', 'React Router', 'Tailwind CSS', 'QR Code'],
    image: '/images/projects/farmacare.jpg',
    link: 'https://farmacare-ten.vercel.app',
  },
  {
    slug: 'apotek-3d',
    title: 'Apotek 3D',
    category: '3D / WebGL',
    description:
      'Walk the pharmacy shelves in 3D from anywhere: pick products in a real-time three.js store, order them for delivery, with pharmacist chat and weekly promos on top.',
    tech: ['React', 'Three.js', 'React Three Fiber', 'Postprocessing'],
    image: '/images/projects/apotek3d.jpg',
    link: 'https://apotek3d.vercel.app',
  },
];

// Pengganti testimoni: belum ada klien, jadi yang ditampilkan cara kerja kami —
// komitmen yang bisa dipercaya tanpa kutipan atau nama klien palsu.
export const HOW_WE_WORK = [
  {
    title: 'You talk to the builders',
    text: 'No account managers and no ticket queue — the people writing your code are in the conversation from day one.',
  },
  {
    title: 'A demo you can click',
    text: 'Working software every week, so surprises show up early while course corrections are still cheap.',
  },
  {
    title: 'Plain-English updates',
    text: 'Progress, risks and costs written the way you would explain them to your co-founder — never hidden behind jargon.',
  },
  {
    title: 'Scope agreed in writing',
    text: 'What is in, what is out, and what it costs — settled before we start, and referred back to when things change.',
  },
  {
    title: 'Handover, not lock-in',
    text: 'Full source code, setup notes and a short walkthrough are yours to keep, whoever you build with next.',
  },
  {
    title: 'We stay after launch',
    text: 'Three months of small-bug fixes come with every build, plus an optional retainer if you want us to keep going.',
  },
];

export const FAQS = [
  {
    question: 'How long does a project take?',
    answer:
      'It depends on the scope. A company profile usually takes 2–4 weeks, a business app 1–3 months. You get a detailed estimate in the proposal.',
    order: 1,
  },
  {
    question: 'How does the payment schedule work?',
    answer:
      'Typically 40% up front, 30% at the main milestone, and 30% once the system is finished. We can adjust if the project is bigger.',
    order: 2,
  },
  {
    question: 'Is there a warranty and support after launch?',
    answer:
      'Yes. Every project comes with three months of bug fixes, plus an optional monthly support plan if you want it.',
    order: 3,
  },
  {
    question: 'Do we get the source code?',
    answer:
      'Yes. You get the full source code once payment is complete, along with a short handover guide that is easy to follow.',
    order: 4,
  },
  {
    question: 'Can you extend an existing system?',
    answer:
      'Yes. We start with a technical audit, then move on to a proposal for fixes or migration.',
    order: 5,
  },
];
