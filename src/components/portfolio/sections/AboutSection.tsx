import { SectionReveal } from "@/src/components/portfolio/SectionReveal";
import { aboutIntro, projects } from "@/src/components/portfolio/portfolioData";

export function AboutSection() {
  const [opening, ...rest] = aboutIntro;
  const liveApps = projects.filter(
    (p) => p.links.appStore || p.links.playStore,
  ).length;

  const facts = [
    { value: "4+ years", label: "Building with React Native" },
    { value: `${liveApps} apps`, label: "Live on the App Store & Google Play" },
    { value: "iOS & Android", label: "Native SDKs, integrations & releases" },
  ];

  return (
    <SectionReveal id="about" className="section-y border-t border-line">
      <div className="page-container grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div data-reveal className="lg:col-span-4">
          <p className="eyebrow">About</p>
          <h2 id="about-heading" className="mt-4 text-heading text-fg">
            Hi, I&apos;m Rishu.
          </h2>
        </div>

        <div data-reveal className="lg:col-span-8">
          <p className="max-w-[40rem] text-balance text-[clamp(1.25rem,1.1rem+0.6vw,1.5rem)] leading-[1.5] tracking-[-0.01em] text-fg">
            {opening}
          </p>
          {rest.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="mt-6 max-w-[40rem] text-lead text-muted"
            >
              {paragraph}
            </p>
          ))}

          <ul className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
            {facts.map((f) => (
              <li key={f.value}>
                <span className="block text-title text-fg">{f.value}</span>
                <span className="mt-1 block text-sm text-subtle">
                  {f.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionReveal>
  );
}
