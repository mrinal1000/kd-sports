import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { IMAGES, NAV_LINKS } from "@/config/site";
import { useStore } from "@/lib/store";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "./SearchOverlay";
import { CartDrawer } from "./CartDrawer";

/**
 * Sticky header.
 *
 * At the top of the home page it sits transparent over the hero. Past 40px it
 * takes a background, a blur and a hairline, and loses a little height. On
 * every other route it starts solid, because there is no hero image behind it
 * to be transparent over.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount, wishlist } = useStore();
  const location = useLocation();
  const overHero = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keyboard shortcut, the way every shop the user already uses behaves.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const solid = scrolled || !overHero;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[90] transition-[background-color,height,box-shadow,border-color] duration-300 ${
          solid
            ? "border-b border-ink-800 bg-ink-950/88 backdrop-blur-lg shadow-[0_8px_30px_rgba(0,0,0,.35)]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`container-kd flex items-center gap-3 transition-[height] duration-300 ${
            solid ? "h-16" : "h-20 md:h-24"
          }`}
        >
          {/* Mobile: hamburger first */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="-ml-2 grid size-11 place-items-center rounded-sm text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <Link to="/" className="flex-none" aria-label="KD Sports — home">
            <img
              src={IMAGES.logo}
              alt="KD Sports"
              width={2121}
              height={1005}
              className={`w-auto transition-[height] duration-300 ${solid ? "h-10" : "h-12 md:h-14"}`}
            />
          </Link>

          <nav aria-label="Main" className="ml-8 hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      [
                        "relative block px-4 py-2 font-display text-[0.82rem] font-bold uppercase tracking-widest transition-colors",
                        isActive ? "text-white" : "text-ink-300 hover:text-white",
                      ].join(" ")
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left bg-blaze-500"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="grid size-11 place-items-center rounded-sm text-white transition-colors hover:bg-white/10"
            >
              <Search size={20} />
            </button>

            <Link
              to="/wishlist"
              aria-label={`Wishlist, ${wishlist.length} ${wishlist.length === 1 ? "item" : "items"}`}
              className="relative hidden size-11 place-items-center rounded-sm text-white transition-colors hover:bg-white/10 sm:grid"
            >
              <Heart size={20} />
              {wishlist.length > 0 && <Pip>{wishlist.length}</Pip>}
            </Link>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Open bag, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
              className="relative grid size-11 place-items-center rounded-sm text-white transition-colors hover:bg-white/10"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && <Pip key={cartCount}>{cartCount}</Pip>}
            </button>

            <Link
              to="/contact"
              aria-label="Account — contact KD Sports"
              className="hidden size-11 place-items-center rounded-sm text-white transition-colors hover:bg-white/10 lg:grid"
            >
              <User size={20} />
            </Link>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenSearch={() => {
          setMenuOpen(false);
          setSearchOpen(true);
        }}
      />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

/** The little count bubble. Keyed on its value so it re-animates on change. */
function Pip({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="pop absolute right-1 top-1 grid min-w-[18px] place-items-center rounded-full bg-blaze-500 px-1 font-display text-[0.62rem] font-bold leading-[18px] text-white"
    >
      {children}
    </span>
  );
}
