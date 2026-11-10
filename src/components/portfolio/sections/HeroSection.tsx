import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/src/components/portfolio/ButtonLink";
import { caseStudies } from "@/src/components/portfolio/content/caseStudies";
import {
  hero,
  personalInfo,
  projects,
  type PortfolioProject,
} from "@/src/components/portfolio/portfolioData";

type LiveApp = {
  name: string;
  icon: string;
  href: string;
  external: boolean;
};

/** Every project with a store link is live. Icons open the case study when there is one. */
function getLiveApps(): LiveApp[] {
  return projects
    .filter(
      (p): p is PortfolioProject & { iconSrc: string } =>
        Boolean(p.iconSrc) && Boolean(p.links.appStore || p.links.playStore),
    )
    .map((p) => {
      const study = caseStudies.find((c) => c.client === p.name);
      return study
        ? {
            name: p.name,
            icon: p.iconSrc,
            href: `/case-studies/${study.slug}`,
            external: false,
          }
        : {
            name: p.name,
            icon: p.iconSrc,
            href: (p.links.appStore ?? p.links.playStore) as string,
            external: true,
          };
    });
}

function AppIconLink({ app }: { app: LiveApp }) {
  const className =
    "group flex items-center gap-3 rounded-full py-1 pr-4 pl-1 transition-colors duration-300 ease-brand hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-fg/70";
  const inner = (
    <>
      <span className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-[12px] ring-1 ring-fg/10 transition-transform duration-300 ease-brand motion-safe:group-hover:scale-105">
        <Image
          src={app.icon}
          alt=""
          fill
          sizes="40px"
          className="object-cover"
          priority
        />
      </span>
      <span className="text-sm font-medium text-fg/90">{app.name}</span>
    </>
  );

  return app.external ? (
    <a
      href={app.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${app.name} on the App Store (opens in a new tab)`}
      className={className}
    >
      {inner}
    </a>
  ) : (
    <Link
      href={app.href}
      aria-label={`${app.name} case study`}
      className={className}
    >
      {inner}
    </Link>
  );
}

/** Soft aurora behind the headline; the only colour on the page. */
const glowStyle = {
  background:
    "radial-gradient(60% 55% at 30% 20%, color-mix(in oklab, var(--glow-a) 32%, transparent) 0%, transparent 70%), radial-gradient(45% 45% at 78% 35%, color-mix(in oklab, var(--glow-b) 18%, transparent) 0%, transparent 70%)",
  maskImage: "linear-gradient(to bottom, #000 55%, transparent 100%)",
  WebkitMaskImage: "linear-gradient(to bottom, #000 55%, transparent 100%)",
} as const;

export function HeroSection() {
  const apps = getLiveApps();

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[720px] opacity-60 blur-3xl"
        style={glowStyle}
      />

      <div className="page-container pt-20 pb-20 sm:pt-28 lg:pt-36 lg:pb-32">
        <p className="rise-in inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-4 pl-3 text-label text-fg/85 backdrop-blur">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inset-0 animate-ping rounded-full bg-live/60 motion-reduce:animate-none" />
            <span className="relative h-2 w-2 rounded-full bg-live" />
          </span>
          {personalInfo.freelanceStatus}
        </p>

        <h1
          id="hero-heading"
          className="rise-in mt-8 max-w-[14ch] text-balance font-display text-display text-fg [animation-delay:80ms]"
        >
          I build and ship React Native apps for iOS and Android.
        </h1>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="rise-in lg:col-span-6 [animation-delay:160ms]">
            <p className="max-w-[34rem] text-lead text-muted">
              {hero.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row">
              <ButtonLink href="#work" variant="primary" size="lg">
                See the work
              </ButtonLink>
              <ButtonLink
                href={`mailto:${personalInfo.email}`}
                variant="secondary"
                size="lg"
              >
                Get in touch
              </ButtonLink>
            </div>
          </div>

          <div className="rise-in lg:col-span-5 lg:col-start-8 [animation-delay:260ms]">
            <h2
              id="live-apps-heading"
              className="eyebrow border-t border-line pt-5"
            >
              Live on the App Store and Google Play
            </h2>
            <ul
              aria-labelledby="live-apps-heading"
              className="-ml-1 mt-3 flex flex-wrap gap-x-1 gap-y-1"
            >
              {apps.map((app) => (
                <li key={app.name}>
                  <AppIconLink app={app} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
