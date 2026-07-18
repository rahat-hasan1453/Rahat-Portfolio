import { motion } from "framer-motion";
import HexGrid from "./HexGrid.jsx";

const imgRectangle11 = "/assets/d55ea8421a15afe8e51799144e026483683c2d01.png";
const imgRectangle12 = "/assets/97bd8fded377878d941d3860402bc6bdc59bb6b7.png";
const imgRectangle15 = "/assets/9666b070aea91ea51ff6ba1bd9a71e03f2d9a037.png";
const imgLogo2 = "/assets/895abf24e3bfe87c3d1eb88047c09b7692054ccd.svg";
const imgFrame = "/assets/e3539b3477a05b39ba2ce3701f286d4a45159376.svg";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
};

function LogoCard({ index, children }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="relative flex h-[111px] w-[193px] shrink-0 flex-col items-center justify-center rounded-[20px] bg-[#0f0e0b] px-[19px] pb-[39px] pt-[40px]"
    >
      {children}
    </motion.div>
  );
}

export default function Logos() {
  return (
    <section className="bg-ink relative h-[343px]" data-name="Logos">
      {/* mouse-reactive hex background */}
      <HexGrid />

      <div className="absolute left-1/2 top-0 flex h-[343px] w-[1440px] -translate-x-1/2 flex-col items-start border-x border-solid border-[rgba(255,255,255,0.4)]">
        <div className="relative flex h-[343px] w-full shrink-0 flex-col items-start">
          {/* dashed hairlines — Figma stroke: dash 10 / gap 10, weight 0.5
              (1px physical line at half alpha ≈ 0.5px weight; sub-pixel heights get
              dropped by the browser on fractional pixel rows, hiding the bottom line) */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.1) 0 10px, transparent 10px 20px)" }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
            style={{ backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.1) 0 10px, transparent 10px 20px)" }}
          />
          <div className="relative flex h-full w-full shrink-0 flex-col items-center justify-center">
            <div className="relative flex shrink-0 flex-col items-center gap-[48px]">
              <p className="font-jakarta relative min-w-full shrink-0 text-center text-[16px] font-medium leading-[24px] tracking-[0.64px] text-grey [word-break:break-word]">
                {"I’ve worked with several brands from local & abroad"}
              </p>
              <div className="relative flex shrink-0 items-center gap-[20px]">
                <LogoCard index={0}>
                  <div className="relative h-[32px] w-[155px] shrink-0">
                    <img alt="RiQS" className="absolute inset-0 block size-full max-w-none" src={imgLogo2} />
                  </div>
                </LogoCard>
                <LogoCard index={1}>
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
                <LogoCard index={2}>
                  <div className="relative h-[32px] w-[158px] shrink-0 overflow-clip">
                    <div className="absolute inset-[-0.28%_-0.11%_0_0]">
                      <img alt="" className="block size-full max-w-none" src={imgFrame} />
                    </div>
                  </div>
                </LogoCard>
                <LogoCard index={3}>
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
                <LogoCard index={4}>
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
    </section>
  );
}
