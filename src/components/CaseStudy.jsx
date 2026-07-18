import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import HexGrid from "./HexGrid.jsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const imgRectangle10 = "/assets/9968fb9396a3e91e66388b046266dfaa2cc3b597.png";
const imgRectangle6 = "/assets/bf6e07a7c2c0d1b3324cf94624a8454cb84c6b0d.png";
const imgRectangle13 = "/assets/060ad1bb3da3ad65d5e80e5018b56c1bb2690da2.png";
const imgRectangle7 = "/assets/8515c5b753a891930fd92a233fa5d521287e5175.png";
const imgRectangle11 = "/assets/b815200441007cae19fe209e699ac4e8f2481020.png";
const imgRectangle12 = "/assets/2a0b2ea5918816ebb04b763a32f036e1d794ee3c.png";
const imgRectangle9 = "/assets/4583dd520e0a8771b47d3b7187a1b151c258995c.png";
const imgRectangle8 = "/assets/01b079747853473476a56c1110e5349c011b0407.png";
const imgRectangle14 = "/assets/0b19b6ba52627fe4db5c413523518e7d4390e4ae.png";
const imgRectangle15 = "/assets/b0191a30584e4ed37ce1640236532481efa0be4e.png";
const imgImage65 = "/assets/0e9fe4f1c8d08c9128ad7f9ba5ce06d952cc8b39.png";
const imgImage64 = "/assets/a0ab21cdcc5bdf2b838ea21c720530169c478f48.png";
const imgLines = "/assets/ca0b851bea8b17daa1b78fdc99dbbcc046eab5a3.svg";
const imgLogo2 = "/assets/0826edbc3e6fd14f58cf0e0a65d4ad80ec15da69.svg";
const imgVector1 = "/assets/d6b9f02c4491ac4a2168656adfefa6ca940f6b7d.svg";
const imgArrowRight = "/assets/3873c40b5c6809f73759ff31e50315af16b7d543.svg";

const CARDS = [
  { img: imgRectangle8, tags: ["UX Audit", "Improve UX", "User Journey"] },
  { img: imgRectangle14, tags: ["Revamp Design", "Improve UX", "Fine tune User Journey"] },
  { img: imgRectangle6, tags: ["Revamp Design", "Improve UX", "Fine tune User Journey"], crop: true },
  { img: imgRectangle15, tags: ["Revamp Design", "Improve UX", "Fine tune User Journey"] },
];

const COLLAGE = [
  { src: imgRectangle6, x: 0, y: 0, w: 194, h: 302, speed: 1.15 },
  { src: imgRectangle13, x: 1183.25, y: 0, w: 196, h: 302, speed: 0.9 },
  { src: imgRectangle7, x: 210, y: 0, w: 366, h: 226, speed: 1.05 },
  { src: imgRectangle11, x: 592, y: 0, w: 89, h: 148, speed: 1.25 },
  { src: imgRectangle12, x: 1079, y: 0, w: 88, h: 148, speed: 1.2 },
  { src: imgRectangle9, x: 697, y: 0, w: 365, h: 226, speed: 0.95 },
];

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

