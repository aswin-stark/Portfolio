import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Star, Mail, FileText, Linkedin, Github, X } from "lucide-react";
import profilePic from "../assets/profile.png"; // adjust path
import resume from "../assets/resume.pdf";
import NeonBackground from "../components/NeonBackground";

<NeonBackground />

// ===========================
// MagneticCard Component
// ===========================
function MagneticCard({ icon, label, glow, onClick, href }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.15);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.15);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      target={href ? "_blank" : undefined}
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.15, rotateX: 8, rotateY: -8 }}
      className="relative group cursor-pointer"
    >
      {/* Gradient Neon Border */}
      <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-60 blur-lg group-hover:opacity-100 transition-all duration-500 animate-gradient"></div>

      {/* Neon Glow */}
      <div
        className={`absolute inset-0 rounded-3xl blur-2xl opacity-40 group-hover:opacity-90 transition bg-gradient-to-r ${glow}`}
      />

      {/* Card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col items-center shadow-2xl"
      >
        <div className="mb-3 text-white group-hover:text-fuchsia-400 transition">
          {icon}
        </div>
        <p className="text-xs tracking-widest text-gray-300 group-hover:text-white">
          {label}
        </p>
      </motion.div>
    </motion.a>
  );
}

// ===========================
// Resume Modal Component
// ===========================
function ResumeModal({ open, onClose }) {
  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-lg flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring" }}
        className="relative bg-[#120c2e] border border-white/10 rounded-3xl p-8 w-[90%] max-w-md"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X />
        </button>

        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Resume
        </h3>

        <p className="text-gray-300 mb-6">
          Download or view my professional resume.
        </p>

        <a
          href={resume}
          download="ASWIN_Resume.pdf"
          className="block text-center py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105 transition-transform"
        >
          Download Resume
        </a>
      </motion.div>
    </motion.div>
  );
}

// ===========================
// Hero Component
// ===========================
export default function Hero() {
  const [openResume, setOpenResume] = useState(false);

  // Neon Cursor Effect
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

  // Generate diagonal neon stars
  const [stars, setStars] = useState([]);
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

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#1a093e] to-[#090e2a] text-white relative overflow-hidden">
      {/* Neon Cursor */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="fixed top-0 left-0 w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full pointer-events-none mix-blend-screen shadow-xl"
      />

      {/* Diagonal Neon Stars */}
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

      {/* Navbar */}
      <nav className="w-full flex justify-center pt-6 relative z-10">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-md bg-white/5 border border-white/10 px-8 py-3 rounded-full flex items-center justify-between w-[90%] max-w-5xl shadow-xl relative"
        >
          <h1 className="text-lg font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            ASWIN
          </h1>

          <div className="hidden md:flex gap-6 text-sm">
            {["About", "Skills", "Education", "Contact"].map(
              (item, idx) => (
                <a
                  key={idx}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
                >
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all"></span>
                  {item}
                </a>
              )
            )}
          </div>

          <button className="rounded-full px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105 transition-transform shadow-lg">
            Hire Me
          </button>
        </motion.div>
      </nav>

      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center text-center px-6 mt-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="px-4 py-2 text-sm bg-white/10 rounded-full border border-white/10">
            ⚡ Available for opportunities
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Hi, I'm <span className="text-white">ASWIN</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 text-lg text-gray-300 max-w-2xl"
        >
          Python Developer & MCA Graduate passionate about building efficient,
          scalable, and user-focused software solutions.
        </motion.p>

        {/* Profile Picture */}
      <motion.div
  initial={{ scale: 0, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ type: "spring", stiffness: 150, damping: 10, delay: 0.6 }}
  className="relative mt-10 w-48 h-48 rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 shadow-[0_0_60px_rgba(255,0,255,0.6)] hover:scale-105 transition-transform"
>
  <img
    src={profilePic}
    alt="ASWIN"
    className="w-full h-full object-cover rounded-full"
    style={{ imageRendering: "auto" }}
    loading="eager"
  />
  <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping opacity-30"></div>
</motion.div>

        {/* Magnetic Cards Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          <MagneticCard
            icon={<FileText size={30} />}
            label="RESUME"
            glow="from-pink-500 to-purple-500"
            onClick={() => setOpenResume(true)}
          />
          <MagneticCard
            icon={<Linkedin size={30} />}
            label="LINKEDIN"
            glow="from-blue-500 to-cyan-500"
            href="https://linkedin.com"
          />
          <MagneticCard
            icon={<Github size={30} />}
            label="GITHUB"
            glow="from-gray-500 to-slate-700"
            href="https://github.com"
          />
          <MagneticCard
            icon={<Mail size={30} />}
            label="EMAIL"
            glow="from-purple-500 to-indigo-500"
            href="mailto:aswin@email.com"
          />
        </motion.div>

        {/* Resume Modal */}
        <ResumeModal open={openResume} onClose={() => setOpenResume(false)} />
      </div>

      {/* Extra Tailwind Animations */}
      <style>{`
        @keyframes gradient {
          0% {background-position:0% 50%}
          50% {background-position:100% 50%}
          100% {background-position:0% 50%}
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </div>
  );
}