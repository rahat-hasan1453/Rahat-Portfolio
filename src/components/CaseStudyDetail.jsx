import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Footer from "./Footer.jsx";
import { getCaseStudy } from "../data/caseStudies.js";
import { currentPath, slugFromPath } from "../lib/router.js";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* =========================================================================
   Case Study DETAILS page — Figma node 593:591 (template).
   Layout: hero (image + title/meta) → Context → gallery → Problem Statement
   band → Challenges → Solutions band → Design Exploration gallery →
   Conclusion band → shared homepage Footer.
   Rails: solid white/0.4 at the outer edges run the whole page; the dashed
   white/0.2 inner rails (x 188 / 1250) start BELOW the hero (per Figma).
   ========================================================================= */

/* ══════════════════════════ CONTENT ══════════════════════════
   Copy and imagery for every study live in src/data/caseStudies.js; this
   page renders whichever one the #case-study/<slug> route names. Layout is
   untouched by content edits — add a study to that file and it works here. */

const imgLogo = "/assets/0826edbc3e6fd14f58cf0e0a65d4ad80ec15da69.svg";
const imgDivider = "/assets/d6b9f02c4491ac4a2168656adfefa6ca940f6b7d.svg";

/* dashed inner rail (white/0.2, 10-10) — same treatment as the other pages */
const DASH = {
  backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.2) 0 10px, transparent 10px 20px)",
  backgroundSize: "1px 20px",
};

/* the horizontal counterpart — identical 10 on / 10 off rhythm, so the band
   edges read as the same dashed line as the vertical rails */
const DASH_X = {
  backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.2) 0 10px, transparent 10px 20px)",
  backgroundSize: "20px 1px",
  backgroundRepeat: "repeat-x",
};

/* ---- word-by-word reveal: splits text; gsap animates .w-word on enter.
   The gap between words is a REAL space character, not a right margin. With a
   margin the DOM held no whitespace at all — copy read as
   "Let'sMeetisacomprehensive…" to screen readers, to find-in-page, to anyone
   copying it, and to search engines. Rendering costs nothing; the space is
   just the font's own, which is what the other split-text blocks use. ---- */
