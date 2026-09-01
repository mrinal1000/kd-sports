import { useEffect } from "react";
import { SITE } from "@/config/site";

/**
 * Per-route document metadata.
 *
 * This is a single-page app, so titles and descriptions are set at runtime.
 * That is enough for browser tabs, bookmarks and social crawlers that execute
 * JavaScript — but NOT for every crawler. If organic search matters, the next
 * step is prerendering or moving to a framework that renders on the server;
 * the metadata is already centralised in config/site.ts, so that migration
 * does not touch any page component.
 */
function setMeta(selector: string, attr: string, value: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    const [key, val] = attr.split("=");
    tag.setAttribute(key, val);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", value);
}

export function Seo({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', "name=description", description);
    setMeta('meta[property="og:title"]', "property=og:title", title);
    setMeta('meta[property="og:description"]', "property=og:description", description);
    setMeta('meta[property="og:type"]', "property=og:type", "website");
    setMeta('meta[property="og:image"]', "property=og:image", SITE.ogImage);
    setMeta('meta[name="twitter:card"]', "name=twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name=twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name=twitter:description", description);
  }, [title, description]);

  return null;
}
