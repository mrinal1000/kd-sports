import { IMAGES } from "@/config/site";
import type { Category } from "./types";

/**
 * KD SPORTS is a CRICKET STORE. Nothing else.
 *
 * The categories below are cricket sub-ranges, not different sports. Football,
 * fitness and apparel were removed on the owner's instruction (2026-09-02):
 * "this is cricket store only".
 *
 * Bats and Gloves hold the owner's real stock. The rest hold demo placeholders
 * until real products arrive — Helmets is listed because the owner has said
 * they are coming, and it renders as "coming soon" rather than pretending to
 * have stock.
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
