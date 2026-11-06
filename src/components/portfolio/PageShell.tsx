import type { ReactNode } from "react";
import { SiteFooter } from "@/src/components/portfolio/SiteFooter";
import { SiteNavbar } from "@/src/components/portfolio/SiteNavbar";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-fg">
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
    <header className="border-b border-line py-14 sm:py-20">
      <div className="page-container">
        <p className="rise-in eyebrow">{eyebrow}</p>
        <h1 className="rise-in mt-3 [animation-delay:80ms] text-heading text-fg">
          {title}
        </h1>
        <p className="rise-in mt-4 max-w-2xl [animation-delay:160ms] text-[15px] leading-relaxed text-muted sm:text-base">
          {description}
        </p>
      </div>
    </header>
  );
}
