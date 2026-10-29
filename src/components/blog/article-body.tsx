import Image from "next/image";

import { CopyTemplate } from "@/components/blog/copy-template";
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
  wideTableClassName,
}: {
  blocks: readonly BlogBlock[];
  className?: string;
  figureClassName?: string;
  /** Width for tables of more than four columns from xl, when the layout has room. */
  wideTableClassName?: string;
}) {
  return (
    <div className={cn("max-w-article text-lg text-pretty text-foreground/80", className)}>
      {blocks.map((block, i) => (
        <Block
          key={i}
          block={block}
          first={i === 0}
          figureClassName={figureClassName}
          wideTableClassName={wideTableClassName}
        />
      ))}
    </div>
  );
}

function Block({
  block,
  first,
  figureClassName,
  wideTableClassName,
}: {
  block: BlogBlock;
  first: boolean;
  figureClassName?: string;
  wideTableClassName?: string;
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
      return block.head.length > 4 ? (
        <WideTable block={block} className={wideTableClassName} />
      ) : (
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
                {block.head.map((h, c) => (
                  <th key={c} scope="col" className="py-3 pr-5 align-bottom font-semibold text-foreground last:pr-0">
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
    case "dl":
      return (
        <dl className="mt-6 border-b border-foreground/12">
          {block.items.map(([term, description]) => (
            <div key={term} className="grid gap-1 border-t border-foreground/12 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="text-base leading-6 font-semibold text-foreground">{term}</dt>
              <dd className="text-base leading-6">
                <InlineText text={description} />
              </dd>
            </div>
          ))}
        </dl>
      );
    case "template":
      return <CopyTemplate label={block.label} text={block.text} />;
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

/**
 * Tables with more than four columns (the scope tables). Squeezed into a
 * phone or the text column they become towers of two-word lines, so below xl
 * each row is a card: the row header as its title and every cell labelled
 * from its column heading (data-label, drawn with ::before). From xl it is a
 * real table, extending into the margin like the figures.
 */
function WideTable({
  block,
  className,
}: {
  block: Extract<BlogBlock, { type: "table" }>;
  className?: string;
}) {
  return (
    <table className={cn("mt-8 w-full border-collapse text-left text-sm leading-5 max-xl:block", className)}>
      <caption className="sr-only">{block.caption}</caption>
      <thead className="max-xl:hidden">
        <tr className="border-b border-foreground/20">
          {block.head.map((h) => (
            <th key={h} scope="col" className="py-3 pr-4 align-bottom font-semibold text-foreground last:pr-0">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="max-xl:flex max-xl:flex-col max-xl:gap-3">
        {block.rows.map((row) => (
          <tr
            key={row[0]}
            className="border-b border-foreground/12 max-xl:block max-xl:rounded-lg max-xl:border max-xl:p-5"
          >
            {row.map((cell, c) =>
              c === 0 ? (
                <th
                  key={c}
                  scope="row"
                  className="py-3 pr-4 align-top text-base font-semibold text-foreground max-xl:block max-xl:pt-0 max-xl:pb-2 xl:text-sm"
                >
                  {cell}
                </th>
              ) : (
                <td
                  key={c}
                  data-label={block.head[c]}
                  className="py-3 pr-4 align-top text-foreground/75 last:pr-0 max-xl:block max-xl:border-t max-xl:border-foreground/8 max-xl:py-2 max-xl:pr-0 max-xl:before:mb-0.5 max-xl:before:block max-xl:before:font-mono max-xl:before:text-eyebrow max-xl:before:font-medium max-xl:before:text-foreground/60 max-xl:before:uppercase max-xl:before:content-[attr(data-label)]"
                >
                  {cell}
                </td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
