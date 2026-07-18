import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Menu from "./components/Menu.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Logos from "./components/Logos.jsx";
import CaseStudy from "./components/CaseStudy.jsx";
import AngleMarque from "./components/AngleMarque.jsx";
import Footer from "./components/Footer.jsx";
import CaseStudies from "./components/CaseStudies.jsx";
import AboutDrawer from "./components/AboutDrawer.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    window.__lenis = lenis;

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  const isCaseStudies = route === "#case-studies";
  const isAbout = route === "#about";

  return (
    <main className="bg-ink min-w-[1440px]">
      <Menu />
      {isCaseStudies ? (
        <CaseStudies />
      ) : (
        <>
          <Hero />
          <About />
          <Logos />
          <CaseStudy />
          <AngleMarque />
          <Footer />
        </>
      )}
      {/* About page — bottom drawer over the current view */}
      <AnimatePresence>
        {isAbout && <AboutDrawer key="about-drawer" onClose={() => (window.location.hash = "")} />}
      </AnimatePresence>
    </main>
  );
}
