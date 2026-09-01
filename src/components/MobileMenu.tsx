import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronRight, Heart, Instagram, Mail, Search, X } from "lucide-react";
import { BUSINESS, IMAGES, NAV_LINKS } from "@/config/site";
import { CATEGORIES } from "@/data/categories";

/**
 * Full-height mobile drawer.
 *
 * Not a squashed desktop nav: it gives each destination a full-width touch
 * target, lists the categories directly rather than hiding them a level down,
 * and puts contact within reach — the two things someone on a phone actually
 * wants are "what do you sell" and "how do I reach you".
 */
export function MobileMenu({
  open,
  onClose,
  onOpenSearch,
}: {
  open: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[110] lg:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`absolute inset-y-0 left-0 flex w-[min(370px,88vw)] flex-col bg-ink-950 shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink-800 px-5 py-4">
          <img src={IMAGES.logo} alt="KD Sports" width={200} height={64} className="h-9 w-auto" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-11 place-items-center rounded-sm text-white transition-colors hover:bg-white/10"
          >
            <X size={22} />
          </button>
        </div>

        <div className="scroll-thin flex-1 overflow-y-auto overscroll-contain">
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex w-full items-center gap-3 border-b border-ink-800 px-5 py-4 text-left text-ink-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Search size={18} />
            <span className="text-sm">Search products</span>
          </button>

          <nav aria-label="Mobile">
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    onClick={onClose}
                    className={({ isActive }) =>
                      [
                        "flex items-center justify-between border-b border-ink-800 px-5 py-4 font-display text-lg font-bold uppercase tracking-wide transition-colors",
                        isActive ? "text-blaze-400" : "text-white hover:bg-white/5",
                      ].join(" ")
                    }
                  >
                    {link.label}
                    <ChevronRight size={18} className="text-ink-500" aria-hidden="true" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-5 py-6">
            <p className="eyebrow mb-3">Shop by sport</p>
            <ul className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/shop?category=${category.slug}`}
                    onClick={onClose}
                    className="block rounded-sm border border-ink-800 bg-ink-900 px-3 py-3 font-display text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-blaze-500"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-ink-800 px-5 py-4">
          <Link
            to="/wishlist"
            onClick={onClose}
            className="mb-3 flex items-center gap-2 text-sm text-ink-300 transition-colors hover:text-white"
          >
            <Heart size={16} /> Wishlist
          </Link>
          <a
            href={`mailto:${BUSINESS.contact.email}`}
            className="mb-3 flex items-center gap-2 text-sm text-ink-300 transition-colors hover:text-white"
          >
            <Mail size={16} /> {BUSINESS.contact.email}
          </a>
          <a
            href={BUSINESS.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-ink-300 transition-colors hover:text-white"
          >
            <Instagram size={16} /> {BUSINESS.social.instagramHandle}
          </a>
        </div>
      </div>
    </div>
  );
}
