import Image from "next/image";
import Link from "next/link";

import { BookCallButton } from "@/components/ui/book-call-button";
import { type BlogArticle, type BlogImage, formatPublished, getReadingMinutes } from "@/lib/blog";
import { cn } from "@/lib/utils";

/**
 * Small pieces every direction shares. Each layout composes them differently;
 * the pieces themselves stay identical so the comparison is about layout.
 */

/**
 * A product screenshot cropped to a fixed frame. Anchored top-left so the
 * crop keeps the app chrome and navigation, which is what makes a screenshot
 * read as a product rather than a texture. Same outline and hover as the
 * case-study cards.
 */
export function CroppedImage({
  image,
  sizes,
  priority = false,
  decorative = false,
  className,
}: {
  image: BlogImage;
  sizes: string;
  priority?: boolean;
  /** True when a link's text already names the article. */
  decorative?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-mauve-50 outline -outline-offset-1 outline-black/10 sm:rounded-lg",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={decorative ? "" : image.alt}
        fill
        sizes={sizes}
        quality={90}
        priority={priority}
        className="object-cover object-left-top transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
      />
    </div>
  );
}

/** "Luke Dalton · Draft · 7 min read". Date and length only when real. */
export function ArticleMeta({
  article,
  showAuthor = true,
  className,
}: {
  article: BlogArticle;
  showAuthor?: boolean;
  className?: string;
}) {
  const minutes = getReadingMinutes(article);
  const published = formatPublished(article);
  const items = [
    showAuthor ? article.author.name : null,
    published,
    minutes ? `${minutes} min read` : null,
  ].filter(Boolean);

  return (
    <p className={cn("flex flex-wrap items-center gap-x-2 text-sm leading-5 text-foreground/60", className)}>
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-2">
          {i > 0 ? <span aria-hidden className="text-foreground/30">·</span> : null}
          {item === published && article.publishedAt ? (
            <time dateTime={article.publishedAt}>{item}</time>
          ) : (
            item
          )}
        </span>
      ))}
    </p>
  );
}

export function BackLink({ href, className }: { href: string; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1 rounded-xs text-sm leading-5 font-medium text-foreground/66 transition-colors duration-200 hover:text-foreground",
        className,
      )}
    >
      <svg
        aria-hidden
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5 motion-reduce:transition-none"
      >
        <path d="M9.5 4 5.5 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Blog
    </Link>
  );
}

/** The chevron that follows a link label; nudges 2px on hover like the site's buttons. */
export function Chevron({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={cn(
        "shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none",
        className,
      )}
    >
      <path d="M6.5 4 10.5 8 6.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TableOfContents({
  headings,
  title = "In this article",
  className,
}: {
  headings: readonly { id: string; text: string }[];
  title?: string;
  className?: string;
}) {
  return (
    <nav aria-label="Table of contents" className={className}>
      <p className="font-mono text-eyebrow font-medium text-foreground/60 uppercase">{title}</p>
      <ol className="mt-3 flex flex-col">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className="block rounded-xs py-1.5 text-sm leading-5 text-foreground/66 transition-colors duration-200 hover:text-foreground"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * The article's one closing CTA. Deliberately a quiet bordered block, not the
 * site's dark CTA card: it ends the article rather than starting a pitch.
 */
export function ArticleCta({ className }: { className?: string }) {
  return (
    <aside
      aria-labelledby="article-cta-heading"
      className={cn(
        "flex flex-col items-start gap-6 rounded-lg border border-foreground/12 p-6 sm:p-8",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <h2 id="article-cta-heading" className="text-xl font-semibold tracking-[-0.03em] text-foreground">
          Planning a redesign?
        </h2>
        <p className="max-w-[44ch] text-base leading-6 text-foreground/66">
          We help product teams decide what to change first, then design and ship it with your engineers.
        </p>
      </div>
      <BookCallButton>Discuss your product redesign</BookCallButton>
    </aside>
  );
}
