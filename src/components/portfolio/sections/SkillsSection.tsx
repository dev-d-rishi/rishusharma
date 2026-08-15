"use client";

import { SectionReveal } from "@/src/components/portfolio/SectionReveal";
import { skillCategories } from "@/src/components/portfolio/portfolioData";

export function SkillsSection() {
  return (
    <SectionReveal
      id="skills"
      className="border-t border-[#2C5F7C]/15 py-16"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[#1A1A1A]">
              Skills
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#4A5568]">
              Mobile-first engineering across React Native, TypeScript, and
              production deployment.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-sm font-medium text-[#1E3A5F]">
                {category.title}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[#6FA3C8]/30 bg-[#FDFBF8] px-3 py-1.5 text-sm text-[#1E3A5F] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#6FA3C8]/50 hover:shadow-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
