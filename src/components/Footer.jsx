import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiMapPin, FiHeart, FiArrowUp } from "react-icons/fi";
import Reveal from "./Reveal";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: <FiGithub />, href: "https://github.com/aswin-stark", label: "GitHub" },
  { icon: <FiLinkedin />, href: "https://www.linkedin.com/in/aswin-s-b74136210/", label: "LinkedIn" },
  { icon: <FiMail />, href: "mailto:ajayaswin521@gmail.com", label: "Email" },
];

const loopText = ["AVAILABLE FOR OPPORTUNITIES", "LET'S BUILD SOMETHING GREAT", "PYTHON DEVELOPER", "OPEN TO WORK"];

const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const Footer = () => {
  const year = new Date().getFullYear();
  const [showButton, setShowButton] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? window.scrollY / docHeight : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative text-gray-400 overflow-hidden pt-10">
      {/* Watermark */}
      <motion.div
        animate={{ opacity: [0.025, 0.06, 0.025] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-0 top-4 flex justify-center pointer-events-none select-none overflow-hidden"
      >
        <span className="text-[20vw] sm:text-[10rem] font-extrabold tracking-tight text-white leading-none whitespace-nowrap">
          ASWIN
        </span>
      </motion.div>

      {/* ===== Let's Talk CTA ribbon ===== */}
      <div className="relative px-6 mb-16">
        <Reveal className="max-w-6xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.015, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 16 }}
            className="relative -rotate-1 bg-(--accent) rounded-3xl px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl shadow-(--accent)/30 overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-black/10 blur-2xl animate-drift" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-2xl animate-drift-slow" />

            <div className="relative text-center sm:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-black">Let's talk!</h3>
              <p className="text-black/70 text-sm mt-1">+91 8144721458 · ajayaswin521@gmail.com</p>
            </div>
            <a
              href="#contact"
              className="relative group inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 font-semibold bg-black text-white hover:scale-105 transition-transform duration-300"
            >
              Get In Touch
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </Reveal>
      </div>

      {/* Animated gradient top border */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-(--accent) via-(--accent-glow) to-(--accent) gradient-top-border" />

      {/* ===== Main grid ===== */}
      <div className="relative max-w-6xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-10 pb-12">
        <Reveal className="sm:col-span-2 md:col-span-2">
          <h4 className="text-xl font-extrabold text-white mb-3">
            ASWIN<span className="text-(--accent)">.</span>
          </h4>
          <p className="text-sm leading-relaxed max-w-xs">
            Python Developer &amp; MCA Graduate crafting scalable, user-focused software —
            always open to new opportunities.
          </p>
          <div className="flex items-center gap-3 mt-6">
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ y: -4, rotate: 8, scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white
                hover:bg-(--accent) hover:border-(--accent) transition-colors duration-300"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((l, i) => (
              <li key={i}>
                <a href={l.href} className="group inline-flex items-center gap-2 hover:text-white transition-colors duration-300">
                  <span className="w-0 group-hover:w-3 h-px bg-(--accent) transition-all duration-300" />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2}>
          <h4 className="text-white font-semibold mb-4">Get In Touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FiMail className="text-(--accent) shrink-0" /> ajayaswin521@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <FiPhone className="text-(--accent) shrink-0" /> +91 8144721458
            </li>
            <li className="flex items-center gap-2">
              <FiMapPin className="text-(--accent) shrink-0" /> Chennai, India
            </li>
          </ul>
        </Reveal>
      </div>

      {/* ===== Marquee strip ===== */}
      <div className="relative border-y border-white/5 py-3 overflow-hidden bg-white/[0.02]">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...loopText, ...loopText].map((t, i) => (
            <span key={i} className="mx-6 text-xs sm:text-sm font-semibold tracking-widest text-gray-500">
              {t} <span className="text-(--accent) mx-4">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== Bottom bar ===== */}
      <div className="relative max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-6 text-sm">
        <p>© {year} Aswin S. All rights reserved.</p>
        <p className="flex items-center gap-2">
          Built with
          <span className="heartbeat text-(--accent) inline-block">
            <FiHeart />
          </span>
          creative way.
        </p>
      </div>

      {/* ===== Scroll to top with progress ring ===== */}
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
            className="fixed bottom-6 right-6 w-14 h-14 flex items-center justify-center z-[9999]"
          >
            <svg className="absolute inset-0 -rotate-90" width="56" height="56">
              <circle cx="28" cy="28" r={RADIUS} stroke="rgba(255,255,255,0.12)" strokeWidth="3" fill="none" />
              <circle
                cx="28"
                cy="28"
                r={RADIUS}
                stroke="var(--accent)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
              />
            </svg>
            <span className="relative w-10 h-10 rounded-full bg-(--accent) hover:bg-(--accent-dark) flex items-center justify-center text-white transition-colors duration-300">
              <FiArrowUp />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
