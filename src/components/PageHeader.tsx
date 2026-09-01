import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Inner-page header.
 *
 * A shorter version of the home hero so the whole site reads as one system:
 * same scrim treatment, same eyebrow-and-slash, just without the photograph
 * competing with the content underneath.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  crumbs,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  crumbs?: { label: string; to?: string }[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink-800 bg-ink-900 pb-12 pt-32 md:pb-16 md:pt-40">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.55] [background-image:repeating-linear-gradient(-12deg,rgba(255,255,255,.028)_0_3px,transparent_3px_26px)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 size-96 rounded-full bg-blaze-500/8 blur-3xl"
      />

      <div className="container-kd relative">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-400">
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              {crumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  <ChevronRight size={13} aria-hidden="true" className="text-ink-600" />
                  {crumb.to && index < crumbs.length - 1 ? (
                    <Link to={crumb.to} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <p className="eyebrow mb-4">
            <span className="slash" aria-hidden="true" />
            {eyebrow}
          </p>
        )}

        <h1 className="headline text-4xl text-white sm:text-5xl md:text-6xl">{title}</h1>

        {lede && <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-300">{lede}</p>}
      </div>
    </section>
  );
}
