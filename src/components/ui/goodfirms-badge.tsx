"use client";

import Script from "next/script";

declare global {
  interface Window {
    GOODFIRMS?: { Init?: () => void };
  }
}

/**
 * Live GoodFirms review badge — replaces what was a static screenshot of it,
 * so the rating and review count now stay current on their own.
 *
 * GoodFirms' widget script only initialises via a `readystatechange`
 * listener it attaches when it first runs. If the script loads after the
 * page has already reached `document.readyState === "complete"` — true for
 * any script loaded with Next's `lazyOnload` strategy, since that only fires
 * after the `load` event — that transition has already happened and the
 * event never fires again, so the badge silently never appears. `onLoad`
 * calls the same `Init()` the widget would have called itself, sidestepping
 * that failure mode entirely, so `lazyOnload` — the right strategy for a
 * footer badge that has no business competing for bandwidth with anything
 * above the fold — is safe to use here.
 */
export function GoodFirmsBadge() {
  return (
    <>
      <div
        className="goodfirm-widget w-[195px] max-w-full"
        data-widget-type="goodfirms-widget-t9"
        data-widget-pattern="score-focused"
        data-height="98"
        data-company-id="168168"
        // Reserves the widget's height up front, so the iframe it injects
        // doesn't shift the footer layout once it finishes loading. Width is
        // sized close to the pattern's own measured content width (~185px)
        // rather than generously oversized: the widget's white card is only
        // as wide as its content (a shrink-to-fit flex row internally), and
        // our iframe is transparent outside it, so extra width here would
        // show as dead space beside a left-aligned card rather than a wider
        // card.
        style={{ minHeight: 98 }}
      />
      <Script
        src="https://assets.goodfirms.co/assets/js/widget.min.js"
        strategy="lazyOnload"
        onLoad={() => window.GOODFIRMS?.Init?.()}
      />
    </>
  );
}
