import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import Footer from "./Footer.jsx";
import { CASE_STUDIES } from "../data/caseStudies.js";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* =========================================================================
   Case Studies page — Figma node 541:5303.
   Hero (horizontal line + gradient "Case Studies" + intro) → a vertical list
   of five full-width case cards (image + title/desc + meta pills) → shared
   Footer. Four vertical rails frame the page: solid white/0.4 at the outer
   edges, dashed white/0.2 (10-10) at the inner gutter lines (Figma rail SVGs).
   Parallax on scroll + an inner-zoom on image hover keep the page alive.
   ========================================================================= */

const imgLogo = "/assets/0826edbc3e6fd14f58cf0e0a65d4ad80ec15da69.svg";
const imgDivider = "/assets/d6b9f02c4491ac4a2168656adfefa6ca940f6b7d.svg";

const EASE = [0.16, 1, 0.3, 1];

/* floating hero shots — x in the 1440 frame, y designed on the 990-tall
   artboard (rendered as % so the hero can flex). First 9 spots are the Figma
   positions (580:6530); the rest fill the gaps around the centred text.
   Images are the real project mockups (~/Documents/Mockups, resized). */
const FLOATS = [
  { src: "/assets/cs-shot-1.png", x: 110, y: 173, w: 156, h: 147 },
  { src: "/assets/cs-shot-2.png", x: 520, y: 160, w: 118, h: 112 },
  { src: "/assets/cs-shot-3.png", x: 792, y: 256, w: 118, h: 112 },
  { src: "/assets/cs-shot-4.png", x: 1030, y: 182, w: 156, h: 147 },
  { src: "/assets/cs-shot-5.png", x: 1345, y: 423, w: 161, h: 151 },
  { src: "/assets/cs-shot-6.png", x: 1094, y: 746, w: 118, h: 111 },
  { src: "/assets/cs-shot-7.png", x: 625, y: 746, w: 161, h: 151 },
  { src: "/assets/cs-shot-8.png", x: 13, y: 781, w: 161, h: 151 },
  { src: "/assets/cs-shot-9.png", x: -54, y: 448, w: 135, h: 126 },
  { src: "/assets/cs-shot-10.png", x: 300, y: 48, w: 135, h: 126 },
  { src: "/assets/cs-shot-11.png", x: 690, y: 56, w: 118, h: 112 },
  { src: "/assets/cs-shot-12.png", x: 1240, y: 72, w: 135, h: 126 },
  { src: "/assets/cs-shot-13.png", x: 36, y: 292, w: 118, h: 112 },
  { src: "/assets/cs-shot-14.png", x: 1180, y: 288, w: 118, h: 112 },
  { src: "/assets/cs-shot-15.png", x: 306, y: 766, w: 135, h: 126 },
  { src: "/assets/cs-shot-16.png", x: 890, y: 760, w: 135, h: 126 },
  { src: "/assets/cs-shot-17.png", x: 1330, y: 640, w: 118, h: 112 },
  { src: "/assets/cs-shot-18.png", x: 452, y: 848, w: 118, h: 112 },
  { src: "/assets/cs-shot-19.png", x: 168, y: 560, w: 118, h: 112 },
  { src: "/assets/cs-shot-20.png", x: 1210, y: 500, w: 135, h: 126 },
  { src: "/assets/cs-shot-21.png", x: 830, y: 60, w: 118, h: 112 },
];
const ART_H = 990; // Figma artboard height the y values are designed on

/* mobile hero (Figma 642:3600, 390 × 1036) — nine of the same shots, at 0.638
   of their desktop size, re-scattered around the centred title. */
const M_ART_H = 1036;
const M_FLOATS = [
  { src: "/assets/cs-shot-1.png", x: 15, y: 226, w: 99.5, h: 93.8 },
  { src: "/assets/cs-shot-4.png", x: 256, y: 193, w: 99.5, h: 93.8 },
  { src: "/assets/cs-shot-2.png", x: 203, y: 330, w: 75.3, h: 71.4 },
  { src: "/assets/cs-shot-3.png", x: 104, y: 388, w: 75.3, h: 71.4 },
  { src: "/assets/cs-shot-5.png", x: 298, y: 444, w: 102.7, h: 96.3 },
  { src: "/assets/cs-shot-9.png", x: -10, y: 509, w: 86.1, h: 80.4 },
  { src: "/assets/cs-shot-6.png", x: 298, y: 672, w: 75.3, h: 70.8 },
  { src: "/assets/cs-shot-7.png", x: -7, y: 735, w: 102.7, h: 96.3 },
  { src: "/assets/cs-shot-8.png", x: 187, y: 793, w: 102.7, h: 96.3 },
];

