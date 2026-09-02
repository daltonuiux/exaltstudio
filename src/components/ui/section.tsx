import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionSpacing = "none" | "sm" | "md" | "lg";

const spacingClasses: Record<SectionSpacing, string> = {
  none: "",
  sm: "py-section",
  md: "py-section md:py-section-md",
  lg: "py-section md:py-section-md lg:py-section-lg",
};

type SectionProps<T extends ElementType> = {
  /** Element to render. Defaults to `section`. */
  as?: T;
  /** Anchor target for in-page navigation. */
  id?: string;
  /** Vertical rhythm. Defaults to the standard section spacing. */
  spacing?: SectionSpacing;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children" | "id">;

/**
 * Vertical layout primitive: owns the rhythm between page sections.
 * Pair with a heading and `aria-labelledby` so each landmark is named:
 *
 *   <Section id="work" aria-labelledby="work-heading">
 *     <Container>
 *       <h2 id="work-heading">Selected work</h2>
 *     </Container>
 *   </Section>
 */
export function Section<T extends ElementType = "section">({
  as,
  id,
  spacing = "md",
  className,
  children,
  ...props
}: SectionProps<T>) {
  const Component = (as ?? "section") as ElementType;

  return (
    <Component
      id={id}
      className={cn("relative w-full", spacingClasses[spacing], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
