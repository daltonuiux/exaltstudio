import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant =
  | "solid"
  | "soft"
  | "ghost"
  | "inverse"
  | "inverse-soft"
  | "inverse-ghost";
type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  /* Figma pill: solid foreground fill, white label */
  solid: "bg-foreground text-background hover:bg-foreground/90",
  /* Figma: rgba(42,37,46,0.12) fill */
  soft: "bg-foreground/12 text-foreground hover:bg-foreground/20",
  /* Figma: nav items — no fill until hovered */
  ghost: "text-foreground hover:bg-foreground/8",
  /* For use on a dark ground (final CTA, hero over the sky). */
  inverse: "bg-background text-foreground hover:bg-background/90",
  /* The soft pill, inverted for a dark ground. */
  "inverse-soft": "bg-background/15 text-background hover:bg-background/25",
  /* Nav items on a dark ground. */
  "inverse-ghost": "text-background hover:bg-background/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3.5 text-sm",
  md: "h-9 px-4 text-sm",
};

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
};

type ButtonAsLink = BaseProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >;
type ButtonAsButton = BaseProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

/**
 * Pill button from the Figma design. Renders an anchor when given `href`,
 * otherwise a real `<button>` — so the semantics match the action.
 */
export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    variant = "solid",
    size = "md",
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    "inline-flex shrink-0 items-center justify-center rounded-full font-semibold whitespace-nowrap",
    "transition-colors duration-200",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (rest && "href" in rest && rest.href !== undefined) {
    const { href, ...linkProps } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonAsButton)}>
      {children}
    </button>
  );
}
