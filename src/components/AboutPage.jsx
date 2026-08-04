import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Footer from "./Footer.jsx";
import { attachTickerFocus } from "../lib/tickerFocus.js";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* =========================================================================
   Figma: node 402:2588 "About" — artboard 1728, inner content 1440
   (x_inner = x_figma − 144). Sections 1–4 absolutely positioned inside a
   4250px wrapper (tightened ~160px gaps between sections); the shared
   site <Footer /> flows after it, outside the 1440 canvas. Process connectors: Figma 423:3578.
   ========================================================================= */

/* portrait fills — same source photos as the home ticker */
const imgR7 = "/assets/839d3a518763fdbf968a2a08c4073a1284670dcf.jpg"; // spark
const imgR6 = "/assets/decfb971c6d641c9ccb852271bc0b630c000cdc2.jpg"; // tall profile
const imgR5 = "/assets/29f89100346cab8bda091f83307e2d146c404f15.jpg"; // warm cinematic
const imgR4 = "/assets/1343981533bfec0aaa59a2166abbcce5317934ec.jpg"; // white-bg smile

/* "Designing @Selise" media (Figma 820:6453) — two counter-tilted team photos
   and the notebook page from the whiteboard interview the copy describes */
const imgTeamTable = "/assets/Group-planning-2048x1536.webp"; // hackathon, sticky notes
const imgTeamWall = "/assets/gathering-solutions-1024x768.webp"; // affinity mapping
const imgSketch = "/assets/about-whiteboard-sketch.jpg"; // the hand-drawn fund-transfer flow

/* tool logos (downloaded from Figma) — all rendered inside a uniform 48×48 box */
const TOOLS_ROW_1 = [
  { src: "/assets/tool-figma.svg" },
  { src: "/assets/tool-framer.svg" },
  { src: "/assets/tool-notion.svg" },
  { src: "/assets/tool-jira.svg" },
  { src: "/assets/tool-slack.svg" },
  { src: "/assets/tool-illustrator.svg" },
];
const TOOLS_ROW_2 = [
  { src: "/assets/tool-photoshop.svg" },
  { src: "/assets/tool-miro.svg" },
  { src: "/assets/tool-claude.svg" },
  { src: "/assets/tool-framermotion.svg" },
  { src: "/assets/tool-clickup.svg" },
  { src: "/assets/tool-asana.svg" },
];
const TOOL_LABELS = ["Whiteboard", "Pen/ Paper", "Sticky Notes"];

const easeShuttle = [0.22, 1, 0.36, 1];

/* intro above the tool grid, desktop and mobile */
const STACKS_TOOLS =
  "To bring ideas to life, I rely on tools that stay out of the way. Some help me think through a problem, others help me ship the answer.";

/* intro above the process staircase — picks up mid-sentence from the steps it introduces */
const STACKS_PROCESS =
  "...from discovery to delivery. The order looks linear, but the work isn’t — every step is a chance to catch what the last one missed.";

const QUOTE =
  "A whiteboard challenge with nothing but pen and paper. No laptop, no Figma, no component library to lean on";

/* ── HERO COPY — edit the story here ───────────────────────────────────────
   Each string is its own paragraph. Add or remove entries freely; the hero
   renders whatever this array holds. "Selise Digital Platform" is auto-linked
   wherever it appears (see copyWithLink below).                            */
const STORY_INTRO = [
  "I studied Computer Science and gave code an honest run, and it never quite caught.",
  "Design did — I was the kid who made our football club’s logo, jersey and flag, without ever opening a design tool and any design knowledge. In college that became oil paintings of every Marvel character I could name.",
  "Then a magazine cover I’d designed landed on the right desk, and someone called with a job offer. That was the door into UX. Everything after it was deliberate: tutorials at night, podcasts from designers further along than me, enough practice to be ready when a real chance came. It came at Selise Digital Platform, where I work today as a UX Engineer.",
];

const DESIGNING_SELISE =
  "When I joined Selise, I saw an opportunity to bring structure and efficiency to the design process. I built a comprehensive design system, ensuring consistency across mobile, tablet, and web. Leading the product design end to end, I shaped the user journeys behind how the product works today. Beyond design, I drive stakeholder alignment and design demos, taking full ownership of the outcome. Getting here meant the hardest interview I’ve ever sat in — a whiteboard challenge with no laptop, no Figma, just a pen and paper. I drew the journey by hand and walked the team through every decision. Strip away the tools and one thing is left: can you think clearly about people? I still answer that question every day, alongside one of the largest and strongest UX teams in Bangladesh.";

const STEPS = ["Discovery call", "Userflow", "Wireframe", "Visual Design", "Handoff"];

/* Staircase geometry. Desktop has room to run the steps out sideways; a phone
   does not, so the mobile variant trades stride for drop — the same five steps
   in a much narrower, much taller box that fills half the screen. */
