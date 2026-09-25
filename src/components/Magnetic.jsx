import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Element leans toward the cursor while hovered, springs back on leave.
 * Disabled entirely under reduced motion.
 */
/**
 * `className` carries the display utility. It is NOT merged with a hardcoded
 * `inline-block` — doing that made `hidden sm:block` unwinnable at call sites,
 * since both target `display` and source order decided the winner.
 */
export default function Magnetic({ children, strength = 0.35, className = "inline-block" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18 });
  const y = useSpring(my, { stiffness: 220, damping: 18 });

  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { x, y }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.div>
  );
}
