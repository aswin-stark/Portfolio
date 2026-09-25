import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { FileText, Code2, Layers, GraduationCap, Sparkles, ArrowDown } from "lucide-react";
import profilePic from "../assets/profile.webp";
import resume from "../assets/resume.pdf";
import { profile } from "../data/profile.js";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SkillsBlock from "./SkillsBlock";
import SplitText from "./SplitText";
import Magnetic from "./Magnetic";
import useCountUp from "./useCountUp";

const EASE = [0.16, 1, 0.3, 1];

const details = [
  { label: "Name", value: profile.name },
  { label: "Degree", value: profile.degree },
  { label: "Email", value: profile.email },
  { label: "Phone", value: profile.phone },
  { label: "Address", value: profile.location },
  { label: "Language", value: profile.language },
  { label: "Availability", value: profile.availability },
];

/* NOTE: placeholder figures — update these with your real numbers */
const highlights = [
  { icon: <Code2 size={14} />, value: 10, suffix: "+", label: "Projects Built" },
  { icon: <Layers size={14} />, value: 15, suffix: "+", label: "Technologies Used" },
  { icon: <GraduationCap size={14} />, value: 2, suffix: "", label: "Degrees Earned" },
  { icon: <Sparkles size={14} />, value: 100, suffix: "%", label: "Quality Focus" },
];

const traits = ["Problem Solver", "Team Player", "Fast Learner"];

/* Circular caption orbiting a solid accent disc, tucked into the portrait corner. */
function RotatingBadge() {
  return (
    <div
      aria-hidden
      className="absolute -bottom-7 -right-5 z-20 flex h-24 w-24 items-center justify-center rounded-full border border-hair bg-ink/90 backdrop-blur sm:h-28 sm:w-28"
    >
      <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path
            id="about-badge-arc"
            d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          />
        </defs>
        <text
          className="font-display"
          fontSize="8.5"
          letterSpacing="1.2"
          fill="#ffffff"
          fillOpacity="0.7"
        >
          <textPath href="#about-badge-arc">
            OPEN TO WORK • AVAILABLE FOR HIRE •
          </textPath>
        </text>
      </svg>

      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white">
        <ArrowDown size={15} />
      </span>
    </div>
  );
}

/* Accent L-brackets at the frame corners */
function Corners() {
  const base = "absolute h-5 w-5 border-accent";
  return (
    <>
      <span aria-hidden className={`${base} -left-1.5 -top-1.5 border-l border-t`} />
      <span aria-hidden className={`${base} -right-1.5 -top-1.5 border-r border-t`} />
      <span aria-hidden className={`${base} -bottom-1.5 -left-1.5 border-b border-l`} />
      <span aria-hidden className={`${base} -bottom-1.5 -right-1.5 border-b border-r`} />
    </>
  );
}

