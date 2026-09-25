import { PenLine, ArrowUpRight } from "lucide-react";
import { profile } from "../data/profile.js";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Magnetic from "./Magnetic";

const drafts = [
  { topic: "Python", title: "Notes on structuring a Flask project" },
  { topic: "Backend", title: "What I learned building my first REST API" },
  { topic: "Databases", title: "MySQL vs MongoDB, from a beginner's desk" },
];

export default function Blog() {
  return (
    <section id="blog" className="section-shell overflow-hidden">
      <span className="watermark absolute right-6 top-12 text-[16vw]" aria-hidden>
        Blog
      </span>

      <div className="shell relative">
        <SectionHeading
          eyebrow="From My Blog"
          title="Writing"
          highlight="Coming Soon"
          subtitle="I'm working on my first posts about Python, backend architecture, and things I learn along the way."
        />

        <div className="grid gap-5 sm:grid-cols-3">
          {drafts.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.1}>
              <article className="group relative h-full overflow-hidden rounded-card border border-dashed border-hair bg-surface transition-colors duration-300 hover:border-accent/40">
                <div className="relative h-36 overflow-hidden bg-gradient-to-br from-accent/12 via-white/5 to-transparent">
                  <span className="absolute inset-0 flex items-center justify-center">
                    <PenLine size={26} className="text-accent/40" />
                  </span>
                </div>

                <div className="p-7">
                  <span className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                    {d.topic}
                  </span>
                  <h3 className="mt-3 text-base leading-snug text-white/75 transition-colors duration-300 group-hover:text-white">
                    {d.title}
                  </h3>

                  <span className="mt-6 inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-white/30">
                    Draft in progress
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25} className="mt-12 text-center">
          <Magnetic>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-pill border border-hair px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              Follow along on GitHub <ArrowUpRight size={17} />
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
