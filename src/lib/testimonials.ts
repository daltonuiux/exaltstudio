/**
 * Testimonials cycled by TestimonialsSection. All five are real, approved
 * quotes with real headshots.
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
      "Exalt joined our team and immediately made an impact, helping us ship new features that drive our growth. They worked closely with our Lead Designer, playing a key role in shaping the product and refining the user experience.",
    name: "Bryan Chappell",
    role: "CEO, ScoutOS",
    avatarSrc: "/images/studio/bryan-chappell.png",
  },
  {
    quote:
      "We discovered Exalt Studio after seeing a product they built and were immediately impressed by their clean, thoughtful UI. They quickly understood our insurance product challenges and delivered practical, creative solutions with more options than expected, which really shaped our thinking.",
    name: "Jake Wells",
    role: "Founder, Meshed",
    avatarSrc: "/images/studio/jake-wells.png",
  },
  {
    quote:
      "Exalt Studio have been fantastic to work with. Their work is not only beautiful, detailed and user-friendly, but also fast. They came recommended to me and I will gladly recommend them to others.",
    name: "Brent Rohner",
    role: "Founder, Perlon AI",
    avatarSrc: "/images/studio/brent-rohner.png",
  },
  {
    quote:
      "Customers and partners have commented on how clean, intuitive and functional the new UI experience is.",
    name: "Kelsey Waters",
    // "CEO & Co-Founder, Openlane" — matches the "Title, Company" pattern
    // the other three use, rather than the "at Openlane" phrasing as given.
    role: "CEO & Co-Founder, Openlane",
    avatarSrc: "/images/studio/kelsey-waters.png",
  },
  {
    quote:
      "Exalt quickly grasped the domain and translated a technically complex product into a clean, intuitive interface we’re proud to launch.",
    name: "Matt Donlevey",
    role: "Founder, Voren",
    avatarSrc: "/images/studio/matt-donlevey.png",
  },
] as const;
