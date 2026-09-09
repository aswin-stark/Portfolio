import { useEffect, useState } from "react";
import { motion, useTransform, useReducedMotion } from "framer-motion";
import { Mail, FileText, Linkedin, Github, ArrowUpRight, ChevronDown } from "lucide-react";
import profilePic from "../assets/profile.webp";
import resume from "../assets/resume.pdf";
import { profile } from "../data/profile.js";
import useTilt from "../hooks/useTilt.js";
import SplitText from "./SplitText";
import Magnetic from "./Magnetic";
import Marquee from "./Marquee";

const EASE = [0.16, 1, 0.3, 1];

/* The preloader clears at ~0.7s; the hero sequence starts as it wipes away
   so the choreography is actually seen rather than played behind a panel. */
const D = 0.7;

const skillsLoop = [
  "Python", "Flask", "FastAPI", "React", "REST APIs",
  "MySQL", "MongoDB", "Git & GitHub", "Automation",
];

const secondLoop = [
  "Available for opportunities", "Backend Engineering",
  "Open to work", "Let's build something",
];

function useTypewriter(words, typingSpeed = 80, deletingSpeed = 40, pause = 1600) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const current = words[index % words.length];
    let timeout;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed);
    } else {
      timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 200);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pause, reduce]);

  return reduce ? words[0] : text;
}

const socials = [
  { icon: <Github size={17} />, href: profile.github, label: "GitHub" },
  { icon: <Linkedin size={17} />, href: profile.linkedin, label: "LinkedIn" },
  { icon: <Mail size={17} />, href: `mailto:${profile.email}`, label: "Email" },
];

function SocialRail() {
  return (
    <div className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          aria-label={s.label}
          {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-hair bg-surface/60 text-white/70 transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-white"
        >
          {s.icon}
        </a>
      ))}
      <span className="mt-1 h-16 w-px bg-hair" />
    </div>
  );
}

const details = [
  { label: "Phone", value: profile.phone, href: profile.phoneHref },
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Address", value: profile.location },
];

/**
 * Mobile/tablet only: a compact portrait that sits beside the name instead of
 * the full-height one that the lg layout puts in its own column.
 * Orbit rings, a breathing halo and a live availability dot.
 */
function CompactAvatar({ reduce }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.72, rotate: reduce ? 0 : -14 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: reduce ? 0.2 : 1, delay: D + 0.35, ease: EASE }}
      className="relative mr-3 shrink-0 sm:mr-4 lg:hidden"
    >
      <span
        aria-hidden
        className="animate-halo absolute -inset-3 rounded-full bg-accent/30 blur-2xl"
      />

      {/* dashed orbit */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="animate-spin-slow absolute -inset-1.5 h-[calc(100%+0.75rem)] w-[calc(100%+0.75rem)]"
      >
        <circle
          cx="50" cy="50" r="47" fill="none"
          stroke="var(--color-accent)" strokeWidth="0.7"
          strokeDasharray="2.5 6" strokeLinecap="round" opacity="0.6"
        />
      </svg>

      {/* counter-rotating arc */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="animate-spin-reverse absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)]"
      >
        <circle
          cx="50" cy="50" r="48" fill="none"
          stroke="var(--color-accent)" strokeWidth="0.6"
          strokeDasharray="34 168" strokeLinecap="round" opacity="0.55"
        />
      </svg>

      <div className="relative h-28 w-28 overflow-hidden rounded-full border border-accent/30 shadow-2xl sm:h-36 sm:w-36">
        <img
          src={profilePic}
          alt={`${profile.name}, ${profile.role}`}
          width="736"
          height="834"
          fetchPriority="high"
          className="animate-slow-zoom h-full w-full object-cover object-top"
        />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent"
        />
        <span aria-hidden className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
      </div>

      {/* availability pulse */}
      <span aria-hidden className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center">
        <span className="absolute h-3.5 w-3.5 animate-ping rounded-full bg-accent/70" />
        <span className="relative h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-ink" />
      </span>
    </motion.div>
  );
}

