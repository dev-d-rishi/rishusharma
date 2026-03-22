"use client";

import Image from "next/image";
import { SectionReveal } from "@/src/components/portfolio/SectionReveal";
import { experience } from "@/src/components/portfolio/portfolioData";

export function ExperienceSection() {
  return (
    <SectionReveal
      id="experience"
      className="border-t border-[#2C5F7C]/15 py-16"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[#1A1A1A]">
              Experience
            </h2>
            <p className="mt-2 text-sm text-[#4A5568]">
              {experience.company} · {experience.duration}
            </p>

            <ul className="mt-8 space-y-4">
              {experience.points.map((p) => (
                <li
                  key={p}
                  className="rounded-xl border border-[#2C5F7C]/20 bg-white/70 px-5 py-4 text-sm text-[#4A5568] shadow-sm transition-all duration-300 hover:border-[#6FA3C8]/30 hover:shadow-md"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#2C5F7C]/20">
              <Image
                src="/assets/images/mount-fuji.jpg"
                alt="Mount Fuji"
                width={600}
                height={400}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
