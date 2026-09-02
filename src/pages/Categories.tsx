import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PAGE_META } from "@/config/site";
import { CATEGORIES } from "@/data/categories";
import { countByCategory } from "@/lib/catalog";
import { Reveal } from "@/components/ui/primitives";
import { Seo } from "@/components/ui/Seo";
import { PageHeader } from "@/components/PageHeader";
import { CategoryCard } from "@/components/sections";

export function Categories() {
  return (
    <>
      <Seo {...PAGE_META.categories} />
      <PageHeader
        eyebrow="Categories"
        title="Every cricket range we stock"
        lede="Six cricket ranges, each broken down into what you actually search for."
        crumbs={[{ label: "Categories" }]}
      />

      <div className="container-kd py-12 md:py-16">
        <p className="mb-10 max-w-3xl rounded-sm border border-dashed border-ink-600 bg-ink-900/60 px-5 py-4 text-sm leading-relaxed text-ink-300">
          <strong className="text-white">Bats and Gloves are real stock.</strong> The other four
          ranges are placeholders until real products arrive — Helmets in particular have been
          mentioned but not yet supplied. Confirm what is genuinely carried and delete the rest in{" "}
          <code className="text-ink-400">src/data/categories.ts</code>.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {CATEGORIES.map((category, index) => (
            <Reveal key={category.slug} delay={index * 80}>
              <CategoryCard category={category} />
            </Reveal>
          ))}
        </div>

        <div className="mt-16 space-y-12">
          {CATEGORIES.map((category) => (
            <section key={category.slug} aria-labelledby={`cat-${category.slug}`}>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-ink-800 pb-4">
                <h2 id={`cat-${category.slug}`} className="headline text-2xl text-white md:text-3xl">
                  <span className="slash" aria-hidden="true" />
                  {category.name}
                </h2>
                <Link
                  to={`/shop?category=${category.slug}`}
                  className="inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-widest text-ink-300 transition-colors hover:text-white"
                >
                  Shop {countByCategory(category.slug)} items <ArrowRight size={14} />
                </Link>
              </div>
              <ul className="flex flex-wrap gap-2">
                {category.subcategories.map((sub) => (
                  <li key={sub.slug}>
                    <Link
                      to={`/shop?category=${category.slug}&search=${encodeURIComponent(sub.name)}`}
                      className="inline-block rounded-pill border border-ink-700 px-4 py-2 text-sm text-ink-200 transition-colors hover:border-blaze-500 hover:text-white"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
