import { useEffect, useRef } from "react";

/* dragonfly.xyz-style interactive halftone portrait.
   The source photo is sampled into a dot grid (dot size/brightness follow the
   image tone, background masked out via alpha + luminance). The whole grid is
   drawn on a TRANSPARENT canvas, so whatever sits behind it (the red accent
   line, the dark bg) shows through the gaps and is hidden behind the subject.
   On mouse move the dots near the cursor are pushed outward and swell — the
   signature "the image reacts to the pointer" effect. */
export default function HeroDotPortrait({ src, className = "", style }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let raf;
    let ready = false;
    let dots = []; // { gx, gy, lum } normalized grid positions
    let W = 0;
    let H = 0;
    let dpr = 1;
    let visible = true;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, on: 0, target: 0 };

    const resize = () => {
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
    };

    // sample the image into a grid of subject dots (transform-independent)
    const buildDots = (img) => {
      const COLS = 92;
      const aspect = img.height / img.width;
      const cols = COLS;
      const rows = Math.max(1, Math.round(COLS * aspect));
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true });
      octx.drawImage(img, 0, 0, cols, rows);
      const data = octx.getImageData(0, 0, cols, rows).data;
      dots = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const a = data[i + 3] / 255;
          const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
          // keep the lit subject; drop the transparent/near-black background
          if (a < 0.35 || lum < 0.06) continue;
          dots.push({ gx: x / (cols - 1), gy: y / (rows - 1), lum });
        }
      }
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!ready || !visible) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      mouse.x += (mouse.tx - mouse.x) * 0.14;
      mouse.y += (mouse.ty - mouse.y) * 0.14;
      mouse.on += (mouse.target - mouse.on) * 0.08;

      const step = W / 92;
      const baseR = Math.max(0.8, step * 0.28);
      const radius = Math.min(W, H) * 0.17;

      ctx.fillStyle = "#f2efe6";
      for (let k = 0; k < dots.length; k++) {
        const d = dots[k];
        let px = d.gx * W;
        let py = d.gy * H;
        let swell = 0;

        const ddx = px - mouse.x;
        const ddy = py - mouse.y;
        const dist = Math.hypot(ddx, ddy);
        if (dist < radius) {
          const f = 1 - dist / radius;
          const push = f * f * 30 * mouse.on;
          const inv = 1 / (dist || 1);
          px += ddx * inv * push;
          py += ddy * inv * push;
          swell = f * f * 1.1 * mouse.on;
        }

        const r = baseR * (0.45 + d.lum * 0.95) * (1 + swell);
        ctx.globalAlpha = 0.3 + d.lum * 0.7;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
      mouse.target = 1;
    };
    const onLeave = () => {
      mouse.target = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(wrap);

    const img = new Image();
    img.onload = () => {
      resize();
      buildDots(img);
      ready = true;
    };
    img.src = src;

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [src]);

  return (
    <div ref={wrapRef} aria-hidden="true" className={className} style={style}>
      <canvas ref={canvasRef} className="pointer-events-none block size-full" />
    </div>
  );
}
