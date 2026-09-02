import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { getProductById } from "./catalog";
import type { CartLine, CartLineView } from "@/data/types";

/**
 * Cart and wishlist.
 *
 * Frontend-only and deliberately so — there is no backend, and a checkout
 * that pretended to place an order would be worse than none. State lives in
 * React and is mirrored to localStorage so a bag survives a refresh.
 *
 * FOR A REAL BACKEND: keep this context's API (`add`, `remove`, `setQty`,
 * `lines`, `subtotal`) and change the reducer to call a cart endpoint. Every
 * component talks to the hooks below, not to storage.
 */

const CART_KEY = "kd-cart-v1";
const WISH_KEY = "kd-wishlist-v1";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback; // private mode, disabled storage — behave as if empty
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — the session still works, it just will not persist */
  }
}

/* ------------------------------------------------------------------ *
 * Cart
 * ------------------------------------------------------------------ */

type CartAction =
  | { type: "add"; productId: string; size?: string; quantity: number }
  | { type: "remove"; productId: string; size?: string }
  | { type: "setQty"; productId: string; size?: string; quantity: number }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

const sameLine = (a: CartLine, productId: string, size?: string) =>
  a.productId === productId && (a.size ?? "") === (size ?? "");

function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case "hydrate":
      return action.lines;
    case "add": {
      const existing = state.find((line) => sameLine(line, action.productId, action.size));
      if (existing) {
        return state.map((line) =>
          sameLine(line, action.productId, action.size)
            ? { ...line, quantity: Math.min(line.quantity + action.quantity, 99) }
            : line,
        );
      }
      return [...state, { productId: action.productId, size: action.size, quantity: action.quantity }];
    }
    case "remove":
      return state.filter((line) => !sameLine(line, action.productId, action.size));
    case "setQty":
      if (action.quantity < 1) {
        return state.filter((line) => !sameLine(line, action.productId, action.size));
      }
      return state.map((line) =>
        sameLine(line, action.productId, action.size)
          ? { ...line, quantity: Math.min(action.quantity, 99) }
          : line,
      );
    case "clear":
      return [];
  }
}

/* ------------------------------------------------------------------ *
 * Toasts
 * ------------------------------------------------------------------ */

export interface Toast {
  id: number;
  message: string;
  tone: "success" | "info";
}

/* ------------------------------------------------------------------ *
 * Context
 * ------------------------------------------------------------------ */

interface StoreValue {
  // cart
  lines: CartLineView[];
  cartCount: number;
  subtotal: number;
  addToCart: (productId: string, size?: string, quantity?: number) => void;
  removeFromCart: (productId: string, size?: string) => void;
  setQuantity: (productId: string, size: string | undefined, quantity: number) => void;
  clearCart: () => void;
  // wishlist
  wishlist: string[];
  isWished: (productId: string) => boolean;
  toggleWish: (productId: string) => void;
  // toasts
  toasts: Toast[];
  notify: (message: string, tone?: Toast["tone"]) => void;
  dismissToast: (id: number) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, [] as CartLine[]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load once on mount.
  useEffect(() => {
    dispatch({ type: "hydrate", lines: read<CartLine[]>(CART_KEY, []) });
    setWishlist(read<string[]>(WISH_KEY, []));
    setHydrated(true);
  }, []);

  // Persist after hydration, so the first render cannot wipe stored state.
  useEffect(() => {
    if (hydrated) write(CART_KEY, cart);
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) write(WISH_KEY, wishlist);
  }, [wishlist, hydrated]);

  const notify = useCallback((message: string, tone: Toast["tone"] = "success") => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((current) => [...current, { id, message, tone }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const addToCart = useCallback(
    (productId: string, size?: string, quantity = 1) => {
      dispatch({ type: "add", productId, size, quantity });
      const product = getProductById(productId);
      notify(product ? `${product.name} added to bag` : "Added to bag");
    },
    [notify],
  );

  const removeFromCart = useCallback((productId: string, size?: string) => {
    dispatch({ type: "remove", productId, size });
  }, []);

  const setQuantity = useCallback((productId: string, size: string | undefined, quantity: number) => {
    dispatch({ type: "setQty", productId, size, quantity });
  }, []);

  const clearCart = useCallback(() => dispatch({ type: "clear" }), []);

  const toggleWish = useCallback(
    (productId: string) => {
      setWishlist((current) => {
        const has = current.includes(productId);
        const product = getProductById(productId);
        notify(
          has
            ? `${product?.name ?? "Item"} removed from wishlist`
            : `${product?.name ?? "Item"} saved to wishlist`,
          "info",
        );
        return has ? current.filter((id) => id !== productId) : [...current, productId];
      });
    },
    [notify],
  );

  // Cart lines resolved against the catalogue. A line whose product no longer
  // exists is dropped rather than rendering an empty row.
  const lines = useMemo<CartLineView[]>(
    () =>
      cart.flatMap((line) => {
        const product = getProductById(line.productId);
        if (!product) return [];
        // Unpriced items cannot be added through the UI (the card offers
        // "Enquire" instead), so this only guards against a stale stored line.
        return [{ ...line, product, lineTotal: (product.price ?? 0) * line.quantity }];
      }),
    [cart],
  );

  const value = useMemo<StoreValue>(
    () => ({
      lines,
      cartCount: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: lines.reduce((sum, line) => sum + line.lineTotal, 0),
      addToCart,
      removeFromCart,
      setQuantity,
      clearCart,
      wishlist,
      isWished: (productId: string) => wishlist.includes(productId),
      toggleWish,
      toasts,
      notify,
      dismissToast,
    }),
    [lines, addToCart, removeFromCart, setQuantity, clearCart, wishlist, toggleWish, toasts, notify, dismissToast],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside <StoreProvider>");
  return context;
}
