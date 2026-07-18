import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const imgR = "/assets/cbb187227f4bec065dffe6c01f5b5bdd32d0a6d7.svg";
const imgRahat = "/assets/5301fa311a870db099fe947753b34031bfabbe73.svg";
const imgHasan = "/assets/478e1dd67bd00188b6eae2732b236f26ec4ce059.svg";
const imgStroke = "/assets/4810459511c98cd60e1a92ccdaadcca3b6fac2c1.svg";
const imgDesigner = "/assets/36e5ca754e23998117ff47ea19176591e1c4b9c1.svg";
const imgMenuIcon = "/assets/72b8b16601eac87f7c8802bae5aeefff03704aa0.svg";
const imgClose = "/assets/8d3e866298728539e5e53c49774582e700852597.svg";
const imgDownload = "/assets/5577a3e9db39c3347b529a08ca5548f7824636d0.svg";
const imgTicker1 = "/assets/b0268a05f3a7b17aadbff2a77bd6a3df17ae5daa.png";
const imgTicker2 = "/assets/b7e9e82c1a767a3f562634efe8b970b38a952d59.png";
const imgTicker3 = "/assets/7420f9bd8ab0e7cb2faf1e8f3297c1719f49204f.png";
const imgTickerMetro = "/assets/bf6e07a7c2c0d1b3324cf94624a8454cb84c6b0d.png";
const imgTickerCalendar = "/assets/b815200441007cae19fe209e699ac4e8f2481020.png";
const imgTickerVoid = "/assets/5b7d0ae6d4a1055465bb974756e8c4fa70f10d5e.png";
const imgBehance = "/assets/9d82d42f529b8d410122178c2f87af95a07946d8.png";
const imgDribbble = "/assets/ecbf82107b5177abac6ac42ec522b4f9517ae736.png";
const imgFacebook = "/assets/b20ff74680c1777cd637c251a1599cdb8723494f.png";
const imgLinkedin = "/assets/linkedin-badge.svg";
const RESUME_URL = "https://drive.google.com/drive/u/1/folders/1hKz5hsgXcRb_BI7GzRs6LpTlTkAFoWGz";

// quantumflux.framer.ai-style expo-out ease
const easeShuttle = [0.22, 1, 0.36, 1];
const PILL_H = 56;

// ticker strip, h 88 — every image unique (no duplicates)
const TICKER = [
  { src: imgTicker1, w: 73 },
  { src: imgTicker2, w: 74 },
  { src: imgTicker3, w: 73 },
  { src: imgTickerMetro, w: 140 },
  { src: imgTickerCalendar, w: 140 },
  { src: imgTickerVoid, w: 140 },
];

