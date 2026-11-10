import { BrandMark } from "@/src/components/portfolio/BrandMark";
import { personalInfo } from "@/src/components/portfolio/portfolioData";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="page-container flex flex-col gap-4 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <BrandMark size={28} />
          <p>
            <span className="font-medium text-fg">{personalInfo.name}</span>
            <span className="sr-only">, </span>
            <span aria-hidden="true">, </span>
            {personalInfo.descriptor.toLowerCase()}
          </p>
        </div>
        <p>
          © {year} {personalInfo.name}
        </p>
      </div>
    </footer>
  );
}