function Words({ text, className = "" }) {
  const words = text.split(" ");
  return (
    <span className={`wsplit ${className}`}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="w-word inline-block will-change-transform">{w}</span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

/* ---- section label: hairline stub (touches the dashed rail) + H5 title ---- */
function Label({ children }) {
  return (
    <div className="reveal-label flex items-end gap-[16px]">
      <span className="lead-line mb-[16px] h-px w-[126px] origin-left shrink-0 bg-white/40 max-lg:w-[48px]" style={{ marginLeft: -2 }} />
      <h2 className="font-serif-display text-[28px] not-italic leading-[32px] tracking-[1.12px] text-white">
        <Words text={children} />
      </h2>
    </div>
  );
}

/* ---- highlight band: gradient title + hairline + serif body (Figma 596:684) ---- */
function Band({ title, children }) {
  return (
    <div className="reveal-up relative mx-auto w-[1060px] bg-white/[0.05] max-lg:w-full">
      {/* dashed top/bottom edges — same 10-on/10-off rhythm as the rails */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px" style={DASH_X} />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px" style={DASH_X} />
      <div className="flex flex-col gap-[24px] px-[140px] py-[40px] max-lg:px-[20px] max-lg:py-[32px]">
        <div className="flex flex-col gap-[19px]">
          <h2 className="accent-gradient-text font-serif-display text-[28px] not-italic leading-[32px] tracking-[1.12px] max-lg:text-[24px]">{title}</h2>
          <div className="h-px w-full bg-white/20" />
        </div>
        <div className="font-serif-display text-[28px] not-italic leading-[32px] tracking-[1.12px] text-[#b3b3b3] [word-break:break-word] max-lg:text-[20px] max-lg:leading-[28px] max-lg:tracking-[0.8px]">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ---- image frame ---------------------------------------------------------
   Every frame is laid out at the picture's OWN aspect ratio. The frames used
   to be fixed heights (681 / 521 / 410 tall in a 1020 column), which meant a
   4:3 presentation shot lost up to half its height to the crop — the detail
   inside these mockups is the whole point of them, so nothing is cropped now.
   The ratio comes from the file's real pixel size, so the space is reserved
   before the image loads and ScrollTrigger never has to re-measure.

   Parallax survives at a much smaller amplitude: the layer overfills by 4%
   and drifts ±2%, which reads as movement without eating the artwork. */
function Frame({ shot, alt = "", className = "" }) {
  return (
    <div
      className={`detail-frame img-reveal relative overflow-hidden rounded-[8px] bg-[#1c1c1c] ${className}`}
      style={{ aspectRatio: `${shot.w} / ${shot.h}` }}
    >
      <div className="detail-parallax absolute inset-x-0 -top-[2%] h-[104%] will-change-transform">
        <img alt={alt} src={shot.src} draggable="false" className="size-full max-w-none object-cover" loading="lazy" />
      </div>
    </div>
  );
}

/* Rows are grouped by orientation rather than by a fixed full/pair rhythm.
   Landscape shots are dense screenshots and get the full column width;
   portraits (phone mockups) pair up, since side by side they still read and
   a full-width portrait would tower over the page. On a phone every row is
   full width — half of 350px is too small to read anything. */
const PORTRAIT_MAX = 1.15;

function buildRows(shots) {
  const rows = [];
  for (let i = 0; i < shots.length; i += 1) {
    const shot = shots[i];
    const next = shots[i + 1];
    const isPortrait = (s) => s.w / s.h < PORTRAIT_MAX;
    if (isPortrait(shot) && next && isPortrait(next)) {
      rows.push({ type: "pair", items: [shot, next] });
      i += 1;
    } else {
      rows.push({ type: "full", item: shot });
    }
  }
  return rows;
}

/* Alt text: these images carry the actual argument of the case study, and they
   were all alt="" — invisible to screen readers and to image search. A shot has
   no caption of its own in the data, so it is described by the study it belongs
   to and its position, which is honest and useful rather than decorative. */
function Rows({ shots, label, offset = 0 }) {
  const altFor = (shot, i) => shot.alt || `${label} — screen ${offset + i + 1}`;
  let n = 0;
  return (
    <>
      {buildRows(shots).map((row, i) =>
        row.type === "full" ? (
          <Frame key={i} shot={row.item} alt={altFor(row.item, n++)} className="w-full" />
        ) : (
          <div key={i} className="flex items-start gap-[16px] max-lg:flex-col">
            <Frame shot={row.items[0]} alt={altFor(row.items[0], n++)} className="min-w-0 flex-1 max-lg:w-full" />
            <Frame shot={row.items[1]} alt={altFor(row.items[1], n++)} className="min-w-0 flex-1 max-lg:w-full" />
          </div>
        )
      )}
    </>
  );
}

/* ---- meta pills (logo + year, connected tags, categories) ---- */
function Chip({ children, rounded = "rounded-[20px]", filled = true }) {
  return (
    <div className={`relative flex h-[31px] shrink-0 items-center justify-center p-[10px] ${filled ? "bg-[rgba(128,128,128,0.2)]" : ""} ${rounded}`}>
      <p className="font-jakarta relative shrink-0 whitespace-nowrap text-[16px] font-medium leading-[24px] tracking-[0.64px] max-lg:text-[12px] max-lg:tracking-[0.48px] text-white [word-break:break-word]">
        {children}
      </p>
    </div>
  );
}

function TagDivider() {
  return (
    <div className="flex flex-row items-center self-stretch">
      <div className="relative h-full w-0 shrink-0">
        <div className="absolute inset-[0_-0.5px]">
          <img alt="" className="block size-full max-w-none" src={imgDivider} />
        </div>
      </div>
    </div>
  );
}

function Meta({ study: STUDY }) {
  return (
    <div className="flex shrink-0 flex-col items-end gap-[8px] max-lg:w-full max-lg:items-start">
      <div className="flex shrink-0 items-center gap-[20px] max-lg:order-3">
        <div className="relative h-[18px] w-[84px] shrink-0">
          <img alt="RiQS" className="absolute inset-0 block size-full max-w-none" src={imgLogo} />
        </div>
        <Chip filled={false}>{STUDY.year}</Chip>
      </div>
      <div className="flex shrink-0 items-center no-scrollbar max-lg:order-1 max-lg:max-w-full max-lg:overflow-x-auto">
        <Chip rounded="rounded-l-[20px]">{STUDY.tags[0]}</Chip>
        <TagDivider />
        <Chip rounded="rounded-none">{STUDY.tags[1]}</Chip>
        <TagDivider />
        <Chip rounded="rounded-r-[20px]">{STUDY.tags[2]}</Chip>
      </div>
      <div className="flex shrink-0 items-start gap-[8px] max-lg:order-2">
        {STUDY.cats.map((c) => (
          <Chip key={c}>{c}</Chip>
        ))}
      </div>
    </div>
  );
}

/* ---- serif bullet list used inside bands ---- */
function BandBullets({ items }) {
  return (
    <ul className="mt-[32px] flex list-disc flex-col gap-[32px]">
      {items.map((b, i) => (
        <li key={i} className="reveal-up ms-[42px] max-lg:ms-[22px]">
          {b}
        </li>
      ))}
    </ul>
  );
}

export default function CaseStudyDetail() {
  const rootRef = useRef(null);
  /* /case-studies/<slug> — unknown slugs fall back to the first study */
  const STUDY = getCaseStudy(slugFromPath(currentPath()));

  useGSAP(
    () => {
      window.__lenis?.start();

      // word-by-word text reveal on scroll-in
      gsap.utils.toArray(".wsplit").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll(".w-word"),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.016, scrollTrigger: { trigger: el, start: "top 88%" } }
        );
      });

      // section labels — hairline grows in with the title
      gsap.utils.toArray(".reveal-label .lead-line").forEach((line) => {
        gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: line, start: "top 90%" } });
      });

      // generic rise + fade (bands, bullets)
      gsap.utils.toArray(".reveal-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }
        );
      });

      // images scale-fade in…
      gsap.utils.toArray(".img-reveal").forEach((el) => {
        gsap.from(el, { opacity: 0, scale: 0.94, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 86%" } });
      });

      // …and drift inside their frames (parallax)
      gsap.utils.toArray(".detail-parallax").forEach((layer) => {
        gsap.fromTo(
          layer,
          { yPercent: -2 },
          {
            yPercent: 2,
            ease: "none",
            scrollTrigger: { trigger: layer.closest(".detail-frame"), start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <>
    <div ref={rootRef} className="bg-ink relative mx-auto w-full lg:w-[1440px]" data-name="Case Study Details">
      <div className="relative lg:fit-1440">
        {/* outer solid rails — desktop only; the mobile frames carry none */}
        <div className="pointer-events-none absolute inset-0 z-0 max-lg:hidden">
          <span className="absolute inset-y-0 w-px bg-white/40" style={{ left: 0 }} />
          <span className="absolute inset-y-0 w-px bg-white/40" style={{ left: 1439 }} />
        </div>

        {/* ===================== HERO (solid rails only, per Figma) ===================== */}
        <section className="relative z-10 px-[40px] pt-[130px] max-lg:px-[20px] max-lg:pt-[124px]">
          <Frame shot={STUDY.shots[0]} alt={`${STUDY.title} — cover`} className="w-full rounded-[9px]" />

          <div className="mt-[36px] flex items-start justify-between max-lg:flex-col max-lg:gap-[16px]">
            <div className="flex w-[700px] flex-col gap-[8px] max-lg:w-full">
              <h1 className="font-serif-display text-[48px] not-italic leading-[60px] tracking-[1.92px] text-white max-lg:text-[24px] max-lg:leading-[24px] max-lg:tracking-[0.96px]">
                <Words text={STUDY.title} />
              </h1>
              <p className="font-jakarta text-[16px] font-medium leading-[24px] tracking-[0.64px] text-[#b3b3b3] [word-break:break-word]">
                <Words text={STUDY.desc} />
              </p>
            </div>
            <Meta study={STUDY} />
          </div>

          {/* full-width hairline closing the hero */}
          <div className="mt-[80px] h-px w-full bg-white/20 max-lg:mt-[40px] max-lg:!ml-[-20px] max-lg:!w-[calc(100%+40px)]" style={{ marginLeft: -40, width: "calc(100% + 80px)" }} />
        </section>

        {/* ============ CONTENT (dashed inner rails start below the hero) ============ */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 z-0 max-lg:hidden">
            <span className="absolute inset-y-0 w-px" style={{ left: 188, ...DASH }} />
            <span className="absolute inset-y-0 w-px" style={{ left: 1250, ...DASH }} />
          </div>

          {/* ---- Context ---- */}
          <section className="relative z-10 mx-auto w-[1060px] pt-[130px] max-lg:w-full max-lg:gutter max-lg:pt-[48px]">
            <Label>Context</Label>
            <div className="mt-[30px] py-[10px] pl-[140px] max-lg:mt-[20px] max-lg:py-0 max-lg:pl-0">
              <p className="font-jakarta w-[804px] max-lg:w-full text-[16px] font-medium leading-[24px] tracking-[0.64px] text-[#b3b3b3] [word-break:break-word]">
                <Words text={STUDY.context} />
              </p>
            </div>
          </section>

          {/* ---- gallery: one wide + a pair ---- */}
          <section className="relative z-10 mx-auto flex w-[1020px] flex-col gap-[16px] pt-[120px] max-lg:w-full max-lg:gutter max-lg:pt-[48px]">
            <Rows shots={STUDY.shots.slice(1, 4)} label={STUDY.title} offset={1} />
          </section>

          {/* ---- Problem Statement band ---- */}
          <div className="relative z-10 pt-[120px] max-lg:pt-[48px]">
            <Band title="Problem Statement">
              <Words text={STUDY.problem} />
            </Band>
          </div>

          {/* ---- Challenges ---- */}
          <section className="relative z-10 mx-auto w-[1060px] pt-[130px] max-lg:w-full max-lg:gutter max-lg:pt-[48px]">
            <Label>Challenges</Label>
            <div className="mt-[30px] py-[10px] pl-[140px] max-lg:mt-[20px] max-lg:py-0 max-lg:pl-0">
              <ul className="font-jakarta w-[804px] max-lg:w-full list-disc text-[16px] font-medium leading-[24px] tracking-[0.64px] text-[#b3b3b3] [word-break:break-word]">
                {STUDY.challenges.map((c, i) => (
                  <li key={i} className="reveal-up ms-[24px]">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ---- Solutions band ---- */}
          <div className="relative z-10 pt-[64px] max-lg:pt-[48px]">
            <Band title="Solutions">
              <Words text={STUDY.solutions.intro} />
              <BandBullets items={STUDY.solutions.bullets} />
            </Band>
          </div>

          {/* ---- Design Exploration ---- */}
          <section className="relative z-10 mx-auto w-[1060px] pt-[130px] max-lg:w-full max-lg:gutter max-lg:pt-[48px]">
            <Label>Design Exploration</Label>
            <div className="mx-auto mt-[48px] flex w-[1020px] flex-col gap-[16px] max-lg:mt-[24px] max-lg:w-full">
              <Rows shots={STUDY.shots.slice(4)} label={STUDY.title} offset={4} />
            </div>
          </section>

          {/* ---- Conclusion band ---- */}
          <div className="relative z-10 pb-[160px] pt-[130px] max-lg:pb-[64px] max-lg:pt-[48px]">
            <Band title="Conclusion">
              <Words text={STUDY.conclusion.intro} />
              <BandBullets items={STUDY.conclusion.bullets} />
            </Band>
          </div>
        </div>
      </div>

      {/* ===================== FOOTER — same as homepage ===================== */}
      {/* dashed rule closing the page off from the footer — same 10-on/10-off
          rhythm as the rails */}
      <span className="pointer-events-none block h-px w-full" style={DASH_X} />

    </div>

      <Footer />
    </>
  );
}
