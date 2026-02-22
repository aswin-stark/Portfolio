import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "@fontsource/orbitron/700.css"; // For titles
import "@fontsource/poppins/400.css";   // For paragraphs

export default function About() {
  // Neon Cursor
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

  // Diagonal Neon Stars
  const [stars, setStars] = useState([]);
  useEffect(() => {
    const starArray = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.7 + 0.2,
      color: `hsl(${Math.random() * 360}, 80%, 70%)`,
    }));
    setStars(starArray);

    const interval = setInterval(() => {
      setStars((prevStars) =>
        prevStars.map((s) => {
          let newX = s.x + s.speed * 2;
          let newY = s.y + s.speed * 1.3;
          if (newX > window.innerWidth) newX = 0;
          if (newY > window.innerHeight) newY = 0;
          return { ...s, x: newX, y: newY };
        })
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen relative text-white px-10 py-32 overflow-hidden font-poppins"
    >
      {/* Neon Cursor */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="fixed top-0 left-0 w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full pointer-events-none mix-blend-screen shadow-2xl z-50"
      />

      {/* Diagonal Neon Stars */}
      {/* {stars.map((star, idx) => (
        <div
          key={idx}
          style={{
            width: star.size,
            height: star.size,
            top: star.y,
            left: star.x,
            backgroundColor: star.color,
            boxShadow: `0 0 8px ${star.color}, 0 0 16px ${star.color}`,
          }}
          className="absolute rounded-full opacity-70 animate-pulse"
        />
      ))} */}

      {/* Title */}
      <div className="text-center mb-20 relative z-10">
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="px-6 py-2 text-lg bg-white/10 rounded-full border border-white/20 animate-pulse tracking-widest"
        >
          About Me
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-8 text-5xl md:text-6xl font-orbitron font-extrabold leading-tight tracking-wide bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
        >
          Who I Am
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-400 mt-4 text-xl md:text-2xl tracking-wide"
        >
          Get to know me better
        </motion.p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center relative z-10">
        {/* Left Card */}
        <motion.div
          initial={{ opacity: 0, x: -80, rotate: -3 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 120 }}
          viewport={{ once: true }}
          className="relative flex justify-center"
        >
          <div className="relative bg-white/5 border border-white/10 backdrop-blur-2xl
            rounded-3xl p-16 w-[360px] h-[400px] flex flex-col items-center justify-center
            shadow-2xl hover:scale-110 hover:rotate-2 transition-transform duration-500">
            {/* Glow */}
            <div className="absolute inset-0 rounded-3xl bg-purple-600 opacity-20 blur-3xl animate-pulse"></div>

            {/* Emoji */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-8xl z-10"
            >
              👨‍💻
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-6 right-6 bg-[#1f1b3a] border border-white/10 px-5 py-2 text-sm rounded-full"
            >
              🐍 Python Dev
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute -bottom-6 left-6 bg-[#1f1b3a] border border-white/10 px-5 py-2 text-sm rounded-full"
            >
              🎓 MCA Graduate
            </motion.div>
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-orbitron font-semibold mb-10 tracking-wide">
            Passionate Python Developer
          </h3>

          {/* Paragraphs */}
          {[
            "I'm Aswin Stark, a dedicated Python Developer with a Master of Computer Applications (MCA) degree. I specialize in building efficient, scalable, and user-focused software solutions that solve real-world problems.",
            "With a strong foundation in programming principles, data structures, and database management, I develop web applications, automation scripts, and backend systems using Python and related technologies.",
            "I'm highly motivated to continuously learn emerging technologies and apply best practices in software development. I'm actively seeking opportunities to contribute my technical expertise and collaborate with dynamic teams.",
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative group text-gray-300 leading-relaxed mb-8 text-lg md:text-xl font-poppins tracking-wide"
            >
              {/* Neon Glow */}
              <span
                className="absolute inset-0 -z-10 scale-x-0 group-hover:scale-x-100
                origin-left transition-transform duration-[1200ms] ease-out
                bg-gradient-to-r from-purple-500/30 via-pink-500/40 to-blue-500/30
                blur-2xl"
              />

              {/* Flowing underline */}
              <span
                className="absolute left-0 bottom-0 w-full h-[4px]
                bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400
                bg-[length:200%_100%] animate-neon-flow
                blur-md opacity-60 group-hover:opacity-100 transition-all duration-500"
              />

              {text}
            </motion.p>
          ))}

          {/* Skills */}
          <div className="flex flex-wrap gap-4 mt-8">
            {["Problem Solver", "Team Player", "Fast Learner", "Detail-Oriented"].map(
              (skill, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 2, boxShadow: "0 0 25px rgba(168,85,247,0.7)" }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="px-6 py-3 text-lg bg-white/10 border border-white/10 rounded-full cursor-default font-poppins tracking-wider"
                >
                  {skill}
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* Neon Flow Animations */}
      <style>{`
        @keyframes neon-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-neon-flow {
          animation: neon-flow 3s linear infinite;
        }
      `}</style>
    </section>
  );
}