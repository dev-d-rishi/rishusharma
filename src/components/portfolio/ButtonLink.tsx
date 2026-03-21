import { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  target?: "_blank" | "_self";
};

export function ButtonLink({
  href,
  children,
  variant = "secondary",
  target = "_self",
}: ButtonLinkProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 transform-gpu focus:outline-none focus:ring-2 focus:ring-sky-400/40 hover:scale-[1.05] active:scale-[0.98]";

  const styles =
    variant === "primary"
      ? "bg-sky-500 text-black hover:bg-sky-400"
      : "border border-white/12 bg-white/5 text-zinc-50 hover:border-white/20 hover:bg-white/10";

  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={`${base} ${styles}`}
    >
      {children}
    </a>
  );
}

