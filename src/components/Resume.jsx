import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { GraduationCap, BookOpen, Search, Target } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const education = [
  {
    title: "Master of Computer Applications (MCA)",
    duration: "2024 – 2026",
    place: "SRM Institute of Science & Technology",
    desc: "Specialized in software engineering, database management, and advanced programming concepts.",
    icon: <GraduationCap size={18} />,
  },
  {
    title: "Bachelor of Computer Applications (BCA)",
    duration: "2021 – 2024",
    place: "Ramakrishna Mission Vivekananda College",
    desc: "Foundation in computer science, programming fundamentals, and web development technologies.",
    icon: <BookOpen size={18} />,
  },
];

/* Honest stand-in for a traditional "work experience" timeline while just starting out */
const focus = [
  {
    title: "Actively Job Hunting",
    duration: "Present",
    place: "Open to Full-Time & Internship Roles",
    desc: "Looking for Python Developer opportunities — remote or based in Chennai.",
    icon: <Search size={18} />,
  },
  {
    title: "Core Focus",
    duration: "Ongoing",
    place: "Backend & API Development",
    desc: "Sharpening skills in Python, REST APIs, and database-driven applications.",
    icon: <Target size={18} />,
  },
];

function Timeline({ items }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  return (
    <div ref={ref} className="relative pl-9">
      {/* Track + the rule that draws downward on scroll */}
      <span className="absolute left-0 top-0 h-full w-px bg-hair" aria-hidden />
      <motion.span
        aria-hidden
        style={reduce ? { scaleY: 1 } : { scaleY }}
        className="absolute left-0 top-0 h-full w-px origin-top bg-accent"
      />

      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.12} className="relative mb-10 last:mb-0">
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.15 }}
            className="absolute -left-[3.15rem] top-0 flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-ink text-accent"
          >
            {item.icon}
          </motion.span>

          <div className="rounded-card border border-hair bg-surface p-6 transition-colors duration-300 hover:border-accent/40">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-base">{item.title}</h4>
              <span className="rounded-pill bg-accent/10 px-3 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                {item.duration}
              </span>
            </div>
            <p className="mb-2 font-display text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              {item.place}
            </p>
            <p className="text-sm leading-relaxed text-mute">{item.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function Resume() {
  return (
    <section id="resume" className="section-shell overflow-hidden">
      <span className="watermark absolute right-6 top-12 text-[16vw]" aria-hidden>
        Resume
      </span>

      <div className="shell relative">
        <SectionHeading eyebrow="My Journey" title="Resume &" highlight="Background" />

        <div className="grid gap-14 md:grid-cols-2">
          <div>
            <h3 className="mb-8 flex items-center gap-2.5 text-lg">
              <span className="h-2 w-2 rounded-full bg-accent" /> Education
            </h3>
            <Timeline items={education} />
          </div>
          <div>
            <h3 className="mb-8 flex items-center gap-2.5 text-lg">
              <span className="h-2 w-2 rounded-full bg-accent" /> Right Now
            </h3>
            <Timeline items={focus} />
          </div>
        </div>
      </div>
    </section>
  );
}
