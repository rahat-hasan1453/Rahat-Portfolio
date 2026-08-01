import { useEffect, useRef, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HexGrid from "./HexGrid.jsx";
import { getPills, CardPills } from "./SkillsGrid.jsx";
import usePressHold from "../hooks/usePressHold.js";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const imgImage63 = "/assets/95b86c277de98cb05b6c2d8499641f05aee027aa.png";
const imgAvatar = "/assets/3bc4ade8f1fdaf67a5e466972e77f4465f7121f1.png";
const imgDownload = "/assets/efb7f30e6bdeee9d2b528673382bc912677dab80.svg";
const imgGroup47 = "/assets/189b07984ec2f3ac75a3c8f86a1240f9d77295b1.svg";
const imgRahatHasan = "/assets/17120c46c73350f30424215b16a49e925eb37ac8.svg";

// Band heights live in index.css as --footer-* so both breakpoints share one
// source of truth:
//   desktop — Figma 270:2457 (1728 × 2338): black 0–1200, gradient 1200–2338,
//     cal 1040 × 489 at top 937 → crosses the boundary by 226px
//   mobile  — Figma 623:603 + 624:809 + 642:2113 (390 frame): black 0–1269
//     (skills band 860 + 409), gradient 1269–2263, booking card 350 × 422 at
//     top 888 → crosses the boundary by 41px
const RIGHTS_H = 44; // all-rights-reserved bar below the design frame
const CAL_LINK = "rahat-akash-4sxje8/15min";
const CAL_NS = "15min";
const CAL_CONFIG = { layout: "month_view", theme: "dark" };

// compact mode (About page): no "Building Better Experiences" section — just a
// black bridge space, the cal widget crossing into the gradient, then the footer.
// Driven by CSS vars so the mobile band heights come along for the ride.
const COMPACT_BODY_H = "calc(var(--footer-compact-space) + var(--footer-bottom-h))";
const COMPACT_TOP_SPACE = "var(--footer-compact-space)";
const COMPACT_CAL_TOP = "var(--footer-compact-cal-top)";

// dashed vertical rail (crisp CSS, no vertical fade) at a given alpha
const dashGrad = (a) => ({
  backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,${a}) 0 10px, transparent 10px 20px)`,
  backgroundSize: "1px 20px",
});

const SOCIAL_LINKS = [
  { label: "linkedin", href: "https://www.linkedin.com/in/rahatuxd/" },
  { label: "facebook", href: null },
  { label: "X", href: null },
  { label: "behance", href: "https://www.behance.net/rahat1453" },
  { label: "dribbble", href: "https://dribbble.com/R1453" },
];
const RESUME_URL = "https://drive.google.com/file/d/1BXxqhJTWyF4Av9leQ9pD_2DPEHKQCh1c/view?usp=sharing";

/* Bubble rows. Desktop wrapped ROW_A at 6 tiles (12 × 144 in an 864 box), so
   the two explicit rows below render identically there; on mobile (Figma
   623:758) the tiles shrink to 96 and every row keeps its 6 slots. */
const ROW_A1 = ["Product\nStrategy", null, "UX Audit", null, "Web\nApplication", null];
const ROW_A2 = [null, "Mobile\nApp", null, "Design\nSystem", null, "Saas\nProducts"];
const ROW_B = ["Storytelling", "OOUX", "Collaboration", "Minimalism", "Empathy", "Adaptability"];
const ROW_C = ["Problem\nSolving", null, "Cognitive\nPsychology", null, "Information\nArchitecture", null];

// mobile ticker: each row drifts on its own heading and pace, so the grid reads
// as floating rather than marching in step. dir -1 = leftward, +1 = rightward.
const ROW_DRIFT = [
  { dir: -1, duration: 26 },
  { dir: 1, duration: 34 },
  { dir: -1, duration: 21 },
  { dir: 1, duration: 30 },
];

// Original bubble — UNCHANGED look/layout. Only addition: on hover it reveals
// its 3 helper pills, released from the card center and shown IN FRONT.
// showPills=false for the dense small-tile row (pills would crowd it).
// mobile type for the bubbles (Figma 623:730 / 623:746): Jakarta 16/24 instead
// of Urbanist 24, and a tighter 28px corner on the square tiles
const BUBBLE_TEXT =
  "font-urbanist text-[24px] leading-none max-lg:font-jakarta max-lg:text-[16px] max-lg:leading-[24px] max-lg:tracking-[0.64px]";

function Bubble({ label, size = "size-[144px] max-lg:size-[96px]", radius = "rounded-[40px] max-lg:rounded-[28px]", showPills = true }) {
  const [hover, setHover] = useState(false);
  const { held, bind } = usePressHold();
  const active = hover || held;
  const pills = label && showPills ? getPills(label) : [];

  const lines = (label || "UX Audit").split("\n").map((line, i) => (
    <p key={i} className="leading-[inherit]">{line}</p>
  ));
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...bind}
      data-held={held || undefined}
      className={`footer-reveal group relative flex shrink-0 items-center justify-center border border-solid border-[#131313] bg-[#1c1c1c] px-[16px] py-[10px] ${radius} ${label ? "cursor-pointer" : ""} ${active ? (pills.length ? "bubble-active z-50" : "z-50") : "z-0"} ${size}`}
    >
      {/* hover (or press-and-hold on touch) shuttles the label out the top,
          back in from below */}
      <div className={`relative shrink-0 overflow-hidden ${label ? "" : "opacity-0"}`}>
        <div className={`${BUBBLE_TEXT} relative whitespace-nowrap text-center font-medium text-white transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[130%] group-data-[held=true]:-translate-y-[130%]`}>
          {lines}
        </div>
        <div className={`${BUBBLE_TEXT} absolute inset-0 translate-y-[130%] whitespace-nowrap text-center font-medium text-white transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-data-[held=true]:translate-y-0`}>
          {lines}
        </div>
      </div>
      {/* helper pills — pinned to the card edges, revealed IN FRONT on hover */}
      <CardPills pills={pills} active={active} />
    </div>
  );
}

