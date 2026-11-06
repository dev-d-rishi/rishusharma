import Link from "next/link";
import { SectionReveal } from "@/src/components/portfolio/SectionReveal";
import { BlogCard } from "@/src/components/portfolio/content/Cards";
import { sortedBlogPosts } from "@/src/components/portfolio/content/blogPosts";

export function BlogSection() {
  return (
    <SectionReveal id="blog" className="border-t border-[#2C5F7C]/15 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[#1A1A1A]">
              Writing
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#4A5568]">
              Notes on React Native, native modules, and shipping mobile apps to
              production.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-[#1E3A5F] hover:underline"
          >
            All posts →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedBlogPosts.slice(0, 3).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