const SOCIALS = [
  { src: imgBehance, label: "Behance", href: "https://www.behance.net/rahat1453" },
  { src: imgDribbble, label: "Dribbble", href: "https://dribbble.com/R1453" },
  { src: imgFacebook, label: "Facebook", href: null },
  { src: imgLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/rahatuxd/" },
];

// dash 10 / gap 10 hairline border — CSS border-dashed can't express this pattern
function DashedBorder({ radius = 4 }) {
  return (
    <svg className="pointer-events-none absolute inset-0 size-full" aria-hidden="true">
      <rect
        x="0.5"
        y="0.5"
        rx={radius}
        ry={radius}
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
        strokeDasharray="10 10"
        style={{ width: "calc(100% - 1px)", height: "calc(100% - 1px)" }}
      />
    </svg>
  );
}

// a different design quote shows every time the menu opens
const QUOTES = [
  { text: "Be an amateur, that’s all any of us are: We didn’t live long enough to be anything else.", author: "Sir Charles Spencer Chaplin" },
  { text: "Design is not just what it looks like. Design is how it works.", author: "Steve Jobs" },
  { text: "Good design is obvious. Great design is transparent.", author: "Joe Sparano" },
  { text: "People ignore design that ignores people.", author: "Frank Chimero" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "Design is intelligence made visible.", author: "Alina Wheeler" },
  { text: "Styles come and go. Good design is a language, not a style.", author: "Massimo Vignelli" },
  { text: "Make it simple, but significant.", author: "Don Draper" },
  { text: "Design creates culture. Culture shapes values. Values determine the future.", author: "Robert L. Peters" },
  { text: "Whitespace is like air: it is necessary for design to breathe.", author: "Wojciech Zieliński" },
];

// analog clock showing the visitor's local time
function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const C = 68.5; // center of the 137px dial
  const hourDeg = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5;
  const minDeg = now.getMinutes() * 6 + now.getSeconds() * 0.1;
  const secDeg = now.getSeconds() * 6;

  const offsetMin = -now.getTimezoneOffset();
  const sign = offsetMin >= 0 ? "+" : "-";
  const absMin = Math.abs(offsetMin);
  const utcLabel = `UTC${sign}${Math.floor(absMin / 60)}${absMin % 60 ? ":" + String(absMin % 60).padStart(2, "0") : ""}`;

  return (
    <>
      <svg className="relative size-[137px] shrink-0" viewBox="0 0 137 137" aria-label={`Local time ${now.toLocaleTimeString()}`}>
        {/* tick marks */}
        {Array.from({ length: 60 }, (_, i) => {
          const major = i % 5 === 0;
          return (
            <line
              key={i}
              x1={C}
              y1={major ? 4 : 8}
              x2={C}
              y2={major ? 14 : 12}
              stroke="#ffffff"
              strokeOpacity={major ? 1 : 0.45}
              strokeWidth={major ? 2 : 1}
              strokeLinecap="round"
              transform={`rotate(${i * 6} ${C} ${C})`}
            />
          );
        })}
        {/* hands */}
        <line x1={C} y1={C} x2={C} y2={C - 32} stroke="#ffffff" strokeWidth="4" strokeLinecap="round" transform={`rotate(${hourDeg} ${C} ${C})`} />
        <line x1={C} y1={C} x2={C} y2={C - 48} stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${minDeg} ${C} ${C})`} />
        <line x1={C} y1={C + 8} x2={C} y2={C - 52} stroke="#f16767" strokeWidth="1" strokeLinecap="round" transform={`rotate(${secDeg} ${C} ${C})`} />
        {/* center hub */}
        <circle cx={C} cy={C} r="5" fill="#ffffff" />
        <circle cx={C} cy={C} r="2" fill="#12110d" />
      </svg>
      <p className="font-urbanist relative w-full shrink-0 text-center text-[12px] font-medium leading-[1.3] text-grey">{utcLabel}</p>
    </>
  );
}

function TickerSet() {
  return (
    <div className="flex shrink-0 items-center">
      {TICKER.map((img, i) => (
        <div key={i} className="relative h-[88px] shrink-0" style={{ width: img.w }}>
          <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={img.src} />
        </div>
      ))}
    </div>
  );
}

function Brand() {
  return (
    <div className="relative flex shrink-0 items-center gap-[8px]">
      {/* logo badge — hover shuttles the r. glyph out the top, back in from below; click goes home */}
      <div
        onClick={() => {
          window.location.hash = "";
          setTimeout(() => window.__lenis?.scrollTo(0, { immediate: true }), 50);
        }}
        className="group relative size-[36px] shrink-0 cursor-pointer overflow-hidden rounded-[8px]"
      >
        <div className="absolute inset-0 rounded-[8px] bg-gradient-to-l from-[#f16767] to-[red] backdrop-blur-[21.7px]" />
        <div className="absolute inset-[22%_20.11%_23%_21%] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[250%]">
          <img alt="r." className="absolute inset-0 block size-full max-w-none" src={imgR} />
        </div>
        <div className="absolute inset-[22%_20.11%_23%_21%] translate-y-[250%] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgR} />
        </div>
      </div>
      <div className="relative flex shrink-0 items-end gap-[2.747px]">
        <div className="relative flex w-[39.714px] shrink-0 flex-col items-start gap-[3.434px]">
          <div className="relative h-[11.07px] w-[36.944px] shrink-0">
            <img alt="Rahat" className="absolute inset-0 block size-full max-w-none" src={imgRahat} />
          </div>
          <div className="relative h-[10.7px] w-[39.714px] shrink-0">
            <img alt="Hasan" className="absolute inset-0 block size-full max-w-none" src={imgHasan} />
          </div>
        </div>
        <div className="relative h-[0.687px] w-[15.795px] shrink-0">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgStroke} />
        </div>
        <div className="relative h-[10.316px] w-[107.737px] shrink-0">
          <img alt="digital product designer" className="absolute inset-0 block size-full max-w-none" src={imgDesigner} />
        </div>
      </div>
    </div>
  );
}

export default function Menu() {
  const [open, setOpen] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const tickerRef = useRef(null);
  const rootRef = useRef(null);

  const openMenu = () => {
    // always land on a different quote than last time
    setQuoteIdx((prev) => {
      let next;
      do {
        next = Math.floor(Math.random() * QUOTES.length);
      } while (next === prev);
      return next;
    });
    setOpen(true);
  };

  // ticker runs continuously; it's simply clipped away while the menu is closed
  useGSAP(
    () => {
      gsap.to(tickerRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 32,
        repeat: -1,
      });
    },
    { scope: rootRef }
  );

  const scrollTo = (selector) => {
    const doScroll = () => {
      const el = document.querySelector(selector);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY;
      if (window.__lenis) window.__lenis.scrollTo(y);
      else window.scrollTo({ top: y, behavior: "smooth" });
    };
    // leave the case-studies page first, then scroll once home has mounted
    if (window.location.hash === "#case-studies") {
      window.location.hash = "";
      setTimeout(doScroll, 400);
    } else {
      doScroll();
    }
    setOpen(false);
  };

  const openCaseStudies = () => {
    window.location.hash = "case-studies";
    setOpen(false);
  };

  const boxTransition = { duration: open ? 0.65 : 0.5, ease: easeShuttle };

  return (
    <div ref={rootRef} data-name="Menu">
      {/* blurred scrim behind the open menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[90]"
            style={{
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              background: "rgba(18,17,13,0.35)",
            }}
          />
        )}
      </AnimatePresence>

      <div className="fixed left-1/2 top-[24px] z-[100] w-[360px] -translate-x-1/2">
        {/* main box — height shuttles between pill (56) and full panel */}
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : PILL_H }}
          transition={boxTransition}
          className="relative w-full overflow-clip rounded-[16px] bg-[#2C2A26]"
        >
          <DashedBorder radius={16} />
          <motion.div
            initial={false}
            animate={{
              paddingTop: open ? 24 : 10,
              paddingBottom: open ? 24 : 10,
              paddingLeft: open ? 24 : 10,
              paddingRight: open ? 24 : 10,
            }}
            transition={boxTransition}
            className="flex w-full flex-col items-start"
          >
            {/* header row */}
            <div className="relative flex h-[36px] w-full shrink-0 items-center justify-between">
              <Brand />
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => (open ? setOpen(false) : openMenu())}
                className="relative flex h-[24px] shrink-0 cursor-pointer items-center justify-end transition-opacity duration-300 hover:opacity-60"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {open ? (
                    <motion.span
                      key="x"
                      initial={{ opacity: 0, rotate: -45 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 45 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="relative block size-[24px]"
                    >
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgClose} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="relative flex items-center gap-[8px]"
                    >
                      <p className="font-jakarta relative shrink-0 whitespace-nowrap text-[16px] font-medium leading-[24px] tracking-[0.64px] text-white [word-break:break-word]">
                        Menu
                      </p>
                      <span className="relative block size-[24px] shrink-0">
                        <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgMenuIcon} />
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* body — always mounted, crossfaded; clipping does the rest */}
            <motion.div
              initial={false}
              animate={{ opacity: open ? 1 : 0, y: open ? 0 : -10 }}
              transition={{ duration: open ? 0.5 : 0.3, ease: easeShuttle, delay: open ? 0.12 : 0 }}
              className="relative w-full"
              aria-hidden={!open}
            >
              {/* image ticker — Figma gap 10 below header */}
              <div className="relative mt-[10px] w-full overflow-hidden">
                <div ref={tickerRef} className="flex w-max items-center">
                  <TickerSet />
                  <TickerSet />
                </div>
              </div>

              {/* nav links */}
              <div className="relative mt-[32px] flex flex-col items-start gap-[12px]">
                <button
                  type="button"
                  tabIndex={open ? 0 : -1}
                  onClick={() => {
                    window.location.hash = "about";
                    setOpen(false);
                  }}
                  className="font-jakarta relative shrink-0 cursor-pointer whitespace-nowrap text-[20px] font-medium leading-[24px] tracking-[0.8px] text-[#f0ebdb] transition-all duration-300 [word-break:break-word] hover:translate-x-[4px] hover:text-[#f16767]"
                >
                  About
                </button>
                <button
                  type="button"
                  tabIndex={open ? 0 : -1}
                  onClick={openCaseStudies}
                  className="font-jakarta relative shrink-0 cursor-pointer whitespace-nowrap text-[20px] font-medium leading-[24px] tracking-[0.8px] text-[#f0ebdb] transition-all duration-300 [word-break:break-word] hover:translate-x-[4px] hover:text-[#f16767]"
                >
                  Case Studies
                </button>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  tabIndex={open ? 0 : -1}
                  className="group/resume relative flex shrink-0 cursor-pointer items-start gap-[8px] transition-transform duration-300 hover:translate-x-[4px]"
                >
                  <p className="font-jakarta relative shrink-0 whitespace-nowrap text-[20px] font-medium leading-[24px] tracking-[0.8px] text-[#f0ebdb] transition-colors duration-300 [word-break:break-word] group-hover/resume:text-[#f16767]">
                    Resume
                  </p>
                  <span
                    aria-hidden="true"
                    className="relative block size-[24px] shrink-0 bg-[#f0ebdb] transition-[background-color,transform] duration-300 group-hover/resume:translate-y-[2px] group-hover/resume:bg-[#f16767]"
                    style={{
                      maskImage: `url("${imgDownload}")`,
                      WebkitMaskImage: `url("${imgDownload}")`,
                      maskSize: "24px 24px",
                      WebkitMaskSize: "24px 24px",
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                    }}
                  />
                </a>
              </div>

              {/* socials */}
              <div className="relative mt-[20px] flex h-[40px] w-full items-center justify-center gap-[39px]">
                {SOCIALS.map((s) =>
                  s.href ? (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={s.label}
                      tabIndex={open ? 0 : -1}
                      className="relative size-[40px] shrink-0 cursor-pointer overflow-clip transition-transform duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:scale-110"
                    >
                      <img alt={s.label} className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={s.src} />
                    </a>
                  ) : (
                    <div
                      key={s.label}
                      className="relative size-[40px] shrink-0 cursor-pointer overflow-clip transition-transform duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:scale-110"
                    >
                      <img alt={s.label} className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={s.src} />
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* bottom cards — clock + quote */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="cards"
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: easeShuttle, delay: 0.22 } }}
              exit={{ opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.25, ease: "easeIn" } }}
              className="relative mt-[8px] flex w-full items-stretch gap-[8px]"
            >
              <div className="relative flex min-h-[170px] min-w-px flex-[1_0_0] flex-col items-center justify-center gap-[8px] rounded-[16px] bg-[#2C2A26] p-[8px]">
                <Clock />
              </div>
              <div className="relative flex min-h-[170px] min-w-px flex-[1_0_0] flex-col items-start overflow-hidden rounded-[16px] bg-[#2C2A26] p-[16px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={quoteIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: easeShuttle }}
                    className="relative flex w-full flex-1 flex-col items-start justify-between gap-[16px] font-medium [word-break:break-word]"
                  >
                    <p className="font-jakarta relative w-full shrink-0 text-[16px] font-normal leading-[19px] tracking-[0.56px] text-white">
                      {QUOTES[quoteIdx].text}
                    </p>
                    <div className="font-urbanist relative w-full shrink-0 whitespace-pre-wrap text-[14px] text-grey">
                      <p className="mb-0 leading-[1.3]">{"_ "}</p>
                      <p className="leading-[1.3]">{QUOTES[quoteIdx].author}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
