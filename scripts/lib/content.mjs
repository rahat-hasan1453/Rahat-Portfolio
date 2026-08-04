import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

/* Node-side reader for the same content the app loads.

   The app reads /content through Vite's import.meta.glob, which only exists
   inside the bundler. Build scripts run in plain node, so they read the files
   straight off disk here. Both paths produce the same shape — this is the only
   duplication, and it is a dozen lines rather than a build-time dependency on
   the bundler. */

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const DIR = join(root, "content/case-studies");
const SIZES = join(root, "src/data/imageSizes.json");

const readJson = (p, fallback) => (existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : fallback);

export function loadCaseStudies() {
  if (!existsSync(DIR)) return [];
  const sizes = readJson(SIZES, {});
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => readJson(join(DIR, f), null))
    .filter(Boolean)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((c) => ({
      ...c,
      shots: (c.shots || []).map((src) => ({ src, ...(sizes[src] || { w: 4, h: 3 }) })),
      hero: c.shots?.[0] ?? "",
    }));
}

export const loadSettings = () =>
  readJson(join(root, "content/settings.json"), { accessCode: "1453", accessMinutes: 30 });
