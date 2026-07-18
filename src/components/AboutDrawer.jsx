import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Figma 364:301 — About Me drawer (macOS-style window, 1148 wide)
const imgArrowRight = "/assets/70874b8909d981ba2def171ea7d80b7f74849036.svg";
const imgPortraitA = "/assets/358ef12f7872aa78ea6da1caedac7cd388e21bdf.png";
const imgPortraitB = "/assets/1343981533bfec0aaa59a2166abbcce5317934ec.png";
const imgPortraitC = "/assets/decfb971c6d641c9ccb852271bc0b630c000cdc2.png";
const imgSeliseLogo = "/assets/2a73fd975f54882e2557f8c4cb28341665d7c2d1.svg";
const imgP2mMask = "/assets/2e741a7692d0c03769404c3764e753345c035d36.png";
const imgTechplatoMask = "/assets/8bb56a35150ab76fef912e8c2b0cd3470d89e880.png";
const imgUnisoftLogo = "/assets/fef1e77a9f503337489b75559d15e3efe915c860.svg";
const imgStripA = "/assets/bf6e07a7c2c0d1b3324cf94624a8454cb84c6b0d.png";
const imgStripB = "/assets/b815200441007cae19fe209e699ac4e8f2481020.png";
const imgStripC = "/assets/5b7d0ae6d4a1055465bb974756e8c4fa70f10d5e.png";

const easeShuttle = [0.22, 1, 0.36, 1];

const ABOUT_TEXT =
  "Hello, I’m Rahat — a product-minded designer with nearly 4 years of experience, currently a UX Engineer at Selise Digital Platform. I've grown into a product-focused role, taking end-to-end ownership — from discovery to delivery — collaborating with international stakeholders to turn business goals into meaningful digital experiences.";

const PORTRAITS = [imgPortraitA, imgPortraitB, imgPortraitC];

