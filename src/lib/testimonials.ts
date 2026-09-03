/**
 * Testimonials cycled by TestimonialsSection.
 *
 * Only the first is real, approved copy. The other two are deliberately,
 * obviously placeholder — generic enough that they can't be mistaken for
 * real client quotes if this ships before they're replaced. Luke is
 * supplying real content and headshots for these; `avatarSrc` stays unset
 * everywhere until then, so all three fall back to the same placeholder.
 */
export type Testimonial = {
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly avatarSrc?: string;
};

export const testimonials: readonly Testimonial[] = [
  {
    quote:
      "Exalt joined our team and immediately made an impact, helping us ship new features that drive our growth.",
    name: "Bryan Chappell",
    role: "CEO, ScoutOS",
  },
  {
    quote: "Placeholder testimonial — replace with real client feedback.",
    name: "Client Name",
    role: "Title, Company",
  },
  {
    quote: "Placeholder testimonial — replace with real client feedback.",
    name: "Client Name",
    role: "Title, Company",
  },
] as const;
