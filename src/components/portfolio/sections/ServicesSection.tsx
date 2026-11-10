import type { IconType } from "react-icons";
import { LuPlug, LuSmartphone, LuWrench } from "react-icons/lu";
import { SectionReveal } from "@/src/components/portfolio/SectionReveal";
import {
  services,
  type Service,
} from "@/src/components/portfolio/portfolioData";

const icons: Record<Service["icon"], IconType> = {
  app: LuSmartphone,
  integrations: LuPlug,
  maintenance: LuWrench,
};

const order: Service["icon"][] = ["app", "integrations", "maintenance"];

export function ServicesSection() {
  const items = order
    .map((icon) => services.find((s) => s.icon === icon))
    .filter((s): s is Service => s !== undefined);

  return (
    <SectionReveal
      id="services"
      aria-labelledby="services-heading"
      className="section-y border-t border-line"
    >
      <div className="page-container">
        <div data-reveal className="max-w-[40rem]">
          <h2
            id="services-heading"
            className="font-display text-heading text-fg"
          >
            Where I can pick up your app.
          </h2>
          <p className="mt-6 max-w-[32rem] text-lead text-muted">
            At the idea stage, halfway through, or after launch. Any part of
            the path, or all of it.
          </p>
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-20 lg:gap-6">
          {items.map((service) => {
            const Icon = icons[service.icon];
            return (
              <li
                key={service.title}
                data-reveal
                className="glass group rounded-[24px] p-6 transition-colors duration-300 ease-brand hover:bg-surface-hover sm:p-8"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-line-strong bg-bg text-fg">
                  <Icon size={19} aria-hidden="true" strokeWidth={1.75} />
                </span>
                <h3 className="mt-8 max-w-[18ch] font-display text-title text-fg">
                  {service.title}
                </h3>
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