/* the list cards reuse the shared study data; the card image is the study hero */
const CASES = CASE_STUDIES.map((c) => ({
  img: c.hero,
  slug: c.slug,
  title: c.title,
  desc: c.desc,
  tags: c.tags,
  cats: c.cats,
}));

/* ---- vertical rails (Figma frame SVGs, redrawn as crisp CSS) ---- */
const DASH = {
  backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.2) 0 10px, transparent 10px 20px)",
  backgroundSize: "1px 20px",
};

/* the horizontal counterpart — identical 10-on/10-off rhythm to the rails */
const DASH_X = {
  backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.2) 0 10px, transparent 10px 20px)",
  backgroundSize: "20px 1px",
  backgroundRepeat: "repeat-x",
};
function Rails() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <span className="absolute inset-y-0 w-px bg-white/40" style={{ left: 0 }} />
      <span className="absolute inset-y-0 w-px" style={{ left: 188, ...DASH }} />
      <span className="absolute inset-y-0 w-px" style={{ left: 1250, ...DASH }} />
      <span className="absolute inset-y-0 w-px bg-white/40" style={{ left: 1439 }} />
    </div>
  );
}

/* ---- meta pills (reuses the connected-chip pattern) ---- */
function Chip({ children, rounded = "rounded-[20px]", filled = true, mobileSm = true }) {
  return (
    <div className={`relative flex h-[31px] shrink-0 items-center justify-center p-[10px] ${filled ? "bg-[rgba(128,128,128,0.2)]" : ""} ${rounded}`}>
      <p className={`font-jakarta relative shrink-0 whitespace-nowrap text-[16px] font-medium leading-[24px] tracking-[0.64px] text-white [word-break:break-word] ${mobileSm ? "max-lg:text-[12px] max-lg:tracking-[0.48px]" : ""}`}>
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

/* mobile (Figma 653:3980) reverses the stack — tags first, client/year last —
   and left-aligns it, matching the homepage card */
function Meta({ data }) {
  return (
    <div className="flex shrink-0 flex-col items-end gap-[8px] max-lg:w-full max-lg:items-start">
      {/* logo + year */}
      <div className="flex shrink-0 items-center gap-[20px] max-lg:order-3">
        <div className="relative h-[18px] w-[84px] shrink-0">
          <img alt="RiQS" className="absolute inset-0 block size-full max-w-none" src={imgLogo} />
        </div>
        <Chip filled={false} mobileSm={false}>2025/26</Chip>
      </div>
      {/* three connected tag pills — this page's tags run long, and the joined
          group can't wrap without breaking the pill, so on a phone it swipes */}
      <div className="flex shrink-0 items-center no-scrollbar max-lg:order-1 max-lg:max-w-full max-lg:overflow-x-auto">
        <Chip rounded="rounded-l-[20px]">{data.tags[0]}</Chip>
        <TagDivider />
        <Chip rounded="rounded-none">{data.tags[1]}</Chip>
        <TagDivider />
        <Chip rounded="rounded-r-[20px]">{data.tags[2]}</Chip>
      </div>
      {/* two category pills */}
      <div className="flex shrink-0 items-start gap-[8px] max-lg:order-2">
        <Chip>{data.cats[0]}</Chip>
        <Chip>{data.cats[1]}</Chip>
      </div>
    </div>
  );
}

/* ---- one case study: parallax image + hover inner-zoom, then info row.
       Clicking opens the details page (#case-study/<slug>). ---- */
function Card({ data }) {
  const open = () => {
    window.location.hash = `case-study/${data.slug}`;
  };
  return (
    <div
      role="link"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), open())}
      className="case-card flex w-full cursor-pointer flex-col gap-[14px] max-lg:gap-[20px]"
    >
      {/* mobile trades the tall 615 crop for the design's 350 × 216 banner */}
      <div className="group relative w-full overflow-hidden rounded-[8px] bg-[#1c1c1c] max-lg:aspect-[350/216] max-lg:h-auto lg:h-[615px]">
        {/* parallax layer overfills the frame so the drift never reveals an edge */}
        <div className="case-parallax absolute inset-x-0 -top-[10%] h-[120%] will-change-transform">
          <img
            alt={data.title}
            src={data.img}
            draggable="false"
            className="size-full max-w-none object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
          />
        </div>
      </div>

      <div className="flex w-full items-start justify-between max-lg:flex-col max-lg:gap-[16px]">
        <div className="flex w-[412px] shrink-0 flex-col items-start gap-[8px] max-lg:w-full">
          <p className="font-serif-display text-[24px] not-italic leading-[24px] tracking-[0.96px] text-white [word-break:break-word]">
            {data.title}
          </p>
          <p className="font-jakarta text-[16px] font-medium leading-[24px] tracking-[0.64px] text-[#b3b3b3] [word-break:break-word]">
            {data.desc}
          </p>
        </div>
        <Meta data={data} />
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const [isNarrow, setIsNarrow] = useState(() => window.matchMedia("(max-width: 1023px)").matches);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setIsNarrow(mq.matches);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useGSAP(
    () => {
      // keep the smooth-scroller running on this normal vertical page
      window.__lenis?.start();

      const hero = heroRef.current;

      // idle "circulating" cycle (trionn.com/work): each shot drifts slowly,
      // melts away mid-drift, teleports, and re-emerges somewhere else —
      // forever. repeatRefresh re-rolls every random value each cycle.
      const idleTls = [];
      gsap.utils.toArray(".cs-float-img").forEach((im, i) => {
        gsap.fromTo(im, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out", delay: 0.15 + i * 0.07 });
        const cyc = gsap.timeline({ repeat: -1, repeatRefresh: true, delay: gsap.utils.random(3, 9) });
        cyc
          // drift around the current spot for a good while…
          .to(im, { x: "+=random(-40, 40)", y: "+=random(-30, 30)", rotation: "random(-4, 4)", duration: "random(5, 8)", ease: "sine.inOut" })
          .to(im, { x: "+=random(-40, 40)", y: "+=random(-30, 30)", rotation: "random(-3, 3)", duration: "random(4, 6)", ease: "sine.inOut" })
          // …fade out mid-motion…
          .to(im, { opacity: 0, scale: 0.7, duration: 0.8, ease: "power2.in" })
          // …teleport to a fresh spot around its home…
          .set(im, { x: "random(-230, 230)", y: "random(-150, 150)", rotation: "random(-5, 5)", scale: 0.75 })
          // …and re-emerge, drifting again
          .to(im, { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" })
          .to(im, { x: "+=random(-40, 40)", y: "+=random(-30, 30)", duration: "random(5, 8)", ease: "sine.inOut" });
        idleTls.push(cyc);
      });
      let idlePaused = false;

      // trionn-style: pin the hero; scrolling sends every shot into the centre
      // of the screen (shrinking + fading, lightly staggered). Only after all
      // have vanished does the page scroll on to the cards.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // freeze the idle cycle while the shots converge; resume on scroll-back
          onUpdate: (self) => {
            const busy = self.progress > 0.03;
            if (busy && !idlePaused) {
              idleTls.forEach((t) => t.pause());
              idlePaused = true;
            } else if (!busy && idlePaused) {
              idleTls.forEach((t) => t.resume());
              idlePaused = false;
            }
          },
        },
      });
      gsap.utils.toArray(".cs-float").forEach((el, i) => {
        tl.to(
          el,
          {
            x: () => hero.clientWidth / 2 - (el.offsetLeft + el.offsetWidth / 2),
            y: () => hero.clientHeight / 2 - (el.offsetTop + el.offsetHeight / 2),
            scale: 0.08,
            opacity: 0,
            ease: "power1.in",
            duration: 0.72,
          },
          i * 0.04
        );
      });
      tl.to({}, { duration: 0.22 }); // a beat after the last one vanishes

      // each image drifts within its frame — classic vertical parallax
      gsap.utils.toArray(".case-parallax").forEach((layer) => {
        gsap.fromTo(
          layer,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: layer.closest(".case-card"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // cards fade in from scale 0.9 → 1 as they enter
      gsap.utils.toArray(".case-card").forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          scale: 0.9,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="bg-ink relative mx-auto w-full lg:w-[1440px]" data-name="Case Studies Page">
      {/* hero + card list share the four vertical rails (desktop only — the
          mobile frames carry none, and a 1440 rail block would misplace them) */}
      <div className="relative lg:fit-1440">
        <div className="max-lg:hidden">
          <Rails />
        </div>

        {/* ===================== HERO (pinned) ===================== */}
        {/* h-screen needs no zoom compensation — viewport units already resolve
            against the zoom, so this still paints one viewport tall (capped by
            max-h in canvas units, which is what the 1440 design intends) */}
        <section ref={heroRef} className="relative h-screen max-h-[990px] min-h-[760px] overflow-hidden">
          {/* centred text block, nudged down 78px (Figma 580:6584) — sits ABOVE
              the floats so wandering shots slide behind the copy (trionn) */}
          <div className="absolute left-1/2 z-30 w-[1062px] -translate-x-1/2 -translate-y-1/2 max-lg:w-full max-lg:gutter" style={{ top: "calc(50% + 78px)" }}>
            <div className="hero-inner">
              {/* mobile drops the rule under the copy and indents it 54px,
                  matching the About hero (Figma 642:3940) */}
              <div className="flex items-end gap-[20px] max-lg:flex-col-reverse max-lg:items-start max-lg:gap-[0px]">
                {/* short horizontal line off the left rail */}
                <div className="mb-[10px] h-px w-[124px] shrink-0 bg-white/40 max-lg:mb-0 max-lg:mt-[16px] max-lg:w-[49px]" />

                <div className="flex flex-1 flex-col items-start gap-[20px] max-lg:w-full max-lg:pl-[54px]">
                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                    className="font-serif-display text-[84px] leading-[92px] tracking-[3.36px] max-lg:text-[40px] max-lg:leading-[44px] max-lg:tracking-[1.6px]"
                  >
                    <span className="accent-gradient-text -my-[10px] block py-[10px]">Case</span>
                    <span className="accent-gradient-text -my-[10px] block py-[10px]">Studies</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
                    className="font-jakarta w-[685px] text-[20px] font-medium leading-[24px] tracking-[0.8px] text-[#b3b3b3] [word-break:break-word] max-lg:w-full max-lg:text-[16px] max-lg:tracking-[0.64px]"
                  >
                    {"Hello, I’m Rahat — a product-minded designer with nearly 4 years of experience, currently a UX Engineer at Selise Digital Platform. I've grown into a product-focused role, taking end-to-end ownership "}
                  </motion.p>
                </div>
              </div>
            </div>
          </div>

          {/* floating project shots — idle drift, then converge to centre on scroll */}
          <div className="pointer-events-none absolute inset-0 z-20">
            {(isNarrow ? M_FLOATS : FLOATS).map((f, i) => (
              <div
                key={i}
                className="cs-float absolute will-change-transform"
                style={{ left: f.x, top: `${(f.y / (isNarrow ? M_ART_H : ART_H)) * 100}%`, width: f.w, height: f.h }}
              >
                <img
                  alt=""
                  src={f.src}
                  draggable="false"
                  className="cs-float-img block size-full max-w-none rounded-[8px] object-cover opacity-0"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ===================== CASE LIST ===================== */}
        <section className="relative z-10 pb-[200px] pt-[128px] max-lg:pb-[48px] max-lg:pt-[48px]">
          <div className="mx-auto flex w-[1022px] flex-col gap-[100px] max-lg:w-full max-lg:gap-[64px] max-lg:gutter">
            {CASES.map((c) => (
              <Card key={c.title} data={c} />
            ))}
          </div>
        </section>
      </div>

      {/* dashed rule closing the page off from the footer — same 10-on/10-off
          rhythm as the rails */}
      <span className="pointer-events-none block h-px w-full" style={DASH_X} />

      {/* ===================== FOOTER (shared) ===================== */}
      <Footer />
    </div>
  );
}