/* One bubble row. On mobile the contents are doubled (the copy is hidden on
   desktop, so the desktop row stays exactly 6 × 144) and the whole row is slid
   by half its width, which loops seamlessly. */
function BubbleRow({ labels, index, className = "", bubble = {} }) {
  const row = labels.map((label, i) => <Bubble key={i} label={label} {...bubble} />);
  return (
    <div
      className={`bubble-row relative flex shrink-0 items-center ${className}`}
      data-dir={ROW_DRIFT[index].dir}
      data-duration={ROW_DRIFT[index].duration}
      style={{ willChange: "transform" }}
    >
      <div className={`flex shrink-0 items-center ${className}`}>{row}</div>
      <div aria-hidden className={`flex shrink-0 items-center lg:hidden ${className}`}>
        {labels.map((label, i) => (
          <Bubble key={`dup-${i}`} label={label} {...bubble} />
        ))}
      </div>
    </div>
  );
}

/* ── Mobile booking card (Figma 642:2113, 350 × 422) ──────────────────────
   The full Cal embed is desktop-only: dropping its three-column booker into a
   390px column made the page feel like it had handed itself over to Cal. On
   mobile this card stands in — the same event summary, drawn natively, so no
   iframe loads at all until "Book a Call" is tapped and Cal opens its own
   modal over the page. */
const ICON = "pointer-events-none block size-[20px] shrink-0 stroke-white/60";

