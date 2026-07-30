import { useCallback, useEffect, useRef, useState } from "react";

/* Touch screens have no hover, so every hover reveal on the site is also bound
   to a press-and-hold: hold for HOLD_MS and the element enters its "held"
   state; release, scroll, or lift away and it leaves. Mouse pointers are
   ignored here — they keep using plain :hover.

   Usage:
     const { held, bind } = usePressHold();
     <div {...bind} data-held={held || undefined} className="… data-[held=true]:scale-105">

   For CSS-only reveals pair every `hover:x` with `data-[held=true]:x` (or
   `group-data-[held=true]:x` when the state lives on an ancestor). */
const HOLD_MS = 160;

export default function usePressHold({ delay = HOLD_MS } = {}) {
  const [held, setHeld] = useState(false);
  const timer = useRef(null);

  const clear = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const release = useCallback(() => {
    clear();
    setHeld(false);
  }, [clear]);

  useEffect(() => release, [release]);

  const bind = {
    onPointerDown: (e) => {
      if (e.pointerType === "mouse") return;
      clear();
      timer.current = setTimeout(() => setHeld(true), delay);
    },
    onPointerUp: release,
    onPointerCancel: release,
    onPointerLeave: release,
    // a long press on touch would otherwise raise the OS text/callout menu
    onContextMenu: (e) => {
      if (held) e.preventDefault();
    },
  };

  return { held, bind, release };
}
