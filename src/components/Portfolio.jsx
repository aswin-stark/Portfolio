import { Github, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/* PLACEHOLDER — swap these for your real projects (title, description, tags, links) */
const projects = [
  {
    title: "Add Your Project Title",
    category: "Backend / API",
    desc: "Describe what this project does, the problem it solves, and your role in building it.",
    tags: ["Python", "Flask"],
  },
  {
    title: "Add Your Project Title",
    category: "Full Stack",
    desc: "Describe what this project does, the problem it solves, and your role in building it.",
    tags: ["React", "MongoDB"],
  },
  {
    title: "Add Your Project Title",
    category: "Automation",
    desc: "Describe what this project does, the problem it solves, and your role in building it.",
    tags: ["Python", "Scripting"],
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative text-white px-6 py-24 sm:py-28">
      <SectionHeading
        eyebrow="Featured Work"
        title="My"
        highlight="Portfolio"
        subtitle="A few projects to showcase here — replace these placeholder cards with your own work."
      />

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <Reveal key={i} delay={(i % 3) * 0.1}>
            <div className="group relative h-full rounded-3xl border border-dashed border-white/15 hover:border-(--accent)/50 bg-white/5 overflow-hidden transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-40 flex items-center justify-center bg-gradient-to-br from-(--accent)/20 via-white/5 to-transparent">
                <span className="text-xs font-semibold tracking-widest uppercase text-(--accent) border border-(--accent)/30 rounded-full px-3 py-1">
                  {p.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold mb-2 text-gray-300 group-hover:text-white transition-colors">
                  {p.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.desc}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tags.map((t, idx) => (
                    <span key={idx} className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-gray-400">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="inline-flex items-center gap-1"><Github size={14} /> Add link</span>
                  <span className="inline-flex items-center gap-1"><ArrowUpRight size={14} /> Add link</span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3} className="text-center mt-12">
        <a
          href="https://github.com/aswin-stark"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold border border-white/15 hover:border-(--accent) hover:text-(--accent) transition"
        >
          <Github size={18} /> View All Projects on GitHub
        </a>
      </Reveal>
    </section>
  );
}
