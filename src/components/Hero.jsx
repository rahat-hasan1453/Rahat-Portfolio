import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HexGrid from "./HexGrid.jsx";
import HeroDotPortrait from "./HeroDotPortrait.jsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const imgPortrait = "/assets/hero-portrait.png";
const imgRectangle10 = "/assets/9968fb9396a3e91e66388b046266dfaa2cc3b597.png";
const imgFrame71 = "/assets/491e854ca3659a4c78c80564001a653f9d1ae089.png";
const imgAvatar = "/assets/3bc4ade8f1fdaf67a5e466972e77f4465f7121f1.png";
const imgLines = "/assets/08c740b47b066a09ddc1385b453b9a2d1b0875a9.svg";
const imgCheckShield = "/assets/85606e1a5cc7d31c57d63b426903b94b6fdff486.svg";
const imgSelise = "/assets/1d2fe36f23a36b8326d2f7597e1da82fe59f8153.svg";

const imgDribbbleCard = "/assets/418e158f7d6fcd7cd799ffbbb2daafaddad58e6e.png";
const imgBehContent = "/assets/a0b96388bfdceb1a49c3b7f2e58faa8cb215a550.png";
const imgBehBanner = "/assets/a9a8c6aa64167329cc3afc1ed619b52ae6b6bf66.png";
const imgBehAvatar = "/assets/17eee65ab5144a5372dc9f0f5f42f25a4f9343f4.png";

const easeOut = [0.16, 1, 0.3, 1];

function LinkedInCard() {
  return (
    <div className="relative flex w-full flex-col items-center rounded-[20px] bg-white pb-[15.931px]">
      <div className="relative mb-[-12.744px] aspect-[4096/1031] w-full shrink-0 rounded-tl-[15.931px] rounded-tr-[15.931px]">
        <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-tl-[15.931px] rounded-tr-[15.931px] object-cover" src={imgFrame71} />
      </div>
      <div className="relative flex w-[151.34px] shrink-0 flex-col items-start gap-[7.965px]">
        <div className="relative size-[58.943px] shrink-0">
          <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={imgAvatar} />
        </div>
        <div className="relative flex w-full shrink-0 flex-col items-start gap-[12.744px]">
          <div className="relative flex w-full shrink-0 flex-col items-start gap-[4.779px]">
            <div className="relative flex w-full shrink-0 items-center gap-[4.779px]">
              <p className="relative shrink-0 whitespace-nowrap font-['Inter'] text-[14.61px] font-semibold not-italic leading-[16.068px] tracking-[0.5844px] text-[#282828] [word-break:break-word]">
                Rahat Hasan
              </p>
              <div className="relative size-[12.744px] shrink-0">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgCheckShield} />
              </div>
            </div>
            <div className="relative flex w-full shrink-0 flex-col items-start gap-[3.186px] font-['Inter'] text-[9.56px] font-normal not-italic tracking-[0.3824px] text-[#282828] [word-break:break-word]">
              <p className="relative h-[24.692px] w-full shrink-0 overflow-hidden text-ellipsis leading-[12.744px]">
                {"UX Engineer @Selise Digital Plaform | Problem Solving | AIUX | Storytelling "}
              </p>
              <p className="relative w-full shrink-0 leading-[9.558px]">Dhaka</p>
            </div>
          </div>
          <div className="relative flex shrink-0 items-center gap-[5.576px]">
            <div className="relative h-[7.965px] w-[19.117px] shrink-0">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgSelise} />
            </div>
            <p className="relative shrink-0 whitespace-nowrap font-['Inter'] text-[9.56px] font-semibold not-italic leading-[11.151px] tracking-[0.3824px] text-[#282828] [word-break:break-word]">
              SELISE Group
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Figma 342:2576 — the profile screenshot split into two rounded slots
function DribbbleCard() {
  return (
    <div className="relative flex h-full w-full flex-col items-start">
      <div className="relative h-[43.67%] w-full shrink-0 rounded-tl-[20px] rounded-tr-[20px]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-tl-[20px] rounded-tr-[20px]">
          <img alt="" className="absolute left-[-0.65%] top-0 h-[266.36%] w-[101.3%] max-w-none" src={imgDribbbleCard} />
        </div>
      </div>
      <div className="relative h-[56.33%] w-full shrink-0 rounded-bl-[20px] rounded-br-[20px]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-bl-[20px] rounded-br-[20px]">
          <img alt="" className="absolute left-[-0.65%] top-[-105.8%] h-[206.52%] w-[101.3%] max-w-none" src={imgDribbbleCard} />
        </div>
      </div>
    </div>
  );
}

// Figma 342:2637 — white card, banner quote, content shot, avatar
function BehanceCard() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 rounded-[20px] bg-white" />
      <div className="absolute left-0 top-[30.9%] h-[57.96%] w-full rounded-[20px]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[20px]">
          <img alt="" className="absolute left-[-0.6%] top-[-135.76%] h-[235.76%] w-[220.15%] max-w-none" src={imgBehContent} />
        </div>
      </div>
      <div className="absolute left-0 top-0 h-[23.67%] w-full rounded-[20px]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[20px]">
          <img alt="" className="absolute left-[-18.9%] top-0 h-full w-[136.02%] max-w-none" src={imgBehBanner} />
        </div>
      </div>
      <div className="absolute left-[6.86%] top-[12.35%] aspect-square w-[21.4%] rounded-[20px]">
        <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[20px] object-cover" src={imgBehAvatar} />
      </div>
    </div>
  );
}

