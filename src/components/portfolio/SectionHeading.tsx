import type { ReactNode } from "react";

/** Eyebrow + section heading (+ optional intro and trailing action). */
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  action,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div
      data-reveal
      className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
    >
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="mt-4 text-balance text-heading text-fg">
          {title}
        </h2>
        {intro ? <p className="mt-5 text-lead text-muted">{intro}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
