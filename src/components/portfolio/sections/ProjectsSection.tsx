"use client";

import Image from "next/image";
import { SectionReveal } from "@/src/components/portfolio/SectionReveal";
import { ButtonLink } from "@/src/components/portfolio/ButtonLink";
import { projects, type PortfolioProject } from "@/src/components/portfolio/portfolioData";

function ProjectCard({ project }: { project: PortfolioProject }) {
  const { links } = project;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-[box-shadow,background-color,border-color,transform] duration-300 will-change-transform hover:-translate-y-[5px] hover:border-white/20 hover:bg-white/8 hover:shadow-[0_0_34px_rgba(56,189,248,0.18)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(520px circle at 20% 0%, rgba(56,189,248,0.18), transparent 55%)",
        }}
      />

      <div className="relative z-10">
        <div className="relative h-44 overflow-hidden rounded-xl border border-white/10">
          <Image
            src={project.imageSrc ?? "/projects/leadherself.png"}
            alt={`${project.name} preview`}
            fill
            sizes="(max-width: 768px) 90vw, 44vw"
            className="object-cover transition-transform duration-300 will-change-transform group-hover:scale-[1.05]"
            priority={false}
          />
        </div>

        <h3 className="mt-5 text-lg font-semibold tracking-tight">
          {project.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300">
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
    <SectionReveal id="projects" className="border-t border-white/5 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Projects
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-300">
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

