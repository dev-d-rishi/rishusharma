import type { Metadata } from "next";
import { PageHeader, PageShell } from "@/src/components/portfolio/PageShell";
import { Reveal } from "@/src/components/portfolio/SectionReveal";
import { CaseStudyCard } from "@/src/components/portfolio/content/Cards";
import { caseStudies } from "@/src/components/portfolio/content/caseStudies";

export const metadata: Metadata = {
  title: "Case Studies | Rishu Sharma",
  description:
    "In-depth case studies of React Native apps built and shipped by Rishu Sharma — fintech and consumer mobile products.",
};

export default function CaseStudiesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Case Studies"
        title="How the apps were built"
        description="The problems, constraints, and engineering decisions behind production React Native apps for fintech and consumer products."
      />
      <section className="py-14">
        <Reveal className="page-container grid gap-6 md:grid-cols-2">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </Reveal>
      </section>
    </PageShell>
  );
}
