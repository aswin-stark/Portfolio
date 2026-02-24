import React, { useEffect, useState } from "react";
import {
  SiPython,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiBootstrap,
  SiMysql,
  SiMongodb,
  SiFlask,
  SiFastapi,
} from "react-icons/si";
import { Code2, Layers, Database, Terminal, Globe, Shield } from "lucide-react";

export default function Skills() {
  // ====================== NEON STARS BACKGROUND ======================
  const [stars, setStars] = useState([]);
  useEffect(() => {
    const starArray = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.1,
      color: `hsl(${Math.random() * 360}, 80%, 70%)`,
    }));
    setStars(starArray);

    const interval = setInterval(() => {
      setStars((prevStars) =>
        prevStars.map((s) => {
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

  // ====================== MODAL STATE ======================
  const [selectedCard, setSelectedCard] = useState(null);

  // ====================== SKILLS DATA ======================
  const skillsData = [
    {
      title: "Languages",
      icon: <Code2 size={22} />,
      skills: [
        { name: "Python", icon: <SiPython size={22} /> },
        { name: "JavaScript", icon: <SiJavascript size={22} /> },
        { name: "SQL", icon: <SiMysql size={22} /> },
        { name: "HTML/CSS", icon: <SiHtml5 size={22} /> },
      ],
    },
    {
      title: "Frameworks",
      icon: <Layers size={22} />,
      skills: [
        { name: "Flask", icon: <SiFlask size={22} /> },
        { name: "FastAPI", icon: <SiFastapi size={22} /> },
        { name: "React", icon: <SiReact size={22} /> },
        { name: "Node.js", icon: <SiNodedotjs size={22} /> },
      ],
    },
    {
      title: "Databases",
      icon: <Database size={22} />,
      skills: [
        { name: "MySQL", icon: <SiMysql size={22} /> },
        { name: "MongoDB", icon: <SiMongodb size={22} /> },
        { name: "SQLite", icon: <Database size={22} /> },
      ],
    },
    {
      title: "Tools & DevOps",
      icon: <Terminal size={22} />,
      skills: [
        { name: "Git", icon: <Terminal size={22} /> },
        { name: "GitHub", icon: <SiJavascript size={22} /> },
        { name: "REST APIs", icon: <Code2 size={22} /> },
      ],
    },
    {
      title: "Web Technologies",
      icon: <Globe size={22} />,
      skills: [
        { name: "HTML5", icon: <SiHtml5 size={22} /> },
        { name: "CSS3", icon: <SiCss3 size={22} /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss size={22} /> },
        { name: "Bootstrap", icon: <SiBootstrap size={22} /> },
      ],
    },
    {
      title: "Concepts",
      icon: <Shield size={22} />,
      skills: [
        { name: "OOP", icon: <Code2 size={22} /> },
        { name: "Agile", icon: <Code2 size={22} /> },
      ],
    },
  ];

  return (
    <section id="skills" className="min-h-screen relative text-white px-6 py-24 overflow-hidden">
     
      {/* ====================== NEON STARS ====================== */}
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

      {/* ====================== HEADER ====================== */}
      <div className="text-center mb-20 relative z-10">
        <span className="px-4 py-1 text-sm bg-white/10 border border-white/10 rounded-full animate-pulse">
          Technical Skills
        </span>

        <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-wide">
          My{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
            Expertise
          </span>
        </h2>

        <p className="text-gray-400 mt-4 max-w-xl mx-auto text-lg font-light tracking-wide">
          Click on a card to see a detailed pop-up with all related skills!
        </p>
      </div>

      {/* ====================== SKILLS GRID ====================== */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {skillsData.map((category, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl relative group overflow-hidden cursor-pointer"
            onClick={() => setSelectedCard(category)}
          >
            {/* Neon Glow on Hover */}
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-20 blur-3xl transition-all duration-700"></div>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-600/20 rounded-lg text-purple-400 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold group-hover:text-purple-400 transition-colors duration-500">
                {category.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm bg-white/10 border border-white/10 rounded-full hover:scale-110 hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all duration-300"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ====================== MODAL POP-UP ====================== */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center px-4">
          <div className="bg-[#120c2e] rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✖
            </button>

            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
              {selectedCard.title}
            </h3>

            <div className="flex flex-wrap gap-4 justify-center">
              {selectedCard.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-2 bg-white/10 rounded-2xl p-3 w-24 transition-all hover:scale-110 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] cursor-default"
                >
                  <div className="text-purple-400 text-3xl">{skill.icon}</div>
                  <span className="text-sm text-white text-center">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ====================== ANIMATIONS ====================== */}
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