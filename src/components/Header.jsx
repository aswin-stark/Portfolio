import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/profile.js";
import Magnetic from "./Magnetic";

const EASE = [0.16, 1, 0.3, 1];

/* Every section on the page is reachable from here or from the overlay menu. */
const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#portfolio" },
  { label: "Resume", href: "#resume" },
  // { label: "Blog", href: "#blog" }, // Blog section hidden
];

const overlayItems = [
  ...navItems.slice(0, 4),
  { label: "Skills", href: "#skills" },
  // { label: "Blog", href: "#blog" }, // Blog section hidden
  { label: "Contact", href: "#contact" },
];

/* #skills is a block inside #about now, so it is deliberately not tracked —
   otherwise it would fight #about for the active nav state. */
const trackedIds = [
  "#home", "#about", "#portfolio", "#resume",
  /* "#blog", */ "#contact",
];

const overlaySocials = [
  { icon: <Github size={17} />, href: profile.github, label: "GitHub" },
  { icon: <Linkedin size={17} />, href: profile.linkedin, label: "LinkedIn" },
  { icon: <Mail size={17} />, href: `mailto:${profile.email}`, label: "Email" },
];

/* Two curtains drop in sequence — accent first, ink just behind it — and
   peel back in the opposite order on close. */
const curtain = (inDelay, outDelay) => ({
  closed: { y: "-100%", transition: { duration: 0.5, ease: EASE, delay: outDelay } },
  open: { y: "0%", transition: { duration: 0.55, ease: EASE, delay: inDelay } },
});

