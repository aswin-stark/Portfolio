import { useEffect, useRef } from "react";

function createScene(width, height) {
  const particles = Array.from({ length: Math.min(150, Math.floor(width * height / 8500)) }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 0.5 + Math.random() * 1.6,
    speed: 4 + Math.random() * 14,
    phase: Math.random() * Math.PI * 2,
    cyan: Math.random() > 0.23,
  }));

  const circuits = Array.from({ length: 26 }, () => {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const length = 35 + Math.random() * 150;
    const direction = Math.random() > 0.5 ? 1 : -1;
    return { x, y, length, direction, cyan: Math.random() > 0.28 };
  });

  return { particles, circuits, horizon: height * 0.48 };
}

export default function LowPolyBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let scene = { particles: [], circuits: [], horizon: 0 };
    let frame;
    const start = performance.now();

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scene = createScene(width, height);
    }

    function draw(now) {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      const atmosphere = ctx.createLinearGradient(0, 0, width, height);
      atmosphere.addColorStop(0, "#030914");
      atmosphere.addColorStop(0.5, "#07152a");
      atmosphere.addColorStop(1, "#130b20");
      ctx.fillStyle = atmosphere;
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(width * 0.58, scene.horizon, 0, width * 0.58, scene.horizon, width * 0.62);
      glow.addColorStop(0, "rgba(26, 164, 255, 0.19)");
      glow.addColorStop(0.42, "rgba(20, 92, 190, 0.06)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(72, 170, 255, 0.13)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 10; i += 1) {
        const y = scene.horizon + Math.pow(i / 10, 1.7) * (height - scene.horizon + 80);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      for (let i = -10; i <= 10; i += 1) {
        const baseX = width / 2 + i * width * 0.105;
        ctx.beginPath();
        ctx.moveTo(width / 2 + i * 5, scene.horizon);
        ctx.lineTo(baseX, height);
        ctx.stroke();
      }

      scene.circuits.forEach(({ x, y, length, direction, cyan }, index) => {
        const pulse = (Math.sin(t * 1.4 + index) + 1) / 2;
        ctx.strokeStyle = cyan ? `rgba(73, 195, 255, ${0.18 + pulse * 0.18})` : `rgba(255, 76, 108, ${0.14 + pulse * 0.16})`;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + direction * length * 0.35, y);
        ctx.lineTo(x + direction * length * 0.35, y + (index % 2 ? 18 : -18));
        ctx.lineTo(x + direction * length, y + (index % 2 ? 18 : -18));
        ctx.stroke();
        ctx.fillStyle = ctx.strokeStyle;
        ctx.beginPath();
        ctx.arc(x + direction * length, y + (index % 2 ? 18 : -18), 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      scene.particles.forEach((particle) => {
        const y = (particle.y - t * particle.speed) % (height + 20) + 10;
        const alpha = 0.22 + (Math.sin(t * 2 + particle.phase) + 1) * 0.2;
        ctx.fillStyle = particle.cyan ? `rgba(112, 213, 255, ${alpha})` : `rgba(255, 103, 126, ${alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.fillStyle = "rgba(98, 202, 255, 0.68)";
      ctx.shadowColor = "#4cc8ff";
      ctx.shadowBlur = 28;
      ctx.beginPath();
      ctx.arc(width * 0.58, scene.horizon, 2.5 + Math.sin(t * 2) * 1.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      frame = requestAnimationFrame(draw);
    }

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#050506]">
      <canvas ref={canvasRef} className="block" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_94%,rgba(3,5,12,0.9)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(80,180,255,0.025)_1px,transparent_1px)] bg-size-[100%_5px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(2,5,12,0.7)_100%)]" />
    </div>
  );
}
