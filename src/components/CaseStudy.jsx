import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const imgRectangle6 = "/assets/bf6e07a7c2c0d1b3324cf94624a8454cb84c6b0d.png";
const imgRectangle8 = "/assets/01b079747853473476a56c1110e5349c011b0407.png";
const imgRectangle14 = "/assets/0b19b6ba52627fe4db5c413523518e7d4390e4ae.png";
const imgRectangle15 = "/assets/b0191a30584e4ed37ce1640236532481efa0be4e.png";
const imgLogo2 = "/assets/0826edbc3e6fd14f58cf0e0a65d4ad80ec15da69.svg";
const imgVector1 = "/assets/d6b9f02c4491ac4a2168656adfefa6ca940f6b7d.svg";

const CARDS = [
  { img: imgRectangle8, title: "RiQS Praxis Monitor/ Web Application", tags: ["UX Audit", "Improve UX", "User Journey"] },
  { img: imgRectangle14, title: "RiQS Praxis Monitor/ Web Application", tags: ["Revamp Design", "Improve UX", "Fine tune User Journey"] },
  { img: imgRectangle6, title: "RiQS Praxis Monitor/ Web Application", tags: ["Revamp Design", "Improve UX", "Fine tune User Journey"], crop: true },
  { img: imgRectangle15, title: "RiQS Praxis Monitor/ Web Application", tags: ["Revamp Design", "Improve UX", "Fine tune User Journey"] },
];

/* layout constants (px) — feed both the JSX and the scroll maths */
const GUTTER = 144; // where the vertical rail lines sit
const INSET = 20; // gap between a rail line and the content (like the hero)
const EDGE = GUTTER + INSET; // 164 — the content area starts/ends here
const CARD_W = 720;
const IMG_H = 405; // 720 × 9/16 = perfect 16:9
const GAP = 32;
const TRACK_TOP = 372;
const HEADLINE_TOP = 96;
const INTRO_SCALE = 1.3; // intro headline size (rest = 1)
const SECTION_GAP = 128; // gap to the next section

function Chip({ children, rounded = "rounded-[20px]" }) {
  return (
    <div className={`relative flex h-[31px] shrink-0 items-center justify-center bg-[rgba(128,128,128,0.2)] p-[10px] ${rounded}`}>
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
          <img alt="" className="block size-full max-w-none" src={imgVector1} />
        </div>
      </div>
    </div>
  );
}

