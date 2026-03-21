"use client";

import { PropsWithChildren, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SectionRevealProps = PropsWithChildren<{
  id?: string;
  className?: string;
  y?: number;
  duration?: number;
}>;

export function SectionReveal({
  id,
  className,
  children,
  y = 40,
  duration = 0.8,
}: SectionRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const isSmall = window.matchMedia("(max-width: 640px)").matches;
    const yFrom = isSmall ? 28 : y;
    const durationUsed = isSmall ? 0.75 : duration;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: yFrom },
        {
          opacity: 1,
          y: 0,
          duration: durationUsed,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [duration, y]);

  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}

