import imageSizes from "./imageSizes.json";

/* =========================================================================
   Case study content.

   The studies themselves live as one JSON file each in /content/case-studies,
   which is what the CMS at /admin edits. This module turns those files into
   the shape the pages already consume, so nothing in the components had to
   change when the content moved out of here.

   Image dimensions are NOT stored in the content files — the page needs the
   real pixel size of every shot to lay each frame out at its own aspect ratio,
   and asking whoever writes the content to measure images would be a terrible
   deal. scripts/image-sizes.mjs reads them out of the file headers before
   every dev run and build; imageSizes.json is generated, never hand-edited.

   Consumed by: CaseStudy.jsx (homepage rail), CaseStudies.jsx (list),
   CaseStudyDetail.jsx (detail page), lib/seo.js, scripts/prerender.mjs.
   ========================================================================= */

/* Vite inlines every match at build time, so this stays a plain synchronous
   array export — and editing a content file hot-reloads the page in dev. */
const files = import.meta.glob("../../content/case-studies/*.json", { eager: true });

/* A shot is just a path in the content file. Pair it with its measured size;
   if the manifest hasn't caught up with a newly added image, fall back to 4:3
   so the page still lays out instead of collapsing. */
const FALLBACK = { w: 4, h: 3 };
const toShot = (src) => ({ src, ...(imageSizes[src] || FALLBACK) });

export const CASE_STUDIES = Object.values(files)
  .map((m) => m.default ?? m)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  .map((c) => ({
    ...c,
    shots: (c.shots || []).map(toShot),
    // the card image on the list pages and the homepage rail is the first shot
    hero: c.shots?.[0] ?? "",
  }));

export const getCaseStudy = (slug) => CASE_STUDIES.find((c) => c.slug === slug) || CASE_STUDIES[0];
