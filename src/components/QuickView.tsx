import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, X } from "lucide-react";
import { formatPrice } from "@/config/site";
import type { Product } from "@/data/types";
import { useStore } from "@/lib/store";
import { Badge, Rating } from "./ui/primitives";
import { WishlistButton } from "./ProductCard";
import { ProductImage } from "./ProductImage";

/** A fast look at a product without leaving the grid. Escape or the backdrop closes it. */
export function QuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { addToCart } = useStore();
  const [size, setSize] = useState<string | undefined>(undefined);

  useEffect(() => {
    setSize(product?.sizes?.[0]);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[115] grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={`Quick view: ${product.name}`}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative grid max-h-[88vh] w-full max-w-3xl grid-cols-1 overflow-y-auto border border-ink-800 bg-ink-950 sm:grid-cols-2">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-sm bg-ink-950/80 text-white backdrop-blur-sm transition-colors hover:bg-ink-850"
        >
          <X size={20} />
        </button>

        <div className="aspect-[4/5] bg-ink-850">
          <ProductImage src={product.images[0]} alt={product.name} className="size-full object-cover" />
        </div>

        <div className="flex flex-col p-6">
          <p className="mb-2 font-display text-[0.68rem] font-bold uppercase tracking-widest text-ink-500">
            {product.category} · {product.subcategory}
          </p>
          <h2 className="headline mb-3 text-2xl text-white">{product.name}</h2>
          {typeof product.rating === "number" && (
            <Rating value={product.rating} reviews={product.reviews} className="mb-4" />
          )}

          <div className="mb-4 flex items-baseline gap-2.5">
            <span
              className={`font-display font-bold text-white ${product.price === null ? "text-lg text-ink-300" : "text-2xl"}`}
            >
              {formatPrice(product.price)}
            </span>
            {product.price !== null && product.oldPrice && (
              <span className="text-ink-500 line-through">{formatPrice(product.oldPrice)}</span>
            )}
            {product.demo && <Badge tone="muted">Demo</Badge>}
            {!product.inStock && <Badge tone="dark">Out of stock</Badge>}
          </div>

          <p className="mb-5 text-sm leading-relaxed text-ink-300">{product.shortDescription}</p>

          {product.sizes && (
            <fieldset className="mb-5">
              <legend className="mb-2 font-display text-[0.7rem] font-bold uppercase tracking-widest text-ink-400">
                Size
              </legend>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSize(option)}
                    aria-pressed={size === option}
                    className={`rounded-sm border px-3.5 py-2 text-xs font-semibold transition-colors ${
                      size === option
                        ? "border-blaze-500 bg-blaze-500 text-white"
                        : "border-ink-700 text-ink-200 hover:border-white"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <div className="mt-auto flex gap-2">
            {product.price === null ? (
              <Link
                to="/contact"
                onClick={onClose}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-sm bg-blaze-500 font-display text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-blaze-400"
              >
                Ask for a price
              </Link>
            ) : (
              <button
                type="button"
                disabled={!product.inStock}
                onClick={() => {
                  addToCart(product.id, size);
                  onClose();
                }}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-sm bg-blaze-500 font-display text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-blaze-400 disabled:pointer-events-none disabled:opacity-50"
              >
                <ShoppingBag size={16} />
                {product.inStock ? "Add to bag" : "Out of stock"}
              </button>
            )}
            <WishlistButton
              productId={product.id}
              className="size-12 flex-none border border-ink-700 text-white hover:border-white"
            />
          </div>

          <Link
            to={`/product/${product.slug}`}
            onClick={onClose}
            className="mt-3 inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-widest text-ink-300 transition-colors hover:text-white"
          >
            Full details <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
