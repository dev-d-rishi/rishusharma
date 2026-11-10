import { ButtonLink } from "@/src/components/portfolio/ButtonLink";
import { SectionReveal } from "@/src/components/portfolio/SectionReveal";
import { personalInfo } from "@/src/components/portfolio/portfolioData";

type ContactLink = { href: string; label: string; external: boolean };

export function ContactSection() {
  const links: ContactLink[] = [
    { href: `mailto:${personalInfo.email}`, label: personalInfo.email, external: false },
  ];
  if (personalInfo.linkedin) {
    links.push({ href: personalInfo.linkedin, label: "LinkedIn", external: true });
  }
  if (personalInfo.github) {
    links.push({ href: personalInfo.github, label: "GitHub", external: true });
  }

  return (
    <SectionReveal
      id="contact"
      aria-labelledby="contact-heading"
      className="section-y border-t border-line"
    >
      <div className="page-container">
        <div
          data-reveal
          className="glass relative isolate overflow-hidden rounded-[32px] px-6 py-14 sm:px-12 sm:py-20 lg:px-20 lg:py-28"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 right-0 -z-10 h-[520px] w-[520px] rounded-full opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, color-mix(in oklab, var(--glow-a) 35%, transparent), transparent)",
            }}
          />

          <div className="mx-auto max-w-[44rem] text-center">
            <h2
              id="contact-heading"
              className="text-balance font-display text-[clamp(2rem,1.4rem+2.6vw,3.75rem)] font-[500] leading-[1.02] tracking-[-0.035em] text-fg"
            >
              Have a mobile app idea or an existing app that needs attention?
            </h2>
            <p className="mx-auto mt-6 max-w-[30rem] text-lead text-muted">
              Tell me what you&apos;re building or what&apos;s getting in the
              way. I&apos;ll get back to you by email.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink
                href={`mailto:${personalInfo.email}`}
                variant="primary"
                size="lg"
              >
                Start a conversation
              </ButtonLink>
            </div>

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noopener noreferrer" : undefined}
                    aria-label={
                      l.external ? `${l.label} (opens in a new tab)` : undefined
                    }
                    className="inline-flex min-h-11 items-center rounded font-medium text-muted underline decoration-line-strong underline-offset-[5px] transition-colors duration-200 hover:text-fg hover:decoration-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-fg/70"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
