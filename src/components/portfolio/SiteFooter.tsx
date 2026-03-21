"use client";

import { WavePattern } from "@/src/components/portfolio/WavePattern";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[#2C5F7C]/15 bg-[#F5EFE6]/80">
      <WavePattern className="opacity-[0.04]" />
      <div className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-sm text-[#4A5568]">
        <span>© {year} Rishu Sharma</span>
        <span className="hidden sm:inline">React Native Developer</span>
      </div>
    </footer>
  );
}
