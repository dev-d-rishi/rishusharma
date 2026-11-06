import Image from "next/image";
import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";
import { ButtonLink } from "@/src/components/portfolio/ButtonLink";
import { SectionReveal } from "@/src/components/portfolio/SectionReveal";
import { personalInfo } from "@/src/components/portfolio/portfolioData";

type ContactLink = {
  href: string;
  label: string;
  value: string;
  icon: IconType;
  external: boolean;
};

export function ContactSection() {
  const contactLinks: ContactLink[] = [
    {
      href: `mailto:${personalInfo.email}`,
      label: "Email",
      value: personalInfo.email,
      icon: LuMail,
      external: false,
    },
  ];
  if (personalInfo.linkedin) {
    contactLinks.push({
      href: personalInfo.linkedin,
      label: "LinkedIn",
      value: personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, ""),
      icon: FaLinkedin,
      external: true,
    });
  }
  if (personalInfo.github) {
    contactLinks.push({
      href: personalInfo.github,
      label: "GitHub",
      value: personalInfo.github.replace(/^https?:\/\/(www\.)?/, ""),
      icon: FaGithub,
      external: true,
    });
  }

  const cols = {
    1: "sm:max-w-md",
    2: "sm:grid-cols-2 lg:max-w-2xl",
    3: "sm:grid-cols-3 lg:max-w-3xl",
  }[contactLinks.length];

  return (
    <SectionReveal id="contact" className="section-y border-t border-line">
      <div className="page-container">
        <div
          data-reveal
          className="relative isolate overflow-hidden rounded-[18px] border border-line bg-surface px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20"
        >
          {/* Subtle emerald glow + monogram watermark echoing the logo. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-40 -z-10 h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl"
          />
          <Image
            src="/brand/r-monogram.png"
            alt=""
            aria-hidden="true"
            width={360}
            height={360}
            className="pointer-events-none absolute -bottom-10 right-6 -z-10 hidden w-[340px] opacity-40 mix-blend-lighten lg:block"
          />

          <div className="max-w-3xl">
            <p className="eyebrow">Contact</p>
            <h2
              id="contact-heading"
              className="mt-4 text-balance text-heading text-fg lg:text-[3rem]"
            >
              Have a mobile app idea or an existing app that needs attention?
            </h2>
            <p className="mt-6 max-w-[36rem] text-lead text-muted">
              Tell me what you&apos;re building or what&apos;s getting in the
              way. I&apos;ll get back to you by email.
            </p>

            <div className="mt-10">
              <ButtonLink
                href={`mailto:${personalInfo.email}`}
                variant="primary"
                size="lg"
                glow
              >
                Let&apos;s talk
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-brand motion-safe:group-hover/btn:translate-x-0.5"
                >
                  →
                </span>
              </ButtonLink>
            </div>
          </div>

          <ul
            className={`mt-12 grid gap-px overflow-hidden rounded-[12px] border border-line bg-line lg:mt-16 ${cols}`}
          >
            {contactLinks.map(
              ({ href, label, value, icon: Icon, external }) => (
                <li key={label} className="bg-bg-2">
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={
                      external ? `${label} (opens in a new tab)` : undefined
                    }
                    className="group flex h-full min-h-16 items-center gap-3 px-5 py-4 transition-colors duration-200 ease-brand hover:bg-surface-hover active:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                  >
                    <Icon
                      size={18}
                      aria-hidden="true"
                      className="shrink-0 text-subtle transition-[color,translate] duration-300 ease-brand group-hover:text-accent motion-safe:group-hover:-translate-y-0.5"
                    />
                    <span className="min-w-0">
                      <span className="block text-xs font-medium text-subtle">
                        {label}
                      </span>
                      <span className="block truncate text-sm font-medium text-fg">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </SectionReveal>
  );
}
