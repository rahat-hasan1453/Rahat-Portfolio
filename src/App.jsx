import { useEffect, useState, lazy, Suspense } from "react";
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
/* Route-level code splitting: a visitor landing on the homepage no longer
   downloads the About page, the Case Studies list and the case study template
   before anything can paint. Each arrives when its route is first opened —
   behind the loading screen that already runs on every navigation, so the
   split is invisible. */
const CaseStudies = lazy(() => import("./components/CaseStudies.jsx"));
const CaseStudyDetail = lazy(() => import("./components/CaseStudyDetail.jsx"));
const AboutPage = lazy(() => import("./components/AboutPage.jsx"));
import PinGate from "./components/PinGate.jsx";
import { isCaseUnlocked } from "./lib/caseAccess.js";
import { getCaseStudy } from "./data/caseStudies.js";
import { useRoute, navigate, slugFromPath } from "./lib/router.js";
import { ROUTES, caseStudyMeta, applyMeta } from "./lib/seo.js";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const route = useRoute();

  /* The About and Case Studies pages are composed on a fixed 1440 canvas. On
     anything narrower the page used to clip it (copy cut off mid-word, right
     rail gone), so publish the shrink ratio and let .fit-1440 zoom to fit.
     Floored so body copy never drops below ~11px — under that the flow layout
     is the better answer, which is what narrow tablets and phones get. */
  useEffect(() => {
    const sync = () => {
      const w = document.documentElement.clientWidth;
      document.documentElement.style.setProperty("--fit-1440", String(Math.min(1, Math.max(0.71, w / 1440))));
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    // a visitor who asked for reduced motion gets the browser's own scrolling
    const calmer = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !calmer,
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

  const isCaseStudies = route === "/case-studies";
  const isCaseStudyDetail = route.startsWith("/case-studies/");

  /* A detail page reached by link or refresh has to ask for the code too —
     the card click is only one of the ways in. While it is locked the Case
     Studies list renders behind the prompt, so closing it leaves the visitor
     somewhere useful instead of on a dead end. The tick (not a subscription
     to the unlock itself) is what re-renders us, so the prompt keeps its
     "you're in" beat on screen before the study takes over. */
  const [accessTick, setAccessTick] = useState(0);
  const lockedSlug = isCaseStudyDetail ? slugFromPath(route) : "";
  const lockedDetail = isCaseStudyDetail && !isCaseUnlocked(lockedSlug);
  const lockedStudy = lockedDetail ? getCaseStudy(lockedSlug) : null;
  const isAbout = route === "/about";
  const loaderVariant = isCaseStudyDetail
    ? "casestudydetail"
    : isCaseStudies
      ? "casestudies"
      : isAbout
        ? "about"
        : "home";

  /* title / description / canonical / OG follow the route — otherwise every
     page reports itself as the homepage in search results, browser history
     and shared links */
  useEffect(() => {
    const meta = isCaseStudyDetail
      ? caseStudyMeta(slugFromPath(route))
      : isAbout
        ? ROUTES.about
        : isCaseStudies
          ? ROUTES.caseStudies
          : ROUTES.home;
    applyMeta(meta);
  }, [route, isAbout, isCaseStudies, isCaseStudyDetail]);

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
    <main className="bg-ink w-full overflow-x-clip">
      {loading && <Loader key={loadKey} variant={loaderVariant} onDone={() => setLoading(false)} />}
      <Menu />
      <Suspense fallback={null}>
        {isAbout ? (
          <AboutPage />
        ) : lockedDetail ? (
          <>
            <CaseStudies />
            <PinGate
              open
              title={lockedStudy?.title}
              slug={lockedSlug}
              onClose={() => navigate("/case-studies")}
              onUnlocked={() => setAccessTick((t) => t + 1)}
            />
          </>
        ) : isCaseStudyDetail ? (
          <CaseStudyDetail key={`${route}-${accessTick}`} />
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
      </Suspense>
    </main>
  );
}
