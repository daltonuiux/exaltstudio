import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The single definition of the eyebrow treatment: DM Mono Medium, 12px,
 * uppercase, 2% tracking. Size and tracking come from the `--text-eyebrow`
 * token, so changing them is a one-line edit in globals.css.
 *
 * Every eyebrow on the site renders through this — including the numeric
 * index markers, where `uppercase` is simply a no-op.
 */
const eyebrowClass =
  "font-mono text-eyebrow font-medium text-foreground/50 uppercase";

type SectionLabelProps<T extends ElementType> = {
  /** Element to render. Defaults to `p`. */
  as?: T;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function SectionLabel<T extends ElementType = "p">({
  as,
  className,
  children,
  ...props
}: SectionLabelProps<T>) {
  const Component = (as ?? "p") as ElementType;

  return (
    <Component className={cn(eyebrowClass, className)} {...props}>
      {children}
    </Component>
  );
}
