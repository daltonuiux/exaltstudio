import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Every "book a call" button on the site. One component so the copy, the link
 * and the hover can't drift apart between the header, hero, accordion and CTA
 * (the header used to say "Book call" while the rest said "Book intro call").
 *
 * The hover is the chevron: it eases 2px to the right. Transform only, 200ms,
 * ease-out so the first frame already moves (an ease-in would feel like it's
 * hesitating), and it's a nudge rather than a slide because this is seen on
 * every page. Tailwind gates `hover:` behind @media (hover: hover), so touch
 * devices never get a chevron stuck mid-nudge after a tap, and it's off under
 * reduced motion. The button's own colour change on hover comes from the shared
 * Button variants, unchanged.
 *
 * The right padding is smaller than the left because the chevron glyph has
 * about 5px of empty space inside its 16px box, which would otherwise read as
 * extra padding on that side.
 */
export function BookCallButton({
  variant = "solid",
  size = "md",
  className,
}: {
  variant?: "solid" | "inverse";
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <Button
      href={siteConfig.bookingUrl}
      target="_blank"
      rel="noreferrer noopener"
      variant={variant}
      size={size}
      className={cn("group gap-1", size === "sm" ? "pr-2" : "pr-3", className)}
    >
      Book intro call
      <svg
        aria-hidden
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none"
      >
        <path
          d="M6.5 4 10.5 8 6.5 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  );
}
