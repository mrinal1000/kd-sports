import type { Product } from "./types";

/**
 * KD SPORTS catalogue — a cricket store.
 *
 * ── LIVE (demo: false) ────────────────────────────────────────────────────
 * From the owner's product data sheet (products_3, 2026-09-02). Names, brands,
 * prices, sizes and SKUs are AS SUPPLIED; this file is generated from that
 * JSON rather than retyped.
 *
 * Rules from the sheet, enforced here:
 *   • Only status "ready" and "needs_data" are published. The 15 bats the
 *     owner has not yet confirmed are in DRAFT_PRODUCTS at the bottom and are
 *     NOT rendered — the sheet says to stage them until confirmed.
 *   • `price: null` renders "Price on request" and never as 0.
 *   • Null specs are omitted. No willow, grade, weight or grains is invented.
 *   • `brand` is absent where the caption did not state one.
 *   • Real products carry NO star rating — there is no review data, and an
 *     invented rating beside a real price would be a fabrication.
 *
 * ── PHOTOS ────────────────────────────────────────────────────────────────
 * 18 bats now have real photographs, cropped from the owner's own WhatsApp
 * screenshots (the bat tile only — no phone UI, no sender name, no MRP label).
 * Everything else falls back to a placeholder via ProductImage until real
 * photography arrives.
 *
 * ── DEMO (demo: true) ─────────────────────────────────────────────────────
 * The remaining few are layout placeholders, badged "Demo" in the UI.
 */

export const DEMO_CATALOGUE_NOTICE =
  "Cricket bats and batting gloves are real stock with real prices. Items badged Demo are placeholders for layout only.";

/** Placeholder artwork path, used only by the demo entries. */
const img = (n: string) => `/images/products/${n}.svg`;

