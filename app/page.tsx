import { ContactSection } from "@/src/components/portfolio/sections/ContactSection";
import { ExperienceSection } from "@/src/components/portfolio/sections/ExperienceSection";
import { HeroSection } from "@/src/components/portfolio/sections/HeroSection";
import { ProjectsSection } from "@/src/components/portfolio/sections/ProjectsSection";
import { SkillsSection } from "@/src/components/portfolio/sections/SkillsSection";
import { SiteFooter } from "@/src/components/portfolio/SiteFooter";
import { SiteNavbar } from "@/src/components/portfolio/SiteNavbar";
import { WavePattern } from "@/src/components/portfolio/WavePattern";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[rgb(26,26,26)]">
      <SiteNavbar />
      <main className="flex flex-col">
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <SiteFooter />
        <WavePattern />
    </div>
  );
}
