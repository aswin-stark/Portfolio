import { useEffect, useRef, useState } from "react";

/**
 * Dual-layer cursor: a lerped outline ring plus a dot pinned to the pointer.
 *
 * Both layers are composited (translate3d only) and driven by ONE mousemove
 * listener. Hover state uses event delegation so content mounted later still
 * gets it. The native cursor is never hidden.
 */
export default function Cursor() {
  const ring = useRef(null);
  const dot = useRef(null);

  /* Resolved once at mount — a coarse pointer or reduced-motion preference
     means this component never renders anything at all. */
  const [enabled] = useState(
    () =>
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (!enabled) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf;
    let seen = false;

    const onMove = (e) => {
      /* Stay invisible until the pointer actually moves, otherwise a ring
         parks itself in the middle of the screen on load. */
      if (!seen) {
        seen = true;
        pos.x = e.clientX;
        pos.y = e.clientY;
        if (ring.current) ring.current.style.opacity = "1";
        if (dot.current) dot.current.style.opacity = "1";
      }
      target.x = e.clientX;
      target.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onOver = (e) => {
      if (!ring.current) return;
      const hit = e.target.closest("a, button, [data-cursor]");
      ring.current.classList.toggle("cursor--hover", !!hit);
      ring.current.dataset.label = hit?.dataset.cursor ?? "";
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.16;
      pos.y += (target.y - pos.y) * 0.16;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ring} className="cursor-ring" style={{ opacity: 0 }} aria-hidden />
      <div ref={dot} className="cursor-dot" style={{ opacity: 0 }} aria-hidden />
    </>
  );
}