const IconClock = () => (
  <svg className={ICON} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const IconVideo = () => (
  <svg className={ICON} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="6" width="13" height="12" rx="2" />
    <path d="M15 11l6-3.5v9L15 13z" />
  </svg>
);
const IconGlobe = () => (
  <svg className={ICON} viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18-2.5-2.7-2.5-15.3 0-18z" />
  </svg>
);
// ic:round-calendar-month, straight off the Figma frame
const IconCalendar = () => (
  <svg className="pointer-events-none block size-[24px] shrink-0" viewBox="0 0 24 24" fill="white" aria-hidden>
    <path d="M17 2c-.55 0-1 .45-1 1v1H8V3c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-1V3c0-.55-.45-1-1-1Zm2 18H5V10h14v10Zm-8-7a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm-4 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm8 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm-4 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm-4 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm8 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
  </svg>
);

function MetaRow({ icon, children }) {
  return (
    <div className="flex shrink-0 items-center gap-[8px]">
      {icon}
      <p className="font-jakarta relative shrink-0 whitespace-nowrap text-[16px] font-medium leading-[24px] tracking-[0.64px] text-white/85 [word-break:break-word]">
        {children}
      </p>
    </div>
  );
}

function BookingCard() {
  // Cal shows the visitor their own zone, so read it rather than hardcoding
  const [zone, setZone] = useState("");
  useEffect(() => {
    try {
      setZone(Intl.DateTimeFormat().resolvedOptions().timeZone || "");
    } catch {
      /* leave the row off if the browser will not say */
    }
  }, []);

  /* #181818 is Cal's own panel fill — it lifts off the #12110d footer by the
     same hair the design does, which is all that makes the 16px radius read */
  return (
    <div className="relative flex h-full w-full flex-col items-start rounded-[16px] bg-[#181818] px-[32px] pb-[22px] pt-[32px]">
      <div className="relative size-[36px] shrink-0 overflow-hidden rounded-full">
        <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={imgAvatar} />
      </div>
      <p className="font-jakarta relative mt-[16px] shrink-0 text-[14px] font-medium leading-[16px] text-grey [word-break:break-word]">
        Rahat Akash
      </p>
      <p className="font-jakarta relative mt-[8px] shrink-0 text-[24px] font-semibold leading-[32px] text-white [word-break:break-word]">
        15 min meeting
      </p>
      <div className="relative mt-[20px] flex shrink-0 flex-col items-start gap-[26px]">
        <MetaRow icon={<IconClock />}>15m</MetaRow>
        <MetaRow icon={<IconVideo />}>Cal Video</MetaRow>
        {zone && <MetaRow icon={<IconGlobe />}>{zone}</MetaRow>}
      </div>

      {/* Cal's embed script wires any [data-cal-link] element to its modal */}
      <button
        type="button"
        data-cal-namespace={CAL_NS}
        data-cal-link={CAL_LINK}
        data-cal-config={JSON.stringify(CAL_CONFIG)}
        className="accent-gradient relative mx-auto mt-auto flex shrink-0 cursor-pointer items-center gap-[8px] rounded-[35px] px-[16px] py-[12px] transition-transform duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04] active:scale-[0.97]"
      >
        <IconCalendar />
        <span className="font-jakarta relative shrink-0 whitespace-nowrap text-center text-[16px] font-medium leading-[24px] tracking-[0.64px] text-white [word-break:break-word]">
          Book a Call
        </span>
      </button>
    </div>
  );
}

function SocialPill({ children, href }) {
  const { held, bind } = usePressHold();
  const cls =
    "footer-reveal relative flex h-[40px] shrink-0 cursor-pointer items-center justify-center gap-[4px] rounded-[40px] border border-solid border-[rgba(105,105,105,0.2)] bg-[rgba(255,255,255,0.2)] px-[16px] py-[10px] transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:bg-[rgba(255,255,255,0.32)] data-[held=true]:-translate-y-[3px] data-[held=true]:bg-[rgba(255,255,255,0.32)]";
  const shared = { className: cls, "data-held": held || undefined, ...bind };
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" {...shared}>
        {children}
      </a>
    );
  }
  return <div {...shared}>{children}</div>;
}

