export const skills = [
  "React Native",
  "React.js",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Redux",
  "REST APIs",
  "Firebase",
  "Git",
  "MongoDB",
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
    description: "Mobile experience for women with a smooth, high-performance React Native foundation.",
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
    description: "React Native app focused on usability, fast flows, and clean UI interactions.",
    imageSrc: "/projects/wooftag.png",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.wooftag",
      appStore: "https://apps.apple.com/us/app/wooftag/id6467188257",
    },
  },
  {
    name: "Disha Portal",
    description: "A scalable mobile portal with API integration and a refined end-user experience.",
    imageSrc: "/projects/disha.png",
    links: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.dishaportal",
      appStore:
        "https://apps.apple.com/in/app/disha-portal/id6749362362",
    },
  },
  {
    name: "Collablinks",
    description: "Platform for collaboration and visibility, built to stay fast and responsive.",
    imageSrc: "/projects/collablinks.png",
    links: {
      live: "https://www.collablinks.com/",
    },
  },
];

export const experience = {
  company: "CS Soft Solutions",
  duration: "June 2023 – Present",
  points: [
    "Developed and maintained React Native apps deployed on Play Store and App Store",
    "Integrated APIs and authentication",
    "Improved performance and user experience",
    "Collaborated with team",
  ],
} as const;

