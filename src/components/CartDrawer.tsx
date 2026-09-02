import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Instagram, Mail, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { BUSINESS, formatPrice } from "@/config/site";
import { useStore } from "@/lib/store";

/**
 * Slide-out bag.
 *
 * There is no payment system, so this does not pretend to check out. It shows
 * what is in the bag, totals it honestly, and hands the customer to the two
 * channels that genuinely work today: email and Instagram. A fake "Place
 * order" button would take a real customer's intent and drop it.
 */
export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lines, subtotal, setQuantity, removeFromCart } = useStore();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const orderBody = encodeURIComponent(
    `Hello KD Sports,\n\nI would like to order:\n\n${lines
      .map((line) => `• ${line.product.name}${line.size ? ` (${line.size})` : ""} × ${line.quantity}`)
      .join("\n")}\n\nSubtotal: ${formatPrice(subtotal)}\n\nPlease confirm availability and payment.\n\nThank you.`,
  );

  return (
    <div className={`fixed inset-0 z-[110] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        className={`absolute inset-y-0 right-0 flex w-[min(440px,92vw)] flex-col bg-ink-950 shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink-800 px-5 py-4">
          <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
            Your bag{lines.length > 0 && <span className="text-ink-500"> · {lines.length}</span>}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close bag"
            className="grid size-11 place-items-center rounded-sm text-white transition-colors hover:bg-white/10"
          >
            <X size={22} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <ShoppingBag size={44} className="mb-5 text-ink-700" aria-hidden="true" />
            <p className="font-display text-xl font-bold uppercase tracking-wide text-white">
              Your bag is empty
            </p>
            <p className="mt-2 text-sm text-ink-400">Nothing in here yet. Go and find something.</p>
            <Link
              to="/shop"
              onClick={onClose}
              className="mt-6 rounded-sm bg-blaze-500 px-6 py-3 font-display text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-blaze-400"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="scroll-thin flex-1 overflow-y-auto overscroll-contain">
              {lines.map((line) => (
                <li
                  key={`${line.productId}-${line.size ?? ""}`}
                  className="flex gap-4 border-b border-ink-800 p-5"
                >
                  <Link to={`/product/${line.product.slug}`} onClick={onClose} className="flex-none">
                    <img
                      src={line.product.images[0]}
                      alt={line.product.name}
                      width={90}
                      height={110}
                      loading="lazy"
                      className="h-24 w-20 rounded-xs object-cover"
                    />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/product/${line.product.slug}`}
                      onClick={onClose}
                      className="block text-sm font-semibold text-white hover:text-blaze-400"
                    >
                      {line.product.name}
                    </Link>
                    {line.size && <p className="mt-0.5 text-xs text-ink-400">Size: {line.size}</p>}
                    <p className="mt-1 font-display font-bold text-blaze-400">
                      {formatPrice(line.product.price)}
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center rounded-sm border border-ink-700">
                        <button
                          type="button"
                          onClick={() => setQuantity(line.productId, line.size, line.quantity - 1)}
                          aria-label={`Decrease quantity of ${line.product.name}`}
                          className="grid size-9 place-items-center text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          <Minus size={14} />
                        </button>
                        <span
                          className="min-w-9 text-center font-display text-sm font-bold text-white"
                          aria-live="polite"
                        >
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(line.productId, line.size, line.quantity + 1)}
                          aria-label={`Increase quantity of ${line.product.name}`}
                          className="grid size-9 place-items-center text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(line.productId, line.size)}
                        aria-label={`Remove ${line.product.name} from bag`}
                        className="grid size-9 place-items-center rounded-sm text-ink-500 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <p className="flex-none font-display font-bold text-white">{formatPrice(line.lineTotal)}</p>
                </li>
              ))}
            </ul>

            <div className="border-t border-ink-800 p-5">
              <dl className="mb-4 space-y-2 text-sm">
                <div className="flex justify-between text-ink-300">
                  <dt>Subtotal</dt>
                  <dd className="font-semibold text-white">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-ink-300">
                  <dt>Delivery</dt>
                  <dd className="text-ink-400">Confirmed when you order</dd>
                </div>
                <div className="flex justify-between border-t border-ink-800 pt-2 font-display text-lg font-bold uppercase tracking-wide text-white">
                  <dt>Total</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
              </dl>

              {/* Honest about what does and does not work. */}
              <p className="mb-4 rounded-sm border border-dashed border-ink-600 px-3 py-2.5 text-xs leading-relaxed text-ink-300">
                <strong className="text-white">Online checkout coming soon.</strong> Send your bag to
                KD Sports and we will confirm availability, total and delivery.
              </p>

              <div className="grid gap-2">
                <a
                  href={`mailto:${BUSINESS.contact.email}?subject=${encodeURIComponent("Order enquiry — KD Sports")}&body=${orderBody}`}
                  className="flex h-12 items-center justify-center gap-2 rounded-sm bg-blaze-500 font-display text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-blaze-400"
                >
                  <Mail size={16} /> Send this bag by email
                </a>
                <a
                  href={BUSINESS.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 items-center justify-center gap-2 rounded-sm border border-ink-700 font-display text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-white"
                >
                  <Instagram size={16} /> Message on Instagram
                </a>
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="flex h-11 items-center justify-center font-display text-xs font-bold uppercase tracking-widest text-ink-300 transition-colors hover:text-white"
                >
                  View full bag
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