const EXPERIENCE = [
  {
    company: "Selise Digital Platform",
    url: "https://selisegroup.com",
    role: "UX Engineer",
    period: "Aug’25 - Present",
    logo: <img alt="" className="block h-[24px] w-[56px] max-w-none" src={imgSeliseLogo} />,
  },
  {
    company: "Project 2morrow Software Ltd.",
    url: "https://project2morrow.com",
    role: "Associate UX Designer",
    period: "May’24 - Aug’25",
    logo: (
      <div
        className="h-[24px] w-[94.342px] bg-white"
        style={{
          maskImage: `url("${imgP2mMask}")`,
          WebkitMaskImage: `url("${imgP2mMask}")`,
          maskSize: "94.342px 24px",
          WebkitMaskSize: "94.342px 24px",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />
    ),
  },
  {
    company: "Techplato.inc",
    url: "https://techplato.com",
    role: "UI Designer",
    period: "Sep’23 - May’24",
    logo: (
      <div
        className="h-[20px] w-[88px] bg-white"
        style={{
          maskImage: `url("${imgTechplatoMask}")`,
          WebkitMaskImage: `url("${imgTechplatoMask}")`,
          maskSize: "88px 20px",
          WebkitMaskSize: "88px 20px",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />
    ),
  },
  {
    company: "Unisoft Business Solution LTD.",
    url: "https://unisoft.com.bd",
    role: "Jr. UI & Graphic Designer",
    period: "Jul ’22 - Sep’23",
    logo: <img alt="" className="block h-[40px] w-[51.922px] max-w-none" src={imgUnisoftLogo} />,
  },
];

// odometer digit — the 0-9 column rolls up (bottom → top) to its target
function RollingDigit({ digit, delay }) {
  const colRef = useRef(null);
  useEffect(() => {
    const tween = gsap.fromTo(
      colRef.current,
      { yPercent: 0 },
      { yPercent: -digit * 10, duration: 1.5, delay, ease: "expo.out" }
    );
    return () => tween.kill();
  }, [digit, delay]);
  return (
    <span className="inline-block h-[60px] overflow-hidden align-top">
      <span ref={colRef} className="block will-change-transform">
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} className="block h-[60px] leading-[60px]">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

function RollingNumber({ value, suffix = "+" }) {
  const digits = String(value).split("");
  return (
    <p className="font-serif-display relative flex w-full shrink-0 text-[48px] not-italic leading-[60px] tracking-[1.92px]">
      {digits.map((d, i) => (
        <RollingDigit key={i} digit={Number(d)} delay={0.55 + i * 0.12} />
      ))}
      <span className="inline-block h-[60px] leading-[60px]">{suffix}</span>
    </p>
  );
}

export default function AboutDrawer({ onClose }) {
  const panelRef = useRef(null);
  const leftColRef = useRef(null);
  const [maxed, setMaxed] = useState(false);
  const [slide, setSlide] = useState(0);

  // freeze the page behind the drawer
  useEffect(() => {
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, []);

  // portrait carousel — advances every 4s
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % PORTRAITS.length), 4000);
    return () => clearInterval(id);
  }, []);

  // homepage-style grey → white word reveal, scrubbed to the drawer's own scroll
  useGSAP(
    () => {
      gsap.to(".about-drawer-word", {
        color: "#ffffff",
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: ".about-drawer-copy",
          scroller: leftColRef.current,
          start: "top 60%",
          end: "bottom 30%",
          scrub: 0.5,
        },
      });
    },
    { scope: panelRef }
  );

  const goToCal = () => {
    onClose();
    // wait for the drawer's exit animation to finish (lenis restarts on unmount)
    setTimeout(() => {
      const el = document.querySelector(".cal-bridge");
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 120;
      if (window.__lenis) window.__lenis.scrollTo(y, { force: true });
      else window.scrollTo({ top: y, behavior: "smooth" });
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[110]" data-name="About Drawer">
      {/* scrim */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={onClose}
        className="absolute inset-0"
        style={{ background: "rgba(18,17,13,0.55)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
      />

      {/* window — slides up from the bottom like a drawer */}
      <motion.div
        ref={panelRef}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.65, ease: easeShuttle }}
        className={`absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col overflow-hidden rounded-tl-[24px] rounded-tr-[24px] transition-[width,height,max-height] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
          maxed ? "h-[100dvh] w-full" : "h-[906px] max-h-[calc(100dvh-24px)] w-[min(980px,96vw)]"
        }`}
      >
        {/* macOS title bar */}
        <div className="relative flex w-full shrink-0 items-center justify-between rounded-tl-[24px] rounded-tr-[24px] border-b border-solid border-[rgba(128,128,128,0.4)] bg-[#2c2a20] p-[16px]">
          {/* hovering the trio reveals the ×/−/+ glyphs, like macOS */}
          <div className="group/tl relative flex shrink-0 items-center gap-[11px]">
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="flex size-[16px] cursor-pointer items-center justify-center rounded-full border-[0.5px] border-solid border-[rgba(0,0,0,0.1)] bg-[#ff736a]"
            >
              <svg viewBox="0 0 8 8" className="size-[8px] opacity-0 transition-opacity duration-150 group-hover/tl:opacity-100" aria-hidden="true">
                <path d="M1 1 L7 7 M7 1 L1 7" stroke="rgba(77,0,0,0.7)" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Minimize"
              onClick={onClose}
              className="flex size-[16px] cursor-pointer items-center justify-center rounded-full border-[0.5px] border-solid border-[rgba(0,0,0,0.1)] bg-[#febc2e]"
            >
              <svg viewBox="0 0 8 8" className="size-[8px] opacity-0 transition-opacity duration-150 group-hover/tl:opacity-100" aria-hidden="true">
                <path d="M1 4 L7 4" stroke="rgba(100,60,0,0.7)" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Zoom"
              onClick={() => setMaxed((m) => !m)}
              className="flex size-[16px] cursor-pointer items-center justify-center rounded-full border-[0.5px] border-solid border-[rgba(0,0,0,0.1)] bg-[#19c332]"
            >
              <svg viewBox="0 0 8 8" className="size-[8px] opacity-0 transition-opacity duration-150 group-hover/tl:opacity-100" aria-hidden="true">
                <path d="M4 1 L4 7 M1 4 L7 4" stroke="rgba(0,70,0,0.7)" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <p className="font-jakarta relative shrink-0 whitespace-nowrap text-[14px] font-medium leading-[24px] tracking-[0.56px] text-white">
            rahat hasan
          </p>
          {/* ghost trio keeps the title optically centered */}
          <div className="relative flex shrink-0 items-center gap-[11px] opacity-0" aria-hidden="true">
            <div className="size-[16px] rounded-full bg-[#ff736a]" />
            <div className="size-[16px] rounded-full bg-[#febc2e]" />
            <div className="size-[16px] rounded-full bg-[#19c332]" />
          </div>
        </div>

        {/* window body — olive tone; the right card separates itself with a darker bg */}
        <div className="relative min-h-0 w-full flex-1 bg-[#2c2a20]">
          <div className="flex h-full w-full gap-[37px] py-[20px] pl-[40px] pr-[20px]">
            {/* (1) left column — the only scrollable region; scrollbar hidden.
                data-lenis-prevent keeps the (stopped) page scroller from eating wheel events */}
            <div
              ref={leftColRef}
              data-lenis-prevent
              className="relative w-[435px] shrink-0 overflow-y-auto overflow-x-clip [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="flex flex-col gap-[32px]">
                {/* Journey to Design */}
                <div className="flex flex-col items-start gap-[8px]">
                  <div className="font-serif-display-it accent-gradient-text text-[24px] italic leading-[32px] tracking-[0.96px]">
                    <p className="mb-0">{"Journey to "}</p>
                    <p>Design</p>
                  </div>
                  <p className="about-drawer-copy font-jakarta relative w-full text-[16px] font-medium leading-[24px] tracking-[0.8px] [word-break:break-word]">
                    {`${ABOUT_TEXT}${ABOUT_TEXT}`.split(" ").map((word, i) => (
                      <span key={i} className="about-drawer-word text-[#5f5f5f]">
                        {word}{" "}
                      </span>
                    ))}
                  </p>
                </div>

                {/* Work Experience */}
                <div className="flex flex-col items-start gap-[24px]">
                  <div className="font-serif-display-it accent-gradient-text text-[24px] italic leading-[32px] tracking-[0.96px]">
                    <p className="mb-0">Work</p>
                    <p>Experience</p>
                  </div>
                  <div className="flex w-full flex-col items-start gap-[16px]">
                    {EXPERIENCE.map((job, i) => (
                      <div key={job.company} className="w-full">
                        {i > 0 && <div className="mb-[16px] h-px w-full bg-[rgba(255,255,255,0.12)]" />}
                        <div className="flex w-full items-end">
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="group flex min-w-px flex-[1_0_0] cursor-pointer flex-col items-start gap-[8px]"
                          >
                            {job.logo}
                            <p className="font-serif-display min-w-full text-[16px] not-italic leading-[24px] tracking-[0.64px] text-white transition-colors duration-300 [word-break:break-word] group-hover:text-[#f16767]">
                              {job.company}
                            </p>
                          </a>
                          <div className="flex shrink-0 flex-col items-end gap-[5px] whitespace-nowrap text-[16px] tracking-[0.64px]">
                            <p className="font-serif-display not-italic leading-[24px] text-white">{job.role}</p>
                            <p className="font-jakarta font-medium leading-[24px] text-grey">{job.period}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* bottom image strip */}
                <div className="flex h-[289px] w-full shrink-0 gap-[8px] overflow-hidden rounded-[8px]">
                  {[imgStripA, imgStripB, imgStripC].map((src, i) => (
                    <div key={i} className="relative h-full min-w-px flex-[1_0_0] overflow-hidden rounded-[8px]">
                      <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={src} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* (2) right column — FIXED in place (no scroll); darker card separates it from the left */}
            <div className="flex h-full w-[448px] shrink-0 flex-col justify-between overflow-hidden rounded-[16px] bg-[rgba(18,17,13,0.55)] p-[20px]">
              <div className="flex w-full flex-col items-start gap-[20px]">
                {/* portrait carousel */}
                <div className="relative h-[427px] w-full shrink-0 overflow-hidden rounded-[20px] bg-[#1c1c1c]">
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={slide}
                      src={PORTRAITS[slide]}
                      alt="Rahat Hasan"
                      initial={{ x: "104%" }}
                      animate={{ x: 0, transition: { duration: 0.7, ease: easeShuttle } }}
                      exit={{ x: "-40%", opacity: 0, transition: { duration: 0.55, ease: easeShuttle } }}
                      className="absolute inset-0 size-full max-w-none rounded-[20px] object-cover"
                      draggable="false"
                    />
                  </AnimatePresence>
                  {/* dots */}
                  <div className="absolute bottom-[12px] left-1/2 z-10 flex -translate-x-1/2 items-center gap-[6px]">
                    {PORTRAITS.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Photo ${i + 1}`}
                        onClick={() => setSlide(i)}
                        className={`h-[6px] cursor-pointer rounded-full transition-all duration-300 ${
                          i === slide ? "w-[18px] bg-white" : "w-[6px] bg-[rgba(255,255,255,0.4)]"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* stats — numbers count up on open */}
                <div className="flex w-full items-start gap-[32px] text-white [word-break:break-word]">
                  <div className="flex min-w-px flex-[1_0_0] flex-col items-start">
                    <RollingNumber value={50} />
                    <div className="font-jakarta w-full text-[16px] font-medium tracking-[0.8px]">
                      <p className="mb-0 leading-[24px]">Successful</p>
                      <p className="leading-[24px]">Project</p>
                    </div>
                  </div>
                  <div className="flex min-w-px flex-[1_0_0] flex-col items-start">
                    <RollingNumber value={4} />
                    <p className="font-jakarta w-full text-[16px] font-medium leading-[24px] tracking-[0.8px]">Years of Expereience</p>
                  </div>
                </div>
              </div>

              {/* let's connect */}
              <div className="flex w-full flex-col items-start gap-[20px] pt-[24px]">
                <div className="flex flex-col items-start gap-[8px] [word-break:break-word]">
                  <p className="font-serif-display w-full text-[24px] not-italic leading-[40px] tracking-[1.28px] text-white">
                    Let’s Connect!
                  </p>
                  <p className="font-jakarta w-full text-[20px] font-medium leading-[24px] tracking-[0.8px] text-grey">
                    Make the User‘s journey happy
                  </p>
                </div>
                {/* contact — red gradient wipes in left → right on hover */}
                <button
                  type="button"
                  onClick={goToCal}
                  className="group relative flex cursor-pointer items-center gap-[16px] overflow-hidden rounded-[4px] px-[20px] py-[16px]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-l from-[#f16767] to-[red] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
                  <span className="font-serif-display relative z-10 whitespace-nowrap text-[20px] not-italic leading-[32px] tracking-[1.12px] text-white">
                    Contact
                  </span>
                  <span className="relative z-10 block size-[24px] shrink-0 transition-transform duration-300 group-hover:translate-x-[4px]">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgArrowRight} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
