import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiPython,
  SiJavascript,
  SiReact,
  SiFlask,
  SiFastapi,
  SiMysql,
  SiMongodb,
  SiGit,
  SiHtml5,
} from "react-icons/si";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/* Self-assessed proficiency — adjust these to match your own confidence level */
const columnA = [
  { name: "Python", icon: <SiPython />, level: 90 },
  { name: "HTML / CSS", icon: <SiHtml5 />, level: 85 },
  { name: "Flask", icon: <SiFlask />, level: 80 },
  { name: "React", icon: <SiReact />, level: 72 },
  { name: "MySQL", icon: <SiMysql />, level: 82 },
];

const columnB = [
  { name: "JavaScript", icon: <SiJavascript />, level: 75 },
  { name: "FastAPI", icon: <SiFastapi />, level: 78 },
  { name: "MongoDB", icon: <SiMongodb />, level: 70 },
  { name: "Git & GitHub", icon: <SiGit />, level: 80 },
];

function SkillBar({ name, icon, level, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="mb-6 last:mb-0">
      <div className="flex items-center justify-between mb-2 text-sm">
        <span className="flex items-center gap-2 text-gray-200 font-medium">
          <span className="text-(--accent)">{icon}</span> {name}
        </span>
        <span className="text-gray-500">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-(--accent-dark) to-(--accent)"
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative text-white px-6 py-24 sm:py-28">
      <SectionHeading
        eyebrow="Technical Skills"
        title="My"
        highlight="Expertise"
        subtitle="Technologies I use to design, build, and ship software."
      />

      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-x-14">
        <Reveal>
          {columnA.map((s, i) => (
            <SkillBar key={s.name} {...s} delay={i * 0.1} />
          ))}
        </Reveal>
        <Reveal delay={0.1}>
          {columnB.map((s, i) => (
            <SkillBar key={s.name} {...s} delay={i * 0.1} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
