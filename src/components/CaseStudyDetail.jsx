import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Footer from "./Footer.jsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* =========================================================================
   Case Study DETAILS page — Figma node 593:591 (template).
   Layout: hero (image + title/meta) → Context → gallery → Problem Statement
   band → Challenges → Solutions band → Design Exploration gallery →
   Conclusion band → shared homepage Footer.
   Rails: solid white/0.4 at the outer edges run the whole page; the dashed
   white/0.2 inner rails (x 188 / 1250) start BELOW the hero (per Figma).
   ========================================================================= */

/* ══════════════════════════ EDIT PER CASE STUDY ══════════════════════════
   Everything content-related lives in this object — swap text and image
   paths here (or duplicate this file per study) without touching layout. */
const STUDY = {
  title: "NutriGuide / Web Application",
  desc: "Discover healthy recipes and meal plans tailored to your dietary preferences with NutriGuide. Empower your eating habits with easy-to-follow guidance.",
  year: "2025/26",
  tags: ["Design Refresh", "Enhance Usability", "User Testing"],
  cats: ["Nutrition", "Wellness"],
  hero: "/assets/cs-shot-11.png",

  context:
    "Hello, I’m Rahat — a product-minded designer with nearly 4 years of experience, currently a UX Engineer at Selise Digital Platform. I've grown into a product-focused role, taking end-to-end ownership — from discovery to delivery — collaborating with international stakeholders to turn business goals into meaningful digital experiences.",

  /* gallery above the Problem Statement band: one wide + a pair */
  gallery: {
    full: "/assets/cs-shot-5.png",
    pair: ["/assets/cs-shot-1.png", "/assets/cs-shot-4.png"],
  },

  problem:
    "Hello, I’m Rahat — a product-minded designer with nearly 4 years of experience, currently a UX Engineer at Selise Digital Platform. Hello, I’m Rahat — a product-minded designer with nearly 4 years of experience, currently a UX Engineer at Selise Digital Platform.",

  challenges: [
    "Hello, I’m Rahat — a product-minded designer with nearly 4 years of experience, currently a UX Engineer at Selise Digital Platform.",
    "I've grown into a product-focused role, taking end-to-end ownership — from discovery to delivery — collaborating with international stakeholders to turn business goals into meaningful digital experiences.",
    "Hello, I’m Rahat — a product-minded designer with nearly 4 years of experience,",
  ],

  solutions: {
    intro:
      "Hello, I’m Rahat — a product-minded designer with nearly 4 years of experience, currently a UX Engineer at Selise Digital Platform. Hello, I’m Rahat — a product-minded designer with nearly 4 years of experience.",
    bullets: [
      "Hello, I’m Rahat — a product-minded designer with nearly 4 years of experience, currently a UX Engineer at Selise Digital Platform.",
      "Hello, I’m Rahat — a product-minded designer with nearly 4 years of experience, currently a UX Engineer at Selise Digital Platform.",
    ],
  },

  /* Design Exploration gallery: wide → pair → wide → pair */
  exploration: [
    { type: "full", src: "/assets/cs-shot-7.png" },
    { type: "pair", srcs: ["/assets/cs-shot-13.png", "/assets/cs-shot-17.png"] },
    { type: "full", src: "/assets/cs-shot-2.png" },
    { type: "pair", srcs: ["/assets/cs-shot-15.png", "/assets/cs-shot-16.png"] },
  ],

  conclusion: {
    intro:
      "Hello, I’m Rahat — a product-minded designer with nearly 4 years of experience, currently a UX Engineer at Selise Digital Platform. Hello, I’m Rahat — a product-minded designer with nearly 4 years of experience.",
    bullets: [
      "Hello, I’m Rahat — a product-minded designer with nearly 4 years of experience, currently a UX Engineer at Selise Digital Platform.",
      "Hello, I’m Rahat — a product-minded designer with nearly 4 years of experience, currently a UX Engineer at Selise Digital Platform.",
    ],
  },
};
/* ═════════════════════════ END EDITABLE CONTENT ═════════════════════════ */

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

