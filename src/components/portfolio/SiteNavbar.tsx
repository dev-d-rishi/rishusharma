"use client";

import { useEffect, useRef, useState } from "react";

export function SiteNavbar() {
  const links = [
    { href: "#home", label: "Home" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

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

  useEffect(() => {
    if (!open) return;

    const onDocClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        btnRef.current &&
        !btnRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    const onScrollClose = () => setOpen(false);

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick);
    window.addEventListener("scroll", onScrollClose, { passive: true });

    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
      window.removeEventListener("scroll", onScrollClose);
    };
  }, [open]);

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-300 backdrop-blur-md ${
        scrolled
          ? "border-[#2C5F7C]/25 bg-[#F5EFE6]/85"
          : "border-[#2C5F7C]/15 bg-[#F5EFE6]/70"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a
          href="#home"
          className="text-sm font-semibold tracking-tight text-[#1E3A5F] opacity-95"
          aria-label="Go to Home"
        >
          Rishu Sharma
        </a>

        <div className="hidden md:flex items-center gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm text-[#4A5568] transition-colors duration-300 hover:text-[#1E3A5F] ${
                scrolled ? "opacity-100" : "opacity-85"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>
        <button
          ref={btnRef}
          className="md:hidden text-[#1E3A5F]"
          aria-label="Toggle Menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>
      {open && (
        <div
          ref={menuRef}
          className="md:hidden fixed top-0 left-0 w-full z-50 px-4 pt-16 pb-6 flex flex-col gap-4 bg-[#F5EFE6]/95 backdrop-blur-md border-b border-[#2C5F7C]/20 shadow-sm animate-menu-down"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base text-[#1E3A5F] py-2"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
