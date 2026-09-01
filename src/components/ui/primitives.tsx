import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { isPending, type Maybe } from "@/config/site";

/* ------------------------------------------------------------------ *
 * Button
 * ------------------------------------------------------------------ */

type Variant = "primary" | "solid-light" | "outline" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const VARIANT: Record<Variant, string> = {
  primary: "bg-blaze-500 text-white hover:bg-blaze-400 active:bg-blaze-600",
  "solid-light": "bg-white text-ink-950 hover:bg-ink-100",
  outline: "bg-transparent text-white ring-1 ring-inset ring-ink-600 hover:ring-white hover:bg-white/5",
  ghost: "bg-transparent text-ink-200 hover:text-white hover:bg-white/5",
  dark: "bg-ink-950 text-white hover:bg-ink-850",
};

const SIZE: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-sm md:text-base",
};

function buttonClass(variant: Variant, size: Size, className?: string) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-sm font-display font-bold uppercase tracking-wider",
    "transition-[background-color,box-shadow,transform,color] duration-200",
    "active:translate-y-px disabled:pointer-events-none disabled:opacity-45",
    VARIANT[variant],
    SIZE[size],
    className ?? "",
  ].join(" ");
}

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
  size?: Size;
}
export function Button({ variant = "primary", size = "md", className, ...rest }: ButtonProps) {
  return <button className={buttonClass(variant, size, className)} {...rest} />;
}

interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: Variant;
  size?: Size;
}
export function ButtonLink({ variant = "primary", size = "md", className, ...rest }: ButtonLinkProps) {
  return <Link className={buttonClass(variant, size, className)} {...rest} />;
}

interface ButtonAnchorProps extends ComponentPropsWithoutRef<"a"> {
  variant?: Variant;
  size?: Size;
}
export function ButtonAnchor({ variant = "primary", size = "md", className, ...rest }: ButtonAnchorProps) {
  return <a className={buttonClass(variant, size, className)} {...rest} />;
}

/* ------------------------------------------------------------------ *
 * Badge
 * ------------------------------------------------------------------ */

export function Badge({
  children,
  tone = "accent",
  className,
}: {
  children: ReactNode;
  tone?: "accent" | "dark" | "light" | "muted";
  className?: string;
}) {
  const tones = {
    accent: "bg-blaze-500 text-white",
    dark: "bg-ink-950 text-white",
    light: "bg-white text-ink-950",
    muted: "bg-ink-800 text-ink-200 ring-1 ring-inset ring-ink-700",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded-xs px-2 py-0.5 font-display text-[0.68rem] font-bold uppercase tracking-widest ${tones[tone]} ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Rating
 *
 * Ratings on this site are demo data. `showCount` prints the review count so
 * the number is never presented as more authoritative than it is.
 * ------------------------------------------------------------------ */

export function Rating({
  value,
  reviews,
  size = 14,
  className,
}: {
  value: number;
  reviews?: number;
  size?: number;
  className?: string;
}) {
  const rounded = Math.round(value);
  return (
    <span className={`inline-flex items-center gap-1.5 ${className ?? ""}`}>
      <span className="flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            width={size}
            height={size}
            className={i <= rounded ? "fill-blaze-400 text-blaze-400" : "text-ink-600"}
            strokeWidth={1.5}
          />
        ))}
      </span>
      <span className="text-xs font-semibold text-ink-300">
        {value.toFixed(1)}
        {typeof reviews === "number" && <span className="font-normal text-ink-500"> ({reviews})</span>}
      </span>
      <span className="sr-only">
        Rated {value.toFixed(1)} out of 5{typeof reviews === "number" ? ` from ${reviews} reviews` : ""}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Section heading — carries the accent slash, the site's one flourish
 * ------------------------------------------------------------------ */

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  onLight = false,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  align?: "left" | "center";
  onLight?: boolean;
  action?: ReactNode;
}) {
  return (
    <div
      className={`mb-10 flex flex-col gap-6 md:mb-14 ${
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <p className="eyebrow mb-3">
            <span className="slash" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h2
          className={`headline text-3xl sm:text-4xl md:text-5xl ${onLight ? "text-ink-950" : "text-white"}`}
        >
          {title}
        </h2>
        {lede && (
          <p className={`mt-4 max-w-xl text-base leading-relaxed ${onLight ? "text-ink-500" : "text-ink-300"}`}>
            {lede}
          </p>
        )}
      </div>
      {action && <div className="flex-none">{action}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Pending — a value the owner has not supplied yet
 * ------------------------------------------------------------------ */

export function Pending({ value, className }: { value: Maybe<string>; className?: string }) {
  if (!isPending(value)) return <span className={className}>{value}</span>;
  return (
    <span
      title={value.note ? `${value.label} — ${value.note}` : value.label}
      className={`inline-flex items-center gap-1.5 rounded-xs border border-dashed border-ink-600 px-2 py-0.5 text-[0.78em] font-medium text-ink-400 ${className ?? ""}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-blaze-500" />
      {value.label}
      <span className="sr-only"> — to be confirmed by the business owner</span>
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Reveal
 *
 * Content is visible by default. The hidden state is only applied once we
 * know an observer exists to clear it, and a timer clears it regardless, so
 * a failed script can never leave the page blank.
 * ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    if (node.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setState("hidden");
    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setState("shown");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          show();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" },
    );
    observer.observe(node);
    const timer = window.setTimeout(show, 2000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className ?? ""}`}
      data-state={state === "idle" ? undefined : state}
      style={state === "shown" ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
