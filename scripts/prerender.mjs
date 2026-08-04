import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

/* =========================================================================
   Post-build: write a real HTML file for every route.

   Two problems this solves, both invisible in development:

   1. A static host has no /about file to serve. Without this you need an SPA
      rewrite rule, and if the host isn't configured for it, every direct link
      and refresh 404s. Writing dist/about/index.html means the path just
      works — no host configuration at all.

   2. Link-preview crawlers (LinkedIn, WhatsApp, Slack, iMessage, X) do not
      run JavaScript. They read the HTML as served. Meta set at runtime is
      invisible to them, so every shared link showed the homepage's card.
      Baking the per-route tags in fixes that.

   The page still boots as the same SPA — this only changes the HTML shell it
   boots from. Run automatically by `npm run build`.
   ========================================================================= */

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

/* Read the routes straight from the app so the two can't drift. Both files are
   plain ESM with no JSX, so they import directly under node. */
const { ROUTES, caseStudyMeta, SITE_URL, OG_IMAGE } = await import("../src/lib/seo.js");
const { loadCaseStudies } = await import("./lib/content.mjs");
const CASE_STUDIES = loadCaseStudies();

const shell = readFileSync(join(dist, "index.html"), "utf8");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function render(meta) {
  const url = `${SITE_URL}${meta.path}`;
  const image = meta.image || OG_IMAGE;
  return shell
    .replace(/<title>.*?<\/title>/s, `<title>${esc(meta.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=)"[^"]*"/s, `$1"${esc(meta.description)}"`)
    // the source file wraps long content attributes onto their own lines
    .replace(/(<meta\s*\n\s*name="description"\s*\n\s*content=)"[^"]*"/s, `$1"${esc(meta.description)}"`)
    .replace(/(<link rel="canonical" href=)"[^"]*"/, `$1"${url}"`)
    .replace(/(<meta name="robots" content=)"[^"]*"/, `$1"${meta.noindex ? "noindex, follow" : "index, follow"}"`)
    .replace(/(<meta property="og:title" content=)"[^"]*"/, `$1"${esc(meta.title)}"`)
    .replace(/(<meta\s*\n\s*property="og:description"\s*\n\s*content=)"[^"]*"/s, `$1"${esc(meta.description)}"`)
    .replace(/(<meta property="og:url" content=)"[^"]*"/, `$1"${url}"`)
    .replace(/(<meta property="og:image" content=)"[^"]*"/, `$1"${image}"`)
    .replace(/(<meta name="twitter:title" content=)"[^"]*"/, `$1"${esc(meta.title)}"`)
    .replace(/(<meta\s*\n\s*name="twitter:description"\s*\n\s*content=)"[^"]*"/s, `$1"${esc(meta.description)}"`)
    .replace(/(<meta name="twitter:image" content=)"[^"]*"/, `$1"${image}"`);
}

const pages = [
  ROUTES.home,
  ROUTES.about,
  ROUTES.caseStudies,
  ...CASE_STUDIES.map((c) => caseStudyMeta(c)),
];

for (const meta of pages) {
  const out = meta.path === "/" ? join(dist, "index.html") : join(dist, meta.path, "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, render(meta));
  console.log(`  prerendered  ${meta.path.padEnd(28)} ${meta.title}`);
}

/* A static host still needs somewhere to land for an unknown path. Copying the
   home shell to 404.html covers GitHub Pages and Netlify, and is harmless
   elsewhere. */
writeFileSync(join(dist, "404.html"), render(ROUTES.home));
console.log(`  prerendered  ${"404.html".padEnd(28)} (fallback)`);

/* robots.txt and sitemap.xml are generated rather than checked in, so the
   domain lives in exactly one place (SITE_URL in src/lib/seo.js) and the three
   files can never disagree about it. Gated case studies are excluded from the
   sitemap and disallowed — there is nothing for a crawler to read behind the
   access code. */
const indexable = [ROUTES.home, ROUTES.about, ROUTES.caseStudies];

writeFileSync(
  join(dist, "robots.txt"),
  `User-agent: *
Allow: /

# Case study detail pages sit behind an access code — nothing to index there
Disallow: /case-studies/*/

# the CMS is not content
Disallow: /admin/

Sitemap: ${SITE_URL}/sitemap.xml
`
);

writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${r.path === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`
);
console.log(`  generated    ${"robots.txt + sitemap.xml".padEnd(28)} ${SITE_URL}`);
