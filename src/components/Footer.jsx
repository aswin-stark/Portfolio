import React, { useEffect, useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiArrowUp } from "react-icons/fi";

const Footer = () => {
  const year = new Date().getFullYear();
  const [showButton, setShowButton] = useState(false);
  const [stars, setStars] = useState([]);

  // ===== Falling/Moving Stars =====
  useEffect(() => {
    const starArray = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.1,
      color: `hsl(${Math.random() * 360}, 80%, 70%)`,
    }));
    setStars(starArray);

    const interval = setInterval(() => {
      setStars((prev) =>
        prev.map((s) => {
          let newY = s.y + s.speed;
          if (newY > window.innerHeight) newY = 0;
          return { ...s, y: newY };
        })
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  // ===== Scroll detection =====
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ===== Scroll to top =====
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#070714] text-gray-400 py-10 px-6 overflow-hidden">
      {/* Animated Gradient Top Border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 gradient-top-border" />

      {/* Stars Background */}
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

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 z-10">
        {/* Left */}
        <p className="text-sm">© {year} Aswin S. All rights reserved.</p>

        {/* Center Icons with Glow */}
        <div className="flex items-center gap-8 text-lg">
          <a
            href="https://github.com/aswin-stark"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-300 hover:scale-125 hover:shadow-[0_0_12px_rgba(168,85,247,0.7)] text-white p-2 rounded-lg"
          >
            <FiGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/aswin-s-b74136210/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-300 hover:scale-125 hover:shadow-[0_0_12px_rgba(59,130,246,0.7)] text-white p-2 rounded-lg"
          >
            <FiLinkedin />
          </a>

          <a
            href="mailto:ajayaswin521@gmail.com"
            className="transition-transform duration-300 hover:scale-125 hover:shadow-[0_0_12px_rgba(168,85,247,0.7)] text-white p-2 rounded-lg"
          >
            <FiMail />
          </a>
        </div>

        {/* Right */}
        <p className="text-sm flex items-center gap-2">
          Built with
          <span className="heartbeat text-red-500 inline-block">
            <FiHeart />
          </span>
          creative way.
        </p>
      </div>

      {/* Scroll To Top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-full shadow-lg text-white z-[9999] flex items-center justify-center hover:scale-110 transition-transform duration-300"
        >
          <FiArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* CSS Animations */}
      <style>{`
        /* Gradient Animation */
        @keyframes gradient-slide {
          0% { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }
        .gradient-top-border {
          background-size: 200% 100%;
          animation: gradient-slide 4s linear infinite;
        }

        /* Heartbeat Animation */
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        .heartbeat {
          animation: heartbeat 1.5s infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;