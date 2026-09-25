/**
 * Two counter-scrolling bands cutting diagonally across the page.
 * Pauses on hover and on keyboard focus. Pure CSS — no plugin.
 */
export default function Marquee({ items, reverse = false, duration = "26s", variant = "solid" }) {
  const solid = variant === "solid";

  return (
    <div
      className={`marquee-track relative overflow-hidden py-3.5 ${
        solid ? "bg-accent" : "bg-surface border-y border-hair"
      }`}
      style={{ "--marquee-duration": duration }}
    >
      {/* Light sweep — only on the solid band, where it reads */}
      {solid && (
        <span
          aria-hidden
          className="animate-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
      )}

      <div
        className={`flex w-max whitespace-nowrap ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`mx-5 sm:mx-7 inline-flex items-center gap-2.5 font-display text-sm sm:text-base font-semibold uppercase tracking-[0.14em] ${
              solid ? "text-ink" : "text-white/55"
            }`}
          >
            {typeof item === "string" ? item : item.label}
            <span className={solid ? "text-ink/40" : "text-accent"}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