const PROC_DESKTOP = { w: 880, h: 400, pillW: 200, pillH: 80, stepX: 131, stepY: 80, font: 24, radius: 40 };
const PROC_MOBILE = { w: 350, h: 420, pillW: 176, pillH: 64, stepX: 43.5, stepY: 89, font: 15, radius: 32 };

/* one colour per connector — the arrow paints, then hands its colour to the
   step it points at, so the staircase reads as a story */
const ARROW_COLORS = ["#f16767", "#f5b544", "#4fd18b", "#5aa9f6"];

/* dashed elbow connectors between the pills (Figma 423:3578) —
   drop from under pill i, then run right into pill i+1 with an arrowhead */
function buildProcess(g) {
  /* every step strides the same distance — the last one used to be pinned to
     the right edge, which stretched the final connector out of rhythm */
  const lefts = STEPS.map((_, i) => Math.round(i * g.stepX));
  const tops = STEPS.map((_, i) => i * g.stepY);
  const connectors = STEPS.slice(0, -1).map((_, i) => {
    /* the drop has to start left of where the arrow lands, or the horizontal
       run doubles back on itself. On mobile the stride is far shorter than the
       pill, so cap the inset against the stride, not just the pill width. */
    const stride = lefts[i + 1] - lefts[i];
    const sx = lefts[i] + Math.min(g.pillW * 0.2, stride * 0.35);
    const y0 = tops[i] + g.pillH + 6;
    const bendY = tops[i + 1] + g.pillH / 2;
    const ex = lefts[i + 1] - 14;
    return {
      d: `M ${sx} ${y0} L ${sx} ${bendY} L ${ex} ${bendY}`,
      arrow: `${ex - 5},${bendY - 4} ${ex},${bendY} ${ex - 5},${bendY + 4}`,
    };
  });
  return { lefts, tops, connectors };
}

const EXPERIENCE = [
  { role: "UX Engineer", meta: ["Full time", "Hybrid", "Zurich, Switzerland"], company: "Selise Digital Platform", url: "https://selisegroup.com", period: "Aug’25 - Present" },
  { role: "Associate UX Designer", meta: ["Full time", "Onsite", "Dhaka, Bangladesh"], company: "Project 2morrow Software Ltd.", url: "https://project2morrow.com", period: "May’24 - Aug’25" },
  { role: "UI Designer", meta: ["Full time", "Remote", "Toronto, Canada"], company: "Techplato.inc", url: "https://techplato.com", period: "Sep’23 - May’24" },
  { role: "Jr. UI & Graphic Designer", meta: ["Full time", "Onsite", "Dhaka, Bangladesh"], company: "Unisoft Business Solution Ltd.", url: "https://techplato.com", period: "Jul ’22 - Sep’23" },
];

/* hero marquee set — full Figma card sizes (node 546:5743) */
const HERO_SET = [
  { src: imgR7, w: 221, h: 283 },
  { src: imgR6, w: 221, h: 392 },
  { src: imgR5, w: 221, h: 283 },
  { src: imgR4, w: 221, h: 283 },
];

/* hero section height — grew for the centred title + full-size portraits.
   Sections below are offset from it so the tuned inter-section gaps stay put. */
const HERO_H = 1140;

/* Desktop section heights, stacked under the hero. Chained rather than written
   out as running totals — growing one section now pushes the rest down instead
   of letting them overlap it. */
const SEC_SELISE_H = 1284;
const SEC_STACKS_H = 1342; // ends just under the process staircase (938 + 400)
const SEC_EXP_H = 640;
const SEC_STACKS_TOP = HERO_H + SEC_SELISE_H;
const SEC_EXP_TOP = SEC_STACKS_TOP + SEC_STACKS_H;
const PAGE_H = SEC_EXP_TOP + SEC_EXP_H;

/* ── mobile (Figma 642:3594, 390 frame) ────────────────────────────────────
   Every composed block in the mobile design is the 1440 block at a fixed
   ratio — measured off the Figma frames, they come out exact. So the mobile
   tree reuses the desktop markup inside scaled boxes rather than re-specifying
   it: one source of truth, and every GSAP selector below keeps working as-is. */
const M = {
  heroTicker: 222 / 392, // 0.566 — portrait marquee
  imagePair: 0.75, // tilted pair, 428.2 → 321 wide: fits a 375 frame with air either side
  sketch: 0.75, // notebook card, 363.3 → 272 wide
  tools: 584 / 880, // 0.664 — tool grid (runs wider than the phone)
  process: 0.4, // the staircase, shrunk until it fits the gutter
};

/* a mobile block: the desktop markup at `scale`, in a box the scaled size.
   `bleed` lets a block run past the gutter and be clipped by the page. */
function Scaled({ w, h, scale, className = "", children }) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: w * scale, height: h * scale }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: w, height: h, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

