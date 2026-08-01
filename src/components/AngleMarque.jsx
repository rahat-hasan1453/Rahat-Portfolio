import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const imgRectangle27 = "/assets/15f31c724ab23f5c12da0e0aa9d375e1b62452d5.png";
const imgRectangle35 = "/assets/664f92d3f7e23a196fa99748074ef3af791931cf.png";
const imgRectangle28 = "/assets/8515c5b753a891930fd92a233fa5d521287e5175.png";
const imgRectangle36 = "/assets/6e59ea52fdab5b7de0ac00dc00c58bb7a853273b.png";
const imgRectangle29 = "/assets/5b7d0ae6d4a1055465bb974756e8c4fa70f10d5e.png";
const imgRectangle37 = "/assets/c64075a2f3ad073060b379a4481568e297ec4308.png";
const imgRectangle30 = "/assets/b815200441007cae19fe209e699ac4e8f2481020.png";
const imgRectangle32 = "/assets/2a0b2ea5918816ebb04b763a32f036e1d794ee3c.png";
const imgRectangle34 = "/assets/4583dd520e0a8771b47d3b7187a1b151c258995c.png";
const imgRectangle38 = "/assets/7650c3b8ff96600e8c34feec39558dbc7adb9018.png";
const imgRectangle31 = "/assets/0cd21a053806287e63d372fd804878164d4dce04.png";
const imgRectangle33 = "/assets/3a153bdae32318c674896aafac82bf3f43f4beae.png";
/* five more project shots so no image repeats in the field */
const imgExtra1 = "/assets/cs-shot-3.png";
const imgExtra2 = "/assets/cs-shot-6.png";
const imgExtra3 = "/assets/cs-shot-9.png";
const imgExtra4 = "/assets/cs-shot-12.png";
const imgExtra5 = "/assets/cs-shot-18.png";
const imgLines = "/assets/85b87272f248dfb176bc9e8a787e0d23664737e5.svg";

const FIELD_H = 1937;
const M_FIELD_H = 630; // Figma mobile frame 623:574 — the field's own box

// x/y/w/h straight from the Figma frame (1728 × 1937); speed = parallax factor
const IMAGES = [
  { src: imgRectangle27, x: 0, y: 79, w: 165, h: 234, speed: 1.0 },
  { src: imgRectangle35, x: 1559, y: 79, w: 165, h: 234, speed: 1.1 },
  { src: imgRectangle28, x: 0, y: 375, w: 165, h: 281, speed: 1.25 },
  { src: imgRectangle36, x: 1563, y: 415, w: 165, h: 280, speed: 0.95 },
  { src: imgRectangle29, x: 0, y: 797, w: 165, h: 281, speed: 1.05 },
  { src: imgRectangle37, x: 1621, y: 797, w: 165, h: 281, speed: 1.3 },
  { src: imgRectangle30, x: 358, y: 588, w: 209, h: 281, speed: 1.15 },
  { src: imgRectangle32, x: 1159, y: 161, w: 209, h: 281, speed: 0.9 },
  { src: imgRectangle34, x: 689, y: 921, w: 209, h: 281, speed: 1.2 },
  { src: imgExtra1, x: 522, y: 1373, w: 209, h: 281, speed: 1.0 },
  { src: imgExtra2, x: 21, y: 1514, w: 209, h: 281, speed: 1.15 },
  { src: imgExtra3, x: 1428, y: 1393, w: 209, h: 281, speed: 1.05 },
  { src: imgRectangle38, x: 1323, y: 900, w: 209, h: 281, speed: 0.95 },
  { src: imgRectangle31, x: 298, y: 180, w: 329, h: 243, speed: 1.2 },
  { src: imgExtra4, x: 65, y: 1181, w: 329, h: 243, speed: 0.9 },
  { src: imgRectangle33, x: 1099, y: 604, w: 329, h: 243, speed: 1.1 },
  { src: imgExtra5, x: 864, y: 1271, w: 410, h: 303, speed: 1.25 },
];