function StatBox({ icon, value, suffix, label, active, delay, index, reduce }) {
  const count = useCountUp(value, active, 1200 + delay);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: reduce ? 0 : -22 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: reduce ? 0.25 : 0.7, delay: index * 0.08, ease: EASE }}
      className="group relative overflow-hidden rounded-xl border border-hair bg-surface px-3.5 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60"
    >
      {/* accent rail wipes down the left edge on hover */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-t from-accent/12 to-transparent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
      />

      <div className="relative flex items-center gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
          {icon}
        </span>
        <p className="font-display text-xl font-semibold leading-none text-white">
          {count}
          <span className="text-accent">{suffix}</span>
        </p>
      </div>

      <p className="relative mt-2 font-display text-[9px] uppercase leading-tight tracking-[0.16em] text-white/40 transition-colors duration-300 group-hover:text-white/70">
        {label}
      </p>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  /* Portrait reveal is state-driven rather than a bare `whileInView`, so a
     missed observer callback can never leave the photo permanently clipped. */
  const photoRef = useRef(null);
  const photoInView = useInView(photoRef, { once: true, amount: 0.3 });
  const [forcedVisible, setForcedVisible] = useState(false);
  const photoShown = photoInView || forcedVisible;

  useEffect(() => {
    if (photoShown) return;
    const check = () => {
      const el = photoRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) setForcedVisible(true);
    };
    const t = setTimeout(check, 1200);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [photoShown]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const markX = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  /* Portrait drifts slower than the page as the section passes */
  const photoY = useTransform(scrollYProgress, [0, 1], ["7%", "-7%"]);

  return (
    <section id="about" ref={sectionRef} className="section-shell overflow-hidden">
      <motion.span
        aria-hidden
        style={reduce ? undefined : { x: markX }}
        className="watermark absolute left-1/2 top-10 -translate-x-1/2 text-[18vw]"
      >
        About
      </motion.span>

      <div className="shell relative">
        <SectionHeading eyebrow="About Me" title="Who" highlight="I Am" />

        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 [&>*]:min-w-0">
          {/* ── Portrait + stats ───────────────────────────── */}
          <div className="flex flex-col items-center lg:items-start">
            {/* The viewport trigger lives here, on the UNCLIPPED wrapper.
                Chromium factors clip-path into intersection, so a element
                clipped to zero height never reports itself as in view — the
                reveal below is driven by variants from this parent instead. */}
            <motion.div
              ref={photoRef}
              style={reduce ? undefined : { y: photoY }}
              className="relative w-[19rem] sm:w-[21rem]"
              initial="hidden"
              animate={photoShown ? "show" : "hidden"}
            >
              {/* offset frame sitting behind the photo */}
              <motion.span
                aria-hidden
                initial={{ opacity: 0, x: -14, y: -14 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
                className="absolute inset-0 translate-x-5 translate-y-5 rounded-card border border-accent/40"
              />

              <div className="absolute -inset-6 rounded-[2rem] bg-accent/15 blur-3xl" aria-hidden />

              {/* Every inset value carries the same unit — mixing `0` and `0%`
                  leaves Framer unable to interpolate, and the image stays clipped. */}
              <motion.div
                variants={{
                  hidden: { clipPath: reduce ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" },
                  show: {
                    clipPath: "inset(0% 0% 0% 0%)",
                    transition: { duration: reduce ? 0.2 : 1.05, ease: EASE },
                  },
                }}
                className="grain relative overflow-hidden rounded-card border border-hair shadow-2xl"
              >
                <img
                  src={profilePic}
                  alt={`${profile.name} at work`}
                  width="736"
                  height="834"
                  loading="lazy"
                  className="h-96 w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              </motion.div>

              <Corners />

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
                className="absolute -top-4 right-6 z-20 rounded-pill border border-hair bg-surface px-4 py-2 shadow-lg"
              >
                <span className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                  Python Dev
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.62, ease: EASE }}
                className="absolute -bottom-4 left-4 z-20 rounded-pill border border-hair bg-surface px-4 py-2 shadow-lg"
              >
                <span className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                  MCA Graduate
                </span>
              </motion.div>

              <RotatingBadge />
            </motion.div>

            <div
              ref={statsRef}
              className="mt-20 grid w-[19rem] grid-cols-2 gap-2.5 [perspective:900px] sm:w-[21rem]"
            >
              {highlights.map((h, i) => (
                <StatBox
                  key={h.label}
                  {...h}
                  index={i}
                  active={statsInView}
                  delay={i * 200}
                  reduce={reduce}
                />
              ))}
            </div>
          </div>

          {/* ── Bio + details ──────────────────────────────── */}
          <div className="relative lg:pl-10">
            {/* hairline rule that draws down beside the copy */}
            <motion.span
              aria-hidden
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.1, ease: EASE }}
              className="absolute left-0 top-1 hidden h-full w-px origin-top bg-gradient-to-b from-accent via-hair to-transparent lg:block"
            />

            <h3 className="mb-5 text-[clamp(1.5rem,3vw,2.25rem)]">
              <SplitText text="Passionate" mode="words" />{" "}
              <span className="text-accent">
                <SplitText text="Python Developer" mode="words" delay={0.1} />
              </span>
            </h3>

            <Reveal delay={0.08}>
              <p className="mb-4 leading-relaxed text-mute">
                I&apos;m Aswin, a dedicated Python Developer with a Master of Computer Applications
                (MCA) degree. I specialize in building efficient, scalable, and user-focused software
                solutions that solve real-world problems.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mb-9 leading-relaxed text-mute">
                With a strong foundation in programming principles, data structures, and database
                management, I develop web applications, automation scripts, and backend systems using
                Python and related technologies — and I&apos;m always looking to learn more.
              </p>
            </Reveal>

            <dl className="mb-10 grid grid-cols-1 border-t border-hair sm:grid-cols-2 sm:gap-x-10">
              {details.map((d, i) => (
                <motion.div
                  key={d.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.55, delay: 0.05 + i * 0.06, ease: EASE }}
                  className="group flex items-baseline justify-between gap-3 border-b border-hair px-1 py-3 transition-colors duration-300 hover:border-accent/40"
                >
                  <dt className="shrink-0 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 transition-colors duration-300 group-hover:text-accent">
                    {d.label}
                  </dt>
                  <dd className="min-w-0 break-words text-right text-sm font-medium text-white">
                    {d.value}
                  </dd>
                </motion.div>
              ))}
            </dl>

            <div className="flex flex-wrap items-center gap-4">
              <Reveal delay={0.1}>
                <Magnetic>
                  <a
                    href={resume}
                    download="ASWIN_Resume.pdf"
                    className="group inline-flex items-center gap-2.5 overflow-hidden rounded-pill bg-accent px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-accent-deep"
                  >
                    <FileText size={17} />
                    Download CV
                  </a>
                </Magnetic>
              </Reveal>

              {traits.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.5, delay: 0.18 + i * 0.09, ease: EASE }}
                  className="cursor-default rounded-pill border border-hair bg-surface px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Skills now live inside About rather than as their own section */}
        <SkillsBlock />
      </div>
    </section>
  );
}
