"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ButtonLink } from "@/src/components/portfolio/ButtonLink";

export function HeroSection() {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const nodes = el.querySelectorAll<HTMLElement>("[data-hero]");
    gsap.from(nodes, {
      opacity: 0,
      y: 16,
      duration: 0.85,
      ease: "power3.out",
      stagger: 0.08,
    });

    const titleEl = nameRef.current;
    if (titleEl) {
      const isSmall = window.matchMedia("(max-width: 640px)").matches;
      const floatY = isSmall ? -4 : -6;
      const floatDuration = isSmall ? 3.2 : 3.8;

      // Start after the entrance animation so they don't fight over transform.
      gsap.delayedCall(1.05, () => {
        gsap.to(titleEl, {
          y: floatY,
          duration: floatDuration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          overwrite: "auto",
        });
      });
    }
  }, []);

  return (
    <section id="home" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(56,189,248,0.14),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 pt-24 pb-20">
        <div ref={contentRef} className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3" data-hero>
              <span className="h-2 w-2 rounded-full bg-sky-400/90 shadow-[0_0_20px_rgba(56,189,248,0.55)]" />
              <p className="text-sm text-zinc-300">Premium React Native Engineering</p>
            </div>

            <h1
              className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
              data-hero
            >
              <span
                ref={nameRef}
                className="bg-gradient-to-r from-sky-300/90 via-fuchsia-300/35 to-sky-300/90 bg-clip-text text-transparent"
              >
                Rishu Sharma
              </span>
            </h1>
            <p className="mt-2 text-xl text-zinc-200" data-hero>
              React Native Developer
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-300" data-hero>
              I build high-performance mobile apps with clean UI and scalable architecture.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-hero>
              <ButtonLink href="#projects" variant="primary">
                View Projects
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary">
                Contact Me
              </ButtonLink>
            </div>
          </div>

          <div className="md:col-span-5">
            <div
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
              data-hero
            >
              <p className="text-sm font-medium text-zinc-200">
                Focus
              </p>
              <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400/90" />
                  Performance + UX
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400/90" />
                  Scalable architecture
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400/90" />
                  Clean UI systems
                </li>
              </ul>
            </div>
            <p className="mt-4 text-xs text-zinc-500">
              Scroll for skills, experience, and selected projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

