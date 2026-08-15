"use client";

import Image from "next/image";
import { SectionReveal } from "@/src/components/portfolio/SectionReveal";
import { ButtonLink } from "@/src/components/portfolio/ButtonLink";
import {
  projects,
  type PortfolioProject,
} from "@/src/components/portfolio/portfolioData";

function ProjectPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1E3A5F]/10 via-[#2C5F7C]/10 to-[#6FA3C8]/20">
      <span className="text-3xl font-semibold tracking-tight text-[#1E3A5F]/40">
        {initials}
      </span>
    </div>
  );
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  const { links } = project;
  const hasLinks = links.live || links.appStore || links.playStore;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-[#2C5F7C]/20 bg-white p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      <div className="relative z-10">
        <div className="relative h-44 overflow-hidden rounded-lg border border-[#2C5F7C]/10">
          {project.imageSrc ? (
            <Image
              src={project.imageSrc}
              alt={`${project.name} preview`}
              fill
              sizes="(max-width: 768px) 90vw, 44vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              priority={false}
            />
          ) : (
            <ProjectPlaceholder name={project.name} />
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold tracking-tight text-[#1A1A1A]">
            {project.name}
          </h3>
          {project.status ? (
            <span className="rounded-full border border-[#6FA3C8]/40 bg-[#6FA3C8]/10 px-2.5 py-0.5 text-xs font-medium text-[#1E3A5F]">
              {project.status}
            </span>
          ) : null}
        </div>

        {project.subtitle ? (
          <p className="mt-1 text-sm font-medium text-[#2C5F7C]">
            {project.subtitle}
          </p>
        ) : null}

        <p className="mt-3 text-sm leading-relaxed text-[#4A5568]">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[#2C5F7C]/15 bg-[#F5EFE6] px-2.5 py-1 text-xs text-[#4A5568]"
            >
              {tech}
            </span>
          ))}
        </div>

        {hasLinks ? (
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
        ) : null}
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
              Production mobile apps and web projects shipped across fintech,
              SaaS, automotive, and community platforms.
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