// mobile field — Figma 623:602 + 623:594, laid out on the 390 frame (the same
// artwork at ⅓ scale, re-scattered around the quote). x may be negative: the
// field is 592 wide and bleeds past both edges.
const M_IMAGES = [
  { src: imgRectangle27, x: -101, y: 31, w: 55, h: 78, speed: 1.0 },
  { src: imgRectangle35, x: 416, y: 31, w: 54, h: 78, speed: 1.1 },
  { src: imgRectangle28, x: -101, y: 130, w: 55, h: 92, speed: 1.25 },
  { src: imgRectangle36, x: 417, y: 143, w: 54, h: 92, speed: 0.95 },
  { src: imgRectangle29, x: -101, y: 269, w: 55, h: 93, speed: 1.05 },
  { src: imgRectangle37, x: 436, y: 269, w: 55, h: 93, speed: 1.3 },
  { src: imgRectangle30, x: 17, y: 200, w: 69, h: 93, speed: 1.15 },
  { src: imgRectangle32, x: 283, y: 57, w: 69, h: 95, speed: 0.9 },
  { src: imgRectangle34, x: 153, y: 96, w: 69, h: 93, speed: 1.2 },
  { src: imgRectangle34, x: 71, y: 460, w: 70, h: 93, speed: 1.0 },
  { src: imgRectangle34, x: -95, y: 507, w: 69, h: 93, speed: 1.15 },
  { src: imgRectangle34, x: 373, y: 466, w: 69, h: 94, speed: 1.05 },
  { src: imgRectangle38, x: 338, y: 303, w: 69, h: 94, speed: 0.95 },
  { src: imgRectangle31, x: -2, y: 65, w: 109, h: 81, speed: 1.2 },
  { src: imgRectangle31, x: -80, y: 397, w: 109, h: 79, speed: 0.9 },
  { src: imgRectangle33, x: 185, y: 427, w: 136, h: 99, speed: 1.25 },
];
const M_DRIFT = 90; // ± travel of a speed-1.0 image across the section

export default function AngleMarque() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // desktop only: pin the quote and stream the image field past it
      mm.add("(min-width: 1024px)", () => {
        const travel = () => FIELD_H - window.innerHeight;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${FIELD_H}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // quote stays fixed while every image travels up past it,
        // each at its own speed — gregorcollienne.com hero behaviour
        gsap.utils.toArray(".marque-img").forEach((el) => {
          const speed = parseFloat(el.dataset.speed);
          tl.to(el, { y: () => -travel() * speed, ease: "none" }, 0);
        });
        tl.to(".marque-lines", { y: () => -travel(), ease: "none" }, 0);
      });

      /* mobile: nothing is pinned (the field is shorter than the viewport, so
         there is nothing to stream past a pinned quote). Instead the same
         per-image speeds drift the field against natural scroll, so the shots
         still slide over the quote at different rates. */
      mm.add("(max-width: 1023px)", () => {
        gsap.from(".marque-quote", {
          opacity: 0,
          y: 32,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray(".marque-img-m").forEach((el) => {
          const speed = parseFloat(el.dataset.speed);
          tl.fromTo(el, { y: M_DRIFT * speed }, { y: -M_DRIFT * speed, ease: "none" }, 0);
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-solid border-[#f16767] bg-[#ffe6e6] max-lg:h-[100svh] max-lg:min-h-[630px] lg:h-screen"
      data-name="Angle marque"
    >
      {/* scrolling image field — desktop */}
      <div
        className="absolute left-1/2 top-0 z-20 h-(--field-h) w-[1728px] -translate-x-1/2 max-lg:hidden"
        style={{ "--field-h": `${FIELD_H}px` }}
      >
        <div className="marque-lines absolute left-1/2 top-[-2px] h-[1938px] w-[1440px] -translate-x-1/2">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgLines} />
        </div>
        {IMAGES.map((img, i) => (
          <div
            key={i}
            className="marque-img absolute"
            data-speed={img.speed}
            style={{ left: img.x, top: img.y, width: img.w, height: img.h }}
          >
            <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={img.src} />
          </div>
        ))}
      </div>

      {/* scrolling image field — mobile (drifts, over the quote, as on desktop).
          The 630px Figma field is centred in the now full-height band so the
          quote keeps sitting in the same hole between the shots. */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-(--m-field-h) w-[390px] -translate-x-1/2 -translate-y-1/2 lg:hidden"
        style={{ "--m-field-h": `${M_FIELD_H}px` }}
      >
        {M_IMAGES.map((img, i) => (
          <div
            key={i}
            className="marque-img-m absolute"
            data-speed={img.speed}
            style={{ left: img.x, top: img.y, width: img.w, height: img.h }}
          >
            <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={img.src} />
          </div>
        ))}
      </div>

      {/* the quote — pinned on desktop, dead-centre of the 630px band on mobile */}
      <div className="marque-quote absolute left-1/2 top-1/2 z-10 mx-auto flex w-full max-w-[781px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[22px] text-center gutter [word-break:break-word] max-lg:max-w-[323px] max-lg:gap-[16px] lg:px-0">
        <p className="font-serif-display text-ink text-h2 relative w-full shrink-0 not-italic tracking-[2.88px] max-lg:text-[32px] max-lg:leading-[40px] max-lg:tracking-[1.28px]">
          Be an amateur, that’s all any of us are: We didn’t live long enough to be anything else.
        </p>
        <p className="font-jakarta relative w-full shrink-0 text-[20px] font-medium leading-[24px] tracking-[0.8px] text-grey max-lg:text-[12px] max-lg:leading-[20px] max-lg:tracking-[0.48px]">
          -Sir Charles Spencer Chaplin
        </p>
      </div>
    </section>
  );
}
