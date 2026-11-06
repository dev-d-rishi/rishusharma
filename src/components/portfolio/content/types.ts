export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: readonly string[]; ordered?: boolean }
  | { type: "code"; code: string; lang?: string }
  | { type: "callout"; text: string }
  | {
      type: "figure";
      src: string;
      alt: string;
      caption?: string;
      width: number;
      height: number;
    };

export type Screenshot = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  role: string;
  platforms: string;
  stack: readonly string[];
  imageSrc?: string;
  /** Portrait phone screenshots shown as a gallery and on the card cover. */
  screenshots?: readonly Screenshot[];
  status?: string;
  /** Hidden case studies stay in the code but get no page, card or sitemap entry. */
  hidden?: boolean;
  links: {
    playStore?: string;
    appStore?: string;
    live?: string;
  };
  highlights: readonly { label: string; value: string }[];
  body: readonly ContentBlock[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO yyyy-mm-dd
  tags: readonly string[];
  /** Used for social previews. */
  cover?: string;
  body: readonly ContentBlock[];
};

export function readingTime(blocks: readonly ContentBlock[]): number {
  const words = blocks.reduce((total, block) => {
    if (block.type === "list") {
      return total + block.items.join(" ").split(/\s+/).length;
    }
    if (block.type === "figure") return total;
    const text = block.type === "code" ? block.code : block.text;
    return total + text.split(/\s+/).length;
  }, 0);
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