export const PRODUCTS: Product[] = [
  /* ═══════════ LIVE STOCK — confirmed by the owner ═══════════ */
  {
    id: "gloves-player-edition",
    slug: "batting-gloves-player-edition",
    name: "Batting Gloves - Player Edition",
    category: "gloves",
    subcategory: "batting",
    brand: "KD Sports",
    sku: "KD-GLV-PLR",
    price: 3399,
    images: ["/images/products/batting-gloves-player-edition-1.jpg", "/images/products/batting-gloves-player-edition-2.jpg", "/images/products/batting-gloves-player-edition-3.jpg", "/images/products/batting-gloves-player-edition-4.jpg"],
    shortDescription: "Player Edition batting gloves from KD Sports. White / Navy.",
    description: "Batting gloves stocked at KD Sports. Fit matters more than anything on the label — try a pair on, or tell us your size and we will say what we have.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Brand", value: "KD Sports" },
      { label: "Series", value: "Player Edition" },
      { label: "Colour", value: "White / Navy" },
      { label: "SKU", value: "KD-GLV-PLR" },
    ],
  },
  {
    id: "gloves-test-series",
    slug: "batting-gloves-test-series",
    name: "Batting Gloves - Test Series",
    category: "gloves",
    subcategory: "batting",
    brand: "KD Sports",
    sku: "KD-GLV-TST",
    price: 1600,
    images: ["/images/products/batting-gloves-test-series-1.jpg", "/images/products/batting-gloves-test-series-2.jpg", "/images/products/batting-gloves-test-series-3.jpg"],
    shortDescription: "Test Series batting gloves from KD Sports.",
    description: "Batting gloves stocked at KD Sports. Fit matters more than anything on the label — try a pair on, or tell us your size and we will say what we have.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Brand", value: "KD Sports" },
      { label: "Series", value: "Test Series" },
      { label: "SKU", value: "KD-GLV-TST" },
    ],
  },
  {
    id: "gloves-prestige",
    slug: "batting-gloves-prestige",
    name: "Batting Gloves - Prestige",
    category: "gloves",
    subcategory: "batting",
    brand: "KD Sports",
    sku: "KD-GLV-PRS",
    price: 1500,
    images: ["/images/products/batting-gloves-prestige-1.jpg", "/images/products/batting-gloves-prestige-2.jpg", "/images/products/batting-gloves-prestige-3.jpg"],
    shortDescription: "Prestige batting gloves from KD Sports. White / Navy.",
    description: "Batting gloves stocked at KD Sports. Fit matters more than anything on the label — try a pair on, or tell us your size and we will say what we have.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Brand", value: "KD Sports" },
      { label: "Series", value: "Prestige" },
      { label: "Colour", value: "White / Navy" },
      { label: "SKU", value: "KD-GLV-PRS" },
    ],
  },
  {
    id: "gloves-keeping-cream",
    slug: "keeping-gloves-cream",
    name: "Wicket-Keeping Gloves — Cream",
    category: "gloves",
    subcategory: "keeping",
    brand: "KD Sports",
    sku: "KD-GLV-004",
    price: null,
    images: ["/images/products/gloves-keeping-cream-1.jpg"],
    shortDescription: "Wicket-keeping gloves stocked at KD Sports. Name and price to be confirmed.",
    description: "A pair of keeping gloves in the shop that we have not listed properly yet. The name and price are still to be confirmed — ask and we will tell you exactly what they are.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Brand", value: "KD Sports" },
      { label: "Colour", value: "Cream / White" },
      { label: "SKU", value: "KD-GLV-004" },
    ],
  },
  {
    id: "bat-01",
    slug: "ss-sky-blaster",
    name: "SS Sky Blaster",
    category: "bats",
    subcategory: "willow",
    brand: "SS",
    sku: "KD-BAT-01",
    price: 24000,
    images: ["/images/products/ss-sky-blaster-1.jpg"],
    shortDescription: "SS cricket bat, size 85cm. In stock at KD Sports, Kharar.",
    description: "SS Sky Blaster — in stock at KD Sports, Kharar. Size 85cm. Willow grade, weight and pickup vary bat to bat and are not listed; ask and we will weigh the exact one you are looking at.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Brand", value: "SS" },
      { label: "Size", value: "85cm" },
      { label: "SKU", value: "KD-BAT-01" },
    ],
  },
  {
    id: "bat-02",
    slug: "ton-thala-3-0",
    name: "TON Thala 3.0",
    category: "bats",
    subcategory: "willow",
    brand: "TON",
    sku: "KD-BAT-02",
    price: 29000,
    images: ["/images/products/ton-thala-3-0-1.jpg"],
    shortDescription: "TON cricket bat, size 85cm. In stock at KD Sports, Kharar.",
    description: "TON Thala 3.0 — in stock at KD Sports, Kharar. Size 85cm. Willow grade, weight and pickup vary bat to bat and are not listed; ask and we will weigh the exact one you are looking at.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Brand", value: "TON" },
      { label: "Size", value: "85cm" },
      { label: "SKU", value: "KD-BAT-02" },
    ],
  },
  {
    id: "bat-03",
    slug: "ton-thala-4-0",
    name: "TON Thala 4.0",
    category: "bats",
    subcategory: "willow",
    brand: "TON",
    sku: "KD-BAT-03",
    price: 20000,
    images: ["/images/products/ton-thala-4-0-1.jpg"],
    shortDescription: "TON cricket bat, size 85cm. In stock at KD Sports, Kharar.",
    description: "TON Thala 4.0 — in stock at KD Sports, Kharar. Size 85cm. Willow grade, weight and pickup vary bat to bat and are not listed; ask and we will weigh the exact one you are looking at.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Brand", value: "TON" },
      { label: "Size", value: "85cm" },
      { label: "SKU", value: "KD-BAT-03" },
    ],
  },
  {
    id: "bat-04",
    slug: "tilak-varma-trigger-edition",
    name: "Tilak Varma Trigger Edition",
    category: "bats",
    subcategory: "willow",
    // brand not stated on the caption — deliberately not guessed
    sku: "KD-BAT-04",
    price: 36000,
    images: ["/images/products/tilak-varma-trigger-edition-1.jpg"],
    shortDescription: "Cricket bat, size 82.5cm. In stock at KD Sports, Kharar.",
    description: "Tilak Varma Trigger Edition — in stock at KD Sports, Kharar. Size 82.5cm. Willow grade, weight and pickup vary bat to bat and are not listed; ask and we will weigh the exact one you are looking at.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Size", value: "82.5cm" },
      { label: "SKU", value: "KD-BAT-04" },
    ],
  },
  {
    id: "bat-05",
    slug: "gama-players-qdk",
    name: "Gama Players QDK",
    category: "bats",
    subcategory: "willow",
    brand: "Gama",
    sku: "KD-BAT-05",
    price: 35000,
    images: ["/images/products/gama-players-qdk-1.jpg"],
    shortDescription: "Gama cricket bat, size 85cm. In stock at KD Sports, Kharar.",
    description: "Gama Players QDK — in stock at KD Sports, Kharar. Size 85cm. Willow grade, weight and pickup vary bat to bat and are not listed; ask and we will weigh the exact one you are looking at.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Brand", value: "Gama" },
      { label: "Size", value: "85cm" },
      { label: "SKU", value: "KD-BAT-05" },
    ],
  },
  {
    id: "bat-06",
    slug: "master-1500",
    name: "Master 1500",
    category: "bats",
    subcategory: "willow",
    // brand not stated on the caption — deliberately not guessed
    sku: "KD-BAT-06",
    price: 21000,
    images: ["/images/products/master-1500-1.jpg"],
    shortDescription: "Cricket bat, size 85cm. In stock at KD Sports, Kharar.",
    description: "Master 1500 — in stock at KD Sports, Kharar. Size 85cm. Willow grade, weight and pickup vary bat to bat and are not listed; ask and we will weigh the exact one you are looking at.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Size", value: "85cm" },
      { label: "SKU", value: "KD-BAT-06" },
    ],
  },
  {
    id: "bat-07",
    slug: "ss-orange",
    name: "SS Orange",
    category: "bats",
    subcategory: "willow",
    brand: "SS",
    sku: "KD-BAT-07",
    price: 24000,
    images: ["/images/products/ss-orange-1.jpg"],
    shortDescription: "SS cricket bat, size 85cm. In stock at KD Sports, Kharar.",
    description: "SS Orange — in stock at KD Sports, Kharar. Size 85cm. Willow grade, weight and pickup vary bat to bat and are not listed; ask and we will weigh the exact one you are looking at.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Brand", value: "SS" },
      { label: "Size", value: "85cm" },
      { label: "SKU", value: "KD-BAT-07" },
    ],
  },
  {
    id: "bat-08",
    slug: "master-5000",
    name: "Master 5000",
    category: "bats",
    subcategory: "willow",
    // brand not stated on the caption — deliberately not guessed
    sku: "KD-BAT-08",
    price: 26000,
    images: ["/images/products/master-5000-1.jpg"],
    shortDescription: "Cricket bat, size 85cm. In stock at KD Sports, Kharar.",
    description: "Master 5000 — in stock at KD Sports, Kharar. Size 85cm. Willow grade, weight and pickup vary bat to bat and are not listed; ask and we will weigh the exact one you are looking at.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Size", value: "85cm" },
      { label: "SKU", value: "KD-BAT-08" },
    ],
  },
  {
    id: "bat-09",
    slug: "ss-devils-red",
    name: "SS Devils Red",
    category: "bats",
    subcategory: "willow",
    brand: "SS",
    sku: "KD-BAT-09",
    price: 38000,
    images: ["/images/products/ss-devils-red-1.jpg"],
    shortDescription: "SS cricket bat. In stock at KD Sports, Kharar.",
    description: "SS Devils Red — in stock at KD Sports, Kharar. Willow grade, weight and pickup vary bat to bat and are not listed; ask and we will weigh the exact one you are looking at.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Brand", value: "SS" },
      { label: "SKU", value: "KD-BAT-09" },
    ],
  },
  {
    id: "bat-10",
    slug: "ss-devils-blue",
    name: "SS Devils Blue",
    category: "bats",
    subcategory: "willow",
    brand: "SS",
    sku: "KD-BAT-10",
    price: 25000,
    images: ["/images/products/ss-devils-blue-1.jpg"],
    shortDescription: "SS cricket bat. In stock at KD Sports, Kharar.",
    description: "SS Devils Blue — in stock at KD Sports, Kharar. Willow grade, weight and pickup vary bat to bat and are not listed; ask and we will weigh the exact one you are looking at.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Brand", value: "SS" },
      { label: "SKU", value: "KD-BAT-10" },
    ],
  },
  {
    id: "bat-11",
    slug: "ss-ton-elite",
    name: "SS TON Elite",
    category: "bats",
    subcategory: "willow",
    brand: "TON",
    sku: "KD-BAT-11",
    price: 16200,
    images: ["/images/products/ss-ton-elite-1.jpg"],
    shortDescription: "TON cricket bat. In stock at KD Sports, Kharar.",
    description: "SS TON Elite — in stock at KD Sports, Kharar. Willow grade, weight and pickup vary bat to bat and are not listed; ask and we will weigh the exact one you are looking at.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Brand", value: "TON" },
      { label: "SKU", value: "KD-BAT-11" },
    ],
  },
  {
    id: "bat-12",
    slug: "ss-master-2000",
    name: "SS Master 2000",
    category: "bats",
    subcategory: "willow",
    brand: "SS",
    sku: "KD-BAT-12",
    price: 24000,
    images: ["/images/products/ss-master-2000-1.jpg"],
    shortDescription: "SS cricket bat. In stock at KD Sports, Kharar.",
    description: "SS Master 2000 — in stock at KD Sports, Kharar. Willow grade, weight and pickup vary bat to bat and are not listed; ask and we will weigh the exact one you are looking at.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Brand", value: "SS" },
      { label: "SKU", value: "KD-BAT-12" },
    ],
  },
  {
    id: "bat-13",
    slug: "ss-phantom-pro",
    name: "SS Phantom Pro",
    category: "bats",
    subcategory: "willow",
    brand: "SS",
    sku: "KD-BAT-13",
    price: 13000,
    images: ["/images/products/ss-phantom-pro-1.jpg"],
    shortDescription: "SS cricket bat. In stock at KD Sports, Kharar.",
    description: "SS Phantom Pro — in stock at KD Sports, Kharar. Willow grade, weight and pickup vary bat to bat and are not listed; ask and we will weigh the exact one you are looking at.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Brand", value: "SS" },
      { label: "SKU", value: "KD-BAT-13" },
    ],
  },
  {
    id: "bat-14",
    slug: "ss-jumbo",
    name: "SS Jumbo",
    category: "bats",
    subcategory: "willow",
    brand: "SS",
    sku: "KD-BAT-14",
    price: 28000,
    images: ["/images/products/ss-jumbo-1.jpg"],
    shortDescription: "SS cricket bat. In stock at KD Sports, Kharar.",
    description: "SS Jumbo — in stock at KD Sports, Kharar. Willow grade, weight and pickup vary bat to bat and are not listed; ask and we will weigh the exact one you are looking at.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Brand", value: "SS" },
      { label: "SKU", value: "KD-BAT-14" },
    ],
  },
  {
    id: "bat-15",
    slug: "ss-supremo",
    name: "SS Supremo",
    category: "bats",
    subcategory: "willow",
    brand: "SS",
    sku: "KD-BAT-15",
    price: 20000,
    images: ["/images/products/ss-supremo-1.jpg"],
    shortDescription: "SS cricket bat. In stock at KD Sports, Kharar.",
    description: "SS Supremo — in stock at KD Sports, Kharar. Willow grade, weight and pickup vary bat to bat and are not listed; ask and we will weigh the exact one you are looking at.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Brand", value: "SS" },
      { label: "SKU", value: "KD-BAT-15" },
    ],
  },
  {
    id: "bat-16",
    slug: "ss-skyfire",
    name: "SS Skyfire",
    category: "bats",
    subcategory: "willow",
    brand: "SS",
    sku: "KD-BAT-16",
    price: 16200,
    images: ["/images/products/ss-skyfire-1.jpg"],
    shortDescription: "SS cricket bat. In stock at KD Sports, Kharar.",
    description: "SS Skyfire — in stock at KD Sports, Kharar. Willow grade, weight and pickup vary bat to bat and are not listed; ask and we will weigh the exact one you are looking at.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Brand", value: "SS" },
      { label: "SKU", value: "KD-BAT-16" },
    ],
  },
  {
    id: "bat-17",
    slug: "ss-premium",
    name: "SS Premium",
    category: "bats",
    subcategory: "willow",
    brand: "SS",
    sku: "KD-BAT-17",
    price: 21000,
    images: ["/images/products/ss-premium-1.jpg"],
    shortDescription: "SS cricket bat. In stock at KD Sports, Kharar.",
    description: "SS Premium — in stock at KD Sports, Kharar. Willow grade, weight and pickup vary bat to bat and are not listed; ask and we will weigh the exact one you are looking at.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Brand", value: "SS" },
      { label: "SKU", value: "KD-BAT-17" },
    ],
  },
  {
    id: "bat-18",
    slug: "ss-waves",
    name: "SS Waves",
    category: "bats",
    subcategory: "willow",
    brand: "SS",
    sku: "KD-BAT-18",
    price: 19000,
    images: ["/images/products/ss-waves-1.jpg"],
    shortDescription: "SS cricket bat. In stock at KD Sports, Kharar.",
    description: "SS Waves — in stock at KD Sports, Kharar. Willow grade, weight and pickup vary bat to bat and are not listed; ask and we will weigh the exact one you are looking at.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Brand", value: "SS" },
      { label: "SKU", value: "KD-BAT-18" },
    ],
  },
  {
    id: "bat-19",
    slug: "ss-custom",
    name: "SS Custom",
    category: "bats",
    subcategory: "willow",
    brand: "SS",
    sku: "KD-BAT-19",
    price: 16200,
    images: ["/images/products/ss-custom-1.jpg"],
    shortDescription: "SS cricket bat. In stock at KD Sports, Kharar.",
    description: "SS Custom — in stock at KD Sports, Kharar. Willow grade, weight and pickup vary bat to bat and are not listed; ask and we will weigh the exact one you are looking at.",
    demo: false,
    inStock: true,
    specifications: [
      { label: "Brand", value: "SS" },
      { label: "SKU", value: "KD-BAT-19" },
    ],
  },

  /* ═══════════ DEMO ITEMS — layout placeholders ═══════════ */
  {
    id: "cr-003",
    slug: "leather-match-cricket-ball",
    name: "Leather Match Cricket Ball",
    category: "balls",
    subcategory: "leather",
    price: 950,
    images: [img("ball-1"), img("ball-2")],
    shortDescription: "Four-piece alum-tanned leather, hand-stitched seam.",
    description:
      "A four-piece leather ball with a proud hand-stitched seam that holds its shape through a full innings. Sold singly or by the box for club sides.",
    demo: true,
    rating: 4.5,
    reviews: 41,
    inStock: true,
    specifications: [
      { label: "Construction", value: "Four-piece, hand stitched" },
      { label: "Leather", value: "Alum tanned" },
      { label: "Weight", value: "156 g (5.5 oz)" },
      { label: "Colour", value: "Red" },
    ],
  },
  {
    id: "cr-005",
    slug: "batting-pads-lightweight",
    name: "Lightweight Batting Pads",
    category: "protection",
    subcategory: "pads",
    price: 3200,
    images: [img("pads-1")],
    shortDescription: "High-density foam bolsters, low overall weight for running.",
    description:
      "Protection where the ball actually hits and nothing where it does not, which keeps the weight down for running between the wickets.",
    demo: true,
    rating: 4.3,
    reviews: 19,
    sizes: ["Youth", "Boys", "Mens", "Mens LH"],
    inStock: true,
    specifications: [
      { label: "Facing", value: "High-density foam bolsters" },
      { label: "Straps", value: "Three, hook-and-loop" },
      { label: "Knee roll", value: "Cushioned" },
    ],
  },
  {
    id: "cr-006",
    slug: "cricket-helmet-steel-grille",
    name: "Cricket Helmet with Steel Grille",
    category: "protection",
    subcategory: "helmets",
    price: 3800,
    images: [img("helmet-1"), img("helmet-2")],
    shortDescription: "Adjustable steel grille, ABS shell, moisture-wicking liner.",
    description:
      "An adjustable steel grille set at a proper gap, an ABS shell and a liner that can be pulled out and washed. Fit matters more than anything else with a helmet — come in and try it on.",
    demo: true,
    rating: 4.7,
    reviews: 22,
    sizes: ["Junior", "Small", "Medium", "Large"],
    inStock: true,
    specifications: [
      { label: "Shell", value: "ABS" },
      { label: "Grille", value: "Steel, adjustable" },
      { label: "Liner", value: "Removable, washable" },
    ],
  },
  {
    id: "cr-007",
    slug: "cricket-spikes-shoes",
    name: "Cricket Spike Shoes",
    category: "footwear",
    subcategory: "spikes",
    price: 4600,
    oldPrice: 5400,
    images: [img("shoe-1"), img("shoe-2")],
    shortDescription: "Metal spikes for grass, cushioned midsole for long spells.",
    description:
      "Full metal spikes for grip on grass, with enough midsole to get a fast bowler through a long spell without the heel complaining afterwards.",
    demo: true,
    rating: 4.4,
    reviews: 31,
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    inStock: true,
    featured: true,
    specifications: [
      { label: "Outsole", value: "Metal spikes, replaceable" },
      { label: "Upper", value: "Synthetic with mesh panels" },
      { label: "Best for", value: "Grass wickets" },
    ],
  },
  {
    id: "cr-008",
    slug: "cricket-kit-bag-wheelie",
    name: "Wheelie Cricket Kit Bag",
    category: "kit",
    subcategory: "bags",
    price: 5200,
    images: [img("bag-1")],
    shortDescription: "Full-kit capacity, wheeled, separate boot compartment.",
    description:
      "Enough room for bat, pads, helmet and boots, on wheels, because a full cricket kit is heavier than it looks by the time you reach the ground.",
    demo: true,
    rating: 4.5,
    reviews: 16,
    inStock: false,
    specifications: [
      { label: "Capacity", value: "Full kit plus two bats" },
      { label: "Wheels", value: "Two, moulded" },
      { label: "Compartments", value: "Main, boot, side pocket" },
    ],
  },
];

