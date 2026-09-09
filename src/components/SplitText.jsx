import { motion, useReducedMotion } from "framer-motion";

/**
 * Mask reveal — units rise out of an invisible slot rather than fading in.
 * The overflow-hidden wrapper is the whole trick.
 *
 * IMPORTANT: the viewport trigger lives on the OUTER element, never on the
 * translated child. A child sitting at y:110% inside an overflow-hidden parent
 * is clipped out of its own intersection rect, so `whileInView` on the child
 * would never fire and the text would stay permanently hidden.
 *
 * mode="chars" → dramatic, hero name only
 * mode="words" → everything else; far cheaper in DOM nodes
 */
export default function SplitText({
  text,
  mode = "words",
  delay = 0,
  className = "",
  amount = 0.3,
}) {
  const reduce = useReducedMotion();
  const units = mode === "chars" ? [...text] : text.split(" ");
  const step = mode === "chars" ? 0.02 : 0.04;

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  const container = {
    hidden: {},
    show: {
      transition: { delayChildren: delay, staggerChildren: step },
    },
  };

  const unit = {
    hidden: { y: "110%", rotate: 6 },
    show: {
      y: "0%",
      rotate: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      aria-label={text}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {units.map((u, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
        >
          <motion.span className="inline-block" variants={unit}>
            {u === " " ? " " : u}
            {mode === "words" ? " " : null}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
