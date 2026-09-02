/**
 * Data contract.
 *
 * These interfaces are the shape a future backend must return. Today they are
 * satisfied by the static arrays in this folder; swapping in Supabase,
 * Shopify or a Node API means changing `src/lib/catalog.ts` only — no
 * component reads a data file directly.
 */

/**
 * KD Sports is a cricket store, so these are cricket sub-ranges rather than
 * different sports. Football, fitness and apparel were removed on the owner's
 * instruction (2026-09-02).
 */
export type CategorySlug =
  | "bats"
  | "gloves"
  | "protection"
  | "balls"
  | "footwear"
  | "kit";

export interface Subcategory {
  slug: string;
  name: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  image: string;
  subcategories: Subcategory[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  subcategory: string;
  /** Brand of the item itself, where relevant. Never a claim of partnership. */
  brand?: string;
  /** Stock code, where the owner supplied one. */
  sku?: string;
  /**
   * NULL means the price is genuinely not known yet — the UI shows
   * "Price on request" and routes to an enquiry. Never coerce null to 0.
   */
  price: number | null;
  /** Pre-discount price. Omitted when the item is not discounted. */
  oldPrice?: number;
  images: string[];
  shortDescription: string;
  description: string;
  /**
   * TRUE when this whole record is placeholder content invented for layout.
   * FALSE for products supplied by the owner. The UI badges demo items and
   * only shows the demo-catalogue notice where one is present, so real stock
   * is never tarred with the same brush.
   */
  demo: boolean;
  /**
   * Ratings are DEMO ONLY and are omitted entirely on real products — KD
   * Sports has no review data, so a real bat must not carry an invented star
   * rating next to its real price.
   */
  rating?: number;
  reviews?: number;
  sizes?: string[];
  inStock: boolean;
  featured?: boolean;
  specifications: ProductSpec[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
}

/* ------------------------------------------------------------------ *
 * Cart & wishlist
 * ------------------------------------------------------------------ */

export interface CartLine {
  productId: string;
  size?: string;
  quantity: number;
}

export interface CartLineView extends CartLine {
  product: Product;
  lineTotal: number;
}

/* ------------------------------------------------------------------ *
 * Shop filtering — the query shape the shop page works in, and the one a
 * real API would eventually receive.
 * ------------------------------------------------------------------ */

export type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

export interface CatalogQuery {
  search?: string;
  category?: CategorySlug | "all";
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sort?: SortKey;
}
