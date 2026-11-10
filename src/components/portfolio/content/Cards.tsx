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
      className="group flex h-full flex-col rounded-[6px] focus:outline-none focus-visible:ring-2 focus-visible:ring-fg/70 focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
    >
      <div className="glass relative h-56 overflow-hidden rounded-[24px] sm:h-64">
        {study.screenshots && study.screenshots.length >= 3 ? (
          <div className="flex h-full items-end justify-center gap-4 px-6 pt-8">
            {study.screenshots.slice(0, 3).map((shot, i) => (
              <div
                key={shot.src}
                className={`relative w-[26%] overflow-hidden rounded-t-[16px] border border-b-0 border-line-strong bg-black ${
                  i === 1 ? "h-full" : "h-[85%]"
                }`}
              >
                <Image
                  src={shot.src}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover object-top"
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
      <div className="flex flex-1 flex-col pt-6">
        <p className="eyebrow">{study.category}</p>
        <h3 className="mt-2 font-display text-title text-fg transition-colors duration-200 group-hover:text-fg/80">
          {study.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-body text-muted">
          {study.summary}
        </p>
        <span className="mt-auto pt-5 text-sm font-medium text-muted">
          Read the case study
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
