import type { ReactNode } from "react";

import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label: string;
  title: ReactNode;
  /** Id for the heading, so the section can reference it via aria-labelledby. */
  titleId?: string;
  description?: ReactNode;
  className?: string;
  titleClassName?: string;
};

/**
 * Label + headline (+ optional supporting copy). One size smaller than the
 * hero h1 so sections read as subordinate to it.
 */
export function SectionHeader({
  label,
  title,
  titleId,
  description,
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <SectionLabel>{label}</SectionLabel>
      <h2
        id={titleId}
        className={cn(
          "text-4xl font-semibold tracking-[-0.03em] text-foreground",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="max-w-[52ch] text-base leading-6 text-foreground/66">
          {description}
        </p>
      ) : null}
    </div>
  );
}
