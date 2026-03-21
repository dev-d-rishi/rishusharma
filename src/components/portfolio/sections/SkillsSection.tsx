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
      className="border-t border-white/5 py-16"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-300">
              Modern mobile development with clean, scalable architecture.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {skills.map((s) => (
            <span
              key={s}
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition-all duration-200 hover:scale-[1.05] hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_26px_rgba(56,189,248,0.22)]"
            >
              {(() => {
                const Icon = skillIcons[s] ?? FaReact;
                return <Icon className="text-sky-400/90" size={16} />;
              })()}
              {s}
            </span>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}

