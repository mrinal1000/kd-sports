import { Info } from "lucide-react";

/**
 * The standing "this is demo data" strip.
 *
 * The catalogue on this site is placeholder content. Rather than hiding that,
 * it is stated plainly wherever products appear, so nobody — the owner, a
 * customer, or the developer six months from now — mistakes an illustrative
 * price for a real one.
 */
export function DemoNotice({ message, className }: { message: string; className?: string }) {
  return (
    <div
      className={`flex items-start gap-2.5 rounded-sm border border-dashed border-ink-600 bg-ink-900/60 px-4 py-3 ${className ?? ""}`}
    >
      <Info size={16} className="mt-0.5 flex-none text-blaze-400" aria-hidden="true" />
      <p className="text-xs leading-relaxed text-ink-300">{message}</p>
    </div>
  );
}
