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
const imgLines = "/assets/08c740b47b066a09ddc1385b453b9a2d1b0875a9.svg"; // same grid as the Hero

const CARDS = [
  { slug: "riqs-praxis-monitor", img: imgRectangle8, title: "RiQS Praxis Monitor/ Web Application", tags: ["UX Audit", "Improve UX", "User Journey"] },
  { slug: "fittrack-pro", img: imgRectangle14, title: "RiQS Praxis Monitor/ Web Application", tags: ["Revamp Design", "Improve UX", "Fine tune User Journey"] },
  { slug: "nutriguide", img: imgRectangle6, title: "RiQS Praxis Monitor/ Web Application", tags: ["Revamp Design", "Improve UX", "Fine tune User Journey"], crop: true },
  { slug: "sleepsync", img: imgRectangle15, title: "RiQS Praxis Monitor/ Web Application", tags: ["Revamp Design", "Improve UX", "Fine tune User Journey"] },
];

/* layout constants (px) — feed both the JSX and the scroll maths.
   Content lives inside the centred 1440 grid box (same box the rail lines are
   drawn on) and keeps a 20px gap from the rails, exactly like the hero. */
const BOX_W = 1440; // the centred grid box the rails sit on
const INSET = 20; // gap between a rail line and the content
const CARD_W = 720;
const IMG_H = 405; // 720 × 9/16 = perfect 16:9
const GAP = 32;
const TRACK_TOP = 372;
const HEADLINE_TOP = 96;
const INTRO_SCALE = 1.3; // intro headline size (rest = 1)
const SECTION_GAP = 128; // gap to the next section
/* mobile: the intro headline owns a FULL viewport (100svh) on its own, centred
   with lines 2-3 indented under "Portfolio"; scrolling on flies it to the
   top-left rest slot M_HEADLINE_REST below the band, at scale 1. The band is
   the box's mobile padding-top minus that rest offset, read off the live layout
   so CSS svh and JS innerHeight can never disagree. */
const M_HEADLINE_REST = 48;

