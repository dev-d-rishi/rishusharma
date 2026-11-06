import { AboutSection } from "@/src/components/portfolio/sections/AboutSection";
import { ContactSection } from "@/src/components/portfolio/sections/ContactSection";
import { HeroSection } from "@/src/components/portfolio/sections/HeroSection";
import { ServicesSection } from "@/src/components/portfolio/sections/ServicesSection";
import { WorkSection } from "@/src/components/portfolio/sections/WorkSection";
import { PageShell } from "@/src/components/portfolio/PageShell";

// Not rendered on the homepage, but kept in the codebase:
// SkillsSection, ExperienceSection, EducationSection, ProjectsSection,
// CaseStudiesSection and BlogSection (blog is hidden for now; see `blogEnabled`).

export default function Page() {
  return (
    <PageShell>
      <HeroSection />
      <WorkSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
    </PageShell>
  );
}
