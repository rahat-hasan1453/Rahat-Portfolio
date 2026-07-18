import { useEffect, useRef } from "react";

// fin.com-style reactive background: a faint grid of hex values that
// glows in the site's accent red around the cursor as it moves.
//
// The canvas is viewport-sized and sticky inside its section, so even
// very tall sections (e.g. Case Study at ~5600px) cost one screen of
// pixels instead of a full-height buffer.
const HEX = "0123456789ABCDEF";
const CELL_W = 92;
const CELL_H = 26;
const RADIUS = 280;

// real 6-digit color hex codes (e.g. FFFFFF, 000000, FF0000)
function randHex() {
  let s = "";
  for (let i = 0; i < 6; i++) s += HEX[(Math.random() * 16) | 0];
  return s;
}

export default function HexGrid() {
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
      ctx.font = "13px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const x = c * CELL_W + 14;
          const y = r * CELL_H + 18;
          const d = Math.hypot(x - mouse.x, y - mouse.y);
          if (d >= RADIUS) continue; // cells only light up near the cursor
          const t = 1 - d / RADIUS;
          // values shuffle while lit, decoding-style
          if (Math.random() < 0.025 * t) cells[i] = randHex();
          ctx.fillStyle = `rgba(241, 103, 103, ${t * t * 0.55 * intensity})`;
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
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-clip">
      <canvas ref={canvasRef} className="sticky top-0 block" />
    </div>
  );
}
