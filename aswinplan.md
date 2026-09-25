# ASWIN Portfolio — Redesign Plan

**Direction:** MyStory (`laravel-mystory.mnsithub.com`) — red-on-black editorial portfolio, uppercase condensed display type, heavy scroll choreography.
**Constraint:** keep the modern stack. React 19 + Vite 7 + Tailwind 4 + Framer Motion. **No jQuery, no Bootstrap, no WOW.js.**
**Target:** the MyStory *look and motion*, at roughly **one quarter its weight**.

---

## 0. Why this plan exists

MyStory ships **8.4 MB across ~72 requests** — 1.18 MB of JS of which ~640 KB never executes (jQuery UI, Isotope, AOS, Magnific Popup, SplitText, Jarallax, nice-select are all loaded with zero matching hooks in the markup), plus 3.9 MB in two decorative GIFs.

Our current build is **430 KB JS / 141 KB gzipped** with no dead libraries. We are already ahead architecturally. What we lack is *presence*: real content, a display typeface, and scroll choreography.

**So: steal the art direction and the motion vocabulary. Steal none of the implementation.**

---

## 1. Kill list (do this first — it is 15 minutes)

| Delete | Why |
|---|---|
| `ASSESTS/` (23 MB) | Referenced by nothing in `src/` or `index.html`. `aswin_main.png` alone is 10.6 MB. |
| `CSS/style.css` (1,003 lines) | Orphaned pre-React styles. |
| `check_pos.js`, `overflow_check.js`, `typewriter_check.js` | Throwaway Playwright scripts; Playwright isn't even a dep. Two of them are the current lint failures. |
| `src/assets/LOGO.png` (440 KB), `src/assets/react.svg`, `public/vite.svg` | Unreferenced. |
| `react-router-dom` dep + `BrowserRouter` in `src/main.jsx:10` | Zero routes. Wrapping a single page in a router for nothing. |

**Fix at the same time:**

- `eslint.config.js` — add `eslint-plugin-react` so JSX identifier usage registers. The six `'motion' is defined but never used` errors are false positives caused by its absence.
- `.github/workflows/deploy.yml` — add `cname: aswinstark.me` under the action's `with:`. Right now `peaceiris/actions-gh-pages@v4` force-replaces the branch and `CNAME` lives only on `gh-pages`, not in `dist/`. **One push can take the custom domain down.**
- Rename the workflow from "Deploy Vue.js app".
- Remove the redundant `npm run deploy` gh-pages script — it fights the Action.
- Compress `src/assets/profile.png` (1.5 MB → target under 120 KB WebP). It is the LCP element and it is imported twice.

---

## 2. Dependencies

```bash
npm i lenis embla-carousel-react embla-carousel-autoplay @fontsource-variable/oswald @fontsource/lato
npm un react-router-dom
npm i -D eslint-plugin-react
```

**Deliberate substitutions vs. MyStory:**

| MyStory uses | We use | Saving |
|---|---|---|
| Swiper (141 KB) | Embla (~10 KB) | 131 KB |
| Owl Carousel (44 KB) | CSS marquee | 44 KB |
| GSAP + ScrollTrigger + SplitText (158 KB) | Framer Motion (already installed) | 158 KB |
| jQuery UI (458 KB) | — | 458 KB |
| WOW.js + animate.css (90 KB) | Framer Motion variants | 90 KB |
| Odometer (10 KB) | existing `useCountUp.js` | 10 KB |
| jquery.marquee (9 KB) | CSS `@keyframes marquee` (already in `index.css`) | 9 KB |
| Lenis (13 KB) | **Lenis (13 KB)** — keep, it's the good part | — |

Net: we add ~25 KB and skip ~900 KB.

---

## 3. Design system

Replace the `:root` block in `src/index.css`. Tailwind 4 wants a `@theme` block so the tokens generate utilities.

