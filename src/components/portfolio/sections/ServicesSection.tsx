import type { IconType } from "react-icons";
import { LuPlug, LuSmartphone, LuWrench } from "react-icons/lu";
import { SectionHeading } from "@/src/components/portfolio/SectionHeading";
import { SectionReveal } from "@/src/components/portfolio/SectionReveal";
import {
  services,
  type Service,
} from "@/src/components/portfolio/portfolioData";

const icons: Record<Service["icon"], IconType> = {
  app: LuSmartphone,
  maintenance: LuWrench,
  integrations: LuPlug,
};

export function ServicesSection() {
  return (
    <SectionReveal
      id="services"
      className="section-y border-t border-line bg-bg-2"
    >
      <div className="page-container">
        <SectionHeading
          id="services-heading"
          eyebrow="Services"
          title="How I can help with your app."
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <li
                key={service.title}
                data-reveal
                className="group flex flex-col rounded-[16px] border border-line bg-surface p-6 transition-[translate,border-color,background-color] duration-300 ease-brand hover:border-accent/30 hover:bg-surface-hover motion-safe:hover:-translate-y-0.5 sm:p-8"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-accent/25 bg-accent/10 text-accent transition-[translate,background-color,border-color] duration-300 ease-brand group-hover:border-accent/40 group-hover:bg-accent/15 motion-safe:group-hover:-translate-y-0.5">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-title text-fg">{service.title}</h3>
                <p className="mt-3 text-body text-muted">
                  {service.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </SectionReveal>
  );
}
