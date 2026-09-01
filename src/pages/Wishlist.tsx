import { Heart } from "lucide-react";
import { PAGE_META } from "@/config/site";
import { getProductById } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { ButtonLink } from "@/components/ui/primitives";
import { Seo } from "@/components/ui/Seo";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";

export function Wishlist() {
  const { wishlist } = useStore();
  const items = wishlist.flatMap((id) => {
    const product = getProductById(id);
    return product ? [product] : [];
  });

  return (
    <>
      <Seo {...PAGE_META.wishlist} />
      <PageHeader
        eyebrow="Saved"
        title="Your wishlist"
        lede="Gear you have set aside. Saved in this browser only."
        crumbs={[{ label: "Wishlist" }]}
      />

      <div className="container-kd py-12 md:py-16">
        {items.length === 0 ? (
          <div className="border border-dashed border-ink-700 px-6 py-24 text-center">
            <Heart size={44} className="mx-auto mb-5 text-ink-700" aria-hidden="true" />
            <h2 className="headline text-2xl text-white">Nothing saved yet</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm text-ink-400">
              Tap the heart on any product to keep it here while you decide.
            </p>
            <ButtonLink to="/shop" className="mt-7">
              Browse the shop
            </ButtonLink>
          </div>
        ) : (
          <>
            <p className="mb-8 text-sm text-ink-400" aria-live="polite">
              {items.length} {items.length === 1 ? "item" : "items"} saved
            </p>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Wishlist;
