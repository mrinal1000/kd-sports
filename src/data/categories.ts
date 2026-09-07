import { IMAGES } from "@/config/site";
import type { Category } from "./types";

/**
 * KD SPORTS is a CRICKET STORE. Nothing else.
 *
 * The categories below are cricket sub-ranges, not different sports. Football,
 * fitness and apparel were removed on the owner's instruction (2026-09-02):
 * "this is cricket store only".
 *
 * Bats, Gloves, Protection and Cricket Shoes hold the owner's real stock, all
 * of it photographed and priced. Cricket Balls and Kit Bags are genuinely
 * carried in the shop but have never been itemised by the supplier, so they
 * have no products to list — their cards say "In store" and point at Contact
 * rather than at a shop filter that would return an empty page.
 *
 * All demo placeholders were deleted on 2026-09-07.
 */
export const CATEGORIES: Category[] = [
  {
    slug: "bats",
    name: "Cricket Bats",
    tagline: "SS, TON, Gama — English willow",
    description:
      "Twenty-six bats in the shop right now, from club willow to the top-end SS and TON players' range. Come in and we will weigh the exact one you are looking at.",
    image: IMAGES.categories.bats,
    subcategories: [
      { slug: "ss", name: "SS" },
      { slug: "ton", name: "TON" },
      { slug: "gama", name: "Gama" },
      { slug: "master", name: "Master" },
    ],
  },
  {
    slug: "gloves",
    name: "Batting Gloves",
    tagline: "Fit first, everything else after",
    description:
      "Batting and keeping gloves. Fit matters more than anything on the label — try a pair on, or tell us your size and we will say what we have.",
    image: IMAGES.categories.gloves,
    subcategories: [
      { slug: "batting", name: "Batting Gloves" },
      { slug: "keeping", name: "Wicket-Keeping Gloves" },
    ],
  },
  {
    slug: "protection",
    name: "Protection",
    tagline: "Pads and helmets",
    description:
      "Batting pads from KD Sports and TON, and Forma helmets. Protection is the one place not to save money — a helmet that fits badly protects badly.",
    image: IMAGES.categories.protection,
    subcategories: [
      { slug: "pads", name: "Batting Pads" },
      { slug: "helmets", name: "Helmets" },
    ],
  },
  {
    slug: "balls",
    name: "Cricket Balls",
    tagline: "Leather, training, tennis",
    description:
      "Match leather balls by the piece or the box, plus training and tennis balls for nets and practice.",
    image: IMAGES.categories.balls,
    subcategories: [
      { slug: "leather", name: "Leather Balls" },
      { slug: "training", name: "Training Balls" },
      { slug: "tennis", name: "Tennis Balls" },
    ],
  },
  {
    slug: "footwear",
    name: "Cricket Shoes",
    tagline: "Asics, Adidas, New Balance, Puma",
    description:
      "Cricket shoes from the brands players actually ask for, from budget trainers to top-end spikes.",
    image: IMAGES.categories.footwear,
    subcategories: [
      { slug: "asics", name: "Asics" },
      { slug: "adidas", name: "Adidas" },
      { slug: "new-balance", name: "New Balance" },
      { slug: "puma", name: "Puma" },
      { slug: "dsc", name: "DSE / DC" },
    ],
  },
  {
    slug: "kit",
    name: "Kit Bags & Accessories",
    tagline: "Carrying it all to the ground",
    description:
      "Kit bags, grips, toe guards and the small things you only remember on match morning.",
    image: IMAGES.categories.kit,
    subcategories: [
      { slug: "bags", name: "Kit Bags" },
      { slug: "grips", name: "Grips & Toe Guards" },
      { slug: "accessories", name: "Accessories" },
    ],
  },
];

export const getCategory = (slug: string) =>
  CATEGORIES.find((category) => category.slug === slug);
