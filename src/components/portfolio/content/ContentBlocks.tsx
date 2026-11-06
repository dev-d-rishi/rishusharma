import Image from "next/image";
import type { ContentBlock } from "./types";

export function ContentBlocks({ blocks }: { blocks: readonly ContentBlock[] }) {
  return (
    <div className="space-y-5 text-[15px] leading-relaxed text-muted sm:text-base">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="pt-6 text-xl font-semibold tracking-tight text-fg sm:text-2xl"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="pt-2 text-lg font-semibold tracking-tight text-fg"
              >
                {block.text}
              </h3>
            );
          case "p":
            return <p key={i}>{block.text}</p>;
          case "list": {
            const ListTag = block.ordered ? "ol" : "ul";
            return (
              <ListTag
                key={i}
                className={`space-y-2 pl-5 ${
                  block.ordered ? "list-decimal" : "list-disc"
                } marker:text-accent`}
              >
                {block.items.map((item) => (
                  <li key={item} className="pl-1">
                    {item}
                  </li>
                ))}
              </ListTag>
            );
          }
          case "code":
            return (
              <div
                key={i}
                className="overflow-hidden rounded-[14px] border border-line bg-bg"
              >
                {block.lang ? (
                  <div className="border-b border-line px-5 md:px-6 py-2 eyebrow">
                    {block.lang}
                  </div>
                ) : null}
                <pre className="overflow-x-auto p-4 text-[13px] leading-6 text-fg">
                  <code>{block.code}</code>
                </pre>
              </div>
            );
          case "figure":
            return (
              <figure key={i} className="py-4">
                <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-[14px] border border-line bg-surface">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    width={block.width}
                    height={block.height}
                    sizes="260px"
                    className="h-auto w-full"
                  />
                </div>
                {block.caption ? (
                  <figcaption className="mt-3 text-center text-sm text-muted">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "callout":
            return (
              <aside
                key={i}
                className="rounded-[14px] border-l-4 border-accent bg-accent/10 px-5 py-4 text-fg"
              >
                {block.text}
              </aside>
            );
        }
      })}
    </div>
  );
}
