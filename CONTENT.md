# CONTENT.md — what KD Sports needs to supply

The site is complete as a design and as working software. What it is missing is
**real business content**, because inventing it for a real, named, registered
business would be a fabrication.

Find everything outstanding:

```bash
grep -rn "todo(" src/config/site.ts
```

---

## ⚠️ What could NOT be verified

The Instagram account **@kdsportsofficial05 is login-walled**, and the handle is
not indexed by any search engine I could reach. I could not see a single post.

That means the following are taken from your brief, **not** from the business:

| Thing | Status |
|---|---|
| The four sport categories | From the brief — **confirm what is actually stocked** |
| Brand accent colour (blaze orange) | **My choice.** No brand colour was visible |
| Every product, price and rating | Demo placeholders — see below |
| Product photography | Generated stand-ins |

Nothing claims a brand partnership, an authorised-dealer status, an award, a
number of customers or years in business. None of that was provided, so none of
it appears.

---

## 1. Business details still missing

In `src/config/site.ts`:

| Placeholder | What it is |
|---|---|
| `todo("Phone number")` | Shown in the footer. Also unlocks a click-to-call |
| `todo("WhatsApp number")` | Digits with country code, e.g. `919876543210` |
| `todo("Opening hours")` | Shown on About |
| `todo("Street / shop address")` | Only if you want it public — the GST certificate gave locality only |
| `todo("Facebook page URL")` | Delete if there is no Facebook |
| `todo("YouTube channel URL")` | Delete if there is no channel |
| `todo("Live site URL")` | Once deployed, for canonical and social tags |

**Already correct and in use:** business name, proprietor (Naresh Kumar),
constitution, GSTIN, Kharar / SAS Nagar / Punjab / 140301, and the email
address. The GSTIN sits only in the quiet "Business information" block at the
bottom of the footer, as you asked.

---

## 2. Categories — confirm before publishing

`src/data/categories.ts` defines Cricket, Football, Fitness & Training, and
Sports Apparel, each with sub-ranges.

**Delete any category KD Sports does not actually stock.** Removing one there
removes it from the navigation, home page, shop filters, footer and the 404
page at once.

If the real business is, say, cricket-only, this page should say so — a shop
that advertises football gear it does not carry loses the customer at the door.

---

## 3. The product catalogue

`src/data/products.ts` holds **21 demo products**. Every one is generic and
category-typical — "English Willow Match Bat", not a specific model — and no
real brand is presented as a supplier.

Prices, ratings and review counts are illustrative. A "demo catalogue" notice
appears above every product grid so nobody mistakes them for real figures.

To replace with the real catalogue:

1. Keep the shape defined in `src/data/types.ts` — every screen reads through it
2. Put photos in `public/images/products/` and point each `images` array at them
3. Delete `DEMO_CATALOGUE_NOTICE` to remove the banner site-wide

Each product supports: `id`, `slug`, `name`, `category`, `subcategory`, `brand`,
`price`, `oldPrice`, `images`, `shortDescription`, `description`, `rating`,
`reviews`, `sizes`, `inStock`, `featured`, `specifications`.

---

## 4. Reviews

`src/data/testimonials.ts` contains three cards reading "Customer review will
appear here." The layout is real, the words are deliberately blank.

**Do not write these yourself.** Collect genuine reviews with the customer's
permission, then replace `quote`, `name` and `role`, and set
`TESTIMONIALS_ARE_DEMO = false` to drop the placeholder styling and notice.

---

## 5. Images — 51 stand-ins to replace

All artwork paths live in one place: the `IMAGES` object in
`src/config/site.ts`. Change a path there, not in a component.

| File | Used for | Suggested size |
|---|---|---|
| `hero-cricket.svg` | Home hero | 1920×1080 |
| `hero-cricket-mobile.svg` | Hero on phones | 900×1200 |
| `promo-banner.svg` | "Your game deserves better gear" | 1920×800 |
| `brand-statement.svg` | Brand section | 1400×900 |
| `about-store.svg` | About page | 1200×900 |
| `cricket / football / fitness / apparel.svg` | Category cards | 900×1100 |
| `products/*.svg` (33) | Product photos | 900×1100, consistent framing |
| `social/ig-1…8.svg` | Instagram grid | 600×600 square |
| `og-cover.svg` | Social sharing preview | **1200×630 JPG or PNG** — SVG is not reliably supported by WhatsApp or Facebook |
| `logo.svg` | Wordmark | Replace with the official logo when there is one |

Using `.jpg`? Save it, then update the path in `IMAGES`. Keep hero images under
~250 KB — a lot of customers will be on mobile data.

**Instagram posts are not copied into this site.** The grid shows stand-ins that
link out to the profile. Republishing posts without permission is not something
the site does on your behalf; choose images deliberately and drop them into
`public/images/social/`.

---

## 6. Ordering — how it works today

There is no backend, so the site never pretends to take a payment:

- The bag totals honestly and persists in the browser
- "Buy now" and "Send bag by email" open a **prefilled email** containing the
  order, so a real customer's intent reaches a real inbox
- The contact form validates, then builds an email — it does not silently
  discard a message
- Every one of these states says "Online checkout coming soon" plainly

When you are ready for real orders, the seam is `src/lib/catalog.ts` and
`src/lib/store.tsx`. Both are documented in README.md.

---

## Suggested order of work

1. Phone and WhatsApp number — small change, immediately useful
2. **Confirm the categories**, delete what is not stocked
3. Real products, even 10 of them, with real prices
4. Real photography — this is what makes it look like a brand
5. Genuine customer reviews
6. Opening hours, and the street address if it should be public
7. Deploy, then set the live URL