function Card({ data, index }) {
  return (
    <div className="case-card-wrap sticky top-[70px]" style={{ zIndex: index + 1 }}>
      <div className="case-card bg-ink flex w-[1392px] origin-top flex-col items-start gap-[14px] pb-[40px]">
        <div className="relative h-[719px] w-full shrink-0 rounded-[8px]">
          {data.crop ? (
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[8px]">
              <img alt="" className="absolute left-0 top-[-7.92%] h-[121%] w-full max-w-none" src={data.img} />
            </div>
          ) : (
            <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[8px] object-cover" src={data.img} />
          )}
        </div>
        <div className="relative flex w-full shrink-0 items-start">
          <div className="relative flex min-w-px flex-[1_0_0] flex-col items-start gap-[8px] [word-break:break-word]">
            <p className="font-serif-display relative min-w-full shrink-0 text-[28px] not-italic leading-[32px] tracking-[1.12px] text-white">
              RiQS Praxis Monitor/ Web Application
            </p>
            <p className="font-jakarta relative w-[630px] shrink-0 text-[20px] font-medium leading-[24px] tracking-[0.8px] text-grey">
              Monitor your daily steps effortlessly with RiQS Praxis Monitor. Stay inspired and on track as you progress toward your fitness
              milestones. This intuitive web app helps you maintain motivation.
            </p>
          </div>
          <div className="relative flex shrink-0 flex-col items-end">
            <div className="relative flex shrink-0 flex-col items-end gap-[8px]">
              <div className="relative flex shrink-0 items-center gap-[20px]">
                <div className="relative h-[18px] w-[84px] shrink-0">
                  <img alt="RiQS" className="absolute inset-0 block size-full max-w-none" src={imgLogo2} />
                </div>
                <div className="relative flex h-[31px] shrink-0 items-center justify-center rounded-[20px] p-[10px]">
                  <p className="font-jakarta relative shrink-0 whitespace-nowrap text-[16px] font-medium leading-[24px] tracking-[0.64px] text-white [word-break:break-word]">
                    2025/26
                  </p>
                </div>
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
              <p className="font-jakarta relative shrink-0 whitespace-nowrap text-[16px] font-medium leading-[24px] tracking-[0.64px] text-white [word-break:break-word]">
                riqs.com/ login
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudy() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // slight parallax drift on the heading collage images
      gsap.utils.toArray(".collage-img").forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "1");
        gsap.fromTo(
          el,
          { y: 60 * speed },
          {
            y: -60 * speed,
            ease: "none",
            scrollTrigger: { trigger: ".collage", start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      // sticky stacking: as the next card arrives, the pinned one scales back slightly
      const wraps = gsap.utils.toArray(".case-card-wrap");
      wraps.forEach((wrap, i) => {
        if (i === wraps.length - 1) return;
        gsap.to(wrap.querySelector(".case-card"), {
          scale: 0.94,
          opacity: 0.55,
          transformOrigin: "center top",
          ease: "none",
          scrollTrigger: {
            trigger: wraps[i + 1],
            start: "top bottom",
            end: "top 70px",
            scrub: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-ink relative" data-name="Case Study">
      {/* mouse-reactive hex background */}
      <HexGrid />

      {/* vertical grid lines — stretched to the section's real height so the strokes
          reach all the way to the next section with zero gap (the source SVG is a
          fixed-height asset, so it's tiled/stretched via object-cover rather than
          left at its intrinsic size) */}
      <div className="absolute left-1/2 top-[-1px] h-full w-[1440px] -translate-x-1/2 overflow-hidden">
        <img alt="" className="absolute inset-0 block size-full max-w-none object-cover" src={imgLines} />
      </div>
      {/* gradient band behind heading */}
      <div className="absolute left-0 top-[705px] h-[284px] w-full">
        <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={imgRectangle10} />
      </div>

      <div className="relative mx-auto flex w-[1400px] flex-col items-center pt-[179px]">
        {/* heading collage */}
        <div className="collage relative mb-[120px] h-[564px] w-[1379.25px] shrink-0">
          {COLLAGE.map((img, i) => (
            <div
              key={i}
              className="collage-img absolute rounded-[20px]"
              data-speed={img.speed}
              style={{ left: img.x, top: img.y, width: img.w, height: img.h }}
            >
              <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[20px] object-cover" src={img.src} />
            </div>
          ))}
          <div className="absolute left-[417.63px] top-[292px] flex w-[544px] flex-col items-start px-[10px] py-[20px]">
            <div className="font-serif-display relative flex w-full shrink-0 flex-col items-end gap-[8px] not-italic tracking-[2.88px] text-white [word-break:break-word]">
              <p className="relative w-full shrink-0 text-[72px] leading-[72px]">
                {"A "}
                <span className="font-serif-display-it accent-gradient-text italic">Portfolio</span>
              </p>
              <div className="relative flex w-full shrink-0 flex-col items-end gap-[8px] text-[72px] leading-[72px]">
                <p className="relative w-[396px] shrink-0">Build For</p>
                <p className="relative shrink-0 whitespace-nowrap">Every Steps</p>
              </div>
            </div>
          </div>
        </div>

        {/* sticky stacking case study cards */}
        <div className="relative flex w-[1392px] flex-col gap-[120px]">
          {CARDS.map((card, i) => (
            <Card key={i} data={card} index={i} />
          ))}
        </div>

        {/* Live on the App Store */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mt-[120px] mb-[100px] flex w-[1392px] shrink-0 flex-col items-start gap-[30px] rounded-[40px] bg-[#1c1c1c] p-[40px]"
        >
          <div className="relative flex w-full shrink-0 items-end justify-between">
            <p className="font-serif-display relative w-[273px] shrink-0 text-[48px] not-italic leading-[60px] tracking-[1.92px] text-white [word-break:break-word]">
              Live on the App Store
            </p>
            <div className="relative flex shrink-0 cursor-pointer items-center gap-[12px] rounded-[14px] py-[8px]">
              <div className="relative flex shrink-0 items-center gap-[8px]">
                <div className="relative size-[40px] shrink-0 rounded-[8px]">
                  <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[8px] object-cover" src={imgImage65} />
                </div>
                <p className="font-serif-display relative shrink-0 whitespace-nowrap text-[20px] not-italic leading-[24px] tracking-[0.8px] text-white [word-break:break-word]">
                  View Details
                </p>
              </div>
              <div className="relative size-[24px] shrink-0">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgArrowRight} />
              </div>
            </div>
          </div>
          <div className="relative flex h-[268px] w-full shrink-0 items-center">
            {[
              { bg: "#bed2f3", rounded: "rounded-l-[8px]" },
              { bg: "#f8e0b9", rounded: "" },
              { bg: "#d4b6fb", rounded: "" },
              { bg: "#c2f0e2", rounded: "rounded-r-[8px]" },
            ].map((cell, i) => (
              <div key={i} className={`relative h-full min-w-px flex-[1_0_0] overflow-clip ${cell.rounded}`} style={{ background: cell.bg }}>
                <div className="absolute left-1/2 top-[22.89px] h-[339.104px] w-[156.416px] -translate-x-1/2 rounded-[27.215px]">
                  <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[27.215px] object-cover" src={imgImage64} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
