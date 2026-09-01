import type { Testimonial } from "./types";

/**
 * ⚠️ DEMO TESTIMONIALS — NOT REAL CUSTOMER REVIEWS.
 *
 * KD SPORTS has no collected review data, and inventing praise from named
 * customers would be a straightforward fabrication. These are deliberately
 * written as visible blanks: the layout is real, the words are not, and the
 * UI labels the whole section as awaiting real reviews.
 *
 * Replace `quote`, `name` and `role` with genuine reviews — with the
 * customer's permission — and delete TESTIMONIALS_ARE_DEMO to remove the
 * notice.
 */
export const TESTIMONIALS_ARE_DEMO = true;

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: "Customer review will appear here.",
    name: "Customer name",
    role: "Cricket · Kharar",
    rating: 5,
  },
  {
    id: "t2",
    quote: "Customer review will appear here.",
    name: "Customer name",
    role: "Football · Mohali",
    rating: 5,
  },
  {
    id: "t3",
    quote: "Customer review will appear here.",
    name: "Customer name",
    role: "Team order · Punjab",
    rating: 5,
  },
];