/**
 * DRAFT — NOT PUBLISHED.
 *
 * 15 bats whose names and prices were read off screenshot captions but have
 * NOT been confirmed by the owner. The data sheet's own instruction is to keep
 * these staged until confirmed, so they are listed here as a checklist rather
 * than rendered anywhere on the site.
 *
 * To publish one: confirm the name and price with the owner, move it into
 * PRODUCTS above with a real photo, and delete its line here.
 *
 *   NAME                               BRAND  PRICE (INR)
  // Storm                              —      13000
  // Master 99                          —      14700
  // Vaibhav Suryavanshi Performance    —      19000
  // TON Glory                          TON    21000
  // Blaster                            EM     15999
  // 360 Aura                           360    64899
  // Nova Blast                         EM     15999
  // Rebel Clear Face                   EM     11600
  // Ravel XP                           EM     9999
  // Evolve                             EM     4899
  // Avenger                            EM     4099
  // 360 Play Burst                     360    5299
  // Quantum Rebel 1000                 EM     3799
  // 360 Bull Ring                      360    5899
  // Quantum Rebel XP                   EM     2899
 */

/** Only prices that actually exist, so the shop filter is not skewed by nulls. */
const KNOWN_PRICES = PRODUCTS.map((p) => p.price).filter((p): p is number => typeof p === "number");

export const PRICE_BOUNDS = {
  min: Math.min(...KNOWN_PRICES),
  max: Math.max(...KNOWN_PRICES),
};
