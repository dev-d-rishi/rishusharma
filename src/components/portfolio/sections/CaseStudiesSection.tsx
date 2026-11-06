import Link from "next/link";
import { SectionReveal } from "@/src/components/portfolio/SectionReveal";
import { CaseStudyCard } from "@/src/components/portfolio/content/Cards";
import { caseStudies } from "@/src/components/portfolio/content/caseStudies";

export function CaseStudiesSection() {
  return (
    <SectionReveal
      id="case-studies"
      className="border-t border-[#2C5F7C]/15 py-16"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[#1A1A1A]">
              Case Studies
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#4A5568]">
              A closer look at the problems, decisions, and trade-offs behind
              some of the apps I&apos;ve shipped.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="text-sm font-medium text-[#1E3A5F] hover:underline"
          >
            View all →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {caseStudies.slice(0, 3).map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
