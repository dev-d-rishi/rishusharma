"use client";

import { SectionReveal } from "@/src/components/portfolio/SectionReveal";
import { experience } from "@/src/components/portfolio/portfolioData";

export function ExperienceSection() {
  return (
    <SectionReveal
      id="experience"
      className="border-t border-white/5 py-16"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-semibold tracking-tight">Experience</h2>
        <p className="mt-2 text-sm text-zinc-300">
          {experience.company} · {experience.duration}
        </p>

        <ul className="mt-8 space-y-4">
          {experience.points.map((p) => (
            <li
              key={p}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-zinc-300 transition-all duration-300 hover:border-white/20"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>
    </SectionReveal>
  );
}

