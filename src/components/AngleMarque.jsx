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
const imgLines = "/assets/85b87272f248dfb176bc9e8a787e0d23664737e5.svg";

const FIELD_H = 1937;

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
  { src: imgRectangle34, x: 522, y: 1373, w: 209, h: 281, speed: 1.0 },
  { src: imgRectangle34, x: 21, y: 1514, w: 209, h: 281, speed: 1.15 },
  { src: imgRectangle34, x: 1428, y: 1393, w: 209, h: 281, speed: 1.05 },
  { src: imgRectangle38, x: 1323, y: 900, w: 209, h: 281, speed: 0.95 },
  { src: imgRectangle31, x: 298, y: 180, w: 329, h: 243, speed: 1.2 },
  { src: imgRectangle31, x: 65, y: 1181, w: 329, h: 243, speed: 0.9 },
  { src: imgRectangle33, x: 1099, y: 604, w: 329, h: 243, speed: 1.1 },
  { src: imgRectangle33, x: 864, y: 1271, w: 410, h: 303, speed: 1.25 },
];

export default function AngleMarque() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
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
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden border-t border-solid border-[#f16767] bg-[#ffe6e6]"
      data-name="Angle marque"
    >
      {/* scrolling image field */}
      <div className="absolute left-1/2 top-0 z-20 h-(--field-h) w-[1728px] -translate-x-1/2" style={{ "--field-h": `${FIELD_H}px` }}>
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

      {/* pinned quote */}
      <div className="absolute left-1/2 top-1/2 z-10 flex w-[781px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[22px] text-center [word-break:break-word]">
        <p className="font-serif-display text-ink relative w-full shrink-0 text-[72px] not-italic leading-[72px] tracking-[2.88px]">
          Be an amateur, that’s all any of us are: We didn’t live long enough to be anything else.
        </p>
        <p className="font-jakarta relative w-full shrink-0 text-[20px] font-medium leading-[24px] tracking-[0.8px] text-grey">
          -Sir Charles Spencer Chaplin
        </p>
      </div>
    </section>
  );
}
