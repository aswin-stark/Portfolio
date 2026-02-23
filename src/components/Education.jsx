import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen } from "lucide-react";

export default function Education() {
  const educationData = [
    {
      title: "Master of Computer Applications (MCA)",
      duration: "2024 – 2026",
      university: "SRM INSTITUTE OF SCIENCE & TECHNOLOGY",
      description:
        "Specialized in software engineering, database management, and advanced programming concepts. Focused on building scalable web applications and backend systems.",
      icon: <GraduationCap size={24} />,
      gradient: "from-purple-600/20 to-indigo-600/20",
    },
    {
      title: "Bachelor of Computer Applications (BCA)",
      duration: "2021 – 2024",
      university: "RAMAKRISHNA MISSION VIVEKANANDA COLLEGE",
      description:
        "Foundation in computer science, programming fundamentals, and web development technologies.",
      icon: <BookOpen size={24} />,
      gradient: "from-blue-600/20 to-cyan-600/20",
    },
  ];

  const [stars, setStars] = useState([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const starArray = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.1,
      color: `hsl(${Math.random() * 360}, 80%, 70%)`,
      depth: Math.random() * 0.5 + 0.2,
    }));
    setStars(starArray);

    const interval = setInterval(() => {
      setStars(prev =>
        prev.map(s => {
          let newX = s.x + s.speed * 2;
          let newY = s.y + s.speed * 1.2;
          if (newX > window.innerWidth) newX = 0;
          if (newY > window.innerHeight) newY = 0;
          return { ...s, x: newX, y: newY };
        })
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = e => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="education"
      className="min-h-screen relative text-white px-4 sm:px-6 md:px-6 py-16 sm:py-24 overflow-hidden"
    >
      {/* Neon Stars */}
      {stars.map((star, idx) => {
        const offsetX = (mouse.current.x - window.innerWidth / 2) * star.depth * 0.02;
        const offsetY = (mouse.current.y - window.innerHeight / 2) * star.depth * 0.02;
        return (
          <div
            key={idx}
            style={{
              width: star.size,
              height: star.size,
              top: star.y + offsetY,
              left: star.x + offsetX,
              backgroundColor: star.color,
              boxShadow: `0 0 8px ${star.color}, 0 0 16px ${star.color}`,
            }}
            className="absolute rounded-full opacity-70 animate-pulse"
          />
        );
      })}

      {/* Section Header */}
      <div className="text-center mb-16 sm:mb-20 relative z-10">
        <span className="px-3 py-1 text-sm sm:text-base bg-white/10 border border-white/10 rounded-full animate-pulse">
          Education
        </span>

        <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl font-bold">
          Academic{" "}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Background
          </span>
        </h2>

        <p className="text-gray-400 mt-2 sm:mt-4 text-sm sm:text-base">
          My educational journey and qualifications
        </p>
      </div>

      {/* Education Cards */}
      <div className="max-w-4xl mx-auto flex flex-col gap-8 sm:gap-12 relative z-10">
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 80, scale: 0.9, rotate: -1 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
              type: "spring",
              stiffness: 120,
              damping: 15,
            }}
            whileHover={{ scale: 1.03, rotate: 0.5, transition: { type: "spring", stiffness: 180 } }}
            className={`relative bg-gradient-to-r ${edu.gradient} border border-white/20 backdrop-blur-2xl rounded-2xl sm:rounded-[2rem] p-6 sm:p-10 shadow-2xl overflow-hidden group cursor-pointer`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              {/* Icon */}
              <div className="p-4 sm:p-5 bg-white/10 rounded-2xl text-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.8)] transition-all">
                {edu.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                  <h3 className="text-xl sm:text-2xl md:text-2xl font-bold">{edu.title}</h3>
                  <span className="px-3 py-1 sm:px-5 sm:py-2 text-xs sm:text-sm bg-white/10 border border-white/20 rounded-full">
                    {edu.duration}
                  </span>
                </div>

                <p className="text-purple-300 mt-2 sm:mt-3 font-medium text-sm sm:text-lg">{edu.university}</p>

                <p className="text-gray-300 mt-3 sm:mt-4 leading-relaxed text-sm sm:text-base">
                  {edu.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}