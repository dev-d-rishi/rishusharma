"use client";

import { SectionReveal } from "@/src/components/portfolio/SectionReveal";
import { aboutSummary, personalInfo } from "@/src/components/portfolio/portfolioData";

export function AboutSection() {
  return (
    <SectionReveal
      id="about"
      className="border-t border-[#2C5F7C]/15 py-16"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-semibold tracking-tight text-[#1A1A1A]">
          About
        </h2>
        <p className="mt-2 text-sm text-[#4A5568]">
          {personalInfo.title} · {personalInfo.location} ·{" "}
          {personalInfo.availability}
        </p>

        <div className="mt-8 space-y-4">
          {aboutSummary.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="max-w-3xl text-base leading-relaxed text-[#4A5568]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
