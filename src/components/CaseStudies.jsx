import { useEffect, useRef } from "react";
import HexGrid from "./HexGrid.jsx";

// meech213.com-style horizontal showcase: a wide field of tilted case-study
// cards driven by wheel/drag with lerped inertia; velocity skews the cards
// while the field is moving and they settle upright as it stops.

const imgRiqsWeb = "/assets/01b079747853473476a56c1110e5349c011b0407.png";
const imgRiqsMobile = "/assets/0b19b6ba52627fe4db5c413523518e7d4390e4ae.png";
const imgMetro = "/assets/bf6e07a7c2c0d1b3324cf94624a8454cb84c6b0d.png";
const imgAiChat = "/assets/b0191a30584e4ed37ce1640236532481efa0be4e.png";
const imgCalendar = "/assets/b815200441007cae19fe209e699ac4e8f2481020.png";
const imgVoid = "/assets/5b7d0ae6d4a1055465bb974756e8c4fa70f10d5e.png";
const imgQuotes = "/assets/4583dd520e0a8771b47d3b7187a1b151c258995c.png";
const imgBreathing = "/assets/7650c3b8ff96600e8c34feec39558dbc7adb9018.png";
const imgCrmzoo = "/assets/0cd21a053806287e63d372fd804878164d4dce04.png";
const imgDiscover = "/assets/3a153bdae32318c674896aafac82bf3f43f4beae.png";
const imgNinja = "/assets/664f92d3f7e23a196fa99748074ef3af791931cf.png";
const imgBulkflow = "/assets/15f31c724ab23f5c12da0e0aa9d375e1b62452d5.png";

// x in track px, y as % of viewport height; rot = resting angle, speed = parallax factor
const ITEMS = [
  { img: imgQuotes, title: "Quotify/ Mobile App", desc: "Daily inspiration with a swipe — a minimal quote experience.", x: 30, y: 30, w: 320, rot: -6, speed: 1.05 },
  { img: imgRiqsMobile, title: "RiQS Mobile App/ Revamp (2025)", desc: "Field-ready day planning, absence and checklist flows.", x: 430, y: 4, w: 300, rot: 4, speed: 0.9 },
  { img: imgVoid, title: "Void Widget/ iOS Widgets", desc: "Minimal home & lock screen widgets that stand out.", x: 820, y: 12, w: 300, rot: -3, speed: 1.15 },
  { img: imgMetro, title: "Dhaka Metro/ Ticket App", desc: "Buy metro tickets online — plan journeys with zero queueing.", x: 1220, y: 26, w: 330, rot: 5, speed: 0.95 },
  { img: imgCalendar, title: "Meeting Calendar/ Mobile App", desc: "Today's meetings, one glance — scheduling without friction.", x: 1650, y: 6, w: 310, rot: -5, speed: 1.1 },
  { img: imgAiChat, title: "AI Companion/ Mobile App", desc: "A calm space to ask anything, designed for focus.", x: 1720, y: 56, w: 290, rot: 3, speed: 0.9 },
  { img: imgCrmzoo, title: "CRMZoo/ Web Platform", desc: "Boost sales and simplify workflows with an all-in-one CRM.", x: 2130, y: 24, w: 380, rot: -4, speed: 1.05 },
  { img: imgBreathing, title: "Breathing Stats/ Wellness", desc: "Sessions, streaks and progress — mindfulness made measurable.", x: 2620, y: 5, w: 310, rot: 6, speed: 0.95 },
  { img: imgNinja, title: "Ninja AI/ Mobile App", desc: "One assistant for images, video and song generation.", x: 2700, y: 58, w: 330, rot: -6, speed: 1.12 },
  { img: imgDiscover, title: "Discover/ AI Explorer", desc: "Point, scan and understand anything around you.", x: 3130, y: 22, w: 350, rot: 4, speed: 0.9 },
  { img: imgBulkflow, title: "BulkFlow/ Banking Web", desc: "Open 10,000 accounts in minutes — bulk banking automation.", x: 3580, y: 10, w: 400, rot: -3, speed: 1.05 },
  { img: imgRiqsWeb, title: "RiQS Praxis Monitor/ Web Application", desc: "Organize shifts, leave schedules and checklists at scale.", x: 3680, y: 60, w: 360, rot: 5, speed: 0.95 },
];

