import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Handshake,
  Instagram,
  ShieldCheck,
  Tag,
  Zap,
} from "lucide-react";
import { BUSINESS, IMAGES, PAGE_META } from "@/config/site";
import { CATEGORIES } from "@/data/categories";
import { DEMO_CATALOGUE_NOTICE } from "@/data/products";
import { TESTIMONIALS, TESTIMONIALS_ARE_DEMO } from "@/data/testimonials";
import type { Product } from "@/data/types";
import { countByCategory, getFeatured } from "@/lib/catalog";
import { ButtonLink, Reveal, SectionHeading } from "@/components/ui/primitives";
import { Seo } from "@/components/ui/Seo";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { ProductCard } from "@/components/ProductCard";
import { QuickView } from "@/components/QuickView";
import {
  CategoryCard,
  InstagramGrid,
  Newsletter,
  TestimonialCard,
  TrustCard,
} from "@/components/sections";

/** The marquee reads as a kit list, because this is a cricket shop. */
const DISCIPLINES = [
  "Bats",
  "Gloves",
  "Pads",
  "Helmets",
  "Balls",
  "Shoes",
  "Kit bags",
  "Grips",
];

export function Home() {
  const [quickView, setQuickView] = useState<Product | null>(null);
  const featured = getFeatured(8);
  // read from the catalogue so the number cannot go stale as stock arrives
  const batCount = countByCategory("bats");

  return (
    <>
      <Seo {...PAGE_META.home} />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden pt-24 md:min-h-[92vh]">
        <picture>
          <source media="(max-width: 700px)" srcSet={IMAGES.hero.mobile} />
          <img
            src={IMAGES.hero.primary}
            alt=""
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        </picture>

        {/* Layered scrim: a hard left-to-right wash so the headline stays
            legible over any photograph swapped in later, plus a floor
            gradient that hands off into the marquee. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(8,9,11,.96)_0%,rgba(8,9,11,.86)_36%,rgba(8,9,11,.5)_66%,rgba(8,9,11,.3)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink-950 to-transparent"
        />

        <div className="container-kd relative grid items-center gap-12 lg:grid-cols-[1.15fr_auto] lg:gap-16">
          <div className="hero-in max-w-2xl">
            <p className="eyebrow mb-5">
              <span className="slash" aria-hidden="true" />
              Kharar · Punjab
            </p>

            <h1 className="headline text-[clamp(3rem,10vw,7rem)] text-white">
              Play hard.
              <br />
              <span className="text-blaze-500">Play bold.</span>
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink-200">
              Bats, gloves and kit for cricketers who don&rsquo;t settle. Kharar, Punjab.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/shop" size="lg" className="sm:w-auto">
                Shop now
                <ArrowRight size={17} />
              </ButtonLink>
              <ButtonLink to="/categories" variant="outline" size="lg">
                Explore the range
              </ButtonLink>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Stat value={String(batCount)} label="Bats in stock" />
              <Divider />
              <Stat value="GST" label="Registered business" />
              <Divider />
              <a
                href={BUSINESS.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-ink-300 transition-colors hover:text-white"
              >
                <Instagram size={16} className="text-blaze-400" aria-hidden="true" />
                {BUSINESS.social.instagramHandle}
              </a>
            </div>

            {/* Phone version of the owner card.
               *
               * The tall portrait would push the CTAs under the fold on a
               * phone, so below lg he appears as a compact row instead —
               * still on the opening screen, still the first face you see,
               * but underneath the buttons rather than in front of them. */}
            <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6 lg:hidden">
              <img
                src={IMAGES.owner}
                alt={`${BUSINESS.proprietor}, proprietor of KD Sports`}
                width={900}
                height={1125}
                loading="eager"
                decoding="async"
                className="size-14 flex-none rounded-sm object-cover ring-1 ring-white/15"
              />
              <div className="min-w-0">
                <p className="font-display text-sm font-bold uppercase tracking-wide text-white">
                  {BUSINESS.proprietor}
                </p>
                <p className="font-display text-[0.62rem] font-bold uppercase tracking-[0.18em] text-blaze-400">
                  Proprietor · KD Sports, Kharar
                </p>
              </div>
            </div>
          </div>

          {/* The owner, in his own shop.
             *
             * This is the strongest trust signal a small independent shop has:
             * a real person behind the counter, photographed under his own
             * sign. It sits in the hero rather than buried on an About page
             * because "who am I buying from" is the first question a customer
             * asks of a store they have never heard of.
             *
             * Hidden below lg — on a phone it would push the CTAs under the
             * fold, and the buttons matter more there than the portrait. */}
          <figure className="hero-in relative hidden w-[300px] shrink-0 lg:block xl:w-[340px]">
            <div className="relative overflow-hidden rounded-sm ring-1 ring-white/12">
              <img
                src={IMAGES.owner}
                alt={`${BUSINESS.proprietor}, proprietor of KD Sports, at the shop counter in Kharar`}
                width={900}
                height={1125}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
              {/* keeps the caption legible over the lighter part of the photo */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-4">
                <span className="block font-display text-sm font-bold uppercase tracking-wide text-white">
                  {BUSINESS.proprietor}
                </span>
                <span className="mt-0.5 block font-display text-[0.65rem] font-bold uppercase tracking-[0.18em] text-blaze-400">
                  Proprietor · KD Sports
                </span>
              </figcaption>
            </div>

            {/* the accent slash, tying the card back to the rest of the system */}
            <span
              aria-hidden="true"
              className="absolute -left-2 top-6 h-16 w-1 skew-x-[-12deg] bg-blaze-500"
            />
          </figure>
        </div>

        <a
          href="#brand"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-ink-400 transition-colors hover:text-white md:flex"
        >
          <span className="font-display text-[0.62rem] font-bold uppercase tracking-[0.28em]">Scroll</span>
          <ChevronDown size={18} className="animate-bounce" />
        </a>
      </section>

      {/* ── Kinetic discipline strip ─────────────────────────────────── */}
      <div className="border-y border-ink-800 bg-ink-900 py-4">
        <div className="marquee" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div className="marquee__row" key={copy}>
              {DISCIPLINES.map((word) => (
                <span key={word} className="flex items-center gap-10">
                  <span className="headline whitespace-nowrap text-xl text-ink-600 md:text-2xl">{word}</span>
                  <span className="size-1.5 rotate-45 bg-blaze-500" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Brand statement ──────────────────────────────────────────── */}
      <section id="brand" className="relative overflow-hidden py-24 md:py-32">
        <div className="container-kd">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="eyebrow mb-5">
                <span className="slash" aria-hidden="true" />
                Who we are
              </p>
              <h2 className="headline text-4xl text-white sm:text-5xl md:text-6xl">
                Built for the game.
                <br />
                <span className="text-blaze-500">Made for the grind.</span>
              </h2>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink-300">
                KD Sports is a cricket shop in Kharar. Bats from SS, TON and Gama, batting and
                keeping gloves, pads, helmets, balls, shoes and the kit bag to carry it all —
                stocked for club players, academy sides and anyone who takes guard on a Sunday.
              </p>
              <p className="mt-4 max-w-lg leading-relaxed text-ink-400">
                Run by {BUSINESS.proprietor} — a proprietorship, which means the person choosing
                the stock is the person who answers when you call.
              </p>
              <ButtonLink to="/about" variant="outline" className="mt-8">
                About KD Sports
                <ArrowRight size={16} />
              </ButtonLink>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden bg-ink-850">
                  <img
                    src={IMAGES.brandStatement}
                    alt="The KD Sports sign on the shop wall in Kharar, with batting pads and kit bags on the shelf beside it"
                    width={1400}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 hidden bg-blaze-500 px-7 py-5 sm:block">
                  <p className="stat-num text-4xl text-white">100%</p>
                  <p className="mt-1 font-display text-[0.68rem] font-bold uppercase tracking-widest text-white/85">
                    Focused on sport
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────────────── */}
      <section className="border-t border-ink-800 py-24 md:py-32">
        <div className="container-kd">
          <SectionHeading
            eyebrow="Shop by range"
            title={<>Shop the kit bag</>}
            lede="Everything a cricketer needs, stocked for people who actually play — not just people who browse."
            action={
              <ButtonLink to="/categories" variant="outline" size="sm">
                All categories <ArrowRight size={15} />
              </ButtonLink>
            }
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((category, index) => (
              <Reveal key={category.slug} delay={index * 80}>
                <CategoryCard category={category} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured products ────────────────────────────────────────── */}
      <section className="border-t border-ink-800 bg-ink-900/40 py-24 md:py-32">
        <div className="container-kd">
          <SectionHeading
            eyebrow="Featured"
            title={<>Gear up. Game on.</>}
            action={
              <ButtonLink to="/shop" variant="outline" size="sm">
                Shop all <ArrowRight size={15} />
              </ButtonLink>
            }
          />

          <DemoNotice message={DEMO_CATALOGUE_NOTICE} className="mb-8" />

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {featured.map((product, index) => (
              <Reveal key={product.id} delay={(index % 4) * 70}>
                <ProductCard product={product} onQuickView={setQuickView} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why KD Sports ────────────────────────────────────────────── */}
      <section className="border-t border-ink-800 py-24 md:py-32">
        <div className="container-kd">
          <SectionHeading
            eyebrow="Why KD Sports"
            title={<>What you get from us</>}
            lede="Four things we hold ourselves to. No awards, no partnership claims — just how the shop is run."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <ShieldCheck size={24} strokeWidth={1.6} />,
                title: "Quality first",
                body: "Gear selected for how it holds up over a season, not how it looks on a shelf for a week.",
              },
              {
                icon: <Zap size={24} strokeWidth={1.6} />,
                title: "Built for athletes",
                body: "Chosen around what players actually need — fit, protection and equipment that performs under load.",
              },
              {
                icon: <Tag size={24} strokeWidth={1.6} />,
                title: "Competitive pricing",
                body: "Professional-standard equipment at prices that make sense for club and academy budgets.",
              },
              {
                icon: <Handshake size={24} strokeWidth={1.6} />,
                title: "Customer focused",
                body: "A small business that would rather keep a customer for ten years than win one sale today.",
              },
            ].map((card, index) => (
              <Reveal key={card.title} delay={index * 70}>
                <TrustCard {...card} index={index + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Promo banner ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <img
          src={IMAGES.promo}
          alt=""
          width={1920}
          height={800}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink-950/80" />
        <div className="container-kd relative py-24 text-center md:py-36">
          <Reveal>
            <p className="eyebrow mb-5">Upgrade your kit</p>
            <h2 className="headline mx-auto max-w-3xl text-4xl text-white sm:text-5xl md:text-7xl">
              Your game deserves better gear.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-ink-200">
              Whatever you play, play it with equipment that does not let you down halfway through
              the season.
            </p>
            <ButtonLink to="/shop" size="lg" className="mt-9">
              Shop the collection
              <ArrowRight size={17} />
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section id="reviews" className="border-t border-ink-800 py-24 md:py-32">
        <div className="container-kd">
          <SectionHeading
            eyebrow="Reviews"
            title={<>What customers say</>}
            lede="These are empty placeholders. Real reviews go here once customers have given them — nothing on this site invents praise from a named person."
          />

          {TESTIMONIALS_ARE_DEMO && (
            <DemoNotice
              message="Placeholder reviews — the layout is real, the words are not. Replace them in src/data/testimonials.ts with genuine, permission-given customer reviews."
              className="mb-8"
            />
          )}

          <div className="grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
              <Reveal key={testimonial.id} delay={index * 80}>
                <TestimonialCard testimonial={testimonial} demo={TESTIMONIALS_ARE_DEMO} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Instagram ────────────────────────────────────────────────── */}
      <section className="border-t border-ink-800 bg-ink-900/40 py-24 md:py-32">
        <div className="container-kd">
          <SectionHeading
            eyebrow="Social"
            title={<>Follow the KD Sports journey</>}
            lede="New stock, team orders and match-day gear."
            action={
              <a
                href={BUSINESS.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-sm bg-blaze-500 px-6 font-display text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-blaze-400"
              >
                <Instagram size={16} /> Follow us
              </a>
            }
          />

          <InstagramGrid />

          <p className="mt-4 text-xs text-ink-500">
            These are KD Sports&rsquo; own product photographs, linking through to{" "}
            {BUSINESS.social.instagramHandle}. Posts are not copied from Instagram — swap in
            different shots any time from{" "}
            <code className="text-ink-400">public/images/social/</code>.
          </p>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-kd">
          <Newsletter />
        </div>
      </section>

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="stat-num text-2xl text-white">{value}</p>
      <p className="mt-0.5 font-display text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ink-400">
        {label}
      </p>
    </div>
  );
}

const Divider = () => <span aria-hidden="true" className="hidden h-8 w-px bg-ink-700 sm:block" />;

export default Home;
