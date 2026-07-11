export const skills = [
  "React Native (CLI & Expo)",
  "Redux Toolkit / Zustand",
  "REST APIs / Firebase",
  "JavaScript / TypeScript",
  "Push Notifications & Deep Linking",
  "MongoDB / Node.js",
  "React.js / Next.js",
  "Jest / React Native Testing Library",
  "Git / GitHub Actions",
  "Performance Optimization",
  "Fastlane / Sentry / Flipper",
  "App Store & Play Store",
] as const;

export type ProjectLinks = {
  live?: string;
  playStore?: string;
  appStore?: string;
};

export type PortfolioProject = {
  name: string;
  description: string;
  links: ProjectLinks;
  imageSrc?: string;
};

export const projects: PortfolioProject[] = [
  {
    name: "LeadHerself",
    description:
      "Personalized self-leadership platform for women and non-binary professionals with guided reflection journeys and bite-sized, evidence-based exercises. Firebase-powered role-based access, event registration, real-time push notifications, and offline-first content access.",
    imageSrc: "/projects/leadherself.png",
    links: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.leadherself.com",
      appStore:
        "https://apps.apple.com/us/app/leadherself/id6503285556",
    },
  },
  {
    name: "Wooftag",
    description:
      "Next-generation pet identification via instant QR scan—no chip reader, police, or shelter required. Real-time GPS location alerts and Google Maps integration send push and email notifications with live coordinates when a tag is scanned.",
    imageSrc: "/projects/wooftag.png",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.wooftag",
      appStore: "https://apps.apple.com/us/app/wooftag/id6467188257",
    },
  },
  {
    name: "Disha Portal",
    description:
      "Mobile extension of HMSI's web-based Disha Portal for Dealers, Transporters, and HMSI users on the go. Multilingual support and performance tuning for low-bandwidth rural environments, with load change workflows, secure auth, showroom locator, and vehicle booking enquiry.",
    imageSrc: "/projects/disha.png",
    links: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.dishaportal",
      appStore:
        "https://apps.apple.com/in/app/disha-portal/id6749362362",
    },
  },
  {
    name: "MB Academy",
    description:
      "Upcoming cross-platform app for a Dutch e-commerce mentorship platform guiding entrepreneurs from product selection to building a sellable brand. Module-based course delivery, live coaching session access, community engagement, push reminders for live sessions, and offline content access.",
    links: {},
  },
  {
    name: "Fyntiq Business",
    description:
      "Business payment app (iOS 15.1+) enabling merchants to accept payments, generate professional invoices, and manage transactions from one platform. Secure payment link creation, multi-business account management, real-time transaction tracking, and multi-provider payment integration.",
    links: {},
  },
  {
    name: "Fyntiq Wallet",
    description:
      "Crypto wallet integrated with Privy SDK for seamless wallet creation, funding, and management. In-app browser flows with deep linking for fiat-to-crypto onboarding, plus transaction history, balance tracking, and multi-chain asset views with real-time updates.",
    links: {},
  },
];

export const experience = {
  company: "CS Soft Solutions",
  role: "React Native Developer",
  duration: "June 2023 – Present",
  points: [
    "Developed and maintained multiple production-grade React Native apps for Android and iOS.",
    "Implemented authentication, API integrations, push notifications, deep linking, and offline-first features.",
    "Improved app startup and screen rendering performance via lazy loading and render optimizations.",
    "Built reusable components and shared modules to accelerate feature delivery across projects.",
    "Managed Play Store and App Store submissions, signing, provisioning, and release processes.",
    "Used Firebase Crashlytics for crash analysis, debugging, and performance monitoring.",
    "Collaborated with designers, QA, and stakeholders to deliver pixel-perfect, reliable apps.",
  ],
} as const;
