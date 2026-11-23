interface PersonalProject {
  name: string;
  description: string;
  icon: string;
  tone: 'green' | 'blue' | 'amber';
  technologies: readonly string[];
  href?: string;
  linkText?: string;
  badge?: string;
  sourceHref?: string;
}

export const PERSONAL_PROJECTS: readonly PersonalProject[] = [
  {
    name: 'next-server-api-debugger',
    description: 'An open-source npm developer tool I created and maintain for Next.js 16 App Router. It helps developers inspect supported server-side fetch calls in the browser Console during local development, including request and response previews, HTTP status, and timing. Setup can generate the necessary instrumentation and protected routes.',
    icon: 'fa-bug',
    tone: 'blue',
    technologies: ['npm package', 'Next.js 16', 'Node.js', 'Developer tooling'],
    href: 'https://www.npmjs.com/package/next-server-api-debugger',
    linkText: 'View on npm',
    badge: 'Owner & maintainer',
    sourceHref: 'https://github.com/kavinkumar025/next-server-api-debugger'
  },
  {
    name: 'Minyfin',
    description: 'A financial literacy site for India with budgeting and saving guides, money challenges, and eight calculators for topics such as SIP investments, EMIs and emergency funds.',
    icon: 'fa-piggy-bank',
    tone: 'green',
    technologies: ['Next.js', 'TypeScript', 'Financial education'],
    href: 'https://www.minyfin.com/',
    linkText: 'Visit Minyfin'
  },
  {
    name: 'LIC Guidance in Erode',
    description: 'An insurance guidance site for Erode district. Families can explore life insurance, child and retirement planning, claim documents, and how to reach an independent advisor.',
    icon: 'fa-shield-halved',
    tone: 'blue',
    technologies: ['Local SEO', 'Bilingual guidance', 'Planning tools'],
    href: 'https://lic.minyfin.com/',
    linkText: 'Visit LIC guidance'
  },
  {
    name: 'GymTracker',
    description: 'A fitness log for workouts, activity, gym attendance, and weight trends. It brings progress charts, training goals, and a library of practical guides into one web app.',
    icon: 'fa-dumbbell',
    tone: 'amber',
    technologies: ['Next.js', 'Neon PostgreSQL', 'ECharts'],
    href: 'https://gymtracker.minyfin.com/',
    linkText: 'Visit GymTracker'
  },
  {
    name: 'AutoMax Used-Car Demo',
    description: 'A dealership demo with a searchable car catalog, vehicle detail pages, and dealer workflows. An English and Tamil guide walks through browsing, managing listings, and recording a sale.',
    icon: 'fa-car-side',
    tone: 'blue',
    technologies: ['Angular', 'Neon PostgreSQL', 'Vercel APIs'],
    href: 'https://demo-usedcars.minyfin.com/',
    linkText: 'Open the AutoMax demo'
  },
  {
    name: 'Interactive Calculators',
    description: 'A library of everyday calculators for finance, health, education, and general use. Try a BMI, GPA, EMI, or percentage calculation and see the result immediately.',
    icon: 'fa-calculator',
    tone: 'amber',
    technologies: ['Angular', 'Calculator design', 'SEO'],
    href: 'https://interactive-calculators.vercel.app/',
    linkText: 'Browse the calculators'
  },
  {
    name: 'InvoiceHub',
    description: 'A buyer and seller demo for chilled and perishable goods. It includes a product catalog, checkout, order tracking, invoices, seller maps, and business profiles.',
    icon: 'fa-file-invoice',
    tone: 'green',
    technologies: ['Angular', 'Firebase', 'Commerce workflows'],
    href: 'https://invoice-alpha-rosy.vercel.app/',
    linkText: 'Open InvoiceHub'
  },
  {
    name: 'Developer Portfolio',
    description: 'My resume site brings together my work experience, technical skills, and project demos. It uses a time-aware default theme with a manual light/dark toggle and showcases examples of my search visibility work.',
    icon: 'fa-laptop-code',
    tone: 'blue',
    technologies: ['Angular', 'TypeScript', 'Responsive design'],
    href: '/seo',
    linkText: 'Read my SEO work'
  }
];

export const PERSONAL_PROTOTYPES: readonly PersonalProject[] = [
  {
    name: 'KidsMoney',
    description: 'An earlier Minyfin app that helps parents teach money habits through chores, virtual coins, savings goals, and a practice investment simulator.',
    icon: 'fa-coins',
    tone: 'green',
    technologies: ['Angular', 'Firebase', 'Financial education']
  },
  {
    name: 'AI Resume Builder',
    description: 'A career tools prototype with flows for building a resume, drafting cover letters, searching jobs, and tracking applications.',
    icon: 'fa-file-lines',
    tone: 'blue',
    technologies: ['Angular', 'Workflow design']
  },
  {
    name: 'Interview Tracking System',
    description: 'A hiring workflow demo with candidate registration, stage-by-stage evaluations, a dashboard, and candidate reports.',
    icon: 'fa-clipboard-check',
    tone: 'amber',
    technologies: ['Angular', 'Hiring workflows'],
    href: 'https://github.com/kavinkumar025/Interview-Tracking-System',
    linkText: 'View the interview tracker code'
  },
  {
    name: 'Task Management Dashboard',
    description: 'A small Angular dashboard for maintaining a task list with forms for adding and editing tasks and a confirmation step for removing them.',
    icon: 'fa-list-check',
    tone: 'blue',
    technologies: ['Angular', 'Task management'],
    href: 'https://github.com/kavinkumar025/taskManagementDashboard',
    linkText: 'View the task dashboard code'
  },
  {
    name: 'SplotShot',
    description: 'A video platform prototype with a browsing interface, accounts, and a video upload flow.',
    icon: 'fa-video',
    tone: 'green',
    technologies: ['Angular', 'Video interface']
  }
];
