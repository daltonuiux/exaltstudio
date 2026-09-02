import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type IndexedItemProps = {
  /** Two-digit index, e.g. "01". */
  index: string;
  title: string;
  children: ReactNode;
  /** `row` puts the index beside the text; `stacked` puts it above. */
  layout?: "row" | "stacked";
  className?: string;
};

/**
 * A numbered editorial item: index marker, uppercase title, supporting line.
 * Used by the problem, capabilities and process sections.
 */
export function IndexedItem({
  index,
  title,
  children,
  layout = "row",
  className,
}: IndexedItemProps) {
  const body = (
    <>
      <h3 className="text-sm font-semibold tracking-[0.06em] text-foreground uppercase sm:text-base">
        {title}
      </h3>
      <p className="mt-3 max-w-[46ch] text-base leading-6 text-foreground/66">
        {children}
      </p>
    </>
  );

  if (layout === "stacked") {
    return (
      <div className={cn(className)}>
        <span className="font-mono text-eyebrow font-medium text-foreground/50 tabular-nums">
          {index}
        </span>
        <div className="mt-5">{body}</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-[2.25rem_1fr] gap-x-4 sm:grid-cols-[4rem_1fr] sm:gap-x-6",
        className,
      )}
    >
      <span className="pt-0.5 font-mono text-eyebrow font-medium text-foreground/50 tabular-nums sm:pt-1">
        {index}
      </span>
      <div>{body}</div>
    </div>
  );
}