export default function Hero() {
  const roleText = useTypewriter(profile.roles);
  const reduce = useReducedMotion();
  const { x, y } = useTilt();

  /* Three depth layers — the parallax that replaces MyStory's 1.6MB GIF. */
  const shallowX = useTransform(x, (v) => v * -14);
  const shallowY = useTransform(y, (v) => v * -14);
  const midX = useTransform(x, (v) => v * -30);
  const midY = useTransform(y, (v) => v * -30);
  const deepX = useTransform(x, (v) => v * -52);
  const deepY = useTransform(y, (v) => v * -52);

  /* Cursor spotlight washing over the hero */
  const spotX = useTransform(x, (v) => `${(v + 1) * 50}%`);
  const spotY = useTransform(y, (v) => `${(v + 1) * 50}%`);

  /* Portrait leans toward the pointer in 3D */
  const tiltX = useTransform(y, (v) => v * -7);
  const tiltY = useTransform(x, (v) => v * 9);

  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-0 sm:pt-40">
      <SocialRail />

      {!reduce && (
        <motion.div
          aria-hidden
          style={{
            "--sx": spotX,
            "--sy": spotY,
            background:
              "radial-gradient(680px circle at var(--sx) var(--sy), rgba(255,45,77,0.11), transparent 62%)",
          }}
          className="pointer-events-none absolute inset-0 z-0"
        />
      )}

      <motion.div
        aria-hidden
        style={reduce ? undefined : { x: deepX, y: deepY }}
        className="pointer-events-none absolute -right-24 top-24 h-[30rem] w-[30rem] rounded-full bg-accent/10 blur-[120px]"
      />
      {/* Sits behind the portrait column so it never collides with the CTAs */}
      <motion.span
        aria-hidden
        style={reduce ? undefined : { x: shallowX, y: shallowY }}
        className="watermark pointer-events-none absolute -right-8 top-36 hidden text-[10rem] opacity-[0.018] xl:block"
      >
        Developer
      </motion.span>

      <div className="shell grid items-center gap-14 px-6 lg:grid-cols-[1fr_0.8fr] lg:gap-8">
        {/* ── Left column ─────────────────────────────────── */}
        {/* min-w-0: grid items default to min-width:auto, which lets a long
            unbreakable string push the track wider than the viewport. */}
        <div className="min-w-0">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: D, ease: EASE }}
            className="inline-flex items-center gap-2.5 rounded-pill border border-accent/30 bg-accent/10 px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
              Available for opportunities
            </span>
          </motion.span>

          {/* Below lg the name and a compact portrait sit side by side;
              at lg the portrait moves to its own column and this becomes a block. */}
          <div className="mt-7 flex items-center gap-5 lg:mt-0 lg:block">
            {/* whitespace-nowrap keeps "ASWIN S" on one line — SplitText makes
                every character an inline-block, so without it the name could
                break mid-word on narrow screens. The 2rem floor guarantees it
                still fits beside the avatar at 320px. */}
            <h1 className="min-w-0 flex-1 whitespace-nowrap text-[clamp(2rem,9vw,6.5rem)] leading-[0.92] lg:mt-7">
              <SplitText text={profile.shortName} mode="chars" delay={D + 0.15} />{" "}
              <span className="text-accent">
                <SplitText text="S" mode="chars" delay={D + 0.32} />
              </span>
            </h1>

            <CompactAvatar reduce={reduce} />
          </div>

          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduce ? 0.2 : 0.9, delay: D + 0.45, ease: EASE }}
            className="mt-6 block h-px w-32 origin-left bg-accent"
          />

          <p className="mt-5 font-display text-lg font-semibold uppercase tracking-[0.2em] text-accent sm:text-2xl">
            {roleText}
            {!reduce && (
              <span
                aria-hidden
                className="ml-1 inline-block h-5 w-2 align-middle bg-accent animate-blink"
              />
            )}
          </p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: D + 0.55, ease: EASE }}
            className="mt-6 max-w-lg text-base leading-relaxed text-mute sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          {/* label : value list — MyStory's hero pattern */}
          <ul className="mt-9 max-w-lg border-t border-hair">
            {details.map((d, i) => (
              <li key={d.label} className="overflow-hidden">
                <motion.div
                  initial={{ y: reduce ? 0 : "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: D + 0.7 + i * 0.08, ease: EASE }}
                  className="flex items-baseline justify-between gap-3 border-b border-hair py-3.5"
                >
                  <span className="shrink-0 font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
                    {d.label}
                  </span>
                  {d.href ? (
                    <a
                      href={d.href}
                      className="-my-3 min-w-0 break-words py-3 text-right text-sm font-medium text-white transition-colors duration-200 hover:text-accent"
                    >
                      {d.value}
                    </a>
                  ) : (
                    <span className="min-w-0 break-words text-right text-sm font-medium text-white">
                      {d.value}
                    </span>
                  )}
                </motion.div>
              </li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: D + 1.0, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-pill bg-accent px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-accent-deep"
              >
                Hire Me
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </Magnetic>

            <Magnetic strength={0.25}>
              <a
                href={resume}
                download="ASWIN_Resume.pdf"
                className="inline-flex items-center gap-2.5 rounded-pill border border-hair px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                <FileText size={17} /> Download CV
              </a>
            </Magnetic>
          </motion.div>

          {/* Social row where the fixed rail is hidden */}
          <div className="mt-8 flex items-center gap-3 xl:hidden">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                {...(s.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-hair bg-surface/60 text-white/70 transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-white"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Scroll cue — only where the hero is a single stacked column */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: D + 1.5, ease: EASE }}
            className="mt-12 flex items-center gap-3 lg:hidden"
            aria-hidden
          >
            <span className="h-9 w-px bg-gradient-to-b from-accent to-transparent" />
            <span className="font-display text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35">
              Scroll
            </span>
            <ChevronDown size={14} className="animate-nudge text-accent" />
          </motion.div>
        </div>

        {/* ── Right column: portrait ──────────────────────── */}
        <motion.div
          style={reduce ? undefined : { x: midX, y: midY }}
          className="relative hidden min-w-0 justify-center [perspective:1300px] lg:flex lg:justify-end"
        >
          <motion.div
            style={
              reduce
                ? undefined
                : { rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }
            }
            className="relative w-[19rem] sm:w-[24rem] lg:w-[26rem]"
          >
            {/* Arc that draws itself on */}
            <svg
              aria-hidden
              viewBox="0 0 400 400"
              className="pointer-events-none absolute -inset-10 h-[calc(100%+5rem)] w-[calc(100%+5rem)]"
            >
              <motion.circle
                cx="200"
                cy="200"
                r="185"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray="1163"
                initial={{ strokeDashoffset: 1163 }}
                animate={{ strokeDashoffset: 380 }}
                transition={{ duration: reduce ? 0.2 : 1.6, delay: D + 1.1, ease: EASE }}
                opacity="0.45"
              />
            </svg>

            <div
              className="absolute -inset-6 rounded-[2.5rem] bg-accent/20 blur-3xl"
              style={reduce ? undefined : { transform: "translateZ(-70px)" }}
              aria-hidden
            />

            {/* slow dashed orbit, mirroring the compact mobile avatar */}
            <svg
              aria-hidden
              viewBox="0 0 400 400"
              className="animate-spin-slow pointer-events-none absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)]"
              style={reduce ? undefined : { transform: "translateZ(-30px)" }}
            >
              <circle
                cx="200" cy="200" r="190" fill="none"
                stroke="var(--color-accent)" strokeWidth="1"
                strokeDasharray="3 14" strokeLinecap="round" opacity="0.35"
              />
            </svg>

            <motion.div
              initial={{ clipPath: reduce ? "inset(0% 0 0% 0)" : "inset(100% 0 0% 0)" }}
              animate={{ clipPath: "inset(0% 0 0% 0)" }}
              transition={{ duration: reduce ? 0.2 : 1.1, delay: D + 0.35, ease: EASE }}
              className="relative overflow-hidden rounded-card border border-hair shadow-2xl grain"
            >
              <img
                src={profilePic}
                alt={`${profile.name}, ${profile.role}`}
                width="736"
                height="834"
                fetchPriority="high"
                className="h-[26rem] w-full object-cover sm:h-[30rem] animate-slow-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
              <div className="absolute inset-0 rounded-card ring-1 ring-inset ring-accent/25" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: D + 1.15, ease: EASE }}
              style={reduce ? undefined : { transform: "translateZ(78px)" }}
              className="absolute -left-5 bottom-10 rounded-pill border border-hair bg-surface px-5 py-2.5 shadow-xl"
            >
              <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-white">
                MCA Graduate
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: D + 1.3, ease: EASE }}
              style={reduce ? undefined : { transform: "translateZ(96px)" }}
              className="absolute -right-3 top-10 rounded-pill border border-hair bg-surface px-5 py-2.5 shadow-xl"
            >
              <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Python Dev
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Two counter-scrolling ribbons, flush across the hero base ─── */}
      <div className="relative mt-20 sm:mt-28">
        <Marquee items={skillsLoop} duration="30s" variant="solid" />
        <Marquee items={secondLoop} duration="38s" variant="ghost" reverse />
      </div>
    </section>
  );
}