```css
@import "tailwindcss";
@import "@fontsource-variable/oswald";
@import "@fontsource/lato/400.css";
@import "@fontsource/lato/700.css";
@import "@fontsource/lato/900.css";

@theme {
  /* Color */
  --color-accent:      #ff2d4d;   /* keep our crimson; sits between MyStory's
                                     #e40a2d and our old #ff3355 */
  --color-accent-deep: #c1001f;
  --color-ink:         #0a0a0b;   /* page ground   */
  --color-surface:     #141416;   /* raised cards  */
  --color-surface-2:   #1c1c20;   /* hover / input */
  --color-hair:        #26262b;   /* 1px borders   */
  --color-mute:        #85898c;   /* body text     */

  /* Type */
  --font-display: "Oswald Variable", "Oswald", sans-serif;  /* condensed, UPPERCASE */
  --font-body:    "Lato", system-ui, sans-serif;

  /* Shape */
  --radius-card: 20px;   /* MyStory's signature radius */
  --radius-pill: 999px;

  /* Motion */
  --ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
}
```

### Typography rules (this is what makes it read as MyStory)

- **Every section heading and button label is `font-display`, `uppercase`, weight 600.** This single change does 60% of the visual work.
- Body copy stays Lato, `--color-mute`, `line-height: 1.75`.
- Display scale: `clamp(2.5rem, 6vw, 5.5rem)` for section titles, `clamp(3rem, 9vw, 7rem)` for the hero name.
- Tracking: display `-0.02em`, eyebrows `0.28em`.
- **Eyebrow pattern** above every section title — a small red pulsing dot plus an uppercase label. We already have this in `SectionHeading.jsx`; keep it, restyle to Oswald.

### Layout rules

- Max width `1320px`, gutter `24px`.
- Section rhythm `clamp(6rem, 12vw, 10rem)` vertical.
- Cards: `--radius-card`, `1px solid --color-hair`, `--color-surface` fill. On hover the border goes accent and the card lifts `-6px`.
- **Asymmetry is the point.** MyStory never centers a hero. Left-weighted text, right-weighted image, off-grid decorative shapes bleeding past the container.

---

## 4. Motion system

### Principles

1. **One scroll engine.** Lenis drives everything. Never run a second `window.scrollTo` animation against it.
2. **Enter once, then stop.** `viewport={{ once: true }}` on every reveal. Nothing re-animates on scroll-up — MyStory's `mirror: true` AOS config is a mistake, don't copy it.
3. **Composited properties only.** `transform` and `opacity`. Never animate `left`/`top`/`width`/`height` from a scroll handler.
4. **Stagger is the signature.** Characters at 20 ms, words at 40 ms, cards at 80 ms.
5. **Reduced motion is a real branch**, not a disable flag. See 4.6.

### Timing tokens

| Use | Duration | Easing |
|---|---|---|
| Micro (hover, tap) | 180 ms | `ease-out-quart` |
| Element reveal | 700 ms | `ease-out-expo` |
| Text char reveal | 900 ms, 20 ms stagger | `ease-out-expo` |
| Section curtain | 1100 ms | `ease-out-expo` |
| Marquee loop | 22 s linear | — |

---

### 4.1 Smooth scroll — `src/hooks/useLenis.js`

The one piece of MyStory's JS worth keeping. Their integration is correct; ours drops the GSAP dependency.

```js
import { useEffect } from "react";
import Lenis from "lenis";

export default function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}
```

Call once in `App.jsx`. Also import `lenis/dist/lenis.css`, or set `html.lenis { height: auto }` manually.

---

### 4.2 Split-text reveal — `src/components/SplitText.jsx`

**This is the effect MyStory loads GSAP SplitText for and then never fires** — `.sec-title-animation` has zero matches in their markup, so `title_animation()` bails immediately. We ship it for free with what's already installed.

```jsx
import { motion, useReducedMotion } from "framer-motion";

/**
 * mode="chars" -> dramatic, use on the hero name only
 * mode="words" -> everything else; far cheaper in DOM nodes
 */
export default function SplitText({ text, mode = "words", delay = 0, className = "" }) {
  const reduce = useReducedMotion();
  const units = mode === "chars" ? [...text] : text.split(" ");
  const step = mode === "chars" ? 0.02 : 0.04;

  if (reduce) return <span className={className}>{text}</span>;

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {units.map((u, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 6 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.9,
              delay: delay + i * step,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {u === " " ? " " : u}
            {mode === "words" && " "}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
```

