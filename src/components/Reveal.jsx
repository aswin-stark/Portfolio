import { motion, useReducedMotion } from "framer-motion";

/**
 * Scroll-in wrapper. Enters once and stays — nothing re-animates on scroll-up.
 * Under reduced motion it degrades to a short opacity fade with no transform.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 34,
  x = 0,
  amount = 0.2,
  className = "",
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount }}
        transition={{ duration: 0.2 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
