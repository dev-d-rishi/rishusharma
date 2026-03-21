"use client";

import { SectionReveal } from "@/src/components/portfolio/SectionReveal";
import { ButtonLink } from "@/src/components/portfolio/ButtonLink";

const email = "dev.d.rishi.7@gmail.com";

export function ContactSection() {
  return (
    <SectionReveal
      id="contact"
      className="border-t border-[#2C5F7C]/15 py-16"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-semibold tracking-tight text-[#1A1A1A]">Contact</h2>
        <p className="mt-2 text-sm text-[#4A5568]">Open to opportunities in Dubai</p>

        <div className="mt-8 rounded-xl border border-[#2C5F7C]/20 bg-white/70 p-6 shadow-sm">
          <p className="text-sm text-[#4A5568]">Email</p>
          <a
            href={`mailto:${email}`}
            className="mt-2 block text-lg font-medium text-[#1E3A5F] underline decoration-[#6FA3C8]/40 underline-offset-4 transition-colors hover:decoration-[#1E3A5F]"
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

