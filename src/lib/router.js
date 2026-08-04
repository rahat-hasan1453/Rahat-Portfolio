import { useEffect, useState } from "react";

/* =========================================================================
   Tiny history router.

   The site used hash routes (#about, #case-study/d-pass). A fragment is not
   a URL as far as search engines and link-preview crawlers are concerned, so
   every page shared the homepage's URL, title and preview card, and none of
   the case studies could be indexed or linked to on their own.

   Paths now:
     /                        home
     /about                   about
     /case-studies            case study list
     /case-studies/<slug>     one case study

   Old hash links still work — they are rewritten to the new path on load, so
   anything already shared or bookmarked keeps resolving.

   NOTE FOR DEPLOYMENT: the build writes a real index.html for every route
   (scripts/prerender.mjs), so a plain static host serves these paths without
   any rewrite rule. If you add routes beyond the ones listed there, either
   extend that script or enable SPA fallback on the host.
   ========================================================================= */

const EVENT = "rh:navigate";

/** #about → /about, #case-study/x → /case-studies/x (kept for old links) */
export function legacyHashToPath(hash) {
  if (!hash || hash === "#") return null;
  const h = hash.replace(/^#/, "");
  if (h === "about") return "/about";
  if (h === "case-studies") return "/case-studies";
  if (h.startsWith("case-study/")) return `/case-studies/${h.slice("case-study/".length)}`;
  return null;
}

/** Run once before React mounts, so the first render already sees a path. */
export function migrateLegacyHash() {
  const path = legacyHashToPath(window.location.hash);
  if (path) window.history.replaceState({}, "", path);
  else if (window.location.hash) window.history.replaceState({}, "", window.location.pathname);
}

export function currentPath() {
  // trailing slash is meaningless here; normalise so "/about/" === "/about"
  const p = window.location.pathname.replace(/\/+$/, "");
  return p === "" ? "/" : p;
}

export function navigate(path, { replace = false } = {}) {
  if (currentPath() === path) return;
  window.history[replace ? "replaceState" : "pushState"]({}, "", path);
  window.dispatchEvent(new Event(EVENT));
}

/** Current path, re-rendering on back/forward and on navigate(). */
export function useRoute() {
  const [path, setPath] = useState(currentPath);
  useEffect(() => {
    const sync = () => setPath(currentPath());
    window.addEventListener("popstate", sync);
    window.addEventListener(EVENT, sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener(EVENT, sync);
    };
  }, []);
  return path;
}

/* Props for an internal link. Renders a real <a href> — crawlable, and
   middle-click / cmd-click still open a new tab — but plain clicks are
   handled in-app so the SPA never does a full reload. */
export function linkProps(path) {
  return {
    href: path,
    onClick: (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      navigate(path);
    },
  };
}

export const caseStudyPath = (slug) => `/case-studies/${slug}`;
export const slugFromPath = (path) =>
  path.startsWith("/case-studies/") ? path.slice("/case-studies/".length) : "";
