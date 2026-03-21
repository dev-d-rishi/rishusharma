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
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6FA3C8]/40 focus:ring-offset-2 focus:ring-offset-[#F5EFE6]";

  const styles =
    variant === "primary"
      ? "bg-[#1E3A5F] text-white hover:bg-[#162d47]"
      : "border border-[#1E3A5F] bg-transparent text-[#1E3A5F] hover:bg-[#1E3A5F]/5";

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
