import { useEffect, useRef, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HexGrid from "./HexGrid.jsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const imgImage63 = "/assets/95b86c277de98cb05b6c2d8499641f05aee027aa.png";
const imgDownload = "/assets/efb7f30e6bdeee9d2b528673382bc912677dab80.svg";
const imgGroup47 = "/assets/189b07984ec2f3ac75a3c8f86a1240f9d77295b1.svg";
const imgRahatHasan = "/assets/17120c46c73350f30424215b16a49e925eb37ac8.svg";
const imgLines = "/assets/d3273922281186b9e9028520267ecf0252a8f8b1.svg";

// Figma frame 270:2457 — 1728 × 2338
// top black area: 0–1200, bottom gradient section: 1200–2338 (h 1138)
// cal widget (image 66): 1040 × 489, centered, top 937 → overlaps boundary by 226px
const FOOTER_H = 2338;
const TOP_H = 1200;
const BOTTOM_H = FOOTER_H - TOP_H; // 1138
const CAL_TOP = 937;
const RIGHTS_H = 44; // all-rights-reserved bar below the design frame

const SOCIAL_LINKS = [
  { label: "linkedin", href: "https://www.linkedin.com/in/rahatuxd/" },
  { label: "facebook", href: null },
  { label: "X", href: null },
  { label: "behance", href: "https://www.behance.net/rahat1453" },
  { label: "dribbble", href: "https://dribbble.com/R1453" },
];
const RESUME_URL = "https://drive.google.com/drive/u/1/folders/1hKz5hsgXcRb_BI7GzRs6LpTlTkAFoWGz";

const ROW_A = [
  "Product\nStrategy", null, "UX Audit", null, "Web\nApplication", null,
  null, "Mobile\nApp", null, "Design\nSystem", null, "Saas\nProducts",
];
const ROW_B = ["Storytelling", "OOUX", "Collaboration", "Minimalism", "Empathy", "Adaptability"];
const ROW_C = ["Problem\nSolving", null, "Cognitive\nPsychology", null, "Cognitive\nPsychology", null];

function Bubble({ label, size = "size-[144px]" }) {
  const lines = (label || "UX Audit").split("\n").map((line, i) => (
    <p key={i} className="leading-none">{line}</p>
  ));
  return (
    <div
      className={`footer-reveal group relative flex shrink-0 items-center justify-center rounded-[40px] border border-solid border-[#131313] bg-[#1c1c1c] px-[16px] py-[10px] ${label ? "cursor-pointer" : ""} ${size}`}
    >
      {/* hover shuttles the label out the top, back in from below */}
      <div className={`relative shrink-0 overflow-hidden ${label ? "" : "opacity-0"}`}>
        <div className="font-urbanist relative whitespace-nowrap text-center text-[24px] font-medium leading-none text-white transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[130%]">
          {lines}
        </div>
        <div className="font-urbanist absolute inset-0 translate-y-[130%] whitespace-nowrap text-center text-[24px] font-medium leading-none text-white transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
          {lines}
        </div>
      </div>
    </div>
  );
}

function SocialPill({ children, href }) {
  const cls =
    "footer-reveal relative flex h-[40px] shrink-0 cursor-pointer items-center justify-center gap-[4px] rounded-[40px] border border-solid border-[rgba(105,105,105,0.2)] bg-[rgba(255,255,255,0.2)] px-[16px] py-[10px] transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:bg-[rgba(255,255,255,0.32)]";
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={cls}>
        {children}
      </a>
    );
  }
  return <div className={cls}>{children}</div>;
}

