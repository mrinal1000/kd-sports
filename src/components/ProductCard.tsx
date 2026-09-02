import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Heart, MessageSquare, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/config/site";
import type { Product } from "@/data/types";
import { useStore } from "@/lib/store";
import { Badge, Rating } from "./ui/primitives";
import { ProductImage } from "./ProductImage";

/** Discount percentage, rounded — only meaningful when both prices exist. */
function discountPercent(product: Product): number | null {
  if (product.price === null || !product.oldPrice || product.oldPrice <= product.price) return null;
  return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
}

export function WishlistButton({
  productId,
  className,
  label = true,
}: {
  productId: string;
  className?: string;
  label?: boolean;
}) {
  const { isWished, toggleWish } = useStore();
  const wished = isWished(productId);
  const [bump, setBump] = useState(false);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleWish(productId);
        setBump(true);
        window.setTimeout(() => setBump(false), 360);
      }}
      aria-pressed={wished}
      aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
      className={`grid place-items-center rounded-sm transition-colors ${className ?? ""}`}
    >
      <Heart
        size={18}
        className={`${bump ? "pop" : ""} ${wished ? "fill-blaze-500 text-blaze-500" : ""}`}
        strokeWidth={2}
      />
      {label && <span className="sr-only">{wished ? "Saved" : "Save"}</span>}
    </button>
  );
}

export function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (product: Product) => void;
}) {
  const { addToCart } = useStore();
  const discount = discountPercent(product);
  const hasSecondImage = product.images.length > 1;

  return (
    <article className="group relative flex h-full flex-col border border-ink-800 bg-ink-900 transition-colors duration-300 hover:border-ink-600">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-850">
        <Link to={`/product/${product.slug}`} tabIndex={-1} aria-hidden="true">
          <ProductImage
            src={product.images[0]}
            alt=""
            className={`size-full object-cover transition-[transform,opacity] duration-500 ease-out group-hover:scale-105 ${
              hasSecondImage ? "group-hover:opacity-0" : ""
            }`}
          />
          {hasSecondImage && (
            <ProductImage
              src={product.images[1]}
              alt=""
              className="absolute inset-0 size-full scale-105 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {discount && <Badge tone="accent">−{discount}%</Badge>}
          {!product.inStock && <Badge tone="dark">Out of stock</Badge>}
          {product.demo && <Badge tone="muted">Demo</Badge>}
        </div>

        <WishlistButton
          productId={product.id}
          className="absolute right-3 top-3 size-10 bg-ink-950/80 text-white backdrop-blur-sm hover:bg-ink-950"
        />

        {/* Actions slide up on hover; on touch they are simply always visible. */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-100 transition-[transform,opacity] duration-300 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          {product.price === null ? (
            // No confirmed price, so there is nothing honest to add to a bag.
            // Send the customer to ask instead.
            <Link
              to="/contact"
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-sm bg-white font-display text-[0.7rem] font-bold uppercase tracking-widest text-ink-950 transition-colors hover:bg-blaze-500 hover:text-white"
            >
              <MessageSquare size={15} />
              Enquire
            </Link>
          ) : (
            <button
              type="button"
              disabled={!product.inStock}
              onClick={() => addToCart(product.id, product.sizes?.[0])}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-sm bg-white font-display text-[0.7rem] font-bold uppercase tracking-widest text-ink-950 transition-colors hover:bg-blaze-500 hover:text-white disabled:pointer-events-none disabled:opacity-50"
            >
              <ShoppingBag size={15} />
              {product.inStock ? "Add to bag" : "Unavailable"}
            </button>
          )}
          {onQuickView && (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              aria-label={`Quick view: ${product.name}`}
              className="grid size-11 flex-none place-items-center rounded-sm bg-ink-950/85 text-white backdrop-blur-sm transition-colors hover:bg-ink-950"
            >
              <Eye size={17} />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 font-display text-[0.68rem] font-bold uppercase tracking-widest text-ink-500">
          {product.category} · {product.subcategory}
        </p>

        <h3 className="mb-2 font-semibold leading-snug text-white">
          <Link to={`/product/${product.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {product.name}
          </Link>
        </h3>

        {typeof product.rating === "number" && (
          <Rating value={product.rating} reviews={product.reviews} className="mb-3" />
        )}

        <div className="mt-auto flex items-baseline gap-2">
          <span
            className={`font-display font-bold text-white ${product.price === null ? "text-base text-ink-300" : "text-xl"}`}
          >
            {formatPrice(product.price)}
          </span>
          {product.price !== null && product.oldPrice && (
            <span className="text-sm text-ink-500 line-through">{formatPrice(product.oldPrice)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