export default function Footer({ compact = false }) {
  const containerRef = useRef(null);
  const [calVisible, setCalVisible] = useState(false);
  /* The inline embed is desktop-only, and "desktop-only" has to be a JS check:
     hiding it with a CSS class would still mount it and pull the iframe down
     on phones, which is exactly the weight the booking card exists to avoid.
     Applies to compact (About / case-study pages) too — those are responsive
     now, and their Figma frames carry the same card. */
  const [isNarrow, setIsNarrow] = useState(() => window.matchMedia("(max-width: 1023px)").matches);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setIsNarrow(mq.matches);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const useBookingCard = isNarrow;

  // Loading the API arms the modal that [data-cal-link] opens; it does NOT
  // create an iframe, so the mobile card stays free until it is tapped.
  useEffect(() => {
    if (!calVisible) return;
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NS });
      cal("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, [calVisible]);

  useGSAP(
    () => {
      if (!compact) {
        gsap.fromTo(
          ".footer-fade",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: ".footer-top", start: "top 95%", end: "top 70%", scrub: 0.3 },
          }
        );

        gsap.fromTo(
          ".footer-reveal",
          { opacity: 0, scale: 0.6 },
          {
            opacity: 1,
            scale: 1,
            ease: "none",
            stagger: 0.02,
            scrollTrigger: { trigger: ".skills-grid", start: "top 95%", end: "top 55%", scrub: 0.3 },
          }
        );
      }

      /* mobile only: every bubble row runs as its own ticker. Rows are doubled
         in the markup, so sliding one full copy width loops seamlessly. */
      if (!compact) {
        const mm = gsap.matchMedia();
        mm.add("(max-width: 1023px)", () => {
          gsap.utils.toArray(".bubble-row").forEach((row) => {
            const dir = parseFloat(row.dataset.dir);
            const duration = parseFloat(row.dataset.duration);
            gsap.fromTo(
              row,
              { xPercent: dir < 0 ? 0 : -50 },
              { xPercent: dir < 0 ? -50 : 0, ease: "none", duration, repeat: -1 }
            );
          });
        });
      }

      ScrollTrigger.create({
        trigger: ".cal-bridge",
        start: "top 80%",
        once: true,
        onEnter: () => setCalVisible(true),
      });
    },
    { scope: containerRef }
  );

  /* shared booking widget — floats across the section boundary. Desktop gets
     Cal's inline three-column booker; mobile gets the card that opens Cal in a
     modal instead (Figma 642:2113). */
  const calWidget = (top) => (
    <div
      className="cal-bridge absolute left-1/2 z-30 h-(--footer-cal-h) w-full max-w-[1040px] -translate-x-1/2 gutter lg:px-0"
      style={{ top }}
    >
      {useBookingCard ? (
        <BookingCard />
      ) : (
        <div className="h-full w-full overflow-hidden rounded-[8px] bg-[#101010]">
          {calVisible && (
            <Cal
              namespace={CAL_NS}
              calLink={CAL_LINK}
              style={{ width: "100%", height: "100%", overflow: "auto" }}
              config={CAL_CONFIG}
            />
          )}
        </div>
      )}
    </div>
  );

  // shared bottom section — dark-red gradient + "Let's Work Together" content
  const bottomSection = (
    <section className="relative w-full" style={{ height: "var(--footer-bottom-h)" }} data-section="bottom">
      {/* blurred gradient backdrop — image 63; desktop leaves an 8px black strip
          at the very bottom, the mobile frame runs it to the edge */}
      <div className="absolute left-0 top-0 w-full blur-[22.95px] max-lg:h-(--footer-bottom-h) lg:h-[1130px]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img alt="" className="absolute left-[-0.94%] top-[-5.18%] h-[102.93%] w-[100.94%] max-w-none" src={imgImage63} />
        </div>
      </div>

      {/* footer content — anchored to the bottom, 1440 wide, centered */}
      <div className="absolute bottom-0 left-1/2 flex w-full max-w-[1440px] -translate-x-1/2 flex-col items-start gap-[10px] gutter max-lg:bottom-[62px]">
        <div className="relative flex w-full shrink-0 flex-col items-center pt-[100px] max-lg:pt-0">
          <div className="relative flex w-full shrink-0 items-start justify-between max-lg:flex-col max-lg:gap-[56px]">
            {/* left column */}
            <div className="relative flex shrink-0 flex-col items-start gap-[48px] max-lg:w-full lg:w-[320px]">
              <div className="relative flex w-full shrink-0 flex-col items-start gap-[24px]">
                <div className="footer-fade font-urbanist relative w-full shrink-0 text-[32px] font-bold text-white [word-break:break-word]">
                  <p className="mb-0 leading-[40px]">Let’s</p>
                  <p className="leading-[40px]">Work Together</p>
                </div>
                <div className="relative flex w-full shrink-0 flex-wrap content-center items-center gap-[8px]">
                  {SOCIAL_LINKS.map(({ label, href }) => (
                    <SocialPill key={label} href={href}>
                      <p className="font-urbanist relative shrink-0 whitespace-nowrap text-right text-[24px] font-medium leading-none text-white [word-break:break-word]">
                        {label}
                      </p>
                    </SocialPill>
                  ))}
                  <SocialPill href={RESUME_URL}>
                    <p className="font-urbanist relative shrink-0 whitespace-nowrap text-right text-[24px] font-medium leading-[24px] text-white [word-break:break-word]">
                      resume
                    </p>
                    <div className="relative size-[24px] shrink-0">
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgDownload} />
                    </div>
                  </SocialPill>
                </div>
              </div>
              <div className="footer-fade font-urbanist relative flex w-[302px] shrink-0 flex-col items-start gap-[16px] text-[24px] font-medium text-white [word-break:break-word]">
                <p className="leading-[24px]">+880 1777280571</p>
                <p className="leading-[24px]">rahat.akash1453@gmail.com</p>
              </div>
            </div>
            {/* right column */}
            <div className="relative flex shrink-0 flex-col items-end gap-[100px] max-lg:w-full max-lg:gap-[43.68px] lg:w-[800.403px]">
              <div className="footer-fade relative shrink-0 max-lg:h-[106.14px] max-lg:w-[113.65px] lg:h-[243px] lg:w-[260.204px]">
                <img alt="r." className="absolute inset-0 block size-full max-w-none" src={imgGroup47} />
              </div>
              <div className="footer-fade relative w-full shrink-0 max-lg:aspect-[800/368] lg:h-[367.998px] lg:w-[800px]">
                <img alt="RAHAT HASAN" className="absolute inset-0 block size-full max-w-none" src={imgRahatHasan} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 size-[8px] bg-[rgba(255,0,0,0.1)]" />
      </div>
    </section>
  );

  const rightsBar = (
    <div className="relative flex w-full items-center justify-center" style={{ height: RIGHTS_H }}>
      <p className="font-jakarta text-[13px] font-medium leading-[16px] tracking-[0.52px] text-grey">
        © {new Date().getFullYear()} Rahat Hasan — All rights reserved.
      </p>
    </div>
  );

  // ===================== COMPACT (About page) =====================
  if (compact) {
    return (
      <div ref={containerRef} className="relative bg-[#12110d]" style={{ height: `calc(${COMPACT_BODY_H} + ${RIGHTS_H}px)` }} data-name="Footer">
        {/* black bridge space — the cal widget's upper half lives here */}
        <div style={{ height: COMPACT_TOP_SPACE }} />
        {bottomSection}
        {rightsBar}

        {/* grid lines — the page's inner rails (188 / 1250) bridge down to the
            gradient, then the full footer grid (0/360/720/1080/1440) runs the
            rest of the way, matching the homepage footer. Desktop only: these
            are 1440-wide blocks, so on a phone they land at arbitrary columns,
            and the mobile frames carry no rails anyway. */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-10 w-full max-w-[1440px] -translate-x-1/2 max-lg:hidden" style={{ height: COMPACT_TOP_SPACE }}>
          <span className="absolute top-0 h-full w-px" style={{ left: 188, ...dashGrad(0.2) }} />
          <span className="absolute top-0 h-full w-px" style={{ left: 1250, ...dashGrad(0.2) }} />
        </div>
        <div className="pointer-events-none absolute left-1/2 top-0 z-10 w-full max-w-[1440px] -translate-x-1/2 max-lg:hidden" style={{ height: COMPACT_BODY_H }}>
          <span className="absolute inset-y-0 left-0 w-px bg-white/40" />
          <span className="absolute inset-y-0 w-px" style={{ left: 360, ...dashGrad(0.2) }} />
          <span className="absolute inset-y-0 w-px" style={{ left: 720, ...dashGrad(0.1) }} />
          <span className="absolute inset-y-0 w-px" style={{ left: 1080, ...dashGrad(0.2) }} />
          <span className="absolute inset-y-0 right-0 w-px bg-white/40" />
        </div>

        {calWidget(COMPACT_CAL_TOP)}
      </div>
    );
  }

  // ===================== FULL (homepage) =====================
  return (
    <div
      ref={containerRef}
      className="relative bg-[#12110d]"
      style={{ height: `calc(var(--footer-h) + ${RIGHTS_H}px)` }}
      data-name="Footer"
    >
      {/* ===== TOP SECTION: Building Better Experiences (independent, black) ===== */}
      <section className="footer-top relative w-full" style={{ height: "var(--footer-top-h)" }} data-section="top">
        {/* mouse-reactive hex background */}
        <HexGrid />
      </section>

      {/* ===== BOTTOM SECTION: Main Footer (independent, dark red gradient) ===== */}
      {bottomSection}

      {/* ===== ALL RIGHTS RESERVED ===== */}
      {rightsBar}

      {/* ===== GRID LINES: full page grid, crisp CSS so the rails stay visible all
          the way down (the Figma SVG faded its dashed lines out toward the bottom).
          Desktop: solid outer 0/1440 + dashed 360/720/1080 — matches the Hero grid.
          The mobile frames carry no rails. ===== */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-10 w-full max-w-[1440px] -translate-x-1/2 max-lg:hidden"
        style={{ height: "var(--footer-h)" }}
      >
        <span className="absolute inset-y-0 left-0 w-px bg-white/40" />
        <span className="absolute inset-y-0 w-px" style={{ left: 360, ...dashGrad(0.2) }} />
        <span className="absolute inset-y-0 w-px" style={{ left: 720, ...dashGrad(0.1) }} />
        <span className="absolute inset-y-0 w-px" style={{ left: 1080, ...dashGrad(0.2) }} />
        <span className="absolute inset-y-0 right-0 w-px bg-white/40" />
      </div>

      {/* ===== TOP CONTENT: heading + expertise grid + description ===== */}
      <div className="absolute left-1/2 top-[200px] z-20 flex w-full max-w-[1400px] -translate-x-1/2 flex-col items-center gutter max-lg:top-[48px] lg:px-0">
        <div className="relative flex w-full shrink-0 items-start justify-between max-lg:flex-col max-lg:gap-[48px]">
          {/* desktop wraps naturally in its 455px column; the mobile frame
              (623:611) breaks it explicitly onto three 40px lines */}
          <p className="footer-fade font-serif-display text-h2 relative shrink-0 not-italic tracking-[2.88px] text-white max-lg:w-full max-lg:text-[32px] max-lg:leading-[40px] max-lg:tracking-[1.28px] lg:w-[455px] [word-break:break-word]">
            <span className="max-lg:block">Building </span>
            <span className="max-lg:block">Better </span>
            <span className="max-lg:block">Experiences</span>
          </p>
          <div className="relative flex shrink-0 flex-col items-start gap-[40px] max-lg:w-full max-lg:gap-[31px] lg:w-[864px]">
            {/* on mobile every row is wider than the phone (576–739 at 96px
                tiles), so each row drifts as its own ticker inside a full-bleed
                strip. overflow-x:clip (not hidden) keeps the y axis visible so a
                held bubble's helper pills can still escape above and below. */}
            <div className="relative w-full shrink-0 max-lg:-mx-[20px] max-lg:w-[calc(100%+40px)] max-lg:[overflow-x:clip] max-lg:[overflow-y:visible] max-lg:px-[20px]">
              <div className="skills-grid relative flex shrink-0 flex-col items-start max-lg:w-full max-lg:gap-[8px] lg:w-full">
                <BubbleRow labels={ROW_A1} index={0} />
                <BubbleRow labels={ROW_A2} index={1} />
                <BubbleRow labels={ROW_B} index={2} className="h-[69px] max-lg:h-[61px]" bubble={{ size: "h-full", radius: "rounded-[40px]", showPills: false }} />
                <BubbleRow labels={ROW_C} index={3} />
              </div>
            </div>
            <p className="footer-fade font-jakarta relative w-full shrink-0 text-[20px] font-medium leading-[24px] tracking-[0.8px] text-grey max-lg:text-[16px] max-lg:tracking-[0.64px] [word-break:break-word]">
              {"I believe UX is not about making interfaces look better. It's about helping people achieve their goals with less effort, less confusion, and greater confidence. Every project is an opportunity to understand human behavior, challenge assumptions, and create meaningful product experiences."}
            </p>
          </div>
        </div>
      </div>

      {/* ===== CAL.COM WIDGET: floating bridge across the section boundary ===== */}
      {calWidget("var(--footer-cal-top)")}
    </div>
  );
}
