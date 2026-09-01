/**
 * Data contract.
 *
 * These interfaces are the shape a future backend must return. Today they are
 * satisfied by the static arrays in this folder; swapping in Supabase,
 * Shopify or a Node API means changing `src/lib/catalog.ts` only — no
 * component reads a data file directly.
 */

export type CategorySlug = "cricket" | "football" | "fitness" | "apparel";

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
  price: number;
  /** Pre-discount price. Omitted when the item is not discounted. */
  oldPrice?: number;
  images: string[];
  shortDescription: string;
  description: string;
  /**
   * DEMO VALUES. These are not real ratings — KD SPORTS has no review data
   * yet. They exist so the UI can be judged, and are surfaced with a demo
   * notice. Replace with real review data before publishing.
   */
  rating: number;
  reviews: number;
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
