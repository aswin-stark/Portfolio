import React, { useEffect, useState } from "react";
import "@fontsource/orbitron/700.css"; 
import "@fontsource/poppins/400.css";   

export default function About() {
  // Neon Cursor
  const [cursor, setCursor] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e) => {
      setCursor({ x: e.clientX - 16, y: e.clientY - 16 });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Neon Stars
  const [stars, setStars] = useState([]);
  useEffect(() => {
    const starArray = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1,
      color: `hsl(${Math.random() * 360}, 80%, 70%)`,
    }));
    setStars(starArray);

    const interval = setInterval(() => {
      setStars(prevStars =>
        prevStars.map(s => {
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

  // Fade-in on scroll for cards & paragraphs
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if(entry.isIntersecting){
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".scroll-fade").forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen relative text-white px-5 sm:px-10 py-24 sm:py-32 overflow-hidden font-poppins scroll-mt-0"
       style={{ scrollMarginTop: "-50px" }}
    >
      {/* Neon Cursor */}
      <div
        style={{ left: cursor.x, top: cursor.y }}
        className="fixed w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full pointer-events-none mix-blend-screen shadow-2xl z-50 transition-all duration-75"
      />

      {/* Neon Stars */}
      {stars.map((star, idx) => (
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
      ))}

      {/* Title */}
      <div className="text-center mb-10 relative z-10 px-2 scroll-fade opacity-0 translate-y-8 transition-all duration-1000">
        <span className="px-4 py-2 text-lg sm:text-lg bg-white/10 rounded-full border border-white/20 animate-pulse tracking-widest">
          About Me
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-orbitron font-extrabold leading-tight tracking-wide bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Who I Am
        </h2>
        <p className="text-gray-400 mt-3 text-base sm:text-xl md:text-2xl tracking-wide px-2 sm:px-0">
          Get to know me better
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-24 items-center relative z-10">

        {/* Left Card */}
        <div className="relative flex justify-center scroll-fade opacity-0 translate-y-12 transition-all duration-1000">
          <div className="relative bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-10 sm:p-16 w-[280px] sm:w-[360px] h-[320px] sm:h-[400px] flex flex-col items-center justify-center shadow-2xl hover:scale-105 sm:hover:scale-110 hover:rotate-2 transition-transform duration-500">
            
            {/* Glow */}
            <div className="absolute inset-0 rounded-3xl bg-purple-600 opacity-20 blur-2xl sm:blur-3xl animate-pulse"></div>

            {/* Emoji */}
            <div className="text-6xl sm:text-8xl z-10 animate-bounce">👨‍💻</div>

            {/* Tags */}
            <div className="absolute -top-4 sm:-top-6 right-4 sm:right-6 bg-[#1f1b3a] border border-white/10 px-3 sm:px-5 py-1 sm:py-2 text-xs sm:text-sm rounded-full">
              🐍 Python Dev
            </div>
            <div className="absolute -bottom-4 sm:-bottom-6 left-4 sm:left-6 bg-[#1f1b3a] border border-white/10 px-3 sm:px-5 py-1 sm:py-2 text-xs sm:text-sm rounded-full">
              🎓 MCA Graduate
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="scroll-fade opacity-0 translate-y-12 transition-all duration-1000">
          <h3 className="text-2xl sm:text-3xl md:text-3xl font-orbitron font-semibold mb-3 sm:mb-4 tracking-wide">
            Passionate Python Developer
          </h3>

          {[ 
            "I'm Aswin Stark, a dedicated Python Developer with a Master of Computer Applications (MCA) degree. I specialize in building efficient, scalable, and user-focused software solutions that solve real-world problems.",
            "With a strong foundation in programming principles, data structures, and database management, I develop web applications, automation scripts, and backend systems using Python and related technologies.",
            "I'm highly motivated to continuously learn emerging technologies and apply best practices in software development. I'm actively seeking opportunities to contribute my technical expertise and collaborate with dynamic teams.",
          ].map((text, i) => (
            <p key={i} className="relative group text-gray-300 leading-relaxed mb-4 sm:mb-5 text-base sm:text-lg md:text-xl font-poppins tracking-wide text-justify">
              {/* Neon Glow */}
              <span className="absolute inset-0 -z-10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[1200ms] ease-out bg-gradient-to-r from-purple-500/30 via-pink-500/40 to-blue-500/30 blur-2xl"></span>
              {/* Flowing underline */}
              <span className="absolute left-0 bottom-0 w-full h-[3px] sm:h-[4px] bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-[length:200%_100%] animate-neon-flow blur-md opacity-60 group-hover:opacity-100 transition-all duration-500"></span>
              {text}
            </p>
          ))}

          {/* Skills */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
            {["Problem Solver", "Team Player", "Fast Learner", "Detail-Oriented"].map((skill, index) => (
              <span key={index} className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg bg-white/10 border border-white/10 rounded-full cursor-default font-poppins tracking-wider hover:scale-105 transition-transform duration-300">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes neon-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-neon-flow { animation: neon-flow 3s linear infinite; }

        /* Fade-in */
        .fade-in { opacity: 1 !important; transform: translateY(0px) !important; }
      `}</style>
    </section>
  );
}