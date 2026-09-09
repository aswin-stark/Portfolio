import { useEffect } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Pointer parallax. Returns spring-smoothed x/y in the range -1..1,
 * which callers multiply by a depth factor per layer.
 *
 * Replaces MyStory's approach of layering two background images plus a
 * 1.6MB animated GIF behind the hero — same effect, zero bytes.
 */
export default function useTilt() {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, rawX, rawY]);

  return { x, y };
}
