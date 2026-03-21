"use client";

import { useEffect, useState } from "react";

export function SiteNavbar() {
  const links = [
    { href: "#home", label: "Home" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 10);
        rafId = null;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-300 backdrop-blur supports-[backdrop-filter]:bg-black/50 ${
        scrolled
          ? "border-white/15 bg-black/85"
          : "border-white/10 bg-black/60"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a
          href="#home"
          className="text-sm font-semibold tracking-tight text-zinc-50 opacity-95"
          aria-label="Go to Home"
        >
          Rishu Sharma
        </a>

        <div className="flex items-center gap-5 overflow-x-auto">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm text-zinc-300 transition-opacity duration-300 hover:text-white ${
                scrolled ? "opacity-100" : "opacity-80"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

