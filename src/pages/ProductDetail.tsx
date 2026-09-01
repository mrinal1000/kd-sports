import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Instagram,
  Mail,
  Minus,
  Package,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { BUSINESS, formatINR } from "@/config/site";
import { DEMO_CATALOGUE_NOTICE } from "@/data/products";
import { getProductBySlug, getRelated } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { Badge, Button, ButtonAnchor, Rating, Reveal } from "@/components/ui/primitives";
import { Seo } from "@/components/ui/Seo";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard, WishlistButton } from "@/components/ProductCard";
import { NotFound } from "./NotFound";

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  const { addToCart } = useStore();
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setActiveImage(0);
    setQuantity(1);
    setSize(product?.sizes?.[0]);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [product]);

  if (!product) return <NotFound />;

  const related = getRelated(product, 4);
  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  return (
    <>
      <Seo
        title={`${product.name} | KD SPORTS`}
        description={product.shortDescription}
      />

      <PageHeader
        eyebrow={product.category}
        title={product.name}
        crumbs={[
          { label: "Shop", to: "/shop" },
          { label: product.category, to: `/shop?category=${product.category}` },
          { label: product.name },
        ]}
      />

      <div className="container-kd py-12 md:py-16">
        <DemoNotice message={DEMO_CATALOGUE_NOTICE} className="mb-10" />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ── Gallery ─────────────────────────────────────────────── */}
          <div>
            <div className="relative aspect-[4/5] overflow-hidden bg-ink-850">
              <img
                key={activeImage}
                src={product.images[activeImage]}
                alt={`${product.name} — view ${activeImage + 1} of ${product.images.length}`}
                width={900}
                height={1100}
                fetchPriority="high"
                className="size-full object-cover"
              />
              {discount && (
                <Badge tone="accent" className="absolute left-4 top-4">
                  −{discount}%
                </Badge>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`Show image ${index + 1}`}
                    aria-pressed={activeImage === index}
                    className={`aspect-square overflow-hidden border-2 transition-colors ${
                      activeImage === index ? "border-blaze-500" : "border-ink-800 hover:border-ink-600"
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      width={200}
                      height={200}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Buy panel ───────────────────────────────────────────── */}
          <div>
            <p className="mb-2 font-display text-[0.7rem] font-bold uppercase tracking-widest text-ink-500">
              {product.category} · {product.subcategory}
            </p>
            <h2 className="headline mb-4 text-3xl text-white md:text-4xl">{product.name}</h2>

            <Rating value={product.rating} reviews={product.reviews} className="mb-5" />

            <div className="mb-6 flex flex-wrap items-baseline gap-3">
              <span className="font-display text-4xl font-bold text-white">{formatINR(product.price)}</span>
              {product.oldPrice && (
                <span className="text-lg text-ink-500 line-through">{formatINR(product.oldPrice)}</span>
              )}
              {product.inStock ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ok">
                  <Check size={15} strokeWidth={3} /> In stock
                </span>
              ) : (
                <Badge tone="dark">Out of stock</Badge>
              )}
            </div>

            <p className="mb-7 leading-relaxed text-ink-300">{product.description}</p>

            {product.sizes && (
              <fieldset className="mb-6">
                <legend className="mb-3 font-display text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white">
                  Size
                </legend>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSize(option)}
                      aria-pressed={size === option}
                      className={`min-w-16 rounded-sm border px-4 py-2.5 text-sm font-semibold transition-colors ${
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

            <div className="mb-6">
              <p className="mb-3 font-display text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white">
                Quantity
              </p>
              <div className="inline-flex items-center rounded-sm border border-ink-700">
                <button
                  type="button"
                  onClick={() => setQuantity((n) => Math.max(1, n - 1))}
                  aria-label="Decrease quantity"
                  className="grid size-12 place-items-center text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Minus size={16} />
                </button>
                <span className="min-w-14 text-center font-display text-lg font-bold text-white" aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((n) => Math.min(99, n + 1))}
                  aria-label="Increase quantity"
                  className="grid size-12 place-items-center text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="mb-4 flex gap-3">
              <Button
                size="lg"
                disabled={!product.inStock}
                onClick={() => addToCart(product.id, size, quantity)}
                className="flex-1"
              >
                <ShoppingBag size={18} />
                {product.inStock ? "Add to bag" : "Out of stock"}
              </Button>
              <WishlistButton
                productId={product.id}
                className="size-14 flex-none border border-ink-700 text-white hover:border-white"
              />
            </div>

            {/* "Buy now" cannot take a payment, so it does the honest
                equivalent: opens an email with the order already written. */}
            <ButtonAnchor
              variant="outline"
              size="lg"
              className="w-full"
              href={`mailto:${BUSINESS.contact.email}?subject=${encodeURIComponent(
                `Order: ${product.name}`,
              )}&body=${encodeURIComponent(
                `Hello KD Sports,\n\nI would like to order:\n\n• ${product.name}${
                  size ? ` (${size})` : ""
                } × ${quantity}\n\nPlease confirm availability, total and delivery.\n\nThank you.`,
              )}`}
            >
              <Mail size={17} />
              Buy now — enquire by email
            </ButtonAnchor>

            <p className="mt-3 text-xs leading-relaxed text-ink-500">
              Online payment is not set up yet. Orders are confirmed directly with KD Sports by
              email or on{" "}
              <a
                href={BUSINESS.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blaze-400 hover:underline"
              >
                Instagram
              </a>
              .
            </p>

            {/* Delivery / returns — stated as unconfirmed rather than invented. */}
            <div className="mt-8 grid gap-3 border-t border-ink-800 pt-8 sm:grid-cols-3">
              <InfoTile icon={<Truck size={18} />} title="Delivery" body="Charges and timing confirmed when you order." />
              <InfoTile icon={<RotateCcw size={18} />} title="Returns" body="Return policy to be confirmed by KD Sports." />
              <InfoTile icon={<ShieldCheck size={18} />} title="Genuine goods" body="Sold by a GST-registered business." />
            </div>
          </div>
        </div>

        {/* ── Specifications ────────────────────────────────────────── */}
        <section className="mt-16 md:mt-24" aria-labelledby="specs">
          <h2 id="specs" className="headline mb-6 text-2xl text-white md:text-3xl">
            <span className="slash" aria-hidden="true" />
            Specifications
          </h2>
          <div className="overflow-hidden border border-ink-800">
            <table className="w-full text-sm">
              <caption className="sr-only">Specifications for {product.name}</caption>
              <tbody>
                {product.specifications.map((spec, index) => (
                  <tr key={spec.label} className={index % 2 ? "bg-ink-900/50" : ""}>
                    <th scope="row" className="w-2/5 px-5 py-3.5 text-left font-semibold text-ink-300">
                      {spec.label}
                    </th>
                    <td className="px-5 py-3.5 text-white">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Related ───────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-16 md:mt-24" aria-labelledby="related">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 id="related" className="headline text-2xl text-white md:text-3xl">
                <span className="slash" aria-hidden="true" />
                You might also need
              </h2>
              <Link
                to={`/shop?category=${product.category}`}
                className="inline-flex flex-none items-center gap-1.5 font-display text-xs font-bold uppercase tracking-widest text-ink-300 transition-colors hover:text-white"
              >
                All {product.category} <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {related.map((item, index) => (
                <Reveal key={item.id} delay={index * 60}>
                  <ProductCard product={item} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Contact strip */}
        <section className="mt-16 border border-ink-800 bg-ink-900 p-8 text-center md:mt-24">
          <Package size={30} className="mx-auto mb-4 text-blaze-400" aria-hidden="true" />
          <h2 className="headline text-2xl text-white">Want something not listed?</h2>
          <p className="mx-auto mt-3 max-w-lg text-ink-300">
            Team orders, bulk kit and items outside this catalogue — ask, and we will tell you
            what we can source.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonAnchor href={`mailto:${BUSINESS.contact.email}`}>
              <Mail size={16} /> Email us
            </ButtonAnchor>
            <ButtonAnchor
              variant="outline"
              href={BUSINESS.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={16} /> Instagram
            </ButtonAnchor>
          </div>
        </section>
      </div>
    </>
  );
}

function InfoTile({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div>
      <span className="mb-2 inline-block text-blaze-400" aria-hidden="true">
        {icon}
      </span>
      <p className="font-display text-sm font-bold uppercase tracking-wide text-white">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-ink-400">{body}</p>
    </div>
  );
}

export default ProductDetail;
