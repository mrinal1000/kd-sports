import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Search, TrendingUp, X } from "lucide-react";
import { POPULAR_SEARCHES, formatPrice } from "@/config/site";
import { suggest } from "@/lib/catalog";

/**
 * Search overlay.
 *
 * Opens on the header button or Ctrl/Cmd-K. Shows popular searches before
 * anything is typed, live product matches as you type, and an honest empty
 * state when nothing matches — with a route out rather than a dead end.
 */
export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [term, setTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => suggest(term, 6), [term]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.clearTimeout(timer);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setTerm("");
  }, [open]);

  function go(path: string) {
    onClose();
    navigate(path);
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!term.trim()) return;
    go(`/shop?search=${encodeURIComponent(term.trim())}`);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[115]" role="dialog" aria-modal="true" aria-label="Search products">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative mx-auto mt-[8vh] w-[calc(100%-2rem)] max-w-2xl">
        <form onSubmit={submit} className="flex items-center gap-3 border-b-2 border-blaze-500 bg-ink-900 px-4">
          <Search size={22} className="flex-none text-blaze-400" aria-hidden="true" />
          <input
            ref={inputRef}
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            type="search"
            placeholder="Search bats, gloves, pads…"
            aria-label="Search products"
            className="h-16 w-full bg-transparent text-lg text-white outline-none placeholder:text-ink-500"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="grid size-10 flex-none place-items-center rounded-sm text-ink-400 transition-colors hover:text-white"
          >
            <X size={20} />
          </button>
        </form>

        <div className="scroll-thin max-h-[60vh] overflow-y-auto border border-t-0 border-ink-800 bg-ink-950">
          {!term.trim() && (
            <div className="p-5">
              <p className="eyebrow mb-4 flex items-center gap-2">
                <TrendingUp size={13} aria-hidden="true" /> Popular searches
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((phrase) => (
                  <button
                    key={phrase}
                    type="button"
                    onClick={() => go(`/shop?search=${encodeURIComponent(phrase)}`)}
                    className="rounded-pill border border-ink-700 px-4 py-2 text-sm text-ink-200 transition-colors hover:border-blaze-500 hover:text-white"
                  >
                    {phrase}
                  </button>
                ))}
              </div>
            </div>
          )}

          {term.trim() && results.length > 0 && (
            <ul>
              {results.map((product) => (
                <li key={product.id}>
                  <button
                    type="button"
                    onClick={() => go(`/product/${product.slug}`)}
                    className="flex w-full items-center gap-4 border-b border-ink-800 px-4 py-3 text-left transition-colors hover:bg-ink-900"
                  >
                    <img
                      src={product.images[0]}
                      alt=""
                      width={72}
                      height={88}
                      loading="lazy"
                      className="size-14 flex-none rounded-xs object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-white">{product.name}</span>
                      <span className="block text-xs uppercase tracking-wider text-ink-400">
                        {product.category}
                      </span>
                    </span>
                    <span className="flex-none font-display font-bold text-blaze-400">
                      {formatPrice(product.price)}
                    </span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => go(`/shop?search=${encodeURIComponent(term.trim())}`)}
                  className="flex w-full items-center justify-center gap-2 px-4 py-4 font-display text-sm font-bold uppercase tracking-widest text-blaze-400 transition-colors hover:bg-ink-900"
                >
                  See all results <ArrowRight size={15} />
                </button>
              </li>
            </ul>
          )}

          {term.trim() && results.length === 0 && (
            <div className="px-5 py-10 text-center">
              <p className="font-display text-lg font-bold uppercase tracking-wide text-white">
                No matches for “{term}”
              </p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-ink-400">
                This catalogue does not yet list everything in the shop. Browse the full range,
                or ask us directly — if we have it, we will tell you.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => go("/shop")}
                  className="rounded-sm bg-blaze-500 px-5 py-2.5 font-display text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-blaze-400"
                >
                  Browse everything
                </button>
                <button
                  type="button"
                  onClick={() => go("/contact")}
                  className="rounded-sm border border-ink-700 px-5 py-2.5 font-display text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-white"
                >
                  Ask us
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
