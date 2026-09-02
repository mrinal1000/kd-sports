import { useState } from "react";

/**
 * A product photograph, with a stand-in when the file is not there yet.
 *
 * The real bat and glove photos are named in the catalogue but have not been
 * copied into `public/images/products/` yet. Pointing at them directly would
 * show a browser's broken-image icon on every card — the single fastest way to
 * make a finished site look broken.
 *
 * So: try the real photo, and on error fall back to the placeholder once. The
 * moment the owner drops the files in with the names the rename script
 * produces, the real photographs appear with no code change.
 */
const FALLBACK = "/images/products/bat-1.svg";

export function ProductImage({
  src,
  alt,
  className,
  width = 900,
  height = 1100,
  loading = "lazy",
  fetchPriority,
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
}) {
  const [failed, setFailed] = useState(false);

  return (
    <img
      src={failed ? FALLBACK : src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