export default function Footer() {
  const containerRef = useRef(null);
  const [calVisible, setCalVisible] = useState(false);

  useEffect(() => {
    if (!calVisible) return;
    (async () => {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, [calVisible]);

  useGSAP(
    () => {
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

      ScrollTrigger.create({
        trigger: ".cal-bridge",
        start: "top 80%",
        once: true,
        onEnter: () => setCalVisible(true),
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative bg-[#12110d]" style={{ height: FOOTER_H + RIGHTS_H }} data-name="Footer">
      {/* ===== TOP SECTION: Building Better Experiences (independent, black) ===== */}
      <section className="footer-top relative w-full" style={{ height: TOP_H }} data-section="top">
        {/* mouse-reactive hex background */}
        <HexGrid />
      </section>

      {/* ===== BOTTOM SECTION: Main Footer (independent, dark red gradient) ===== */}
      <section className="relative w-full" style={{ height: BOTTOM_H }} data-section="bottom">
        {/* blurred gradient backdrop — image 63, h 1130, 8px black strip at the very bottom */}
        <div className="absolute left-0 top-0 h-[1130px] w-full blur-[22.95px]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img alt="" className="absolute left-[-0.94%] top-[-5.18%] h-[102.93%] w-[100.94%] max-w-none" src={imgImage63} />
          </div>
        </div>

        {/* footer content — anchored to the bottom, 1440 wide, centered */}
        <div className="absolute bottom-0 left-1/2 flex w-[1440px] -translate-x-1/2 flex-col items-start gap-[10px] px-[20px]">
          <div className="relative flex w-full shrink-0 flex-col items-center pt-[100px]">
            <div className="relative flex w-full shrink-0 items-start justify-between">
              {/* left column */}
              <div className="relative flex w-[320px] shrink-0 flex-col items-start gap-[48px]">
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
              <div className="relative flex w-[800.403px] shrink-0 flex-col items-end gap-[100px]">
                <div className="footer-fade relative h-[243px] w-[260.204px] shrink-0">
                  <img alt="r." className="absolute inset-0 block size-full max-w-none" src={imgGroup47} />
                </div>
                <div className="footer-fade relative h-[367.998px] w-[800px] shrink-0">
                  <img alt="RAHAT HASAN" className="absolute inset-0 block size-full max-w-none" src={imgRahatHasan} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 size-[8px] bg-[rgba(255,0,0,0.1)]" />
        </div>
      </section>

      {/* ===== ALL RIGHTS RESERVED ===== */}
      <div className="relative flex w-full items-center justify-center" style={{ height: RIGHTS_H }}>
        <p className="font-jakarta text-[13px] font-medium leading-[16px] tracking-[0.52px] text-grey">
          © {new Date().getFullYear()} Rahat Hasan — All rights reserved.
        </p>
      </div>

      {/* ===== GRID LINES: span both sections (full 2338px) ===== */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-10 w-[1440px] -translate-x-1/2" style={{ height: FOOTER_H }}>
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgLines} />
      </div>

      {/* ===== TOP CONTENT: heading + expertise grid + description ===== */}
      <div className="absolute left-1/2 top-[200px] z-20 flex w-[1400px] -translate-x-1/2 flex-col items-center">
        <div className="relative flex w-full shrink-0 items-start justify-between">
          <p className="footer-fade font-serif-display relative w-[455px] shrink-0 text-[72px] not-italic leading-[72px] tracking-[2.88px] text-white [word-break:break-word]">
            Building Better Experiences
          </p>
          <div className="relative flex w-[864px] shrink-0 flex-col items-start gap-[40px]">
            <div className="skills-grid relative flex w-full shrink-0 flex-col items-start">
              <div className="relative flex w-full shrink-0 flex-wrap content-center items-center gap-0">
                {ROW_A.map((label, i) => (
                  <Bubble key={i} label={label} />
                ))}
              </div>
              <div className="relative flex h-[69px] w-full shrink-0 items-center">
                {ROW_B.map((label, i) => (
                  <Bubble key={i} label={label} size="h-full" />
                ))}
              </div>
              <div className="relative flex w-full shrink-0 items-center">
                {ROW_C.map((label, i) => (
                  <Bubble key={i} label={label} />
                ))}
              </div>
            </div>
            <p className="footer-fade font-jakarta relative w-full shrink-0 text-[20px] font-medium leading-[24px] tracking-[0.8px] text-grey [word-break:break-word]">
              {"I believe UX is not about making interfaces look better. It's about helping people achieve their goals with less effort, less confusion, and greater confidence. Every project is an opportunity to understand human behavior, challenge assumptions, and create meaningful product experiences."}
            </p>
          </div>
        </div>
      </div>

      {/* ===== CAL.COM WIDGET: floating bridge across the section boundary ===== */}
      <div
        className="cal-bridge absolute left-1/2 z-30 h-[489px] w-[1040px] -translate-x-1/2"
        style={{ top: CAL_TOP }}
      >
        <div className="h-full w-full overflow-hidden rounded-[8px] bg-[#101010]">
          {calVisible && (
            <Cal
              namespace="15min"
              calLink="rahat-akash-4sxje8/15min"
              style={{ width: "100%", height: "100%", overflow: "auto" }}
              config={{ layout: "month_view", theme: "dark" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
