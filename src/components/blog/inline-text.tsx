import Link from "next/link";
import { Fragment } from "react";

/** Body-copy link: underlined at rest so it never relies on colour alone. */
export const proseLinkClass =
  "font-medium text-foreground underline decoration-foreground/30 underline-offset-[0.2em] transition-colors duration-200 hover:decoration-foreground";

/**
 * Renders the two inline marks blog copy supports: **bold** and
 * [label](href). Internal hrefs use next/link; anything else opens normally.
 */
export function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, href] = link;
          return href.startsWith("/") ? (
            <Link key={i} href={href} className={proseLinkClass}>
              {label}
            </Link>
          ) : (
            <a key={i} href={href} className={proseLinkClass}>
              {label}
            </a>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
