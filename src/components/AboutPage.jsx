import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Footer from "./Footer.jsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* =========================================================================
   Figma: node 402:2588 "About" — artboard 1728, inner content 1440
   (x_inner = x_figma − 144). Sections 1–4 absolutely positioned inside a
   4250px wrapper (tightened ~160px gaps between sections); the shared
   <Footer compact /> flows after it. Process connectors: Figma 423:3578.
   ========================================================================= */

/* portrait fills — same source photos as the home ticker */
const imgR7 = "/assets/839d3a518763fdbf968a2a08c4073a1284670dcf.png"; // spark
const imgR6 = "/assets/decfb971c6d641c9ccb852271bc0b630c000cdc2.png"; // tall profile
const imgR5 = "/assets/29f89100346cab8bda091f83307e2d146c404f15.png"; // warm cinematic
const imgR4 = "/assets/1343981533bfec0aaa59a2166abbcce5317934ec.png"; // white-bg smile
const imgSmile = "/assets/358ef12f7872aa78ea6da1caedac7cd388e21bdf.png";

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

const ABOUT_FULL =
  "Hello, I’m Rahat — a product-minded designer with nearly 4 years of experience, currently a UX Engineer at Selise Digital Platform. I've grown into a product-focused role, taking end-to-end ownership — from discovery to delivery — collaborating with international stakeholders to turn business goals into meaningful digital experiences.";
const ABOUT_SHORT =
  "Hello, I’m Rahat — a product-minded designer with nearly 4 years of experience, currently a UX Engineer at Selise Digital Platform. I've grown into a product-focused role, taking end-to-end ownership — from discovery to delivery —";
const QUOTE =
  "Hello, I’m Rahat — a product-minded designer with nearly 4 years of experience, currently a UX Engineer at Selise Digital Platform.";

const PROCESS = [
  { label: "Discovery call", left: 0 },
  { label: "Userflow", left: 133 },
  { label: "Wireframe", left: 266 },
  { label: "Visual Design", left: 398 },
  { label: "Feedbacks &\nHandoff", left: 524 },
];

/* dashed elbow connectors between the pills (Figma 423:3578) —
   drop from under pill i, then run right into pill i+1 with an arrowhead */
const CONNECTORS = PROCESS.slice(0, -1).map((step, i) => {
  const sx = step.left + 40;
  const y0 = i * 80 + 86;
  const bendY = i * 80 + 120;
  const ex = PROCESS[i + 1].left - 14;
  return {
    d: `M ${sx} ${y0} L ${sx} ${bendY} L ${ex} ${bendY}`,
    arrow: `${ex - 5},${bendY - 4} ${ex},${bendY} ${ex - 5},${bendY + 4}`,
  };
});

const EXPERIENCE = [
  { role: "UX Engineer", meta: ["Full time", "Hybrid", "Zurich, Switzerland"], company: "Selise Digital Platform", url: "https://selisegroup.com", period: "Aug’25 - Present" },
  { role: "Associate UX Designer", meta: ["Full time", "Onsite", "Dhaka, Bangladesh"], company: "Project 2morrow Software Ltd.", url: "https://project2morrow.com", period: "May’24 - Aug’25" },
  { role: "UI Designer", meta: ["Full time", "Remote", "Toronto, Canada"], company: "Techplato.inc", url: "https://techplato.com", period: "Sep’23 - May’24" },
  { role: "Jr. UI & Graphic Designer", meta: ["Full time", "Onsite", "Dhaka, Bangladesh"], company: "Techplato.inc", url: "https://techplato.com", period: "Jul ’22 - Sep’23" },
];

/* hero marquee set — 0.8× the Figma card sizes */
const HERO_SET = [
  { src: imgR7, w: 177, h: 226 },
  { src: imgR6, w: 177, h: 313 },
  { src: imgR5, w: 177, h: 226 },
  { src: imgR4, w: 177, h: 226 },
];

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
        <p className="font-serif-display-it whitespace-nowrap text-[24px] italic leading-[32px] tracking-[0.96px] text-white">{children}</p>
      ) : (
        <p className="font-serif-display whitespace-nowrap text-[28px] leading-[32px] tracking-[1.12px] text-white">{children}</p>
      )}
    </div>
  );
}

