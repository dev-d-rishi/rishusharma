import type { Metadata } from "next";
import { PageHeader, PageShell } from "@/src/components/portfolio/PageShell";
import { BlogCard } from "@/src/components/portfolio/content/Cards";
import { sortedBlogPosts } from "@/src/components/portfolio/content/blogPosts";

export const metadata: Metadata = {
  title: "Blog | Rishu Sharma",
  description:
    "Articles on React Native, native modules, deep linking, and shipping mobile apps to the App Store and Google Play.",
};

export default function BlogIndexPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Blog"
        title="Writing on mobile engineering"
        description="Practical notes from building and shipping React Native apps — native modules, deep linking, releases, and the problems that only show up in production."
      />
      <section className="py-14">
        <div className="page-container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedBlogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
