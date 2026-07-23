import { useState } from "react";
import { motion } from "framer-motion";

/* =========================================================================
   Interactive services / skills grid.
   Dark rounded cards. Hover a card → its 3 helper pills are RELEASED from
   behind the card: they start hidden at the card center (opacity 0, scale .8,
   x/y 0, tucked behind the dark face) and animate outward to peek from the
   corners / edges. Only the hovered card reacts.

   Customize: edit CARDS. Each pill = { label, tone, rotate, at }.
     tone   → key in TONES (soft bg + darker tinted text)
     at     → key in ANCHORS (offset from card center, in px)
     rotate → degrees of playful tilt
   Add your own tones / anchors freely.
   ========================================================================= */

// Each anchor PINS the pill's wrapper to a card edge with plain CSS (no size
// measuring), so the pill's inner edge sits on the card edge and it grows
// OUTWARD — card title stays readable, pill text stays readable.
//   pin  = Tailwind classes that stick the wrapper to the edge (+ a small
//          translate so it tucks ~13px onto the card = the "attached" look)
//   from = where the pill starts (nudged toward the card centre) so the reveal
//          still feels like it comes from inside the card.
const ANCHORS = {
  top: { pin: "bottom-full left-1/2 -translate-x-1/2 translate-y-[13px]", from: { x: 0, y: 20 } },
  bottom: { pin: "top-full left-1/2 -translate-x-1/2 -translate-y-[13px]", from: { x: 0, y: -20 } },
  left: { pin: "right-full top-1/2 -translate-y-1/2 translate-x-[13px]", from: { x: 20, y: 0 } },
  right: { pin: "left-full top-1/2 -translate-y-1/2 -translate-x-[13px]", from: { x: -20, y: 0 } },
  leftUp: { pin: "right-full top-[30%] -translate-y-1/2 translate-x-[13px]", from: { x: 20, y: 0 } },
  leftDown: { pin: "right-full top-[70%] -translate-y-1/2 translate-x-[13px]", from: { x: 20, y: 0 } },
  rightUp: { pin: "left-full top-[30%] -translate-y-1/2 -translate-x-[13px]", from: { x: -20, y: 0 } },
  rightDown: { pin: "left-full top-[70%] -translate-y-1/2 -translate-x-[13px]", from: { x: -20, y: 0 } },
  topLeft: { pin: "bottom-full left-0 translate-y-[13px]", from: { x: 12, y: 16 } },
  topRight: { pin: "bottom-full right-0 translate-y-[13px]", from: { x: -12, y: 16 } },
  bottomLeft: { pin: "top-full left-0 -translate-y-[13px]", from: { x: 12, y: -16 } },
  bottomRight: { pin: "top-full right-0 -translate-y-[13px]", from: { x: -12, y: -16 } },
};

// soft capsule bg + a darker tint of the same hue for the text (Figma look)
const TONES = {
  violet: { bg: "#B79CE8", fg: "#43277D" },
  green: { bg: "#AEE06B", fg: "#3C6212" },
  peach: { bg: "#EAB78E", fg: "#864725" },
  teal: { bg: "#8FD4C9", fg: "#1C5F54" },
  rose: { bg: "#F0A6A6", fg: "#8A2E2E" },
  gold: { bg: "#F0D077", fg: "#775410" },
  sky: { bg: "#A9C7EE", fg: "#224B82" },
};

// Placement rule: the 3 pills of each card sit on THREE DIFFERENT sides
// (top / left / right for upper & middle rows, bottom / left / right for the
// bottom row) so they never stack on each other, and each side points into an
// empty grid cell so a hovered card never buries a neighbour's title.
const CARDS = [
  { title: "Product Strategy", pills: [
    { label: "Roadmap", tone: "violet", rotate: -15, at: "top" },
    { label: "Market Fit", tone: "peach", rotate: 11, at: "right" },
    { label: "Prioritization", tone: "green", rotate: -7, at: "bottom" },
  ]},
  { title: "UX Audit", pills: [
    { label: "Heuristics", tone: "rose", rotate: -12, at: "left" },
    { label: "Usability Test", tone: "teal", rotate: 13, at: "top" },
    { label: "Quick Wins", tone: "gold", rotate: -8, at: "right" },
  ]},
  { title: "Web Application", pills: [
    { label: "Dashboard", tone: "sky", rotate: -13, at: "left" },
    { label: "Responsive", tone: "peach", rotate: 9, at: "top" },
    { label: "Scalable", tone: "teal", rotate: -10, at: "right" },
  ]},
  { title: "Mobile App", pills: [
    { label: "iOS & Android", tone: "green", rotate: 12, at: "top" },
    { label: "Native Feel", tone: "rose", rotate: -11, at: "left" },
    { label: "Micro-interaction", tone: "gold", rotate: 8, at: "right" },
  ]},
  { title: "Design System", pills: [
    { label: "Components", tone: "teal", rotate: -12, at: "top" },
    { label: "Tokens", tone: "gold", rotate: 13, at: "left" },
    { label: "Consistency", tone: "violet", rotate: -9, at: "right" },
  ]},
  { title: "SaaS Products", pills: [
    { label: "Onboarding", tone: "peach", rotate: -10, at: "top" },
    { label: "Retention", tone: "green", rotate: 12, at: "leftUp" },
    { label: "B2B Flow", tone: "sky", rotate: -8, at: "leftDown" },
  ]},
  { title: "Storytelling", pills: [
    { label: "Narrative", tone: "violet", rotate: -14, at: "topRight" },
    { label: "Case Study", tone: "peach", rotate: 9, at: "left" },
    { label: "Pitch Ready", tone: "teal", rotate: -7, at: "bottom" },
  ]},
  { title: "OOUX", pills: [
    { label: "Object Mapping", tone: "gold", rotate: 12, at: "topLeft" },
    { label: "Content Model", tone: "rose", rotate: -11, at: "bottomRight" },
    { label: "Clarity", tone: "teal", rotate: 8, at: "top" },
  ]},
  { title: "Collaboration", pills: [
    { label: "Dev Handoff", tone: "teal", rotate: -13, at: "right" },
    { label: "Cross-functional", tone: "peach", rotate: 10, at: "bottomLeft" },
    { label: "Agile", tone: "violet", rotate: -8, at: "topLeft" },
  ]},
  { title: "Minimalism", pills: [
    { label: "Clean UI", tone: "sky", rotate: -10, at: "top" },
    { label: "White Space", tone: "gold", rotate: 12, at: "topRight" },
    { label: "Focus", tone: "rose", rotate: -11, at: "bottomLeft" },
  ]},
  { title: "Empathy", pills: [
    { label: "User Research", tone: "violet", rotate: -12, at: "left" },
    { label: "Interviews", tone: "teal", rotate: 10, at: "topRight" },
    { label: "Real Needs", tone: "peach", rotate: -9, at: "bottomRight" },
  ]},
  { title: "Adaptability", pills: [
    { label: "Fast Learner", tone: "rose", rotate: -14, at: "topLeft" },
    { label: "Any Industry", tone: "green", rotate: 10, at: "right" },
    { label: "Iterative", tone: "gold", rotate: -7, at: "bottom" },
  ]},
  { title: "Problem Solving", pills: [
    { label: "Root Cause", tone: "peach", rotate: -12, at: "left" },
    { label: "Data-driven", tone: "violet", rotate: 12, at: "bottom" },
    { label: "Creative Fix", tone: "teal", rotate: -8, at: "right" },
  ]},
  { title: "Cognitive Psychology", pills: [
    { label: "Mental Models", tone: "gold", rotate: -10, at: "bottom" },
    { label: "Cognitive Load", tone: "rose", rotate: 12, at: "right" },
    { label: "Behavior", tone: "sky", rotate: -11, at: "left" },
  ]},
  { title: "Information Architecture", pills: [
    { label: "Structure", tone: "violet", rotate: -12, at: "bottom" },
    { label: "Navigation", tone: "teal", rotate: 11, at: "right" },
    { label: "Findability", tone: "peach", rotate: -8, at: "left" },
  ]},
];

