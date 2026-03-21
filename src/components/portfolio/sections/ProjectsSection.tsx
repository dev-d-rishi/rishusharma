"use client";

import Image from "next/image";
import { SectionReveal } from "@/src/components/portfolio/SectionReveal";
import { ButtonLink } from "@/src/components/portfolio/ButtonLink";
import { projects, type PortfolioProject } from "@/src/components/portfolio/portfolioData";

function ProjectCard({ project }: { project: PortfolioProject }) {
  const { links } = project;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-[#2C5F7C]/20 bg-white p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      <div className="relative z-10">
        <div className="relative h-44 overflow-hidden rounded-lg border border-[#2C5F7C]/10">
          <Image
            src={project.imageSrc ?? "/projects/leadherself.png"}
            alt={`${project.name} preview`}
            fill
            sizes="(max-width: 768px) 90vw, 44vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            priority={false}
          />
        </div>

        <h3 className="mt-5 text-lg font-semibold tracking-tight text-[#1A1A1A]">
          {project.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#4A5568]">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {links.live ? (
            <ButtonLink href={links.live} variant="primary" target="_blank">
              Live
            </ButtonLink>
          ) : null}
          {links.appStore ? (
            <ButtonLink
              href={links.appStore}
              variant="secondary"
              target="_blank"
            >
              App Store
            </ButtonLink>
          ) : null}
          {links.playStore ? (
            <ButtonLink
              href={links.playStore}
              variant="secondary"
              target="_blank"
            >
              Play Store
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <SectionReveal id="projects" className="border-t border-[#2C5F7C]/15 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[#1A1A1A]">
              Projects
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#4A5568]">
              Selected mobile apps built with clean UI and scalable architecture.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}

