"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ButtonLink } from "@/src/components/portfolio/ButtonLink";
import { WavePattern } from "@/src/components/portfolio/WavePattern";
import Image from "next/image";

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
      y: 12,
      duration: 0.75,
      ease: "power2.out",
      stagger: 0.06,
    });

    const titleEl = nameRef.current;
    if (titleEl) {
      const isSmall = window.matchMedia("(max-width: 640px)").matches;
      const floatY = isSmall ? -2 : -3;
      const floatDuration = isSmall ? 4 : 4.5;

      gsap.delayedCall(1, () => {
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
      <div className="relative mx-auto max-w-6xl px-4 pt-24 pb-20">
        <div
          ref={contentRef}
          className="grid gap-10 md:grid-cols-12 md:items-center"
        >
          <div className="md:col-span-7">
            <div className="flex items-center gap-3" data-hero>
              <span className="h-2 w-2 rounded-full bg-[#6FA3C8]" />
              <p className="text-sm text-[#4A5568]">
                Premium React Native Engineering
              </p>
            </div>

            <h1
              className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
              data-hero
            >
              <span
                ref={nameRef}
                className="inline-block bg-gradient-to-r from-[#1E3A5F] via-[#2C5F7C] to-[#6FA3C8] bg-clip-text text-transparent"
              >
                Rishu Sharma
              </span>
              {/* Brush-like underline effect */}
              <span className="mt-1 block h-0.5 w-24 rounded-full bg-gradient-to-r from-[#1E3A5F]/60 to-[#6FA3C8]/40" />
            </h1>
            <p className="mt-3 text-xl text-[#1A1A1A]" data-hero>
              React Native Developer
            </p>
            <p
              className="mt-4 max-w-xl text-base leading-relaxed text-[#4A5568]"
              data-hero
            >
              I build high-performance mobile apps with clean UI and scalable
              architecture.
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
            <div className="relative mb-6 overflow-hidden rounded-2xl border border-[#2C5F7C]/20">
              <Image
                src="/assets/images/Tsunami.jpg"
                alt="Great Wave"
                width={600}
                height={400}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div
              className="rounded-2xl border border-[#2C5F7C]/20 bg-white/60 p-6 shadow-sm"
              data-hero
            >
              <p className="text-sm font-medium text-[#1E3A5F]">Focus</p>
              <ul className="mt-4 space-y-3 text-sm text-[#4A5568]">
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6FA3C8]" />
                  Performance + UX
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6FA3C8]" />
                  Scalable architecture
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#6FA3C8]" />
                  Clean UI systems
                </li>
              </ul>
            </div>
            <p className="mt-4 text-xs text-[#4A5568]/80">
              Scroll for skills, experience, and selected projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
