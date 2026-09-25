import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Panel splits into two halves that slide away vertically, revealing the hero.
 * Purely decorative — it is mounted over the page, never gates first paint,
 * and is capped at ~700ms.
 */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduce ? 100 : 700);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[10000] pointer-events-none"
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: reduce ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Top half */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-ink"
            exit={{ y: reduce ? 0 : "-100%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Bottom half */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-ink"
            exit={{ y: reduce ? 0 : "100%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-5"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <span className="font-display text-4xl sm:text-6xl font-semibold uppercase tracking-[0.2em] text-white">
              Aswin <span className="text-accent">S</span>
            </span>

            <span className="block h-px w-40 overflow-hidden bg-white/10">
              <motion.span
                className="block h-full bg-accent origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduce ? 0.1 : 0.85, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>

            {!reduce && (
              <span className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-accent animate-preloader-bounce"
                    style={{ animationDelay: `${i * 0.14}s` }}
                  />
                ))}
              </span>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
