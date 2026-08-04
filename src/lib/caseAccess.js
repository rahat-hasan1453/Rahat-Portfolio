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
   │  TO CHANGE THE CODE OR HOW LONG AN UNLOCK LASTS, EDIT THE TWO LINES  │
   │  BELOW. Nothing else in the app hardcodes either value.              │
   └──────────────────────────────────────────────────────────────────────┘
   ========================================================================= */

/** The code visitors type in. Any length works — the modal draws one box per
 *  digit and checks itself as soon as the last box is filled. */
export const CASE_PIN = "1453";

/** How long a single study stays open before its code is asked for again. */
export const ACCESS_MINUTES = 30;

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

export const checkPin = (value) => value === CASE_PIN;
