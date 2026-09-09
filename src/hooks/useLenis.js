import { useEffect } from "react";
import Lenis from "lenis";

/**
 * One scroll engine for the whole page.
 * Not initialised at all under prefers-reduced-motion — native scroll takes over.
 */
export default function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // In-page anchors must go through Lenis, not window.scrollTo,
    // or the two fight each other.
    const onAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -90 });
    };

    document.addEventListener("click", onAnchorClick);

    /* Lenis takes over the scroll before the browser's own hash jump settles,
       so a deep link like /#about would otherwise leave you at the top of the
       page. Re-apply it once layout has settled. */
    let hashTimer;
    const { hash } = window.location;
    if (hash && hash.length > 1) {
      hashTimer = setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) lenis.scrollTo(target, { offset: -90, immediate: true });
      }, 120);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hashTimer);
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
    };
  }, []);
}
