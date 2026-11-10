import Image from "next/image";
import Link from "next/link";
import { SectionReveal } from "@/src/components/portfolio/SectionReveal";
import { caseStudies } from "@/src/components/portfolio/content/caseStudies";
import type { CaseStudy } from "@/src/components/portfolio/content/types";
import {
  featuredCaseStudySlugs,
  projects,
  selectedProjectNames,
  type PortfolioProject,
} from "@/src/components/portfolio/portfolioData";

type StoreLink = { href: string; label: string };

function storeLinksFor(links: PortfolioProject["links"]): StoreLink[] {
  return [
    links.appStore ? { href: links.appStore, label: "App Store" } : null,
    links.playStore ? { href: links.playStore, label: "Google Play" } : null,
    links.live ? { href: links.live, label: "Live site" } : null,
  ].filter((l): l is StoreLink => l !== null);
}

function StoreLinks({ name, links }: { name: string; links: StoreLink[] }) {
  if (links.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on ${l.label} (opens in a new tab)`}
            className="glass inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-fg/90 transition-colors duration-300 ease-brand hover:bg-surface-hover hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-fg/70"
          >
            {l.label}
            <span aria-hidden="true" className="text-subtle">
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function AppIcon({ src, size }: { src?: string; size: "md" | "lg" }) {
  if (!src) return null;
  const dims =
    size === "lg"
      ? "h-14 w-14 rounded-[16px] lg:h-16 lg:w-16 lg:rounded-[18px]"
      : "h-11 w-11 rounded-[13px]";
  return (
    <span
      className={`relative block shrink-0 overflow-hidden ring-1 ring-fg/10 ${dims}`}
    >
      <Image src={src} alt="" fill sizes="64px" className="object-cover" />
    </span>
  );
}

/** Three phone screens, fanned with a slight tilt, on a soft glow. */
function ScreenFan({ study, reverse }: { study: CaseStudy; reverse: boolean }) {
  const shots = study.screenshots?.slice(0, 3) ?? [];
  if (shots.length === 0) return null;

  const pose = [
    "z-10 mt-12 -rotate-[5deg] lg:mt-20",
    "z-20 mt-0 scale-[1.04]",
    "z-10 mt-16 rotate-[5deg] lg:mt-28",
  ];

  return (
    <div
      aria-hidden="true"
      className={`relative ${reverse ? "lg:-ml-[6vw]" : "lg:-mr-[6vw]"}`}
    >
      <div className="pointer-events-none absolute inset-x-[10%] top-[20%] -z-10 h-[60%] rounded-full bg-fg/[0.06] blur-3xl" />
      <div className="flex items-start justify-center gap-0 sm:gap-2 lg:gap-3">
        {shots.map((shot, i) => (
          <div
            key={shot.src}
            className={`phone w-[36%] shrink-0 transition-transform duration-500 ease-brand lg:w-[min(15rem,32%)] ${pose[i]}`}
          >
            <div className="phone-screen relative aspect-[9/19]">
              <Image
                src={shot.src}
                alt=""
                fill
                sizes="(max-width: 1024px) 36vw, 240px"
                className="object-cover object-top"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CaseStudySpread({
  study,
  project,
  reverse,
}: {
  study: CaseStudy;
  project?: PortfolioProject;
  reverse: boolean;
}) {
  const links = storeLinksFor(study.links);

  return (
    <article
      aria-labelledby={`${study.slug}-title`}
      className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10"
    >
      <div
        data-reveal
        className={`lg:col-span-5 ${
          reverse ? "lg:order-last lg:col-start-8" : ""
        }`}
      >
        <div className="flex items-center gap-4">
          <AppIcon src={project?.iconSrc} size="lg" />
          <div>
            <h3
              id={`${study.slug}-title`}
              className="font-display text-[clamp(1.75rem,1.3rem+1.9vw,2.75rem)] font-[500] leading-[1] tracking-[-0.035em] text-fg"
            >
              {study.client}
            </h3>
            <p className="mt-1.5 text-label text-subtle">{study.category}</p>
          </div>
        </div>

        <p className="mt-8 text-lead text-muted">{study.summary}</p>

        <dl className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {study.highlights.map((h) => (
            <div key={h.label} className="border-t border-line pt-3">
              <dt className="text-label text-subtle">{h.label}</dt>
              <dd className="mt-1 text-[15px] font-medium leading-snug text-fg">
                {h.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-sm leading-relaxed text-subtle">
          {study.stack.slice(0, 6).join(" · ")}
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <Link
            href={`/case-studies/${study.slug}`}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-bg transition-colors duration-200 ease-brand hover:bg-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-fg/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            Read the case study
          </Link>
          <StoreLinks name={study.client} links={links} />
        </div>
      </div>

      <div
        data-reveal
        className={`lg:col-span-7 ${
          reverse ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-6"
        }`}
      >
        <ScreenFan study={study} reverse={reverse} />
      </div>
    </article>
  );
}

function MoreApp({ project }: { project: PortfolioProject }) {
  return (
    <article
      data-reveal
      aria-labelledby={`${slugify(project.name)}-title`}
      className="glass flex flex-col rounded-[24px] p-6 sm:p-8"
    >
      <div className="flex items-center gap-4">
        <AppIcon src={project.iconSrc} size="md" />
        <div>
          <h4
            id={`${slugify(project.name)}-title`}
            className="font-display text-title text-fg"
          >
            {project.name}
          </h4>
          {project.subtitle ? (
            <p className="mt-0.5 text-label text-subtle">{project.subtitle}</p>
          ) : null}
        </div>
      </div>
      <p className="mt-5 text-body text-muted">{project.description}</p>
      <p className="mt-4 text-sm text-subtle">
        {project.technologies.join(" · ")}
      </p>
      <div className="mt-auto pt-6">
        <StoreLinks name={project.name} links={storeLinksFor(project.links)} />
      </div>
    </article>
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
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

  const liveCount = projects.filter(
    (p) => p.links.appStore || p.links.playStore,
  ).length;

  return (
    <SectionReveal
      id="work"
      aria-labelledby="work-heading"
      className="section-y overflow-hidden border-t border-line"
    >
      <div className="page-container">
        <div data-reveal className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <h2
            id="work-heading"
            className="max-w-[16ch] font-display text-heading text-fg lg:col-span-7"
          >
            {liveCount} apps in the App Store and Google Play.
          </h2>
          <p className="max-w-[28rem] text-lead text-muted lg:col-span-4 lg:col-start-9 lg:self-end">
            Two of them documented start to finish: the problem, the native
            work, and what it took to get through review.
          </p>
        </div>

        <div className="mt-20 flex flex-col gap-28 lg:mt-28 lg:gap-40">
          {featured.map((study, i) => (
            <CaseStudySpread
              key={study.slug}
              study={study}
              project={projects.find((p) => p.name === study.client)}
              reverse={i % 2 === 1}
            />
          ))}
        </div>

        {more.length > 0 ? (
          <div className="mt-28 lg:mt-40">
            <div
              data-reveal
              className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <h3 className="font-display text-title text-fg">Also shipped</h3>
              <Link
                href="/case-studies"
                className="inline-flex min-h-11 items-center rounded text-sm font-medium text-muted transition-colors duration-200 hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-fg/70"
              >
                All case studies
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:gap-6">
              {more.map((p) => (
                <MoreApp key={p.name} project={p} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </SectionReveal>
  );
}
