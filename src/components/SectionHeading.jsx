import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, highlight, subtitle, align = "center" }) {
  const alignment = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  return (
    <Reveal className={`max-w-2xl mb-14 sm:mb-16 flex flex-col ${alignment}`}>
      <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
        {title} <span className="text-[var(--accent)]">{highlight}</span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-gray-400 text-base sm:text-lg leading-relaxed">{subtitle}</p>
      )}
    </Reveal>
  );
}
