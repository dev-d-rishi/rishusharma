import { ButtonLink } from "@/src/components/portfolio/ButtonLink";
import { hero, personalInfo } from "@/src/components/portfolio/portfolioData";

/** Faint blueprint grid behind the hero, faded out with a radial mask. */
const gridStyle = {
  backgroundImage:
    "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
  backgroundSize: "56px 56px",
  maskImage:
    "radial-gradient(ellipse 70% 60% at 80% 20%, #000 0%, transparent 70%)",
  WebkitMaskImage:
    "radial-gradient(ellipse 70% 60% at 80% 20%, #000 0%, transparent 70%)",
} as const;

export function HeroSection() {
  const { headline, headlineAccent } = hero;
  const lead = headline.endsWith(headlineAccent)
    ? headline.slice(0, -headlineAccent.length)
    : headline;
  const accent = headline.endsWith(headlineAccent) ? headlineAccent : "";

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="fade-in pointer-events-none absolute inset-0 -z-10 opacity-60 [animation-delay:200ms]"
        style={gridStyle}
      />

      <div className="page-container pb-16 pt-16 sm:pt-24 lg:pb-24 lg:pt-32">
        <p className="rise-in inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 py-1.5 pl-3 pr-3.5 text-label text-accent">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inset-0 rounded-full bg-accent/40 ring-4 ring-accent/15" />
            <span className="relative h-2 w-2 rounded-full bg-accent" />
          </span>
          {personalInfo.freelanceStatus}
        </p>

        <h1
          id="hero-heading"
          className="rise-in mt-8 max-w-[20ch] text-balance text-display text-fg [animation-delay:80ms]"
        >
          {lead}
          {accent ? <span className="text-accent">{accent}</span> : null}
        </h1>

        <p className="rise-in mt-6 max-w-[38rem] text-lead text-muted [animation-delay:170ms] sm:mt-8">
          {hero.description}
        </p>

        <div className="rise-in mt-10 flex flex-col gap-3 [animation-delay:260ms] min-[480px]:flex-row">
          <ButtonLink href="#work" variant="primary" size="lg">
            Explore my work
            <span
              aria-hidden="true"
              className="transition-transform duration-200 ease-brand motion-safe:group-hover/btn:translate-x-0.5"
            >
              →
            </span>
          </ButtonLink>
          <ButtonLink href="#contact" variant="secondary" size="lg">
            Let&apos;s talk
          </ButtonLink>
        </div>

        <div className="fade-in mt-16 flex flex-col gap-2 border-t [animation-delay:380ms] border-line pt-6 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between lg:mt-24">
          <p>
            <span className="font-medium text-fg">{personalInfo.name}</span>
            <span aria-hidden="true"> — </span>
            <span className="sr-only">, </span>
            {personalInfo.descriptor}
          </p>
          <p>
            {personalInfo.specialization}{" "}
            <span className="whitespace-nowrap">· iOS &amp; Android</span>
          </p>
        </div>
      </div>
    </section>
  );
}
