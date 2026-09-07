import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { PAGE_META, formatPrice } from "@/config/site";
import { CATEGORIES } from "@/data/categories";
import { PRICE_BOUNDS } from "@/data/products";
import type { CategorySlug, Product, SortKey } from "@/data/types";
import { queryProducts } from "@/lib/catalog";
import { Button, Reveal } from "@/components/ui/primitives";
import { Seo } from "@/components/ui/Seo";
import { ProductCard } from "@/components/ProductCard";
import { QuickView } from "@/components/QuickView";
import { PageHeader } from "@/components/PageHeader";

const SORTS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "New arrivals" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Best rated" },
];

const PAGE_SIZE = 8;

export function Shop() {
  /**
   * Filters live in the URL, not in component state.
   *
   * That makes a filtered view shareable, bookmarkable and survivable across a
   * refresh — and it is the shape a server-side catalogue would want anyway.
   */
  const [params, setParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const search = params.get("search") ?? "";
  const category = (params.get("category") ?? "all") as CategorySlug | "all";
  const sort = (params.get("sort") ?? "featured") as SortKey;
  const maxPrice = Number(params.get("maxPrice") ?? PRICE_BOUNDS.max);
  const inStockOnly = params.get("inStock") === "1";

  /**
   * Only send maxPrice when the slider has actually been narrowed.
   *
   * A product with no confirmed price is excluded from a price-filtered
   * result (it cannot be claimed to sit inside a band). The slider defaults to
   * the top of the range, so passing it unconditionally silently hid every
   * unpriced item from the shop and from search. At full range there is no
   * price filter, so none is sent.
   */
  const priceFiltered = maxPrice < PRICE_BOUNDS.max;

  const results = useMemo(
    () =>
      queryProducts({
        search,
        category,
        maxPrice: priceFiltered ? maxPrice : undefined,
        inStockOnly,
        sort,
      }),
    [search, category, maxPrice, priceFiltered, inStockOnly, sort],
  );

  // A changed filter should start the list again from the top.
  useEffect(() => setVisible(PAGE_SIZE), [search, category, maxPrice, inStockOnly, sort]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  function update(key: string, value: string | null) {
    const next = new URLSearchParams(params);
    if (value === null || value === "" || value === "all") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  }

  const activeFilters =
    (category !== "all" ? 1 : 0) + (inStockOnly ? 1 : 0) + (priceFiltered ? 1 : 0);

  const filters = (
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 font-display text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white">
          Range
        </h3>
        <ul className="space-y-1">
          {[{ slug: "all", name: "All cricket gear" }, ...CATEGORIES].map((item) => (
            <li key={item.slug}>
              <button
                type="button"
                onClick={() => update("category", item.slug)}
                aria-pressed={category === item.slug}
                className={`w-full rounded-sm px-3 py-2 text-left text-sm transition-colors ${
                  category === item.slug
                    ? "bg-blaze-500 font-semibold text-white"
                    : "text-ink-300 hover:bg-ink-800 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-3 font-display text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white">
          Max price
        </h3>
        <input
          type="range"
          min={PRICE_BOUNDS.min}
          max={PRICE_BOUNDS.max}
          step={100}
          value={maxPrice}
          onChange={(event) => update("maxPrice", event.target.value)}
          aria-label={`Maximum price, currently ${formatPrice(maxPrice)}`}
          className="w-full accent-blaze-500"
        />
        <div className="mt-2 flex justify-between text-xs text-ink-400">
          <span>{formatPrice(PRICE_BOUNDS.min)}</span>
          <span className="font-semibold text-white">{formatPrice(maxPrice)}</span>
        </div>
        {priceFiltered && (
          <p className="mt-2 text-xs leading-relaxed text-ink-500">
            Items with no listed price are hidden while a price filter is on.
          </p>
        )}
      </div>

      <div>
        <h3 className="mb-3 font-display text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white">
          Availability
        </h3>
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-300">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(event) => update("inStock", event.target.checked ? "1" : null)}
            className="size-4 accent-blaze-500"
          />
          In stock only
        </label>
      </div>

      {activeFilters > 0 && (
        <Button variant="outline" size="sm" onClick={() => setParams({}, { replace: true })} className="w-full">
          Clear filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      <Seo {...PAGE_META.shop} />
      <PageHeader
        eyebrow="Shop"
        title="All gear"
        lede="Everything in one place. Filter it down until you find what you came for."
      />

      <div className="container-kd py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[248px_1fr]">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">{filters}</div>
          </aside>

          <div className="min-w-0">
            {/* Toolbar */}
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search
                  size={17}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => update("search", event.target.value)}
                  placeholder="Search gear…"
                  aria-label="Search products"
                  className="h-12 w-full rounded-sm border border-ink-700 bg-ink-900 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-ink-500 focus:border-blaze-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="inline-flex h-12 items-center gap-2 rounded-sm border border-ink-700 px-4 text-sm font-semibold text-white transition-colors hover:border-white lg:hidden"
                >
                  <SlidersHorizontal size={16} />
                  Filters
                  {activeFilters > 0 && (
                    <span className="grid size-5 place-items-center rounded-full bg-blaze-500 text-[0.65rem] font-bold">
                      {activeFilters}
                    </span>
                  )}
                </button>

                <label className="sr-only" htmlFor="sort">
                  Sort products
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(event) => update("sort", event.target.value)}
                  className="h-12 rounded-sm border border-ink-700 bg-ink-900 px-3 text-sm text-white outline-none transition-colors focus:border-blaze-500"
                >
                  {SORTS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="mb-6 text-sm text-ink-400" aria-live="polite">
              {results.length} {results.length === 1 ? "product" : "products"}
              {search && <> for &ldquo;{search}&rdquo;</>}
            </p>

            {results.length === 0 ? (
              <div className="border border-dashed border-ink-700 px-6 py-20 text-center">
                <p className="headline text-2xl text-white">Nothing matches those filters</p>
                <p className="mx-auto mt-3 max-w-md text-sm text-ink-400">
                  This is a demo catalogue and does not yet contain everything KD Sports stocks.
                  Try widening the filters, or ask us directly.
                </p>
                <Button className="mt-6" onClick={() => setParams({}, { replace: true })}>
                  Clear all filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                  {results.slice(0, visible).map((product, index) => (
                    <Reveal key={product.id} delay={(index % 4) * 60}>
                      <ProductCard product={product} onQuickView={setQuickView} />
                    </Reveal>
                  ))}
                </div>

                {visible < results.length && (
                  <div className="mt-12 text-center">
                    <Button variant="outline" size="lg" onClick={() => setVisible((n) => n + PAGE_SIZE)}>
                      Load more ({results.length - visible} left)
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[110] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-black/70" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-lg border-t border-ink-700 bg-ink-950 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">Filters</h2>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close filters"
                className="grid size-11 place-items-center rounded-sm text-white hover:bg-white/10"
              >
                <X size={22} />
              </button>
            </div>
            {filters}
            <Button className="mt-8 w-full" size="lg" onClick={() => setDrawerOpen(false)}>
              Show {results.length} {results.length === 1 ? "product" : "products"}
            </Button>
          </div>
        </div>
      )}

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </>
  );
}

export default Shop;