/* ---- word-by-word reveal: splits text; gsap animates .w-word on enter ---- */
function Words({ text, className = "" }) {
  return (
    <span className={`wsplit ${className}`}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="w-word mr-[0.25em] inline-block will-change-transform">
          {w}
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
      <p className="font-serif-display text-[28px] not-italic leading-[32px] tracking-[1.12px] text-white">
        <Words text={children} />
      </p>
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
          <p className="accent-gradient-text font-serif-display text-[28px] not-italic leading-[32px] tracking-[1.12px] max-lg:text-[24px]">{title}</p>
          <div className="h-px w-full bg-white/20" />
        </div>
        <div className="font-serif-display text-[28px] not-italic leading-[32px] tracking-[1.12px] text-[#b3b3b3] [word-break:break-word] max-lg:text-[20px] max-lg:leading-[28px] max-lg:tracking-[0.8px]">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ---- parallax image frame — the layer overfills so the drift never gaps ---- */
/* The mobile frames are much shorter than the 1440 ones, and the height is a
   number rather than a class, so it travels as a CSS var the stylesheet can
   swap at the breakpoint (see .detail-frame in index.css). */
function Frame({ src, height, mobileHeight, className = "" }) {
  return (
    <div
      className={`detail-frame img-reveal relative overflow-hidden rounded-[8px] bg-[#1c1c1c] ${className}`}
      style={{ height, "--h-mobile": mobileHeight ? `${mobileHeight}px` : undefined }}
    >
      <div className="detail-parallax absolute inset-x-0 -top-[8%] h-[116%] will-change-transform">
        <img alt="" src={src} draggable="false" className="size-full max-w-none object-cover" />
      </div>
    </div>
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

function Meta() {
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
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: layer.closest(".detail-frame"), start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="bg-ink relative mx-auto w-full lg:w-[1440px]" data-name="Case Study Details">
      <div className="relative lg:fit-1440">
        {/* outer solid rails — desktop only; the mobile frames carry none */}
        <div className="pointer-events-none absolute inset-0 z-0 max-lg:hidden">
          <span className="absolute inset-y-0 w-px bg-white/40" style={{ left: 0 }} />
          <span className="absolute inset-y-0 w-px bg-white/40" style={{ left: 1439 }} />
        </div>

        {/* ===================== HERO (solid rails only, per Figma) ===================== */}
        <section className="relative z-10 px-[40px] pt-[130px] max-lg:px-[20px] max-lg:pt-[124px]">
          {/* 350 × 352 on the phone (Figma 782:6136) */}
          <Frame src={STUDY.hero} height={681} mobileHeight={352} className="w-full rounded-[9px]" />

          <div className="mt-[36px] flex items-start justify-between max-lg:flex-col max-lg:gap-[16px]">
            <div className="flex w-[700px] flex-col gap-[8px] max-lg:w-full">
              <h1 className="font-serif-display text-[48px] not-italic leading-[60px] tracking-[1.92px] text-white max-lg:text-[24px] max-lg:leading-[24px] max-lg:tracking-[0.96px]">
                <Words text={STUDY.title} />
              </h1>
              <p className="font-jakarta text-[16px] font-medium leading-[24px] tracking-[0.64px] text-[#b3b3b3] [word-break:break-word]">
                <Words text={STUDY.desc} />
              </p>
            </div>
            <Meta />
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
            <Frame src={STUDY.gallery.full} height={410} mobileHeight={192} className="w-full" />
            <div className="flex items-center gap-[16px]">
              <Frame src={STUDY.gallery.pair[0]} height={410} mobileHeight={206} className="w-[503px] max-lg:w-1/2" />
              <Frame src={STUDY.gallery.pair[1]} height={410} mobileHeight={206} className="w-[501px] max-lg:w-1/2" />
            </div>
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
              {STUDY.exploration.map((row, i) =>
                row.type === "full" ? (
                  <Frame key={i} src={row.src} height={521} mobileHeight={192} className="w-full" />
                ) : (
                  <div key={i} className="flex items-center gap-[16px]">
                    <Frame src={row.srcs[0]} height={410} mobileHeight={206} className="w-[503px] max-lg:w-1/2" />
                    <Frame src={row.srcs[1]} height={410} mobileHeight={206} className="w-[501px] max-lg:w-1/2" />
                  </div>
                )
              )}
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

      <Footer />
    </div>
  );
}
