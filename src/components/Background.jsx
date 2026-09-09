import { useEffect, useRef } from "react";

/**
 * Fixed page ground.
 *
 * DOM layers (gradient, blooms, grid, vignette, grain) sit underneath a canvas
 * that renders a perspective-projected particle field — points travel toward
 * the viewer and the whole field yaws/pitches with the pointer, so the depth is
 * real projection maths rather than a parallax fake.
 *
 * Budget-conscious on purpose: no library, particle count scales with viewport
 * and is hard-capped, DPR capped at 2, the loop stops when the tab is hidden,
 * and under prefers-reduced-motion a single static frame is drawn with no rAF.
 */

const FOV = 340;
const SPREAD = 1500;
const DEPTH = 1300;
const LINK_DIST = 96;

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    let points = [];
    let raf = null;
    let last = performance.now();

    /* pointer-driven yaw/pitch, eased toward the target each frame */
    const target = { x: 0, y: 0 };
    const cam = { x: 0, y: 0 };

    const rand = (a, b) => a + Math.random() * (b - a);

    function spawn(z) {
      return {
        x: rand(-SPREAD, SPREAD),
        y: rand(-SPREAD, SPREAD),
        z: z ?? rand(40, DEPTH),
        accent: Math.random() > 0.34,
        twinkle: rand(0.35, 1),
        speed: rand(0.55, 1.35),
      };
    }

    function build() {
      const area = width * height;
      const count = Math.max(34, Math.min(130, Math.round(area / 11000)));
      points = Array.from({ length: count }, () => spawn());
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      cx = width / 2;
      cy = height / 2;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function draw(dt) {
      ctx.clearRect(0, 0, width, height);

      /* ease the camera toward the pointer */
      cam.x += (target.x - cam.x) * 0.045;
      cam.y += (target.y - cam.y) * 0.045;
      const yaw = cam.x * 0.22;
      const pitch = cam.y * 0.14;
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);

      const projected = [];

      for (const p of points) {
        p.z -= dt * 26 * p.speed;
        if (p.z <= 12) {
          Object.assign(p, spawn(DEPTH));
          continue;
        }

        /* rotate around Y then X, then project */
        const rx = p.x * cosY - p.z * sinY;
        const rz0 = p.x * sinY + p.z * cosY;
        const ry = p.y * cosX - rz0 * sinX;
        const rz = p.y * sinX + rz0 * cosX;
        if (rz <= 12) continue;

        const scale = FOV / (FOV + rz);
        const sx = cx + rx * scale;
        const sy = cy + ry * scale;
        if (sx < -120 || sx > width + 120 || sy < -120 || sy > height + 120) continue;

        projected.push({ sx, sy, scale, accent: p.accent, twinkle: p.twinkle });
      }

      /* links between the nearest points — sells the depth, and the list is
         pre-filtered so this stays a few thousand checks per frame */
      const near = projected.filter((p) => p.scale > 0.42);
      ctx.lineWidth = 1;
      for (let i = 0; i < near.length; i += 1) {
        for (let j = i + 1; j < near.length; j += 1) {
          const dx = near[i].sx - near[j].sx;
          const dy = near[i].sy - near[j].sy;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK_DIST * LINK_DIST) continue;
          const a = (1 - Math.sqrt(d2) / LINK_DIST) * 0.26 * near[i].scale;
          ctx.strokeStyle = `rgba(255, 70, 100, ${a})`;
          ctx.beginPath();
          ctx.moveTo(near[i].sx, near[i].sy);
          ctx.lineTo(near[j].sx, near[j].sy);
          ctx.stroke();
        }
      }

      for (const p of projected) {
        const r = Math.max(0.5, p.scale * 2.9);
        const alpha = Math.min(1, p.scale * 1.2) * p.twinkle;
        ctx.fillStyle = p.accent
          ? `rgba(255, 82, 110, ${alpha})`
          : `rgba(205, 216, 232, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function frame(now) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      draw(dt);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (raf != null || reduce) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      if (raf == null) return;
      cancelAnimationFrame(raf);
      raf = null;
    }

    const onPointer = (e) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    if (reduce) {
      draw(0); // one static frame, no loop
    } else {
      start();
      if (finePointer) window.addEventListener("pointermove", onPointer, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
    }
    window.addEventListener("resize", resize);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink grain" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-[#101013] via-[#0c0c0e] to-ink" />

      <div className="absolute -top-40 -left-40 h-[38rem] w-[38rem] rounded-full bg-accent/12 blur-[140px] animate-drift-slow" />
      <div className="absolute top-1/2 -right-48 h-[32rem] w-[32rem] rounded-full bg-accent-deep/12 blur-[150px] animate-drift" />

      {/* Hairline grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
        }}
      />

      {/* 3D particle field */}
      <canvas ref={canvasRef} className="absolute inset-0 block" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(10,10,11,0.72)_100%)]" />
    </div>
  );
}
