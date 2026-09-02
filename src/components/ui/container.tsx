import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerWidth = "content" | "site" | "wide" | "full";

const widthClasses: Record<ContainerWidth, string> = {
  content: "max-w-content",
  site: "max-w-site",
  wide: "max-w-wide",
  full: "max-w-none",
};

type ContainerProps<T extends ElementType> = {
  /** Element to render. Defaults to `div`. */
  as?: T;
  /** Max width token. Defaults to the standard page width. */
  width?: ContainerWidth;
  /** Drop the horizontal gutters (for full-bleed children). */
  bleed?: boolean;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/**
 * Horizontal layout primitive: centres content and owns the page gutters.
 * Every section's inner content should sit inside a Container so gutters
 * stay consistent across the page.
 */
export function Container<T extends ElementType = "div">({
  as,
  width = "site",
  bleed = false,
  className,
  children,
  ...props
}: ContainerProps<T>) {
  const Component = (as ?? "div") as ElementType;

  return (
    <Component
      className={cn(
        "mx-auto w-full",
        widthClasses[width],
        !bleed && "px-gutter md:px-gutter-md lg:px-gutter-lg",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