function Chip({ children, rounded = "rounded-[20px]" }) {
  return (
    <div className={`relative flex h-[31px] shrink-0 items-center justify-center bg-[rgba(128,128,128,0.2)] p-[10px] ${rounded}`}>
      <p className="font-jakarta relative shrink-0 whitespace-nowrap text-[16px] font-medium leading-[24px] tracking-[0.64px] text-white max-lg:text-[12px] max-lg:tracking-[0.48px] [word-break:break-word]">
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
  const open = () => {
    window.location.hash = `case-study/${data.slug}`;
  };
  return (
    <div
      role="link"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), open())}
      className="hcard group/card relative flex w-full shrink-0 cursor-pointer flex-col gap-[16px] max-lg:gap-[20px] lg:w-[720px]"
      style={{ willChange: "transform" }}
    >
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-[8px] max-lg:aspect-[350/216] lg:aspect-auto lg:h-[405px]">
        {data.crop ? (
          <img alt="" className="pointer-events-none absolute left-0 top-[-8%] h-[121%] w-full max-w-none" src={data.img} />
        ) : (
          <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={data.img} />
        )}
      </div>
      <div className="relative flex w-full shrink-0 items-start justify-between gap-[20px] max-lg:flex-col max-lg:gap-[16px]">
        <div className="relative flex flex-col items-start gap-[6px] max-lg:w-full max-lg:gap-[8px] lg:w-[320px] [word-break:break-word]">
          <p className="font-serif-display relative shrink-0 text-[20px] not-italic leading-[24px] tracking-[0.8px] text-white max-lg:text-[24px] max-lg:tracking-[0.96px]">
            {data.title}
          </p>
          <p className="font-jakarta relative shrink-0 text-[14px] font-medium leading-[20px] tracking-[0.56px] text-grey max-lg:text-[16px] max-lg:leading-[24px] max-lg:tracking-[0.64px]">
            Monitor your daily steps effortlessly with RiQS Praxis Monitor. Stay inspired and on track as you progress toward your fitness
            milestones.
          </p>
        </div>
        {/* mobile stacks the tag rows above the client/year line (Figma 623:452) */}
        <div className="relative flex shrink-0 flex-col gap-[8px] max-lg:w-full max-lg:items-start lg:items-end">
          <div className="relative flex shrink-0 items-center gap-[16px] max-lg:order-3 max-lg:gap-[20px]">
            <div className="relative h-[16px] w-[76px] shrink-0 max-lg:h-[18px] max-lg:w-[84px]">
              <img alt="RiQS" className="absolute inset-0 block size-full max-w-none" src={imgLogo2} />
            </div>
            {/* mobile sits the year in a 31px chip box (Figma 623:425 — no fill) */}
            <p className="font-jakarta relative shrink-0 whitespace-nowrap text-[14px] font-medium leading-[24px] tracking-[0.56px] text-white max-lg:flex max-lg:h-[31px] max-lg:items-center max-lg:px-[10px] max-lg:text-[16px] max-lg:tracking-[0.64px]">
              2025/26
            </p>
          </div>
          <div className="relative flex shrink-0 items-center max-lg:order-1">
            <Chip rounded="rounded-l-[20px]">{data.tags[0]}</Chip>
            <TagDivider />
            <Chip rounded="rounded-none">{data.tags[1]}</Chip>
            <TagDivider />
            <Chip rounded="rounded-r-[20px]">{data.tags[2]}</Chip>
          </div>
          <div className="relative flex shrink-0 items-start gap-[8px] max-lg:order-2">
            <Chip>Medical</Chip>
            <Chip>Human Resource</Chip>
          </div>
          {/* the deep-link line is desktop-only in the mobile frame */}
          <p className="font-jakarta relative shrink-0 whitespace-nowrap text-[14px] font-medium leading-[24px] tracking-[0.56px] text-white max-lg:hidden">
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
  const boxRef = useRef(null);
  const headlineRef = useRef(null);
  const trackRef = useRef(null);
  const indentRef = useRef(null);
  const portfolioRef = useRef(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      const box = boxRef.current;
      const headline = headlineRef.current;
      const track = trackRef.current;
      const mm = gsap.matchMedia();

      // local (unscaled) x of "Portfolio" = width of the "A " prefix, i.e. how
      // far lines 2-3 sit indented at the start of the FLIP (both breakpoints)
      const aWidth = () => portfolioRef.current.offsetLeft;

      /* ── below 1024: no pin and no side-scroll (side-scroll fights thumb
            scroll), but the headline keeps the desktop FLIP. It owns a full
            viewport band: at the top of the band it sits dead-centre with lines
            2-3 indented under "Portfolio", and over exactly one viewport of
            scroll it drifts up-left to its 48px top-left rest slot while the
            first card rises into frame behind it.

            The band height IS the scroll distance, which is what makes the
            travel read: on screen the headline moves at (1 − bandH/scroll) of
            page speed, so it visibly climbs instead of scrolling away. That
            only holds if the tween is LINEAR — any ease steeper than the
            average rate would push it back down mid-flight. */
      mm.add("(max-width: 1023px)", () => {
        gsap.set(trackRef.current, { clearProps: "all" });
        const indent = indentRef.current;

        // visual block during the intro is headline + the "A " indent
        const bandH = () => headline.offsetTop - M_HEADLINE_REST;
        const introX = () => box.offsetWidth / 2 - (headline.offsetWidth + aWidth()) / 2 - headline.offsetLeft;
        const introY = () => bandH() / 2 - headline.offsetHeight / 2 - headline.offsetTop;

        gsap.set(headline, { transformOrigin: "top left" });
        const flipTl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => "+=" + bandH(),
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        flipTl.fromTo(headline, { x: introX, y: introY }, { x: 0, y: 0, ease: "none", duration: 1 }, 0);
        // the indent closes early, so the block is already aligned on arrival
        flipTl.fromTo(indent, { x: aWidth }, { x: 0, ease: "power2.out", duration: 0.6 }, 0);

        gsap.utils.toArray(".hcard").forEach((card) => {
          gsap.from(card, {
            autoAlpha: 0,
            scale: 0.8,
            yPercent: 8,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          });
        });
      });

      /* ── 1024 and up: the original pinned FLIP + horizontal rail ── */
      mm.add("(min-width: 1024px)", () => {

      // FLIP — offsetLeft/Top/Width/Height are transform-independent, so the
      // centred+large intro is recomputed correctly on every refresh/resize.
      // Measured against the 1440 box (the headline's offsetParent).
      const introX = () => box.offsetWidth / 2 - (headline.offsetWidth * INTRO_SCALE) / 2 - headline.offsetLeft;
      const introY = () => box.offsetHeight / 2 - (headline.offsetHeight * INTRO_SCALE) / 2 - headline.offsetTop;

      // rail travels only inside the content area (between the inset lines)
      const areaW = () => box.offsetWidth - INSET * 2;
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
      }); // end desktop matchMedia
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-ink relative max-lg:pb-[48px] lg:pb-[128px]" data-name="Case Study">
      <div ref={stageRef} className="bg-ink relative w-full overflow-hidden max-lg:h-auto lg:h-screen">
        {/* full grid on the centred 1440 box — outer solids (0/1440) + middle
            dashed (360/720/1080), same SVG as the Hero so the lines run continuously.
            The mobile frames (622:323 / 623:443) carry no rails. */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-full w-[1440px] -translate-x-1/2 max-lg:hidden">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgLines} />
        </div>

        {/* centred 1440 box — the same box the rails are drawn on, so content
            keeps a true 20px gap from the lines at every viewport width.
            On mobile the top padding is the full-viewport intro band the
            headline flies out of, plus its 48px rest offset. */}
        <div
          ref={boxRef}
          className="mx-auto w-full max-w-[1440px] gutter max-lg:relative max-lg:pt-[calc(100svh+48px)] lg:absolute lg:left-1/2 lg:top-0 lg:h-full lg:-translate-x-1/2 lg:px-0"
        >
          {/* headline — timeline-driven FLIP on both breakpoints. w-fit on mobile
              so the FLIP measures the real text width, not the whole column. */}
          <div
            ref={headlineRef}
            className="z-20 max-lg:relative max-lg:w-fit lg:absolute lg:left-[20px] lg:top-[96px]"
            style={{ willChange: "transform" }}
          >
            <div className="font-serif-display text-h2 flex flex-col items-start not-italic tracking-[2.88px] text-white max-lg:gap-[4px] max-lg:text-[32px] max-lg:leading-[40px] max-lg:tracking-[1.28px] [word-break:break-word] lg:leading-[76px]">
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

          {/* desktop: clipped rail that scrolls sideways.
              mobile: a plain vertical stack — nothing pinned, nothing clipped. */}
          <div className="z-10 max-lg:relative max-lg:mt-[48px] lg:absolute lg:bottom-0 lg:left-[20px] lg:right-[20px] lg:top-[372px] lg:overflow-hidden">
            <div
              ref={trackRef}
              className="max-lg:flex max-lg:flex-col max-lg:gap-[64px] lg:absolute lg:left-0 lg:top-0 lg:flex"
              style={{ willChange: "transform" }}
            >
              {CARDS.map((card, i) => (
                <HCard key={i} data={card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
