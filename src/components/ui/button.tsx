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

/*
 * The hover fill is drawn by a ::before layer whose OPACITY fades in (see
 * `classes` below), not by transitioning `background-color`. Opacity is
 * animated on the GPU compositor; a background-color transition instead
 * repaints the button on the main thread every frame, which over the hero's
 * WebGL canvas (also redrawing every frame) made the hover flash now and again
 * when moving between buttons. The layer colours below are chosen so the
 * resting and hovered results are the same as the fills they replace:
 * for a variant with a base fill, the layer is what's needed on top of it to
 * reach the old hover colour.
 */
const variantClasses: Record<ButtonVariant, string> = {
  /* Figma pill: solid foreground fill, white label. Hover: the fill at 90%. */
  solid: "bg-foreground text-background before:bg-background/10",
  /* Figma: rgba(42,37,46,0.12) fill; hover 20% */
  soft: "bg-foreground/12 text-foreground before:bg-foreground/9",
  /* Figma: nav items — no fill until hovered */
  ghost: "text-foreground before:bg-foreground/8",
  /* For use on a dark ground (final CTA, the hero). Hover: the fill at 90%. */
  inverse: "bg-background text-foreground before:bg-foreground/10",
  /* The soft pill, inverted for a dark ground. Hover: 25%. */
  "inverse-soft": "bg-background/15 text-background before:bg-background/12",
  /* Nav items on a dark ground. */
  "inverse-ghost": "text-background before:bg-background/10",
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
    // isolate: keeps the -z-10 hover layer inside the button, above its own
    // background and below its label.
    "relative isolate inline-flex shrink-0 items-center justify-center rounded-full font-semibold whitespace-nowrap",
    "before:absolute before:inset-0 before:-z-10 before:rounded-full before:opacity-0 before:transition-opacity before:duration-200",
    "hover:before:opacity-100",
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
