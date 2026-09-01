import { ArrowRight } from "lucide-react";
import { PAGE_META } from "@/config/site";
import { ButtonLink } from "@/components/ui/primitives";
import { Seo } from "@/components/ui/Seo";
import { CATEGORIES } from "@/data/categories";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <>
      <Seo {...PAGE_META.notFound} />
      <section className="flex min-h-[70vh] items-center pt-24">
        <div className="container-kd text-center">
          <p className="stat-num text-[clamp(5rem,18vw,11rem)] leading-none text-ink-800">404</p>
          <h1 className="headline -mt-4 text-3xl text-white sm:text-5xl">Off target</h1>
          <p className="mx-auto mt-5 max-w-md text-ink-300">
            That page does not exist. The link may be out of date, or the address may have a typo
            in it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/" size="lg">
              Back to home <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink to="/shop" variant="outline" size="lg">
              Browse the shop
            </ButtonLink>
          </div>

          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                to={`/shop?category=${category.slug}`}
                className="border border-ink-800 bg-ink-900 px-4 py-4 font-display text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-blaze-500"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFound;
