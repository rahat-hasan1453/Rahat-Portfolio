import settings from "../../content/settings.json";
import { CASE_STUDIES } from "../data/caseStudies.js";

/* =========================================================================
   Case study access.

   Every study is locked on its own. The code is the same one for all of them
   (including studies added later), but entering it opens ONLY the study it was
   entered for — opening a second study asks again. Each unlock runs its own
   independent timer.

   This is a courtesy gate, not security: it keeps client work off the open web
   for casual visitors while staying a two-second step for anyone who has been
   given the code.

   ┌──────────────────────────────────────────────────────────────────────┐
   │  THE CODE AND THE WINDOW ARE EDITED IN THE CMS (/admin → Settings),  │
   │  which writes content/settings.json. A study can override the code   │
   │  with its own "pin" field; blank means "use the shared one".         │
   └──────────────────────────────────────────────────────────────────────┘
   ========================================================================= */

/** The shared code, used by any study that doesn't set its own. */
export const CASE_PIN = String(settings.accessCode || "1453");

/** How long a single study stays open before its code is asked for again. */
export const ACCESS_MINUTES = Number(settings.accessMinutes) || 30;

/** The code for one study: its own if it has one, otherwise the shared code. */
export const pinFor = (slug) => {
  const own = CASE_STUDIES.find((c) => c.slug === slug)?.pin;
  return own ? String(own) : CASE_PIN;
};

/** How many boxes the modal draws. Studies with their own code may use a
 *  different length, so this is per study too. */
export const pinLengthFor = (slug) => pinFor(slug).length;

export const PIN_LENGTH = CASE_PIN.length;

const TTL = ACCESS_MINUTES * 60 * 1000;
const KEY = "rh_case_access";

/* One timestamp per slug: { "d-pass": 1785…, "ai-agent": 1785… }. localStorage
   throws in private-mode Safari and in some embeds, so every access is guarded
   — a failure just means the gate asks again, which is the safe way to fail. */
const readAll = () => {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
};

let unlocks = readAll();
const listeners = new Set();

const fresh = (stamp) => typeof stamp === "number" && Date.now() - stamp < TTL;

/** Is THIS study currently open? Re-checked on every call, so a window can
 *  lapse mid-visit. Only consulted when a study is opened — nobody reading a
 *  page gets it pulled out from under them when the clock runs out. */
export function isCaseUnlocked(slug) {
  return !!slug && fresh(unlocks[slug]);
}

export function unlockCase(slug) {
  if (!slug) return;
  // drop anything already expired so the entry can't grow forever
  const next = {};
  for (const [key, stamp] of Object.entries(unlocks)) if (fresh(stamp)) next[key] = stamp;
  next[slug] = Date.now();
  unlocks = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(unlocks));
  } catch {
    /* fine — the unlock still holds in memory for this page load */
  }
  listeners.forEach((fn) => fn(slug));
}

export function onCaseAccessChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export const checkPin = (value, slug) => value === pinFor(slug);
