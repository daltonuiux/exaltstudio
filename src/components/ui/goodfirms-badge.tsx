"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

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
 *
 * `onReady`, not `onLoad`: onLoad fires only the first time the script loads
 * in a browser session. The footer now lives on several pages, and
 * navigating between them client-side remounts the footer (a fresh, empty
 * widget div) while the script — already loaded, deduplicated by next/script
 * — never loads again, so Init() never ran again and the badge vanished on
 * every page reached by a link rather than a full reload. onReady runs after
 * the script has loaded AND every time this component mounts, which covers
 * both the first load and every later navigation.
 */
/* GoodFirms' own natural render for this pattern, measured directly against
   their widget endpoint: ~185x98 of fixed-size content (a 29px logo image,
   30px rating digits, none of it responsive) inside a 195x98 box. They don't
   expose a size parameter, so there's no way to ask the badge itself for
   anything smaller — it either renders at this size or clips. */
const WIDTH = 195;
const HEIGHT = 98;

/* Scaled so the badge's height matches the Dribbble Select badge (55px)
   sitting beside it in the footer — the strongest cue that two badges of
   different shapes belong to the same row. A CSS transform, not a smaller
   data-height: shrinking the iframe itself would crop the fixed-size content
   rather than shrink it, since GoodFirms' markup doesn't scale with its box. */
const SCALE = 55 / HEIGHT;

/* How far ahead of the footer to start loading. The widget needs a moment
   (script, then an iframe, then its own fonts and scripts), so this is
   generous: it should already be there by the time anyone scrolls to it. */
const LOAD_MARGIN = "1200px 0px";

/**
 * The widget is a third party: its script pulls in an iframe, two Roboto font
 * files, a Cloudflare challenge script and a Cloudflare analytics beacon —
 * roughly 60KB and a fair amount of main-thread work, none of it visible until
 * the very bottom of the page. So it isn't loaded on page load at all. The
 * placeholder below reserves the badge's footprint (no layout shift), and the
 * script only mounts once the footer is within LOAD_MARGIN of the viewport.
 * `lazyOnload` alone wasn't enough: it still ran for everyone, straight after
 * the load event, competing with the page's own images while they were still
 * arriving.
 */
export function GoodFirmsBadge() {
  const slot = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = slot.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: LOAD_MARGIN },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Reserves the post-scale footprint and clips any sub-pixel rounding
          from the transform, so layout sees the badge at its visual size. */}
      <div
        ref={slot}
        className="shrink-0 overflow-hidden"
        style={{ width: WIDTH * SCALE, height: HEIGHT * SCALE }}
      >
        <div
          className="goodfirm-widget"
          data-widget-type="goodfirms-widget-t9"
          data-widget-pattern="score-focused"
          data-height={HEIGHT}
          data-company-id="168168"
          style={{
            width: WIDTH,
            height: HEIGHT,
            transform: `scale(${SCALE})`,
            transformOrigin: "top left",
          }}
        />
      </div>
      {near ? (
        <Script
          src="https://assets.goodfirms.co/assets/js/widget.min.js"
          strategy="lazyOnload"
          onReady={() => window.GOODFIRMS?.Init?.()}
        />
      ) : null}
    </>
  );
}
