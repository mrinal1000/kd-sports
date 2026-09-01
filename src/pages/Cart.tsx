import { Link } from "react-router-dom";
import { Instagram, Mail, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { BUSINESS, PAGE_META, formatINR } from "@/config/site";
import { useStore } from "@/lib/store";
import { Button, ButtonAnchor, ButtonLink } from "@/components/ui/primitives";
import { Seo } from "@/components/ui/Seo";
import { PageHeader } from "@/components/PageHeader";

export function Cart() {
  const { lines, subtotal, setQuantity, removeFromCart, clearCart } = useStore();

  // The bag, written out as an email body. This is the actual order channel
  // until a payment system exists — so it needs to contain everything the
  // shop would need to reply with a total.
  const orderBody = encodeURIComponent(
    "Hello KD Sports,\n\nI would like to order:\n\n" +
      lines
        .map(
          (line) =>
            "• " +
            line.product.name +
            (line.size ? " (" + line.size + ")" : "") +
            " x " +
            line.quantity +
            " — " +
            formatINR(line.lineTotal),
        )
        .join("\n") +
      "\n\nSubtotal: " +
      formatINR(subtotal) +
      "\n\nPlease confirm availability, total and delivery.\n\nThank you.",
  );

  return (
    <>
      <Seo {...PAGE_META.cart} />
      <PageHeader
        eyebrow="Bag"
        title="Your bag"
        lede="Check it over, then send it to us to confirm."
        crumbs={[{ label: "Bag" }]}
      />

      <div className="container-kd py-12 md:py-16">
        {lines.length === 0 ? (
          <div className="border border-dashed border-ink-700 px-6 py-24 text-center">
            <ShoppingBag size={44} className="mx-auto mb-5 text-ink-700" aria-hidden="true" />
            <h2 className="headline text-2xl text-white">Your bag is empty</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm text-ink-400">
              Once you add something it will stay here, even if you close the tab.
            </p>
            <ButtonLink to="/shop" className="mt-7">
              Start shopping
            </ButtonLink>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <ul className="border-t border-ink-800">
                {lines.map((line) => (
                  <li
                    key={line.productId + "-" + (line.size ?? "")}
                    className="flex gap-4 border-b border-ink-800 py-6 sm:gap-5"
                  >
                    <Link to={"/product/" + line.product.slug} className="flex-none">
                      <img
                        src={line.product.images[0]}
                        alt={line.product.name}
                        width={140}
                        height={170}
                        loading="lazy"
                        className="h-32 w-24 object-cover sm:h-40 sm:w-32"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="mb-1 font-display text-[0.68rem] font-bold uppercase tracking-widest text-ink-500">
                        {line.product.category}
                      </p>
                      <h2 className="text-base font-semibold text-white sm:text-lg">
                        <Link to={"/product/" + line.product.slug} className="hover:text-blaze-400">
                          {line.product.name}
                        </Link>
                      </h2>
                      {line.size && <p className="mt-1 text-sm text-ink-400">Size: {line.size}</p>}
                      <p className="mt-2 font-display text-lg font-bold text-white">
                        {formatINR(line.product.price)}
                      </p>

                      <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                        <div className="flex items-center rounded-sm border border-ink-700">
                          <button
                            type="button"
                            onClick={() => setQuantity(line.productId, line.size, line.quantity - 1)}
                            aria-label={"Decrease quantity of " + line.product.name}
                            className="grid size-10 place-items-center text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
                          >
                            <Minus size={15} />
                          </button>
                          <span
                            className="min-w-10 text-center font-display font-bold text-white"
                            aria-live="polite"
                          >
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(line.productId, line.size, line.quantity + 1)}
                            aria-label={"Increase quantity of " + line.product.name}
                            className="grid size-10 place-items-center text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
                          >
                            <Plus size={15} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(line.productId, line.size)}
                          className="inline-flex items-center gap-1.5 text-sm text-ink-400 transition-colors hover:text-white"
                        >
                          <Trash2 size={15} /> Remove
                        </button>
                      </div>
                    </div>

                    <p className="hidden flex-none font-display text-lg font-bold text-white sm:block">
                      {formatINR(line.lineTotal)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink to="/shop" variant="outline" size="sm">
                  Continue shopping
                </ButtonLink>
                <Button variant="ghost" size="sm" onClick={clearCart}>
                  Empty bag
                </Button>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="border border-ink-800 bg-ink-900 p-6">
                <h2 className="headline mb-5 text-xl text-white">Summary</h2>

                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between text-ink-300">
                    <dt>Subtotal</dt>
                    <dd className="font-semibold text-white">{formatINR(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between text-ink-300">
                    <dt>Estimated delivery</dt>
                    <dd className="text-ink-400">Confirmed on order</dd>
                  </div>
                  <div className="flex justify-between border-t border-ink-800 pt-3 font-display text-xl font-bold uppercase text-white">
                    <dt>Total</dt>
                    <dd>{formatINR(subtotal)}</dd>
                  </div>
                </dl>

                <p className="mt-5 rounded-sm border border-dashed border-ink-600 px-4 py-3 text-xs leading-relaxed text-ink-300">
                  <strong className="text-white">Online checkout coming soon.</strong> There is no
                  payment system on this site yet. Send your bag across and KD Sports will confirm
                  availability, the final total and delivery.
                </p>

                <div className="mt-5 grid gap-2">
                  <ButtonAnchor
                    size="lg"
                    href={
                      "mailto:" +
                      BUSINESS.contact.email +
                      "?subject=" +
                      encodeURIComponent("Order enquiry — KD Sports") +
                      "&body=" +
                      orderBody
                    }
                  >
                    <Mail size={17} /> Send bag by email
                  </ButtonAnchor>
                  <ButtonAnchor
                    variant="outline"
                    size="lg"
                    href={BUSINESS.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram size={17} /> Message on Instagram
                  </ButtonAnchor>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
