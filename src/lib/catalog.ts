import { PRODUCTS } from "@/data/products";
import type { CatalogQuery, Product } from "@/data/types";

/**
 * Catalogue service.
 *
 * THE SEAM FOR A REAL BACKEND. Every screen reads products through these
 * functions, never by importing data/products.ts directly. To move to
 * Supabase, Shopify, WooCommerce or a Node API, change the bodies here to
 * async fetches and update the call sites to await — no component's markup
 * changes, because the shapes in data/types.ts stay the same.
 *
 * They are deliberately synchronous today: there is no network, and
 * pretending otherwise would add loading states that never resolve to
 * anything real.
 */

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export function getFeatured(limit = 8): Product[] {
  return PRODUCTS.filter((product) => product.featured).slice(0, limit);
}

export function getRelated(product: Product, limit = 4): Product[] {
  const sameSub = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category && p.subcategory === product.subcategory,
  );
  const sameCat = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category && p.subcategory !== product.subcategory,
  );
  return [...sameSub, ...sameCat].slice(0, limit);
}

export function countByCategory(slug: string): number {
  return PRODUCTS.filter((product) => product.category === slug).length;
}

/** Free-text match across name, category, subcategory, brand and description. */
function matchesSearch(product: Product, term: string): boolean {
  const haystack = [
    product.name,
    product.category,
    product.subcategory,
    product.brand ?? "",
    product.shortDescription,
  ]
    .join(" ")
    .toLowerCase();
  return term
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

export function queryProducts(query: CatalogQuery): Product[] {
  let results = [...PRODUCTS];

  if (query.search?.trim()) {
    results = results.filter((product) => matchesSearch(product, query.search!.trim()));
  }
  if (query.category && query.category !== "all") {
    results = results.filter((product) => product.category === query.category);
  }
  // A product with no confirmed price cannot be claimed to fall inside a price
  // band, so it is excluded from a price-filtered result rather than guessed at.
  if (typeof query.minPrice === "number") {
    results = results.filter((product) => product.price !== null && product.price >= query.minPrice!);
  }
  if (typeof query.maxPrice === "number") {
    results = results.filter((product) => product.price !== null && product.price <= query.maxPrice!);
  }
  if (query.inStockOnly) {
    results = results.filter((product) => product.inStock);
  }

  switch (query.sort) {
    // Unpriced items sort to the end either way — they have no position on a
    // price axis, so they should not lead the list in either direction.
    case "price-asc":
      results.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
      break;
    case "price-desc":
      results.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
      break;
    case "rating":
      results.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
    case "newest":
      results.reverse();
      break;
    case "featured":
    default:
      results.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }

  return results;
}

/** Quick suggestions for the search overlay. */
export function suggest(term: string, limit = 6): Product[] {
  if (!term.trim()) return [];
  return PRODUCTS.filter((product) => matchesSearch(product, term)).slice(0, limit);
}
