import { AboutSection } from "@/src/components/portfolio/sections/AboutSection";
import { ContactSection } from "@/src/components/portfolio/sections/ContactSection";
import { EducationSection } from "@/src/components/portfolio/sections/EducationSection";
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
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <WavePattern />
      <SiteFooter />
    </div>
  );
}