function HCard({ data }) {
  return (
    <div className="hcard relative flex shrink-0 flex-col gap-[16px]" style={{ width: CARD_W, willChange: "transform" }}>
      <div className="relative w-full shrink-0 overflow-hidden rounded-[8px]" style={{ height: IMG_H }}>
        {data.crop ? (
          <img alt="" className="pointer-events-none absolute left-0 top-[-8%] h-[121%] w-full max-w-none" src={data.img} />
        ) : (
          <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={data.img} />
        )}
      </div>
      <div className="relative flex w-full shrink-0 items-start justify-between gap-[20px]">
        <div className="relative flex flex-col items-start gap-[6px] [word-break:break-word]" style={{ width: 320 }}>
          <p className="font-serif-display relative shrink-0 text-[20px] not-italic leading-[24px] tracking-[0.8px] text-white">
            {data.title}
          </p>
          <p className="font-jakarta relative shrink-0 text-[14px] font-medium leading-[20px] tracking-[0.56px] text-grey">
            Monitor your daily steps effortlessly with RiQS Praxis Monitor. Stay inspired and on track as you progress toward your fitness
            milestones.
          </p>
        </div>
        <div className="relative flex shrink-0 flex-col items-end gap-[8px]">
          <div className="relative flex shrink-0 items-center gap-[16px]">
            <div className="relative h-[16px] w-[76px] shrink-0">
              <img alt="RiQS" className="absolute inset-0 block size-full max-w-none" src={imgLogo2} />
            </div>
            <p className="font-jakarta relative shrink-0 whitespace-nowrap text-[14px] font-medium leading-[24px] tracking-[0.56px] text-white">
              2025/26
            </p>
          </div>
          <div className="relative flex shrink-0 items-center">
            <Chip rounded="rounded-l-[20px]">{data.tags[0]}</Chip>
            <TagDivider />
            <Chip rounded="rounded-none">{data.tags[1]}</Chip>
            <TagDivider />
            <Chip rounded="rounded-r-[20px]">{data.tags[2]}</Chip>
          </div>
          <div className="relative flex shrink-0 items-start gap-[8px]">
            <Chip>Medical</Chip>
            <Chip>Human Resource</Chip>
          </div>
          <p className="font-jakarta relative shrink-0 whitespace-nowrap text-[14px] font-medium leading-[24px] tracking-[0.56px] text-white">
            riqs.com/ login
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudy() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const headlineRef = useRef(null);
  const trackRef = useRef(null);
  const indentRef = useRef(null);
  const portfolioRef = useRef(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      const headline = headlineRef.current;
      const track = trackRef.current;

      // FLIP — offsetLeft/Top/Width/Height are transform-independent, so the
      // centred+large intro is recomputed correctly on every refresh/resize.
      const introX = () => stage.offsetWidth / 2 - (headline.offsetWidth * INTRO_SCALE) / 2 - headline.offsetLeft;
      const introY = () => stage.offsetHeight / 2 - (headline.offsetHeight * INTRO_SCALE) / 2 - headline.offsetTop;

      // rail travels only inside the content area (between the inset lines).
      // use the stage width (excludes the scrollbar) so it matches the clip box.
      const areaW = () => stage.offsetWidth - EDGE * 2;
      const startX = () => areaW(); // track parked just past the right line
      const endX = () => -(track.scrollWidth - areaW()); // last card's right edge → right line

      // 1:1 scroll-to-travel; intro length ≈ constant, rail length ∝ card count
      const total = () => startX() - endX();
      const introDist = () => startX() * 0.6; // headline settles well before card 1 lands

      // ── the pinned horizontal rail (also the containerAnimation source) ──
      const rail = gsap.fromTo(
        track,
        { x: startX },
        {
          x: endX,
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => "+=" + total(),
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }
      );

      // ── headline: centre/large → top-left rest; meanwhile lines 2-3 slide
      //    from "indented under Portfolio" to "aligned under A". ──
      const indent = indentRef.current;
      // local (unscaled) x of "Portfolio" = width of the "A " prefix
      const aWidth = () => portfolioRef.current.offsetLeft;

      gsap.set(headline, { transformOrigin: "top left" });
      const flipTl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => "+=" + introDist(),
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      flipTl.fromTo(headline, { x: introX, y: introY, scale: INTRO_SCALE }, { x: 0, y: 0, scale: 1, ease: "power3.out" }, 0);
      flipTl.fromTo(indent, { x: aWidth }, { x: 0, ease: "power3.out" }, 0);

      // ── every card reveals diagonally from the bottom-right as it enters ──
      gsap.utils.toArray(".hcard").forEach((card) => {
        gsap.from(card, {
          yPercent: 26,
          autoAlpha: 0,
          scale: 0.93,
          ease: "power2.out",
          scrollTrigger: {
            containerAnimation: rail,
            trigger: card,
            start: "left 88%",
            end: "left 52%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-ink relative" data-name="Case Study" style={{ paddingBottom: SECTION_GAP }}>
      <div ref={stageRef} className="bg-ink relative h-screen w-full overflow-hidden">
        {/* vertical rail lines */}
        <span className="pointer-events-none absolute top-0 z-0 h-full w-px bg-white/[0.06]" style={{ left: GUTTER }} />
        <span className="pointer-events-none absolute top-0 z-0 h-full w-px bg-white/[0.06]" style={{ right: GUTTER }} />

        {/* headline — driven by the timeline (NOT position: sticky) */}
        <div ref={headlineRef} className="absolute z-20" style={{ left: EDGE, top: HEADLINE_TOP, willChange: "transform" }}>
          <div className="font-serif-display flex flex-col items-start not-italic tracking-[2.88px] text-[72px] leading-[76px] text-white [word-break:break-word]">
            <p className="whitespace-nowrap">
              <span>{"A "}</span>
              <span ref={portfolioRef} className="font-serif-display-it accent-gradient-text italic">Portfolio</span>
            </p>
            {/* lines 2–3 start indented under "Portfolio", then slide left to align under "A" */}
            <div ref={indentRef} className="flex flex-col items-start" style={{ willChange: "transform" }}>
              <p className="whitespace-nowrap">Build For</p>
              <p className="whitespace-nowrap">Every Steps</p>
            </div>
          </div>
        </div>

        {/* content-area clip — nothing crosses the inset lines */}
        <div className="absolute z-10 overflow-hidden" style={{ left: EDGE, right: EDGE, top: TRACK_TOP, bottom: 0 }}>
          <div ref={trackRef} className="absolute left-0 top-0 flex" style={{ gap: GAP, willChange: "transform" }}>
            {CARDS.map((card, i) => (
              <HCard key={i} data={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