const EASE = [0.22, 1, 0.36, 1]; // expo-out, premium feel

function Pill({ pill, active, index }) {
  const anchor = ANCHORS[pill.at] ?? ANCHORS.right;
  const tone = TONES[pill.tone] ?? { bg: "#ddd", fg: "#222" };
  const from = anchor.from ?? { x: 0, y: 0 };
  return (
    // WRAPPER: pinned to the card edge via CSS (in front, z-20).
    <div className={`pointer-events-none absolute z-20 ${anchor.pin}`}>
      {/* PILL: reveal only — starts nudged toward the card centre (opacity 0,
          scale .78) then settles into place, so it reads as "released" from the
          card while its final position stays attached to the edge. */}
      <motion.span
        className="inline-block whitespace-nowrap rounded-full px-4 py-2 text-[20px] font-medium leading-none shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
        style={{ backgroundColor: tone.bg, color: tone.fg }}
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.78,
          rotate: active ? pill.rotate : 0,
          x: active ? 0 : from.x,
          y: active ? 0 : from.y,
        }}
        transition={{ duration: 0.34, ease: EASE, delay: active ? index * 0.06 : 0 }}
      >
        {pill.label}
      </motion.span>
    </div>
  );
}

export function SkillsCard({ card, height = "h-[128px]" }) {
  const [active, setActive] = useState(false);

  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      tabIndex={0}
      className={`skills-card relative ${height} outline-none ${active ? "z-30" : "z-10"}`}
    >
      {/* helper pills — pinned to the card edges, revealed on hover */}
      {card.pills.map((p, i) => (
        <Pill key={p.label} pill={p} active={active} index={i} />
      ))}

      {/* the dark card face */}
      <div
        className={`absolute inset-0 z-10 flex items-center justify-center rounded-[28px] border px-4 text-center transition-[transform,background-color,box-shadow,border-color] duration-300 ease-out ${
          active
            ? "scale-[1.05] border-white/15 bg-[#242320] shadow-[0_0_46px_rgba(241,103,103,0.16)]"
            : "scale-100 border-white/[0.06] bg-[#161512] shadow-none"
        }`}
      >
        <span className="text-[15px] font-medium leading-tight text-white sm:text-[16px]">
          {card.title}
        </span>
      </div>
    </div>
  );
}

export default function SkillsGrid({
  cards = CARDS,
  className = "",
  cols = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  gap = "gap-x-5 gap-y-6",
  height,
}) {
  return (
    <div className={`grid ${cols} ${gap} ${className}`}>
      {cards.map((c) => (
        <SkillsCard key={c.title} card={c} height={height} />
      ))}
    </div>
  );
}

/* --- attach these pills to an EXISTING card grid (e.g. the footer) --------
   getPills("Web\nApplication") → the 3 pills for that title (newline/case safe).
   <CardPills> renders them; the host card (which must be `position: relative`)
   owns the hover state — the pills pin themselves to its edges via CSS. */
const norm = (s) => (s || "").replace(/\s+/g, " ").trim().toLowerCase();
const PILLS_INDEX = Object.fromEntries(CARDS.map((c) => [norm(c.title), c.pills]));

export function getPills(title) {
  return PILLS_INDEX[norm(title)] ?? [];
}

export function CardPills({ pills = [], active }) {
  return pills.map((p, i) => <Pill key={p.label} pill={p} active={active} index={i} />);
}

export { CARDS, ANCHORS, TONES };
