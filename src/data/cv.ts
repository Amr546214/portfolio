export const profile = {
  name: 'Amr Mahmoud Yehia',
  shortName: 'Amr Okasha',
  handle: 'amr',
  title: 'Full-Stack Developer',
  stack: 'React · Next.js · TypeScript · Supabase',
  location: 'Cairo, Egypt',
  email: 'amr250010@gmail.com',
  phone: '+20 102 507 3026',
  linkedin: 'https://www.linkedin.com/in/%D9%90%D9%90amr-okasha/',
  github: 'https://github.com/Amr546214',
  summary:
    'Full-Stack Developer with hands-on experience building scalable web applications using React, Next.js, TypeScript, Supabase, and modern JavaScript technologies. Experienced in frontend development, backend integration, database design, authentication systems, and real-time applications. Contributed to production-level platforms including learning management systems, collaboration platforms, event management systems, and mobile applications. Passionate about creating clean, performant, and user-focused digital products.',
} as const;

export type SkillGroup = { label: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  { label: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript ES6+', 'TypeScript', 'React', 'Next.js', 'React Native', 'Expo'] },
  { label: 'Backend', items: ['Supabase', 'REST APIs', 'Edge Functions', 'API Integration'] },
  { label: 'Database', items: ['PostgreSQL', 'Supabase Database'] },
  { label: 'Styling', items: ['Tailwind CSS', 'Responsive Design', 'Flexbox', 'CSS Grid', 'Mobile-First Design'] },
  { label: 'Tools', items: ['Git', 'GitHub', 'Vite', 'NPM', 'PNPM', 'VS Code', 'Windsurf'] },
  { label: 'Other', items: ['Authentication', 'Realtime Applications', 'Row Level Security', 'Database Design', 'System Design', 'AI Integration', 'n8n'] },
];

export type Experience = {
  role: string;
  company: string;
  location?: string;
  period: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    role: 'Frontend Developer Intern',
    company: 'Verbivore OÜ',
    location: 'Malta',
    period: 'Jun 2026 — Present',
    points: [
      'Developed and maintained frontend features using Next.js, React, and TypeScript.',
      'Improved responsive layouts and user experience across different screen sizes.',
      'Worked on course player components, PDF rendering, and dashboard interfaces.',
      'Integrated frontend features with Supabase services and existing backend APIs.',
      'Collaborated with designers and developers through GitHub pull requests and code reviews.',
    ],
  },
  {
    role: 'Full-Stack Developer',
    company: 'SKAM Event Management System',
    period: '2026 — Present',
    points: [
      'Designed and developed a full-stack tournament and event management platform using React, Supabase, PostgreSQL, Realtime, Storage, and Edge Functions.',
      'Built secure authentication, role-based access control, tournament workflows, invitation systems, judges dashboards, player management, and real-time scoring features.',
      'Participated in system architecture, database design, backend development, and frontend implementation.',
    ],
  },
  {
    role: 'Programming Instructor',
    company: 'Black Horse Academy',
    period: '2026 — Present',
    points: [
      'Deliver programming and web development training sessions for students.',
      'Explain programming fundamentals and modern web technologies through practical projects.',
      'Guide students using HTML, CSS, JavaScript, React, Git, and modern development workflows.',
    ],
  },
];

export type Project = {
  id: string;
  name: string;
  tags: string[];
  stack: string[];
  description: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: 'verbivore',
    name: 'Verbivore LMS',
    featured: true,
    tags: ['Education', 'Production', 'Web'],
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase'],
    description:
      'Production-level LMS for language learning. Contributed to responsive course pages, lesson player improvements, PDF rendering, dashboard features, user management UI, dark mode fixes, and Supabase integration while working with an international remote team.',
  },
  {
    id: 'teamup',
    name: 'TeamUP Platform',
    featured: true,
    tags: ['Collaboration', 'Realtime', 'AI'],
    stack: ['React', 'TypeScript', 'Supabase', 'Node.js'],
    description:
      'Full-stack collaboration platform connecting developers, clients, and companies. Built authentication systems, role-based dashboards, multilingual support, real-time chat, notifications, voice/video communication, and AI-powered team recommendations. Contributed to system architecture, backend integration, database design, and responsive UI development.',
  },
  {
    id: 'mav',
    name: 'MAV Mobile App',
    tags: ['Mobile', 'E-Commerce'],
    stack: ['React Native', 'Expo', 'Supabase'],
    description:
      'Mobile e-commerce application built with React Native and Expo. Developed authentication screens, onboarding flow, product listing, categories, product details, cart, wishlist, profile screens, addresses, and Supabase integration for real data.',
  },
  {
    id: 'skam',
    name: 'SKAM Event Management',
    featured: true,
    tags: ['Realtime', 'System Design', 'Production'],
    stack: ['React', 'Supabase', 'PostgreSQL', 'Edge Functions'],
    description:
      'Large-scale event and tournament management platform handling events, teams, players, judges, invitations, seating management, and real-time scoring. Designed database architecture, implemented RLS security policies, created Edge Functions, and developed administration dashboards.',
  },
  {
    id: 'ramadan',
    name: 'Ramadan React App',
    tags: ['Web', 'Utility'],
    stack: ['React', 'REST API'],
    description:
      'Full-featured application including prayer times API integration, quiz system, azkar counter, dynamic notifications, and responsive UI. Managed API consumption, state management, and reusable component architecture.',
  },
  {
    id: 'admin',
    name: 'Admin Dashboard',
    tags: ['Web', 'UI'],
    stack: ['React'],
    description:
      'Responsive dashboard featuring sidebar navigation, reusable UI components, analytics cards, and clean user experience. Developed with a mobile-first approach and scalable component structure.',
  },
];

export const education = [
  {
    degree: 'Bachelor of Information Technology',
    school: 'Egyptian E-Learning University, Beni Suef',
    period: '2022 — 2026',
    gpa: '3.17',
  },
];

export const certifications = ['Web Designer Certificate', 'Web Developer Certificate'];
