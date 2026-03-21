import { ContactSection } from "@/src/components/portfolio/sections/ContactSection";
import { ExperienceSection } from "@/src/components/portfolio/sections/ExperienceSection";
import { HeroSection } from "@/src/components/portfolio/sections/HeroSection";
import { ProjectsSection } from "@/src/components/portfolio/sections/ProjectsSection";
import { SkillsSection } from "@/src/components/portfolio/sections/SkillsSection";
import { SiteFooter } from "@/src/components/portfolio/SiteFooter";
import { SiteNavbar } from "@/src/components/portfolio/SiteNavbar";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-zinc-50">
      <SiteNavbar />
      <main className="flex flex-col">
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
