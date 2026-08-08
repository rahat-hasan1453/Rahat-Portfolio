import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ACCESS_MINUTES, checkPin, pinLengthFor, unlockCase } from "../lib/caseAccess.js";
import settings from "../../content/settings.json";

/* =========================================================================
   Case study access modal.

   Opens when a locked case study is requested — from a card on the homepage
   rail, a card on the Case Studies page, or a direct link to a detail page.
   Panel styling follows the site: ink panel on a blurred scrim, the brand
   badge from the header, serif display heading, Jakarta body, accent red
   only where it earns attention.

   The tone is deliberate. Being asked for a code can read as a closed door,
   so the copy explains WHY in one line, makes the ask small, and offers an
   obvious way to get the code. No "denied", no "unauthorised", no red
   warning triangles — a wrong code just says try again.
   ========================================================================= */

const imgR = "/assets/cbb187227f4bec065dffe6c01f5b5bdd32d0a6d7.svg";
const imgClose = "/assets/8d3e866298728539e5e53c49774582e700852597.svg";

const EMAIL = settings.contactEmail || "rahat.akash1453@gmail.com";
const EASE = [0.22, 1, 0.36, 1];

export default function PinGate({ open, onClose, onUnlocked, title, slug }) {
  // a study may carry its own code, so the number of boxes is per study
  const PIN_LENGTH = pinLengthFor(slug);
  const [digits, setDigits] = useState(() => Array(PIN_LENGTH).fill(""));
  const digitsRef = useRef(digits);
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);
  const inputs = useRef([]);

  const write = (next) => {
    digitsRef.current = next;
    setDigits(next);
  };

  const value = digits.join("");

  // fresh state every time it opens, and focus lands in the first box
  useEffect(() => {
    if (!open) return;
    write(Array(PIN_LENGTH).fill(""));
    setError(false);
    setDone(false);
    const t = setTimeout(() => inputs.current[0]?.focus(), 260);
    return () => clearTimeout(t);
  }, [open, PIN_LENGTH]);

  // the page behind must not scroll while the modal owns the screen
  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      window.__lenis?.start();
    };
  }, [open]);

  // Esc closes, same as the cross
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = (code) => {
    if (checkPin(code, slug)) {
      setDone(true);
      unlockCase(slug);
      // let the "you're in" beat land before the page changes under them
      setTimeout(() => onUnlocked(), 700);
      return;
    }
    setError(true);
    write(Array(PIN_LENGTH).fill(""));
    setTimeout(() => inputs.current[0]?.focus(), 10);
  };

  /* One box can receive the whole code at once — iOS one-time-code autofill and
     password managers both drop all four digits into the focused field — so a
     multi-digit value spreads across the boxes from here rather than being
     trimmed down to one character. */
  const fill = (from, chars) => {
    // read through the ref, not the render closure: several keystrokes can be
    // handled before React re-renders, and a stale snapshot would drop digits
    const next = [...digitsRef.current];
    chars.split("").forEach((c, k) => {
      if (from + k < PIN_LENGTH) next[from + k] = c;
    });
    write(next);
    setError(false);
    const landed = Math.min(from + chars.length, PIN_LENGTH - 1);
    inputs.current[landed]?.focus();
    // every box filled → check it; no "submit" button to press
    if (next.every(Boolean)) submit(next.join(""));
  };

  const setDigit = (i, raw) => {
    const chars = raw.replace(/\D/g, "");
    if (!chars) {
      const next = [...digitsRef.current];
      next[i] = "";
      write(next);
      setError(false);
      return;
    }
    fill(i, chars);
  };

  const onKeyDown = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      e.preventDefault();
      const next = [...digitsRef.current];
      next[i - 1] = "";
      write(next);
      inputs.current[i - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && i > 0) inputs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < PIN_LENGTH - 1) inputs.current[i + 1]?.focus();
    if (e.key === "Enter" && value.length === PIN_LENGTH) submit(value);
  };

  // pasting the whole code into any box fills the row from the first box
  const onPaste = (e) => {
    const text = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, PIN_LENGTH);
    if (!text) return;
    e.preventDefault();
    fill(0, text);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-[20px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pin-gate-title"
        >
          {/* scrim — click-away closes */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[6px]" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative w-full max-w-[440px] rounded-[16px] border border-white/10 bg-[#101010] p-[32px] max-lg:p-[24px]"
          >
            {/* header: brand badge + close */}
            <div className="flex items-start justify-between">
              <div className="relative size-[36px] shrink-0 overflow-hidden rounded-[8px]">
                <div className="absolute inset-0 rounded-[8px] bg-gradient-to-l from-[#f16767] to-[red]" />
                <div className="absolute inset-[22%_20.11%_23%_21%]">
                  <img alt="Rahat Hasan" className="absolute inset-0 block size-full max-w-none" src={imgR} />
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="relative flex size-[32px] shrink-0 items-center justify-center rounded-full transition-all duration-300 hover:bg-white/10 active:scale-95"
              >
                <img alt="" className="block size-[18px] max-w-none" src={imgClose} />
              </button>
            </div>

            {done ? (
              /* success beat — short, warm, then the page opens on its own */
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE }} className="mt-[24px]">
                <h2 className="font-serif-display text-[28px] not-italic leading-[32px] tracking-[1.12px] text-white">
                  <span className="accent-gradient-text">You’re in.</span> Enjoy the read.
                </h2>
                <p className="font-jakarta mt-[8px] text-[16px] font-medium leading-[24px] tracking-[0.64px] text-[#b3b3b3]">
                  Opening it now — this case study stays open for the next {ACCESS_MINUTES} minutes.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="mt-[24px]">
                  <h2 id="pin-gate-title" className="font-serif-display text-[28px] not-italic leading-[32px] tracking-[1.12px] text-white max-lg:text-[24px]">
                    One small step first
                  </h2>
                  <p className="font-jakarta mt-[10px] text-[16px] font-medium leading-[24px] tracking-[0.64px] text-[#b3b3b3]">
                    {title ? (
                      <>
                        <span className="text-white">{title}</span> is client work, so I keep the full write-up out of
                        public search. Pop in the {PIN_LENGTH}-digit code and this one opens right up.
                      </>
                    ) : (
                      <>
                        These are client projects, so I keep the full write-ups out of public search. Pop in the{" "}
                        {PIN_LENGTH}-digit code and they open right up.
                      </>
                    )}
                  </p>
                </div>

                {/* four boxes — auto-advance, paste-friendly, submits on the last digit */}
                <div className="mt-[28px]">
                  <p className="font-jakarta text-[13px] font-medium leading-[16px] tracking-[0.52px] text-grey">Access code</p>
                  <motion.div
                    animate={error ? { x: [0, -8, 7, -5, 3, 0] } : { x: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="mt-[10px] flex items-center gap-[12px]"
                  >
                    {digits.map((d, i) => (
                      <input
                        key={i}
                        ref={(el) => (inputs.current[i] = el)}
                        value={d}
                        onChange={(e) => setDigit(i, e.target.value)}
                        onKeyDown={(e) => onKeyDown(i, e)}
                        onPaste={onPaste}
                        onFocus={(e) => e.target.select()}
                        /* masked so the code isn't readable over a shoulder or
                           in a screen share. inputMode keeps the numeric keypad
                           on mobile, which type=password alone would not. */
                        type="password"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        aria-label={`Digit ${i + 1}`}
                        /* deliberately NOT maxLength=1: the browser drops
                           anything past the limit without firing an event, so
                           a fast typer whose second keypress lands before the
                           focus moves would lose that digit outright. Letting
                           the value through and spreading it in fill() keeps
                           every keystroke. */
                        className={`font-serif-display h-[64px] w-full rounded-[8px] border bg-white/[0.04] text-center text-[28px] leading-none text-white caret-[#f16767] outline-none transition-all duration-300 focus:border-[#f16767] focus:bg-white/[0.07] ${
                          error ? "border-[#f16767]/60" : "border-white/15"
                        }`}
                      />
                    ))}
                  </motion.div>

                  {/* a wrong code is a nudge, never a telling-off */}
                  <div className="mt-[10px] min-h-[20px]">
                    <AnimatePresence mode="wait">
                      {error && (
                        <motion.p
                          key="err"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="font-jakarta text-[14px] font-medium leading-[20px] tracking-[0.56px] text-[#f16767]"
                        >
                          Hmm, that’s not the one — no problem, give it another try.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* the way out — asking is easy and clearly welcome */}
                <div className="mt-[14px] border-t border-white/10 pt-[18px]">
                  <p className="font-jakarta text-[14px] font-medium leading-[20px] tracking-[0.56px] text-grey">
                    Don’t have a code yet? Email me at{" "}
                    <a
                      href={`mailto:${EMAIL}?subject=Case%20study%20access%20code`}
                      className="text-white underline [text-underline-position:from-font] transition-colors duration-300 hover:text-[#f16767]"
                    >
                      {EMAIL}
                    </a>{" "}
                    and I’ll send one over — happy to walk you through the work myself.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="font-jakarta mt-[14px] text-[14px] font-medium leading-[20px] tracking-[0.56px] text-grey underline [text-underline-position:from-font] transition-colors duration-300 hover:text-white"
                  >
                    Maybe later — keep browsing
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
