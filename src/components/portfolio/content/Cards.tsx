import Image from "next/image";
import Link from "next/link";
import type { BlogPost, CaseStudy } from "./types";
import { formatDate, readingTime } from "./types";

function Placeholder({ label }: { label: string }) {
  const initials = label
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="flex h-full w-full items-center justify-center bg-bg">
      <span className="text-3xl font-semibold tracking-tight text-muted/60">
        {initials}
      </span>
    </div>
  );
}

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      data-reveal
      className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-line bg-surface transition-[translate,scale,border-color,background-color] duration-300 ease-brand hover:border-accent/35 hover:bg-surface-hover motion-safe:hover:-translate-y-1 motion-safe:active:scale-[0.985] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <div className="relative h-44 overflow-hidden border-b border-line">
        {study.screenshots && study.screenshots.length >= 3 ? (
          <div className="flex h-full items-end justify-center gap-3 bg-bg px-6 pt-5">
            {study.screenshots.slice(0, 3).map((shot, i) => (
              <div
                key={shot.src}
                className={`relative w-[26%] overflow-hidden rounded-t-xl border border-b-0 border-line bg-surface ${
                  i === 1 ? "h-full" : "h-[85%]"
                }`}
              >
                <Image
                  src={shot.src}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover object-top transition-transform duration-300 ease-brand motion-safe:group-hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        ) : study.imageSrc ? (
          <Image
            src={study.imageSrc}
            alt={`${study.client} preview`}
            fill
            sizes="(max-width: 768px) 90vw, 30vw"
            className="object-cover transition-transform duration-300 ease-brand motion-safe:group-hover:scale-[1.03]"
          />
        ) : (
          <Placeholder label={study.client} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">
          {study.client} · {study.category}
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-fg">
          {study.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
          {study.summary}
        </p>
        <span className="mt-auto pt-5 text-sm font-medium text-fg">
          Read case study{" "}
          <span
            aria-hidden
            className="inline-block transition-transform duration-300 ease-brand motion-safe:group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-[14px] border border-line bg-surface p-6 transition-colors duration-200 hover:border-fg/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
    >
      <p className="text-xs text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
        {readingTime(post.body)} min read
      </p>
      <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-fg group-hover:text-fg">
        {post.title}
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
        {post.excerpt}
      </p>
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-line bg-bg px-2.5 py-1 text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
