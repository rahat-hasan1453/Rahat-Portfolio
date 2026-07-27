import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

/* =========================================================================
   Route loading screen (Figma 0:1 loading frames).
   • quote reveals word-by-word in the red gradient
   • home/site loader runs a 0→100 counter that rolls upward (trionn-style reel)
   • on finish the screen breaks into vertical panels that slide down & off,
     uncovering the page (himon-style reveal)
   Grid: solid outer rails + two dashed inner rails that fade out to the bottom.
   ========================================================================= */

const EASE = [0.16, 1, 0.3, 1];
const PANELS = 5; // vertical reveal columns
const FONT_PX = 120; // counter font-size (drives the reel's per-digit height)

// duration = time on screen before the reveal; hold = pause after; wordStep/
// wordDur pace the quote; exitStagger/exitDur pace the panel reveal. The page
// loaders (about / case study) are tuned so the whole thing stays under ~1.5s.
export const LOADERS = {
  home: {
    quote: "Be an amateur, that’s all any of us are: We didn’t live long enough to be anything else.",
    by: "Sir Charles Spencer Chaplin",
    counter: true,
    duration: 2000,
    hold: 150,
    wordStep: 0.05,
    wordDur: 0.55,
    exitStagger: 0.06,
    exitDur: 0.45,
  },
  // returning to the homepage later in the session — quote only, no counter
  homeReturn: {
    quote: "Be an amateur, that’s all any of us are: We didn’t live long enough to be anything else.",
    by: "Sir Charles Spencer Chaplin",
    counter: false,
    duration: 700,
    hold: 80,
    wordStep: 0.02,
    wordDur: 0.4,
    exitStagger: 0.05,
    exitDur: 0.38,
  },
  casestudies: {
    quote: "Whitespace is like air: it is necessary for design to breathe.",
    by: "Wojciech Zieliński",
    counter: false,
    duration: 620,
    hold: 100,
    wordStep: 0.025,
    wordDur: 0.4,
    exitStagger: 0.05,
    exitDur: 0.38,
  },
  about: {
    quote: "Styles come and go. Good design is a language, not a style.",
    by: "Massimo Vignelli",
    counter: false,
    duration: 620,
    hold: 100,
    wordStep: 0.025,
    wordDur: 0.4,
    exitStagger: 0.05,
    exitDur: 0.38,
  },
  casestudydetail: {
    quote: "Design is not just what it looks like and feels like. Design is how it works.",
    by: "Steve Jobs",
    counter: false,
    duration: 620,
    hold: 100,
    wordStep: 0.025,
    wordDur: 0.4,
    exitStagger: 0.05,
    exitDur: 0.38,
  },
};

// dashed inner rail that fades out toward the bottom ("blends to bottom")
const dashFade = {
  backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.2) 0 10px, transparent 10px 20px)",
  backgroundSize: "1px 20px",
  maskImage: "linear-gradient(to bottom, #000 0%, #000 42%, transparent 82%)",
  WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 42%, transparent 82%)",
};

/* rolling %-counter — a 0..100 strip inside a one-line window; the strip
   scrolls upward as the value climbs, so each number rises in from the bottom. */
function NumberReel({ mv }) {
  const y = useTransform(mv, (v) => -v * FONT_PX);
  return (
    <div
      className="font-serif-display absolute bottom-[40px] right-[40px] flex items-end tracking-[2.24px] [font-variant-numeric:tabular-nums]"
      style={{ fontSize: FONT_PX, lineHeight: 1 }}
    >
      <span className="relative block overflow-hidden" style={{ height: "1em", width: "1.72em" }}>
        <motion.span className="absolute right-0 top-0 flex flex-col items-end" style={{ y }}>
          {Array.from({ length: 101 }, (_, n) => (
            <span key={n} className="accent-gradient-text block text-right" style={{ height: "1em", lineHeight: 1 }}>
              {n}
            </span>
          ))}
        </motion.span>
      </span>
      <span className="accent-gradient-text">%</span>
    </div>
  );
}

/* the counting intro belongs to the very first site load only. Once a home
   loader has actually finished, later visits to the homepage (within this
   page-life) get the shorter quote-only version. Flipped on completion — not
   on mount — so StrictMode's discarded first mount can't trip it. */
let homeIntroShown = false;

export default function Loader({ variant = "home", onDone }) {
  const isHome = variant === "home";
  const key = isHome && homeIntroShown ? "homeReturn" : variant;
  const data = LOADERS[key] || LOADERS.home;
  const words = data.quote.split(" ");
  const [phase, setPhase] = useState("loading");
  const mv = useMotionValue(0);

  // count up, then move to the exit (panel reveal) phase
  useEffect(() => {
    const controls = data.counter
      ? animate(mv, 100, { duration: data.duration / 1000, ease: [0.5, 0, 0.2, 1] })
      : null;
    const t = setTimeout(() => setPhase("exiting"), data.duration + data.hold);
    return () => {
      controls?.stop();
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  // once the panels have slid away, unmount
  useEffect(() => {
    if (phase !== "exiting") return;
    const exitMs = (data.exitStagger * (PANELS - 1) + data.exitDur) * 1000 + 40;
    const t = setTimeout(() => {
      if (isHome) homeIntroShown = true; // intro is spent — later visits skip the counter
      onDone?.();
    }, exitMs);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, onDone]);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" data-loader={key}>
      {/* opaque background made of vertical panels — slide down & off on exit */}
      <motion.div
        className="absolute inset-0"
        initial="loading"
        animate={phase === "exiting" ? "exiting" : "loading"}
        variants={{ exiting: { transition: { staggerChildren: data.exitStagger } } }}
      >
        {Array.from({ length: PANELS }, (_, i) => (
          <motion.div
            key={i}
            className="bg-ink absolute top-0 h-full"
            style={{ left: `${(i * 100) / PANELS}%`, width: `calc(${100 / PANELS}% + 1px)` }}
            variants={{
              loading: { y: 0 },
              exiting: { y: "100%", transition: { duration: data.exitDur, ease: [0.76, 0, 0.24, 1] } },
            }}
          />
        ))}
      </motion.div>

      {/* content — grid + quote + counter; fades as the panels leave */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: phase === "exiting" ? 0 : 1 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        {/* centred 1440 grid — solid outer rails + two dashed rails fading to bottom */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-full w-[1440px] -translate-x-1/2">
          <span className="absolute inset-y-0 left-0 w-px bg-white/40" />
          <span className="absolute inset-y-0 w-px" style={{ left: 360, ...dashFade }} />
          <span className="absolute inset-y-0 w-px" style={{ left: 1080, ...dashFade }} />
          <span className="absolute inset-y-0 right-0 w-px bg-white/40" />
          {data.counter && <NumberReel mv={mv} />}
        </div>

        {/* quote + attribution */}
        <div className="relative flex max-w-[560px] flex-col items-center gap-[20px] px-[20px] text-center">
          <h2 className="font-serif-display text-[40px] leading-[48px] tracking-[1.6px]">
            {words.map((w, i) => (
              <motion.span
                key={i}
                className="accent-gradient-text mr-[0.26em] inline-block"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: data.wordDur, ease: EASE, delay: 0.08 + i * data.wordStep }}
              >
                {w}
              </motion.span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.08 + words.length * data.wordStep }}
            className="font-jakarta text-[14px] font-medium leading-[24px] tracking-[0.56px] text-grey"
          >
            {"– "}
            {data.by}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
