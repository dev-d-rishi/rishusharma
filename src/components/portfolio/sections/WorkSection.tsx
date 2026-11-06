import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/src/components/portfolio/SectionHeading";
import { SectionReveal } from "@/src/components/portfolio/SectionReveal";
import { caseStudies } from "@/src/components/portfolio/content/caseStudies";
import type { CaseStudy } from "@/src/components/portfolio/content/types";
import {
  featuredCaseStudySlugs,
  projects,
  selectedProjectNames,
  type PortfolioProject,
} from "@/src/components/portfolio/portfolioData";

function Tags({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
      {items.map((t) => (
        <li
          key={t}
          className="rounded-md border border-line bg-bg-2 px-2 py-1 text-xs font-medium text-subtle"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function PhoneShots({ study }: { study: CaseStudy }) {
  const shots = study.screenshots?.slice(0, 3) ?? [];
  if (shots.length === 0) return null;

  return (
    <div
      className="mx-auto flex w-full max-w-[540px] items-start gap-3 sm:gap-5"
      aria-hidden="true"
    >
      {shots.map((shot, i) => (
        <div
          key={shot.src}
          className={`relative aspect-[9/16] flex-1 overflow-hidden rounded-[14px] border border-line-strong bg-bg ${
            shots.length === 3 && i !== 1 ? "mt-8 sm:mt-14" : ""
          }`}
        >
          <Image
            src={shot.src}
            alt=""
            fill
            sizes="(max-width: 640px) 30vw, (max-width: 1024px) 25vw, 180px"
            className="object-cover object-top transition-transform duration-300 ease-brand motion-safe:group-hover:scale-[1.03]"
          />
        </div>
      ))}
    </div>
  );
}

function FeaturedCaseStudyCard({
  study,
  reverse,
}: {
  study: CaseStudy;
  reverse: boolean;
}) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      data-reveal
      className="group grid overflow-hidden rounded-[18px] border border-line bg-surface transition-[translate,scale,border-color,background-color] duration-300 ease-brand hover:border-accent/35 hover:bg-surface-hover motion-safe:hover:-translate-y-1 motion-safe:active:scale-[0.985] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg lg:grid-cols-12"
    >
      <div
        className={`flex items-center border-b border-line bg-bg-2 px-6 pt-8 pb-0 sm:px-10 sm:pt-12 lg:col-span-7 lg:border-b-0 lg:py-12 ${
          reverse ? "lg:order-last lg:border-l" : "lg:border-r"
        }`}
      >
        <div className="w-full [mask-image:linear-gradient(to_bottom,#000_80%,transparent)] lg:[mask-image:none]">
          <PhoneShots study={study} />
        </div>
      </div>

      <div className="flex flex-col p-6 sm:p-10 lg:col-span-5">
        <div className="max-w-[40rem]">
          <p className="eyebrow">Case study · {study.category}</p>
          <h3 className="mt-4 text-title text-fg">{study.client}</h3>
          <p className="mt-3 text-body text-muted">{study.summary}</p>

          <dl className="mt-8 divide-y divide-line border-y border-line">
            {study.highlights.map((h) => (
              <div
                key={h.label}
                className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <dt className="shrink-0 text-sm text-subtle">{h.label}</dt>
                <dd className="text-sm font-medium text-fg sm:text-right">
                  {h.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            <Tags items={study.stack.slice(0, 4)} />
          </div>
        </div>

        <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[15px] font-semibold text-accent transition-colors duration-200 group-hover:text-accent-hover">
          Read case study{" "}
          <span
            aria-hidden="true"
            className="transition-transform duration-300 ease-brand motion-safe:group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  const { links } = project;
  const storeLinks = [
    links.appStore ? { href: links.appStore, label: "App Store" } : null,
    links.playStore ? { href: links.playStore, label: "Google Play" } : null,
    links.live ? { href: links.live, label: "Live site" } : null,
  ].filter((l): l is { href: string; label: string } => l !== null);

  return (
    <article
      data-reveal
      className="flex h-full flex-col rounded-[16px] border border-line bg-surface p-6 transition-[translate,border-color,background-color] duration-300 ease-brand hover:border-accent/30 hover:bg-surface-hover motion-safe:hover:-translate-y-1 sm:p-8"
    >
      {project.subtitle ? (
        <p className="text-label text-subtle">{project.subtitle}</p>
      ) : null}
      <h4 className="mt-2 text-title text-fg">{project.name}</h4>
      <p className="mt-3 text-body text-muted">{project.description}</p>

      <div className="mt-6">
        <Tags items={project.technologies.slice(0, 4)} />
      </div>

      {storeLinks.length > 0 ? (
        <div className="mt-auto pt-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5">
            {storeLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} on ${l.label} (opens in a new tab)`}
                  className="inline-flex min-h-8 items-center gap-1.5 rounded text-sm font-semibold text-fg transition-colors duration-200 ease-brand hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {l.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

export function WorkSection() {
  const featured = featuredCaseStudySlugs
    .map((slug) => caseStudies.find((c) => c.slug === slug))
    .filter((c): c is CaseStudy => Boolean(c));

  const featuredClients = new Set(featured.map((c) => c.client));
  const more = selectedProjectNames
    .map((name) => projects.find((p) => p.name === name))
    .filter((p): p is PortfolioProject => p !== undefined)
    .filter((p) => !featuredClients.has(p.name));

  return (
    <SectionReveal id="work" className="section-y border-t border-line">
      <div className="page-container">
        <SectionHeading
          id="work-heading"
          eyebrow="Selected work"
          title="Apps shipped to real users on iOS and Android."
          action={
            <Link
              href="/case-studies"
              className="group/link inline-flex min-h-10 items-center gap-2 rounded text-sm font-semibold text-muted transition-colors duration-200 ease-brand hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              All case studies{" "}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-brand motion-safe:group-hover/link:translate-x-1"
              >
                →
              </span>
            </Link>
          }
        />

        <div className="mt-12 grid gap-6 lg:mt-16 lg:gap-8">
          {featured.map((study, i) => (
            <FeaturedCaseStudyCard
              key={study.slug}
              study={study}
              reverse={i % 2 === 1}
            />
          ))}
        </div>

        {more.length > 0 ? (
          <div className="mt-16 lg:mt-20">
            <h3
              data-reveal
              className="text-label uppercase tracking-[0.08em] text-subtle"
            >
              More projects
            </h3>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {more.map((p) => (
                <ProjectCard key={p.name} project={p} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </SectionReveal>
  );
}
