import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HexGrid from "./HexGrid.jsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const imgRectangle7 = "/assets/839d3a518763fdbf968a2a08c4073a1284670dcf.png";
const imgRectangle6 = "/assets/decfb971c6d641c9ccb852271bc0b630c000cdc2.png";
const imgRectangle5 = "/assets/29f89100346cab8bda091f83307e2d146c404f15.png";
const imgRectangle4 = "/assets/1343981533bfec0aaa59a2166abbcce5317934ec.png";
const imgLines = "/assets/40d20e30952fcf9fba67c9bf48e1c3c4aa24bb40.svg";

const ABOUT_TEXT =
  "Hello, I’m Rahat — a product-minded designer with nearly 4 years of experience, currently a UX Engineer at Selise Digital Platform. I've grown into a product-focused role, taking end-to-end ownership — from discovery to delivery — collaborating with international stakeholders to turn business goals into meaningful digital experiences.";

const TICKER_IMAGES = [
  { src: imgRectangle7, h: 282.989, cover: true },
  { src: imgRectangle6, h: 391.762, cover: true },
  { src: imgRectangle5, h: 282.989, cover: false },
  { src: imgRectangle4, h: 282.989, cover: true },
];

function TickerSet() {
  return (
    <div className="flex shrink-0 items-center gap-[17.687px] pr-[17.687px]">
      {TICKER_IMAGES.map((img, i) => (
        <div key={i} className="relative h-(--h) w-[221.085px] shrink-0 rounded-[17.687px] opacity-40" style={{ "--h": `${img.h}px` }}>
          {img.cover ? (
            <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[17.687px] object-cover" src={img.src} />
          ) : (
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[17.687px]">
              <img alt="" className="absolute left-[-126.26%] top-[-0.02%] h-full w-[227.43%] max-w-none" src={img.src} />
            </div>
          )}
        </div>
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
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-ink relative h-[1309px] overflow-hidden" data-name="About Section">
      {/* mouse-reactive hex background */}
      <HexGrid />

      {/* vertical grid lines */}
      <div className="absolute left-1/2 top-[-1px] h-[1311px] w-[1440px] -translate-x-1/2">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgLines} />
      </div>

      <div className="absolute left-1/2 top-[46px] flex h-[1264px] w-[1440px] -translate-x-1/2 flex-col items-center px-[37px] pt-[100px]">
        {/* dashed hairline — same treatment as Logos section: dash 10 / gap 10, 10% opacity */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.1) 0 10px, transparent 10px 20px)" }}
        />
        <p className="about-copy font-serif-display relative w-[832px] shrink-0 not-italic tracking-[1.92px] [word-break:break-word]">
          {ABOUT_TEXT.split(" ").map((word, i) => (
            <span key={i} className="about-word text-[48px] leading-[60px] text-[#5f5f5f]">
              {word}{" "}
            </span>
          ))}
        </p>

        {/* tilted image ticker, scrolling right → left */}
        <div className="relative mt-[32px] flex h-[508.483px] w-[1022.144px] shrink-0 items-center justify-center">
          <div className="-rotate-7 flex-none">
            <div className="relative w-[981.717px] overflow-clip">
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
