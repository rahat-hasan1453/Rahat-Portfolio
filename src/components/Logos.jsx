import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HexGrid from "./HexGrid.jsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const imgRectangle11 = "/assets/d55ea8421a15afe8e51799144e026483683c2d01.png";
const imgRectangle12 = "/assets/97bd8fded377878d941d3860402bc6bdc59bb6b7.png";
const imgRectangle15 = "/assets/9666b070aea91ea51ff6ba1bd9a71e03f2d9a037.png";
const imgLogo2 = "/assets/895abf24e3bfe87c3d1eb88047c09b7692054ccd.svg";
const imgFrame = "/assets/e3539b3477a05b39ba2ce3701f286d4a45159376.svg";

function LogoCard({ children }) {
  return (
    <div className="logo-card relative flex h-[111px] w-[193px] shrink-0 flex-col items-center justify-center rounded-[20px] bg-[#0f0e0b] px-[19px] pb-[39px] pt-[40px]">
      {children}
    </div>
  );
}

export default function Logos() {
  const sectionRef = useRef(null);

  /* staggered rise-in, triggered by the ROW rather than each card: on mobile the
     row is wider than the phone, so cards past the first are clipped by the
     scroller and an element-level in-view check would never fire for them. */
  useGSAP(
    () => {
      gsap.from(".logo-card", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".logo-row", start: "top 85%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-ink relative max-lg:h-auto lg:h-[343px]" data-name="Logos">
      {/* mouse-reactive hex background */}
      <HexGrid />

      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start lg:absolute lg:left-1/2 lg:top-0 lg:h-[343px] lg:-translate-x-1/2 lg:border-x lg:border-solid lg:border-[rgba(255,255,255,0.4)]">
        <div className="relative flex w-full shrink-0 flex-col items-start lg:h-[343px]">
          {/* dashed hairlines — Figma stroke: dash 10 / gap 10, weight 0.5
              (1px physical line at half alpha ≈ 0.5px weight; sub-pixel heights get
              dropped by the browser on fractional pixel rows, hiding the bottom line).
              The mobile frame (622:309) insets them 36px from either edge. */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px max-lg:top-[36px]"
            style={{ backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.1) 0 10px, transparent 10px 20px)" }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px max-lg:bottom-[36px]"
            style={{ backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.1) 0 10px, transparent 10px 20px)" }}
          />
          <div className="relative flex h-full w-full shrink-0 flex-col items-center justify-center gutter max-lg:py-[84px]">
            <div className="relative flex w-full shrink-0 flex-col items-center gap-[48px] max-lg:gap-[24px]">
              <p className="font-jakarta relative min-w-full shrink-0 text-center text-[16px] font-medium leading-[24px] tracking-[0.64px] text-grey max-lg:min-w-0 max-lg:max-w-[266px] [word-break:break-word]">
                {"I’ve worked with several brands from local & abroad"}
              </p>
              {/* 5 across on desktop; on mobile (Figma 622:255) the identical row
                  at 0.712× — 743.7 wide, so it bleeds off-screen and swipes */}
              <div className="logo-row relative w-full shrink-0 no-scrollbar max-lg:-mx-[20px] max-lg:w-[calc(100%+40px)] max-lg:overflow-x-auto max-lg:px-[20px] lg:flex lg:justify-center">
                <div className="max-lg:h-[79px] max-lg:w-[743.74px]">
                  <div className="flex items-center gap-[20px] max-lg:origin-top-left max-lg:scale-[0.711709]">
                    <LogoCard>
                      <div className="relative h-[32px] w-[155px] shrink-0">
                        <img alt="RiQS" className="absolute inset-0 block size-full max-w-none" src={imgLogo2} />
                      </div>
                    </LogoCard>
                    <LogoCard>
                      <div
                        className="h-[32px] w-[123.429px] bg-[#e4e4e4]"
                        style={{
                          maskImage: `url("${imgRectangle11}")`,
                          WebkitMaskImage: `url("${imgRectangle11}")`,
                          maskSize: "123.428px 32px",
                          WebkitMaskSize: "123.428px 32px",
                          maskRepeat: "no-repeat",
                          WebkitMaskRepeat: "no-repeat",
                        }}
                      />
                    </LogoCard>
                    <LogoCard>
                      <div className="relative h-[32px] w-[158px] shrink-0 overflow-clip">
                        <div className="absolute inset-[-0.28%_-0.11%_0_0]">
                          <img alt="" className="block size-full max-w-none" src={imgFrame} />
                        </div>
                      </div>
                    </LogoCard>
                    <LogoCard>
                      <div
                        className="h-[32px] w-[164.056px] bg-[#e4e4e4]"
                        style={{
                          maskImage: `url("${imgRectangle12}")`,
                          WebkitMaskImage: `url("${imgRectangle12}")`,
                          maskSize: "164.056px 32px",
                          WebkitMaskSize: "164.056px 32px",
                          maskRepeat: "no-repeat",
                          WebkitMaskRepeat: "no-repeat",
                        }}
                      />
                    </LogoCard>
                    <LogoCard>
                      <div className="relative flex shrink-0 items-center gap-[4px]">
                        <div
                          className="h-[33px] w-[53px] bg-[#e4e4e4]"
                          style={{
                            maskImage: `url("${imgRectangle15}")`,
                            WebkitMaskImage: `url("${imgRectangle15}")`,
                            maskSize: "53px 32px",
                            WebkitMaskSize: "53px 32px",
                            maskPosition: "0px 1px",
                            WebkitMaskPosition: "0px 1px",
                            maskRepeat: "no-repeat",
                            WebkitMaskRepeat: "no-repeat",
                          }}
                        />
                        <p className="font-urbanist relative shrink-0 whitespace-nowrap text-right text-[30.455px] font-bold leading-[1.3] text-[#e4e4e4] [word-break:break-word]">
                          DMTCL
                        </p>
                      </div>
                    </LogoCard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
