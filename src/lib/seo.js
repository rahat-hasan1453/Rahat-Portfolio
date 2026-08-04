/* =========================================================================
   Per-route page metadata.

   The site is a single HTML document, so the title and description have to be
   swapped as the route changes — otherwise every page reports itself as the
   homepage, which is what search results and browser history showed before.

   SITE_URL is used for canonical + Open Graph URLs. Set it to the live domain;
   everything else is derived from it.
   ========================================================================= */

export const SITE_URL = "https://rahat-uxd.vercel.app";
export const SITE_NAME = "Rahat Hasan";
export const OG_IMAGE = `${SITE_URL}/assets/og-cover.jpg`;

const HOME_DESC =
  "Rahat Hasan — product-minded UX Engineer at Selise Digital Platform, Dhaka. Nearly 4 years designing SaaS, enterprise and mobile products end to end, from discovery to delivery.";

export const ROUTES = {
  home: {
    path: "/",
    title: "Rahat Hasan — Product Designer & UX Engineer",
    description: HOME_DESC,
  },
  about: {
    path: "/about",
    title: "About — Rahat Hasan",
    description:
      "How a computer-science student became a UX Engineer: the work, the process, the tools, and the whiteboard interview that got me into Selise Digital Platform.",
  },
  caseStudies: {
    path: "/case-studies",
    title: "Case Studies — Rahat Hasan",
    description:
      "Selected product design work: meeting scheduling cut from 32 clicks to 11, contactless visitor management, and an all-in-one AI assistant on the App Store.",
  },
};

/** Detail pages are behind an access code, so they are deliberately not
 *  indexed — but they still carry a real title and preview card, because the
 *  links do get shared directly. */
export const caseStudyMeta = (study) => {
  if (!study) return null;
  return {
    path: `/case-studies/${study.slug}`,
    title: `${study.title} — Case Study by Rahat Hasan`,
    description: study.desc,
    image: `${SITE_URL}${study.hero}`,
    noindex: true,
  };
};

/* ---- applying it to the document ---------------------------------------- */

const setMeta = (selector, attr, value) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    const [, name, key] = selector.match(/\[(property|name)="([^"]+)"\]/) || [];
    if (name && key) el.setAttribute(name, key);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

export function applyMeta(meta) {
  if (!meta) return;
  const url = `${SITE_URL}${meta.path}`;
  const image = meta.image || OG_IMAGE;

  document.title = meta.title;
  setMeta('meta[name="description"]', "content", meta.description);

  setMeta('meta[property="og:title"]', "content", meta.title);
  setMeta('meta[property="og:description"]', "content", meta.description);
  setMeta('meta[property="og:url"]', "content", url);
  setMeta('meta[property="og:image"]', "content", image);
  setMeta('meta[name="twitter:title"]', "content", meta.title);
  setMeta('meta[name="twitter:description"]', "content", meta.description);
  setMeta('meta[name="twitter:image"]', "content", image);

  // gated pages stay out of the index; everything else is fair game
  setMeta('meta[name="robots"]', "content", meta.noindex ? "noindex, follow" : "index, follow");

  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}
