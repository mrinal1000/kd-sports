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
    // Supplied by the owner, 2026-09-07. `phone` is what a reader sees,
    // `phoneHref` is what tel: needs — never build one from the other by
    // stripping characters at the call site.
    phone: "+91 90567 89543",
    phoneHref: "tel:+919056789543",
    whatsapp: todo("WhatsApp number", "Confirm whether +91 90567 89543 is on WhatsApp."),
    hours: todo("Opening hours"),
  },

  /**
   * Shop location, supplied by the owner 2026-09-07 as a Google Maps link.
   *
   * These are the coordinates the owner gave, not a geocode of the postal
   * address — nothing here is inferred. `embed` is the keyless Google Maps
   * embed form; `link` is what opens the full map or turn-by-turn directions
   * in the visitor's own maps app.
   */
  map: {
    lat: 30.7495417,
    lng: 76.6123048,
    zoom: 17,
    link: "https://maps.google.com/maps?q=30.7495417%2C76.6123048&z=17&hl=en",
    // Google's own embed endpoint, which is where `...&output=embed` 301s to.
    // Pointed at directly on purpose: the 301 carries X-Frame-Options
    // SAMEORIGIN (the 200 it lands on does not), so going straight there
    // avoids relying on browsers ignoring XFO on a redirect hop, and saves a
    // round trip. Keyless — there is no API key to leak or bill.
    embed:
      "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s30.7495417,76.6123048!6i17!3m1!1sen!5m1!1sen",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=30.7495417%2C76.6123048",
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
  defaultTitle: "KD SPORTS | Cricket Bats, Gloves & Gear in Kharar, Punjab",
  defaultDescription:
    "A cricket store in Kharar, Punjab. Cricket bats from SS, TON and Gama, batting gloves, protection, balls, shoes and kit bags.",
  ogImage: "/images/og-cover.svg",
} as const;

export const PAGE_META: Record<string, { title: string; description: string }> = {
  home: {
    title: "KD SPORTS | Cricket Bats, Gloves & Gear in Kharar, Punjab",
    description:
      "A cricket store in Kharar, Punjab. Cricket bats from SS, TON and Gama, batting gloves, protection, balls, shoes and kit bags.",
  },
  shop: {
    title: "Shop Cricket Gear | KD SPORTS",
    description:
      "Browse every cricket bat, glove and piece of kit at KD SPORTS. Filter by range, price and availability.",
  },
  categories: {
    title: "Cricket Ranges | KD SPORTS",
    description:
      "Cricket bats, batting gloves, protection, balls, shoes and kit bags from KD SPORTS, Kharar, Punjab.",
  },
  about: {
    title: "About KD SPORTS | Cricket Store in Kharar, Punjab",
    description:
      "KD SPORTS is a cricket store in Kharar, Punjab, run by Naresh Kumar. Bats, gloves, protection and kit for club and academy players.",
  },
  contact: {
    title: "Contact KD SPORTS | Cricket Store, Kharar",
    description:
      "Get in touch with KD SPORTS, a cricket store in Kharar, SAS Nagar, Punjab. Call +91 90567 89543, or reach us by email or Instagram.",
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
  /** Official logo, reversed (white KD) for the dark UI. */
  logo: "/images/logo.svg",
  /** Official logo in original colours, for light grounds / print. */
  logoLight: "/images/logo-light.svg",
  ogCover: "/images/og-cover.svg",

  hero: {
    /** The shop wall — sign, pads and kit bags. Sits under a heavy scrim. */
    primary: "/images/hero-cricket.jpg",
    mobile: "/images/hero-cricket-mobile.jpg",
  },

  promo: "/images/promo-banner.jpg",
  /** The owner in his own shop — real photograph, EXIF stripped. */
  owner: "/images/owner-naresh.jpg",
  about: "/images/about-store.jpg",

  /**
   * Shop photograph for the About page.
   *
   * Only the proprietor appears anywhere on this site. Two photographs of him
   * with another person were removed on his instruction (2026-09-07) and the
   * files deleted, not just unreferenced — a person who has not agreed to be
   * on a public website should not be sitting in the repo waiting to be
   * re-linked by accident.
   */
  store: {
    counter: "/images/kd-sports-naresh-1.jpg",
  },
  /** The KD Sports sign on the shop wall. */
  brandStatement: "/images/brand-statement.jpg",

  /** Category cards. Every one is a photograph of the owner's own stock. */
  categories: {
    bats: "/images/cat-bats.jpg",          // SS Maximus
    gloves: "/images/cat-gloves.jpg",      // TON IPL Series, gold
    protection: "/images/cat-protection.jpg", // Forma Pro Axis helmet
    balls: "/images/cat-balls.jpg",        // KD Sports branded white ball, in the shop
    footwear: "/images/cat-footwear.jpg",  // New Balance CK 10 R5
    kit: "/images/cat-kit.jpg",            // the kit-bag shelf in the shop
  },

  /**
   * The social grid. These are KD Sports' OWN product photographs, not posts
   * scraped from Instagram — the tiles link out to the profile rather than
   * reproducing what is on it. Swap in chosen shots any time.
   */
  instagram: [
    "/images/social/ig-1.jpg",
    "/images/social/ig-2.jpg",
    "/images/social/ig-3.jpg",
    "/images/social/ig-4.jpg",
    "/images/social/ig-5.jpg",
    "/images/social/ig-6.jpg",
    "/images/social/ig-7.jpg",
    "/images/social/ig-8.jpg",
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
    { label: "Cricket Bats", to: "/shop?category=bats" },
    { label: "Batting Gloves", to: "/shop?category=gloves" },
    { label: "Protection", to: "/shop?category=protection" },
    // Balls and kit bags are carried in the shop but not itemised online, so
    // there is no shop filter to send anyone to. Footwear is listed properly.
    { label: "Cricket Shoes", to: "/shop?category=footwear" },
    { label: "Balls & Kit Bags", to: "/contact" },
    { label: "Everything", to: "/shop" },
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
  "SS bat",
  "TON Thala",
  "Batting gloves",
  "Cricket bat 85cm",
  "Keeping gloves",
  "Kit bag",
] as const;

/**
 * Currency — INR.
 *
 * The compiled product sheet said "NPR", but the owner confirmed on
 * 2026-09-02 that every price listed is **Indian Rupees**, which also matches
 * the GST registration in Kharar, Punjab. The owner's word supersedes the
 * sheet. Change this one constant to change every price on the site.
 */
export const CURRENCY_SYMBOL = "₹";

/**
 * One price formatter, used everywhere. A null price is genuinely unknown —
 * it renders as "Price on request" rather than as a number, and never as 0.
 * en-IN grouping gives the lakh/crore comma pattern Indian shoppers expect
 * (₹13,000 / ₹1,24,000).
 */
export function formatPrice(amount: number | null): string {
  if (amount === null) return "Price on request";
  return `${CURRENCY_SYMBOL}${amount.toLocaleString("en-IN")}`;
}
