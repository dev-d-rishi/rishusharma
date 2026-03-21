"use client";

import { SectionReveal } from "@/src/components/portfolio/SectionReveal";
import { skills } from "@/src/components/portfolio/portfolioData";
import { IconType } from "react-icons";
import { FaReact, FaGitAlt } from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiRedux,
  SiFirebase,
  SiMongodb,
  SiNextdotjs,
  SiSwagger,
} from "react-icons/si";

export function SkillsSection() {
  const skillIcons: Record<string, IconType> = {
    "React Native": FaReact,
    "React.js": FaReact,
    "Next.js": SiNextdotjs,
    JavaScript: SiJavascript,
    TypeScript: SiTypescript,
    Redux: SiRedux,
    "REST APIs": SiSwagger,
    Firebase: SiFirebase,
    Git: FaGitAlt,
    MongoDB: SiMongodb,
  };

  return (
    <SectionReveal
      id="skills"
      className="border-t border-[#2C5F7C]/15 py-16"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[#1A1A1A]">Skills</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#4A5568]">
              Modern mobile development with clean, scalable architecture.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {skills.map((s) => (
            <span
              key={s}
              className="group flex items-center gap-2 rounded-full border border-[#6FA3C8]/30 bg-[#FDFBF8] px-4 py-2 text-sm text-[#1E3A5F] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#6FA3C8]/50 hover:shadow-md"
            >
              {(() => {
                const Icon = skillIcons[s] ?? FaReact;
                return <Icon className="text-[#2C5F7C]" size={16} />;
              })()}
              {s}
            </span>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}

