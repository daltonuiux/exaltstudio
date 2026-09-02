import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  /** CSS aspect-ratio, e.g. "16 / 10". */
  ratio?: string;
  /** Optional brand mark shown faintly in the centre. */
  markSrc?: string;
  /** Caption shown under the mark, e.g. what should replace this. */
  caption?: string;
  className?: string;
};

/**
 * Stand-in for artwork that does not exist in the repo yet.
 *
 * Deliberately plain — a hairline frame on the muted ground, with the client's
 * own logo where we have one. It reserves the exact final aspect ratio, so
 * dropping a real image in later changes nothing about the layout.
 */
export function ImagePlaceholder({
  ratio = "16 / 10",
  markSrc,
  caption,
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden border border-foreground/12 bg-muted",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      <div className="flex flex-col items-center gap-4 px-6 text-center">
        {markSrc ? (
          // eslint-disable-next-line @next/next/no-img-element -- static SVG mark, fixed size
          <img
            src={markSrc}
            alt=""
            aria-hidden
            className="h-5 w-auto opacity-25 sm:h-6"
            decoding="async"
          />
        ) : null}
        {caption ? (
          <span className="font-mono text-eyebrow text-foreground/30 uppercase">
            {caption}
          </span>
        ) : null}
      </div>
    </div>
  );
}
