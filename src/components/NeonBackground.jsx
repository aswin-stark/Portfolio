import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function NeonBackground() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 200, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  const [stars, setStars] = useState([]);
  useEffect(() => {
    const starArray = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      color: `hsl(${Math.random() * 360}, 80%, 70%)`,
    }));
    setStars(starArray);

    const interval = setInterval(() => {
      setStars((prevStars) =>
        prevStars.map((s) => {
          let newX = s.x + 0.3;
          let newY = s.y + 0.2;
          if (newX > window.innerWidth) newX = 0;
          if (newY > window.innerHeight) newY = 0;
          return { ...s, x: newX, y: newY };
        })
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <motion.div
        style={{ x: springX, y: springY }}
        className="fixed top-0 left-0 w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full pointer-events-none mix-blend-screen shadow-xl z-50"
      />
      {stars.map((star, idx) => (
        <div
          key={idx}
          style={{
            width: star.size,
            height: star.size,
            top: star.y,
            left: star.x,
            backgroundColor: star.color,
            boxShadow: `0 0 6px ${star.color}, 0 0 12px ${star.color}`,
          }}
          className="absolute rounded-full opacity-70"
        />
      ))}
    </>
  );
}