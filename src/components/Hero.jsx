import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail, FileText, Linkedin, Github, MapPin, Clock, Code2, Terminal,
  Server, Zap, Atom, Globe, Database, GitBranch, Bot,
} from "lucide-react";
import profilePic from "../assets/profile.png";
import resume from "../assets/resume.pdf";
import Reveal from "./Reveal";
import LowPolyBackground from "./LowPolyBackground";

const roles = ["Python Developer", "Backend Engineer", "MCA Graduate", "Problem Solver"];

function useTypewriter(words, typingSpeed = 80, deletingSpeed = 40, pause = 1600) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
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
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pause]);

  return text;
}

const skillsLoop = [
  { label: "PYTHON", icon: <Code2 size={16} /> },
  { label: "FLASK", icon: <Server size={16} /> },
  { label: "FASTAPI", icon: <Zap size={16} /> },
  { label: "REACT", icon: <Atom size={16} /> },
  { label: "REST APIs", icon: <Globe size={16} /> },
  { label: "MYSQL", icon: <Database size={16} /> },
  { label: "MONGODB", icon: <Database size={16} /> },
  { label: "GIT & GITHUB", icon: <GitBranch size={16} /> },
  { label: "AUTOMATION", icon: <Bot size={16} /> },
];

function ClockLocation() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center lg:justify-start gap-5 text-sm">
      <div className="flex items-center gap-2.5">
        <span className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-(--accent) shrink-0">
          <Clock size={15} />
        </span>
        <div className="text-left">
          <p className="text-[10px] uppercase tracking-wider text-gray-500">Local Time</p>
          <p className="text-white font-mono font-semibold">{time.toLocaleTimeString()}</p>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <span className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-(--accent) shrink-0">
          <MapPin size={15} />
        </span>
        <div className="text-left">
          <p className="text-[10px] uppercase tracking-wider text-gray-500">Location</p>
          <p className="text-white font-semibold">Chennai, India</p>
        </div>
      </div>
    </div>
  );
}

const socials = [
  { icon: <Github size={18} />, href: "https://github.com/aswin-stark" },
  { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/aswin-s-b74136210/" },
  { icon: <Mail size={18} />, href: "mailto:ajayaswin521@gmail.com" },
];

/* Vertical rail fixed to the left edge, like the reference template */
function SocialRail() {
  return (
    <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-4">
      {socials.map((s, i) => (
        <a
          key={i}
          href={s.href}
          target={s.href.startsWith("http") ? "_blank" : undefined}
          rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5
          text-gray-300 hover:text-white hover:bg-(--accent) hover:border-(--accent) transition-colors duration-300"
        >
          {s.icon}
        </a>
      ))}
      <span className="w-px h-16 bg-white/15 mt-1" />
    </div>
  );
}

export default function Hero() {
  const roleText = useTypewriter(roles);

  return (
    <section id="home" className="w-full text-white relative overflow-hidden pt-4 pb-6">
      <LowPolyBackground />
      <SocialRail />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
        {/* ===== Left content ===== */}
        <div className="text-center lg:text-left">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase rounded-full border border-(--accent)/50 text-(--accent)">
              <span className="w-1.5 h-1.5 rounded-full bg-(--accent) animate-pulse" />
              Available for opportunities
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-5 text-4xl sm:text-6xl font-extrabold leading-[1.05] tracking-tight">
              Hi, I'm <span className="text-(--accent)">ASWIN</span>
            </h1>
            <p className="mt-2 text-lg sm:text-xl font-bold tracking-wide text-(--accent) uppercase font-mono min-h-[1.75rem]">
              {roleText}
              <span className="inline-block w-2 h-5 bg-(--accent) ml-1 align-middle animate-blink" />
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-md mx-auto lg:mx-0">
              MCA Graduate building scalable, user-focused backend systems and web
              applications. I turn ideas into working, reliable software.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full px-8 py-3.5 font-semibold
                bg-(--accent) hover:bg-(--accent-dark) hover:scale-105 transition shadow-lg shadow-(--accent)/30 w-full sm:w-auto"
              >
                Hire Me
              </a>
              <a
                href={resume}
                download="ASWIN_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 font-semibold
                border border-white/15 hover:border-(--accent)/60 hover:text-(--accent) transition w-full sm:w-auto"
              >
                <FileText size={18} /> Download CV
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.4} className="lg:hidden">
            <div className="mt-6 flex items-center justify-center gap-3">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5
                  hover:bg-(--accent) hover:border-(--accent) transition-colors duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mt-6">
              <ClockLocation />
            </div>
          </Reveal>
        </div>

        {/* ===== Right: photo ===== */}
        <Reveal delay={0.2} y={0} x={40} className="relative flex justify-center lg:justify-end">
          <div className="relative w-64 sm:w-80">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-(--accent)/25 blur-3xl" />

            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
              <img src={profilePic} alt="ASWIN" className="w-full h-[420px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-(--accent)/30 rounded-[2rem]" />
            </div>

            {/* floating badges */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-6 bg-[#131318] border border-white/10 px-3 py-1.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs sm:text-sm"
            >
              <Code2 size={14} className="text-(--accent)" /> Python Developer
            </motion.div>

            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-4 -left-6 bg-[#131318] border border-white/10 px-3 py-1.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs sm:text-sm"
            >
              <Terminal size={14} className="text-(--accent)" /> MCA Graduate
            </motion.div>
          </div>
        </Reveal>
      </div>

      {/* ===== Marquee ribbon ===== */}
      <Reveal delay={0.55} className="mt-10 sm:mt-14">
        <div className="group relative bg-(--accent) py-3 sm:py-4 overflow-hidden shadow-[0_0_50px_rgba(255,51,85,0.35)]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent w-1/3 animate-shimmer pointer-events-none" />
          <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
            {[...skillsLoop, ...skillsLoop].map((item, i) => (
              <span
                key={i}
                className="mx-4 sm:mx-6 inline-flex items-center gap-2 text-sm sm:text-base font-bold tracking-wide sm:tracking-widest text-black/90"
              >
                <span className="[&_svg]:w-4 [&_svg]:h-4">{item.icon}</span>
                {item.label}
                <span className="mx-2 text-black/40">✦</span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