const SOCIAL_CARDS = [
  { id: "linkedin", name: "LinkedIn", url: "https://www.linkedin.com/in/rahatuxd/", Card: LinkedInCard },
  { id: "dribbble", name: "Dribbble", url: "https://dribbble.com/R1453", Card: DribbbleCard },
  { id: "behance", name: "Behance", url: "https://www.behance.net/rahat1453", Card: BehanceCard },
];

function SocialCardRotator() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % SOCIAL_CARDS.length), 4000);
    return () => clearInterval(id);
  }, []);

  const { name, url, Card } = SOCIAL_CARDS[idx];

  const open = () => {
    if (window.confirm(`Open my ${name} profile in a new tab?`)) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      onClick={open}
      role="link"
      aria-label={`Visit my ${name} profile`}
      data-name="Social Connent"
      className="relative h-[195.149px] w-[171.253px] shrink-0 cursor-pointer overflow-hidden rounded-[20px] transition-transform duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.1]"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={idx}
          initial={{ x: "112%", rotate: 5 }}
          animate={{ x: 0, rotate: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ x: "-55%", opacity: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
          className="absolute inset-0"
        >
          <Card />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);

  // zarcerog.com-style headline split: as the hero scrolls away the top block
  // flies up-left fast while the accent line lags, drifting down-right —
  // scrubbed to scroll position (ratios measured from the reference site)
  useGSAP(
    () => {
      const st = {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      gsap.to(".hero-split-fast", {
        yPercent: -86,
        xPercent: -7,
        rotation: -1.7,
        ease: "none",
        scrollTrigger: st,
      });
      gsap.to(".hero-split-lag", {
        yPercent: 11.5,
        xPercent: 4.6,
        rotation: 1.15,
        ease: "none",
        scrollTrigger: { ...st },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-ink relative h-[1099px] overflow-hidden" data-name="Hero Section">
      {/* mouse-reactive hex-code background (fin.com style, accent red) */}
      <HexGrid />

      {/* vertical grid lines */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-[4] h-[1099px] w-[1440px] -translate-x-1/2">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgLines} />
      </div>

      {/* bottom gradient band */}
      <div className="absolute left-0 top-[815px] z-[2] h-[284px] w-full">
        <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={imgRectangle10} />
      </div>

      {/* right-side interactive halftone portrait (dragonfly-style, reacts to the cursor) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
        className="absolute bottom-0 right-0 z-[3] h-[920px] w-[920px]"
      >
        <HeroDotPortrait src={imgPortrait} className="size-full" />
      </motion.div>

      {/* main content — top offset gives a 120px gap below the nav bar (menu pill bottom is at 114px) */}
      <div className="absolute left-1/2 top-[234px] z-[5] flex h-[837px] w-[1440px] -translate-x-1/2 flex-col items-end gap-[16px] px-[20px]">
        <div className="flex w-full shrink-0 flex-col items-start gap-[40px]">
          <h1 className="font-serif-display relative w-[790px] whitespace-pre-wrap text-white not-italic tracking-[3.36px] [word-break:break-word]">
            {/* GSAP animates these wrappers so it never fights framer-motion's entry tweens */}
            <span className="hero-split-fast block will-change-transform">
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: easeOut, delay: 0.1 }}
                className="block text-[84px] leading-[92px]"
              >
                Designing Solutions
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: easeOut, delay: 0.25 }}
                className="block text-[84px] leading-[92px]"
              >
                {"to Complex Problems Through Seamless "}
              </motion.span>
            </span>
            <span className="hero-split-lag block will-change-transform">
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: easeOut, delay: 0.4 }}
                className="font-serif-display-it accent-gradient-text block text-[84px] italic leading-[94px]"
              >
                User Experiences
              </motion.span>
            </span>
          </h1>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeOut, delay: 0.8 }}
          className="mt-auto flex w-full shrink-0 items-end gap-[48px]"
        >
          <div className="flex w-[134px] shrink-0 flex-col items-start">
            <div className="flex w-full shrink-0 items-center gap-[8px]">
              <div className="flex flex-row items-center self-stretch">
                <div className="accent-gradient h-full w-[2px] shrink-0 rounded-[1px]" />
              </div>
              <div className="flex shrink-0 flex-col items-start justify-center">
                <div className="font-jakarta relative shrink-0 whitespace-nowrap text-[16px] font-normal text-white [word-break:break-word]">
                  <p className="mb-0 leading-[normal]">Based on Dhaka,</p>
                  <p className="leading-[normal]">{"Bangladesh "}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex min-w-px flex-[1_0_0] flex-col items-end justify-end gap-[20px]">
            <p className="font-jakarta relative w-[200px] shrink-0 text-right text-[20px] font-medium leading-[24px] tracking-[0.8px] text-white [word-break:break-word]">
              Great design connects people, thrives on collaboration, and inspires deep emotion
            </p>
            {/* rotating social profile card: LinkedIn → Dribbble → Behance */}
            <SocialCardRotator />
          </div>
        </motion.div>
      </div>

    </section>
  );
}
