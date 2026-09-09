import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Github, ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { profile } from "../data/profile.js";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Magnetic from "./Magnetic";

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
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start", skipSnaps: false });
  const [progress, setProgress] = useState(0);

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  useEffect(() => {
    if (!embla) return;
    const onScroll = () => setProgress(Math.max(0, Math.min(1, embla.scrollProgress())));
    onScroll();
    embla.on("scroll", onScroll).on("reInit", onScroll);
    return () => {
      embla.off("scroll", onScroll).off("reInit", onScroll);
    };
  }, [embla]);

  return (
    <section id="portfolio" className="section-shell overflow-hidden">
      <span className="watermark absolute left-6 top-12 text-[16vw]" aria-hidden>
        Work
      </span>

      <div className="shell relative">
        <div className="mb-14 flex flex-col gap-8 sm:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            margin="mb-0"
            eyebrow="Featured Work"
            title="My"
            highlight="Portfolio"
            subtitle="A few projects to showcase here — replace these placeholder cards with your own work."
          />

          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={scrollPrev}
              aria-label="Previous project"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-hair text-white transition-colors duration-200 hover:border-accent hover:bg-accent"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next project"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-hair text-white transition-colors duration-200 hover:border-accent hover:bg-accent"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div
          className="overflow-hidden"
          ref={emblaRef}
          data-cursor="Drag"
          role="group"
          aria-roledescription="carousel"
          aria-label="Selected projects"
        >
          <div className="flex gap-5">
            {projects.map((p, i) => (
              <article
                key={i}
                className="group relative min-w-0 flex-[0_0_100%] overflow-hidden rounded-card border border-dashed border-hair bg-surface transition-colors duration-300 hover:border-accent/50 sm:flex-[0_0_calc(50%-0.625rem)] lg:flex-[0_0_calc(33.333%-0.834rem)]"
                aria-roledescription="slide"
                aria-label={`Project ${i + 1} of ${projects.length}`}
              >
                <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-accent/18 via-white/5 to-transparent">
                  <span className="rounded-pill border border-accent/30 px-4 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                    {p.category}
                  </span>

                  {/* Arrow circle slides in from bottom-right */}
                  <span className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-4 items-center justify-center rounded-full bg-accent text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight size={18} />
                  </span>
                </div>

                <div className="p-7">
                  <h3 className="mb-3 text-lg text-white/80 transition-all duration-300 group-hover:translate-x-2 group-hover:text-white">
                    {p.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-mute">{p.desc}</p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-pill border border-hair bg-surface-2 px-3 py-1 font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">
                    <span className="inline-flex items-center gap-1.5">
                      <Github size={14} /> Add link
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <ArrowUpRight size={14} /> Add link
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Progress-bar pagination — MyStory's best single touch */}
        <div className="mt-10 h-px w-full bg-hair" role="presentation">
          <div
            className="h-px bg-accent transition-[width] duration-150 ease-out"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>

        <Reveal delay={0.2} className="mt-12 text-center">
          <Magnetic>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-pill border border-hair px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <Github size={17} /> View All Projects on GitHub
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
