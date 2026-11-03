// Placeholder data mirror (before real CMS content is applied).
// Sprint 2: components read this from the API /api/* (the server already provides it).
export const SETTINGS = {
  siteName: 'DevXSolution',
  tagline: 'End-to-end digital solutions for your business',
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
      'Fast, secure, and easy-to-manage websites and web apps — from company profiles to complex business systems.',
    highlights: ['Company Profile', 'E-Commerce', 'Web App & Dashboard'],
  },
  {
    slug: 'ai-solutions',
    icon: 'cpu',
    title: 'AI Solutions',
    description:
      'Machine learning, computer vision, and NLP to help your business work smarter and more automatically.',
    highlights: ['Machine Learning', 'Computer Vision', 'Natural Language Processing'],
  },
  {
    slug: 'cloud-solutions',
    icon: 'cloud',
    title: 'Cloud Solutions',
    description:
      'Scalable, secure, and cost-efficient cloud infrastructure — migration, deployment, and monitoring.',
    highlights: ['Cloud Migration', 'DevOps & CI/CD', 'Monitoring & Backup'],
  },
  {
    slug: 'mobile-apps',
    icon: 'smartphone',
    title: 'Mobile Apps',
    description:
      'Native and cross-platform apps for iOS and Android with a user experience that feels effortless.',
    highlights: ['iOS & Android', 'Flutter / React Native', 'App Store Publishing'],
  },
  {
    slug: 'iot-solutions',
    icon: 'wifi',
    title: 'IoT Solutions',
    description:
      'End-to-end IoT systems: sensors, realtime dashboards, and integration with your business systems.',
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
    description: 'Developers, data scientists, and DevOps in one team — every aspect of a digital solution covered.',
  },
  {
    title: 'Transparent & measurable',
    description: 'Weekly sprints, regular demos, and progress reports you can check at any time.',
  },
  {
    title: 'Tech that fits the need',
    description: 'We pick the stack based on business needs, not trends — so it stays maintainable long term.',
  },
  {
    title: 'Long-term support',
    description: 'A 3-month bug-fix warranty and optional maintenance contracts for peace of mind.',
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
    description: 'Realtime dashboard monitoring temperature, humidity, and machine sensors on the production floor.',
    tech: ['React', 'Node.js', 'MongoDB', 'MQTT'],
    image: '',
    link: '',
  },
  {
    slug: 'demo-project-2',
    title: 'Warehouse Object Detection AI',
    category: 'AI Solutions',
    description: 'Computer vision that counts and tracks inventory automatically from CCTV cameras.',
    tech: ['Python', 'TensorFlow', 'OpenCV'],
    image: '',
    link: '',
  },
  {
    slug: 'demo-project-3',
    title: 'Fashion E-Commerce Platform',
    category: 'Web Development',
    description: 'A complete online store with payment gateway, logistics, and an admin dashboard.',
    tech: ['Next.js', 'PostgreSQL', 'Midtrans'],
    image: '',
    link: '',
  },
  {
    slug: 'demo-project-4',
    title: 'Multi-Outlet POS App',
    category: 'Mobile Apps',
    description: 'A cross-platform POS app for iOS and Android with offline-first sync.',
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
      'The DevXSolution team was highly responsive. The system they built went far beyond our expectations and was delivered on time.',
    rating: 5,
  },
  {
    name: 'Sari Kusuma',
    role: 'Owner, Retail Bumami',
    quote:
      'The POS app is easy for all our cashiers to use. It fully supported our expansion into new outlets.',
    rating: 5,
  },
  {
    name: 'Budi Santoso',
    role: 'Operations Manager, Pabrik Sejahtera',
    quote:
      'Their IoT solution cut our machine downtime by 30%. The dashboard is informative and easy to understand.',
    rating: 5,
  },
];

export const FAQS = [
  {
    question: 'How long does a project take?',
    answer:
      'It depends on complexity. A company profile usually takes 2–4 weeks, a business application 1–3 months. We send a detailed estimate in the proposal.',
    order: 1,
  },
  {
    question: 'How does the payment schedule work?',
    answer:
      'Typically 40% upfront, 30% mid-project, and 30% on handover. It can be adjusted for larger projects.',
    order: 2,
  },
  {
    question: 'Is there a warranty and support after launch?',
    answer:
      'Yes. Every project includes a 3-month bug-fix warranty and an optional monthly maintenance contract.',
    order: 3,
  },
  {
    question: 'Do we get the source code?',
    answer: 'Yes, the full source code is handed over along with brief documentation once payment is complete.',
    order: 4,
  },
  {
    question: 'Can you extend an existing system?',
    answer:
      'Yes. We start with a technical audit, then propose a remediation or migration plan.',
    order: 5,
  },
];
