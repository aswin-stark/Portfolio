import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import SplitText from "./SplitText";

/**
 * Eyebrow (pulsing dot + uppercase label) over an Oswald display title
 * whose words mask-reveal, with a red rule that scales in underneath.
 */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
  /* Kept separate from `className` so a caller can override it — two competing
     margin utilities on one element are decided by stylesheet order, not by
     which one was passed in. */
  margin = "mb-14 sm:mb-20",
  className = "",
}) {
  const reduce = useReducedMotion();
  const centered = align === "center";

  return (
    <div
      className={`relative ${margin} flex flex-col ${
        centered ? "items-center text-center mx-auto max-w-2xl" : "items-start text-left"
      } ${className}`}
    >
      <Reveal>
        <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-pill border border-accent/30 bg-accent/10">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
            {eyebrow}
          </span>
        </span>
      </Reveal>

      <h2 className="mt-6 text-[clamp(2.25rem,6vw,4rem)]">
        <SplitText text={title} mode="words" delay={0.05} />{" "}
        <SplitText text={highlight} mode="words" delay={0.12} className="text-accent" />
      </h2>

      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: reduce ? 0.2 : 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={`mt-5 block h-px w-24 bg-accent origin-left ${centered ? "mx-auto" : ""}`}
      />

      {subtitle && (
        <Reveal delay={0.15}>
          <p className="mt-6 text-mute text-base sm:text-lg leading-relaxed max-w-xl">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
