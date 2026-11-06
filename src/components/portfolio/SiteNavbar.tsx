"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { BrandMark } from "@/src/components/portfolio/BrandMark";

const links = [
  { href: "/#work", id: "work", label: "Work" },
  { href: "/#services", id: "services", label: "Services" },
  { href: "/#about", id: "about", label: "About" },
] as const;
const contactLink = { href: "/#contact", label: "Contact" };

/** Homepage sections tracked by the scroll spy (hero and contact clear it). */
const spySections = ["home", "work", "services", "about", "contact"];

/** Which homepage section currently crosses the middle of the viewport. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const els = spySections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A thin band across the middle of the viewport.
      { rootMargin: "-45% 0px -54% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export function SiteNavbar() {
  const pathname = usePathname();
  const activeSection = useActiveSection(pathname === "/");
  // "Work" also covers the case study pages.
  const activeId = pathname.startsWith("/case-studies")
    ? "work"
    : links.some((l) => l.id === activeSection)
      ? activeSection
      : null;

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(
    null,
  );

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

  // Position the sliding underline under the active link (transform only).
  const measure = useCallback(() => {
    const el = activeId ? linkRefs.current[activeId] : null;
    const list = listRef.current;
    if (!el || !list) return;
    setIndicator({ x: el.offsetLeft, w: el.offsetWidth });
  }, [activeId]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Close the menu after navigating (including back/forward).
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  const closeMenu = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) btnRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    // Lock background scrolling while the menu is open.
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    // Move focus into the menu.
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (
        menuRef.current?.contains(target) ||
        btnRef.current?.contains(target)
      ) {
        return;
      }
      closeMenu();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu(true);
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) closeMenu();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      root.style.overflow = prevOverflow;
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open, closeMenu]);

  const currentFor = (id: string) =>
    activeId === id
      ? pathname.startsWith("/case-studies")
        ? ("page" as const)
        : ("true" as const)
      : undefined;

  return (
    <nav
      aria-label="Primary"
      className={`sticky top-0 z-50 border-b border-line transition-colors duration-300 ease-brand ${
        scrolled || open ? "bg-bg/95 backdrop-blur" : "bg-bg"
      }`}
    >
      <div className="page-container flex h-[72px] items-center justify-between gap-4">
        <Link
          href="/"
          className="-ml-1 flex items-center gap-3 rounded-lg p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Rishu Sharma — home"
        >
          <BrandMark size={36} />
          <span className="text-[15px] font-semibold tracking-tight text-fg">
            Rishu Sharma
          </span>
        </Link>

        <div className="flex items-center gap-2 md:gap-8">
          <ul
            ref={listRef}
            className="relative hidden items-center gap-8 md:flex"
          >
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  ref={(el) => {
                    linkRefs.current[l.id] = el;
                  }}
                  href={l.href}
                  aria-current={currentFor(l.id)}
                  className={`relative block rounded py-2 text-sm font-medium transition-colors duration-200 ease-brand hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg ${
                    activeId === l.id ? "text-fg" : "text-muted"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {/* Sliding active-section indicator: 1px wide, scaled to the link. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-px left-0 h-0.5 w-px origin-left rounded-full bg-accent transition-[transform,opacity] duration-300 ease-brand motion-reduce:transition-none"
              style={{
                transform: indicator
                  ? `translateX(${indicator.x}px) scaleX(${indicator.w})`
                  : "scaleX(0)",
                opacity: activeId && indicator ? 1 : 0,
              }}
            />
          </ul>

          <Link
            href={contactLink.href}
            className="hidden min-h-10 items-center rounded-[10px] bg-accent px-4 text-sm font-semibold text-bg transition-[background-color,scale] duration-200 ease-brand hover:bg-accent-hover active:bg-accent-active motion-safe:active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg min-[400px]:inline-flex"
          >
            {contactLink.label}
          </Link>

          <button
            ref={btnRef}
            type="button"
            className="group -mr-2 flex h-11 w-11 items-center justify-center rounded-[10px] text-fg transition-colors duration-200 hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((prev) => !prev)}
          >
            {/* Two bars that morph into an X. */}
            <span aria-hidden="true" className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 top-[2px] h-[1.75px] w-5 rounded-full bg-current transition-transform duration-300 ease-brand motion-reduce:transition-none ${
                  open ? "translate-y-1 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[10px] h-[1.75px] w-5 rounded-full bg-current transition-transform duration-300 ease-brand motion-reduce:transition-none ${
                  open ? "-translate-y-1 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Always mounted so it can animate out; `invisible` removes it from
          the tab order and accessibility tree once closed. */}
      <div
        id="mobile-menu"
        ref={menuRef}
        aria-hidden={!open}
        className={`absolute inset-x-0 top-full max-h-[calc(100dvh-72px)] overflow-y-auto border-b border-line bg-bg duration-300 ease-brand motion-reduce:translate-y-0 motion-reduce:duration-150 md:hidden ${
          // Visibility flips on instantly when opening (so focus can move in)
          // and only switches off after the fade when closing.
          open
            ? "visible translate-y-0 opacity-100 transition-[opacity,translate]"
            : "pointer-events-none invisible -translate-y-2 opacity-0 transition-[opacity,translate,visibility]"
        }`}
      >
        <ul className="page-container py-3">
          {links.map((l) => (
            <li key={l.href} className="border-b border-line last:border-b-0">
              <Link
                href={l.href}
                onClick={() => closeMenu()}
                tabIndex={open ? undefined : -1}
                aria-current={currentFor(l.id)}
                className="flex min-h-14 items-center justify-between text-lg font-medium text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {l.label}
                {activeId === l.id ? (
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                  />
                ) : null}
              </Link>
            </li>
          ))}
          <li className="pt-4 pb-2">
            <Link
              href={contactLink.href}
              onClick={() => closeMenu()}
              tabIndex={open ? undefined : -1}
              className="flex min-h-12 w-full items-center justify-center rounded-[10px] bg-accent text-[15px] font-semibold text-bg transition-[background-color,scale] duration-200 ease-brand hover:bg-accent-hover active:bg-accent-active motion-safe:active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {contactLink.label}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
