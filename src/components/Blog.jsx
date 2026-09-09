import { PenLine } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Blog() {
  return (
    <section id="blog" className="relative text-white px-6 py-24 sm:py-28">
      <SectionHeading
        eyebrow="From My Blog"
        title="Writing"
        highlight="Coming Soon"
        subtitle="I'm working on my first posts about Python, backend architecture, and things I learn along the way."
      />

      <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="relative h-full rounded-3xl border border-dashed border-white/15 bg-white/5 overflow-hidden">
              <div className="h-36 bg-white/5 animate-shimmer" style={{
                backgroundImage: "linear-gradient(90deg, transparent, rgba(255,51,85,0.15), transparent)",
              }} />
              <div className="p-6">
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-(--accent) mb-3">
                  Coming Soon
                </span>
                <div className="h-3 w-4/5 rounded bg-white/10 mb-3" />
                <div className="h-3 w-3/5 rounded bg-white/10 mb-6" />
                <span className="inline-flex items-center gap-2 text-sm text-gray-500">
                  <PenLine size={14} /> Draft in progress
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