function ToolTile({ icon, height = 144 }) {
  const isLogo = typeof icon !== "string";
  return (
    <div
      className={`stack-tile flex flex-1 items-center justify-center rounded-[40px] border border-solid border-[#131313] bg-[#1c1c1c] ${isLogo ? "aspect-square" : ""}`}
      style={isLogo ? undefined : { height }}
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
    <div className="flex shrink-0 items-center gap-[14px] pr-[14px]">
      {HERO_SET.map((im, i) => (
        <div
          key={i}
          className="relative shrink-0 overflow-hidden rounded-[14px] bg-[#1c1c1c] opacity-40 transition-opacity duration-500 hover:opacity-100"
          style={{ width: im.w, height: im.h }}
        >
          <img alt="Rahat Hasan" src={im.src} className="absolute inset-0 size-full max-w-none object-cover" draggable="false" />
        </div>
      ))}
    </div>
  );
}

export default function AboutPage() {
  const rootRef = useRef(null);
  const heroTickerRef = useRef(null);

  useGSAP(
    () => {
      // hero portrait marquee — continuous ticker
      gsap.to(heroTickerRef.current, { xPercent: -50, ease: "none", duration: 36, repeat: -1 });

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

      // process pills cascade
      gsap.fromTo(".process-pill", { opacity: 0, x: -24 }, {
        opacity: 1, x: 0, duration: 0.55, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: ".process-flow", start: "top 80%" },
      });

      // dashed connectors draw in behind the pill cascade (Figma 423:3578)
      gsap.utils.toArray(".proc-mask-path").forEach((p, i) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(p, {
          strokeDashoffset: 0, duration: 0.6, ease: "power1.inOut", delay: 0.3 + i * 0.12,
          scrollTrigger: { trigger: ".process-flow", start: "top 80%" },
        });
      });
      gsap.fromTo(".proc-arrow", { opacity: 0 }, {
        opacity: 1, duration: 0.3, stagger: 0.12, delay: 0.8,
        scrollTrigger: { trigger: ".process-flow", start: "top 80%" },
      });
      // marching dashes, forever
      gsap.to(".proc-dash", { strokeDashoffset: -18, duration: 1.4, ease: "none", repeat: -1 });

      // experience rows
      gsap.fromTo(".exp-row", { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: ".exp-list", start: "top 84%" },
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="bg-ink relative mx-auto w-[1440px]" data-name="About Page">
      <div className="relative h-[4250px] w-full overflow-hidden">
        {/* vertical grid rails — two per side, per Figma */}
        {[0, 188, 1250, 1439].map((x) => (
          <span key={x} className="pointer-events-none absolute top-0 z-0 h-full w-px bg-white/[0.05]" style={{ left: x }} />
        ))}

        {/* ===================== HERO — Journey to Design (top 0) ===================== */}
        <section className="absolute left-0 top-0 z-10 h-[900px] w-full">
          {/* px/pb + negative margins keep glyph overhangs inside the bg-clip-text paint area */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeShuttle }}
            className="font-serif-display absolute text-[84px] leading-[92px] tracking-[3.36px]"
            style={{ left: 260, top: 140 }}
          >
            <span className="accent-gradient-text -mx-[20px] -my-[14px] block px-[20px] py-[14px]">Journey</span>
            <span className="accent-gradient-text -mx-[20px] -my-[14px] block px-[20px] py-[14px]">to Design</span>
          </motion.h1>

          <Body className="hero-appear absolute" style={{ left: 260, top: 372, width: 920 }}>
            {copyWithLink(ABOUT_FULL + ABOUT_FULL)}
          </Body>

          {/* portrait marquee — Figma 402:853 scaled 0.8, ink fade on both edges */}
          <div className="hero-appear absolute overflow-hidden" style={{ left: 230, top: 580, width: 980, height: 313 }}>
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
        </section>

        {/* ===================== DESIGNING @SELISE (top 900) ===================== */}
        <section className="absolute left-0 z-10 h-[990px] w-full" style={{ top: 900 }}>
          <SectionLabel top={156}>Designing @Selise</SectionLabel>

          <Body className="reveal-up absolute" style={{ left: 330, top: 237, width: 473 }}>
            {copyWithLink(ABOUT_FULL + ABOUT_FULL)}
          </Body>

          {/* right image pair — 40% opacity per Figma 402:1645/1646 */}
          <div className="reveal-up absolute" style={{ left: 896, top: 323, width: 354, height: 298 }}>
            <div data-parallax="-40" className="absolute overflow-hidden rounded-[17.687px] bg-[#1c1c1c] opacity-40 transition-opacity duration-500 hover:opacity-100" style={{ left: 0, top: 0, width: 168, height: 298 }}>
              <img alt="Rahat Hasan" src={imgR6} className="absolute inset-0 size-full max-w-none object-cover" />
            </div>
            <div data-parallax="30" className="absolute overflow-hidden rounded-[17.687px] bg-[#1c1c1c] opacity-40 transition-opacity duration-500 hover:opacity-100" style={{ left: 186, top: 41, width: 168, height: 216 }}>
              <img alt="Rahat Hasan" src={imgSmile} className="absolute inset-0 size-full max-w-none object-cover" />
            </div>
          </div>

          {/* warm image + serif quote — EightiesComeback Medium 28/32, grey (Figma 402:1627) */}
          <div className="reveal-up absolute overflow-hidden rounded-[17.687px] bg-[#1c1c1c]" style={{ left: 381, top: 685, width: 234, height: 288 }}>
            <img alt="" src={imgR5} className="absolute inset-0 size-full max-w-none object-cover" />
          </div>
          <p className="reveal-up font-serif-display absolute text-[28px] leading-[32px] tracking-[1.12px] text-[#808080]" style={{ left: 555, top: 749, width: 504 }}>
            {QUOTE}
          </p>
        </section>

        {/* ===================== WORK STACKS (top 1890) ===================== */}
        <section className="absolute left-0 z-10 h-[1720px] w-full" style={{ top: 1890 }}>
          <SectionLabel top={140} lineW={146} italic>Work stacks</SectionLabel>

          {/* block 1 — copy + tool grid */}
          <Body className="reveal-up absolute" style={{ left: 350, top: 223, width: 880 }}>{copyWithLink(ABOUT_SHORT)}</Body>
          <div className="stack-grid absolute flex flex-col" style={{ left: 350, top: 343, width: 880 }}>
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

          {/* block 2 — copy + process staircase (pills 200 × 80, Urbanist 24, Figma 402:2294) */}
          <Body className="reveal-up absolute" style={{ left: 350, top: 818, width: 880 }}>{copyWithLink(ABOUT_SHORT)}</Body>
          <div className="process-flow absolute" style={{ left: 350, top: 938, width: 880, height: 400 }}>
            {/* dashed elbow connectors with arrowheads (Figma 423:3578) */}
            <svg className="pointer-events-none absolute inset-0" width="880" height="400" viewBox="0 0 880 400" fill="none" aria-hidden="true">
              <defs>
                {CONNECTORS.map((c, i) => (
                  <mask key={i} id={`proc-mask-${i}`}>
                    <path className="proc-mask-path" d={c.d} stroke="#fff" strokeWidth="6" fill="none" />
                  </mask>
                ))}
              </defs>
              {CONNECTORS.map((c, i) => (
                <g key={i} mask={`url(#proc-mask-${i})`}>
                  <path className="proc-dash" d={c.d} stroke="rgba(255,255,255,0.7)" strokeWidth="1" fill="none" strokeDasharray="4 5" />
                </g>
              ))}
              {CONNECTORS.map((c, i) => (
                <polyline key={i} className="proc-arrow" points={c.arrow} stroke="rgba(255,255,255,0.7)" strokeWidth="1" fill="none" />
              ))}
            </svg>
            {PROCESS.map((step, i) => (
              <div
                key={i}
                className="process-pill absolute flex h-[80px] w-[200px] items-center justify-center rounded-[40px] border border-solid border-[#131313] bg-[#1c1c1c] px-[16px]"
                style={{ left: step.left, top: i * 80 }}
              >
                <span className="font-urbanist whitespace-pre-line text-center text-[24px] font-medium leading-none text-white">{step.label}</span>
              </div>
            ))}
          </div>

          {/* block 3 — right-aligned copy + 4-image strip */}
          <Body className="reveal-up absolute" style={{ left: 583, top: 1422, width: 647 }}>{copyWithLink(ABOUT_SHORT)}</Body>
          <div className="reveal-up absolute flex" style={{ left: 583, top: 1548, width: 575, height: 168 }}>
            {[imgR5, imgR6, imgR5, imgSmile].map((src, i) => (
              <div key={i} className="relative shrink-0 overflow-hidden rounded-[17.687px] bg-[#1c1c1c]" style={{ width: i === 3 ? 119 : 132, marginRight: i === 3 ? 0 : 20, height: 168 }}>
                <img alt="" src={src} className="absolute inset-0 size-full max-w-none object-cover" />
              </div>
            ))}
          </div>
        </section>

        {/* ===================== WORK EXPERIENCE (top 3610) ===================== */}
        <section className="absolute left-0 z-10 h-[640px] w-full" style={{ top: 3610 }}>
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

      {/* ===================== FOOTER — shared component, compact (no expertise block) ===================== */}
      <Footer compact />
    </div>
  );
}
