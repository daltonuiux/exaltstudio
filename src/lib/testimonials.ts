/**
 * Testimonials cycled by TestimonialsSection. All three are real, approved
 * quotes — `avatarSrc` stays unset until Luke supplies headshots, so all
 * three fall back to the same placeholder in the meantime.
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
      "Exalt joined our team and immediately made an impact, helping us ship new features that drive our growth. They work closely with our Lead Designer, playing a key role in shaping the product and refining the user experience.",
    name: "Bryan Chappell",
    role: "CEO, ScoutOS",
  },
  {
    quote:
      "We discovered Exalt Studio after seeing a product they built and were immediately impressed by their clean, thoughtful UI. They quickly understood our insurance product challenges and delivered practical, creative solutions with more options than expected, which really shaped our thinking.",
    name: "Jake Wells",
    role: "Founder, Meshed",
  },
  {
    quote:
      "Exalt Studio have been fantastic to work with. Their work is not only beautiful, detailed and user-friendly, but also fast. They came recommended to me and I will gladly recommend them to others.",
    name: "Brent Rohner",
    role: "Founder, Perlon AI",
  },
] as const;
