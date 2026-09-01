import type { Product } from "./types";

/**
 * ⚠️ DEMO CATALOGUE — NOT KD SPORTS' REAL PRODUCTS.
 *
 * Every item below is a generic, category-typical placeholder written so the
 * storefront can be judged as a design. None of it claims to be stock KD
 * SPORTS actually carries, and no real brand is presented as a partner or
 * supplier. Names describe the *kind* of item, not a specific model.
 *
 * Prices, ratings and review counts are illustrative. The site shows a
 * standing "demo catalogue" notice so nobody mistakes them for real figures.
 *
 * TO REPLACE WITH THE REAL CATALOGUE
 *   1. Keep the shape (see data/types.ts) — every screen reads through it.
 *   2. Put photos in public/images/products/ and point `images` at them.
 *   3. Delete DEMO_CATALOGUE_NOTICE below to remove the banner site-wide.
 */

export const DEMO_CATALOGUE_NOTICE =
  "Demo catalogue — product names, prices and ratings are placeholders for layout only.";

const img = (n: string) => `/images/products/${n}.svg`;

export const PRODUCTS: Product[] = [
  /* ---------------- Cricket ---------------- */
  {
    id: "cr-001",
    slug: "english-willow-match-bat",
    name: "English Willow Match Bat",
    category: "cricket",
    subcategory: "bats",
    price: 18500,
    oldPrice: 22000,
    images: [img("bat-1"), img("bat-2"), img("bat-3")],
    shortDescription: "Grade 2 English willow, full profile, ready for match play.",
    description:
      "A full-size English willow bat with a mid-to-low middle and a thick spine — the shape most club batters get on best with. Knocked in and oiled before it leaves the shop, so it is ready for the first innings rather than the fifth.",
    rating: 4.6,
    reviews: 34,
    sizes: ["Short Handle", "Long Handle", "Harrow"],
    inStock: true,
    featured: true,
    specifications: [
      { label: "Willow", value: "English willow, Grade 2" },
      { label: "Weight", value: "1180–1220 g" },
      { label: "Handle", value: "Sarawak cane, semi-oval" },
      { label: "Edge", value: "38–40 mm" },
      { label: "Preparation", value: "Knocked in and oiled" },
    ],
  },
  {
    id: "cr-002",
    slug: "kashmir-willow-club-bat",
    name: "Kashmir Willow Club Bat",
    category: "cricket",
    subcategory: "bats",
    price: 4200,
    oldPrice: 5500,
    images: [img("bat-4"), img("bat-1")],
    shortDescription: "Hard-wearing Kashmir willow for practice and club cricket.",
    description:
      "Kashmir willow takes a beating and keeps going, which makes it the sensible first bat and the sensible net bat. Heavier through the blade than English willow, and considerably kinder on the wallet.",
    rating: 4.2,
    reviews: 58,
    sizes: ["Size 5", "Size 6", "Short Handle"],
    inStock: true,
    featured: true,
    specifications: [
      { label: "Willow", value: "Kashmir willow" },
      { label: "Weight", value: "1200–1260 g" },
      { label: "Handle", value: "Cane with rubber grip" },
      { label: "Best for", value: "Nets, club and school cricket" },
    ],
  },
  {
    id: "cr-003",
    slug: "leather-match-cricket-ball",
    name: "Leather Match Cricket Ball",
    category: "cricket",
    subcategory: "balls",
    price: 950,
    images: [img("ball-1"), img("ball-2")],
    shortDescription: "Four-piece alum-tanned leather, hand-stitched seam.",
    description:
      "A four-piece leather ball with a proud hand-stitched seam that holds its shape through a full innings. Sold singly or by the box for club sides.",
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
    id: "cr-004",
    slug: "batting-gloves-players-grade",
    name: "Players Grade Batting Gloves",
    category: "cricket",
    subcategory: "gloves",
    price: 2400,
    oldPrice: 2900,
    images: [img("gloves-1"), img("gloves-2")],
    shortDescription: "Sheep leather palm with segmented cotton-filled protection.",
    description:
      "Segmented finger protection that lets the hand close properly on the bat handle, with a soft sheep leather palm and towelling across the back for the overs when it is 40 degrees.",
    rating: 4.4,
    reviews: 27,
    sizes: ["Youth", "Small Adult", "Adult", "Adult LH"],
    inStock: true,
    featured: true,
    specifications: [
      { label: "Palm", value: "Sheep leather" },
      { label: "Protection", value: "Segmented, cotton filled" },
      { label: "Wrist", value: "Elasticated with hook-and-loop" },
    ],
  },
  {
    id: "cr-005",
    slug: "batting-pads-lightweight",
    name: "Lightweight Batting Pads",
    category: "cricket",
    subcategory: "pads",
    price: 3200,
    images: [img("pads-1")],
    shortDescription: "High-density foam bolsters, low overall weight for running.",
    description:
      "Protection where the ball actually hits and nothing where it does not, which keeps the weight down for running between the wickets.",
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
    category: "cricket",
    subcategory: "helmets",
    price: 3800,
    images: [img("helmet-1"), img("helmet-2")],
    shortDescription: "Adjustable steel grille, ABS shell, moisture-wicking liner.",
    description:
      "An adjustable steel grille set at a proper gap, an ABS shell and a liner that can be pulled out and washed. Fit matters more than anything else with a helmet — come in and try it on.",
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
    category: "cricket",
    subcategory: "shoes",
    price: 4600,
    oldPrice: 5400,
    images: [img("shoe-1"), img("shoe-2")],
    shortDescription: "Metal spikes for grass, cushioned midsole for long spells.",
    description:
      "Full metal spikes for grip on grass, with enough midsole to get a fast bowler through a long spell without the heel complaining afterwards.",
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
    category: "cricket",
    subcategory: "training",
    price: 5200,
    images: [img("bag-1")],
    shortDescription: "Full-kit capacity, wheeled, separate boot compartment.",
    description:
      "Enough room for bat, pads, helmet and boots, on wheels, because a full cricket kit is heavier than it looks by the time you reach the ground.",
    rating: 4.5,
    reviews: 16,
    inStock: false,
    specifications: [
      { label: "Capacity", value: "Full kit plus two bats" },
      { label: "Wheels", value: "Two, moulded" },
      { label: "Compartments", value: "Main, boot, side pocket" },
    ],
  },

  /* ---------------- Football ---------------- */
  {
    id: "fb-001",
    slug: "match-football-size-5",
    name: "Match Football — Size 5",
    category: "football",
    subcategory: "footballs",
    price: 1650,
    oldPrice: 1999,
    images: [img("football-1"), img("football-2")],
    shortDescription: "Thermal-bonded panels, holds pressure through a season.",
    description:
      "A thermal-bonded match ball that keeps its shape and its pressure — the difference you notice in week six, not week one.",
    rating: 4.5,
    reviews: 44,
    sizes: ["Size 3", "Size 4", "Size 5"],
    inStock: true,
    featured: true,
    specifications: [
      { label: "Construction", value: "Thermal bonded" },
      { label: "Bladder", value: "Butyl" },
      { label: "Surface", value: "Grass and turf" },
    ],
  },
  {
    id: "fb-002",
    slug: "firm-ground-football-boots",
    name: "Firm Ground Football Boots",
    category: "football",
    subcategory: "shoes",
    price: 3900,
    images: [img("boot-1"), img("boot-2")],
    shortDescription: "Moulded studs, textured upper for control in the wet.",
    description:
      "Moulded studs for natural grass and a textured upper that still grips the ball when the pitch is wet.",
    rating: 4.3,
    reviews: 29,
    sizes: ["UK 5", "UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
    inStock: true,
    specifications: [
      { label: "Surface", value: "Firm ground" },
      { label: "Studs", value: "Moulded" },
      { label: "Upper", value: "Textured synthetic" },
    ],
  },
  {
    id: "fb-003",
    slug: "training-cones-set",
    name: "Training Cone Set — 50 Pieces",
    category: "football",
    subcategory: "training",
    price: 899,
    images: [img("cones-1")],
    shortDescription: "Fifty flexible markers with a carry stand.",
    description:
      "Fifty flexible disc markers that survive being trodden on, with a stand so they do not end up loose in the boot of a car.",
    rating: 4.6,
    reviews: 37,
    inStock: true,
    specifications: [
      { label: "Quantity", value: "50 discs" },
      { label: "Material", value: "Flexible PVC" },
      { label: "Includes", value: "Carry stand" },
    ],
  },
  {
    id: "fb-004",
    slug: "goalkeeper-gloves",
    name: "Goalkeeper Gloves",
    category: "football",
    subcategory: "training",
    price: 1450,
    images: [img("gk-1")],
    shortDescription: "Latex palm with finger protection and wrap-around wrist.",
    description:
      "A grippy latex palm, finger spines that can be taken out, and a wrist wrap that actually holds.",
    rating: 4.1,
    reviews: 12,
    sizes: ["7", "8", "9", "10", "11"],
    inStock: true,
    specifications: [
      { label: "Palm", value: "Latex" },
      { label: "Finger protection", value: "Removable spines" },
      { label: "Closure", value: "Wrap-around wrist strap" },
    ],
  },

  /* ---------------- Fitness ---------------- */
  {
    id: "ft-001",
    slug: "resistance-band-set",
    name: "Resistance Band Set",
    category: "fitness",
    subcategory: "resistance",
    price: 1199,
    oldPrice: 1599,
    images: [img("bands-1"), img("bands-2")],
    shortDescription: "Five graded bands with handles, anchor and carry bag.",
    description:
      "Five graded bands that cover everything from rehab to real load, with a door anchor and a bag — the most useful thing you can own if you cannot always get to a gym.",
    rating: 4.5,
    reviews: 63,
    inStock: true,
    featured: true,
    specifications: [
      { label: "Bands", value: "5, graded 10–50 lb" },
      { label: "Includes", value: "Handles, door anchor, ankle straps, bag" },
      { label: "Material", value: "Natural latex" },
    ],
  },
  {
    id: "ft-002",
    slug: "skipping-rope-speed",
    name: "Speed Skipping Rope",
    category: "fitness",
    subcategory: "accessories",
    price: 549,
    images: [img("rope-1")],
    shortDescription: "Ball-bearing handles, adjustable steel cable.",
    description:
      "Ball-bearing handles so the rope turns instead of fighting you, and a cable you can cut to your own height.",
    rating: 4.4,
    reviews: 51,
    inStock: true,
    specifications: [
      { label: "Cable", value: "Coated steel, adjustable" },
      { label: "Handles", value: "Ball bearing" },
      { label: "Length", value: "3 m, cuttable" },
    ],
  },
  {
    id: "ft-003",
    slug: "gym-gloves-training",
    name: "Training Gloves",
    category: "fitness",
    subcategory: "gym",
    price: 799,
    images: [img("gymgloves-1")],
    shortDescription: "Padded palm, breathable back, wrist support.",
    description:
      "Padded where the bar sits, open where your hand needs to breathe, with a wrist wrap for the heavier sets.",
    rating: 4.2,
    reviews: 24,
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    specifications: [
      { label: "Palm", value: "Padded synthetic leather" },
      { label: "Back", value: "Breathable mesh" },
      { label: "Wrist", value: "Adjustable wrap" },
    ],
  },
  {
    id: "ft-004",
    slug: "agility-ladder",
    name: "Agility Ladder — 6 m",
    category: "fitness",
    subcategory: "training-gear",
    price: 749,
    images: [img("ladder-1")],
    shortDescription: "Six metres, twelve adjustable rungs, carry bag.",
    description:
      "Six metres of flat rungs that slide along the strap so you can set the spacing you need, and lie flat instead of tripping people.",
    rating: 4.3,
    reviews: 18,
    inStock: true,
    specifications: [
      { label: "Length", value: "6 m" },
      { label: "Rungs", value: "12, adjustable" },
      { label: "Includes", value: "Carry bag" },
    ],
  },

  /* ---------------- Apparel ---------------- */
  {
    id: "ap-001",
    slug: "team-cricket-jersey",
    name: "Team Cricket Jersey",
    category: "apparel",
    subcategory: "jerseys",
    price: 1299,
    oldPrice: 1699,
    images: [img("jersey-1"), img("jersey-2")],
    shortDescription: "Moisture-wicking polyester, custom names and numbers.",
    description:
      "A lightweight wicking jersey cut for movement, available with names, numbers and a sponsor panel for club and academy sides.",
    rating: 4.4,
    reviews: 38,
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    featured: true,
    specifications: [
      { label: "Fabric", value: "100% polyester, moisture wicking" },
      { label: "Fit", value: "Athletic" },
      { label: "Customisation", value: "Name, number, sponsor panel" },
      { label: "Minimum order", value: "Ask in store for team quantities" },
    ],
  },
  {
    id: "ap-002",
    slug: "training-tshirt",
    name: "Training T-Shirt",
    category: "apparel",
    subcategory: "tshirts",
    price: 699,
    images: [img("tshirt-1"), img("tshirt-2")],
    shortDescription: "Breathable knit that survives daily training and washing.",
    description:
      "The shirt you train in four times a week. Breathable, holds its shape, and does not go transparent after a month of washing.",
    rating: 4.3,
    reviews: 46,
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    specifications: [
      { label: "Fabric", value: "Polyester knit" },
      { label: "Fit", value: "Regular" },
      { label: "Care", value: "Machine wash cold" },
    ],
  },
  {
    id: "ap-003",
    slug: "training-shorts",
    name: "Training Shorts",
    category: "apparel",
    subcategory: "shorts",
    price: 849,
    images: [img("shorts-1")],
    shortDescription: "Zip pockets, elasticated waist, quick drying.",
    description:
      "Zip pockets so your phone stays where you left it, an elasticated waist with a real drawcord, and fabric that dries between sessions.",
    rating: 4.2,
    reviews: 21,
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    specifications: [
      { label: "Fabric", value: "Quick-dry polyester" },
      { label: "Pockets", value: "Two, zipped" },
      { label: "Waist", value: "Elasticated with drawcord" },
    ],
  },
  {
    id: "ap-004",
    slug: "team-tracksuit",
    name: "Team Tracksuit",
    category: "apparel",
    subcategory: "tracksuits",
    price: 2499,
    oldPrice: 2999,
    images: [img("tracksuit-1"), img("tracksuit-2")],
    shortDescription: "Jacket and joggers, warm enough for early-morning training.",
    description:
      "Jacket and joggers for warm-ups, travel and the walk home in December. Available in team colours for squads.",
    rating: 4.6,
    reviews: 25,
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    featured: true,
    specifications: [
      { label: "Includes", value: "Jacket and joggers" },
      { label: "Fabric", value: "Brushed polyester" },
      { label: "Customisation", value: "Team colours and crest" },
    ],
  },
  {
    id: "ap-005",
    slug: "sports-socks-3-pack",
    name: "Sports Socks — 3 Pack",
    category: "apparel",
    subcategory: "teamwear",
    price: 449,
    images: [img("socks-1")],
    shortDescription: "Cushioned sole, arch support, three pairs.",
    description:
      "Cushioned under the heel and the ball of the foot, with an arch band that stops them sliding down inside a boot.",
    rating: 4.1,
    reviews: 33,
    sizes: ["Free size", "UK 6–8", "UK 9–11"],
    inStock: true,
    specifications: [
      { label: "Pack", value: "3 pairs" },
      { label: "Cushioning", value: "Heel and forefoot" },
      { label: "Fabric", value: "Cotton blend" },
    ],
  },
];

export const PRICE_BOUNDS = {
  min: Math.min(...PRODUCTS.map((p) => p.price)),
  max: Math.max(...PRODUCTS.map((p) => p.price)),
};
