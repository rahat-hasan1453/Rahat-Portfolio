import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HexGrid from "./HexGrid.jsx";
import { attachTickerFocus } from "../lib/tickerFocus.js";
import usePressHold from "../hooks/usePressHold.js";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const imgRectangle7 = "/assets/839d3a518763fdbf968a2a08c4073a1284670dcf.jpg";
const imgRectangle6 = "/assets/decfb971c6d641c9ccb852271bc0b630c000cdc2.jpg";
const imgRectangle5 = "/assets/29f89100346cab8bda091f83307e2d146c404f15.jpg";
const imgRectangle4 = "/assets/1343981533bfec0aaa59a2166abbcce5317934ec.jpg";
const imgLines = "/assets/40d20e30952fcf9fba67c9bf48e1c3c4aa24bb40.svg";

const ABOUT_TEXT =
  "Hello, I’m Rahat — a product-minded designer with nearly 4 years of experience, currently a UX Engineer at Selise Digital Platform. I've grown into a product-focused role, taking end-to-end ownership — from discovery to delivery — collaborating with international stakeholders to turn business goals into meaningful digital experiences.";

const TICKER_IMAGES = [
  { src: imgRectangle7, h: 282.989, cover: true },
  { src: imgRectangle6, h: 391.762, cover: true },
  { src: imgRectangle5, h: 282.989, cover: false },
  { src: imgRectangle4, h: 282.989, cover: true },
];

// hover lifts a frame to full opacity; on touch a press-and-hold does the same
function TickerFrame({ img }) {
  const { held, bind } = usePressHold();
  return (
    <div
      {...bind}
      data-held={held || undefined}
      className="ticker-cell relative h-(--h) w-[221.085px] shrink-0 rounded-[17.687px] opacity-40 hover:opacity-100 data-[held=true]:opacity-100"
      style={{ "--h": `${img.h}px` }}
    >
      {img.cover ? (
        <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[17.687px] object-cover" src={img.src} />
      ) : (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[17.687px]">
          <img alt="" className="absolute left-[-126.26%] top-[-0.02%] h-full w-[227.43%] max-w-none" src={img.src} />
        </div>
      )}
    </div>
  );
}

function TickerSet() {
  return (
    <div className="flex shrink-0 items-center gap-[17.687px] pr-[17.687px]">
      {TICKER_IMAGES.map((img, i) => (
        <TickerFrame key={i} img={img} />
      ))}
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const tickerRef = useRef(null);

  useGSAP(
    () => {
      // scroll-scrubbed grey → white word reveal
      gsap.to(".about-word", {
        color: "#ffffff",
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: ".about-copy",
          start: "top 80%",
          end: "bottom 45%",
          scrub: 0.5,
        },
      });

      // continuous right-to-left ticker
      gsap.to(tickerRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 28,
        repeat: -1,
      });

      // whichever frame is crossing the middle of the screen sits at full
      const detach = attachTickerFocus(".ticker-cell");
      // gsap.context reverts its own tweens; the ticker callback is ours
      return detach;
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-ink relative overflow-hidden max-lg:h-auto max-lg:pt-[45px] lg:h-[1309px]" data-name="About Section">
      {/* mouse-reactive hex background */}
      <HexGrid />

      {/* vertical grid lines — desktop only (the mobile frame 621:178 has none) */}
      <div className="absolute left-1/2 top-[-1px] h-[1311px] w-[1440px] -translate-x-1/2 max-lg:hidden">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgLines} />
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gutter max-lg:relative lg:absolute lg:left-1/2 lg:top-[46px] lg:h-[1264px] lg:-translate-x-1/2 lg:px-[37px] lg:pt-[100px]">
        {/* dashed hairline — same treatment as Logos section: dash 10 / gap 10, 10% opacity */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px max-lg:hidden"
          style={{ backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.1) 0 10px, transparent 10px 20px)" }}
        />
        <p className="about-copy font-serif-display relative w-full max-w-[832px] shrink-0 not-italic tracking-[1.92px] max-lg:tracking-[1.28px] [word-break:break-word]">
          {ABOUT_TEXT.split(" ").map((word, i) => (
            <span key={i} className="about-word text-lead text-[#5f5f5f] max-lg:text-[32px] max-lg:leading-[40px]">
              {word}{" "}
            </span>
          ))}
        </p>

        {/* tilted image ticker, scrolling right → left. Mobile (Figma 622:236)
            is the identical rail at 0.526×, still bleeding past both edges. */}
        <div className="relative flex w-full shrink-0 items-center justify-center max-lg:mt-[43.6px] max-lg:h-[267.5px] lg:mt-[32px] lg:h-[508.483px] lg:w-[1022.144px]">
          <div className="-rotate-7 flex-none max-lg:scale-[0.526]">
            <div className="relative w-[981.717px] overflow-clip lg:max-w-[100vw]">
              <div ref={tickerRef} className="flex w-max items-center">
                <TickerSet />
                <TickerSet />
              </div>
              {/* edge fades */}
              <div className="pointer-events-none absolute left-0 top-1/2 z-10 h-full w-[114.397px] -translate-y-1/2 bg-gradient-to-r from-ink to-transparent" />
              <div className="pointer-events-none absolute right-0 top-1/2 z-10 h-full w-[238.772px] -translate-y-1/2 bg-gradient-to-l from-ink to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
