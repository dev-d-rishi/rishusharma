export const personalInfo = {
  name: "Rishu Sharma",
  title: "Senior React Native Developer",
  location: "India",
  availability: "Open to Remote",
  email: "rishusharma052003@gmail.com",
  phone: "+91-8699447760",
} as const;

export const aboutSummary = [
  "Results-driven React Native Developer with 3+ years of hands-on experience building and shipping cross-platform mobile applications for Android and iOS.",
  "Strong expertise in React Native, JavaScript, TypeScript, Redux Toolkit, Firebase, REST APIs, and mobile architecture — with experience owning the full mobile product lifecycle from architecture and development through App Store and Google Play deployment.",
  "Currently pursuing a Bachelor of Computer Applications (BCA), started in 2026. Open to senior React Native, mobile engineering, and product-based SaaS roles with international remote teams.",
] as const;

export type SkillCategory = {
  title: string;
  skills: readonly string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Mobile Development",
    skills: [
      "React Native",
      "React Native CLI",
      "Expo",
      "Android",
      "iOS",
      "React Native Architecture",
      "Native Modules",
    ],
  },
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "JavaScript ES6+"],
  },
  {
    title: "State Management",
    skills: ["Redux Toolkit", "Zustand"],
  },
  {
    title: "Backend & APIs",
    skills: ["REST APIs", "Node.js", "MongoDB", "Firebase"],
  },
  {
    title: "Web",
    skills: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Mobile Features",
    skills: [
      "Push Notifications",
      "Deep Linking",
      "Firebase Authentication",
      "Google Maps",
      "GPS / Location",
      "Payment Integrations",
      "Third-party SDKs",
    ],
  },
  {
    title: "Testing & Debugging",
    skills: [
      "Jest",
      "React Native Testing Library",
      "Firebase Crashlytics",
      "Sentry",
      "Flipper",
    ],
  },
  {
    title: "DevOps & Deployment",
    skills: [
      "Git",
      "GitHub Actions",
      "App Store Connect",
      "Google Play Console",
      "iOS Provisioning & Signing",
      "Android Release & Deployment",
    ],
  },
];

export type ProjectLinks = {
  live?: string;
  playStore?: string;
  appStore?: string;
};

export type PortfolioProject = {
  name: string;
  subtitle?: string;
  description: string;
  technologies: readonly string[];
  status?: "In Development";
  links: ProjectLinks;
  imageSrc?: string;
};

export const projects: PortfolioProject[] = [
  {
    name: "Fyntiq Wallet",
    subtitle: "Mobile Crypto Wallet",
    description:
      "Secure crypto wallet with Privy SDK for wallet creation and onboarding. Deep linking and in-app browser flows for Refer & Earn, plus transaction history, balance tracking, and multi-chain asset management.",
    technologies: [
      "React Native",
      "TypeScript",
      "Privy SDK",
      "Deep Linking",
    ],
    links: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.fyntiq.wallet",
      appStore: "https://apps.apple.com/us/app/fyntiq-wallet/id6779112642",
    },
  },
  {
    name: "Fyntiq Business",
    subtitle: "Mobile Payment & Invoice Platform",
    description:
      "Merchant payment app with invoice generation and secure payment link sharing. Multi-business account management, real-time transaction tracking, and multi-provider payment integration with App Store privacy compliance. Currently integrating Tap to Pay on Phone via Adyen Android and iOS SDKs through custom native modules.",
    technologies: [
      "React Native",
      "TypeScript",
      "Adyen SDK",
      "Native Modules",
      "Payment Integrations",
    ],
    links: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.fyntiq.app",
      appStore: "https://apps.apple.com/us/app/fyntiq-business/id6771384221",
    },
  },
  {
    name: "LeadHerself",
    subtitle: "Women's Leadership Platform",
    description:
      "Cross-platform app for guided self-leadership journeys and personalized growth. Firebase Authentication, role-based access control, event registration, push notifications and local data persistence.",
    technologies: [
      "React Native",
      "Firebase",
      "Push Notifications",
      "REST APIs",
    ],
    imageSrc: "/projects/leadherself.png",
    links: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.leadherself.com",
      appStore: "https://apps.apple.com/us/app/leadherself/id6503285556",
    },
  },
  {
    name: "Wooftag",
    subtitle: "Pet Identity & Community App",
    description:
      "QR-based pet identification for instant owner lookup without microchip scanners. Google Maps and real-time GPS sharing, with push and email alerts containing live coordinates when a pet tag is scanned.",
    technologies: [
      "React Native",
      "Google Maps",
      "GPS / Location",
      "Push Notifications",
    ],
    imageSrc: "/projects/wooftag.png",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.wooftag",
      appStore: "https://apps.apple.com/us/app/wooftag/id6467188257",
    },
  },
  {
    name: "Disha Portal",
    subtitle: "Honda",
    description:
      "React Native app for Honda's Disha Portal serving dealers, transporters, and HMSI users. Multilingual support optimized for low-bandwidth environments, with secure auth, showroom locator, vehicle booking enquiries, and load change request workflows.",
    technologies: [
      "React Native",
      "REST APIs",
      "Multilingual",
      "Redux Toolkit",
    ],
    imageSrc: "/projects/disha.png",
    links: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.dishaportal",
      appStore: "https://apps.apple.com/in/app/disha-portal/id6749362362",
    },
  },
  {
    name: "HH Photography",
    subtitle: "Portfolio Website",
    description:
      "Modern photography portfolio built with Next.js, TypeScript, and Tailwind CSS. Responsive layouts, image optimization, SEO best practices, and smooth page transitions with Framer Motion.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    links: {
      live: "https://hh-photography.vercel.app/",
    },
  },
  {
    name: "MB Academy",
    subtitle: "E-Commerce Learning Platform",
    description:
      "Cross-platform learning platform for entrepreneurs with structured course modules, live coaching session access, community features, offline course access, and push reminders for scheduled live sessions.",
    technologies: ["React Native", "Push Notifications"],
    status: "In Development",
    links: {},
  },
];

export const experience = {
  company: "CS Soft Solutions",
  role: "React Native Developer",
  duration: "June 2023 – Present",
  points: [
    "Developed and maintained production-grade React Native applications for Android and iOS.",
    "Implemented authentication, REST API integrations, push notifications, and deep linking functionality.",
    "Improved application startup performance and rendering using lazy loading and optimization techniques.",
    "Built reusable components and shared modules to improve development efficiency and maintainability.",
    "Managed App Store and Google Play Store releases, signing, provisioning, and production deployments.",
    "Used Firebase Crashlytics for crash monitoring, debugging, and production issue analysis.",
    "Collaborated with designers, QA engineers, backend developers, and stakeholders throughout the product lifecycle.",
    "Integrated third-party SDKs and native modules for payments, maps, and platform-specific features.",
  ],
} as const;

export type EducationEntry = {
  degree: string;
  detail: string;
};

export const education: EducationEntry[] = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    detail: "Pursuing",
  },
  {
    degree: "Diploma in Computer Applications (DCA)",
    detail: "Completed",
  },
  {
    degree: "ASP.NET Training Course",
    detail: "6-Month Certified Programme — Microsoft ASP.NET",
  },
];
