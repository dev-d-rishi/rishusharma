import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/src/components/portfolio/PageShell";
import { BlogCard } from "@/src/components/portfolio/content/Cards";
import { ContentBlocks } from "@/src/components/portfolio/content/ContentBlocks";
import {
  blogPosts,
  getBlogPost,
  sortedBlogPosts,
} from "@/src/components/portfolio/content/blogPosts";
import { formatDate, readingTime } from "@/src/components/portfolio/content/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Rishu Sharma`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Rishu Sharma"],
      tags: [...post.tags],
      images: post.cover ? [post.cover] : undefined,
    },
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const more = sortedBlogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <PageShell>
      <article className="mx-auto w-full max-w-3xl px-5 md:px-6 py-12 sm:py-16">
        <Link href="/blog" className="text-sm text-muted hover:text-fg">
          ← All posts
        </Link>
        <header className="mt-6 border-b border-line pb-8">
          <p className="text-sm text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
            {readingTime(post.body)} min read
          </p>
          <h1 className="mt-3 text-heading text-fg">
            {post.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {post.excerpt}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="mt-8">
          <ContentBlocks blocks={post.body} />
        </div>

        <footer className="mt-12 rounded-[14px] border border-line bg-surface p-6">
          <p className="text-sm font-semibold text-fg">Rishu Sharma</p>
          <p className="mt-1 text-sm text-muted">
            Senior React Native Developer building cross-platform apps for
            Android and iOS.{" "}
            <Link href="/#contact" className="font-medium text-fg hover:underline">
              Get in touch →
            </Link>
          </p>
        </footer>
      </article>

      {more.length > 0 ? (
        <section className="border-t border-line py-12">
          <div className="mx-auto max-w-6xl px-5 md:px-6">
            <h2 className="text-xl font-semibold tracking-tight text-fg">
              More posts
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {more.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
