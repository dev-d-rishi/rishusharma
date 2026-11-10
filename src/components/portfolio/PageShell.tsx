import type { ReactNode } from "react";
import { SiteFooter } from "@/src/components/portfolio/SiteFooter";
import { SiteNavbar } from "@/src/components/portfolio/SiteNavbar";
import { PixelField } from "@/src/components/portfolio/PixelField";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col text-fg">
      <PixelField />
      <SiteNavbar />
      <main id="main" className="flex flex-1 flex-col">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="border-b border-line pt-16 pb-12 sm:pt-24 sm:pb-16">
      <div className="page-container">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="rise-in mt-3 max-w-[18ch] font-display text-heading text-fg">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lead text-muted">
          {description}
        </p>
      </div>
    </header>
  );
}
