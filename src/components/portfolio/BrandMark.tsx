import Image from "next/image";

/** Rishu Sharma's geometric R monogram — the primary logo. */
export function BrandMark({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/brand/r-monogram.png"
      alt=""
      width={size}
      height={size}
      className={`shrink-0 ring-1 ring-line ${className}`}
      style={{ borderRadius: Math.round(size * 0.28) }}
      priority
    />
  );
}
