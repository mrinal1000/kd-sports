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
| ~~The four sport categories~~ | **Resolved** — cricket only, six ranges |
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

## 2. Categories — now CRICKET ONLY

On your instruction (2026-09-02) football, fitness and apparel were removed
completely. `src/data/categories.ts` now holds six **cricket ranges**:

| Range | Products | Status |
|---|---|---|
| Cricket Bats | 19 | **Real stock** |
| Batting Gloves | 4 | **Real stock** |
| Protection | 2 | Demo — pads, helmet |
| Cricket Balls | 1 | Demo |
| Cricket Shoes | 1 | Demo |
| Kit Bags & Accessories | 1 | Demo |

13 non-cricket products were deleted, along with their category images. Every
mention of football, fitness, apparel, tracksuits and jerseys is gone from the
navigation, home page, shop filters, footer, About page, search suggestions,
page titles and meta descriptions — verified with a text scan of every route.

**Helmets** are listed under Protection because you mentioned they are coming,
but nothing has been supplied, so that entry is a demo placeholder rather than
a claim of stock.

---

## 3. The product catalogue — 23 items are now REAL

`src/data/products.ts` holds **41 products: 23 real, 18 demo.**

**Real (`demo: false`)** — 19 cricket bats and 4 batting gloves, loaded straight
from your product data sheet. Names, brands, prices, sizes and SKUs are exactly
as supplied; I generated the file from the JSON rather than retyping, and
verified every supplied price appears in the code.

Rules from your sheet, all enforced:

- Willow, grade, weight and grains are **not listed on any bat** — the sheet has
  them null, so they are not invented. Spec tables show only Brand, Size and SKU.
- `brand` is **absent** on Master 1500, Master 5000 and Tilak Varma Trigger
  Edition, because the source name did not state one. Your sheet notes the two
  Masters are probably SS — **confirm before I set it.**
- The cream keeping gloves have `price: null` and render as **"Price on
  request"** with an "Ask for a price" button instead of Add to Bag. Never
  coerced to 0.
- **Real products carry no star rating.** KD Sports has no review data, so a
  real bat must not show an invented rating next to a real price. Only demo
  items have stars.

**Demo (`demo: true`)** — the remaining 18 (football, fitness, apparel, plus
cricket balls/pads/helmet/shoes/bag) are still placeholders, each badged
**"Demo"** on its card. Delete or replace them as real stock arrives.

### ⚠️ Two things to confirm

**1. Currency — RESOLVED.** The compiled sheet said NPR, but the owner
confirmed on 2026-09-02 that all listed prices are **Indian Rupees**, matching
the Punjab GST registration. The site shows `₹24,000` with en-IN lakh grouping.
`CURRENCY_SYMBOL` in `src/config/site.ts` is the single switch.

**2. The photos are not on this machine.** The catalogue points at the exact
filenames your `rename-bats.sh` produces (`ss-sky-blaster-1.jpg` etc.), but the
files are not in `public/images/products/` yet. Until they are, `ProductImage`
falls back to a placeholder rather than showing broken images. To finish:

```bash
# in the folder holding the 19 screenshots
bash rename-bats.sh
# then copy renamed/*.jpg into public/images/products/
```

The 4 glove photos need the same treatment —
`batting-gloves-player-edition-1..4.jpg`, `-test-series-1..3.jpg`,
`-prestige-1..3.jpg`, `gloves-keeping-cream-1.jpg`.

### Still open from your sheet

- Keeping gloves: name and price
- IMG_3002/3003/3004 (.HEIC): one unidentified product, three angles
- Helmets: mentioned but nothing sent — the category exists with count 0
- Bats 09–19 have no size recorded

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
