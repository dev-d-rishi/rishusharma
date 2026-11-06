"use client";

import {
  type ElementType,
  type PropsWithChildren,
  type RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, CustomEase);

/** Same curve as the CSS `--ease-brand` token: cubic-bezier(0.22, 1, 0.36, 1). */
export const BRAND_EASE = CustomEase.create("brand", "0.22,1,0.36,1");

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Scroll reveal for everything marked `data-reveal` inside `ref`
 * (or `ref` itself when nothing is marked).
 *
 * Content is server-rendered visible. After hydration, and only when the
 * user has not asked for reduced motion, elements that are still below the
 * fold are hidden and then revealed once — in small staggered batches — as
 * they enter the viewport. Elements already on screen are never touched, so
 * there is no flash, no hydration mismatch and no layout shift (opacity and
 * transform only).
 */
function useReveal(ref: RefObject<HTMLElement | null>) {
  useIsomorphicLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const marked = root.querySelectorAll<HTMLElement>("[data-reveal]");
      const all = marked.length > 0 ? Array.from(marked) : [root];
      const fold = window.innerHeight * 0.95;
      const targets = all.filter((el) => el.getBoundingClientRect().top > fold);
      if (targets.length === 0) return;

      gsap.set(targets, { autoAlpha: 0, y: 16 });
      ScrollTrigger.batch(targets, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: BRAND_EASE,
            stagger: 0.09,
            overwrite: true,
            clearProps: "transform,opacity,visibility",
          }),
      });
    });

    return () => mm.revert();
  }, [ref]);
}

type RevealProps = PropsWithChildren<{
  id?: string;
  className?: string;
  "aria-label"?: string;
}>;

/** A `<section>` whose `data-reveal` children reveal on scroll. */
export function SectionReveal({ children, ...props }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);
  return (
    <section ref={ref} {...props}>
      {children}
    </section>
  );
}

/** Generic reveal wrapper (div by default) for use inside server pages. */
export function Reveal({
  as: Tag = "div",
  children,
  ...props
}: RevealProps & { as?: ElementType }) {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);
  return (
    <Tag ref={ref} {...props}>
      {children}
    </Tag>
  );
}
