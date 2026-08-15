"use client";

import { SectionReveal } from "@/src/components/portfolio/SectionReveal";
import { education } from "@/src/components/portfolio/portfolioData";

export function EducationSection() {
  return (
    <SectionReveal
      id="education"
      className="border-t border-[#2C5F7C]/15 py-16"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-semibold tracking-tight text-[#1A1A1A]">
          Education
        </h2>
        <p className="mt-2 text-sm text-[#4A5568]">
          Academic background and professional training.
        </p>

        <ul className="mt-8 space-y-4">
          {education.map((entry) => (
            <li
              key={entry.degree}
              className="rounded-xl border border-[#2C5F7C]/20 bg-white/70 px-5 py-4 shadow-sm transition-all duration-300 hover:border-[#6FA3C8]/30 hover:shadow-md"
            >
              <p className="text-sm font-medium text-[#1A1A1A]">
                {entry.degree}
              </p>
              <p className="mt-1 text-sm text-[#4A5568]">{entry.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </SectionReveal>
  );
}
