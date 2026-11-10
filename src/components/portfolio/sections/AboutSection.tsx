import { SectionReveal } from "@/src/components/portfolio/SectionReveal";
import {
  aboutIntro,
  experience,
  projects,
} from "@/src/components/portfolio/portfolioData";

export function AboutSection() {
  const [opening, ...rest] = aboutIntro;
  const liveApps = projects.filter(
    (p) => p.links.appStore || p.links.playStore,
  ).length;

  const facts = [
    { value: "3+ years", label: "Building with React Native" },
    {
      value: `${liveApps} apps`,
      label: "Live on the App Store and Google Play",
    },
    {
      value: experience.company,
      label: `${experience.role} since ${experience.duration.split(" –")[0]}`,
    },
  ];

  return (
    <SectionReveal
      id="about"
      aria-labelledby="about-heading"
      className="section-y border-t border-line"
    >
      <div className="page-container grid gap-10 lg:grid-cols-12 lg:gap-8">
        <h2
          id="about-heading"
          data-reveal
          className="font-display text-heading text-fg lg:col-span-4"
        >
          Hi, I&apos;m Rishu.
        </h2>

        <div data-reveal className="lg:col-span-7 lg:col-start-6">
          <p className="max-w-[38rem] text-pretty font-display text-[clamp(1.375rem,1.15rem+0.9vw,1.875rem)] font-[450] leading-[1.35] tracking-[-0.02em] text-fg">
            {opening}
          </p>
          {rest.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="mt-6 max-w-[38rem] text-lead text-muted"
            >
              {paragraph}
            </p>
          ))}

          <dl className="mt-14 grid gap-6 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label} className="border-t border-line pt-4">
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="block font-display text-title text-fg">
                    {f.value}
                  </span>
                  <span className="mt-1.5 block text-sm leading-snug text-subtle">
                    {f.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </SectionReveal>
  );
}