const TRACK_W = 4300;

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

export default function CaseStudies() {
  const rootRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    // the homepage smooth-scroller must not fight the horizontal field
    window.__lenis?.stop();
    const root = rootRef.current;
    const st = { target: 0, current: 0, vel: 0, dragging: false, lastX: 0 };
    let raf;

    const max = () => TRACK_W - window.innerWidth + 120;

    const onWheel = (e) => {
      e.preventDefault();
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      st.target = clamp(st.target + delta * 1.4, 0, max());
    };
    const onDown = (e) => {
      st.dragging = true;
      st.lastX = e.clientX;
      root.classList.add("cursor-grabbing");
    };
    const onMove = (e) => {
      if (!st.dragging) return;
      st.target = clamp(st.target - (e.clientX - st.lastX) * 1.8, 0, max());
      st.lastX = e.clientX;
    };
    const onUp = () => {
      st.dragging = false;
      root.classList.remove("cursor-grabbing");
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const prev = st.current;
      st.current += (st.target - st.current) * 0.075; // meech-style inertia
      st.vel += (st.current - prev - st.vel) * 0.2; // smoothed velocity
      const skew = clamp(st.vel * 0.35, -10, 10);
      itemRefs.current.forEach((el) => {
        if (!el) return;
        const speed = parseFloat(el.dataset.speed);
        const rot = parseFloat(el.dataset.rot);
        el.style.transform = `translate3d(${-st.current * speed}px, 0, 0) rotate(${rot + skew * 0.25}deg) skewX(${skew}deg)`;
      });
    };
    tick();

    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.__lenis?.start();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="bg-ink relative h-screen w-full cursor-grab select-none overflow-hidden"
      data-name="Case Studies Page"
    >
      {/* mouse-reactive hex background */}
      <HexGrid />

      {/* intro text — travels with the field */}
      <div
        ref={(el) => (itemRefs.current[ITEMS.length] = el)}
        data-speed="1"
        data-rot="0"
        className="absolute left-[560px] top-[58%] z-10 will-change-transform"
      >
        <p className="font-serif-display-it accent-gradient-text text-[64px] italic leading-[64px] tracking-[2.56px]">
          Case
          <br />
          Studies
        </p>
        <p className="font-serif-display mt-[8px] pl-[48px] text-[56px] not-italic leading-[62px] tracking-[2.24px] text-white">
          Process.
          <br />
          Purpose. Impact
        </p>
      </div>

      {/* scattered case study cards */}
      {ITEMS.map((item, i) => (
        <div
          key={i}
          ref={(el) => (itemRefs.current[i] = el)}
          data-speed={item.speed}
          data-rot={item.rot}
          className="absolute z-10 will-change-transform"
          style={{ left: item.x, top: `${item.y}%`, width: item.w }}
        >
          <div className="relative w-full overflow-hidden rounded-[8px]" style={{ height: item.w * 0.625 }}>
            <img alt="" draggable="false" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={item.img} />
          </div>
          <p className="font-serif-display mt-[10px] text-[17px] not-italic leading-[20px] tracking-[0.68px] text-white">
            {item.title}
          </p>
          <p className="font-jakarta mt-[4px] text-[12px] font-medium leading-[16px] tracking-[0.48px] text-grey">
            {item.desc}
          </p>
        </div>
      ))}

      {/* scroll hint */}
      <p className="font-jakarta absolute bottom-[28px] right-[32px] z-10 text-[12px] font-medium tracking-[1.2px] text-grey">
        SCROLL / DRAG →
      </p>
    </section>
  );
}
