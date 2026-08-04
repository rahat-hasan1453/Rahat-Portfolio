import gsap from "gsap";

/* =========================================================================
   Centre focus for image tickers.

   Every image ticker on the site rests its frames at a dimmed opacity so the
   strip reads as texture rather than a gallery. Whichever frame is crossing
   the middle of the screen burns up to full — so there is always exactly one
   image at 100%, and it changes as the strip travels.

   Driven off gsap's ticker (not rAF) so it stays in step with the marquee
   tweens, and off the live rect so it works for scaled/tilted tracks too.
   Hovering or press-holding a frame still wins: those set data-held / :hover,
   which we honour by pinning that frame at full.

   The easing is done HERE, per frame, rather than with a CSS transition. A
   `transition-opacity` on the cell would restart every frame against a target
   that never stops moving, and the value would crawl along ~40% behind — the
   centre frame reached about 0.5 instead of 1. So the cells carry no opacity
   transition, and this lerp supplies the smoothing instead.

   attach() returns a detach fn — call it from the gsap.context cleanup.
   ========================================================================= */
export function attachTickerFocus(selector = ".ticker-cell", { base = 0.4, ease = 0.18 } = {}) {
  const cells = gsap.utils.toArray(selector);
  if (!cells.length) return () => {};

  const current = new Map(cells.map((cell) => [cell, base]));

  const focus = () => {
    const mid = window.innerWidth / 2;
    cells.forEach((cell) => {
      const r = cell.getBoundingClientRect();
      if (!r.width) return;
      const held = cell.dataset.held !== undefined || cell.matches(":hover");
      // 1 at dead centre, 0 once a full card away
      const t = Math.max(0, 1 - Math.abs(r.left + r.width / 2 - mid) / r.width);
      const target = held ? 1 : base + (1 - base) * t * t;
      const next = current.get(cell) + (target - current.get(cell)) * ease;
      current.set(cell, next);
      cell.style.opacity = next.toFixed(3);
    });
  };

  gsap.ticker.add(focus);
  return () => {
    gsap.ticker.remove(focus);
    cells.forEach((cell) => {
      cell.style.opacity = "";
    });
  };
}