The `overflow-hidden` wrapper is what makes it a **mask reveal** rather than a fade — letters rise out of an invisible slot. That is the difference between "animated" and "expensive-looking".

---

### 4.3 Custom cursor — `src/components/Cursor.jsx`

MyStory's cursor is the right idea, wrongly built: it uses **two separate `mousemove` listeners**, and animates the inner dot with `left`/`top` (paint every frame) while the outer ring uses `translate3d` (composited). The dot visibly lags. Its hover handlers also bind to `document.querySelectorAll('a')` once at init, so the links in their cloned mobile nav never get a hover state.

Ours: one listener, both layers composited, ring lerped for trail, event delegation for hover.

```jsx
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const ring = useRef(null);
  const dot = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;          // never on touch, never on reduced motion
    setEnabled(true);

    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const pos = { ...target };
    let raf;

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      dot.current.style.transform =
        `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };

    // event delegation — works for content mounted later
    const onOver = (e) => {
      const hit = e.target.closest("a, button, [data-cursor]");
      ring.current.classList.toggle("cursor--hover", !!hit);
      ring.current.dataset.label = hit?.dataset.cursor ?? "";
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.16;   // trail
      pos.y += (target.y - pos.y) * 0.16;
      ring.current.style.transform =
        `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    addEventListener("mousemove", onMove, { passive: true });
    addEventListener("mouseover", onOver, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("mousemove", onMove);
      removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
    </>
  );
}
```

**Do not hide the native cursor.** MyStory sets `cursor: none` globally with no escape hatch — a real accessibility problem for low-vision users. Keep the system cursor visible; our ring is an *additive* flourish at low opacity.

**Cursor states to wire via `data-cursor`:** `"View"` on project cards, `"Drag"` on the carousel, `"Play"` on any video.

---

### 4.4 Magnetic button — `src/components/Magnetic.jsx`

Not in MyStory, but it is the cheapest "how did they do that" effect available and it fits the pill-button language.

```jsx
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  const onMove = (e) => {
    if (reduce) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref} style={{ x, y }} onMouseMove={onMove} onMouseLeave={reset}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
```

---

### 4.5 Hero mouse-parallax — `src/hooks/useTilt.js`

MyStory layers two pattern backgrounds plus an animated GIF shape behind the hero portrait — **1.6 MB for a decorative wobble.** We get a better effect from a `useSpring` on pointer position and 0 KB of images: three layers moving at 0.02 / 0.05 / 0.09 depth factors.

---

### 4.6 Reduced motion (non-negotiable)

MyStory has **zero** `prefers-reduced-motion` rules in 680 KB of CSS. We branch properly:

| Effect | Reduced-motion behaviour |
|---|---|
| Lenis | Not initialised — native scroll |
| SplitText | Renders plain text, no split |
| Reveal | Opacity only, 200 ms, no transform |
| Marquee | Paused, static, full text visible |
| Cursor | Not mounted |
| Parallax / tilt | Disabled |
| Counters | Jump straight to final value |
| Preloader | Fades in 100 ms, no bounce |

Global backstop in `index.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 5. Section-by-section build

Order matches the page top to bottom. Existing files in `src/components/` are noted.

### 5.1 Preloader — `Preloader.jsx` *(new)*

MyStory: three bouncing dots on white, `fadeOut(300)` on window load.
Ours: full-bleed `--color-ink` panel, **"ASWIN" in Oswald** with a red progress rule filling underneath, then the panel splits into two halves that slide off vertically (`clip-path` wipe) revealing the hero. Max 900 ms, and it must never block first paint — mount it, don't gate on it.

### 5.2 Header — `Header.jsx` *(rewrite)*

**Current gap:** the nav lists 5 items but `#skills`, `#resume` and `#contact` sections exist and are unreachable; the FAQ section has no `id` at all. Fix the map first.

- Transparent at top, then at 300px scroll a **sticky bar slides down** (`y: -100%` to `0`) with `--color-ink/90` plus `backdrop-blur`.
- Nav items uppercase Oswald 14px, `0.1em` tracking. Active item keeps the red dot we already have.
- Full-screen overlay menu on mobile: items stagger in at 60 ms with a mask reveal, background wipes via `clip-path: inset()`.
- Right side: a magnetic **"HIRE ME"** pill.

### 5.3 Hero — `Hero.jsx` *(rewrite)*

Match MyStory's asymmetric split. **Delete `LowPolyBackground.jsx`** — its cyan/blue palette (`#4cc8ff`) fights the crimson accent and reads as a different site than everything below it. That inconsistency is the biggest visual problem in the current build.

```
+----------------------------------------------------------+
|  * AVAILABLE FOR WORK                                     |
|                                    +-------------------+  |
|  ASWIN S                           |                   |  |
|  ---------                         |  cutout portrait  |  |
|  PYTHON DEVELOPER                  |  + red arc shape  |  |
|                                    |  + grain overlay  |  |
|  MCA Graduate building scalable... |                   |  |
|                                    +-------------------+  |
|  PHONE   : +91 8144721458                                 |
|  EMAIL   : ajayaswin521@gmail.com    <- MyStory's         |
|  ADDRESS : Chennai, India               label:value list  |
|                                                           |
|  ( HIRE ME -> )  ( DOWNLOAD CV )                          |
+-----------------------------------------------------------+
```

**Effects, in fire order:**

| # | Effect | Timing |
|---|---|---|
| 1 | "ASWIN S" — `SplitText mode="chars"` | 0.2 s, 20 ms stagger |
| 2 | Red rule under the name scales `scaleX 0 -> 1` | 0.9 s, `ease-out-expo` |
| 3 | Role line — keep the existing typewriter, restyle to Oswald uppercase | after 1 |
| 4 | Portrait — `clip-path` curtain wipe up, plus 8 s slow `scale(1 -> 1.06)` idle | 0.4 s |
| 5 | Contact list rows — mask reveal, 80 ms stagger | 0.8 s |
| 6 | Buttons — magnetic, fade up | 1.1 s |
| 7 | Decorative arc — SVG `stroke-dashoffset` draw-on | 1.2 s |
| 8 | Three layers pointer-parallax (0.02 / 0.05 / 0.09) | continuous |

Keep the vertical social rail on the left — it already matches MyStory's language.
**Add an `<h1>`.** The current page has none, and MyStory has none either (19 `<h2>`s, zero `<h1>`). Don't inherit that bug.

### 5.4 Marquee ribbon — `Marquee.jsx` *(extract from Hero)*

Already built and already correct. Three upgrades:

1. **Pause on hover** — MyStory has it (`pauseOnHover: true`), ours doesn't.
2. Add a second **counter-scrolling** row below at a different speed. Two opposing bands is the trick that makes it feel designed rather than decorative.
3. `-rotate-2` on the pair so they cut diagonally across the page.

Keep the CSS `@keyframes marquee` already in `index.css` — 0 KB beats their 9 KB plugin.

### 5.5 About — `About.jsx` *(restyle)*

Structure is fine. Changes:

- Headings to Oswald uppercase.
- **Replace the placeholder stats.** `About.jsx:23` currently carries its own `/* NOTE: placeholder figures */` comment, and "100% Quality Focus" reads as filler to any recruiter. Use real countable facts: *Projects Shipped, Technologies, Years Coding, Certifications*.
- Keep `useCountUp.js` — it is a clean rAF implementation with cubic easing and proper cleanup. It replaces MyStory's Odometer (10 KB) at zero cost.
- Add a large ghosted **"ABOUT"** watermark behind the block at 3% opacity, drifting on scroll via `useScroll` plus `useTransform`.

### 5.6 Services — `Services.jsx` *(restyle)*

Six cards is right. Give each a **large ghosted index number** (`01`–`06`) top-right at 6% opacity that brightens to 20% on hover, and slide a red fill up from the bottom edge (`scaleY` from `transform-origin: bottom`) behind the content on hover.

### 5.7 Projects — `Portfolio.jsx` *(rewrite — highest priority)*

> **This is the most important item in the entire plan.** The section currently ships three cards literally titled `"Add Your Project Title"` with `"Add link"` instead of URLs, and it is **live on aswinstark.me right now**. Every other item here is polish; this one is the reason the site exists.

Write real content first, then build:

- **Embla carousel**, 3-up desktop / 1-up mobile, `loop`, drag with `data-cursor="Drag"`.
- **Progress-bar pagination** — a thin red rule that fills across as you advance. This is MyStory's `type: "progressbar"` and it is their best single touch.
- Card hover: image `scale(1.06)`, a red arrow circle sliding in from bottom-right, title shifting `x: 8px`.
- Tags in Oswald uppercase 11px.
- Below the carousel, keep the "View All Projects on GitHub" button, now magnetic.

**Optional upgrade** — replace the grid with a **hover-image-follow list**: project titles stacked as large Oswald rows; hovering a row floats a preview image that tracks the cursor with spring lag. It is the most "extraordinary" effect available at this budget, and it works best with only 3–6 projects, which is exactly our situation.

### 5.8 Resume — `Resume.jsx` *(restyle)*

Timeline is well-built. Add: the vertical rule **draws downward** on scroll (`scaleY` bound to a `useScroll` offset), and each node dot pops with a spring as its card enters.

### 5.9 Skills — `Skills.jsx` *(restyle)*

Bars are already correct (in-view triggered, width-animated). Change the numeral to Oswald and count it up with `useCountUp` in sync with the bar fill, so the number and the bar finish together. Add a faint tick-mark scale behind the track.

### 5.10 Tech strip — `TechStrip.jsx` *(new)*

MyStory has a client-logo carousel. We have no clients — **don't fake it.** Substitute a monochrome tech-stack strip (Python, Flask, FastAPI, React, MySQL, MongoDB, Git, Docker) that is desaturated by default and goes full colour on hover. Same rhythm, honest content.

### 5.11 FAQ — `FAQ.jsx` *(restyle)*

The accordion is already correct and already better than MyStory's jQuery `slideUp`/`slideDown`. Restyle the question to Oswald uppercase and swap the `+` for a rotating `+` to `x`.

**Add `id="faq"` to the section** — it currently has no id, so it can never be linked.

### 5.12 Blog — `Blog.jsx` *(decide)*

Currently three "Coming Soon" skeleton loaders. **Either write one real post or delete the section.** Three skeletons on a live portfolio read as unfinished, not as anticipation. Recommendation: cut it, link a Dev.to/Hashnode profile from the footer instead, restore it when a post exists.

### 5.13 Contact — `Contact.jsx` *(restyle + fix)*

Real bugs to fix while we are in here:

- **Inputs have no labels** — placeholder-only, no `required`, no `aria-label`. Add visually-hidden `<label>`s.
- **No submit/loading state** — double-submit is currently possible. Add `isSending` and disable the button.
- **Status message isn't announced** — wrap it in `role="status" aria-live="polite"`.
- **`mailto:`/`tel:` links carry `target="_blank"`** (`Contact.jsx:143`) — strip it, it opens a stray blank tab.
- Float a giant ghosted **"LET'S TALK"** behind the form.
- Inputs: bottom-rule only; the rule scales from the left and turns red on focus.

### 5.14 Footer — `Footer.jsx` *(restyle)*

Already the strongest component — the CTA ribbon, the watermark, the scroll-progress ring and the marquee are all on-brief. Only changes: watermark to Oswald, and animate the letters of "ASWIN" individually on enter.

### 5.15 Single source of truth — `src/data/profile.js` *(new)*

Contact details are currently copy-pasted across **five places** (Hero, About, Contact, Footer, README). One export, imported everywhere:

```js
export const profile = {
  name: "Aswin S",
  role: "Python Developer",
  email: "ajayaswin521@gmail.com",
  phone: "+91 8144721458",
  location: "Chennai, India",
  github: "https://github.com/aswin-stark",
  linkedin: "https://www.linkedin.com/in/aswin-s-b74136210/",
};
```

> MyStory's own hero shows `Alex.patel@creative.com` as text while the `mailto:` behind it points to `maya.patel@creative.com` — a leftover from a previous demo persona. That is precisely the bug duplicated contact data produces.

---

## 6. Performance budget

Enforce these. If a change breaks a row, the change is wrong.

| Metric | MyStory | Ours today | Target |
|---|---|---|---|
| JS (gzipped) | ~340 KB | 141 KB | **max 175 KB** |
| CSS (gzipped) | ~95 KB | 8 KB | **max 20 KB** |
| Images (total) | 6.48 MB | 1.6 MB | **max 450 KB** |
| Requests | ~72 | ~12 | **max 20** |
| LCP (4G, mid Android) | ~6 s | ~3 s | **under 1.8 s** |
| Dead libraries | ~640 KB | 0 | **0** |

**Rules:**

- Every image WebP, explicit `width`/`height` (no CLS), `loading="lazy"` on everything below the fold. MyStory has `loading="lazy"` on **zero** of its 32 images.
- Hero portrait gets `fetchpriority="high"` and a preload.
- **No animated GIFs, ever.** MyStory spends 3.9 MB on two of them. Anything moving is CSS, SVG, or Framer Motion.
- `@fontsource` self-hosted, `font-display: swap`, **latin subset only**. Note MyStory pulls full Lato/Oswald sets — and our current build does the same with Poppins, shipping a 53 KB Devanagari woff nobody reads.
- Route-level `React.lazy` isn't needed on a single page; keep the one bundle.

---

## 7. Accessibility gates

Pass/fail before deploy. **Each one is a bug MyStory shipped — the point of listing them is not to inherit them.**

- [ ] Exactly one `<h1>`, then a sane `h2` to `h3` order. *(MyStory: 0 `h1`, 19 `h2`)*
- [ ] Every image has meaningful `alt`. *(MyStory: 18 images with `alt="Image"`)*
- [ ] Zero `href="#"` placeholder links. *(MyStory: 30, including every social icon)*
- [ ] `prefers-reduced-motion` branch on every effect in 4.6. *(MyStory: 0 rules)*
- [ ] Visible focus ring on every interactive element, `:focus-visible`, never `outline: none`.
- [ ] Full keyboard path: nav, hero CTAs, carousel (arrow keys), accordion (Enter/Space), form, footer.
- [ ] Contrast at least 4.5:1 for body text. **Check `--color-mute` on `--color-ink`** — mid-grey on near-black is the usual failure in this genre.
- [ ] Accordion exposes `aria-expanded` and `aria-controls`.
- [ ] Carousel: `aria-roledescription="carousel"`, live region on slide change, pause control.
- [ ] Marquee pauses on hover **and** on focus.
- [ ] System cursor never hidden.

---

## 8. SEO / share

`index.html` currently has no description, no OG tags, and `<title>Aswin</title>`. Shared to LinkedIn — the obvious channel for a job-seeking portfolio — it renders as a blank card.

```html
<title>Aswin S — Python Developer &amp; Backend Engineer | Chennai</title>
<meta name="description" content="MCA graduate and Python developer in Chennai building scalable backend systems with Flask, FastAPI, MySQL and MongoDB. Open to full-time roles." />
<meta property="og:type"        content="website" />
<meta property="og:title"       content="Aswin S — Python Developer" />
<meta property="og:description" content="Backend systems, REST APIs, automation. Open to opportunities." />
<meta property="og:image"       content="https://aswinstark.me/og.jpg" />  <!-- 1200x630 -->
<meta property="og:url"         content="https://aswinstark.me" />
<meta name="twitter:card"       content="summary_large_image" />
<link rel="canonical" href="https://aswinstark.me" />
```

Add `Person` JSON-LD with `jobTitle`, `alumniOf`, `knowsAbout`, `sameAs`.

---

## 9. Build order

**Phase 0 — Clean slate** *(~1 hour)*
Kill list in section 1. Fix the eslint config, the `cname:` in the workflow, compress `profile.png`. Ship this alone — pure win, no design risk.

**Phase 1 — Foundation** *(~2 hours)*
Tokens and `@theme` in `index.css`. Oswald/Lato wired. `profile.js`. Reduced-motion backstop. Nothing looks finished yet, but every later step gets cheaper.

**Phase 2 — Motion primitives** *(~3 hours)*
`useLenis`, `SplitText`, `Magnetic`, `Cursor`, upgraded `Reveal`, `useTilt`. Build them in isolation and verify each honours reduced motion before wiring any section.

**Phase 3 — Hero + Header** *(~4 hours)*
The two components that decide whether the site reads as expensive. Delete `LowPolyBackground`. Do not move on until the hero feels right at 390px, 768px and 1440px.

**Phase 4 — Real content** *(~3 hours, blocking)*
Write the three-to-six real projects. Replace About's placeholder stats. Decide Blog's fate. **Not optional and cannot be deferred:** placeholder cards are live on the production domain today.

**Phase 5 — Remaining sections** *(~5 hours)*
Services, Projects, Resume, Skills, Tech strip, FAQ, Contact, Footer — in that order.

**Phase 6 — Polish and gates** *(~3 hours)*
Preloader. Run section 7 top to bottom. Lighthouse on throttled 4G. Verify the perf budget table. Test with reduced motion on, keyboard only, and at 200% zoom.

---

## 10. Definition of done

- [ ] Zero placeholder strings anywhere in `src/` — `grep -ri "add your\|lorem\|placeholder\|coming soon" src/`
- [ ] `npm run lint` exits 0
- [ ] `npm run build` inside the section 6 budget
- [ ] Lighthouse at least 95 across Performance / Accessibility / Best Practices / SEO
- [ ] Every section 7 gate ticked
- [ ] Full pass with `prefers-reduced-motion: reduce` — still legible, navigable and attractive
- [ ] Keyboard-only pass, no trap
- [ ] 390px, 768px, 1440px, 2560px — no horizontal overflow
- [ ] `CNAME` survives a deploy (verify on `gh-pages` after the first push)
- [ ] README rewritten — it currently documents `Education.jsx` and `NeonBackground.jsx` (neither exists), promises a starfield, a neon cursor and a Skills modal (all gone), and omits Services, Portfolio, Resume, FAQ and Blog entirely

---

## Appendix — what we deliberately do *not* copy from MyStory

| Their choice | Why we decline |
|---|---|
| jQuery + jQuery UI (605 KB) | Nothing on the page needs it. Their 458 KB jQuery UI load exists solely for an `easeInOutExpo` easing inside a function with zero elements to scroll. |
| Two carousel libraries (185 KB) | One (Embla, 10 KB) does both jobs. |
| WOW.js + animate.css | Four effects total (`fadeInLeft`, `fadeInRight`, `fadeInUp`, `slideInRight`) for 90 KB. Framer Motion is already in the bundle. |
| Bootstrap CSS (207 KB) | Tailwind is already here. |
| Animated GIF decorations (3.9 MB) | CSS/SVG at 0 KB. |
| `AOS.init({ mirror: true })` | Re-animating on scroll-up is nauseating. Enter once. |
| `cursor: none` globally | Accessibility failure with no opt-out. |
| The `.count-box` block pasted twice, verbatim, in `script.js` | — |
| Unthrottled `$(window).on("scroll")` reading `$("body").height()` every frame | Forced layout every frame — and with Lenis running, that is *every* frame. |
| Contact form posting to `assets/inc/sendemail.php` | A leftover from their plain-HTML edition that Laravel won't even serve. We keep EmailJS. |

**What we do keep:** the art direction (red on black, condensed uppercase display type, asymmetric layout, 20px radius, eyebrow labels, marquee ribbons, ghosted watermarks), the Lenis scroll integration, the carousel progress-bar pagination, and the split-text char reveal they built and forgot to use.
