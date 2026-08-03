import { useEffect, useRef } from "react";

// fin.com-style reactive background: a faint grid of hex values that
// glows in the site's accent red around the cursor as it moves.
//
// The canvas is viewport-sized and sticky inside its section, so even
// very tall sections (e.g. Case Study at ~5600px) cost one screen of
// pixels instead of a full-height buffer.
const HEX = "0123456789ABCDEF";
// a 6-digit code at 13px monospace measures ~47px, so these cells sit the
// codes shoulder-to-shoulder both across and down (no visible gutters)
const CELL_W = 50;
const CELL_H = 15;
const RADIUS = 280;

// real 6-digit color hex codes (e.g. FFFFFF, 000000, FF0000)
function randHex() {
  let s = "";
  for (let i = 0; i < 6; i++) s += HEX[(Math.random() * 16) | 0];
  return s;
}

// how often the mask silhouette is re-sampled from the masked canvas (ms) —
// the subject barely moves, so this is cheap insurance against a resize/scroll
const MASK_REFRESH = 500;
// downsampled mask width; averaging at this size closes the gaps between the
// portrait's dots, so the silhouette masks as one shape rather than a screen
const MASK_W = 110;

export default function HexGrid({ maskSelector = null }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let cells = [];
    let cols = 0;
    let rows = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let visible = true;
    let intensity = 0; // fades the whole effect in on mouse move, out when idle
    let targetIntensity = 0;
    let idleTimer = null;
    const pointer = { clientX: -9999, clientY: -9999 };
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = Math.min(rect.height, window.innerHeight);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      cols = Math.ceil(w / CELL_W) + 1;
      rows = Math.ceil(h / CELL_H) + 1;
      cells = Array.from({ length: cols * rows }, randHex);
    };

    /* ---- optional silhouette mask -------------------------------------
       The hero's dot portrait sits in front of this grid. Codes lighting up
       *through* the subject read as noise on top of the face, so the cells
       that fall on it are skipped: the hex field lights up around the
       portrait and stops at its edge. The silhouette is sampled from the
       portrait's own canvas (downsampled, so the gaps between its dots
       close), which keeps the mask in the shape of the subject rather than
       punching out its whole bounding box. */
    const maskCanvas = document.createElement("canvas");
    const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true });
    let maskAlpha = null; // Uint8ClampedArray of the downsampled alpha
    let maskW = 0;
    let maskH = 0;
    let maskAt = 0;

    const maskSource = () => (maskSelector ? document.querySelector(maskSelector)?.querySelector("canvas") : null);

    const buildMask = (src) => {
      if (!src || !src.width || !src.height) return;
      maskW = MASK_W;
      maskH = Math.max(1, Math.round((MASK_W * src.height) / src.width));
      maskCanvas.width = maskW;
      maskCanvas.height = maskH;
      maskCtx.clearRect(0, 0, maskW, maskH);
      try {
        maskCtx.drawImage(src, 0, 0, maskW, maskH);
        maskAlpha = maskCtx.getImageData(0, 0, maskW, maskH).data;
      } catch {
        maskAlpha = null; // tainted canvas — fall back to no mask
      }
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      // fade the entire effect with mouse activity — nothing shows at rest
      intensity += (targetIntensity - intensity) * 0.06;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      if (intensity < 0.01) return;
      // target in canvas space, re-read each frame so the glow stays
      // under the cursor while scrolling past the sticky canvas
      const rect = canvas.getBoundingClientRect();
      const tx = pointer.clientX - rect.left;
      const ty = pointer.clientY - rect.top;
      mouse.x += (tx - mouse.x) * 0.09;
      mouse.y += (ty - mouse.y) * 0.09;

      // where the masked element currently sits, in this canvas's space
      let mask = null;
      if (maskSelector) {
        const src = maskSource();
        if (src) {
          const now = performance.now();
          if (now - maskAt > MASK_REFRESH) {
            buildMask(src);
            maskAt = now;
          }
          if (maskAlpha) {
            const mr = src.getBoundingClientRect();
            // a hidden (display:none) portrait measures 0 — no mask to apply
            if (mr.width && mr.height) mask = { x: mr.left - rect.left, y: mr.top - rect.top, w: mr.width, h: mr.height };
          }
        }
      }

      ctx.font = "13px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const x = c * CELL_W + 2;
          const y = r * CELL_H + 11;
          const d = Math.hypot(x - mouse.x, y - mouse.y);
          if (d >= RADIUS) continue; // cells only light up near the cursor
          // …and never on top of the masked subject
          if (mask && x >= mask.x && x <= mask.x + mask.w && y >= mask.y && y <= mask.y + mask.h) {
            const mx = Math.min(maskW - 1, ((x - mask.x) / mask.w * maskW) | 0);
            const my = Math.min(maskH - 1, ((y - mask.y) / mask.h * maskH) | 0);
            if (maskAlpha[(my * maskW + mx) * 4 + 3] > 10) continue;
          }
          const t = 1 - d / RADIUS;
          // values shuffle while lit, decoding-style
          if (Math.random() < 0.025 * t) cells[i] = randHex();
          ctx.fillStyle = `rgba(241, 103, 103, ${t * t * 0.3 * intensity})`;
          ctx.fillText(cells[i], x, y);
        }
      }
    };

    const onMove = (e) => {
      pointer.clientX = e.clientX;
      pointer.clientY = e.clientY;
      targetIntensity = 1;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        targetIntensity = 0;
      }, 1500);
    };

    // stop drawing while the section is offscreen
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(wrap);

    build();
    draw();
    window.addEventListener("resize", build);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idleTimer);
      io.disconnect();
      window.removeEventListener("resize", build);
      window.removeEventListener("mousemove", onMove);
    };
  }, [maskSelector]);

  return (
    <div ref={wrapRef} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-clip">
      <canvas ref={canvasRef} className="sticky top-0 block" />
    </div>
  );
}
