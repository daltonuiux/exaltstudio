import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's stock scales. Our custom `--text-*`
 * tokens look like text-colour utilities to it, so it silently dropped them
 * whenever a class string also carried a colour — `text-eyebrow` next to
 * `text-foreground/50` resolved to just the colour, and the size was lost.
 * Register them as font sizes so they merge correctly.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["eyebrow", "hero", "display"] }],
    },
  },
});

/**
 * Merge Tailwind classes so a `className` prop passed into a component
 * reliably overrides the component's own defaults.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
