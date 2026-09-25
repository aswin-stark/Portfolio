import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { SiPython, SiJavascript, SiReact, SiMysql, SiGit, SiHtml5 } from "react-icons/si";
import useCountUp from "./useCountUp";

const EASE = [0.16, 1, 0.3, 1];

/* Self-assessed proficiency — adjust these to match your own confidence level */
const skills = [
  { name: "Python", icon: <SiPython />, level: 90 },
  { name: "HTML / CSS", icon: <SiHtml5 />, level: 85 },
  { name: "MySQL", icon: <SiMysql />, level: 82 },
  { name: "Git & GitHub", icon: <SiGit />, level: 80 },
  { name: "JavaScript", icon: <SiJavascript />, level: 75 },
  { name: "React", icon: <SiReact />, level: 72 },
];

const R = 34;
const CIRC = 2 * Math.PI * R;
const SPRING = { stiffness: 170, damping: 16, mass: 0.5 };

function SkillCard({ name, icon, level, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const count = useCountUp(level, inView, 1400);

  /* Pointer position across the card, 0..1 per axis */
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [14, -14]), SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-16, 16]), SPRING);
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  /* Drop shadow leans the opposite way to the tilt, so the card reads as lifted */
  const shadowX = useTransform(px, [0, 1], [26, -26]);
  const shadowY = useTransform(py, [0, 1], [26, -26]);
  const boxShadow = useTransform(
    [shadowX, shadowY],
    ([sx, sy]) => `${sx}px ${sy}px 46px rgba(0,0,0,0.55)`
  );

  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const depth = (z) => (reduce ? undefined : { transform: `translateZ(${z}px)` });

  return (
    <div ref={ref} className="[perspective:1300px]">
      <motion.div
        initial={{ opacity: 0, y: 46, rotateX: reduce ? 0 : -38 }}
        animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{
          duration: reduce ? 0.25 : 0.9,
          delay: reduce ? 0 : (index % 3) * 0.09 + Math.floor(index / 3) * 0.08,
          ease: EASE,
        }}
        className="[transform-style:preserve-3d]"
      >
        <motion.article
          onMouseMove={onMove}
          onMouseLeave={reset}
          whileHover={reduce ? undefined : { z: 46 }}
          transition={{ type: "spring", ...SPRING }}
          style={
            reduce
              ? undefined
              : { rotateX, rotateY, boxShadow, transformStyle: "preserve-3d" }
          }
          className="group relative isolate overflow-hidden rounded-card border border-hair bg-gradient-to-b from-surface-2 to-surface px-5 py-9 text-center transition-colors duration-300 hover:border-accent/70"
        >
          {/* deepest plane: ghosted index, parallaxes against the face */}
          <span
            aria-hidden
            style={depth(-42)}
            className="ghost-index pointer-events-none absolute inset-x-0 top-3 text-[5.5rem] group-hover:opacity-[0.14]"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* specular highlight tracking the pointer */}
          {!reduce && (
            <motion.span
              aria-hidden
              style={{
                background:
                  "radial-gradient(circle at var(--gx) var(--gy), rgba(255,255,255,0.20), transparent 55%)",
                "--gx": glareX,
                "--gy": glareY,
              }}
              className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}

          {/* sheen sweeping across on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-1/3 z-10 w-1/3 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[420%]"
          />

          {/* accent wash rising from the base */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-t from-accent/18 to-transparent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
          />

          {/* gauge + icon, lifted well off the card face */}
          <div className="relative mx-auto mb-5 h-[104px] w-[104px]" style={depth(60)}>
            <svg viewBox="0 0 96 96" className="h-full w-full -rotate-90">
              {/* tick ring */}
              <circle
                cx="48" cy="48" r="42" fill="none"
                stroke="var(--color-hair)" strokeWidth="2"
                strokeDasharray="1 5" strokeLinecap="round"
              />
              <circle
                cx="48" cy="48" r={R} fill="none"
                stroke="var(--color-surface-2)" strokeWidth="5"
              />
              <motion.circle
                cx="48" cy="48" r={R} fill="none"
                stroke="var(--color-accent)" strokeWidth="5" strokeLinecap="round"
                strokeDasharray={CIRC}
                initial={{ strokeDashoffset: CIRC }}
                animate={inView ? { strokeDashoffset: CIRC * (1 - level / 100) } : {}}
                transition={{
                  duration: reduce ? 0.3 : 1.5,
                  delay: reduce ? 0 : 0.3 + (index % 3) * 0.09,
                  ease: EASE,
                }}
                style={{ filter: "drop-shadow(0 0 6px rgba(255,45,77,0.55))" }}
              />
            </svg>

            {/* raised disc holding the icon */}
            <span
              style={depth(22)}
              className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full border border-hair bg-ink text-2xl text-accent shadow-lg transition-transform duration-300 group-hover:scale-110"
            >
              {icon}
            </span>
          </div>

          <div style={depth(34)} className="relative">
            <p className="font-display text-base font-semibold uppercase tracking-[0.1em] text-white">
              {name}
            </p>
            <p className="mt-1.5 font-display text-sm font-semibold tracking-[0.16em] text-accent">
              {reduce ? level : count}%
            </p>
          </div>
        </motion.article>
      </motion.div>
    </div>
  );
}

export default function SkillsBlock() {
  const reduce = useReducedMotion();

  return (
    <div id="skills" className="relative mt-28 scroll-mt-28 sm:mt-32">
      <div className="mb-14 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-flex items-center gap-2.5 rounded-pill border border-accent/30 bg-accent/10 px-4 py-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
            Technical Skills
          </span>
        </motion.span>

        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          className="mt-5 text-[clamp(1.75rem,4vw,2.75rem)]"
        >
          My <span className="text-accent">Expertise</span>
        </motion.h3>

        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduce ? 0.2 : 0.9, delay: 0.2, ease: EASE }}
          className="mt-4 block h-px w-20 origin-center bg-accent"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-5 max-w-xl text-sm text-mute sm:text-base"
        >
          Technologies I use to design, build, and ship software.
        </motion.p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
        {skills.map((s, i) => (
          <SkillCard key={s.name} {...s} index={i} />
        ))}
      </div>
    </div>
  );
}