/* mobile section label — same type as desktop, shorter rule (Figma 642:2991) */
function MobileLabel({ italic = false, children }) {
  return (
    <div className="reveal-label flex items-end gap-[8px]">
      <span className="lead-line mb-[16px] h-px w-[54px] origin-left bg-white/20" />
      {italic ? (
        <h2 className="font-serif-display-it whitespace-nowrap text-[24px] italic leading-[32px] tracking-[0.96px] text-white">{children}</h2>
      ) : (
        <p className="font-serif-display whitespace-nowrap text-[28px] leading-[32px] tracking-[1.12px] text-white">{children}</p>
      )}
    </div>
  );
}

/* dashed inner rail (Figma frame SVGs: white/0.2, 0.5px, dash 10-10) */
const DASH = {
  backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.2) 0 10px, transparent 10px 20px)",
  backgroundSize: "1px 20px",
};

/* the horizontal counterpart — same 10-on/10-off rhythm as the rails. Closes
   the page off from the footer, exactly as the Case Studies pages do. */
const DASH_X = {
  backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.2) 0 10px, transparent 10px 20px)",
  backgroundSize: "20px 1px",
  backgroundRepeat: "repeat-x",
};

/* "Selise Digital Platform" reads as an external link wherever it appears in copy */
const SELISE_NAME = "Selise Digital Platform";
const SELISE_URL = "https://selisegroup.com";
function copyWithLink(text) {
  return text.split(SELISE_NAME).flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <a
            key={i}
            href={SELISE_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="text-white underline [text-underline-position:from-font] transition-colors duration-300 hover:text-[#f16767]"
          >
            {SELISE_NAME}
          </a>,
          part,
        ]
  );
}

/* body copy — static, Plus Jakarta Sans regular 16/24, uniform grey #B3B3B3 */
function Body({ children, className = "", style }) {
  return (
    <p className={`font-jakarta text-[16px] font-normal leading-[24px] tracking-[0.64px] text-[#B3B3B3] [word-break:break-word] ${className}`} style={style}>
      {children}
    </p>
  );
}

/* section header — hairline starts at the left grid rail (x 188) and runs to the label.
   Figma: "Designing @Selise" = EightiesComeback Medium 28/32/1.12,
   "Work stacks" / "Work Experience" = EightiesComeback It Medium 24/32/0.96 */
function SectionLabel({ top, lineW = 126, italic = false, children }) {
  return (
    <div className="reveal-label absolute flex items-end gap-[16px]" style={{ left: 188, top }}>
      <span className="lead-line mb-[16px] h-px origin-left bg-white/20" style={{ width: lineW }} />
      {italic ? (
        <h2 className="font-serif-display-it whitespace-nowrap text-[24px] italic leading-[32px] tracking-[0.96px] text-white">{children}</h2>
      ) : (
        <p className="font-serif-display whitespace-nowrap text-[28px] leading-[32px] tracking-[1.12px] text-white">{children}</p>
      )}
    </div>
  );
}

/* Desktop tiles share the 880 row via flex-1. The mobile tickers need a fixed
   pitch instead — a flex-1 tile inside a w-max marquee track has nothing to
   divide — so `width` switches the tile to explicit sizing. */
function ToolTile({ icon, height = 144, width }) {
  const isLogo = typeof icon !== "string";
  const fixed = width != null;
  return (
    <div
      className={`stack-tile flex items-center justify-center rounded-[40px] border border-solid border-[#131313] bg-[#1c1c1c] ${fixed ? "shrink-0" : `flex-1 ${isLogo ? "aspect-square" : ""}`}`}
      style={fixed ? { width, height: isLogo ? width : height } : isLogo ? undefined : { height }}
    >
      {typeof icon === "string" ? (
        <span className="font-urbanist text-[24px] font-medium text-white">{icon}</span>
      ) : (
        <span className="relative block size-[48px] shrink-0">
          <img alt="" src={icon.src} className="absolute inset-0 block size-full max-w-none object-contain" />
        </span>
      )}
    </div>
  );
}

function HeroTickerSet() {
  return (
    <div className="flex shrink-0 items-center gap-[18px] pr-[18px]">
      {HERO_SET.map((im, i) => (
        <div
          key={i}
          className="ticker-cell relative shrink-0 overflow-hidden rounded-[17.687px] bg-[#1c1c1c] opacity-40 hover:opacity-100"
          style={{ width: im.w, height: im.h }}
        >
          <img alt="Rahat Hasan" src={im.src} className="absolute inset-0 size-full max-w-none object-cover" draggable="false" />
        </div>
      ))}
    </div>
  );
}

/* ── blocks shared by both layouts ────────────────────────────────────────
   Each is drawn at its desktop size; the mobile tree wraps them in <Scaled>. */

