import { cn } from "@/lib/utils";

/**
 * Small monospace uppercase label. Matches the hero eyebrow exactly —
 * DM Mono Medium 12px, +0.24px tracking, 50% foreground.
 */
export function SectionLabel({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "font-mono text-eyebrow font-medium text-foreground/50 uppercase",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
