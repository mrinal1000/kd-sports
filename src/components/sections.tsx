import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Instagram, Quote, Star } from "lucide-react";
import type { ReactNode } from "react";
import { BUSINESS, IMAGES } from "@/config/site";
import type { Category, Testimonial } from "@/data/types";
import { countByCategory } from "@/lib/catalog";
import { Badge } from "./ui/primitives";

/* ------------------------------------------------------------------ *
 * Category card — large image, name, description, explore CTA
 * ------------------------------------------------------------------ */

export function CategoryCard({ category, tall = false }: { category: Category; tall?: boolean }) {
  const count = countByCategory(category.slug);

  // Balls and kit bags are carried in the shop but not itemised online, so
  // there is nothing to filter to. Sending someone to an empty results page
  // would read as "we don't stock these", which is the opposite of true —
  // point them at the people who can tell them what is in.
  const listed = count > 0;
  const href = listed ? `/shop?category=${category.slug}` : "/contact";

  return (
    <Link
      to={href}
      className={`group relative block overflow-hidden bg-ink-850 ${tall ? "aspect-[3/4] lg:aspect-auto lg:h-full" : "aspect-[4/5]"}`}
    >
      <img
        src={category.image}
        alt=""
        width={900}
        height={1100}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-transparent" />

      <div className="relative flex h-full flex-col justify-end p-6">
        <Badge tone="muted" className="mb-3 self-start">
          {listed ? `${count} ${count === 1 ? "item" : "items"}` : "In store"}
        </Badge>
        <h3 className="headline text-2xl text-white md:text-3xl">{category.name}</h3>
        <p className="mt-1.5 text-sm font-medium text-blaze-400">{category.tagline}</p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-300">{category.description}</p>
        <span className="mt-5 inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-white">
          {listed ? "Explore" : "Ask us"}
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ *
 * Trust card
 * ------------------------------------------------------------------ */

export function TrustCard({
  icon,
  title,
  body,
  index,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  index: number;
}) {
  return (
    <article className="group relative border border-ink-800 bg-ink-900 p-7 transition-colors duration-300 hover:border-blaze-500">
      <span
        aria-hidden="true"
        className="stat-num absolute right-5 top-4 text-5xl text-ink-800 transition-colors duration-300 group-hover:text-ink-700"
      >
        {String(index).padStart(2, "0")}
      </span>
      <span className="mb-5 grid size-12 place-items-center rounded-sm bg-blaze-500/12 text-blaze-400">
        {icon}
      </span>
      <h3 className="headline mb-2.5 text-xl text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-ink-300">{body}</p>
    </article>
  );
}

/* ------------------------------------------------------------------ *
 * Testimonial card
 * ------------------------------------------------------------------ */

export function TestimonialCard({ testimonial, demo }: { testimonial: Testimonial; demo: boolean }) {
  return (
    <figure
      className={`flex h-full flex-col border bg-ink-900 p-7 ${
        demo ? "border-dashed border-ink-700" : "border-ink-800"
      }`}
    >
      <Quote size={26} className="mb-4 text-blaze-500" aria-hidden="true" />
      <div className="mb-4 flex" aria-label={`Rated ${testimonial.rating} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={15}
            aria-hidden="true"
            className={i <= testimonial.rating ? "fill-blaze-400 text-blaze-400" : "text-ink-700"}
            strokeWidth={1.5}
          />
        ))}
      </div>
      <blockquote className={`flex-1 text-lg leading-relaxed ${demo ? "text-ink-400 italic" : "text-white"}`}>
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6 border-t border-ink-800 pt-4">
        <span className={`block font-display font-bold uppercase tracking-wide ${demo ? "text-ink-400" : "text-white"}`}>
          {testimonial.name}
        </span>
        <span className="block text-xs uppercase tracking-widest text-ink-500">{testimonial.role}</span>
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ *
 * Instagram grid
 *
 * These are stand-ins, NOT Instagram content. Posts are not fetched or
 * copied — doing so without permission would be republishing someone's
 * media. The grid links out to the real profile instead, and the tiles are
 * replaced by dropping images into public/images/social/.
 * ------------------------------------------------------------------ */

export function InstagramGrid() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {IMAGES.instagram.map((src, index) => (
        <a
          key={src}
          href={BUSINESS.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative aspect-square overflow-hidden bg-ink-850"
          aria-label={`Open ${BUSINESS.social.instagramHandle} on Instagram (image ${index + 1})`}
        >
          <img
            src={src}
            alt=""
            width={600}
            height={600}
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <span className="absolute inset-0 grid place-items-center bg-ink-950/0 opacity-0 transition-[background-color,opacity] duration-300 group-hover:bg-ink-950/70 group-hover:opacity-100">
            <Instagram size={26} className="text-white" aria-hidden="true" />
          </span>
        </a>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Newsletter
 *
 * There is no mailing-list backend. Rather than collecting addresses into
 * nothing, this states plainly what it is and points at Instagram, which is
 * where the business actually posts.
 * ------------------------------------------------------------------ */

export function Newsletter() {
  return (
    <div className="border border-ink-800 bg-ink-900 p-8 md:p-12">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="headline text-2xl text-white md:text-4xl">Know when new gear lands</h2>
          <p className="mt-3 max-w-md text-ink-300">
            New stock, restocks and season offers are posted to Instagram first. Follow along —
            that is where everything goes up.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <a
            href={BUSINESS.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center gap-2.5 rounded-sm bg-blaze-500 px-8 font-display text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-blaze-400"
          >
            <Instagram size={18} />
            Follow {BUSINESS.social.instagramHandle}
            <ArrowUpRight size={16} />
          </a>
          <p className="text-xs text-ink-500 md:text-right">
            Email list not set up yet — Instagram is the fastest way to hear about new stock.
          </p>
        </div>
      </div>
    </div>
  );
}
