"use client";

import { SectionReveal } from "@/src/components/portfolio/SectionReveal";
import { ButtonLink } from "@/src/components/portfolio/ButtonLink";

const email = "dev.d.rishi.7@gmail.com";

export function ContactSection() {
  return (
    <SectionReveal
      id="contact"
      className="border-t border-white/5 py-16"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
        <p className="mt-2 text-sm text-zinc-300">Open to opportunities in Dubai</p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-zinc-200">Email</p>
          <a
            href={`mailto:${email}`}
            className="mt-2 block text-lg font-medium text-white underline decoration-white/20 underline-offset-4 transition-colors hover:decoration-white/60"
          >
            {email}
          </a>

          <div className="mt-6">
            <ButtonLink
              href={`mailto:${email}`}
              variant="primary"
            >
              Send Email
            </ButtonLink>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

