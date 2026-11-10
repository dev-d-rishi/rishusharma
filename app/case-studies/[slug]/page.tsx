import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/src/components/portfolio/ButtonLink";
import { PageShell } from "@/src/components/portfolio/PageShell";
import { Reveal } from "@/src/components/portfolio/SectionReveal";
import { ContentBlocks } from "@/src/components/portfolio/content/ContentBlocks";
import {
  caseStudies,
  getCaseStudy,
} from "@/src/components/portfolio/content/caseStudies";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  const image = study.imageSrc ?? study.screenshots?.[0]?.src;
  return {
    title: `${study.title} | Case Study`,
    description: study.summary,
    openGraph: {
      title: study.title,
      description: study.summary,
      type: "article",
      images: image ? [image] : undefined,
    },
    alternates: { canonical: `/case-studies/${study.slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((c) => c.slug === slug);
  const next = caseStudies[(index + 1) % caseStudies.length];
  const { links } = study;

  return (
    <PageShell>
      <article>
        <header className="pt-12 pb-10 sm:pt-16">
          <div className="mx-auto max-w-4xl px-5 md:px-6">
            <Link
              href="/case-studies"
              className="group inline-flex min-h-11 items-center gap-1.5 rounded text-sm font-semibold text-muted transition-colors duration-200 ease-brand hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-fg/70"
            >
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-brand motion-safe:group-hover:-translate-x-1"
              >
                ←
              </span>
              All case studies
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <p className="eyebrow">{study.category}</p>
              {study.status ? (
                <span className="glass rounded-full px-2.5 py-0.5 text-xs font-medium text-fg">
                  {study.status}
                </span>
              ) : null}
            </div>
            <h1 className="mt-4 font-display text-heading text-fg">
              {study.title}
            </h1>
            <p className="mt-6 text-lead text-fg">
              {study.summary}
            </p>

            <dl className="mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
              <div>
                <dt className="eyebrow">Role</dt>
                <dd className="mt-1 text-sm text-fg">{study.role}</dd>
              </div>
              <div>
                <dt className="eyebrow">Platforms</dt>
                <dd className="mt-1 text-sm text-fg">{study.platforms}</dd>
              </div>
              <div>
                <dt className="eyebrow">Stack</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {study.stack.map((tech) => (
                    <span
                      key={tech}
                      className="glass rounded-full px-2.5 py-1 text-xs font-medium text-fg/90"
                    >
                      {tech}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </header>

        {study.screenshots?.length ? (
          <section
            aria-label={`${study.client} screenshots`}
            className="mt-6 pb-6"
          >
            <div className="mx-auto max-w-6xl">
              <Reveal className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 md:px-6 pb-4 scrollbar-thin">
                {study.screenshots.map((shot, i) => (
                  <figure
                    key={shot.src}
                    data-reveal
                    className="w-[200px] shrink-0 snap-start sm:w-[220px]"
                  >
                    <div className="phone">
                      <div className="phone-screen">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        width={shot.width}
                        height={shot.height}
                        sizes="220px"
                        priority={i < 3}
                        className="h-auto w-full"
                      />
                      </div>
                    </div>
                    <figcaption className="mt-3 text-center text-xs text-muted">
                      {shot.caption}
                    </figcaption>
                  </figure>
                ))}
              </Reveal>
            </div>
          </section>
        ) : study.imageSrc ? (
          <Reveal className="mx-auto mt-10 w-full max-w-4xl px-5 md:px-6">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[14px] border border-line">
              <Image
                src={study.imageSrc}
                alt={`${study.client} screens`}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        ) : null}

        <Reveal className="mx-auto mt-10 grid w-full max-w-4xl gap-4 px-5 md:px-6 sm:grid-cols-3">
          {study.highlights.map((h) => (
            <div
              key={h.label}
              data-reveal
              className="border-t border-line pt-3"
            >
              <p className="eyebrow">{h.label}</p>
              <p className="mt-1 text-[15px] font-medium leading-snug text-fg">{h.value}</p>
            </div>
          ))}
        </Reveal>

        <div className="mx-auto w-full max-w-3xl px-5 md:px-6 py-10 sm:py-14">
          <Reveal>
            <ContentBlocks blocks={study.body} />
          </Reveal>

          {links.appStore || links.playStore || links.live ? (
            <div className="mt-12 flex flex-wrap gap-3 border-t border-line pt-8">
              {links.live ? (
                <ButtonLink href={links.live} variant="primary" target="_blank">
                  Visit live site
                </ButtonLink>
              ) : null}
              {links.appStore ? (
                <ButtonLink href={links.appStore} target="_blank">
                  App Store
                </ButtonLink>
              ) : null}
              {links.playStore ? (
                <ButtonLink href={links.playStore} target="_blank">
                  Play Store
                </ButtonLink>
              ) : null}
            </div>
          ) : null}
        </div>
      </article>

      {next && next.slug !== study.slug ? (
        <section className="border-t border-line py-12">
          <Reveal className="mx-auto max-w-3xl px-5 md:px-6">
            <p className="eyebrow">Next case study</p>
            <Link
              href={`/case-studies/${next.slug}`}
              className="group mt-2 block rounded font-display text-title text-fg transition-colors duration-200 hover:text-fg/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-fg sm:text-2xl"
            >
              {next.title}
            </Link>
          </Reveal>
        </section>
      ) : null}
    </PageShell>
  );
}
