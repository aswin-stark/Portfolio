import { Server, Plug, Database, Globe2, Bot, Bug } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const services = [
  {
    icon: <Server size={26} />,
    title: "Backend Development",
    desc: "Building robust, scalable server-side applications with Python, Flask, and FastAPI.",
  },
  {
    icon: <Plug size={26} />,
    title: "REST API Development",
    desc: "Designing clean, well-documented APIs that connect front-ends to reliable back-end logic.",
  },
  {
    icon: <Database size={26} />,
    title: "Database Design",
    desc: "Structuring efficient, normalized schemas with MySQL and MongoDB for real-world apps.",
  },
  {
    icon: <Globe2 size={26} />,
    title: "Web Development",
    desc: "Crafting responsive, user-focused interfaces using React, Tailwind CSS, and modern JS.",
  },
  {
    icon: <Bot size={26} />,
    title: "Automation & Scripting",
    desc: "Writing Python scripts that eliminate repetitive tasks and streamline workflows.",
  },
  {
    icon: <Bug size={26} />,
    title: "Testing & Debugging",
    desc: "Applying OOP principles and Agile practices to ship clean, dependable software.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative text-white px-6 py-24 sm:py-28">
      <SectionHeading
        eyebrow="What I Do"
        title="My"
        highlight="Services"
        subtitle="A snapshot of the kind of work I'm ready to take on — from backend systems to full web experiences."
      />

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <Reveal key={i} delay={(i % 3) * 0.1}>
            <div className="relative h-full bg-white/5 border border-white/10 rounded-3xl p-8 group overflow-hidden
              hover:border-(--accent)/50 hover:-translate-y-2 transition-all duration-300">
              <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-(--accent)/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="w-14 h-14 rounded-2xl bg-(--accent)/10 text-(--accent) flex items-center justify-center mb-6
                group-hover:bg-(--accent) group-hover:text-white group-hover:scale-110 transition-all duration-300">
                {s.icon}
              </div>

              <h3 className="text-lg font-bold mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{s.desc}</p>

              <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-(--accent) group-hover:gap-3 transition-all duration-300">
                Let's talk <span aria-hidden>→</span>
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
