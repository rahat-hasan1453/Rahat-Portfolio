import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Loader from "./components/Loader.jsx";
import Menu from "./components/Menu.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Logos from "./components/Logos.jsx";
import CaseStudy from "./components/CaseStudy.jsx";
import AngleMarque from "./components/AngleMarque.jsx";
import Footer from "./components/Footer.jsx";
import CaseStudies from "./components/CaseStudies.jsx";
import CaseStudyDetail from "./components/CaseStudyDetail.jsx";
import AboutPage from "./components/AboutPage.jsx";

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
  const isCaseStudyDetail = route.startsWith("#case-study/");
  const isAbout = route === "#about";
  const loaderVariant = isCaseStudyDetail
    ? "casestudydetail"
    : isCaseStudies
      ? "casestudies"
      : isAbout
        ? "about"
        : "home";

  // show the route's loading screen on first load and on every navigation
  const [loading, setLoading] = useState(true);
  const [loadKey, setLoadKey] = useState(0);
  useEffect(() => {
    setLoading(true);
    setLoadKey((k) => k + 1);
  }, [route]);

  // land at the top whenever we switch into a full-page route
  useEffect(() => {
    if (isAbout || isCaseStudies || isCaseStudyDetail) {
      window.__lenis?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }
  }, [isAbout, isCaseStudies, isCaseStudyDetail]);

  return (
    <main className="bg-ink min-w-[1440px]">
      {loading && <Loader key={loadKey} variant={loaderVariant} onDone={() => setLoading(false)} />}
      <Menu />
      {isAbout ? (
        <AboutPage />
      ) : isCaseStudyDetail ? (
        <CaseStudyDetail />
      ) : isCaseStudies ? (
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
    </main>
  );
}