/* The two tilted team photos beside "Designing @Selise" (Figma 820:6469) —
   428.2 × 425.5. Each card counter-rotates 15°, and the rotation has to sit on
   an inner div: GSAP drives the [data-parallax] element and clears `rotate` on
   anything it touches, which would flatten a Tailwind rotate utility there.
   The listed box sizes are the rotated bounding boxes, e.g. a 275 × 266 card at
   15° measures 275·cos15 + 266·sin15 = 334.5 wide. */
const PAIR_BOX = { w: 428.2, h: 425.514 };

function TiltCard({ src, alt, w, h, tilt }) {
  return (
    <div
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[24px] bg-[#1c1c1c] ${tilt}`}
      style={{ width: w, height: h }}
    >
      <img alt={alt} src={src} className="absolute inset-0 size-full max-w-none object-cover" />
    </div>
  );
}

function ImagePair() {
  return (
    <>
      <div data-parallax="-40" className="absolute" style={{ left: 0, top: 0, width: 334.475, height: 328.112 }}>
        <TiltCard src={imgTeamTable} alt="Hackathon working session at Selise — the team mapping ideas on sticky notes" w={275} h={266} tilt="rotate-15" />
      </div>
      <div data-parallax="30" className="absolute" style={{ left: 194.27, top: 191.59, width: 233.926, height: 233.926 }}>
        <TiltCard src={imgTeamWall} alt="The Selise team clustering notes on the wall during an affinity mapping session" w={191} h={191} tilt="-rotate-15" />
      </div>
    </>
  );
}

/* The notebook page from the whiteboard interview (Figma 820:6473) — a 282 ×
   351.3 card at -15°, so the bounding box is 363.3 × 412.3. The inner offsets
   are Figma's crop, not object-cover: the designer pushed the page left and
   scaled it up so the drawn flow fills the card and the desk edge falls away. */
const SKETCH_BOX = { w: 363.314, h: 412.317 };

function SketchCard() {
  return (
    <div className="absolute left-1/2 top-1/2 h-[351.3px] w-[282px] -translate-x-1/2 -translate-y-1/2 -rotate-15 overflow-hidden rounded-[24px] bg-[#1c1c1c]">
      <img
        alt="A notebook page of hand-drawn wireframes — the fund-transfer flow from the whiteboard interview"
        src={imgSketch}
        className="absolute left-[-4.79%] top-0 h-[109.31%] w-[111.91%] max-w-none"
      />
    </div>
  );
}

// tool grid — 880 wide, three rows (icons / word tiles / icons)
function ToolGrid() {
  return (
    <div className="stack-grid flex w-[880px] flex-col">
      <div className="flex items-center">
        {TOOLS_ROW_1.map((ic, i) => <ToolTile key={i} icon={ic} />)}
      </div>
      <div className="flex items-center">
        {TOOL_LABELS.map((l) => <ToolTile key={l} icon={l} height={103} />)}
      </div>
      <div className="flex items-center">
        {TOOLS_ROW_2.map((ic, i) => <ToolTile key={i} icon={ic} />)}
      </div>
    </div>
  );
}

/* one self-looping tool row for mobile. Contents are doubled so a ±50% slide
   lands exactly one copy along and repeats without a seam. */
const TILE_W = 880 / 6; // 146.67 — six icons across the desktop row
const LABEL_W = 880 / 3; // 293.33 — three word tiles across it
function ToolTickerRow({ items, trackRef, width, height }) {
  const copy = (key) => (
    <div key={key} className="flex shrink-0 items-center">
      {items.map((ic, i) => (
        <ToolTile key={i} icon={ic} width={width} height={height} />
      ))}
    </div>
  );
  return (
    <div ref={trackRef} className="flex w-max" style={{ willChange: "transform" }}>
      {copy("a")}
      {copy("b")}
    </div>
  );
}

// the process staircase with its dashed elbow connectors
function ProcessFlow({ geo = PROC_DESKTOP }) {
  const { lefts, tops, connectors } = buildProcess(geo);
  return (
    <div className="process-flow relative" style={{ width: geo.w, height: geo.h }}>
      <svg className="pointer-events-none absolute inset-0" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} fill="none" aria-hidden="true">
        <defs>
          {connectors.map((c, i) => (
            <mask key={i} id={`proc-mask-${i}`}>
              <path className="proc-mask-path" d={c.d} stroke="#fff" strokeWidth="6" fill="none" />
            </mask>
          ))}
        </defs>
        {connectors.map((c, i) => (
          <g key={i} mask={`url(#proc-mask-${i})`}>
            <path className="proc-dash" d={c.d} stroke={ARROW_COLORS[i % ARROW_COLORS.length]} strokeWidth="1.2" fill="none" strokeDasharray="4 5" />
          </g>
        ))}
        {connectors.map((c, i) => (
          <polyline key={i} className="proc-arrow" points={c.arrow} stroke={ARROW_COLORS[i % ARROW_COLORS.length]} strokeWidth="1.2" fill="none" opacity="0" />
        ))}
      </svg>
      {STEPS.map((label, i) => (
        <div
          key={i}
          /* the first step is the only one no arrow points at, so it carries a
             white stroke of its own instead of inheriting a connector colour */
          className={`process-pill absolute flex items-center justify-center border border-solid bg-[#1c1c1c] px-[16px] ${
            i === 0 ? "border-white" : "border-[#131313]"
          }`}
          style={{ left: lefts[i], top: tops[i], width: geo.pillW, height: geo.pillH, borderRadius: geo.radius }}
        >
          <span className="font-urbanist whitespace-pre-line text-center font-medium leading-none text-white" style={{ fontSize: geo.font }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ── mobile layout (Figma 642:3594) ───────────────────────────────────────
   A plain flowing column. Every animation hook the desktop tree uses is on
   the same class names here, so the single useGSAP block below drives both. */
function MobileBody({ heroTickerRef, toolsRowRefs }) {
  const copyIndent = "ml-[54px] w-[calc(100%-54px)]";
  return (
    <div className="relative w-full overflow-hidden">
      {/* ===================== HERO ===================== */}
      <section className="relative w-full pt-[119px]">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeShuttle }}
          className="font-serif-display gutter text-[40px] leading-[44px] tracking-[1.6px]"
        >
          <span className="accent-gradient-text -mx-[10px] -my-[8px] block px-[10px] py-[8px]">{"Journey "}</span>
          <span className="accent-gradient-text -mx-[10px] -my-[8px] block px-[10px] py-[8px]">to Design</span>
        </motion.h1>

        <div className="gutter mt-[40px]">
          <div className={`hero-appear flex flex-col gap-[14px] ${copyIndent}`}>
            {STORY_INTRO.map((para, i) => (
              <Body key={i}>{copyWithLink(para)}</Body>
            ))}
          </div>
          <div className="hero-appear mt-[16px] h-px w-[49px] bg-white/40" />
        </div>

        {/* portrait marquee — full-bleed, ink fade both edges */}
        <div className="hero-appear relative mt-[40px] w-full overflow-hidden" style={{ height: 392 * M.heroTicker }}>
          <div className="absolute left-0 top-0 origin-top-left" style={{ transform: `scale(${M.heroTicker})` }}>
            <div ref={heroTickerRef} className="flex w-max items-center" style={{ height: 392 }}>
              <HeroTickerSet />
              <HeroTickerSet />
              <HeroTickerSet />
              <HeroTickerSet />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[64px]" style={{ background: "linear-gradient(to right, #12110d, rgba(18,17,13,0))" }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[64px]" style={{ background: "linear-gradient(to left, #12110d, rgba(18,17,13,0))" }} />
        </div>
      </section>

      {/* ===================== DESIGNING @SELISE ===================== */}
      <section className="relative w-full pt-[80px]">
        <div className="gutter">
          <MobileLabel>Designing @Selise</MobileLabel>
          <Body className={`reveal-up mt-[20px] ${copyIndent}`}>{copyWithLink(DESIGNING_SELISE)}</Body>
        </div>

        <div className="mt-[24px] flex w-full justify-center">
          <Scaled w={PAIR_BOX.w} h={PAIR_BOX.h} scale={M.imagePair} className="reveal-up">
            <ImagePair />
          </Scaled>
        </div>

        {/* The 1440 layout sets the notebook and its line side by side; a phone
            has no room for that, so they stack — sketch centred, quote given
            the full column underneath. */}
        <div className="mt-[48px] flex w-full justify-center">
          <Scaled w={SKETCH_BOX.w} h={SKETCH_BOX.h} scale={M.sketch} className="reveal-up">
            <SketchCard />
          </Scaled>
        </div>
        <div className="gutter mt-[32px]">
          <p className="reveal-up font-serif-display text-[24px] leading-[32px] tracking-[0.96px] text-[#b3b3b3]">
            {QUOTE}
          </p>
        </div>
      </section>

      {/* ===================== WORK STACKS ===================== */}
      <section className="relative w-full pt-[64px]">
        <div className="gutter">
          <MobileLabel italic>Work stacks</MobileLabel>
          <Body className={`reveal-up mt-[20px] ${copyIndent}`}>{copyWithLink(STACKS_TOOLS)}</Body>
        </div>

        {/* Tool grid runs wider than the phone, so each row tickers on its own —
            outer rows drift right, the word row counter-drifts left. The scale
            sits on the wrapper, never on a marquee track: GSAP clears `scale`
            on anything it drives, which would wipe a Tailwind scale utility. */}
        <div className="relative mt-[40px] w-full overflow-hidden" style={{ height: 396.33 * M.tools }}>
          <div className="absolute left-0 top-0 origin-top-left" style={{ transform: `scale(${M.tools})` }}>
            <div className="stack-grid flex flex-col">
              <ToolTickerRow items={TOOLS_ROW_1} trackRef={toolsRowRefs[0]} width={TILE_W} />
              <ToolTickerRow items={TOOL_LABELS} trackRef={toolsRowRefs[1]} width={LABEL_W} height={103} />
              <ToolTickerRow items={TOOLS_ROW_2} trackRef={toolsRowRefs[2]} width={TILE_W} />
            </div>
          </div>
        </div>

        <div className="gutter mt-[60px]">
          <Body className="reveal-up">{copyWithLink(STACKS_PROCESS)}</Body>
          {/* the staircase gets its own taller geometry here, not a shrunk
              copy of the desktop one — see PROC_MOBILE */}
          <div className="mt-[40px]">
            <ProcessFlow geo={PROC_MOBILE} />
          </div>
        </div>
      </section>

      {/* ===================== WORK EXPERIENCE ===================== */}
      <section className="relative w-full pb-[40px] pt-[80px]">
        <div className="gutter">
          <MobileLabel italic>Work Experience</MobileLabel>
          {/* mobile stacks each row: role / meta / company / period */}
          <div className="exp-list mt-[40px] w-full">
            {EXPERIENCE.map((job, i) => (
              <div key={i} className="exp-row w-full">
                {i > 0 && <div className="my-[20px] h-px w-full bg-white/10" />}
                {/* Figma 642:3489 sets 16 under the role, then 4 between the
                    meta / company / period lines — they read as one block */}
                <div className="flex w-full flex-col gap-[4px]">
                  <p className="mb-[12px] font-serif-display text-[16px] leading-[24px] tracking-[0.64px] text-white">{job.role}</p>
                  <div className="flex flex-wrap items-center gap-[8px]">
                    {job.meta.map((m, j) => (
                      <span key={j} className="flex items-center gap-[8px]">
                        {j > 0 && <span className="size-[4px] rounded-full bg-grey" />}
                        <span className="font-jakarta text-[14px] font-normal leading-[24px] tracking-[0.56px] text-grey">{m}</span>
                      </span>
                    ))}
                  </div>
                  <a href={job.url} target="_blank" rel="noreferrer noopener" className="font-serif-display w-fit text-[16px] leading-[24px] tracking-[0.64px] text-white underline [text-underline-position:from-font] transition-colors duration-300 hover:text-[#f16767]">
                    {job.company}
                  </a>
                  <p className="font-jakarta text-[16px] font-normal leading-[24px] tracking-[0.64px] text-grey">{job.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AboutPage() {
  const rootRef = useRef(null);
  const heroTickerRef = useRef(null);
  // three tool rows, each on its own track so they can run opposite ways
  const toolsRowRefs = [useRef(null), useRef(null), useRef(null)];
  const [isNarrow, setIsNarrow] = useState(() => window.matchMedia("(max-width: 1023px)").matches);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setIsNarrow(mq.matches);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useGSAP(
    () => {
      // hero portrait marquee — continuous ticker
      gsap.to(heroTickerRef.current, { xPercent: -50, ease: "none", duration: 36, repeat: -1 });

      /* tool rows: outer two travel left→right, the word row counter-travels
         right→left. A track is two copies wide, so -50% and 0 paint the same
         thing — sliding between them loops invisibly whichever way it runs. */
      [1, -1, 1].forEach((dir, i) => {
        const track = toolsRowRefs[i].current;
        if (!track) return;
        gsap.fromTo(
          track,
          { xPercent: dir > 0 ? -50 : 0 },
          { xPercent: dir > 0 ? 0 : -50, ease: "none", duration: 26 + i * 5, repeat: -1 }
        );
      });

      /* Centre focus: whichever ticker cell is crossing the middle of the
         screen burns up to full, the rest sit back at the resting 40%. */
      const detachFocus = attachTickerFocus(".ticker-cell");

      // hero layers appear on mount (above the fold), after the heading
      gsap.fromTo(".hero-appear", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.15, delay: 0.25,
      });

      // section labels — fade up + hairline grows
      gsap.utils.toArray(".reveal-label").forEach((el) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%" } });
        tl.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
          .fromTo(el.querySelector(".lead-line"), { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power3.out" }, 0.1);
      });

      // parallax drift
      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          y: () => Number(el.dataset.parallax),
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
        });
      });

      // generic reveal-up
      gsap.utils.toArray(".reveal-up").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } });
      });

      // tool tiles pop in
      gsap.fromTo(".stack-tile", { opacity: 0, scale: 0.5 }, {
        opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)", stagger: 0.03,
        scrollTrigger: { trigger: ".stack-grid", start: "top 82%" },
      });

      // process pills cascade in first — the steps exist before the story runs
      gsap.fromTo(".process-pill", { opacity: 0, x: -24 }, {
        opacity: 1, x: 0, duration: 0.5, ease: "power3.out", stagger: 0.07,
        scrollTrigger: { trigger: ".process-flow", start: "top 80%" },
      });

      // ── the story: arrow 1 travels Discovery call → Userflow, and Userflow
      //    takes that arrow's colour; then arrow 2 sets off, Wireframe takes
      //    its colour… on down to Feedbacks & Handoff ──
      const maskPaths = gsap.utils.toArray(".proc-mask-path");
      const arrowHeads = gsap.utils.toArray(".proc-arrow");
      const pills = gsap.utils.toArray(".process-pill");

      maskPaths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      const story = gsap.timeline({
        delay: 0.45, // let the pills land first
        scrollTrigger: { trigger: ".process-flow", start: "top 80%" },
      });
      maskPaths.forEach((p, i) => {
        const color = ARROW_COLORS[i % ARROW_COLORS.length];
        story
          .to(p, { strokeDashoffset: 0, duration: 0.55, ease: "power1.inOut" })
          .to(arrowHeads[i], { opacity: 1, duration: 0.18 }, ">-0.12")
          // the step this arrow points at adopts its colour
          .to(pills[i + 1], { borderColor: color, duration: 0.35, ease: "power2.out" }, "<")
          .to(pills[i + 1], { boxShadow: `0 0 18px -4px ${color}`, duration: 0.35, ease: "power2.out" }, "<");
      });

      // marching dashes, forever
      gsap.to(".proc-dash", { strokeDashoffset: -18, duration: 1.4, ease: "none", repeat: -1 });

      // experience rows
      gsap.fromTo(".exp-row", { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: ".exp-list", start: "top 84%" },
      });

      // gsap.context reverts its own tweens, but the ticker callback is ours
      return detachFocus;
    },
    // the two layouts are separate trees, so crossing the breakpoint has to
    // tear the whole set down and rebuild it against the tree that is now up
    { scope: rootRef, dependencies: [isNarrow], revertOnUpdate: true }
  );

  return (
    <>
    <div ref={rootRef} className="bg-ink relative mx-auto w-full lg:w-[1440px]" data-name="About Page">
      {/* one tree at a time — the two layouts share class names and SVG mask
          ids, so rendering both (even hidden) would double every GSAP target */}
      {isNarrow ? (
        <MobileBody heroTickerRef={heroTickerRef} toolsRowRefs={toolsRowRefs} />
      ) : (
      <div className="fit-1440 relative w-full overflow-hidden" style={{ height: PAGE_H }}>
        {/* vertical grid rails — solid white/0.4 at the outer edges, dashed
            white/0.2 (10-10) at the inner gutters (Figma rail SVGs) */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <span className="absolute inset-y-0 w-px bg-white/40" style={{ left: 0 }} />
          <span className="absolute inset-y-0 w-px" style={{ left: 188, ...DASH }} />
          <span className="absolute inset-y-0 w-px" style={{ left: 1250, ...DASH }} />
          <span className="absolute inset-y-0 w-px bg-white/40" style={{ left: 1439 }} />
        </div>

        {/* ===================== HERO — Journey to Design (top 0) ===================== */}
        <section className="absolute left-0 top-0 z-10 w-full" style={{ height: HERO_H }}>
          {/* centred 1020 block: horizontal stub + title + intro, then portraits */}
          <div className="absolute left-1/2 top-[128px] w-[1020px] -translate-x-1/2">
            <div className="flex items-end gap-[20px]">
              {/* short horizontal line — extended 22px left so it touches the
                  dashed rail (x188) with no gap; right end/text unchanged */}
              <div className="hero-appear -ml-[22px] h-px w-[146px] shrink-0 bg-white/40" />

              <div className="flex w-[876px] flex-col items-start gap-[48px]">
                {/* negative margins keep glyph overhangs inside the bg-clip-text paint area */}
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: easeShuttle }}
                  className="font-serif-display text-[84px] leading-[92px] tracking-[3.36px]"
                >
                  <span className="accent-gradient-text -mx-[20px] -my-[14px] block px-[20px] py-[14px]">{"Journey "}</span>
                  <span className="accent-gradient-text -mx-[20px] -my-[14px] block px-[20px] py-[14px]">to Design</span>
                </motion.h1>

                <div className="hero-appear flex w-full flex-col gap-[16px]">
                  {STORY_INTRO.map((para, i) => (
                    <p
                      key={i}
                      className="font-jakarta w-full text-[20px] font-medium leading-[24px] tracking-[0.8px] text-[#B3B3B3] [word-break:break-word]"
                    >
                      {copyWithLink(para)}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* portrait marquee — full-size cards (Figma 546:5743), ink fade both edges */}
            <div className="hero-appear relative mt-[84px] w-full overflow-hidden" style={{ height: 392 }}>
              <div ref={heroTickerRef} className="flex h-full w-max items-center">
                <HeroTickerSet />
                <HeroTickerSet />
                <HeroTickerSet />
                <HeroTickerSet />
              </div>
              <div
                className="pointer-events-none absolute inset-y-0 left-0"
                style={{ width: 114, background: "linear-gradient(to right, #12110d, rgba(18,17,13,0))" }}
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0"
                style={{ width: 160, background: "linear-gradient(to left, #12110d, rgba(18,17,13,0))" }}
              />
            </div>
          </div>
        </section>

        {/* ===================== DESIGNING @SELISE ===================== */}
        {/* Figma 820:6453. Its content frame sits at inner x 190, and every
            offset below is that frame's own geometry re-based onto the label's
            top (156), which is what sets this section's gap from the hero. */}
        <section className="absolute left-0 z-10 w-full" style={{ top: HERO_H, height: SEC_SELISE_H }}>
          <SectionLabel top={156}>Designing @Selise</SectionLabel>

          <Body className="reveal-up absolute" style={{ left: 307, top: 237, width: 473 }}>
            {copyWithLink(DESIGNING_SELISE)}
          </Body>

          {/* tilted team photos, full opacity (Figma 820:6469) */}
          <div className="reveal-up absolute" style={{ left: 821.8, top: 237, width: PAIR_BOX.w, height: PAIR_BOX.h }}>
            <ImagePair />
          </div>

          {/* the interview notebook, and the line it earns (Figma 820:6472) */}
          <div className="reveal-up absolute" style={{ left: 405.34, top: 726.5, width: SKETCH_BOX.w, height: SKETCH_BOX.h }}>
            <SketchCard />
          </div>
          <p className="reveal-up font-serif-display absolute text-[28px] leading-[32px] tracking-[1.12px] text-[#b3b3b3]" style={{ left: 781.66, top: 914.8, width: 253 }}>
            {QUOTE}
          </p>
        </section>

        {/* ===================== WORK STACKS ===================== */}
        <section className="absolute left-0 z-10 w-full" style={{ top: SEC_STACKS_TOP, height: SEC_STACKS_H }}>
          <SectionLabel top={140} lineW={146} italic>Work stacks</SectionLabel>

          {/* block 1 — copy + tool grid */}
          <Body className="reveal-up absolute" style={{ left: 350, top: 223, width: 880 }}>{copyWithLink(STACKS_TOOLS)}</Body>
          <div className="absolute" style={{ left: 350, top: 343 }}>
            <ToolGrid />
          </div>

          {/* block 2 — copy + process staircase (pills 200 × 80, Urbanist 24, Figma 402:2294) */}
          <Body className="reveal-up absolute" style={{ left: 350, top: 818, width: 880 }}>{copyWithLink(STACKS_PROCESS)}</Body>
          <div className="absolute" style={{ left: 350, top: 938 }}>
            <ProcessFlow />
          </div>
        </section>

        {/* ===================== WORK EXPERIENCE ===================== */}
        <section className="absolute left-0 z-10 w-full" style={{ top: SEC_EXP_TOP, height: SEC_EXP_H }}>
          <SectionLabel top={156} italic>Work Experience</SectionLabel>
          <div className="exp-list absolute" style={{ left: 330, top: 237, width: 880 }}>
            {EXPERIENCE.map((job, i) => (
              <div key={i} className="exp-row w-full">
                {i > 0 && <div className="my-[16px] h-px w-full bg-white/10" />}
                <div className="flex h-[56px] w-full items-end justify-between">
                  <div className="flex flex-col gap-[8px]">
                    <p className="font-serif-display text-[16px] leading-[24px] tracking-[0.64px] text-white">{job.role}</p>
                    <div className="flex items-center gap-[8px]">
                      {job.meta.map((m, j) => (
                        <span key={j} className="flex items-center gap-[8px]">
                          {j > 0 && <span className="size-[4px] rounded-full bg-grey" />}
                          <span className="font-jakarta text-[14px] font-normal leading-[24px] tracking-[0.56px] text-grey">{m}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-[8px]">
                    <a href={job.url} target="_blank" rel="noreferrer noopener" className="font-serif-display text-[16px] leading-[24px] tracking-[0.64px] text-white underline [text-underline-position:from-font] transition-colors duration-300 hover:text-[#f16767]">{job.company}</a>
                    <p className="font-jakarta text-[16px] font-normal leading-[24px] tracking-[0.64px] text-grey">{job.period}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      )}

    </div>

      {/* dashed rule closing the page off from the footer */}
      <span className="pointer-events-none block h-px w-full" style={DASH_X} />

      {/* ===================== FOOTER — the one shared site footer ===========
          Same component, same variant as every other page, and outside the
          fixed 1440 canvas so it spans the viewport like the homepage. */}
      <Footer />
    </>
  );
}
