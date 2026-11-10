"use client";

import {
  type ElementType,
  type PropsWithChildren,
  useEffect,
  useRef,
} from "react";

/**
 * Lifts every `data-reveal` child into view once, as it scrolls in.
 * Content is server-rendered visible; the `js-reveal` class on <html>
 * switches the hidden state on only after hydration, and elements already
 * on screen are marked in immediately so nothing flashes.
 */
function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (targets.length === 0) return;

    document.documentElement.classList.add("js-reveal");

    const fold = window.innerHeight;
    const pending: HTMLElement[] = [];
    for (const el of targets) {
      if (el.getBoundingClientRect().top < fold) el.classList.add("is-in");
      else pending.push(el);
    }
    if (pending.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    pending.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ref]);
}

type RevealProps = PropsWithChildren<{
  id?: string;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}>;

export function SectionReveal({ children, ...props }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);
  return (
    <section ref={ref} {...props}>
      {children}
    </section>
  );
}

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
