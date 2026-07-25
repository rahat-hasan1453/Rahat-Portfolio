import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import Footer from "./Footer.jsx";

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

const CASES = [
  {
    img: "/assets/01b079747853473476a56c1110e5349c011b0407.png",
    title: "RiQS Praxis Monitor/ Web Application",
    desc: "Monitor your daily steps effortlessly with RiQS Praxis Monitor. Stay inspired and on track as you progress toward your fitness milestones. This intuitive web app helps you maintain motivation.",
    tags: ["UX Audit", "Improve UX", "User Journey"],
    cats: ["Medical", "Human Resource"],
  },
  {
    img: "/assets/0b19b6ba52627fe4db5c413523518e7d4390e4ae.png",
    title: "FitTrack Pro / Mobile App",
    desc: "Track your fitness journey in real-time with FitTrack Pro. This mobile app provides personalized workouts and nutrition advice to help you achieve your health goals.",
    tags: ["Feature Enhancement", "Boost Engagement", "User Feedback"],
    cats: ["Fitness", "Health Tech"],
  },
  {
    img: "/assets/bf6e07a7c2c0d1b3324cf94624a8454cb84c6b0d.png",
    title: "NutriGuide / Web Application",
    desc: "Discover healthy recipes and meal plans tailored to your dietary preferences with NutriGuide. Empower your eating habits with easy-to-follow guidance.",
    tags: ["Design Refresh", "Enhance Usability", "User Testing"],
    cats: ["Nutrition", "Wellness"],
  },
  {
    img: "/assets/0cd21a053806287e63d372fd804878164d4dce04.png",
    title: "SleepSync / Mobile Application",
    desc: "Optimize your sleep with SleepSync, an app that analyzes your sleep patterns and provides tailored recommendations for better rest.",
    tags: ["User Interface Overhaul", "Increase User Retention", "A/B Testing"],
    cats: ["Sleep Health", "Tech"],
  },
  {
    img: "/assets/664f92d3f7e23a196fa99748074ef3af791931cf.png",
    title: "Wellness Hub / Web Platform",
    desc: "Connect with wellness experts and resources through Wellness Hub. This platform offers workshops, coaching, and community support to enhance your well-being.",
    tags: ["Content Strategy", "Expand Offering", "Customer Insights"],
    cats: ["General Wellness", "Community"],
  },
];

/* ---- vertical rails (Figma frame SVGs, redrawn as crisp CSS) ---- */
const DASH = {
  backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.2) 0 10px, transparent 10px 20px)",
  backgroundSize: "1px 20px",
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
function Chip({ children, rounded = "rounded-[20px]", filled = true }) {
  return (
    <div className={`relative flex h-[31px] shrink-0 items-center justify-center p-[10px] ${filled ? "bg-[rgba(128,128,128,0.2)]" : ""} ${rounded}`}>
      <p className="font-jakarta relative shrink-0 whitespace-nowrap text-[16px] font-medium leading-[24px] tracking-[0.64px] text-white [word-break:break-word]">
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

function Meta({ data }) {
  return (
    <div className="flex shrink-0 flex-col items-end gap-[8px]">
      {/* logo + year */}
      <div className="flex shrink-0 items-center gap-[20px]">
        <div className="relative h-[18px] w-[84px] shrink-0">
          <img alt="RiQS" className="absolute inset-0 block size-full max-w-none" src={imgLogo} />
        </div>
        <Chip filled={false}>2025/26</Chip>
      </div>
      {/* three connected tag pills */}
      <div className="flex shrink-0 items-center">
        <Chip rounded="rounded-l-[20px]">{data.tags[0]}</Chip>
        <TagDivider />
        <Chip rounded="rounded-none">{data.tags[1]}</Chip>
        <TagDivider />
        <Chip rounded="rounded-r-[20px]">{data.tags[2]}</Chip>
      </div>
      {/* two category pills */}
      <div className="flex shrink-0 items-start gap-[8px]">
        <Chip>{data.cats[0]}</Chip>
        <Chip>{data.cats[1]}</Chip>
      </div>
    </div>
  );
}

/* ---- one case study: parallax image + hover inner-zoom, then info row ---- */
function Card({ data }) {
  return (
    <div className="case-card flex w-full flex-col gap-[14px]">
      <div className="group relative w-full overflow-hidden rounded-[8px] bg-[#1c1c1c]" style={{ height: 615 }}>
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

      <div className="flex w-full items-start justify-between">
        <div className="flex w-[412px] shrink-0 flex-col items-start gap-[8px]">
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
    <div ref={rootRef} className="bg-ink relative mx-auto w-[1440px]" data-name="Case Studies Page">
      {/* hero + card list share the four vertical rails */}
      <div className="relative">
        <Rails />

        {/* ===================== HERO (pinned) ===================== */}
        <section ref={heroRef} className="relative h-screen max-h-[990px] min-h-[760px] overflow-hidden">
          {/* centred text block, nudged down 78px (Figma 580:6584) — sits ABOVE
              the floats so wandering shots slide behind the copy (trionn) */}
          <div className="absolute left-1/2 z-30 w-[1062px] -translate-x-1/2 -translate-y-1/2" style={{ top: "calc(50% + 78px)" }}>
            <div className="hero-inner">
              <div className="flex items-end gap-[20px]">
                {/* short horizontal line off the left rail */}
                <div className="mb-[10px] h-px w-[124px] shrink-0 bg-white/40" />

                <div className="flex flex-1 flex-col items-start gap-[20px]">
                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                    className="font-serif-display text-[84px] leading-[92px] tracking-[3.36px]"
                  >
                    <span className="accent-gradient-text -my-[10px] block py-[10px]">Case</span>
                    <span className="accent-gradient-text -my-[10px] block py-[10px]">Studies</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
                    className="font-jakarta w-[685px] text-[20px] font-medium leading-[24px] tracking-[0.8px] text-[#b3b3b3] [word-break:break-word]"
                  >
                    {"Hello, I’m Rahat — a product-minded designer with nearly 4 years of experience, currently a UX Engineer at Selise Digital Platform. I've grown into a product-focused role, taking end-to-end ownership "}
                  </motion.p>
                </div>
              </div>
            </div>
          </div>

          {/* floating project shots — idle drift, then converge to centre on scroll */}
          <div className="pointer-events-none absolute inset-0 z-20">
            {FLOATS.map((f, i) => (
              <div
                key={i}
                className="cs-float absolute will-change-transform"
                style={{ left: f.x, top: `${(f.y / ART_H) * 100}%`, width: f.w, height: f.h }}
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
        <section className="relative z-10 pb-[200px] pt-[128px]">
          <div className="mx-auto flex w-[1022px] flex-col gap-[100px]">
            {CASES.map((c) => (
              <Card key={c.title} data={c} />
            ))}
          </div>
        </section>
      </div>

      {/* ===================== FOOTER (shared) ===================== */}
      <Footer />
    </div>
  );
}
