import { Check, Heart, X } from "lucide-react";
import { useStore } from "@/lib/store";

/** Toast stack. Announced politely so a screen reader hears the confirmation. */
export function Toaster() {
  const { toasts, dismissToast } = useStore();

  return (
    <div
      className="pointer-events-none fixed bottom-5 left-1/2 z-[120] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 flex-col gap-2 sm:left-auto sm:right-6 sm:translate-x-0"
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="toast-in pointer-events-auto flex items-center gap-3 rounded-sm border border-ink-700 bg-ink-850 px-4 py-3 shadow-2xl"
        >
          <span
            aria-hidden="true"
            className={`grid size-7 flex-none place-items-center rounded-full ${
              toast.tone === "success" ? "bg-blaze-500 text-white" : "bg-ink-700 text-blaze-400"
            }`}
          >
            {toast.tone === "success" ? <Check size={15} strokeWidth={3} /> : <Heart size={14} strokeWidth={2.5} />}
          </span>
          <p className="min-w-0 flex-1 text-sm font-medium text-white">{toast.message}</p>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss notification"
            className="flex-none rounded-xs p-1 text-ink-400 transition-colors hover:text-white"
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
