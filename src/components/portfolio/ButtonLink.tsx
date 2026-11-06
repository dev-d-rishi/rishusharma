import { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  target?: "_blank" | "_self";
  /** Accessible label, e.g. to announce that a link opens in a new tab. */
  ariaLabel?: string;
  /** Restrained emerald glow on hover (primary buttons only). */
  glow?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "secondary",
  size = "md",
  target = "_self",
  ariaLabel,
  glow = false,
}: ButtonLinkProps) {
  const base =
    "group/btn inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold transition-[background-color,border-color,color,box-shadow,scale] duration-200 ease-brand motion-safe:active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

  const sizes =
    size === "lg" ? "min-h-12 px-6 text-[15px]" : "min-h-11 px-5 text-sm";

  const styles =
    variant === "primary"
      ? `bg-accent text-bg hover:bg-accent-hover active:bg-accent-active ${
          glow
            ? "hover:shadow-[0_0_0_4px_rgb(52_211_153/0.12),0_10px_30px_-12px_rgb(52_211_153/0.6)]"
            : ""
        }`
      : "border border-line-strong bg-bg-2 text-fg hover:border-subtle hover:bg-surface active:bg-surface-hover";

  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      className={`${base} ${sizes} ${styles}`}
    >
      {children}
    </a>
  );
}
