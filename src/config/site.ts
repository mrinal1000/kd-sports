/**
 * KD SPORTS — single source of truth for business facts and site-wide config.
 *
 * Everything here is either (a) verified from the GST registration certificate
 * supplied by the owner, or (b) explicitly marked as a placeholder. Nothing is
 * invented. If a value is not below, the site does not claim it.
 */

/* ------------------------------------------------------------------ *
 * Placeholder helper
 *
 * Some facts we simply do not have — a phone number, opening hours, a street
 * address. Rather than inventing them or leaving a blank that looks like a
 * bug, they are marked. The UI renders them as a visible "to be confirmed"
 * chip, and `grep "todo("` lists everything outstanding.
 * ------------------------------------------------------------------ */

export interface Pending {
  readonly __pending: true;
  readonly label: string;
  readonly note?: string;
}

export const todo = (label: string, note?: string): Pending => ({
  __pending: true,
  label,
  note,
});

export const isPending = (v: unknown): v is Pending =>
  typeof v === "object" && v !== null && (v as Pending).__pending === true;

export type Maybe<T> = T | Pending;

/* ------------------------------------------------------------------ *
 * Business — verified from the GST registration certificate
 * ------------------------------------------------------------------ */

export const BUSINESS = {
  name: "KD SPORTS",
  legalName: "KD SPORTS",
  proprietor: "Naresh Kumar",
  constitution: "Proprietorship",
  gstin: "03QTKPK3220F1ZS",
  registrationType: "Regular",
  registrationDate: "03/06/2026",

  address: {
    locality: "Kharar",
    district: "SAS Nagar",
    state: "Punjab",
    country: "India",
    pin: "140301",
    /** Not on the certificate we were given — do not invent one. */
    street: todo("Street / shop address", "Only if the owner wants it public."),
  },

  contact: {
    email: "nareshbashyal358@gmail.com",
    phone: todo("Phone number", "Add a WhatsApp-capable number to enable ordering."),
    whatsapp: todo("WhatsApp number", "Digits with country code, e.g. 919876543210."),
    hours: todo("Opening hours"),
  },

  social: {
    instagram: "https://www.instagram.com/kdsportsofficial05/",
    instagramHandle: "@kdsportsofficial05",
    facebook: todo("Facebook page URL"),
    youtube: todo("YouTube channel URL"),
  },
} as const;

/** Short one-line address used in the footer and contact page. */
export const SHORT_ADDRESS = `${BUSINESS.address.locality}, ${BUSINESS.address.district}, ${BUSINESS.address.state}, ${BUSINESS.address.country} — ${BUSINESS.address.pin}`;

/* ------------------------------------------------------------------ *
 * Site meta — per-route <title> and description
 * ------------------------------------------------------------------ */

export const SITE = {
  url: todo("Live site URL", "e.g. https://kdsports.in — used for canonical and OG tags."),
  defaultTitle: "KD SPORTS | Premium Sports Equipment & Apparel",
  defaultDescription:
    "Discover sports equipment, apparel and performance gear from KD SPORTS, based in Kharar, Punjab.",
  ogImage: "/images/og-cover.svg",
} as const;

export const PAGE_META: Record<string, { title: string; description: string }> = {
  home: {
    title: "KD SPORTS | Premium Sports Equipment & Apparel",
    description:
      "Discover sports equipment, apparel and performance gear from KD SPORTS, based in Kharar, Punjab.",
  },
  shop: {
    title: "Shop All Gear | KD SPORTS",
    description:
      "Browse cricket, football, fitness and apparel from KD SPORTS. Filter by category, price and availability.",
  },
  categories: {
    title: "Sports Categories | KD SPORTS",
    description:
      "Cricket, football, fitness and training, and sports apparel from KD SPORTS, Kharar, Punjab.",
  },
  about: {
    title: "About KD SPORTS | Kharar, Punjab",
    description:
      "KD SPORTS is a sports equipment and apparel business in Kharar, Punjab, run by Naresh Kumar.",
  },
  contact: {
    title: "Contact KD SPORTS | Kharar, Punjab",
    description:
      "Get in touch with KD SPORTS in Kharar, SAS Nagar, Punjab. Email or reach us on Instagram.",
  },
  cart: { title: "Your Bag | KD SPORTS", description: "Review the gear in your bag." },
  wishlist: { title: "Wishlist | KD SPORTS", description: "Gear you have saved for later." },
  notFound: { title: "Page not found | KD SPORTS", description: "That page could not be found." },
};

/* ------------------------------------------------------------------ *
 * Images
 *
 * ONE place to point at artwork. Every path is relative to `public/`, so
 * replacing a picture means dropping a file into public/images/ and changing
 * the string here — no component ever hardcodes an image path.
 *
 * Everything currently points at generated SVG stand-ins. See README.md for
 * how to swap in real photography.
 * ------------------------------------------------------------------ */

export const IMAGES = {
  logo: "/images/logo.svg",
  ogCover: "/images/og-cover.svg",

  hero: {
    /** Replace with e.g. /images/hero-cricket.jpg */
    primary: "/images/hero-cricket.svg",
    mobile: "/images/hero-cricket-mobile.svg",
  },

  promo: "/images/promo-banner.svg",
  about: "/images/about-store.svg",
  brandStatement: "/images/brand-statement.svg",

  categories: {
    cricket: "/images/cricket.svg",
    football: "/images/football.svg",
    fitness: "/images/fitness.svg",
    apparel: "/images/apparel.svg",
  },

  /** Instagram grid stand-ins — see the note in InstagramGrid.tsx. */
  instagram: [
    "/images/social/ig-1.svg",
    "/images/social/ig-2.svg",
    "/images/social/ig-3.svg",
    "/images/social/ig-4.svg",
    "/images/social/ig-5.svg",
    "/images/social/ig-6.svg",
    "/images/social/ig-7.svg",
    "/images/social/ig-8.svg",
  ],
} as const;

/* ------------------------------------------------------------------ *
 * Navigation
 * ------------------------------------------------------------------ */

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Categories", to: "/categories" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export const FOOTER_NAV = {
  shop: [
    { label: "Cricket", to: "/shop?category=cricket" },
    { label: "Football", to: "/shop?category=football" },
    { label: "Fitness", to: "/shop?category=fitness" },
    { label: "Apparel", to: "/shop?category=apparel" },
    { label: "All equipment", to: "/shop" },
  ],
  company: [
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Reviews", to: "/#reviews" },
    { label: "Instagram", to: BUSINESS.social.instagram, external: true },
  ],
  support: [
    { label: "Shipping", to: "/contact#shipping" },
    { label: "Returns", to: "/contact#returns" },
    { label: "FAQs", to: "/contact#faq" },
    { label: "Contact us", to: "/contact" },
  ],
} as const;

/** Suggestions shown in the search overlay before anything is typed. */
export const POPULAR_SEARCHES = [
  "Cricket bat",
  "Cricket shoes",
  "Jerseys",
  "Sports equipment",
  "Training gear",
  "Football",
] as const;

/**
 * Currency formatting. One implementation so a price can never be rendered
 * two different ways.
 */
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
