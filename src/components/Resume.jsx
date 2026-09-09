import { GraduationCap, BookOpen, Search, Target } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const education = [
  {
    title: "Master of Computer Applications (MCA)",
    duration: "2024 – 2026",
    place: "SRM Institute of Science & Technology",
    desc: "Specialized in software engineering, database management, and advanced programming concepts.",
    icon: <GraduationCap size={20} />,
  },
  {
    title: "Bachelor of Computer Applications (BCA)",
    duration: "2021 – 2024",
    place: "Ramakrishna Mission Vivekananda College",
    desc: "Foundation in computer science, programming fundamentals, and web development technologies.",
    icon: <BookOpen size={20} />,
  },
];

/* Honest stand-in for a traditional "work experience" timeline while just starting out */
const focus = [
  {
    title: "Actively Job Hunting",
    duration: "Present",
    place: "Open to Full-Time & Internship Roles",
    desc: "Looking for Python Developer opportunities — remote or based in Chennai.",
    icon: <Search size={20} />,
  },
  {
    title: "Core Focus",
    duration: "Ongoing",
    place: "Backend & API Development",
    desc: "Sharpening skills in Python, REST APIs, and database-driven applications.",
    icon: <Target size={20} />,
  },
];

function Timeline({ items }) {
  return (
    <div className="relative pl-8 border-l border-white/10">
      {items.map((item, i) => (
        <Reveal key={i} delay={i * 0.12} className="relative mb-10 last:mb-0">
          <span className="absolute -left-[2.55rem] top-0 w-9 h-9 rounded-full bg-(--accent)/15 border border-(--accent)/40 text-(--accent) flex items-center justify-center">
            {item.icon}
          </span>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-(--accent)/40 transition-colors duration-300">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <h4 className="font-bold text-white">{item.title}</h4>
              <span className="text-xs px-3 py-1 rounded-full bg-(--accent)/10 text-(--accent) font-semibold">
                {item.duration}
              </span>
            </div>
            <p className="text-(--accent) text-sm font-medium mb-2">{item.place}</p>
            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function Resume() {
  return (
    <section id="resume" className="relative text-white px-6 py-24 sm:py-28">
      <SectionHeading eyebrow="My Journey" title="Resume &" highlight="Background" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-(--accent)" /> Education
          </h3>
          <Timeline items={education} />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-(--accent)" /> Right Now
          </h3>
          <Timeline items={focus} />
        </div>
      </div>
    </section>
  );
}
