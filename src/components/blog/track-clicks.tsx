"use client";

import { track } from "@vercel/analytics";
import type { ReactNode } from "react";

/**
 * Sends a Vercel Analytics custom event when anything inside is clicked, so a
 * server-rendered link can be tracked without becoming a client component.
 * Uses the cookieless analytics already on the site; nothing new is loaded.
 * Vercel only records custom events on Pro and Enterprise plans; on Hobby the
 * call is a no-op.
 */
export function TrackClicks({
  event,
  data,
  children,
}: {
  event: string;
  data: Record<string, string>;
  children: ReactNode;
}) {
  return (
    <div className="contents" onClickCapture={() => track(event, data)}>
      {children}
    </div>
  );
}
