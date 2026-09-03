import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cn } from "@/lib/utils";

type BrowserMockupProps = {
  /** Shown in the mock address bar, e.g. "acme.com". */
  url: string;
  /** Optional brand mark shown faintly in the placeholder centre. */
  markSrc?: string;
  className?: string;
};

/**
 * Case-study artwork framed as a browser window: a chrome bar (traffic
 * lights + address pill) over a placeholder for the product screenshot.
 * The dots are monochrome rather than macOS red/amber/green, so the chrome
 * reads as "browser window" without importing candy colours into an
 * otherwise all-mauve palette.
 */
export function BrowserMockup({ url, markSrc, className }: BrowserMockupProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-foreground/12",
        className,
      )}
    >
      <div className="flex items-center gap-4 bg-foreground px-4 py-3 sm:px-5 sm:py-3.5">
        <div className="flex shrink-0 gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-background/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-background/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-background/25" />
        </div>
        <div className="flex h-6 flex-1 items-center justify-center rounded-full bg-background/10 px-4 sm:h-7">
          <span className="truncate text-xs text-background/50">{url}</span>
        </div>
      </div>

      <ImagePlaceholder
        ratio="16 / 10"
        markSrc={markSrc}
        caption="Product screenshot to come"
        className="border-0"
      />
    </div>
  );
}
