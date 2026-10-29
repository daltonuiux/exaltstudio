import Image from "next/image";

import { InlineText } from "@/components/blog/inline-text";
import type { BlogBlock } from "@/lib/blog";
import { cn } from "@/lib/utils";

/**
 * The one long-form renderer every direction shares, so reading quality is
 * identical across them and layouts differ only in what surrounds it.
 *
 * Body text is text-lg at 80% foreground: darker than the site's 66% card
 * copy because this is read for minutes, not glanced at. The column is
 * max-w-article (37rem): Asta Sans is narrow, so that measures ~70 characters a line.
 *
 * `figureClassName` lets a layout break figures out of the text column
 * (e.g. lg:-mx-24) without the renderer knowing about the grid around it.
 */
export function ArticleBody({
  blocks,
  className,
  figureClassName,
}: {
  blocks: readonly BlogBlock[];
  className?: string;
  figureClassName?: string;
}) {
  return (
    <div className={cn("max-w-article text-lg text-pretty text-foreground/80", className)}>
      {blocks.map((block, i) => (
        <Block key={i} block={block} first={i === 0} figureClassName={figureClassName} />
      ))}
    </div>
  );
}

function Block({
  block,
  first,
  figureClassName,
}: {
  block: BlogBlock;
  first: boolean;
  figureClassName?: string;
}) {
  switch (block.type) {
    case "p":
      return (
        <p className={cn(!first && "mt-5")}>
          <InlineText text={block.text} />
        </p>
      );
    case "h2":
      return (
        <h2
          id={block.id}
          // scroll-mt clears the fixed header plus a little air when a
          // contents link jumps here.
          className="mt-14 scroll-mt-24 text-2xl font-semibold tracking-[-0.03em] text-foreground"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="mt-8 text-lg font-semibold text-foreground">{block.text}</h3>;
    case "ul":
      return (
        <ul className="mt-5 flex list-disc flex-col gap-2 pl-6 marker:text-foreground/40">
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              <InlineText text={item} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-5 flex list-decimal flex-col gap-2 pl-6 marker:font-mono marker:text-sm marker:text-foreground/60">
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              <InlineText text={item} />
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        // Scrolls inside itself on narrow screens rather than widening the
        // page. Focusable so keyboard users can scroll it too.
        <div
          role="region"
          aria-label={block.caption}
          tabIndex={0}
          className="mt-8 -mx-gutter overflow-x-auto px-gutter md:mx-0 md:px-0"
        >
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm leading-5">
            <caption className="sr-only">{block.caption}</caption>
            <thead>
              <tr className="border-b border-foreground/20">
                {block.head.map((h) => (
                  <th key={h} scope="col" className="py-3 pr-5 align-bottom font-semibold text-foreground last:pr-0">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]} className="border-b border-foreground/12">
                  {row.map((cell, c) =>
                    c === 0 ? (
                      <th key={c} scope="row" className="py-3 pr-5 align-top font-semibold text-foreground">
                        {cell}
                      </th>
                    ) : (
                      <td key={c} className="py-3 pr-5 align-top text-foreground/75 last:pr-0">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "figure":
      return (
        <figure className={cn("mt-10 mb-2", figureClassName)}>
          <Image
            src={block.image.src}
            alt={block.image.alt}
            width={block.image.width}
            height={block.image.height}
            sizes="(min-width: 1024px) 52rem, 100vw"
            quality={90}
            className="h-auto w-full rounded-md outline -outline-offset-1 outline-black/10 sm:rounded-lg"
          />
          <figcaption className="mt-3 max-w-article text-sm leading-5 text-foreground/60">
            {block.caption}
          </figcaption>
        </figure>
      );
    case "callout":
      return (
        <aside className="mt-8 rounded-lg bg-mauve-50 px-5 py-4 sm:px-6 sm:py-5">
          <p className="font-mono text-eyebrow font-medium text-foreground/60 uppercase">{block.label}</p>
          <p className="mt-2 text-base leading-6 text-foreground">
            <InlineText text={block.text} />
          </p>
        </aside>
      );
  }
}
