# KD SPORTS

Storefront for KD Sports — sports equipment and apparel, Kharar, SAS Nagar,
Punjab. Proprietor: Naresh Kumar.

**Frontend only.** No backend, no database, no payment processing. The cart and
wishlist are real and persist in the browser; ordering happens by email or
Instagram until a commerce backend is added.

React 19 · TypeScript · Vite · Tailwind CSS 4 · React Router · Lucide icons.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # static site → dist/
npm run preview    # serve the built site
npm run typecheck  # tsc --noEmit
```

---

## Structure

```
src/
├── config/site.ts        ← business facts, images, navigation. START HERE.
├── data/
│   ├── types.ts              the data contract a backend must satisfy
│   ├── products.ts           21 demo products
│   ├── categories.ts         4 sport categories
│   └── testimonials.ts       placeholder reviews
├── lib/
│   ├── catalog.ts            THE BACKEND SEAM — all product reads
│   └── store.tsx             cart + wishlist + toasts
├── components/
│   ├── ui/primitives.tsx     Button, Badge, Rating, SectionHeading, Reveal, Pending
│   ├── ui/Seo.tsx            per-route title and meta
│   ├── ui/Toaster.tsx        toast stack
│   ├── ui/DemoNotice.tsx     the "demo catalogue" strip
│   ├── Navbar / MobileMenu / SearchOverlay / CartDrawer
│   ├── ProductCard / QuickView / PageHeader / Footer
│   └── sections.tsx          CategoryCard, TrustCard, TestimonialCard, InstagramGrid, Newsletter
├── pages/                Home, Shop, ProductDetail, Categories, About, Contact, Cart, Wishlist, NotFound
└── styles/globals.css    design tokens + the few custom classes

public/images/            51 placeholder images to replace
```

**No component holds business content.** Everything reads from `config/` and
`data/`, which is what makes the backend swap below a small job.

---

## Editing

Read **CONTENT.md** first — it lists everything still to supply.

**Change the accent colour.** One place: `--color-blaze-*` in
`src/styles/globals.css`. If KD Sports has a real brand colour, swap that ramp
and the entire site follows.

**Change a business fact.** `src/config/site.ts`. The footer, contact page and
About all read from it, so they cannot disagree.

**Add a product.** Append to `PRODUCTS` in `src/data/products.ts`. It appears in
the shop, search, category filters and related products automatically.

**Swap an image.** Drop the file into `public/images/` and change the path in
the `IMAGES` object. Never hardcode a path in a component.

---

## Adding a backend later

Two files, and no component markup changes:

**`src/lib/catalog.ts`** — every product read goes through it
(`getAllProducts`, `getProductBySlug`, `queryProducts`, `suggest`, …). Today
they read a local array synchronously. Point them at Supabase, Shopify,
WooCommerce or a Node API and update call sites to `await`. The shapes in
`data/types.ts` stay identical, so the UI is untouched.

**`src/lib/store.tsx`** — cart and wishlist. Keep the context API (`addToCart`,
`setQuantity`, `lines`, `subtotal`) and change the reducer to call a cart
endpoint. Components talk to the hook, never to storage.

`CatalogQuery` in `data/types.ts` is already shaped like a real API query —
search, category, price bounds, availability, sort.

For **WhatsApp ordering**, the message payload is already built in
`CartDrawer.tsx` and `Cart.tsx`; add the number to `config/site.ts` and point a
`wa.me` link at it.

---

## What is deliberately honest

The site never claims something that is not true:

- **No fake checkout.** "Online checkout coming soon" is stated wherever a
  customer would expect to pay, and the bag is sent as a prefilled email so real
  intent reaches a real inbox.
- **No invented reviews.** Testimonials read "Customer review will appear here",
  visually marked as placeholders.
- **No invented products.** The catalogue is generic and labelled demo above
  every grid.
- **No brand claims.** No partnerships, awards, dealer status, customer counts
  or years in business — none were provided.
- **No scraped Instagram.** The grid is stand-ins linking to the real profile.
- **The contact form does not lie.** It validates, then builds an email rather
  than showing a success message for a message nobody received.

The GSTIN appears once, quietly, in the footer's Business Information block.

---

## Accessibility

Skip link; one `<h1>` per route; semantic landmarks; visible focus rings in the
accent colour; keyboard-operable drawers, overlays and modals with Escape to
close and scroll lock; `aria-pressed` on toggles; `aria-live` on cart quantities
and result counts; alt text on every image; 44px minimum touch targets.

---

## One implementation rule worth keeping

**No animation on this site fades content in from `opacity: 0`, and no content
waits on an IntersectionObserver to become visible.**

This was found by testing, not theory: in any context where CSS transitions or
animations do not advance — a throttled tab, an embedded preview, a browser with
animations disabled — an element transitioning from `opacity: 0` keeps the start
value permanently. The DOM says it is shown; the screen shows nothing.

Scroll reveals therefore animate **transform only**, and the observer has a
2-second safety timeout. Worst case is "no movement", never "no content". If you
add animation, keep to that rule.

---

## Deploying

Static output, no environment variables.

**Vercel** — import the repo; it detects Vite. `vercel.json` is included with
the SPA rewrite so deep links like `/product/…` resolve on refresh.

**Netlify** — build `npm run build`, publish `dist`. Add a `_redirects` file
containing `/* /index.html 200` for the same reason.

**Any static host** — upload the contents of `dist/`. Make sure unknown paths
fall back to `index.html`, or client-side routes will 404 on refresh.
