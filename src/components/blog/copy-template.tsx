"use client";

import { useState } from "react";

/**
 * A block of plain text readers can copy into their own documents, such as
 * the project brief. The text is real, selectable markup either way; the
 * button is a convenience on top.
 */
export function CopyTemplate({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (permissions, insecure context): the text is still selectable.
    }
  }

  return (
    <figure className="mt-8 overflow-hidden rounded-lg border border-foreground/12">
      <figcaption className="flex items-center justify-between gap-4 border-b border-foreground/12 bg-mauve-50 py-2 pr-2 pl-5">
        <span className="font-mono text-eyebrow font-medium text-foreground/60 uppercase">{label}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex h-8 items-center rounded-full px-3.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-foreground/8"
        >
          {copied ? "Copied" : "Copy"}
          <span className="sr-only" aria-live="polite">
            {copied ? " to clipboard" : ""}
          </span>
        </button>
      </figcaption>
      {/* Wraps rather than scrolling sideways on a phone; the copied text is unchanged. */}
      <pre className="px-5 py-4 font-mono text-sm leading-6 break-words whitespace-pre-wrap text-foreground/80">
        {text}
      </pre>
    </figure>
  );
}
