export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-sm text-zinc-400">
        <span>© {year} Rishu Sharma</span>
        <span className="hidden sm:inline">React Native Developer</span>
      </div>
    </footer>
  );
}

