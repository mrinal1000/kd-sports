import { IMAGES } from "@/config/site";
import type { Category } from "./types";

/**
 * Sports categories.
 *
 * ⚠️ CONFIRM WITH THE OWNER. The Instagram account could not be read
 * (login-walled) and the handle is not indexed by search, so which
 * disciplines KD SPORTS actually stocks is unknown. These four are the
 * categories named in the brief, structured so unused ones can be deleted in
 * one place — remove a category here and it disappears from the navigation,
 * the home page, the shop filters and the footer at once.
 */
export const CATEGORIES: Category[] = [
  {
    slug: "cricket",
    name: "Cricket",
    tagline: "Bat, ball, pads, everything between",
    description:
      "Willow, leather and protection for club players, academy sides and anyone who takes guard on a Sunday morning.",
    image: IMAGES.categories.cricket,
    subcategories: [
      { slug: "bats", name: "Cricket Bats" },
      { slug: "balls", name: "Cricket Balls" },
      { slug: "gloves", name: "Batting Gloves" },
      { slug: "pads", name: "Batting Pads" },
      { slug: "helmets", name: "Helmets" },
      { slug: "shoes", name: "Cricket Shoes" },
      { slug: "jerseys", name: "Jerseys" },
      { slug: "training", name: "Training Equipment" },
    ],
  },
  {
    slug: "football",
    name: "Football",
    tagline: "For the turf and the tarmac",
    description:
      "Match balls, boots and kit for eleven-a-side, five-a-side and everything played on whatever ground is free.",
    image: IMAGES.categories.football,
    subcategories: [
      { slug: "footballs", name: "Footballs" },
      { slug: "shoes", name: "Football Shoes" },
      { slug: "jerseys", name: "Jerseys" },
      { slug: "training", name: "Training Equipment" },
    ],
  },
  {
    slug: "fitness",
    name: "Fitness & Training",
    tagline: "The work nobody watches",
    description:
      "Resistance, conditioning and recovery gear for the sessions that happen between match days.",
    image: IMAGES.categories.fitness,
    subcategories: [
      { slug: "gym", name: "Gym Accessories" },
      { slug: "training-gear", name: "Training Gear" },
      { slug: "resistance", name: "Resistance Equipment" },
      { slug: "accessories", name: "Fitness Accessories" },
    ],
  },
  {
    slug: "apparel",
    name: "Sports Apparel",
    tagline: "Kit that survives the season",
    description:
      "Jerseys, tracksuits and team wear built for training loads, washing machines and Punjab summers.",
    image: IMAGES.categories.apparel,
    subcategories: [
      { slug: "jerseys", name: "Jerseys" },
      { slug: "tshirts", name: "T-Shirts" },
      { slug: "shorts", name: "Shorts" },
      { slug: "tracksuits", name: "Tracksuits" },
      { slug: "teamwear", name: "Team Wear" },
    ],
  },
];

export const getCategory = (slug: string) =>
  CATEGORIES.find((category) => category.slug === slug);
