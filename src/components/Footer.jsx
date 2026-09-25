import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiMapPin, FiHeart, FiArrowUp } from "react-icons/fi";
import { profile } from "../data/profile.js";
import Reveal from "./Reveal";
import Marquee from "./Marquee";
import Magnetic from "./Magnetic";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#portfolio" },
  { label: "Resume", href: "#resume" },
  { label: "Skills", href: "#skills" },
  // { label: "Blog", href: "#blog" }, // Blog section hidden
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: <FiGithub />, href: profile.github, label: "GitHub" },
  { icon: <FiLinkedin />, href: profile.linkedin, label: "LinkedIn" },
  { icon: <FiMail />, href: `mailto:${profile.email}`, label: "Email" },
];

const loopText = [
  "Available for opportunities",
  "Let's build something great",
  "Python Developer",
  "Open to work",
];

const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Footer() {
  const year = new Date().getFullYear();
  const [showButton, setShowButton] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    let ticking = false;

    const read = () => {
      setShowButton(window.scrollY > 500);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? window.scrollY / docHeight : 0);
      ticking = false;
    };

    /* rAF-batched so layout is read once per frame, not once per scroll event */
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

  return (
    <footer className="relative overflow-hidden pt-14">
      {/* ── CTA ribbon ────────────────────────────────────── */}
      <div className="relative mb-16 px-6">
        <Reveal className="shell">
          <motion.div
            whileHover={{ scale: reduce ? 1 : 1.012 }}
            transition={{ type: "spring", stiffness: 200, damping: 16 }}
            className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-card bg-accent px-8 py-10 shadow-2xl shadow-accent/25 sm:flex-row"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-black/10 blur-2xl animate-drift" aria-hidden />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl animate-drift-slow" aria-hidden />

            <div className="relative text-center sm:text-left">
              <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] text-ink">Let&apos;s talk!</h2>
              <p className="mt-1.5 font-display text-sm font-medium uppercase tracking-[0.12em] text-ink/70">
                {profile.phone} · {profile.email}
              </p>
            </div>

            <Magnetic>
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-2 rounded-pill bg-ink px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.16em] text-white"
              >
                Get In Touch
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
          </motion.div>
        </Reveal>
      </div>

      <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-accent via-accent-deep to-accent gradient-top-border" aria-hidden />

      {/* ── Main grid ─────────────────────────────────────── */}
      <div className="shell relative grid gap-10 px-6 pb-12 sm:grid-cols-2 md:grid-cols-4">
        <Reveal className="sm:col-span-2">
          <span className="font-display text-2xl font-semibold uppercase tracking-[0.14em] text-white">
            Aswin<span className="text-accent">.</span>
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">
            Python Developer &amp; MCA Graduate crafting scalable, user-focused software — always
            open to new opportunities.
          </p>

          <div className="mt-7 flex items-center gap-3">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={s.label}
                whileHover={reduce ? undefined : { y: -4, rotate: 8, scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-hair text-white transition-colors duration-300 hover:border-accent hover:bg-accent"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 className="mb-5 font-display text-xs font-semibold uppercase tracking-[0.22em] text-white">
            Quick Links
          </h3>
          <ul className="grid grid-cols-2 gap-x-4 text-sm">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="group inline-flex items-center gap-2 py-2.5 text-mute transition-colors duration-300 hover:text-white"
                >
                  <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-3" />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2}>
          <h3 className="mb-5 font-display text-xs font-semibold uppercase tracking-[0.22em] text-white">
            Get In Touch
          </h3>
          <ul className="text-sm">
            <li className="flex items-center gap-2.5">
              <FiMail className="shrink-0 text-accent" />
              <a
                href={`mailto:${profile.email}`}
                className="min-w-0 break-words py-2.5 transition-colors hover:text-white"
              >
                {profile.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <FiPhone className="shrink-0 text-accent" />
              <a
                href={profile.phoneHref}
                className="py-2.5 transition-colors hover:text-white"
              >
                {profile.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5 py-2.5">
              <FiMapPin className="shrink-0 text-accent" /> {profile.location}
            </li>
          </ul>
        </Reveal>
      </div>

      <Marquee items={loopText} duration="34s" variant="ghost" />

      {/* ── Bottom bar ────────────────────────────────────── */}
      <div className="shell relative flex flex-col items-center justify-between gap-4 px-6 py-7 text-sm sm:flex-row">
        <p className="text-mute">© {year} {profile.name}. All rights reserved.</p>
        <p className="flex items-center gap-2 text-mute">
          Built with
          <span className="heartbeat inline-block text-accent">
            <FiHeart />
          </span>
          creative way.
        </p>
      </div>

      {/* ── Scroll to top with progress ring ──────────────── */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center"
          >
            <svg className="absolute inset-0 -rotate-90" width="56" height="56" aria-hidden>
              <circle cx="28" cy="28" r={RADIUS} stroke="rgba(255,255,255,0.12)" strokeWidth="3" fill="none" />
              <circle
                cx="28"
                cy="28"
                r={RADIUS}
                stroke="var(--color-accent)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
              />
            </svg>
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white transition-colors duration-300 hover:bg-accent-deep">
              <FiArrowUp />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