function Burger({ onClick, open, compact = false }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open menu"
      aria-expanded={open}
      aria-controls="overlay-menu"
      className={`group relative flex items-center justify-center overflow-hidden rounded-full border border-hair text-white transition-colors duration-300 hover:border-accent lg:hidden ${
        compact ? "h-10 w-10" : "h-11 w-11"
      }`}
    >
      {/* accent disc scales up from the centre on hover */}
      <span
        aria-hidden
        className="absolute inset-0 scale-0 rounded-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
      />
      {/* three rules of uneven length that swap on hover */}
      <span aria-hidden className="relative flex flex-col items-end gap-[5px]">
        <span className="block h-[1.5px] w-5 bg-current transition-all duration-300 group-hover:w-3" />
        <span className="block h-[1.5px] w-3.5 bg-current transition-all duration-300 group-hover:w-5" />
        <span className="block h-[1.5px] w-5 bg-current transition-all duration-300 group-hover:w-3.5" />
      </span>
    </button>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState("home");
  const reduce = useReducedMotion();
  const closeRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = trackedIds.map((id) => document.querySelector(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-locked", open);
    return () => document.body.classList.remove("is-locked");
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Move focus into the panel so keyboard users are not left behind the curtain */
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => closeRef.current?.focus(), 420);
      return () => clearTimeout(t);
    }
  }, [open]);

  return (
    <>
      {/* ── Top bar: transparent over the hero ───────────────── */}
      <header className="absolute top-0 inset-x-0 z-40 px-6 pt-7">
        <div className="shell flex items-center justify-between">
          <a
            href="#home"
            className="font-display text-2xl font-semibold uppercase tracking-[0.14em] text-white"
          >
            Aswin <span className="text-accent">S</span>
          </a>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-9">
            {navItems.map((item) => (
              <NavLink key={item.label} item={item} active={active} />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden sm:inline-block">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-pill bg-accent px-7 py-3 font-display text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-200 hover:bg-accent-deep"
              >
                Hire Me
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Magnetic>

            <Burger onClick={() => setOpen(true)} open={open} />
          </div>
        </div>
      </header>

      {/* ── Sticky bar: slides down past 300px ───────────────── */}
      <AnimatePresence>
        {stuck && !open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: reduce ? 0.15 : 0.5, ease: EASE }}
            className="fixed top-0 inset-x-0 z-50 border-b border-hair bg-ink/90 backdrop-blur-xl"
          >
            <div className="shell flex items-center justify-between px-6 py-4">
              <a
                href="#home"
                className="font-display text-xl font-semibold uppercase tracking-[0.14em] text-white"
              >
                Aswin <span className="text-accent">S</span>
              </a>

              <nav aria-label="Primary sticky" className="hidden lg:flex items-center gap-9">
                {navItems.map((item) => (
                  <NavLink key={item.label} item={item} active={active} />
                ))}
              </nav>

              <div className="flex items-center gap-3">
                <a
                  href="#contact"
                  className="hidden sm:inline-flex items-center gap-2 rounded-pill border border-accent px-6 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-accent transition-colors duration-200 hover:bg-accent hover:text-white"
                >
                  Let&apos;s Talk
                </a>
                <Burger onClick={() => setOpen(true)} open={open} compact />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Full-screen overlay menu ─────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="overlay-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[60] overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* curtain 1: accent */}
            <motion.div
              aria-hidden
              className="absolute inset-0 bg-accent"
              variants={curtain(0, reduce ? 0 : 0.12)}
            />
            {/* curtain 2: ink, lands a beat later */}
            <motion.div
              aria-hidden
              className="grain absolute inset-0 bg-ink"
              variants={curtain(reduce ? 0 : 0.12, 0)}
            />

            {/* atmosphere */}
            <div
              aria-hidden
              className="animate-drift-slow pointer-events-none absolute -right-28 -top-28 h-96 w-96 rounded-full bg-accent/20 blur-[120px]"
            />
            <div
              aria-hidden
              className="animate-drift pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-accent-deep/20 blur-[120px]"
            />
            <span
              aria-hidden
              className="watermark pointer-events-none absolute -right-6 bottom-24 text-[7rem] sm:text-[10rem]"
            >
              Menu
            </span>

            <div className="relative flex h-full flex-col overflow-y-auto px-6 pb-8 pt-7">
              {/* header row */}
              <div className="flex shrink-0 items-center justify-between">
                <motion.span
                  initial={{ opacity: 0, x: -12 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, delay: reduce ? 0 : 0.3, ease: EASE },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  className="font-display text-2xl font-semibold uppercase tracking-[0.14em] text-white"
                >
                  Aswin <span className="text-accent">S</span>
                </motion.span>

                <motion.button
                  ref={closeRef}
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  initial={{ opacity: 0, rotate: reduce ? 0 : -90 }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    transition: { duration: 0.5, delay: reduce ? 0 : 0.3, ease: EASE },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  whileHover={reduce ? undefined : { rotate: 90 }}
                  className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-hair text-white transition-colors duration-300 hover:border-accent hover:bg-accent"
                >
                  {/* dashed ring that spins while the panel is open */}
                  <span
                    aria-hidden
                    className="animate-spin-slow absolute -inset-1.5 rounded-full border border-dashed border-accent/40"
                  />
                  <X size={19} className="relative" />
                </motion.button>
              </div>

              {/* eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: reduce ? 0 : 0.34, ease: EASE },
                }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="mt-10 flex shrink-0 items-center gap-3"
              >
                <span className="h-px w-8 bg-accent" />
                <span className="font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                  Navigation
                </span>
              </motion.div>

              {/* links */}
              <nav aria-label="Overlay" className="mt-4 shrink-0">
                <ul>
                  {overlayItems.map((item, i) => (
                    <li key={item.label} className="overflow-hidden border-b border-white/10">
                      <motion.a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        initial={{ y: "115%", opacity: 0 }}
                        animate={{
                          y: "0%",
                          opacity: 1,
                          transition: {
                            duration: 0.6,
                            delay: reduce ? 0 : 0.4 + i * 0.055,
                            ease: EASE,
                          },
                        }}
                        exit={{
                          y: "40%",
                          opacity: 0,
                          transition: { duration: 0.2, ease: "easeIn" },
                        }}
                        className="group flex items-center gap-4 py-2.5"
                      >
                        <span className="w-6 shrink-0 font-display text-[10px] font-semibold tracking-[0.16em] text-accent/60 transition-colors duration-300 group-hover:text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-[clamp(1.5rem,7.5vw,2.5rem)] font-semibold uppercase leading-tight tracking-tight text-white/70 transition-all duration-300 group-hover:translate-x-2 group-hover:text-accent">
                          {item.label}
                        </span>
                        <ArrowUpRight
                          size={18}
                          className="ml-auto -translate-x-2 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* panel footer */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: reduce ? 0 : 0.9, ease: EASE },
                }}
                exit={{ opacity: 0, transition: { duration: 0.18 } }}
                className="mt-auto shrink-0 pt-10"
              >
                <span className="inline-flex items-center gap-2.5 rounded-pill border border-accent/30 bg-accent/10 px-4 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="font-display text-[10px] font-semibold uppercase tracking-[0.26em] text-accent">
                    Available for work
                  </span>
                </span>

                <a
                  href={`mailto:${profile.email}`}
                  className="mt-5 block break-words font-display text-sm font-semibold uppercase tracking-[0.1em] text-white transition-colors duration-200 hover:text-accent"
                >
                  {profile.email}
                </a>

                <div className="mt-5 flex items-center gap-3">
                  {overlaySocials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      {...(s.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-hair text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-white"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ item, active }) {
  const isActive = active === item.href.slice(1);
  return (
    <a
      href={item.href}
      aria-current={isActive ? "true" : undefined}
      className={`group relative font-display text-sm font-semibold uppercase tracking-[0.12em] transition-colors duration-200 ${
        isActive ? "text-accent" : "text-white/65 hover:text-white"
      }`}
    >
      {item.label}
      <span
        className={`absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />
      {!isActive && (
        <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
      )}
    </a>
  );
}
