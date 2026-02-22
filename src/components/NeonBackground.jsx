import { useEffect, useState } from "react";

export default function NeonBackground() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const createStars = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.6 + 0.2,
      color: `hsl(${Math.random() * 360}, 80%, 70%)`,
    }));

    setStars(createStars);

    const interval = setInterval(() => {
      setStars((prev) =>
        prev.map((s) => ({
          ...s,
          x: (s.x + s.speed) % window.innerWidth,
          y: (s.y + s.speed * 0.8) % window.innerHeight,
        }))
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#1a093e] to-[#090e2a]" />

      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            boxShadow: `0 0 10px ${s.color}`,
          }}
          className="absolute rounded-full opacity-70"
        />
      ))}
    </div>
  );
}